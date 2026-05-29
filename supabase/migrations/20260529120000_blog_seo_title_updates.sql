-- SEO title optimizations from May 2026 audit (updates seo_title only; display title unchanged).
UPDATE public.blogs
SET seo_title = 'Mobile QA Automation in 2026: From Manual Scripts to Autonomous Testing Agents'
WHERE title ILIKE 'QA Automation for Mobile Apps%'
  AND (seo_title IS NULL OR seo_title = title);

UPDATE public.blogs
SET seo_title = 'Flutter App Testing Guide 2026: Widget, Integration & Post-Build Testing'
WHERE title ILIKE 'Flutter App Testing: The Complete%'
  AND (seo_title IS NULL OR seo_title = title);

UPDATE public.blogs
SET seo_title = 'AI Self-Healing Test Automation: End the Mobile Test Maintenance Cycle'
WHERE title ILIKE 'How AI Self-Healing Tests Eliminate%'
  AND (seo_title IS NULL OR seo_title = title);

UPDATE public.blogs
SET seo_title = 'Mobile App Sanity Testing: Automate Your Pre-Release Checks with Zero Scripts'
WHERE title ILIKE 'Sanity Testing for Mobile Apps%'
  AND (seo_title IS NULL OR seo_title = title);
