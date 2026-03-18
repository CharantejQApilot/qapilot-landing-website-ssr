"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Clock, ArrowRight, Building2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import HubSpotFormDialog from "@/components/HubSpotFormDialog";

interface JobOrganization {
  id: string;
  name: string;
  logo_url: string | null;
  description: string | null;
  website_url: string | null;
}

interface JobOpening {
  id: string;
  organization_id: string | null;
  role: string;
  department: string;
  location: string;
  employment_type: 'full_time' | 'part_time' | 'internship';
  description: string;
  published: boolean;
  slug: string | null;
}

const CAREERS_FORM_ID = "702b653d-94c3-4949-b431-45f7a6d035c4";

const OpenPositionsSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Fetch published job openings
  const { data: jobOpenings, isLoading: jobsLoading } = useQuery({
    queryKey: ["published-job-openings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_openings")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as JobOpening[];
    },
  });

  // Fetch organizations
  const { data: organizations } = useQuery({
    queryKey: ["job-organizations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("job_organizations")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      return data as JobOrganization[];
    },
  });

  const handleGeneralApply = () => {
    setIsFormOpen(true);
  };

  const getEmploymentTypeLabel = (type: string) => {
    switch (type) {
      case 'full_time': return 'Full-time';
      case 'part_time': return 'Part-time';
      case 'internship': return 'Internship';
      default: return type;
    }
  };

  // Group jobs
  const qapilotJobs = jobOpenings?.filter(job => !job.organization_id) || [];
  const orgJobsMap = new Map<string, JobOpening[]>();
  
  organizations?.forEach(org => {
    const jobs = jobOpenings?.filter(job => job.organization_id === org.id) || [];
    if (jobs.length > 0) {
      orgJobsMap.set(org.id, jobs);
    }
  });

  // Get organizations that have jobs
  const orgsWithJobs = organizations?.filter(org => orgJobsMap.has(org.id)) || [];

  if (jobsLoading) {
    return (
      <section id="open-positions" className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="animate-pulse bg-muted h-12 w-64 mx-auto rounded mb-4" />
            <div className="animate-pulse bg-muted h-6 w-96 mx-auto rounded" />
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="animate-pulse bg-muted h-5 w-20 rounded-full" />
                    <div className="animate-pulse bg-muted h-7 w-48 rounded" />
                    <div className="flex gap-4">
                      <div className="animate-pulse bg-muted h-4 w-28 rounded" />
                      <div className="animate-pulse bg-muted h-4 w-20 rounded" />
                    </div>
                  </div>
                  <div className="animate-pulse bg-muted h-10 w-28 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Reusable job card component
  const JobCard = ({ position }: { position: JobOpening }) => {
    const hasDetailPage = !!position.slug;
    
    return (
      <div
        className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                {position.department}
              </span>
            </div>
            <h4 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {position.role}
            </h4>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {position.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {getEmploymentTypeLabel(position.employment_type)}
              </span>
            </div>
          </div>
          
          <Link href={`/careers/${position.slug || position.id}`}>
            <Button
              variant="outline"
              className="group/btn border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Know More
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* QAPilot Open Positions Section */}
      <section id="open-positions" className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Open <span className="text-primary">Positions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find your next opportunity and help us revolutionize software quality assurance.
            </p>
          </div>

          {/* QAPilot Positions */}
          {qapilotJobs.length > 0 ? (
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {qapilotJobs.map((position) => (
                  <JobCard key={position.id} position={position} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No QAPilot positions available at the moment.
              </p>
            </div>
          )}

          {/* General application CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Don't see a role that fits? We're always looking for talented people.
            </p>
            <Button
              onClick={handleGeneralApply}
              variant="outline"
              className="border-primary/30 hover:bg-primary hover:text-primary-foreground"
            >
              Submit General Application
            </Button>
          </div>
        </div>
      </section>

      {/* Partner Organization Sections - Each org gets its own section */}
      {orgsWithJobs.map((org) => {
        const orgJobs = orgJobsMap.get(org.id) || [];
        
        return (
          <section 
            key={org.id} 
            className="py-16 md:py-24 relative border-t border-border/30"
          >
            <div className="container mx-auto px-4">
              {/* Organization Name as Header */}
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {org.name}
                </h2>
                {org.description && (
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {org.description}
                  </p>
                )}
              </div>

              {/* Organization Jobs */}
              <div className="max-w-4xl mx-auto space-y-4">
                {orgJobs.map((position) => (
                  <JobCard key={position.id} position={position} />
                ))}
              </div>

              {/* In partnership with badge at bottom */}
              <div className="flex justify-center mt-12">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm">
                  <span className="text-sm text-muted-foreground">In partnership with</span>
                  {org.logo_url ? (
                    <img 
                      src={org.logo_url} 
                      alt={org.name} 
                      className="h-6 md:h-8 object-contain"
                      width={120}
                      height={32}
                    />
                  ) : (
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-muted flex items-center justify-center">
                      <Building2 className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
                    </div>
                  )}
                  {org.website_url && (
                    <a 
                      href={org.website_url} 
                      target="_blank" 
                      rel="noopener"
                      className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary transition-all duration-300"
                      title={`Visit ${org.name} website`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Careers Application Form Dialog - for general applications */}
      <HubSpotFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Submit General Application"
        description="Fill out the form below and we'll review your application."
        formId={CAREERS_FORM_ID}
        formName="Careers General Application"
      />
    </>
  );
};

export default OpenPositionsSection;
