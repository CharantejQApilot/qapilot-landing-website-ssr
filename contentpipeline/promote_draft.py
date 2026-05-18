#!/usr/bin/env python3
"""
promote_draft.py — Promote an approved draft to `supporting` or `index_worthy`.

Reads approval signals from your Blog Queue Google Sheet (rows where
Approved == "Yes"), looks up the matching draft in the CMS, and PATCHes
/api/posts/{id} to promote it.

Default behavior: a blank `Promote As` column means the row gets promoted to
tier="index_worthy" — moved to /qa-guide/<topic_cluster>/<slug>, robots
index,follow, ADDED TO THE SITEMAP. You only need to set Promote As explicitly
when you want a different tier (e.g. "supporting" for glossary-style pages that
should be noindex,follow).

Usage:
    # Promote a specific post by id:
    python3 promote_draft.py --post-id post_a91f4 --tier index_worthy --cluster flutter-testing

    # Or sweep the Google Sheet for all rows with Approved=Yes:
    python3 promote_draft.py --from-sheet

The sheet-driven mode requires the same .env as publish_blog.py.

For each row it promotes, it writes the new URL back to your sheet's notes column
via stdout — you'll need to paste/sync manually unless you wire up the Google Sheets API.
"""

from __future__ import annotations

import argparse
import csv
import io
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

ALLOWED_TIERS = ("draft", "supporting", "index_worthy")


def die(msg: str, code: int = 1) -> None:
    print(json.dumps({"ok": False, "error": msg}), file=sys.stderr)
    sys.exit(code)


def load_env(p: Path) -> None:
    if not p.exists():
        return
    for line in p.read_text().splitlines():
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


def fetch_sheet_rows(csv_url: str) -> list[dict]:
    with urllib.request.urlopen(csv_url, timeout=30) as r:
        text = r.read().decode("utf-8", errors="replace")
    return list(csv.DictReader(io.StringIO(text)))


def promote_one(cms_base: str, token: str, post_id: str, tier: str, cluster: str | None, status: str = "published") -> dict:
    if tier not in ALLOWED_TIERS:
        die(f"Invalid tier {tier!r}; expected one of {ALLOWED_TIERS}")
    payload: dict = {"tier": tier, "status": status}
    if cluster:
        payload["topic_cluster"] = cluster
    return http_json(
        "PATCH",
        f"{cms_base}/api/posts/{post_id}",
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        body=payload,
        timeout=60,
    )


def main() -> None:
    here = Path(__file__).resolve().parent
    load_env(here / ".env")
    load_env(Path(".env"))

    parser = argparse.ArgumentParser()
    parser.add_argument("--post-id", help="CMS post id to promote (single-promote mode)")
    parser.add_argument("--tier", choices=ALLOWED_TIERS, help="Target tier")
    parser.add_argument("--cluster", help="topic_cluster override (single-promote mode)")
    parser.add_argument("--status", default="published", help="status to set (default: published)")
    parser.add_argument("--from-sheet", action="store_true",
                        help="Promote every sheet row where Approved=Yes")
    parser.add_argument("--dry-run", action="store_true", help="Print what would happen, don't call CMS")
    args = parser.parse_args()

    cms_base = os.environ.get("CMS_API_BASE_URL", "").rstrip("/")
    token = os.environ.get("CMS_API_TOKEN")
    if not cms_base or not token:
        die("CMS_API_BASE_URL and CMS_API_TOKEN must be set")

    results: list[dict] = []

    if args.from_sheet:
        csv_url = os.environ.get("BLOG_QUEUE_CSV_URL")
        if not csv_url:
            die("--from-sheet requires BLOG_QUEUE_CSV_URL in .env")
        rows = fetch_sheet_rows(csv_url)
        # Promotion gate is simply Approved=Yes. Tier defaults to index_worthy (in sitemap)
        # if Promote As is blank; explicit "supporting" or "draft" overrides that.
        approved = [r for r in rows if (r.get("Approved", "").strip().lower() == "yes")
                    and r.get("Edit URL", "").strip()]
        if not approved:
            print(json.dumps({"ok": True, "promoted": [], "note": "No rows ready for promotion (need Approved=Yes and Edit URL filled)."}, indent=2))
            return

        for row in approved:
            edit_url = row["Edit URL"]
            # Try to extract post id from edit URL — assumes /admin/posts/<id>/edit pattern.
            post_id = None
            for tok in edit_url.rstrip("/").split("/"):
                if tok.startswith("post_") or tok.isalnum() and len(tok) > 6:
                    post_id = tok
            if not post_id:
                results.append({"ok": False, "row": row.get("Primary Keyword"), "error": f"Could not parse post_id from {edit_url}"})
                continue
            # Default: index_worthy (in sitemap). Override only if Promote As is set.
            tier = (row.get("Promote As") or "").strip() or "index_worthy"
            if tier not in ALLOWED_TIERS:
                results.append({"ok": False, "row": row.get("Primary Keyword"), "error": f"Invalid Promote As value {tier!r}"})
                continue
            cluster = (row.get("Topic Cluster") or "").strip() or None
            if args.dry_run:
                results.append({"ok": True, "dry_run": True, "post_id": post_id, "tier": tier, "cluster": cluster, "primary_keyword": row.get("Primary Keyword")})
            else:
                res = promote_one(cms_base, token, post_id, tier, cluster, args.status)
                results.append({"ok": True, **res, "primary_keyword": row.get("Primary Keyword")})
    else:
        if not args.post_id or not args.tier:
            die("Provide --post-id and --tier, or use --from-sheet")
        if args.dry_run:
            results.append({"ok": True, "dry_run": True, "post_id": args.post_id, "tier": args.tier, "cluster": args.cluster})
        else:
            results.append(promote_one(cms_base, token, args.post_id, args.tier, args.cluster, args.status))

    print(json.dumps({"ok": True, "promoted": results}, indent=2))


if __name__ == "__main__":
    main()
