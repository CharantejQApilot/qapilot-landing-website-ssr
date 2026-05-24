# QApilot Content Automation — CMS Admin Module

A purpose-built content pipeline that lives **inside the qapilot.io CMS admin**. You add articles to a queue via a web form, click Run on whichever row you want generated, and the server-side pipeline writes a draft (noindex, `/seo-drafts/<slug>`) into your existing posts table. You review in the same CMS admin and click **Publish & Index** to promote.

This replaces the earlier Cowork + Google Sheets prototype. Same content quality bar, same 3-tier publishing model, none of the cross-session / sandbox / allowlist headaches.

---

## What changed vs the old prototype

| | Old (Cowork) | New (CMS-integrated) |
|---|---|---|
| Queue store | Google Sheet | `content_queue` table in your CMS DB |
| Trigger | Cowork "Run Now" scheduled task | Run button in admin UI |
| Text generation | Claude via Cowork (counts against your rate limit) | Anthropic Claude API (separate billing) |
| Image generation | Gemini via Cowork | Gemini API (same key) |
| Sheet write-back | Manual / Apps Script | DB row updates atomically |
| Sessions | Each run = new sandbox | Same backend process, no isolation |
| Auth / users | Cowork session | Existing CMS admin auth |

---

## Files in this kit

```
outputs/
├── README.md                         ← this file
├── spec.md                           ← detailed architecture spec (data model, screens, APIs)
├── db-schema.sql                     ← Postgres migration for content_queue + topic_clusters
├── pipeline.py                       ← reference backend pipeline (Python stdlib only)
├── admin-ui.html                     ← interactive mockup of the admin queue page (preview-able)
├── cms-api-spec.md                   ← original post / media API contract (still in use)
└── prompts/
    ├── article-system-prompt.md      ← Claude system prompt (all quality-gate rules)
    └── article-user-template.md      ← per-article user message (variables substituted at runtime)
```

The prompts are **separate files** on purpose — you'll iterate on them weekly without touching backend code.

---

## Setup, end to end

### 1. Preview the UI

Open [admin-ui.html](computer:///Users/charantej.k/Library/Application%20Support/Claude/local-agent-mode-sessions/1af66b4d-246c-48a5-9e13-26ff480158e7/80d66ff6-6dff-4399-b390-73d4ea517600/local_123a0607-12c0-41a8-b9b8-efa1444eb47a/outputs/admin-ui.html) directly in a browser. It runs with mock data in localStorage — you can add rows, click Run, see the running → generated state transition. Use this as the visual reference for what you're building inside your CMS admin.

### 2. Run the migration

```bash
psql $DATABASE_URL -f db-schema.sql
```

Adjust the `users(id)` and `posts(id)` foreign key references to match your actual table names.

### 3. Add the admin pages

In your CMS admin, add three routes (or one route with internal state — your call):

- `GET  /admin/content-automation/` — queue list (mirror what `admin-ui.html` shows)
- `GET  /admin/content-automation/new` (or modal) — add form
- `GET  /admin/content-automation/{id}` (or drawer) — detail view

And the API routes documented in `spec.md` §"API routes".

### 4. Wire up the pipeline

`pipeline.py` is a reference implementation in stdlib Python. If your CMS is in Python, you can use it almost directly — just replace the `db_*` stubs with your ORM calls. If your CMS is in Node/Ruby/Go/PHP/whatever, port the logic — it's just HTTP calls and string processing.

The pipeline runs as a **background job** triggered by `POST /admin/api/content-automation/queue/{id}/run`. Use whatever job runner your CMS already has (BullMQ, Sidekiq, Celery, a goroutine pool, etc.).

### 5. Set env vars

Add to your CMS env:

```
ANTHROPIC_API_KEY=sk-ant-...          # from console.anthropic.com (optional if using Gemini for text)
ANTHROPIC_MODEL=claude-sonnet-4-6
GEMINI_API_KEY=your-key-from-google-ai-studio
GEMINI_IMAGE_MODEL=gemini-3-pro-image-preview
```

**Anthropic API key:** sign up at console.anthropic.com, add billing. Budget ~$0.05–$0.15 per article (Sonnet at ~4–6K input + ~4K output tokens).

**Gemini key:** the same key you've been using. No new signup.

### 6. Test end-to-end

1. Add a row in the new admin UI with a real topic + 1–3 competitor URLs.
2. Click Run.
3. Watch the status badge flip Pending → Running → Generated (4–7 minutes typical).
4. Click "View draft" → opens the draft in your CMS admin at `/seo-drafts/<slug>`.
5. Read it. Fact-check the `claims_to_verify` items. Replace the cover image if needed.
6. Click **Publish & Index**. URL moves to `/resources/<cluster>/<slug>`, robots flips to `index,follow`, page enters the sitemap.

---

## The daily flow once it's live

1. **Monday morning** — open `/admin/content-automation/`. You see 5 rows you queued last Friday.
2. **Click Run** on the top one. Wait ~5 minutes.
3. **Click "View draft"** — opens the post in your CMS admin.
4. **Skim the quality_checks panel**: information_gain bullets, closing_bridge capabilities (sanity-check they're real), claims_to_verify list.
5. **Fact-check the verify items**, light-edit tone if needed.
6. **Click Publish & Index.**
7. Repeat for the rest of the queue at your own pace.

Total time per article: ~5 minutes of your attention + ~5 minutes of pipeline runtime in the background.

---

## What about the quality bars we agreed on?

All of them are baked into `prompts/article-system-prompt.md` and re-checked server-side in `pipeline.py:quality_gate()`. Specifically:

- **Information Gain check** — article must contain a named framework, concrete numbers, original comparison table, or specific benchmark. Empty → DISCARD.
- **Closing bridge** — mandatory final H2 that ties the topic to QApilot using only homepage-verified capabilities. Generic or missing → DISCARD.
- **Internal links** — only URLs from the live qapilot.io sitemap. No invented slugs.
- **Banned-words / AI-tells list** — 30+ phrases stripped before posting; any survivor → DISCARD.
- **Claims to verify** — every specific number, version, regulatory citation, named-company claim is surfaced as a fact-check checklist for the editor.
- **3-tier safety net** — pipeline only ever inserts `tier='draft'` at `/seo-drafts/<slug>` with `noindex,nofollow`. Promotion to `index_worthy` happens via the Publish & Index button (separate CMS code path).

---

## Out of scope for v1 (revisit later)

- Cron / scheduled auto-runs
- Bulk import from your old Google Sheet (one-off CSV-to-DB script if you want it)
- Multi-user assignments / per-row ownership
- Email notifications on run completion
- Variant generation / A/B testing
- Per-cluster tone profiles

All easy add-ons once the v1 manual flow is humming.

---

## Sources / references for the dev doing the integration

- Anthropic Messages API: https://docs.claude.com/en/api/messages
- Anthropic auth + model docs: https://docs.claude.com/en/docs/about-claude/models
- Gemini Image Generation: https://ai.google.dev/gemini-api/docs/image-generation
- Google's spam policies — scaled content abuse: https://developers.google.com/search/docs/essentials/spam-policies
