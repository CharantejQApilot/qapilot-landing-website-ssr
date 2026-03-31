-- Extra CMS fields for blogs and news (category, tags, SEO, markdown flag)

ALTER TABLE public.blogs
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS tags text,
  ADD COLUMN IF NOT EXISTS seo_title text,
  ADD COLUMN IF NOT EXISTS seo_description text,
  ADD COLUMN IF NOT EXISTS og_image_url text,
  ADD COLUMN IF NOT EXISTS seo_keywords text,
  ADD COLUMN IF NOT EXISTS content_format text NOT NULL DEFAULT 'html';

COMMENT ON COLUMN public.blogs.content_format IS 'html = legacy rich HTML; markdown = Markdown body';
COMMENT ON COLUMN public.blogs.tags IS 'Comma-separated tags';
COMMENT ON COLUMN public.blogs.seo_keywords IS 'Comma-separated keywords';

ALTER TABLE public.news_updates
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS tags text,
  ADD COLUMN IF NOT EXISTS seo_title text,
  ADD COLUMN IF NOT EXISTS seo_description text,
  ADD COLUMN IF NOT EXISTS og_image_url text,
  ADD COLUMN IF NOT EXISTS seo_keywords text,
  ADD COLUMN IF NOT EXISTS content_format text NOT NULL DEFAULT 'html';

COMMENT ON COLUMN public.news_updates.content_format IS 'html = legacy rich HTML; markdown = Markdown body';
COMMENT ON COLUMN public.news_updates.tags IS 'Comma-separated tags';
COMMENT ON COLUMN public.news_updates.seo_keywords IS 'Comma-separated keywords';
