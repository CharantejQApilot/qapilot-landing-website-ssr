-- Add website_url column to job_organizations table
ALTER TABLE public.job_organizations
ADD COLUMN website_url text;