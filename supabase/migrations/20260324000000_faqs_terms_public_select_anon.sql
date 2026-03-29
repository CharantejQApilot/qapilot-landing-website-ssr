-- Marketing SSR + public site: allow anon/authenticated to read published FAQs and terms.
-- Recreate policies explicitly for anon (same pattern as blogs / news_updates after project migration).

DROP POLICY IF EXISTS "Published FAQs are viewable by everyone" ON public.faqs;

CREATE POLICY "Published FAQs are viewable by everyone"
ON public.faqs
FOR SELECT
TO anon, authenticated
USING (is_published = true);

DROP POLICY IF EXISTS "Anyone can view terms content" ON public.terms_content;

CREATE POLICY "Anyone can view terms content"
ON public.terms_content
FOR SELECT
TO anon, authenticated
USING (true);
