-- Optional YouTube URL for QE Guide articles. When set, the article hero
-- plays this video instead of the cover image. Covers stay for cards and previews.

ALTER TABLE public.qa_guides
  ADD COLUMN IF NOT EXISTS youtube_url TEXT;

COMMENT ON COLUMN public.qa_guides.youtube_url IS
  'Optional YouTube URL. Replaces the cover on the article page when set.';
