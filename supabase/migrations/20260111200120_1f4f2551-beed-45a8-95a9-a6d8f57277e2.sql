-- Create enum for employment type
CREATE TYPE public.employment_type AS ENUM ('full_time', 'part_time', 'internship');

-- Create table for partner organizations
CREATE TABLE public.job_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for job openings
CREATE TABLE public.job_openings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.job_organizations(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  employment_type public.employment_type NOT NULL DEFAULT 'full_time',
  description TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_openings ENABLE ROW LEVEL SECURITY;

-- RLS policies for job_organizations
CREATE POLICY "Anyone can view job organizations"
ON public.job_organizations FOR SELECT
USING (true);

CREATE POLICY "Admins can create job organizations"
ON public.job_organizations FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update job organizations"
ON public.job_organizations FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete job organizations"
ON public.job_organizations FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for job_openings
CREATE POLICY "Published jobs are viewable by everyone"
ON public.job_openings FOR SELECT
USING (published = true);

CREATE POLICY "Admins can view all jobs"
ON public.job_openings FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role) OR published = true);

CREATE POLICY "Admins can create jobs"
ON public.job_openings FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update jobs"
ON public.job_openings FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete jobs"
ON public.job_openings FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add updated_at triggers
CREATE TRIGGER update_job_organizations_updated_at
BEFORE UPDATE ON public.job_organizations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_openings_updated_at
BEFORE UPDATE ON public.job_openings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();