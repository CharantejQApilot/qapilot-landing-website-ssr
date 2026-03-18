-- Create news_updates table
CREATE TABLE public.news_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  thumbnail_image TEXT,
  author_name TEXT,
  author_designation TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  published_date TIMESTAMP WITH TIME ZONE,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_banner BOOLEAN NOT NULL DEFAULT false,
  banner_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.news_updates ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to published news
CREATE POLICY "Published news are viewable by everyone"
ON public.news_updates
FOR SELECT
USING (published = true);

-- Create policies for admin access
CREATE POLICY "Admins can view all news"
ON public.news_updates
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR published = true);

CREATE POLICY "Admins can create news"
ON public.news_updates
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update news"
ON public.news_updates
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete news"
ON public.news_updates
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_news_updates_updated_at
BEFORE UPDATE ON public.news_updates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to ensure only one banner at a time
CREATE OR REPLACE FUNCTION public.ensure_single_banner()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_banner = true THEN
    -- Unset any other banners
    UPDATE public.news_updates
    SET is_banner = false
    WHERE is_banner = true AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to ensure single banner
CREATE TRIGGER ensure_single_banner_trigger
BEFORE INSERT OR UPDATE ON public.news_updates
FOR EACH ROW
WHEN (NEW.is_banner = true)
EXECUTE FUNCTION public.ensure_single_banner();