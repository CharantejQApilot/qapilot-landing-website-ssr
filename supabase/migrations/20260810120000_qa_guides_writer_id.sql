-- Link QE guides (and generation briefs) to writers profiles, matching blogs/news.

ALTER TABLE public.qa_guides
  ADD COLUMN IF NOT EXISTS writer_id UUID REFERENCES public.writers(id) ON DELETE SET NULL;

ALTER TABLE public.qa_guide_generation_queue
  ADD COLUMN IF NOT EXISTS writer_id UUID REFERENCES public.writers(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_qa_guides_writer_id
  ON public.qa_guides (writer_id);

COMMENT ON COLUMN public.qa_guides.writer_id IS
  'Optional FK to writers; powers the Written by card on /qa-guide articles.';

COMMENT ON COLUMN public.qa_guide_generation_queue.writer_id IS
  'Writer assigned when the brief is queued; copied onto the generated draft.';

-- Backfill existing guides: randomly assign Harini Mukesh or Charan Tej Kammara
-- (stable per row via md5 so re-running the migration is idempotent for already-linked rows).
UPDATE public.qa_guides AS g
SET
  writer_id = picked.id,
  author_name = picked.name
FROM (
  SELECT
    g2.id AS guide_id,
    (
      SELECT w.id
      FROM public.writers w
      WHERE lower(trim(w.name)) IN (
        'harini mukesh',
        'charan tej kammara'
      )
      ORDER BY md5(g2.id::text || w.id::text)
      LIMIT 1
    ) AS id,
    (
      SELECT w.name
      FROM public.writers w
      WHERE lower(trim(w.name)) IN (
        'harini mukesh',
        'charan tej kammara'
      )
      ORDER BY md5(g2.id::text || w.id::text)
      LIMIT 1
    ) AS name
  FROM public.qa_guides g2
  WHERE g2.writer_id IS NULL
) AS picked
WHERE g.id = picked.guide_id
  AND picked.id IS NOT NULL;
