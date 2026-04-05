-- Home page promo banner support for blogs (same pattern as news_updates.is_banner)

ALTER TABLE public.blogs
  ADD COLUMN IF NOT EXISTS is_banner boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS banner_text text;

COMMENT ON COLUMN public.blogs.is_banner IS 'When true and published, eligible for top site promo banner. News banner takes precedence if set.';
COMMENT ON COLUMN public.blogs.banner_text IS 'Text shown in the promo banner when is_banner is true';
