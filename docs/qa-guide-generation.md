# QA Guide content generation (admin)

Same admin session as Blogs. Queue CRUD uses the browser Supabase client; **Run** calls a server route that uses your admin JWT + `GEMINI_API_KEY`.

## Operator flow

1. **Admin → QA Guide → Generation queue** — add a brief (cluster, keyword, intent, competitor URLs).
2. **Generate next pending** or **Run** on one row (wait a few minutes; keep the tab open).
3. **View draft** → edit at `/admin/qa-guide/{id}`.
4. **Guides** tab → **Publish & index** → live at `/qa-guide/<cluster>/<slug>` + sitemap.

## Environment (local + Vercel)

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Same as rest of site |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Same as rest of site |
| `GEMINI_API_KEY` | Yes for Run | Article JSON + cover image (server-only) |
| `GEMINI_TEXT_MODEL` | Optional | Default `gemini-2.0-flash` |
| `GEMINI_IMAGE_MODEL` | Optional | Default `gemini-3-pro-image-preview` |

You do **not** need `SUPABASE_SERVICE_ROLE_KEY`, `QA_GUIDE_GENERATION_SECRET`, or `QA_GUIDE_GENERATION_INLINE` for this feature.

Legacy Cowork/scripts may still use `CMS_API_TOKEN` + `POST /api/posts` (service role on the server for that API only).

## Database

Run once in Supabase SQL: `supabase/migrations/20260524120000_qa_guide_generation_queue.sql`

## API (admin session Bearer token)

- `POST /api/admin/qa-guide-generation/queue/run-next`
- `POST /api/admin/qa-guide-generation/queue/{id}/run` (`?force=true` to re-run)

Both run the full pipeline and return `{ queue_id, guide_id, status: "generated" }` or an error.

## Security

Rotate any Gemini key that was ever committed to git. Store keys only in `.env.local` / Vercel secrets.
