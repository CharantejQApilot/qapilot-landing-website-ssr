# Content Automation — CMS Admin Module Spec

A purpose-built content pipeline that lives inside the qapilot.io CMS admin. Replaces the previous Cowork-based prototype.

## Why we're rebuilding

The Cowork-based pipeline had three structural problems:
1. Cross-session sandbox isolation made shared state (queue, credentials, state file) brittle.
2. Cowork's `web_fetch` doesn't handle Google Sheets' `Content-Disposition: attachment` responses, so the queue was unreadable.
3. Daily Claude usage was eating into the user's Cowork rate limit.

The new tool is a standalone module inside the existing CMS. Same backend, same auth, same database. The user opens the admin page, manages a queue of articles, and clicks Run on whichever row they want to generate. The server-side pipeline runs as a background job, generates the article via Anthropic Claude API, generates a cover via Gemini API, creates the post as a `tier=draft` row, and reports back.

---

## Data model

One new table. Existing `posts` table is untouched — the pipeline writes to it via the same insert path as the rest of the CMS.

### `content_queue`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID/serial PK | |
| `created_at` | timestamp | default now() |
| `updated_at` | timestamp | bump on every write |
| `created_by` | FK users.id | who added this row |
| `status` | enum | `pending`, `running`, `generated`, `failed`, `skip` |
| `topic_cluster` | text | required. e.g. `flutter-testing` |
| `primary_keyword` | text | required |
| `intent` | text | required. The high-intent use case. |
| `secondary_keywords` | text[] | optional |
| `competitor_url_1` | text | optional |
| `competitor_url_2` | text | optional |
| `competitor_url_3` | text | optional |
| `target_audience` | text | optional override |
| `notes` | text | free text |
| `run_started_at` | timestamp | null until first run |
| `run_completed_at` | timestamp | null until finished |
| `generated_post_id` | FK posts.id | null until success |
| `quality_score` | numeric(3,2) | overall composite (0–1) |
| `quality_recommendation` | text | APPROVE / APPROVE as supporting / REVIEW / DISCARD |
| `quality_payload` | jsonb | full quality_checks blob |
| `last_error` | text | populated on failure |
| `run_log` | text[] | each step's status, for transparency |

Indexes: `(status)`, `(created_at DESC)`, `(primary_keyword)` to detect dupes.

---

## Admin UI screens

All three live under `/admin/content-automation/`. Use the existing admin shell (nav, auth, layout).

### A. Queue list — `/admin/content-automation/`

The default landing page. Mirrors what was in the Google Sheet, but live and writable.

Layout:
- Page header: "Content Automation" + "+ New article" button on right
- Filter bar: status filter (All / Pending / Running / Generated / Failed) + search by keyword
- Table with these columns:
  | Status | Topic Cluster | Primary Keyword | Intent | Created | Run |
  |---|---|---|---|---|---|
  - Status: colored badge (gray=pending, amber=running, green=generated, red=failed)
  - Primary Keyword: clickable → opens row detail
  - Run: button. Disabled if status is `running`, `generated`, or `skip`. Click → fires `POST /admin/api/content-automation/queue/{id}/run`, optimistically flips badge to `running`, then polls.
  - If status is `generated`: replace Run button with "View draft" linking to `/admin/posts/{generated_post_id}/edit`.

Optional bulk actions for v2: select rows, "Run all pending" button.

### B. New / edit article — `/admin/content-automation/new` and `/admin/content-automation/{id}/edit`

A form with these fields (all in one screen, not a wizard):
- Topic Cluster — dropdown (populated from a hard-coded list initially: `flutter-testing`, `mobile-testing`, `appium`, `glossary`, plus a `+ Add cluster` action that opens a small dialog)
- Primary Keyword — text input
- Intent / Use Case — textarea, 2–3 lines, helper text "The high-intent angle. e.g. 'comparison guide for fintech QA leads'."
- Secondary Keywords — text input, comma-separated, helper text "Comma-separated"
- Competitor URL 1, 2, 3 — text inputs, URL validated
- Target Audience — text input (optional)
- Notes — textarea (optional)

Save → INSERT into `content_queue`, return to queue list.

### C. Row detail / run log — `/admin/content-automation/{id}`

Click on a row → side drawer or detail page:
- All the input fields, editable (until status moves past `pending`)
- Status badge + last_error if failed
- run_log: timeline of steps with timestamps (e.g. "2026-05-24 10:31:02 — fetched competitor URL 1 (3247 chars)" / "10:31:14 — fetched qapilot.io homepage" / etc.)
- If `quality_payload` is populated, render the scores + information_gain + closing_bridge + claims_to_verify panels
- If `generated_post_id` is set: prominent "Open draft in CMS" button
- "Re-run" button (allowed even if previously generated, with a confirm dialog)
- "Delete row" button

---

## API routes

All routes under `/admin/api/content-automation/`. Auth: existing admin auth middleware.

| Method | Path | Description |
|---|---|---|
| `GET` | `/queue` | List queue items. Query params: `status`, `q` (search by primary_keyword), `limit`, `offset`. |
| `POST` | `/queue` | Create a row. Body: full queue item schema. Returns `{id, ...}`. |
| `GET` | `/queue/{id}` | Get one. Includes run_log and quality_payload. |
| `PATCH` | `/queue/{id}` | Update fields. Forbidden if `status NOT IN ('pending','failed','skip')`. |
| `DELETE` | `/queue/{id}` | Soft delete (set status='skip') or hard delete (your call). |
| `POST` | `/queue/{id}/run` | Trigger the pipeline. Returns `202 Accepted` immediately. Sets status='running' atomically (transaction); rejects if already running. |
| `POST` | `/queue/{id}/cancel` | (optional) Mark a running job for cancellation. |

The frontend polls `GET /queue/{id}` every 2–3 seconds while status=`running` to update the UI.

---

## Pipeline (server-side, runs after `POST /queue/{id}/run`)

Implemented as a background job (BullMQ / Celery / a simple thread pool — whatever fits your stack). Each step appends to `run_log` and updates `updated_at`. On any uncaught error: set `status='failed'`, set `last_error`, return.

### Step 1. Mark running

```sql
UPDATE content_queue SET status='running', run_started_at=now(), updated_at=now()
WHERE id = $1 AND status IN ('pending', 'failed')
RETURNING *;
```

If no row updated (already running or wrong state), refuse to start.

### Step 2. Fetch competitor URLs

For each `competitor_url_*` that's non-empty:
- HTTP GET with a reasonable User-Agent and a 30s timeout.
- If response is < 500 bytes or is a JS-shell (detected: response contains `<script>` but the body excluding `<script>` blocks is small), retry with a headless-browser fallback if available, OR mark as "failed to fetch" and continue with the others.
- Extract readable body — use `readability-lxml` (Python), `@mozilla/readability` (Node), or trafilatura.
- Truncate to first 8000 chars to keep context manageable.
- Append to run_log: `"competitor X: fetched, N chars"` or `"competitor X: failed, <reason>"`.

### Step 3. Fetch qapilot.io homepage + sitemap

- GET `https://qapilot.io/` — extract one-liner positioning, named capabilities, frameworks supported, integrations.
- GET `https://qapilot.io/sitemap.xml` — parse XML, collect `<loc>` URLs under `/resources/`, `/blog/`, `/glossary/`, `/product/`. These are the canonical internal-link targets.
- If sitemap missing/empty, fall back to GET `https://qapilot.io/resources/` and extract links from the rendered listing.
- If both fail, proceed with `internal_link_candidates = []` and warning logged.

### Step 4. Generate the article via Anthropic Claude API

POST to `https://api.anthropic.com/v1/messages` with:
- Model: `claude-sonnet-4-6` (or whichever you prefer)
- System prompt: contents of `prompts/article-system-prompt.md`
- User message: rendered from `prompts/article-user-template.md` with the queue item fields, competitor texts, and qapilot context injected
- max_tokens: 8000
- temperature: 0.4

Expect the model to return a structured JSON object (the response is parsed as JSON — instruct the model in the system prompt to return ONLY JSON, no prose around it). Schema is documented in `prompts/article-system-prompt.md` and in the pipeline reference.

Parse it. If parsing fails or the schema is missing required fields, mark as failed with the raw response stored in `last_error` (truncated).

### Step 5. Server-side quality gate

Even though the LLM did its own scoring, re-check the hard rules server-side:
- Length 1200–1800 words (count from `content_markdown`)
- Closing bridge H2 present (regex check on last H2 in the body)
- All `internal_link_suggestions[*].target_url` are in the sitemap list from step 3
- No banned words in body (use the list from the system prompt)

If any check fails, set `quality_recommendation='REVIEW'` or `'DISCARD'` regardless of what the LLM said. Update `quality_payload`.

### Step 6. Generate cover image (Gemini)

POST to `https://generativelanguage.googleapis.com/v1beta/models/<model>:generateContent`:
- Headers: `x-goog-api-key: ${GEMINI_API_KEY}`, `Content-Type: application/json`
- Body: `{ "contents":[{"parts":[{"text": image_prompt }]}], "generationConfig":{"responseModalities":["IMAGE","TEXT"]} }`
- Response: `candidates[0].content.parts[*].inlineData.data` base64.

Decode and save the PNG to your media storage (same path as user uploads).

### Step 7. Create the post

INSERT into `posts` (the existing CMS table) with:
- `tier = 'draft'`
- `status = 'draft'`
- `url_path = '/seo-drafts/' || slug`
- `meta_robots = 'noindex,nofollow'`
- `in_sitemap = false`
- Cover image attached
- All the SEO fields
- `quality_checks` blob

Plus all the fields you'd normally insert via `POST /api/posts` (defined in `cms-api-spec.md`).

### Step 8. Mark complete

```sql
UPDATE content_queue
SET status = 'generated',
    run_completed_at = now(),
    generated_post_id = $new_post_id,
    quality_score = $composite_score,
    quality_recommendation = $rec,
    quality_payload = $payload
WHERE id = $1;
```

---

## Environment variables (new)

Add these to your CMS env:

```
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-4-6
GEMINI_API_KEY=AIzaSy...  (you already have this)
GEMINI_IMAGE_MODEL=gemini-3-pro-image-preview
```

The CMS API token and base URL aren't needed — the pipeline reads/writes directly to the same DB.

---

## What you still need from outside

- **Anthropic API key** — sign up at console.anthropic.com, add billing. ~$0.05–$0.15 per article with Claude Sonnet at 4–6K input tokens + 4K output tokens.
- **Gemini API key** — already in your `.env`.
- **Existing CMS admin auth** — assumed already present.

---

## Out of scope for v1 (revisit later)

- Multi-user queue assignments / ownership
- Bulk import from your old Google Sheet
- Scheduled / cron-triggered runs (you said you prefer manual)
- Email notifications when a job finishes
- A/B testing or variant generation
- Tone / style profiles per cluster
- Bulk promote / auto-publish after N days

These are easy add-ons once the v1 manual flow is working.

---

## Files in this kit

- `spec.md` — this document
- `db-schema.sql` — the `content_queue` table migration
- `pipeline.py` — Python reference for the backend pipeline (adapt to your stack)
- `admin-ui.html` — interactive mockup of the admin queue + form
- `prompts/article-system-prompt.md` — Claude system prompt (the quality-gate ruleset)
- `prompts/article-user-template.md` — the user message template (per-article)
- `cms-api-spec.md` — original CMS API spec, still relevant for the `posts` insert path
- `README.md` — setup and integration guide
