# CMS API Contract — Content Automation (3-Tier Model)

> **QApilot production URLs:** published guides live at `/qa-guide/<topic_cluster>/<slug>` (not `/resources/...`). Drafts at `/seo-drafts/<slug>`. Admin edit URL: `/admin/qa-guide/<id>`.

This is the API your custom CMS needs to expose so the daily automation can publish
**non-indexed drafts** that you review and then promote to one of two indexable tiers.

## Why the 3-tier model

Google's spam policy explicitly targets "scaled content abuse" — many pages produced
mainly to manipulate rankings, regardless of whether they were written by AI, a human, or
an automation. The fix is structural: never let an unreviewed, automated page hit the
public sitemap.

Every page in your CMS lives in exactly one of these tiers:

| Tier | URL pattern | Robots | In sitemap? | Who decides |
|---|---|---|---|---|
| `draft` | `/seo-drafts/<slug>` | `noindex,nofollow` | No | Automation default |
| `supporting` | `/resources/<cluster>/<slug>` | `noindex,follow` | No | You, on promote |
| `index_worthy` | `/resources/<cluster>/<slug>` | `index,follow` | Yes | You, on promote |

`supporting` is for genuinely useful internal-linking pages (glossary entries, narrow
sub-topics) that aren't strong enough to rank but provide context. `index_worthy` is for
the real landing pages — these go in the sitemap and target meaningful keywords.

The automation **only ever creates `draft` tier** posts. Promotion is a manual decision.

---

## Endpoints

Auth on every endpoint: `Authorization: Bearer <CMS_API_TOKEN>`.

The automation calls:

1. `POST /api/media` — upload cover image, get URL/ID.
2. `POST /api/posts` — create a tier=`draft` post under `/seo-drafts/<slug>`.
3. `PATCH /api/posts/{id}` — promote a draft to `supporting` or `index_worthy` and move
   its URL to `/resources/<cluster>/<slug>` (called by `promote_draft.py`, not the daily
   run).

---

## 1. `POST /api/media`

Upload a cover image and return a stable URL/ID.

**Request**

- Method: `POST`
- Path: `/api/media`
- Headers: `Authorization: Bearer <token>`
- Body: `multipart/form-data`
  - `file` — binary image (PNG, 1024x1024 typical)
  - `alt` — short alt text

**Response (201)**

```json
{
  "id": "media_8f3c2",
  "url": "https://yoursite.com/uploads/2026/05/cover-8f3c2.png",
  "alt": "..."
}
```

---

## 2. `POST /api/posts`

Create a tier=`draft` blog post. The CMS must enforce:

- `tier="draft"` → URL is `/seo-drafts/<slug>`, robots `noindex,nofollow`, not in sitemap.
- Reject the request if any caller tries to send `tier="index_worthy"` here (defense in
  depth — only the promote endpoint can elevate).

**Request body**

```json
{
  "title": "Flutter Testing for Banking Apps: A Practical Guide",
  "slug": "flutter-testing-for-banking-apps",
  "tier": "draft",
  "status": "draft",
  "topic_cluster": "flutter-testing",
  "intent": "high-intent comparison + checklist for fintech QA leads",
  "excerpt": "A 160-char SEO meta description summarizing the post and including the primary keyword.",
  "content_markdown": "# Flutter Testing for Banking Apps...\n\n## ...",
  "content_html": "<h1>Flutter Testing for Banking Apps...</h1>...",
  "cover_media_id": "media_8f3c2",
  "cover_image_url": "https://yoursite.com/uploads/2026/05/cover-8f3c2.png",
  "seo": {
    "meta_title": "Flutter Testing for Banking Apps (2026 Guide)",
    "meta_description": "Battle-tested patterns for testing Flutter banking apps: biometric flows, payment edges, and compliance gotchas.",
    "primary_keyword": "flutter testing banking apps",
    "secondary_keywords": ["fintech qa", "flutter integration tests", "biometric testing"],
    "canonical_url": null,
    "meta_robots": "noindex,nofollow"
  },
  "tags": ["flutter", "mobile-testing", "fintech"],
  "author": "Editorial Team",
  "scheduled_publish_at": null,
  "internal_link_suggestions": [
    { "anchor": "Appium vs AI-native testing", "target_url": "/resources/appium/appium-vs-ai-native-mobile-testing/" },
    { "anchor": "mobile app regression checklist", "target_url": "/resources/mobile-testing/mobile-app-regression-testing-checklist/" }
  ],
  "quality_checks": {
    "word_count": 1547,
    "originality_score": 0.86,
    "originality_notes": "Highest competitor overlap (3-gram) was 7%.",
    "usefulness_score": 0.79,
    "usefulness_notes": "Concrete examples + named tools. Missing a downloadable checklist.",
    "product_relevance_score": 0.82,
    "product_relevance_notes": "Mentions QApilot AI selectors and flake detector with concrete examples.",
    "information_gain": ["Original BFT-4 framework", "Internal benchmark: flake 23% → 4% on 12k-test suite"],
    "structured_elements": ["comparison_table", "checklist"],
    "ai_tells_found": [],
    "claims_to_verify": [
      {"claim": "RBI mandates session timeout < 5 min for retail banking apps.", "where": "Section: 'Compliance gotchas'", "why_verify": "Regulatory citation."}
    ],
    "overall_recommendation": "REVIEW (lean approve as index_worthy)"
  },
  "source": {
    "tool": "cowork-content-automation",
    "run_id": "2026-05-19",
    "competitor_urls": ["https://competitor-a.com/post", "https://competitor-b.com/post"],
    "model": "claude + dall-e-3"
  }
}
```

**Response (201)**

```json
{
  "id": "post_a91f4",
  "tier": "draft",
  "slug": "flutter-testing-for-banking-apps",
  "url_path": "/seo-drafts/flutter-testing-for-banking-apps",
  "status": "draft",
  "in_sitemap": false,
  "meta_robots": "noindex,nofollow",
  "edit_url": "https://yoursite.com/admin/posts/post_a91f4/edit",
  "preview_url": "https://yoursite.com/seo-drafts/flutter-testing-for-banking-apps?preview=xyz"
}
```

---

## 3. `PATCH /api/posts/{id}` — promote a draft

Used by `promote_draft.py` (or your CMS admin UI) after a human reviews the draft. Only
this endpoint can elevate tier.

**Request body (partial — only send what's changing)**

```json
{
  "tier": "index_worthy",
  "status": "published",
  "topic_cluster": "flutter-testing",
  "edits": {
    "title": "Optional override",
    "content_markdown": "Optional cleaned-up body",
    "seo": { "meta_title": "Optional override" }
  }
}
```

The CMS, on receiving this, MUST:

- If `tier == "draft"`: keep URL at `/seo-drafts/<slug>`, robots `noindex,nofollow`,
  exclude from sitemap.
- If `tier == "supporting"`: move URL to `/resources/<topic_cluster>/<slug>`, robots
  `noindex,follow`, exclude from sitemap.
- If `tier == "index_worthy"`: move URL to `/resources/<topic_cluster>/<slug>`, robots
  `index,follow`, **include in sitemap**, ensure canonical points to the new URL.
- Add a 301 from the old `/seo-drafts/<slug>` URL to the new one.
- **No-orphan rule**: when tier becomes `supporting` or `index_worthy`, the page MUST be
  listed on its topic cluster's hub page (`/resources/<topic_cluster>/`). Simplest
  implementation: the hub page query is "all posts where tier IN ('supporting',
  'index_worthy') AND topic_cluster = :slug, ordered by published_at DESC". Hub pages
  for `index_worthy` posts should also link to them from a breadcrumb on the post itself.
  This avoids creating pages that exist only for search bots — Google penalizes pages
  with no internal links pointing at them.
- Append a row to a post history table: `{post_id, old_tier, new_tier, changed_at, changed_by}`.

**Response (200)**

```json
{
  "id": "post_a91f4",
  "tier": "index_worthy",
  "url_path": "/resources/flutter-testing/flutter-testing-for-banking-apps",
  "status": "published",
  "in_sitemap": true,
  "meta_robots": "index,follow",
  "edit_url": "https://yoursite.com/admin/posts/post_a91f4/edit"
}
```

---

## Sitemap rule (server-side)

Your sitemap generator MUST filter on:

```sql
WHERE tier = 'index_worthy' AND status = 'published'
```

Never on just `status='published'`. The tier check is the safety net.

---

## Robots / `noindex` rule (server-side)

When rendering a page, set the `<meta name="robots">` tag from `seo.meta_robots`. Default
must be `noindex,nofollow` for any post where it's null (fail-closed).

---

## Minimum viable implementation

Smallest working version (one afternoon of vibe-coding):

- Express / FastAPI / Next.js API route
- One env var: `CMS_API_TOKEN`
- Bearer-token middleware
- `posts` table with columns: `id, title, slug, tier, status, topic_cluster, intent,
  url_path, meta_robots, in_sitemap, content_markdown, content_html, cover_media_id,
  seo_json, quality_checks_json, internal_link_suggestions_json, source_json, created_at,
  updated_at`
- `POST /api/media` — save file, return URL
- `POST /api/posts` — force `tier='draft'`, `url_path = '/seo-drafts/' || slug`,
  `meta_robots='noindex,nofollow'`, `in_sitemap=false`
- `PATCH /api/posts/:id` — handle the tier transitions per the table above
- Sitemap route filters on `tier='index_worthy' AND status='published'`
- Page renderer uses `meta_robots` from the row

You can skip the post history table and 301 redirect for v1 — add them when you start
promoting drafts.

---

## Smoke test

```bash
curl -X POST https://yoursite.com/api/posts \
  -H "Authorization: Bearer $CMS_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Smoke test from automation",
    "slug": "smoke-test-from-automation",
    "tier": "draft",
    "status": "draft",
    "topic_cluster": "test",
    "intent": "smoke test",
    "excerpt": "Ignore.",
    "content_markdown": "# Hello",
    "seo": { "meta_title": "Test", "meta_description": "Test", "primary_keyword": "test", "secondary_keywords": [], "meta_robots": "noindex,nofollow" },
    "tags": ["test"],
    "author": "Editorial Team",
    "quality_checks": {}
  }'
```

Expect `201` with `"tier": "draft"`, `"url_path": "/seo-drafts/smoke-test-from-automation"`,
`"in_sitemap": false`, `"meta_robots": "noindex,nofollow"`. Visit the preview URL — page
must render with a `<meta name="robots" content="noindex,nofollow">` tag.
