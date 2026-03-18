-- Add optional social media embed URL to news_updates
ALTER TABLE public.news_updates 
ADD COLUMN social_embed_url text;