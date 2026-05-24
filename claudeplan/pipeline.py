#!/usr/bin/env python3
"""
pipeline.py — Reference implementation of the content-automation pipeline.

This is a STANDALONE reference: it shows the logic, the HTTP calls, and the
control flow. When integrating into your CMS, you'll port this into your
backend's job/queue system (Celery, BullMQ, Sidekiq, a goroutine, etc.) and
swap the stub DB calls for your real ORM/DB layer.

The pipeline mirrors what the `POST /admin/api/content-automation/queue/{id}/run`
endpoint should do. Run as:

    python3 pipeline.py <queue_item_id>

Env required (see `.env.example` below):
    ANTHROPIC_API_KEY
    ANTHROPIC_MODEL=claude-sonnet-4-6
    GEMINI_API_KEY
    GEMINI_IMAGE_MODEL=gemini-3-pro-image-preview
    DATABASE_URL=postgresql://...     # only used by the stub DB helpers
    CMS_MEDIA_DIR=/var/www/uploads    # where to save cover images

Designed to use stdlib only for the HTTP calls. Replace with your CMS's
HTTP client / ORM as appropriate.
"""

from __future__ import annotations

import base64
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any
from uuid import uuid4


# ─── Config ────────────────────────────────────────────────────────────────

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
ANTHROPIC_MODEL = os.environ.get("ANTHROPIC_MODEL", "claude-sonnet-4-6")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
GEMINI_IMAGE_MODEL = os.environ.get("GEMINI_IMAGE_MODEL", "gemini-3-pro-image-preview")
CMS_MEDIA_DIR = Path(os.environ.get("CMS_MEDIA_DIR", "/tmp/qapilot-media"))
QAPILOT_HOMEPAGE = "https://qapilot.io/"
QAPILOT_SITEMAP = "https://qapilot.io/sitemap.xml"
QAPILOT_RESOURCES = "https://qapilot.io/resources/"

USER_AGENT = "qapilot-content-automation/1.0 (+https://qapilot.io)"


# ─── HTTP helpers ──────────────────────────────────────────────────────────

class PipelineError(Exception):
    pass


def http_get(url: str, *, timeout: int = 30) -> tuple[int, bytes, dict[str, str]]:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, r.read(), dict(r.headers.items())
    except urllib.error.HTTPError as e:
        return e.code, e.read(), dict(e.headers.items())
    except urllib.error.URLError as e:
        raise PipelineError(f"GET {url}: {e.reason}")


def http_json(method: str, url: str, *, headers: dict[str, str],
              body: dict | None = None, timeout: int = 120) -> dict:
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            raw = r.read()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", errors="replace")
        raise PipelineError(f"{method} {url} HTTP {e.code}: {detail[:500]}")
    except urllib.error.URLError as e:
        raise PipelineError(f"{method} {url}: {e.reason}")


# ─── DB layer (stubs — replace with your ORM) ──────────────────────────────

@dataclass
class QueueItem:
    id: str
    status: str
    topic_cluster: str
    primary_keyword: str
    intent: str
    secondary_keywords: list[str] = field(default_factory=list)
    competitor_url_1: str | None = None
    competitor_url_2: str | None = None
    competitor_url_3: str | None = None
    target_audience: str | None = None
    notes: str | None = None
    run_log: list[str] = field(default_factory=list)


def db_load_queue_item(id_: str) -> QueueItem:
    """STUB: load from your DB."""
    raise NotImplementedError("Replace with your ORM call")


def db_mark_running(id_: str) -> None:
    """STUB: SET status='running', run_started_at=now() WHERE id=$1 AND status IN ('pending','failed')."""
    raise NotImplementedError("Replace with your DB layer")


def db_append_log(id_: str, line: str) -> None:
    """STUB: append a line to run_log."""
    print(f"[{id_[:8]}] {line}", file=sys.stderr)


def db_mark_failed(id_: str, error: str) -> None:
    """STUB: SET status='failed', last_error=$2, run_completed_at=now()."""
    raise NotImplementedError("Replace with your DB layer")


def db_mark_generated(id_: str, post_id: str, quality_payload: dict,
                      quality_score: float, recommendation: str) -> None:
    """STUB: SET status='generated', run_completed_at=now(), generated_post_id, etc."""
    raise NotImplementedError("Replace with your DB layer")


def db_insert_post(payload: dict) -> str:
    """STUB: INSERT INTO posts with tier='draft', noindex,nofollow, /seo-drafts/<slug>.
       Returns the new post id."""
    raise NotImplementedError("Replace with your CMS post insert path")


# ─── Step 2: Fetch competitor articles ─────────────────────────────────────

def fetch_competitor(url: str) -> str:
    """Fetch and extract readable body. Returns truncated text (≤ 8000 chars)."""
    status, body, _ = http_get(url, timeout=30)
    if status != 200:
        raise PipelineError(f"competitor {url} returned HTTP {status}")
    html = body.decode("utf-8", errors="replace")
    # Quick readability fallback: strip scripts/styles, take text from <p> + <li> + <h*>.
    html = re.sub(r"<script\b[^>]*>.*?</script>", "", html, flags=re.I | re.S)
    html = re.sub(r"<style\b[^>]*>.*?</style>", "", html, flags=re.I | re.S)
    parts = re.findall(r"<(?:p|li|h[1-6])\b[^>]*>(.*?)</(?:p|li|h[1-6])>", html, flags=re.I | re.S)
    text = "\n".join(re.sub(r"<[^>]+>", "", p) for p in parts)
    text = re.sub(r"\s+\n", "\n", text).strip()
    # For production, prefer trafilatura or readability-lxml; this is a stdlib fallback.
    return text[:8000]


# ─── Step 3: Fetch qapilot.io homepage + sitemap ──────────────────────────

def fetch_qapilot_context() -> dict:
    """Returns { 'homepage_text': str, 'internal_link_candidates': list[str] }."""
    out = {"homepage_text": "", "internal_link_candidates": [], "warnings": []}

    try:
        status, body, _ = http_get(QAPILOT_HOMEPAGE)
        if status == 200:
            html = body.decode("utf-8", errors="replace")
            html = re.sub(r"<script\b[^>]*>.*?</script>", "", html, flags=re.I | re.S)
            html = re.sub(r"<style\b[^>]*>.*?</style>", "", html, flags=re.I | re.S)
            text = re.sub(r"<[^>]+>", " ", html)
            text = re.sub(r"\s+", " ", text).strip()
            out["homepage_text"] = text[:8000]
    except PipelineError as e:
        out["warnings"].append(f"homepage: {e}")

    try:
        status, body, _ = http_get(QAPILOT_SITEMAP)
        if status == 200 and body:
            # Sitemaps are XML; sometimes gzipped — handle both.
            content = body
            if body[:2] == b"\x1f\x8b":  # gzip magic
                import gzip
                content = gzip.decompress(body)
            root = ET.fromstring(content)
            ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
            for loc in root.findall(".//sm:loc", ns):
                u = (loc.text or "").strip()
                if any(seg in u for seg in ("/resources/", "/blog/", "/glossary/", "/product/")):
                    out["internal_link_candidates"].append(u)
    except (PipelineError, ET.ParseError) as e:
        out["warnings"].append(f"sitemap: {e}")

    if not out["internal_link_candidates"]:
        # Fallback: scrape /resources/
        try:
            status, body, _ = http_get(QAPILOT_RESOURCES)
            if status == 200:
                html = body.decode("utf-8", errors="replace")
                links = re.findall(r'href=["\']([^"\']+)["\']', html)
                for href in links:
                    if href.startswith("/resources/") or href.startswith("https://qapilot.io/resources/"):
                        full = href if href.startswith("http") else f"https://qapilot.io{href}"
                        if full not in out["internal_link_candidates"]:
                            out["internal_link_candidates"].append(full)
        except PipelineError as e:
            out["warnings"].append(f"/resources/: {e}")

    return out


# ─── Step 4: Generate article via Anthropic Claude API ────────────────────

def generate_article(queue_item: QueueItem, competitor_texts: list[str],
                     qapilot_context: dict, system_prompt: str,
                     user_template: str) -> dict:
    """Calls Anthropic Messages API. Returns parsed article JSON."""
    user_msg = user_template.format(
        topic_cluster=queue_item.topic_cluster,
        primary_keyword=queue_item.primary_keyword,
        intent=queue_item.intent,
        secondary_keywords=", ".join(queue_item.secondary_keywords or []),
        target_audience=queue_item.target_audience or "mobile QA / engineering leaders",
        competitor_texts="\n\n---\n\n".join(competitor_texts) or "(none provided)",
        qapilot_homepage=qapilot_context["homepage_text"],
        qapilot_internal_urls="\n".join(qapilot_context["internal_link_candidates"]) or "(none — sitemap unavailable)",
        run_id=time.strftime("%Y-%m-%d"),
    )

    body = {
        "model": ANTHROPIC_MODEL,
        "max_tokens": 8000,
        "temperature": 0.4,
        "system": system_prompt,
        "messages": [{"role": "user", "content": user_msg}],
    }
    headers = {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
    }
    resp = http_json("POST", "https://api.anthropic.com/v1/messages",
                     headers=headers, body=body, timeout=300)

    # Response shape: { content: [ { type: "text", text: "..." } ] }
    content = (resp.get("content") or [])
    raw_text = next((c.get("text", "") for c in content if c.get("type") == "text"), "")
    if not raw_text:
        raise PipelineError(f"Anthropic returned no text. Raw: {json.dumps(resp)[:500]}")

    # The system prompt instructs Claude to return JSON only.
    # Strip code fences if it added them.
    raw_text = raw_text.strip()
    if raw_text.startswith("```"):
        raw_text = re.sub(r"^```(?:json)?\n", "", raw_text)
        raw_text = re.sub(r"\n```\s*$", "", raw_text)
    try:
        return json.loads(raw_text)
    except json.JSONDecodeError as e:
        raise PipelineError(f"Article JSON parse failed: {e}. Raw start: {raw_text[:400]}")


# ─── Step 5: Server-side quality gate ──────────────────────────────────────

BANNED_PHRASES = [
    "delve", "delving", "delved", "testament", "moreover", "furthermore",
    "in today's fast-paced world", "in the world of", "in the realm of",
    "the world of", "navigating the complexities", "landscape of",
    "ever-evolving", "paradigm shift", "synergy", "harness the power of",
    "unleash", "unlock", "dive deep", "embark on a journey",
    "at the end of the day", "in conclusion", "it's worth noting that",
    "it goes without saying", "needless to say", "cutting-edge",
    "state-of-the-art", "revolutionize", "revolutionary",
    "seamless", "seamlessly", "robust", "leverage", "leveraging",
    "as we navigate", "tapestry",
]


def quality_gate(article: dict, internal_link_candidates: list[str]) -> dict:
    """Returns the validated quality_payload. Forces DISCARD if any hard rule fails."""
    qc = dict(article.get("quality_checks") or {})
    body = article.get("content_markdown", "") or ""
    word_count = len(body.split())
    qc["word_count"] = word_count

    fails: list[str] = []

    if not (1200 <= word_count <= 1800):
        fails.append(f"word_count={word_count} not in [1200,1800]")

    # Closing bridge: last H2 must mention QApilot
    h2s = re.findall(r"^##\s+(.+)$", body, flags=re.M)
    if not h2s or "qapilot" not in h2s[-1].lower():
        fails.append("missing closing bridge (last H2 does not mention QApilot)")

    # Banned words
    lower_body = body.lower()
    found_bans = [w for w in BANNED_PHRASES if w in lower_body]
    if found_bans:
        fails.append(f"banned words: {found_bans[:5]}")
    qc["ai_tells_found"] = found_bans

    # Internal links must come from the sitemap
    sugg = article.get("internal_link_suggestions") or []
    candidate_set = {u.replace("https://qapilot.io", "") for u in internal_link_candidates}
    validated = 0
    for s in sugg:
        target = (s.get("target_url") or "").replace("https://qapilot.io", "")
        if target in candidate_set:
            validated += 1
    qc["internal_links_validated"] = validated
    if sugg and validated == 0 and internal_link_candidates:
        fails.append("none of the suggested internal links match the sitemap")

    # Information gain
    if not (qc.get("information_gain") or []):
        fails.append("information_gain empty")

    # Structured elements
    if not (qc.get("structured_elements") or []):
        fails.append("structured_elements empty")

    # Scores
    if qc.get("originality_score", 0) < 0.6:
        fails.append(f"originality_score={qc.get('originality_score')} < 0.6")
    if qc.get("usefulness_score", 0) < 0.5:
        fails.append(f"usefulness_score={qc.get('usefulness_score')} < 0.5")

    if fails:
        qc["overall_recommendation"] = "DISCARD"
        qc["server_side_failures"] = fails
    elif qc.get("overall_recommendation") not in ("APPROVE", "APPROVE as supporting", "REVIEW"):
        qc["overall_recommendation"] = "REVIEW"

    return qc


# ─── Step 6: Cover image via Gemini ───────────────────────────────────────

def generate_cover_image(prompt: str) -> tuple[bytes, str]:
    """Returns (png_bytes, model_used)."""
    if not GEMINI_API_KEY:
        raise PipelineError("GEMINI_API_KEY missing")
    url = (f"https://generativelanguage.googleapis.com/v1beta/models/"
           f"{GEMINI_IMAGE_MODEL}:generateContent")
    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["IMAGE", "TEXT"]},
    }
    resp = http_json("POST", url,
                     headers={"x-goog-api-key": GEMINI_API_KEY, "Content-Type": "application/json"},
                     body=body, timeout=180)
    cands = resp.get("candidates") or []
    if not cands:
        raise PipelineError(f"Gemini: no candidates. Raw: {json.dumps(resp)[:400]}")
    for part in (cands[0].get("content") or {}).get("parts", []):
        inline = part.get("inlineData") or part.get("inline_data") or {}
        if inline.get("data"):
            return base64.b64decode(inline["data"]), GEMINI_IMAGE_MODEL
    raise PipelineError(f"Gemini: no inline image data. Raw: {json.dumps(resp)[:400]}")


# ─── Markdown → HTML (cheap fallback; use the markdown lib in production) ─

def md_to_html(md: str) -> str:
    try:
        import markdown  # type: ignore
        return markdown.markdown(md, extensions=["fenced_code", "tables", "toc"])
    except ImportError:
        return f"<pre>{md}</pre>"  # placeholder — replace in prod


# ─── Slugify ──────────────────────────────────────────────────────────────

def slugify(s: str) -> str:
    s = s.lower()
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"\s+", "-", s).strip("-")
    return s[:80]


# ─── The orchestrator ─────────────────────────────────────────────────────

def run_queue_item(queue_id: str, system_prompt: str, user_template: str) -> dict:
    """The full pipeline. Returns a summary dict."""
    item = db_load_queue_item(queue_id)
    db_mark_running(queue_id)

    try:
        # Step 2: competitor texts
        competitor_urls = [u for u in (item.competitor_url_1, item.competitor_url_2,
                                       item.competitor_url_3) if u]
        competitor_texts = []
        for u in competitor_urls:
            try:
                txt = fetch_competitor(u)
                competitor_texts.append(txt)
                db_append_log(queue_id, f"fetched competitor {u} ({len(txt)} chars)")
            except PipelineError as e:
                db_append_log(queue_id, f"competitor failed: {u} — {e}")

        # Step 3: qapilot context
        ctx = fetch_qapilot_context()
        db_append_log(queue_id, f"qapilot context: {len(ctx['homepage_text'])} chars, "
                                f"{len(ctx['internal_link_candidates'])} internal URLs")

        # Step 4: generate article
        db_append_log(queue_id, f"calling Anthropic ({ANTHROPIC_MODEL})...")
        article = generate_article(item, competitor_texts, ctx, system_prompt, user_template)
        db_append_log(queue_id, f"article generated: {article.get('title')!r}")

        # Step 5: server-side quality gate
        qc = quality_gate(article, ctx["internal_link_candidates"])
        article["quality_checks"] = qc
        if qc.get("overall_recommendation") == "DISCARD":
            db_append_log(queue_id, f"quality gate DISCARD: {qc.get('server_side_failures')}")
            # Still create the draft so the user can see what was rejected,
            # but mark recommendation prominently. Alternative: refuse to insert.
        db_append_log(queue_id, f"quality recommendation: {qc.get('overall_recommendation')}")

        # Step 6: cover image
        media_id = None
        cover_url = None
        if article.get("image_prompt"):
            try:
                png, model_used = generate_cover_image(article["image_prompt"])
                slug = article.get("slug") or slugify(article["title"])
                CMS_MEDIA_DIR.mkdir(parents=True, exist_ok=True)
                fname = f"{slug}-cover-{uuid4().hex[:8]}.png"
                fpath = CMS_MEDIA_DIR / fname
                fpath.write_bytes(png)
                cover_url = f"/uploads/{fname}"  # adjust to your media URL scheme
                media_id = fname
                db_append_log(queue_id, f"cover image: {len(png)} bytes ({model_used})")
            except PipelineError as e:
                db_append_log(queue_id, f"cover image failed: {e}")

        # Step 7: insert post as draft
        slug = article.get("slug") or slugify(article["title"])
        post_payload = {
            "title": article["title"],
            "slug": slug,
            "tier": "draft",
            "status": "draft",
            "topic_cluster": item.topic_cluster,
            "intent": item.intent,
            "url_path": f"/seo-drafts/{slug}",
            "meta_robots": "noindex,nofollow",
            "in_sitemap": False,
            "excerpt": article.get("excerpt", article["meta_description"]),
            "content_markdown": article["content_markdown"],
            "content_html": md_to_html(article["content_markdown"]),
            "cover_media_id": media_id,
            "cover_image_url": cover_url,
            "seo": {
                "meta_title": article["meta_title"],
                "meta_description": article["meta_description"],
                "primary_keyword": article["primary_keyword"],
                "secondary_keywords": article.get("secondary_keywords", []),
                "canonical_url": None,
                "meta_robots": "noindex,nofollow",
            },
            "tags": article.get("tags", []),
            "author": "Editorial Team",
            "internal_link_suggestions": article.get("internal_link_suggestions", []),
            "quality_checks": qc,
            "source": {
                "tool": "qapilot-content-automation",
                "queue_item_id": queue_id,
                "competitor_urls": competitor_urls,
                "model": ANTHROPIC_MODEL,
            },
        }
        post_id = db_insert_post(post_payload)
        db_append_log(queue_id, f"post inserted: {post_id}")

        # Step 8: mark complete
        composite = (
            (qc.get("originality_score", 0) or 0)
            + (qc.get("usefulness_score", 0) or 0)
            + (qc.get("product_relevance_score", 0) or 0)
        ) / 3.0
        db_mark_generated(queue_id, post_id, qc, round(composite, 2),
                          qc.get("overall_recommendation", "REVIEW"))

        return {
            "ok": True,
            "queue_id": queue_id,
            "post_id": post_id,
            "slug": slug,
            "url_path": f"/seo-drafts/{slug}",
            "quality_recommendation": qc.get("overall_recommendation"),
            "quality_score": round(composite, 2),
        }

    except PipelineError as e:
        db_append_log(queue_id, f"FAILED: {e}")
        db_mark_failed(queue_id, str(e))
        return {"ok": False, "queue_id": queue_id, "error": str(e)}
    except Exception as e:
        db_append_log(queue_id, f"UNEXPECTED FAILURE: {e!r}")
        db_mark_failed(queue_id, repr(e))
        raise


# ─── CLI entry point ──────────────────────────────────────────────────────

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: pipeline.py <queue_item_id>")
        sys.exit(1)
    sys_prompt = Path(__file__).parent / "prompts" / "article-system-prompt.md"
    user_tpl = Path(__file__).parent / "prompts" / "article-user-template.md"
    result = run_queue_item(sys.argv[1], sys_prompt.read_text(), user_tpl.read_text())
    print(json.dumps(result, indent=2))
