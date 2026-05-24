-- QA guides: publish requires SEO text only (cover/OG image optional for text-first workflow).

ALTER TABLE public.qa_guides DROP CONSTRAINT IF EXISTS qa_guides_publish_seo_required;

ALTER TABLE public.qa_guides ADD CONSTRAINT qa_guides_publish_seo_required CHECK (
  tier = 'draft' OR (
    nullif(btrim(coalesce(seo_title, '')), '') IS NOT NULL
    AND nullif(btrim(coalesce(seo_description, '')), '') IS NOT NULL
  )
);
