-- Fix FAQ tense slip that feeds FAQPage JSON-LD (present tense throughout).
UPDATE public.faqs
SET answer = regexp_replace(
  answer,
  'explores the app like a real user,\s*identified critical flows,\s*and\s*generated',
  'explores the app like a real user, identifies critical flows, and generates',
  'gi'
)
WHERE answer ~* 'explores the app like a real user,\s*identified critical flows,\s*and\s*generated';

-- Trim long blog meta descriptions (~160 char display budget) for known Flutter offenders.
UPDATE public.blogs
SET seo_description = 'A practical Flutter app testing guide for cross-platform mobile teams: post-build validation, real devices, and lower-maintenance automation with QApilot.'
WHERE slug = 'flutter-app-testing-guide-cross-platform-mobile-teams'
  AND (seo_description IS NULL OR char_length(seo_description) > 160);

UPDATE public.blogs
SET seo_description = 'How Flutter simplified mobile development — and how QApilot simplifies testing with AI-native coverage across Flutter, native, and webview flows.'
WHERE slug = 'flutter-made-mobile-development-simple-qapilot-makes-testing-simple'
  AND (seo_description IS NULL OR char_length(seo_description) > 160);

-- Prefer shorter seo_title values so truncated <title> tags stay readable.
UPDATE public.blogs
SET seo_title = 'Flutter App Testing Guide for Mobile Teams'
WHERE slug = 'flutter-app-testing-guide-cross-platform-mobile-teams'
  AND (seo_title IS NULL OR char_length(seo_title) > 48);

UPDATE public.blogs
SET seo_title = 'Flutter Made Development Simple. Testing Too'
WHERE slug = 'flutter-made-mobile-development-simple-qapilot-makes-testing-simple'
  AND (seo_title IS NULL OR char_length(seo_title) > 48);

UPDATE public.blogs
SET seo_title = 'Mobile Testing Guide: Android, iOS & Flutter'
WHERE slug = 'the-complete-mobile-testing-guide-android-ios-and-flutter'
  AND (seo_title IS NULL OR char_length(seo_title) > 48);
