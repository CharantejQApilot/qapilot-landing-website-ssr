-- Add slug column to job_openings table for SEO-friendly URLs
ALTER TABLE public.job_openings
ADD COLUMN slug text UNIQUE;

-- Create index for faster slug lookups
CREATE INDEX idx_job_openings_slug ON public.job_openings(slug);