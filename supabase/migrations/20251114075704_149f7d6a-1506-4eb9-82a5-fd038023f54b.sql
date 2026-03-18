-- Create a table for terms and conditions content
CREATE TABLE public.terms_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL DEFAULT 'Terms of Service',
  content text NOT NULL,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.terms_content ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view terms content
CREATE POLICY "Anyone can view terms content"
ON public.terms_content
FOR SELECT
USING (true);

-- Policy: Only admins can update terms content
CREATE POLICY "Admins can update terms content"
ON public.terms_content
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policy: Only admins can insert terms content
CREATE POLICY "Admins can insert terms content"
ON public.terms_content
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_terms_content_updated_at
BEFORE UPDATE ON public.terms_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial empty content
INSERT INTO public.terms_content (title, content)
VALUES ('Terms of Service', '<h1>Terms of Service</h1><p>Content will be added by admin.</p>');