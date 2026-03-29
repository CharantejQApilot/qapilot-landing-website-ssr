-- Migrated projects often have an empty terms_content table (seed from original migration not re-run).
INSERT INTO public.terms_content (id, title, content)
SELECT
  gen_random_uuid(),
  'Terms of Service',
  '<h1>Terms of Service</h1><p>Edit this in the admin dashboard.</p>'
WHERE NOT EXISTS (SELECT 1 FROM public.terms_content LIMIT 1);
