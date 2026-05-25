-- Flat published URLs: /qa-guide/<slug> (no topic segment in path).

UPDATE public.qa_guides
SET
  url_path = '/qa-guide/' || slug,
  previous_url_path = CASE
    WHEN url_path IS NOT NULL AND url_path <> '/qa-guide/' || slug THEN url_path
    ELSE previous_url_path
  END
WHERE tier = 'index_worthy'
  AND status = 'published'
  AND slug IS NOT NULL;
