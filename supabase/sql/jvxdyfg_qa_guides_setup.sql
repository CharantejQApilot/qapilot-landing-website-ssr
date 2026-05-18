-- =============================================================================
-- PATH A — Run on PRODUCTION Supabase only
-- Project: jvxdyfgjudycpopepgku
-- URL:     https://jvxdyfgjudycpopepgku.supabase.co
-- (Same project as Vercel NEXT_PUBLIC_SUPABASE_URL)
--
-- Open: Supabase Dashboard → SQL Editor → paste & run this entire file.
-- Safe to re-run (idempotent repair).
-- =============================================================================
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

-- Legacy Lovable/partial tables may exist without slug/title. Drop only if empty and unusable.
-- Must run BEFORE CREATE so we do not drop a table we just created.
DO $$
DECLARE
  row_count bigint;
  has_slug boolean;
  table_exists boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'qa_guides'
  ) INTO table_exists;

  IF NOT table_exists THEN
    RETURN;
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'qa_guides' AND column_name = 'slug'
  ) INTO has_slug;

  IF NOT has_slug THEN
    SELECT count(*) INTO row_count FROM public.qa_guides;
    IF row_count = 0 THEN
      DROP TABLE public.qa_guides CASCADE;
    END IF;
  END IF;
END $$;

-- Create full table (runs after legacy drop, or no-ops if table already complete).
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
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add columns missing from a partial / legacy qa_guides table (skipped on fresh CREATE).
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'qa_guides'
  ) THEN
    RAISE EXCEPTION 'qa_guides table missing after setup — re-run from the top of this file';
  END IF;
END $$;

ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS topic_cluster TEXT;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS intent TEXT;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS content_format TEXT NOT NULL DEFAULT 'markdown';
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS featured_image TEXT;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS author_name TEXT;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS tags TEXT;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS tier TEXT NOT NULL DEFAULT 'draft';
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft';
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS published_date TIMESTAMPTZ;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS seo_keywords TEXT;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS og_image_url TEXT;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS meta_robots TEXT NOT NULL DEFAULT 'noindex,nofollow';
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS url_path TEXT;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS previous_url_path TEXT;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS quality_checks JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS internal_link_suggestions JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS source JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT now();
ALTER TABLE public.qa_guides ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- Backfill required core fields on legacy rows (only when columns exist)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'qa_guides' AND column_name = 'title'
  ) THEN
    UPDATE public.qa_guides
    SET title = 'Untitled guide'
    WHERE title IS NULL OR btrim(title) = '';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'qa_guides' AND column_name = 'slug'
  ) THEN
    UPDATE public.qa_guides
    SET slug = 'guide-' || substr(replace(id::text, '-', ''), 1, 12)
    WHERE slug IS NULL OR btrim(slug) = '';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'qa_guides' AND column_name = 'topic_cluster'
  ) THEN
    UPDATE public.qa_guides
    SET topic_cluster = 'flutter-testing'
    WHERE topic_cluster IS NULL OR btrim(topic_cluster) = '';
  END IF;
END $$;

-- Enforce NOT NULL on core columns when present
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'qa_guides' AND column_name = 'title'
  ) THEN
    ALTER TABLE public.qa_guides ALTER COLUMN title SET NOT NULL;
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'qa_guides' AND column_name = 'slug'
  ) THEN
    ALTER TABLE public.qa_guides ALTER COLUMN slug SET NOT NULL;
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'qa_guides' AND column_name = 'topic_cluster'
  ) THEN
    ALTER TABLE public.qa_guides ALTER COLUMN topic_cluster SET NOT NULL;
  END IF;
END $$;

-- FK to topic clusters (if missing)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'qa_guides_topic_cluster_fkey'
  ) THEN
    ALTER TABLE public.qa_guides
      ADD CONSTRAINT qa_guides_topic_cluster_fkey
      FOREIGN KEY (topic_cluster) REFERENCES public.qa_guide_topic_clusters(slug);
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Unique slug index
CREATE UNIQUE INDEX IF NOT EXISTS idx_qa_guides_slug_unique ON public.qa_guides(slug);

-- Backfill url_path for existing rows
UPDATE public.qa_guides
SET url_path = '/seo-drafts/' || slug
WHERE (url_path IS NULL OR btrim(url_path) = '')
  AND slug IS NOT NULL;

ALTER TABLE public.qa_guides ALTER COLUMN url_path SET NOT NULL;

UPDATE public.qa_guides SET tier = 'draft' WHERE tier IS NULL;
UPDATE public.qa_guides SET status = 'draft' WHERE status IS NULL;
UPDATE public.qa_guides SET meta_robots = 'noindex,nofollow' WHERE meta_robots IS NULL;

-- Constraints (skip if already present)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'qa_guides_tier_status_publish_sync'
  ) THEN
    ALTER TABLE public.qa_guides ADD CONSTRAINT qa_guides_tier_status_publish_sync CHECK (
      (tier = 'draft' AND status = 'draft')
      OR (tier = 'index_worthy' AND status = 'published')
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'qa_guides_publish_seo_required'
  ) THEN
    ALTER TABLE public.qa_guides ADD CONSTRAINT qa_guides_publish_seo_required CHECK (
      tier = 'draft' OR (
        nullif(btrim(coalesce(seo_title, '')), '') IS NOT NULL
        AND nullif(btrim(coalesce(seo_description, '')), '') IS NOT NULL
        AND (
          nullif(btrim(coalesce(og_image_url, '')), '') IS NOT NULL
          OR nullif(btrim(coalesce(featured_image, '')), '') IS NOT NULL
        )
      )
    ) NOT VALID;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'qa_guides_tier_check'
  ) THEN
    ALTER TABLE public.qa_guides ADD CONSTRAINT qa_guides_tier_check
      CHECK (tier IN ('draft', 'index_worthy'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'qa_guides_status_check'
  ) THEN
    ALTER TABLE public.qa_guides ADD CONSTRAINT qa_guides_status_check
      CHECK (status IN ('draft', 'published'));
  END IF;
END $$;

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
