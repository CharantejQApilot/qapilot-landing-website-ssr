-- QA Guide generation queue (admin-native content automation).

CREATE TABLE IF NOT EXISTS public.qa_guide_generation_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  status TEXT NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'running', 'generated', 'failed', 'skip')
  ),

  topic_cluster TEXT NOT NULL REFERENCES public.qa_guide_topic_clusters(slug),
  primary_keyword TEXT NOT NULL,
  intent TEXT NOT NULL,
  secondary_keywords TEXT[] NOT NULL DEFAULT '{}',
  competitor_url_1 TEXT,
  competitor_url_2 TEXT,
  competitor_url_3 TEXT,
  target_audience TEXT,
  notes TEXT,

  run_started_at TIMESTAMPTZ,
  run_completed_at TIMESTAMPTZ,
  generated_qa_guide_id UUID REFERENCES public.qa_guides(id) ON DELETE SET NULL,

  quality_score NUMERIC(3, 2),
  quality_recommendation TEXT,
  quality_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  last_error TEXT,
  run_log TEXT[] NOT NULL DEFAULT '{}'
);

COMMENT ON TABLE public.qa_guide_generation_queue IS 'Admin queue of article briefs for AI draft generation.';

CREATE INDEX IF NOT EXISTS idx_qa_guide_generation_queue_status
  ON public.qa_guide_generation_queue (status);

CREATE INDEX IF NOT EXISTS idx_qa_guide_generation_queue_created_at
  ON public.qa_guide_generation_queue (created_at ASC);

CREATE INDEX IF NOT EXISTS idx_qa_guide_generation_queue_primary_keyword
  ON public.qa_guide_generation_queue (lower(primary_keyword));

ALTER TABLE public.qa_guide_generation_queue ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "qa_guide_generation_queue_select_admin" ON public.qa_guide_generation_queue;
DROP POLICY IF EXISTS "qa_guide_generation_queue_insert_admin" ON public.qa_guide_generation_queue;
DROP POLICY IF EXISTS "qa_guide_generation_queue_update_admin" ON public.qa_guide_generation_queue;
DROP POLICY IF EXISTS "qa_guide_generation_queue_delete_admin" ON public.qa_guide_generation_queue;

CREATE POLICY "qa_guide_generation_queue_select_admin"
ON public.qa_guide_generation_queue FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id::text = auth.uid()::text AND role::text = 'admin'
  )
);

CREATE POLICY "qa_guide_generation_queue_insert_admin"
ON public.qa_guide_generation_queue FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id::text = auth.uid()::text AND role::text = 'admin'
  )
);

CREATE POLICY "qa_guide_generation_queue_update_admin"
ON public.qa_guide_generation_queue FOR UPDATE
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

CREATE POLICY "qa_guide_generation_queue_delete_admin"
ON public.qa_guide_generation_queue FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id::text = auth.uid()::text AND role::text = 'admin'
  )
);

DROP TRIGGER IF EXISTS update_qa_guide_generation_queue_updated_at ON public.qa_guide_generation_queue;
CREATE TRIGGER update_qa_guide_generation_queue_updated_at
BEFORE UPDATE ON public.qa_guide_generation_queue
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
