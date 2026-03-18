-- Make description field optional in news_backlinks
ALTER TABLE public.news_backlinks ALTER COLUMN description DROP NOT NULL;