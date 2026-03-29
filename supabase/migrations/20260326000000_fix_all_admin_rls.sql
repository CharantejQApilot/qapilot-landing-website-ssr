-- ============================================================================
-- ONE-SHOT FIX: Replace every has_role(auth.uid(), 'admin'::app_role) policy
-- with a plain EXISTS check on user_roles. Works when the app_role enum or
-- has_role() function is missing from the remote database.
--
-- Tables fixed:  blogs, news_updates, news_backlinks, faqs, terms_content,
--                writers, job_organizations, job_openings, user_roles
-- Also:          storage.objects (blog-images bucket)
-- ============================================================================

-- Helper: an admin-check expression we'll reuse everywhere.
-- We inline it because CREATE FUNCTION may also fail if app_role is referenced.
-- Pattern:
--   EXISTS (
--     SELECT 1 FROM public.user_roles
--     WHERE user_id::text = auth.uid()::text AND role::text = 'admin'
--   )

-- ======================= user_roles =======================
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can view roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Authenticated users can select own user_roles" ON public.user_roles;

-- Authenticated users can read their own row (needed for the admin gate check)
CREATE POLICY "user_roles_select_own"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id::text = auth.uid()::text);

-- Admins can manage roles
CREATE POLICY "user_roles_insert_admin"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin')
);

CREATE POLICY "user_roles_update_admin"
ON public.user_roles FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));

CREATE POLICY "user_roles_delete_admin"
ON public.user_roles FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));


-- ======================= blogs =======================
DROP POLICY IF EXISTS "Published blogs are viewable by everyone" ON public.blogs;
DROP POLICY IF EXISTS "Admins can view all blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can create blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can update blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can delete blogs" ON public.blogs;

CREATE POLICY "blogs_select"
ON public.blogs FOR SELECT
TO anon, authenticated
USING (
  published = true
  OR (auth.uid() IS NOT NULL AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'))
);

CREATE POLICY "blogs_insert_admin"
ON public.blogs FOR INSERT
TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));

CREATE POLICY "blogs_update_admin"
ON public.blogs FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));

CREATE POLICY "blogs_delete_admin"
ON public.blogs FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));


-- ======================= news_updates =======================
DROP POLICY IF EXISTS "Published news are viewable by everyone" ON public.news_updates;
DROP POLICY IF EXISTS "Admins can view all news" ON public.news_updates;
DROP POLICY IF EXISTS "Admins can create news" ON public.news_updates;
DROP POLICY IF EXISTS "Admins can update news" ON public.news_updates;
DROP POLICY IF EXISTS "Admins can delete news" ON public.news_updates;
DROP POLICY IF EXISTS "news_updates_select_policy" ON public.news_updates;
DROP POLICY IF EXISTS "news_updates_insert_admin" ON public.news_updates;
DROP POLICY IF EXISTS "news_updates_update_admin" ON public.news_updates;
DROP POLICY IF EXISTS "news_updates_delete_admin" ON public.news_updates;

CREATE POLICY "news_updates_select"
ON public.news_updates FOR SELECT
TO anon, authenticated
USING (
  published = true
  OR (auth.uid() IS NOT NULL AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'))
);

CREATE POLICY "news_updates_insert_admin"
ON public.news_updates FOR INSERT
TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));

CREATE POLICY "news_updates_update_admin"
ON public.news_updates FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));

CREATE POLICY "news_updates_delete_admin"
ON public.news_updates FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));


-- ======================= news_backlinks =======================
DROP POLICY IF EXISTS "Backlinks are viewable by everyone" ON public.news_backlinks;
DROP POLICY IF EXISTS "Admins can create backlinks" ON public.news_backlinks;
DROP POLICY IF EXISTS "Admins can update backlinks" ON public.news_backlinks;
DROP POLICY IF EXISTS "Admins can delete backlinks" ON public.news_backlinks;
DROP POLICY IF EXISTS "news_backlinks_select_anon_authenticated" ON public.news_backlinks;
DROP POLICY IF EXISTS "news_backlinks_insert_admin" ON public.news_backlinks;
DROP POLICY IF EXISTS "news_backlinks_update_admin" ON public.news_backlinks;
DROP POLICY IF EXISTS "news_backlinks_delete_admin" ON public.news_backlinks;

CREATE POLICY "news_backlinks_select"
ON public.news_backlinks FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "news_backlinks_insert_admin"
ON public.news_backlinks FOR INSERT
TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));

CREATE POLICY "news_backlinks_update_admin"
ON public.news_backlinks FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));

CREATE POLICY "news_backlinks_delete_admin"
ON public.news_backlinks FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));


-- ======================= faqs =======================
DROP POLICY IF EXISTS "Published FAQs are viewable by everyone" ON public.faqs;
DROP POLICY IF EXISTS "Admins can view all FAQs" ON public.faqs;
DROP POLICY IF EXISTS "Admins can create FAQs" ON public.faqs;
DROP POLICY IF EXISTS "Admins can update FAQs" ON public.faqs;
DROP POLICY IF EXISTS "Admins can delete FAQs" ON public.faqs;

CREATE POLICY "faqs_select"
ON public.faqs FOR SELECT
TO anon, authenticated
USING (
  is_published = true
  OR (auth.uid() IS NOT NULL AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'))
);

CREATE POLICY "faqs_insert_admin"
ON public.faqs FOR INSERT
TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));

CREATE POLICY "faqs_update_admin"
ON public.faqs FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));

CREATE POLICY "faqs_delete_admin"
ON public.faqs FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));


-- ======================= terms_content =======================
DROP POLICY IF EXISTS "Anyone can view terms content" ON public.terms_content;
DROP POLICY IF EXISTS "Admins can update terms content" ON public.terms_content;
DROP POLICY IF EXISTS "Admins can insert terms content" ON public.terms_content;

CREATE POLICY "terms_content_select"
ON public.terms_content FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "terms_content_insert_admin"
ON public.terms_content FOR INSERT
TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));

CREATE POLICY "terms_content_update_admin"
ON public.terms_content FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));


-- ======================= writers =======================
DROP POLICY IF EXISTS "Writers are viewable by everyone" ON public.writers;
DROP POLICY IF EXISTS "Admins can create writers" ON public.writers;
DROP POLICY IF EXISTS "Admins can update writers" ON public.writers;
DROP POLICY IF EXISTS "Admins can delete writers" ON public.writers;

CREATE POLICY "writers_select"
ON public.writers FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "writers_insert_admin"
ON public.writers FOR INSERT
TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));

CREATE POLICY "writers_update_admin"
ON public.writers FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));

CREATE POLICY "writers_delete_admin"
ON public.writers FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));


-- ======================= job_organizations =======================
DROP POLICY IF EXISTS "Anyone can view job organizations" ON public.job_organizations;
DROP POLICY IF EXISTS "Admins can create job organizations" ON public.job_organizations;
DROP POLICY IF EXISTS "Admins can update job organizations" ON public.job_organizations;
DROP POLICY IF EXISTS "Admins can delete job organizations" ON public.job_organizations;

CREATE POLICY "job_organizations_select"
ON public.job_organizations FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "job_organizations_insert_admin"
ON public.job_organizations FOR INSERT
TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));

CREATE POLICY "job_organizations_update_admin"
ON public.job_organizations FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));

CREATE POLICY "job_organizations_delete_admin"
ON public.job_organizations FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));


-- ======================= job_openings =======================
DROP POLICY IF EXISTS "Published jobs are viewable by everyone" ON public.job_openings;
DROP POLICY IF EXISTS "Admins can view all jobs" ON public.job_openings;
DROP POLICY IF EXISTS "Admins can create jobs" ON public.job_openings;
DROP POLICY IF EXISTS "Admins can update jobs" ON public.job_openings;
DROP POLICY IF EXISTS "Admins can delete jobs" ON public.job_openings;

CREATE POLICY "job_openings_select"
ON public.job_openings FOR SELECT
TO anon, authenticated
USING (
  published = true
  OR (auth.uid() IS NOT NULL AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'))
);

CREATE POLICY "job_openings_insert_admin"
ON public.job_openings FOR INSERT
TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));

CREATE POLICY "job_openings_update_admin"
ON public.job_openings FOR UPDATE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));

CREATE POLICY "job_openings_delete_admin"
ON public.job_openings FOR DELETE
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin'));


-- ======================= storage.objects (blog-images) =======================
DROP POLICY IF EXISTS "Anyone can view blog images" ON storage.objects;
DROP POLICY IF EXISTS "Public read access for blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete blog images" ON storage.objects;
DROP POLICY IF EXISTS "blog_images_select_public" ON storage.objects;
DROP POLICY IF EXISTS "blog_images_insert_admin" ON storage.objects;
DROP POLICY IF EXISTS "blog_images_update_admin" ON storage.objects;
DROP POLICY IF EXISTS "blog_images_delete_admin" ON storage.objects;

CREATE POLICY "blog_images_select"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'blog-images');

CREATE POLICY "blog_images_insert_admin"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'blog-images'
  AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin')
);

CREATE POLICY "blog_images_update_admin"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'blog-images'
  AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin')
)
WITH CHECK (
  bucket_id = 'blog-images'
  AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin')
);

CREATE POLICY "blog_images_delete_admin"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'blog-images'
  AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id::text = auth.uid()::text AND role::text = 'admin')
);

-- ============================================================================
-- Also ensure default UUIDs on id columns (some remote DBs lost the default)
-- ============================================================================
ALTER TABLE public.blogs ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.news_updates ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.news_backlinks ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.faqs ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.terms_content ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.writers ALTER COLUMN id SET DEFAULT gen_random_uuid();
