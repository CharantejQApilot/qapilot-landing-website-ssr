-- Create table for news backlinks
CREATE TABLE public.news_backlinks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  news_id UUID NOT NULL REFERENCES public.news_updates(id) ON DELETE CASCADE,
  header TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  description TEXT NOT NULL,
  link_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.news_backlinks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Backlinks are viewable by everyone"
ON public.news_backlinks
FOR SELECT
USING (true);

CREATE POLICY "Admins can create backlinks"
ON public.news_backlinks
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update backlinks"
ON public.news_backlinks
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete backlinks"
ON public.news_backlinks
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));