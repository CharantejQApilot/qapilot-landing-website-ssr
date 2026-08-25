# QA Guide content generation (admin)

Same admin session as Blogs. Queue CRUD uses the browser Supabase client; **Run** calls a server route that uses your admin JWT + `OPENAI_API_KEY`.

**Agent / editor playbook** (quality gate + AI detection/mitigation + SEO): [qe-guide-content-agent-playbook.md](./qe-guide-content-agent-playbook.md). Injected into the generation system prompt, user-prompt self-check, and humanize pass via `src/lib/qa-guide/generation/content-agent-playbook.ts`.

## Operator flow

1. **Admin → QA Guide → Generation queue** — add a brief (cluster, keyword, intent, author, competitor URLs).
2. **Generate next pending** or **Run** on one row (wait a few minutes; keep the tab open).
   Pipeline: article draft → expand if short → **humanize rewrite pass** → quality gate → draft with linked writer profile.
3. **View draft** → edit at `/admin/qa-guide/{id}` (author / writer profile can be changed before publish).
4. **Guides** tab → **Publish & index** → live at `/qa-guide/<slug>` + sitemap.

## Environment (local + Vercel)

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Same as rest of site |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Same as rest of site |
| `OPENAI_API_KEY` | Yes for Run | Article JSON (`gpt-4o` by default) + cover (`dall-e-3`) |
| `OPENAI_TEXT_MODEL` | Optional | Default `gpt-4o` |
| `OPENAI_IMAGE_MODEL` | Optional | Default `dall-e-3` |

You do **not** need `GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, or generation secrets for this feature.

Legacy Cowork/scripts may still use `CMS_API_TOKEN` + `POST /api/posts`.

## Database

Run once in Supabase SQL (if not already applied):

- `supabase/migrations/20260524120000_qa_guide_generation_queue.sql`
- `supabase/migrations/20260810120000_qa_guides_writer_id.sql` (adds `writer_id` on guides + queue; backfills Harini Mukesh / Charan Tej Kammara on existing guides)

## API (admin session Bearer token)

- `POST /api/admin/qa-guide-generation/queue/run-next`
- `POST /api/admin/qa-guide-generation/queue/{id}/run` (`?force=true` to re-run)

## Security

Store API keys only in Vercel / `.env.local`. Rotate any key that was ever committed or leaked.
