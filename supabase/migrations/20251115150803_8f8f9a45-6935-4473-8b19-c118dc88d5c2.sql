-- Remove thumbnail_image column from news_updates table
ALTER TABLE public.news_updates DROP COLUMN IF EXISTS thumbnail_image;