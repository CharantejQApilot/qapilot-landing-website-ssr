-- QA Guides CMS: automation drafts + single human publish gate (publish = index = sitemap).

CREATE TABLE IF NOT EXISTS public.qa_guide_topic_clusters (
  slug TEXT NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.qa_guide_topic_clusters (slug, title, description, display_order)
VALUES
  ('flutter-testing', 'Flutter Testing', 'Guides for testing Flutter mobile apps.', 1),
  ('mobile-testing', 'Mobile Testing', 'Cross-platform mobile QA patterns and checklists.', 2),
  ('appium', 'Appium', 'Appium automation, comparisons, and migration guides.', 3),
  ('glossary', 'Glossary', 'Short definitions and reference entries.', 4)
ON CONFLICT (slug) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.qa_guides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  topic_cluster TEXT NOT NULL REFERENCES public.qa_guide_topic_clusters(slug),
  intent TEXT,
  excerpt TEXT,
  content TEXT,
  content_format TEXT NOT NULL DEFAULT 'markdown',
  featured_image TEXT,
  author_name TEXT,
  tags TEXT,
  tier TEXT NOT NULL DEFAULT 'draft' CHECK (tier IN ('draft', 'index_worthy')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_date TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  og_image_url TEXT,
  meta_robots TEXT NOT NULL DEFAULT 'noindex,nofollow',
  url_path TEXT NOT NULL,
  previous_url_path TEXT,
  quality_checks JSONB NOT NULL DEFAULT '{}'::jsonb,
  internal_link_suggestions JSONB NOT NULL DEFAULT '[]'::jsonb,
  source JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT qa_guides_tier_status_publish_sync CHECK (
    (tier = 'draft' AND status = 'draft')
    OR (tier = 'index_worthy' AND status = 'published')
  ),
  CONSTRAINT qa_guides_publish_seo_required CHECK (
    tier = 'draft' OR (
      nullif(btrim(coalesce(seo_title, '')), '') IS NOT NULL
      AND nullif(btrim(coalesce(seo_description, '')), '') IS NOT NULL
      AND (
        nullif(btrim(coalesce(og_image_url, '')), '') IS NOT NULL
        OR nullif(btrim(coalesce(featured_image, '')), '') IS NOT NULL
      )
    )
  ) NOT VALID
);

COMMENT ON TABLE public.qa_guides IS 'QA Guide articles from automation; publish = index_worthy + published + sitemap.';
COMMENT ON COLUMN public.qa_guides.tier IS 'draft = review only; index_worthy = live and sitemap-eligible.';
COMMENT ON COLUMN public.qa_guides.tags IS 'Comma-separated tags';
COMMENT ON COLUMN public.qa_guides.seo_keywords IS 'Comma-separated keywords';

CREATE INDEX IF NOT EXISTS idx_qa_guides_slug ON public.qa_guides(slug);
CREATE INDEX IF NOT EXISTS idx_qa_guides_tier_status ON public.qa_guides(tier, status);
CREATE INDEX IF NOT EXISTS idx_qa_guides_topic_cluster ON public.qa_guides(topic_cluster);
CREATE INDEX IF NOT EXISTS idx_qa_guides_url_path ON public.qa_guides(url_path);

ALTER TABLE public.qa_guides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "qa_guides_select" ON public.qa_guides;
DROP POLICY IF EXISTS "qa_guides_insert_admin" ON public.qa_guides;
DROP POLICY IF EXISTS "qa_guides_update_admin" ON public.qa_guides;
DROP POLICY IF EXISTS "qa_guides_delete_admin" ON public.qa_guides;

CREATE POLICY "qa_guides_select"
ON public.qa_guides FOR SELECT
TO anon, authenticated
USING (
  (tier = 'index_worthy' AND status = 'published')
  OR tier = 'draft'
  OR (
    auth.uid() IS NOT NULL AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id::text = auth.uid()::text AND role::text = 'admin'
    )
  )
);

CREATE POLICY "qa_guides_insert_admin"
ON public.qa_guides FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id::text = auth.uid()::text AND role::text = 'admin'
  )
);

CREATE POLICY "qa_guides_update_admin"
ON public.qa_guides FOR UPDATE
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

CREATE POLICY "qa_guides_delete_admin"
ON public.qa_guides FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id::text = auth.uid()::text AND role::text = 'admin'
  )
);

ALTER TABLE public.qa_guide_topic_clusters ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "qa_guide_topic_clusters_select" ON public.qa_guide_topic_clusters;
CREATE POLICY "qa_guide_topic_clusters_select"
ON public.qa_guide_topic_clusters FOR SELECT
TO anon, authenticated
USING (true);

DROP TRIGGER IF EXISTS update_qa_guides_updated_at ON public.qa_guides;
CREATE TRIGGER update_qa_guides_updated_at
BEFORE UPDATE ON public.qa_guides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS cms_revalidate_qa_guides ON public.qa_guides;
CREATE TRIGGER cms_revalidate_qa_guides
AFTER INSERT OR UPDATE OR DELETE ON public.qa_guides
FOR EACH ROW
EXECUTE FUNCTION public.cms_revalidate_webhook_trigger();
