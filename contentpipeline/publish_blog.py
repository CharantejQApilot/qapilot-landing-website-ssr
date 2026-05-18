#!/usr/bin/env python3
"""
publish_blog.py — Cover-image generation + CMS publishing for the daily content automation.

The Claude scheduled task writes the blog (title, markdown body, SEO metadata, image prompt)
into a JSON file, then runs:

    python3 publish_blog.py /path/to/article.json

This script:
  1. Generates a cover image via the OpenAI Images API (gpt-image-1 / DALL·E 3).
  2. Uploads the image to your CMS via POST /api/media.
  3. POSTs the blog to your CMS via POST /api/posts as a draft.
  4. Prints a JSON result with edit_url, post_id, and media_id.

Env vars required (load from .env):
  OPENAI_API_KEY     — OpenAI API key with image-gen access
  CMS_API_BASE_URL   — e.g. https://yoursite.com
  CMS_API_TOKEN      — bearer token your custom CMS expects

Article JSON schema (see article.example.json in the kit):
{
  "title": "...",
  "slug": "...",
  "topic_cluster": "flutter-testing",   # required — drives /qa-guide/<cluster>/<slug> when promoted
  "intent": "...",                       # required — the high-intent angle
  "primary_keyword": "...",
  "secondary_keywords": ["...", "..."],
  "meta_title": "...",          # <= 60 chars
  "meta_description": "...",    # <= 160 chars
  "tags": ["...", "..."],
  "excerpt": "...",
  "content_markdown": "# H1...\n\n...",
  "image_prompt": "Concise visual brief for DALL·E (1-2 sentences).",
  "image_alt": "Short alt text for the cover image.",
  "internal_link_suggestions": [
      {"anchor": "...", "target_url": "/qa-guide/.../..."}
  ],
  "quality_checks": {
      "word_count": 1547,
      "originality_score": 0.86,
      "originality_notes": "...",
      "usefulness_score": 0.79,
      "usefulness_notes": "...",
      "product_relevance_score": 0.82,
      "product_relevance_notes": "...",
      "overall_recommendation": "REVIEW (lean approve as supporting)"
  },
  "source_competitor_urls": ["https://..."],
  "run_id": "2026-05-19"
}

All posts created by this script are tier='draft', noindex,nofollow, under /seo-drafts/<slug>.
Promotion to 'supporting' or 'index_worthy' is a separate manual step (promote_draft.py).
"""

from __future__ import annotations

import base64
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

# ---------- tiny helpers ----------

def die(msg: str, code: int = 1) -> None:
    print(json.dumps({"ok": False, "error": msg}), file=sys.stderr)
    sys.exit(code)

def load_env(env_path: Path) -> None:
    """Minimal .env loader so we don't depend on python-dotenv."""
    if not env_path.exists():
        return
    for line in env_path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

def http_json(method: str, url: str, *, headers: dict, body: dict | None = None, timeout: int = 60) -> dict:
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            raw = r.read()
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", errors="replace")
        die(f"{method} {url} → HTTP {e.code}: {detail[:400]}")
    except urllib.error.URLError as e:
        die(f"{method} {url} → network error: {e.reason}")

def http_multipart(url: str, *, headers: dict, fields: dict, file_field: str, file_name: str, file_bytes: bytes, content_type: str, timeout: int = 60) -> dict:
    boundary = f"----CoworkBoundary{int(time.time()*1000)}"
    lines: list[bytes] = []
    for name, value in fields.items():
        lines += [
            f"--{boundary}".encode(),
            f'Content-Disposition: form-data; name="{name}"'.encode(),
            b"",
            str(value).encode(),
        ]
    lines += [
        f"--{boundary}".encode(),
        f'Content-Disposition: form-data; name="{file_field}"; filename="{file_name}"'.encode(),
        f"Content-Type: {content_type}".encode(),
        b"",
        file_bytes,
        f"--{boundary}--".encode(),
        b"",
    ]
    body = b"\r\n".join(lines)
    h = dict(headers)
    h["Content-Type"] = f"multipart/form-data; boundary={boundary}"
    h["Content-Length"] = str(len(body))
    req = urllib.request.Request(url, data=body, headers=h, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", errors="replace")
        die(f"POST {url} (multipart) → HTTP {e.code}: {detail[:400]}")
    except urllib.error.URLError as e:
        die(f"POST {url} (multipart) → network error: {e.reason}")

# ---------- image generation ----------

def generate_cover_image(prompt: str, openai_key: str) -> tuple[bytes, str]:
    """Generate a 1024x1024 PNG cover image. Returns (png_bytes, model_used)."""
    # Use gpt-image-1 (newer) with PNG output. Fall back to dall-e-3 if needed.
    body = {
        "model": "gpt-image-1",
        "prompt": prompt,
        "size": "1024x1024",
        "n": 1,
    }
    try:
        resp = http_json(
            "POST",
            "https://api.openai.com/v1/images/generations",
            headers={"Authorization": f"Bearer {openai_key}", "Content-Type": "application/json"},
            body=body,
            timeout=120,
        )
        b64 = resp["data"][0].get("b64_json")
        if b64:
            return base64.b64decode(b64), "gpt-image-1"
        # Some responses come back as URL — fetch it.
        url = resp["data"][0].get("url")
        if url:
            with urllib.request.urlopen(url, timeout=60) as r:
                return r.read(), "gpt-image-1"
    except SystemExit:
        # Fall back to dall-e-3
        body = {"model": "dall-e-3", "prompt": prompt, "size": "1024x1024", "n": 1, "response_format": "b64_json"}
        resp = http_json(
            "POST",
            "https://api.openai.com/v1/images/generations",
            headers={"Authorization": f"Bearer {openai_key}", "Content-Type": "application/json"},
            body=body,
            timeout=120,
        )
        return base64.b64decode(resp["data"][0]["b64_json"]), "dall-e-3"
    die("Image generation succeeded but response had neither b64_json nor url")

# ---------- markdown → html (lightweight) ----------

def markdown_to_html(md: str) -> str:
    """A very small subset converter. Replace with `markdown` lib if you prefer.
       Handles: # ## ### headings, **bold**, *italic*, [text](url), `code`, lists, paragraphs."""
    try:
        import markdown  # type: ignore
        return markdown.markdown(md, extensions=["fenced_code", "tables", "toc"])
    except ImportError:
        pass
    # Fallback minimal converter
    import re
    html_lines = []
    in_ul = False
    in_ol = False
    for raw in md.splitlines():
        line = raw.rstrip()
        if not line.strip():
            if in_ul: html_lines.append("</ul>"); in_ul = False
            if in_ol: html_lines.append("</ol>"); in_ol = False
            html_lines.append("")
            continue
        m = re.match(r"^(#{1,6})\s+(.*)$", line)
        if m:
            if in_ul: html_lines.append("</ul>"); in_ul = False
            if in_ol: html_lines.append("</ol>"); in_ol = False
            level = len(m.group(1))
            html_lines.append(f"<h{level}>{m.group(2)}</h{level}>")
            continue
        if re.match(r"^\s*[-*]\s+", line):
            if not in_ul:
                if in_ol: html_lines.append("</ol>"); in_ol = False
                html_lines.append("<ul>"); in_ul = True
            item = re.sub(r"^\s*[-*]\s+", "", line)
            html_lines.append(f"<li>{item}</li>")
            continue
        if re.match(r"^\s*\d+\.\s+", line):
            if not in_ol:
                if in_ul: html_lines.append("</ul>"); in_ul = False
                html_lines.append("<ol>"); in_ol = True
            item = re.sub(r"^\s*\d+\.\s+", "", line)
            html_lines.append(f"<li>{item}</li>")
            continue
        # inline
        s = line
        s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
        s = re.sub(r"\*(.+?)\*", r"<em>\1</em>", s)
        s = re.sub(r"`(.+?)`", r"<code>\1</code>", s)
        s = re.sub(r"\[(.+?)\]\((.+?)\)", r'<a href="\2">\1</a>', s)
        html_lines.append(f"<p>{s}</p>")
    if in_ul: html_lines.append("</ul>")
    if in_ol: html_lines.append("</ol>")
    return "\n".join(html_lines)

# ---------- main ----------

REQUIRED_FIELDS = ["title", "topic_cluster", "intent", "primary_keyword", "meta_title",
                   "meta_description", "content_markdown", "image_prompt", "image_alt"]

def slugify(s: str) -> str:
    import re
    s = s.lower()
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"\s+", "-", s).strip("-")
    return s[:80]

def main() -> None:
    if len(sys.argv) < 2:
        die("Usage: publish_blog.py <article.json>")
    article_path = Path(sys.argv[1]).expanduser().resolve()
    if not article_path.exists():
        die(f"Article JSON not found: {article_path}")

    # Load .env from the script's directory (then current dir as fallback)
    here = Path(__file__).resolve().parent
    load_env(here / ".env")
    load_env(Path(".env"))

    openai_key = os.environ.get("OPENAI_API_KEY")
    cms_base = os.environ.get("CMS_API_BASE_URL", "").rstrip("/")
    cms_token = os.environ.get("CMS_API_TOKEN")
    if not openai_key: die("OPENAI_API_KEY missing")
    if not cms_base: die("CMS_API_BASE_URL missing")
    if not cms_token: die("CMS_API_TOKEN missing")

    article = json.loads(article_path.read_text())
    missing = [f for f in REQUIRED_FIELDS if not article.get(f)]
    if missing:
        die(f"Article JSON missing required fields: {missing}")

    title = article["title"]
    slug = article.get("slug") or slugify(title)

    # --- 1. Generate cover image ---
    print(f"[1/3] Generating cover image for: {title!r}", file=sys.stderr)
    png_bytes, model_used = generate_cover_image(article["image_prompt"], openai_key)
    print(f"      Image generated with {model_used} ({len(png_bytes)} bytes)", file=sys.stderr)

    # Optionally save a local copy next to the article JSON for review
    image_local_path = article_path.with_suffix(".cover.png")
    image_local_path.write_bytes(png_bytes)

    # --- 2. Upload to CMS /api/media ---
    print(f"[2/3] Uploading image to {cms_base}/api/media", file=sys.stderr)
    media = http_multipart(
        f"{cms_base}/api/media",
        headers={"Authorization": f"Bearer {cms_token}"},
        fields={"alt": article["image_alt"]},
        file_field="file",
        file_name=f"{slug}-cover.png",
        file_bytes=png_bytes,
        content_type="image/png",
    )
    media_id = media.get("id")
    media_url = media.get("url")
    if not media_id and not media_url:
        die(f"CMS /api/media response missing id/url: {media}")

    # --- 3. POST blog draft ---
    print(f"[3/3] Posting draft to {cms_base}/api/posts", file=sys.stderr)
    payload = {
        "title": title,
        "slug": slug,
        "tier": "draft",                       # ALWAYS draft from this script
        "status": "draft",
        "topic_cluster": article["topic_cluster"],
        "intent": article["intent"],
        "excerpt": article.get("excerpt", article["meta_description"]),
        "content_markdown": article["content_markdown"],
        "content_html": markdown_to_html(article["content_markdown"]),
        "cover_media_id": media_id,
        "cover_image_url": media_url,
        "seo": {
            "meta_title": article["meta_title"],
            "meta_description": article["meta_description"],
            "primary_keyword": article["primary_keyword"],
            "secondary_keywords": article.get("secondary_keywords", []),
            "canonical_url": None,
            "meta_robots": "noindex,nofollow", # enforced for drafts; CMS should also default this
        },
        "tags": article.get("tags", []),
        "author": article.get("author", "Editorial Team"),
        "scheduled_publish_at": None,
        "internal_link_suggestions": article.get("internal_link_suggestions", []),
        "quality_checks": article.get("quality_checks", {}),
        "source": {
            "tool": "cowork-content-automation",
            "run_id": article.get("run_id"),
            "competitor_urls": article.get("source_competitor_urls", []),
            "model": article.get("source_model", "claude + dall-e-3"),
        },
    }
    post = http_json(
        "POST",
        f"{cms_base}/api/posts",
        headers={"Authorization": f"Bearer {cms_token}", "Content-Type": "application/json"},
        body=payload,
        timeout=60,
    )

    # --- Done ---
    result = {
        "ok": True,
        "post_id": post.get("id"),
        "tier": post.get("tier", "draft"),
        "url_path": post.get("url_path", f"/seo-drafts/{slug}"),
        "in_sitemap": post.get("in_sitemap", False),
        "meta_robots": post.get("meta_robots", "noindex,nofollow"),
        "edit_url": post.get("edit_url"),
        "preview_url": post.get("preview_url"),
        "media_id": media_id,
        "media_url": media_url,
        "image_local_path": str(image_local_path),
        "slug": slug,
        "topic_cluster": article["topic_cluster"],
        "quality_checks": article.get("quality_checks", {}),
    }
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()
