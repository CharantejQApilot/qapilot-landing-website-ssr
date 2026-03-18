
-- Create writers/authors profile table
CREATE TABLE public.writers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT,
  description TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.writers ENABLE ROW LEVEL SECURITY;

-- Everyone can view writers
CREATE POLICY "Writers are viewable by everyone"
ON public.writers FOR SELECT
USING (true);

-- Admins can manage writers
CREATE POLICY "Admins can create writers"
ON public.writers FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update writers"
ON public.writers FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete writers"
ON public.writers FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_writers_updated_at
BEFORE UPDATE ON public.writers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add writer_id to blogs table
ALTER TABLE public.blogs ADD COLUMN writer_id UUID REFERENCES public.writers(id) ON DELETE SET NULL;

-- Add writer_id to news_updates table
ALTER TABLE public.news_updates ADD COLUMN writer_id UUID REFERENCES public.writers(id) ON DELETE SET NULL;
