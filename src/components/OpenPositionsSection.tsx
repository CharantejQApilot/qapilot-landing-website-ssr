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
import { MarketingSectionHeader } from "@/components/marketing";
import { cn } from "@/lib/utils";

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
const OpenPositionsSection = ({ jobOpenings, organizations }: OpenPositionsSectionProps) => {
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
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/80 shadow-sm backdrop-blur-sm transition-colors md:flex-row md:items-center md:justify-between",
        "motion-safe:hover:border-primary/30 motion-safe:hover:shadow-md",
      )}
    >
      <span className="absolute bottom-0 left-0 top-0 w-1 bg-primary/90" aria-hidden />
      <div className="flex flex-1 flex-col gap-4 p-6 pl-5 md:flex-row md:items-center md:justify-between md:pl-6 md:pr-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary">
              {position.department}
            </span>
          </div>
          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-xl">
            {position.role}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              {position.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 shrink-0" aria-hidden />
              {getEmploymentTypeLabel(position.employment_type)}
            </span>
          </div>
        </div>

        <Link href={`/careers/${position.slug || position.id}`} className="shrink-0 md:pl-4">
          <Button
            variant="outline"
            className="w-full border-primary/30 transition-colors hover:bg-primary hover:text-primary-foreground md:w-auto"
          >
            Know More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <section
        id="open-positions"
        className="section-edge relative w-full border-t border-border/60 bg-background"
        aria-labelledby="open-positions-heading"
      >
        <div className="section-full py-14 md:py-20 2xl:py-24">
          <MarketingSectionHeader
            id="open-positions-heading"
            title={
              <>
                Open <span className="text-primary">Positions</span>
              </>
            }
            description="Find your next opportunity and help us revolutionize software quality assurance."
            marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
          />

          {qapilotJobs.length > 0 ? (
            <ul className="mx-auto flex max-w-4xl flex-col gap-4 md:gap-5">
              {qapilotJobs.map((position) => (
                <li key={position.id}>
                  <JobCard position={position} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-8 text-center text-muted-foreground">No QApilot positions available at the moment.</p>
          )}

          <div className="mx-auto mt-12 max-w-4xl text-center">
            <p className="mb-4 text-muted-foreground">
              Don&apos;t see a role that fits? We&apos;re always looking for talented people.
            </p>
            <Button
              type="button"
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
        const headingId = `org-positions-${org.id}`;

        return (
          <section
            key={org.id}
            className="section-edge relative w-full border-t border-border/60 bg-background"
            aria-labelledby={headingId}
          >
            <div className="section-full py-14 md:py-20 2xl:py-24">
              <MarketingSectionHeader
                id={headingId}
                title={org.name}
                description={org.description ?? undefined}
                marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
              />

              <ul className="mx-auto flex max-w-4xl flex-col gap-4 md:gap-5">
                {orgJobs.map((position) => (
                  <li key={position.id}>
                    <JobCard position={position} />
                  </li>
                ))}
              </ul>

              <div className="mt-12 flex justify-center">
                <div className="inline-flex items-center gap-3 rounded-full border border-border/80 bg-card/80 px-6 py-3 shadow-sm backdrop-blur-sm">
                  <span className="text-sm text-muted-foreground">In partnership with</span>
                  {org.logo_url ? (
                    <img
                      src={org.logo_url}
                      alt={`${org.name} logo`}
                      className="h-6 object-contain md:h-8"
                      width={120}
                      height={32}
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                      <Building2 className="h-4 w-4 text-muted-foreground" aria-hidden />
                    </div>
                  )}
                  {org.website_url ? (
                    <a
                      href={org.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                      title={`Visit ${org.name} website`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                      <span className="sr-only">Visit {org.name} (opens in a new tab)</span>
                    </a>
                  ) : null}
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
