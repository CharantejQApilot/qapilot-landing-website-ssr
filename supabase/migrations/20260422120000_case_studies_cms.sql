-- ============================================================================
-- Case Studies CMS: parallel of public.blogs.
-- Same columns, same RLS pattern (admin via EXISTS on user_roles), same
-- updated_at trigger. UI lives in /admin under the "Case Studies" tab.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  author_name TEXT,
  author_designation TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_labs_featured BOOLEAN NOT NULL DEFAULT false,
  is_banner BOOLEAN NOT NULL DEFAULT false,
  banner_text TEXT,
  published_date TIMESTAMP WITH TIME ZONE,
  writer_id UUID REFERENCES public.writers(id) ON DELETE SET NULL,
  youtube_url TEXT,
  category TEXT,
  description TEXT,
  tags TEXT,
  seo_title TEXT,
  seo_description TEXT,
  og_image_url TEXT,
  seo_keywords TEXT,
  content_format TEXT NOT NULL DEFAULT 'markdown',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

COMMENT ON COLUMN public.case_studies.content_format IS 'html = legacy rich HTML; markdown = Markdown body';
COMMENT ON COLUMN public.case_studies.tags IS 'Comma-separated tags';
COMMENT ON COLUMN public.case_studies.seo_keywords IS 'Comma-separated keywords';
COMMENT ON COLUMN public.case_studies.is_banner IS 'When true and published, eligible for top site promo banner.';
COMMENT ON COLUMN public.case_studies.banner_text IS 'Text shown in the promo banner when is_banner is true';

CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON public.case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_published ON public.case_studies(published);

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "case_studies_select" ON public.case_studies;
DROP POLICY IF EXISTS "case_studies_insert_admin" ON public.case_studies;
DROP POLICY IF EXISTS "case_studies_update_admin" ON public.case_studies;
DROP POLICY IF EXISTS "case_studies_delete_admin" ON public.case_studies;

CREATE POLICY "case_studies_select"
ON public.case_studies FOR SELECT
TO anon, authenticated
USING (
  published = true
  OR (auth.uid() IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id::text = auth.uid()::text AND role::text = 'admin'
  ))
);

CREATE POLICY "case_studies_insert_admin"
ON public.case_studies FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id::text = auth.uid()::text AND role::text = 'admin'
  )
);

CREATE POLICY "case_studies_update_admin"
ON public.case_studies FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id::text = auth.uid()::text AND role::text = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id::text = auth.uid()::text AND role::text = 'admin'
  )
);

CREATE POLICY "case_studies_delete_admin"
ON public.case_studies FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id::text = auth.uid()::text AND role::text = 'admin'
  )
);

-- Reuse the shared updated_at trigger function defined in the original blogs migration.
DROP TRIGGER IF EXISTS update_case_studies_updated_at ON public.case_studies;
CREATE TRIGGER update_case_studies_updated_at
BEFORE UPDATE ON public.case_studies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
