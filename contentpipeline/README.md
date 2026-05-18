# Daily Content Publishing Automation — Setup Guide

A daily automation that generates a unique, SEO-aware blog draft **as `noindex,nofollow`
on `/seo-drafts/`**, runs a quality gate over it, and waits for your manual approval
before any indexable page exists.

This kit is designed to avoid Google's "scaled content abuse" failure mode — the issue
isn't AI authorship, it's many low-value pages indexed at scale. The fix is structural:
**generation and indexation are separate concerns, with a human between them.**

## The publishing model

At 1 article/day with human review, you only need one real decision: **Approved = Yes**.
When you mark a draft approved, it gets promoted to a fully indexable
`/qa-guide/<cluster>/<slug>` URL and added to your sitemap. No second decision required.

| Tier | URL pattern | Robots | In sitemap? | When this fires |
|---|---|---|---|---|
| `draft` | `/seo-drafts/<slug>` | `noindex,nofollow` | No | Every morning, automatically |
| `index_worthy` (**default**) | `/qa-guide/<cluster>/<slug>` | `index,follow` | **Yes** | You set Approved=Yes; weekly promote |
| `supporting` (rare override) | Not used on QApilot v1 — publish = index + sitemap in one step | — | — | — |

The daily automation only ever creates `draft`. On approval, the default promotion is
`index_worthy` (in sitemap). `supporting` exists as an escape hatch for narrow
definitional pages that don't deserve to rank — leave it alone unless you're writing a
glossary entry.

## What you got in this kit

```
outputs/
├── README.md                  ← this file
├── cms-api-spec.md            ← the API your CMS needs to expose (3-tier aware)
├── blog-queue-template.xlsx   ← Google Sheet structure (Blog Queue + Topic Clusters)
├── publish_blog.py            ← daily run: image + post draft to /seo-drafts/
├── promote_draft.py           ← manual: flip approved drafts to supporting/index_worthy
├── article.example.json       ← article JSON schema (with quality_checks shape)
├── daily-task-prompt.md       ← the prompt the scheduled task runs each morning
└── .env.example               ← copy to .env and fill in
```

## Setup — one-time (≈1 hour)

### 1. Build the CMS endpoints (`cms-api-spec.md`)

Open the spec and implement on your custom CMS:

- `POST /api/media` — upload image, return `{id, url, alt}`
- `POST /api/posts` — create post; **force `tier="draft"`, robots `noindex,nofollow`, url under `/seo-drafts/`**
- `PATCH /api/posts/{id}` — used by `promote_draft.py`; handle tier transitions (URL move, robots flip, sitemap inclusion)

Critical CMS rules to enforce server-side (don't trust the caller):

- Default `meta_robots` is `noindex,nofollow` when null.
- Sitemap query is `WHERE tier = 'index_worthy' AND status = 'published'`.
- When a tier is promoted from `draft` to anything else, the URL moves to
  `/qa-guide/<topic_cluster>/<slug>` and a 301 from the old `/seo-drafts/` URL is added.

Generate a token:
```bash
python3 -c "import secrets; print(secrets.token_urlsafe(48))"
```
Store in CMS env and put the same value in `.env`.

### 2. Decide your topic clusters (Sheet 2: Topic Clusters)

Open `blog-queue-template.xlsx` and edit the Topic Clusters sheet. Start with 3–6
clusters — the URLs you mentioned suggest:

- `flutter-testing` — `/qa-guide/flutter-testing/`
- `mobile-testing` — `/qa-guide/mobile-testing/`
- `appium` — `/qa-guide/appium/`
- `glossary` — `/qa-guide/glossary/`

Each cluster is a content hub. The automation only writes pages that belong to a cluster
— this is how you avoid the `/blog/keyword-1`, `/blog/keyword-2` URL shape.

### 3. Plan a week in the Blog Queue (Sheet 1)

For each row:
- `Publish Date`: when the automation should run it
- `Topic Cluster`: must match a slug from the Topic Clusters sheet
- `Primary Keyword`: target keyword
- `Intent / Use Case`: the high-intent angle — this is what turns a keyword stub into a
  landing page. Be specific: "comparison guide for fintech QA leads", not "intro to flutter testing".
- `Competitor URLs`: 1–3 articles to read for context
- `Target Audience`: optional override
- Leave the rest blank — the automation fills them.

### 4. Publish the sheet as CSV

- File → Share → Publish to web → **Blog Queue** sheet, format **CSV** → Publish.
- Copy URL. Paste into `.env` as `BLOG_QUEUE_CSV_URL`.

### 5. Get an OpenAI API key

- https://platform.openai.com/api-keys
- Enable billing. ~$0.04 per 1024×1024 image with `gpt-image-1`.
- Paste into `.env` as `OPENAI_API_KEY`.

### 6. Fill in `.env`

```bash
cp .env.example .env
# Then edit .env with:
#   BLOG_QUEUE_CSV_URL
#   OPENAI_API_KEY
#   CMS_API_BASE_URL
#   CMS_API_TOKEN
```

### 7. Smoke-test the publish path

```bash
cp article.example.json /tmp/test-article.json
python3 publish_blog.py /tmp/test-article.json
```

Expect a JSON output with:
- `"tier": "draft"`
- `"url_path": "/seo-drafts/flutter-testing-for-banking-apps"`
- `"in_sitemap": false`
- `"meta_robots": "noindex,nofollow"`

Visit the `preview_url`. Confirm:
1. The page renders.
2. `view-source:` shows `<meta name="robots" content="noindex,nofollow">`.
3. `https://yoursite.com/sitemap.xml` does NOT contain this URL.

Delete the test draft from your CMS admin.

### 8. Turn on the daily schedule

The scheduled task `daily-content-publish` already exists, running **8:10 AM daily**.
Find it under Scheduled in the sidebar. If you want a different time, click into it and
update the cron.

## The daily/weekly review cadence

**Each morning (3–5 minutes per draft):**
1. Open the new draft via the `Edit URL` filled into the sheet.
2. If `overall_recommendation` is `DISCARD`, skip — don't approve.
3. Read the `claims_to_verify` list. Fact-check the numbers, dates, and citations the AI
   may have hallucinated. Fix or remove.
4. Light-edit for tone. Confirm the `information_gain` claim is real — if you can't point
   at the unique thing this article has, don't approve.
5. Set `Approved = Yes` in the sheet. **That's it.** Don't touch `Promote As` — leaving
   it blank means the article goes to your sitemap on the next promotion run.
6. (Only for glossary-style pages) Set `Promote As = supporting` if the page is useful
   for internal links but shouldn't rank.

**Weekly (5 minutes):**

```bash
# Optional dry-run first to see what will be promoted:
python3 promote_draft.py --from-sheet --dry-run

# Then actually promote:
python3 promote_draft.py --from-sheet
```

Every `Approved = Yes` row gets PATCHed to `index_worthy` (or `supporting` if you
overrode it). The CMS moves the URL to `/qa-guide/<cluster>/<slug>`, flips robots,
adds a 301 from the old `/seo-drafts/` URL, and includes it in the sitemap.

Then a 2-minute Google Search Console check:

1. https://search.google.com/search-console → your property
2. Coverage report → any new errors or manual actions?
3. Performance → are impressions/clicks on `/qa-guide/*` URLs trending up?
4. URL Inspection → spot-check 1 newly promoted URL. Confirm Google sees it as
   indexable and the 301 from `/seo-drafts/` worked.

If anything's flagged in Coverage, pause new promotions until you understand why.

## Tweaks and extensions

- **Different cadence**: edit the scheduled task or cron expression.
- **Change quality thresholds**: edit `daily-task-prompt.md` step 4.
- **Brand-template cover images** instead of AI: swap `generate_cover_image()` in
  `publish_blog.py` for a call to Bannerbear / Placid / your own template renderer.
- **Auto-promote high-confidence drafts**: change `daily-task-prompt.md` so that
  `overall_recommendation == "APPROVE as index_worthy"` triggers an immediate
  `promote_draft.py` call. Not recommended until you've reviewed 30+ drafts manually
  and trust the scoring.

## Why this avoids the scaled-content trap

- The public sitemap only contains pages a human approved.
- Anything else is `noindex` — search engines see it but don't rank it.
- Each indexable URL lives under a topic cluster (`/qa-guide/<cluster>/<slug>`), not
  a flat `/blog/<keyword>` namespace.
- Every page must have a stated `intent` (a high-intent use case), not just a keyword.
- Every page must satisfy a mandatory **information gain** check: a proprietary
  framework, a named example with concrete numbers, an original comparison, or a real
  benchmark. No info gain → auto-DISCARD.
- Every page must contain at least one **structured element** (table, decision matrix,
  numbered process, or checklist) — not just walls of text with bullets.
- A **banned-words list** strips common AI tells ("delve," "leverage," "seamless,"
  "robust," "in today's fast-paced world," etc.) before posting.
- The AI itself lists **claims to verify** so the human review focuses on
  hallucination-prone facts instead of tone.
- Promoted pages are automatically linked from their topic cluster hub (no orphans).
- The quality gate surfaces originality, usefulness, and product relevance scores so
  low-value drafts are obvious without reading them in full.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `No article queued for today` | No row with today's date + Pending status | Add a row |
| Row rejected with "missing Topic Cluster" | Required field blank | Pick a cluster from Sheet 2 |
| HTTP 401 from CMS | Bad token | Regenerate, update both .env + CMS env |
| HTTP 401 from OpenAI | Bad key / no billing | Check OpenAI dashboard |
| Draft shows up in sitemap | CMS not filtering by tier | Fix sitemap query: `WHERE tier='index_worthy' AND status='published'` |
| Promoted draft still has /seo-drafts URL | PATCH handler doesn't rewrite url_path | Implement step in `cms-api-spec.md` §3 |

## Sources

- Google's spam policies — scaled content abuse: https://developers.google.com/search/docs/essentials/spam-policies
- OpenAI Images API: https://platform.openai.com/docs/guides/images
- Google Sheets "Publish to web" CSV: https://support.google.com/docs/answer/183965
