-- Add fields to store LinkedIn post metadata manually
ALTER TABLE public.news_updates 
ADD COLUMN IF NOT EXISTS social_embed_image TEXT,
ADD COLUMN IF NOT EXISTS social_embed_description TEXT;