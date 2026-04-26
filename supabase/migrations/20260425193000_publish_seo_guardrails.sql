-- Enforce SEO/social metadata at publish-time for dynamic content rows.
-- Added as NOT VALID so existing historical rows do not block deployment;
-- new/updated published rows are still enforced immediately.

ALTER TABLE public.blogs
  DROP CONSTRAINT IF EXISTS blogs_publish_seo_required;

ALTER TABLE public.blogs
  ADD CONSTRAINT blogs_publish_seo_required
  CHECK (
    published = false OR (
      nullif(btrim(coalesce(seo_title, '')), '') IS NOT NULL
      AND nullif(btrim(coalesce(seo_description, '')), '') IS NOT NULL
      AND (
        nullif(btrim(coalesce(og_image_url, '')), '') IS NOT NULL
        OR nullif(btrim(coalesce(featured_image, '')), '') IS NOT NULL
      )
    )
  ) NOT VALID;

ALTER TABLE public.case_studies
  DROP CONSTRAINT IF EXISTS case_studies_publish_seo_required;

ALTER TABLE public.case_studies
  ADD CONSTRAINT case_studies_publish_seo_required
  CHECK (
    published = false OR (
      nullif(btrim(coalesce(seo_title, '')), '') IS NOT NULL
      AND nullif(btrim(coalesce(seo_description, '')), '') IS NOT NULL
      AND (
        nullif(btrim(coalesce(og_image_url, '')), '') IS NOT NULL
        OR nullif(btrim(coalesce(featured_image, '')), '') IS NOT NULL
      )
    )
  ) NOT VALID;

ALTER TABLE public.news_updates
  DROP CONSTRAINT IF EXISTS news_updates_publish_seo_required;

ALTER TABLE public.news_updates
  ADD CONSTRAINT news_updates_publish_seo_required
  CHECK (
    published = false OR (
      nullif(btrim(coalesce(seo_title, '')), '') IS NOT NULL
      AND nullif(btrim(coalesce(seo_description, '')), '') IS NOT NULL
      AND (
        nullif(btrim(coalesce(og_image_url, '')), '') IS NOT NULL
        OR nullif(btrim(coalesce(featured_image, '')), '') IS NOT NULL
      )
    )
  ) NOT VALID;

ALTER TABLE public.job_openings
  DROP CONSTRAINT IF EXISTS job_openings_publish_core_required;

ALTER TABLE public.job_openings
  ADD CONSTRAINT job_openings_publish_core_required
  CHECK (
    published = false OR (
      nullif(btrim(coalesce(slug, '')), '') IS NOT NULL
      AND nullif(btrim(coalesce(role, '')), '') IS NOT NULL
      AND nullif(btrim(coalesce(department, '')), '') IS NOT NULL
      AND nullif(btrim(coalesce(location, '')), '') IS NOT NULL
      AND nullif(btrim(coalesce(description, '')), '') IS NOT NULL
    )
  ) NOT VALID;
