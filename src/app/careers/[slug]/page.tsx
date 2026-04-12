import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import Footer from "@/components/Footer";
import SafeHtmlContent from "@/components/SafeHtmlContent";
import HubSpotEmbedForm from "@/components/HubSpotEmbedForm";
import { ArrowLeft, MapPin, Clock, Building2, ExternalLink } from "lucide-react";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL, DEFAULT_LOGO_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

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
  employment_type: "full_time" | "part_time" | "internship";
  description: string;
  published: boolean;
  slug: string | null;
  created_at: string;
  updated_at: string;
}

const CAREERS_FORM_ID = "702b653d-94c3-4949-b431-45f7a6d035c4";

const getEmploymentTypeLabel = (type: string) => {
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
};

const getEmploymentTypeSchema = (type: string) => {
  switch (type) {
    case "full_time":
      return "FULL_TIME";
    case "part_time":
      return "PART_TIME";
    case "internship":
      return "INTERN";
    default:
      return "FULL_TIME";
  }
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) {
    notFound();
  }

  let { data: job } = await supabase
    .from("job_openings")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .maybeSingle();

  if (!job) {
    const { data } = await supabase
      .from("job_openings")
      .select("*")
      .eq("id", params.slug)
      .eq("published", true)
      .maybeSingle();
    job = data;
  }

  if (!job) {
    notFound();
  }

  const typedJob = job as JobOpening;
  const description = `Join us as a ${typedJob.role} in ${typedJob.department}. ${typedJob.location}. ${getEmploymentTypeLabel(typedJob.employment_type)} position at QApilot.`;

  return {
    title: `${typedJob.role} - ${typedJob.department}`,
    description,
    keywords: `${typedJob.role}, ${typedJob.department}, QApilot careers, ${typedJob.location} jobs, ${getEmploymentTypeLabel(typedJob.employment_type)}`,
    alternates: {
      canonical: `${SITE_BASE_URL}${PATHS.CAREERS}/${typedJob.slug || typedJob.id}`,
    },
  };
}

export default async function JobPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) {
    notFound();
  }

  let { data: jobData } = await supabase
    .from("job_openings")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .maybeSingle();

  if (!jobData) {
    const { data } = await supabase
      .from("job_openings")
      .select("*")
      .eq("id", params.slug)
      .eq("published", true)
      .maybeSingle();
    jobData = data;
  }

  if (!jobData) {
    notFound();
  }

  const job = jobData as JobOpening;

  let organization: JobOrganization | null = null;
  if (job.organization_id) {
    const { data } = await supabase
      .from("job_organizations")
      .select("*")
      .eq("id", job.organization_id)
      .single();
    organization = data as JobOrganization | null;
  }

  const canonicalUrl = `${SITE_BASE_URL}${PATHS.CAREERS}/${job.slug || job.id}`;

  const jobPostingData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    url: canonicalUrl,
    title: job.role,
    description: job.description.replace(/<[^>]*>/g, ""),
    datePosted: job.created_at,
    validThrough: new Date(
      new Date(job.updated_at).getTime() + 90 * 24 * 60 * 60 * 1000
    ).toISOString(),
    employmentType: getEmploymentTypeSchema(job.employment_type),
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "IN",
      },
    },
    hiringOrganization: {
      "@type": "Organization",
      name: organization?.name || "QApilot",
      sameAs: organization?.website_url || SITE_BASE_URL,
      logo: organization?.logo_url || DEFAULT_LOGO_URL,
    },
    industry: "Software Testing & QA",
    occupationalCategory: job.department,
  };

  const breadcrumbData = buildBreadcrumbList([
    { name: "Home", path: PATHS.HOME },
    { name: "Platform overview", path: PATHS.PRODUCT },
    { name: "Careers", path: PATHS.CAREERS },
    { name: job.role, path: `${PATHS.CAREERS}/${job.slug || job.id}` },
  ]);

  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jobPostingData, breadcrumbData]),
        }}
      />

      <main>
        <section
          className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible"
          aria-labelledby="job-hero-title"
        >
          <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple={false} progressiveBlur={false} />
          <div className="relative z-10 w-full section-full py-14 sm:py-16 md:py-20 lg:py-24">
            <div className="mx-auto w-full max-w-6xl px-3 sm:px-4 lg:max-w-7xl 2xl:max-w-[90rem]">
              <Link
                href={PATHS.CAREERS}
                className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
                Back to all positions
              </Link>

              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {job.department}
                </span>
                <span className="rounded-full border border-border/80 bg-muted/50 px-3 py-1 text-sm font-medium text-muted-foreground">
                  {getEmploymentTypeLabel(job.employment_type)}
                </span>
              </div>

              <h1 id="job-hero-title" className={cn(marketingHeroH1Class, "mb-6 text-balance")}>
                {job.role}
              </h1>

              <p className={cn(marketingHeroLeadClass, "flex flex-wrap gap-x-6 gap-y-2 text-foreground/85")}>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-5 w-5 shrink-0 text-primary/80" aria-hidden />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-5 w-5 shrink-0 text-primary/80" aria-hidden />
                  {getEmploymentTypeLabel(job.employment_type)}
                </span>
              </p>
            </div>
          </div>
        </section>

        <section className="section-edge w-full border-t border-border/60 bg-background">
          <div className="section-full py-14 md:py-20 2xl:py-24">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <SafeHtmlContent
                  html={job.description}
                  className="prose prose-lg max-w-none prose-slate
                    prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground
                    prose-p:mb-4 prose-p:leading-relaxed prose-p:text-muted-foreground
                    prose-li:mb-2 prose-li:text-muted-foreground
                    prose-ul:my-4 prose-ol:my-4
                    prose-strong:text-foreground
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    [&_br]:mb-4 [&_br]:block [&_br]:content-['']
                    [&>*]:mb-4 [&>*:last-child]:mb-0"
                />

                {organization ? (
                  <div className="mt-10 border-t border-border/60 pt-8">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-sm text-muted-foreground">In partnership with</span>
                      {organization.logo_url ? (
                        <img
                          src={organization.logo_url}
                          alt={`${organization.name} logo`}
                          className="h-8 object-contain"
                          width={120}
                          height={32}
                        />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                          <Building2 className="h-4 w-4 text-muted-foreground" aria-hidden />
                        </div>
                      )}
                      <span className="font-semibold text-foreground">{organization.name}</span>
                      {organization.website_url ? (
                        <a
                          href={organization.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                          title={`Visit ${organization.name} website`}
                        >
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                          <span className="sr-only">Visit {organization.name} (opens in a new tab)</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-24">
                  <div className="rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur-sm md:p-8">
                    <div className="mb-6 text-center md:text-left">
                      <h2 className="font-heading text-xl font-bold text-foreground md:text-2xl">Apply for this role</h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Fill out the form below and we&apos;ll review your application.
                      </p>
                    </div>
                    <HubSpotEmbedForm formId={CAREERS_FORM_ID} portalId="47284450" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
