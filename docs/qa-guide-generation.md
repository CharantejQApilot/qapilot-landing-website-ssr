# QA Guide content generation (admin)

Native content automation for the QA Guide hub. Replaces the Cowork + Google Sheets prototype.

## Operator flow

1. Open **Admin → QA Guide → Generation queue**.
2. Add briefs (**+ New brief**): topic cluster, primary keyword, intent, competitor URLs, etc.
3. Click **Generate next pending** (FIFO) or **Run** on a specific row.
4. Wait ~4–7 minutes; watch the **Log** on the row.
5. Click **View draft** → edit at `/admin/qa-guide/{id}`.
6. Fact-check `claims_to_verify` in quality checks; light-edit if needed.
7. Click **Publish & index** on the Guides sub-tab (or from the editor).

Published guides appear at `/qa-guide/<cluster>/<slug>` and in the `sitemap-qa-guides` Edge sitemap when `tier=index_worthy` and `status=published`.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `GEMINI_API_KEY` | Article JSON + cover image (required) |
| `GEMINI_TEXT_MODEL` | Optional; default `gemini-2.0-flash` (free tier) |
| `GEMINI_IMAGE_MODEL` | Optional; default `gemini-3-pro-image-preview` |
| `QA_GUIDE_GENERATION_SECRET` | Auth for internal execute route + edge function |
| `SITE_BASE_URL` | Sitemap/homepage fetch + edge forwarder target |
| `SUPABASE_SERVICE_ROLE_KEY` | Server pipeline + edge invoke |
| `QA_GUIDE_GENERATION_INLINE=true` | Local dev: run pipeline in-process (no edge) |

Set `QA_GUIDE_GENERATION_SECRET` and `SITE_BASE_URL` on the Supabase `qa-guide-generate` function secrets when deploying.

## API (admin JWT)

- `GET/POST /api/admin/qa-guide-generation/queue`
- `GET/PATCH/DELETE /api/admin/qa-guide-generation/queue/{id}`
- `POST /api/admin/qa-guide-generation/queue/run-next`
- `POST /api/admin/qa-guide-generation/queue/{id}/run` (`?force=true` to re-run generated rows)

## Manual E2E checklist

1. Apply migration `20260524120000_qa_guide_generation_queue.sql`.
2. Set env vars; for local dev set `QA_GUIDE_GENERATION_INLINE=true`.
3. Create a pending brief with at least one competitor URL.
4. **Generate next pending** → status `running` → `generated`; `generated_qa_guide_id` set.
5. Open draft preview `/seo-drafts/<slug>` — confirm `noindex` in page metadata.
6. Confirm URL is absent from QA guide sitemap until published.
7. **Publish & index** → `/qa-guide/<cluster>/<slug>`; URL in sitemap output.
8. Failed competitor fetch still completes when others succeed.
9. Double-click **Generate next** while one job runs → second request returns 409.

## Database

Table: `qa_guide_generation_queue` (see `supabase/migrations/20260524120000_qa_guide_generation_queue.sql`).

Legacy automation: `POST /api/posts` + `CMS_API_TOKEN` (see `contentpipeline/`).
