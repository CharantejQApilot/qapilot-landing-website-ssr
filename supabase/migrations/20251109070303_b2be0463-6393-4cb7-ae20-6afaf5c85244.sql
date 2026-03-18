-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  author_name TEXT,
  author_designation TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  published_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to published blogs
CREATE POLICY "Published blogs are viewable by everyone" 
ON public.blogs 
FOR SELECT 
USING (published = true);

-- Create policies for authenticated admin access (full CRUD)
CREATE POLICY "Authenticated users can view all blogs" 
ON public.blogs 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can create blogs" 
ON public.blogs 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update blogs" 
ON public.blogs 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete blogs" 
ON public.blogs 
FOR DELETE 
TO authenticated
USING (true);

-- Create index on slug for faster lookups
CREATE INDEX idx_blogs_slug ON public.blogs(slug);

-- Create index on published for filtering
CREATE INDEX idx_blogs_published ON public.blogs(published);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON public.blogs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();