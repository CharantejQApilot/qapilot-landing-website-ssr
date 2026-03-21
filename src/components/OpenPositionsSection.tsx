"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  ArrowRight,
  Building2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HubSpotFormDialog from "@/components/HubSpotFormDialog";

export interface JobOrganization {
  id: string;
  name: string;
  logo_url: string | null;
  description: string | null;
  website_url: string | null;
}

export interface JobOpening {
  id: string;
  organization_id: string | null;
  role: string;
  department: string;
  location: string;
  employment_type: "full_time" | "part_time" | "internship";
  description: string;
  published: boolean;
  slug: string | null;
}

const CAREERS_FORM_ID = "702b653d-94c3-4949-b431-45f7a6d035c4";

function getEmploymentTypeLabel(type: string) {
  switch (type) {
    case "full_time":
      return "Full-time";
    case "part_time":
      return "Part-time";
    case "internship":
      return "Internship";
    default:
      return type;
  }
}

interface OpenPositionsSectionProps {
  jobOpenings: JobOpening[];
  organizations: JobOrganization[];
}

/** Job listings are server-fetched and passed in so HTML is crawlable; dialog stays client-only. */
const OpenPositionsSection = ({
  jobOpenings,
  organizations,
}: OpenPositionsSectionProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const qapilotJobs = jobOpenings.filter((job) => !job.organization_id);
  const orgJobsMap = new Map<string, JobOpening[]>();

  organizations.forEach((org) => {
    const jobs = jobOpenings.filter((job) => job.organization_id === org.id);
    if (jobs.length > 0) {
      orgJobsMap.set(org.id, jobs);
    }
  });

  const orgsWithJobs = organizations.filter((org) => orgJobsMap.has(org.id));

  const JobCard = ({ position }: { position: JobOpening }) => (
    <div className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
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

  return (
    <>
      <section id="open-positions" className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Open <span className="text-primary">Positions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find your next opportunity and help us revolutionize software
              quality assurance.
            </p>
          </div>

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

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Don&apos;t see a role that fits? We&apos;re always looking for
              talented people.
            </p>
            <Button
              onClick={() => setIsFormOpen(true)}
              variant="outline"
              className="border-primary/30 hover:bg-primary hover:text-primary-foreground"
            >
              Submit General Application
            </Button>
          </div>
        </div>
      </section>

      {orgsWithJobs.map((org) => {
        const orgJobs = orgJobsMap.get(org.id) || [];

        return (
          <section
            key={org.id}
            className="py-16 md:py-24 relative border-t border-border/30"
          >
            <div className="container mx-auto px-4">
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

              <div className="max-w-4xl mx-auto space-y-4">
                {orgJobs.map((position) => (
                  <JobCard key={position.id} position={position} />
                ))}
              </div>

              <div className="flex justify-center mt-12">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm">
                  <span className="text-sm text-muted-foreground">
                    In partnership with
                  </span>
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
