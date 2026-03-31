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
import { MarketingPageShell } from "@/components/marketing";

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
    return { title: "Careers | QApilot" };
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
    return { title: "Job Not Found" };
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
    { name: "Careers", path: PATHS.CAREERS },
    { name: job.role, path: `${PATHS.CAREERS}/${job.slug || job.id}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jobPostingData, breadcrumbData]),
        }}
      />

      <MarketingPageShell background="soft">
      <main>
        {/* Hero Section */}
        <section className="section-edge w-full bg-gradient-to-b from-primary/5 to-background pt-24 pb-12">
          <div className="section-full mx-auto max-w-4xl">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Positions
            </Link>

            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {job.department}
                </span>
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground">
                  {getEmploymentTypeLabel(job.employment_type)}
                </span>
              </div>

              <h1 className="font-heading text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl mb-4">
                {job.role}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-5 h-5" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-5 h-5" />
                  {getEmploymentTypeLabel(job.employment_type)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Job Description + Application Form */}
        <section className="section-edge w-full border-t border-border py-12 md:py-16">
          <div className="section-full mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left: Job Description */}
              <div className="lg:col-span-7">
                <SafeHtmlContent
                  html={job.description}
                  className="prose prose-lg prose-slate max-w-none
                    prose-headings:text-foreground prose-headings:font-bold
                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                    prose-li:text-muted-foreground prose-li:mb-2
                    prose-ul:my-4 prose-ol:my-4
                    prose-strong:text-foreground
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    [&_br]:block [&_br]:mb-4 [&_br]:content-['']
                    [&>*]:mb-4 [&>*:last-child]:mb-0"
                />

                {organization && (
                  <div className="mt-10 pt-8 border-t border-border/30">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        In partnership with
                      </span>
                      {organization.logo_url ? (
                        <img
                          src={organization.logo_url}
                          alt={`${organization.name} logo`}
                          className="h-8 object-contain"
                          width={120}
                          height={32}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                      <span className="font-semibold text-foreground">
                        {organization.name}
                      </span>
                      {organization.website_url && (
                        <a
                          href={organization.website_url}
                          target="_blank"
                          rel="noopener"
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary transition-all duration-300"
                          title={`Visit ${organization.name} website`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Application Form */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-24">
                  <div className="bg-card rounded-2xl border border-border/50 p-6 md:p-8 shadow-sm">
                    <div className="text-center mb-6">
                      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                        Apply for this Position
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Fill out the form below and we&apos;ll review your
                        application.
                      </p>
                    </div>
                    <HubSpotEmbedForm
                      formId={CAREERS_FORM_ID}
                      portalId="47284450"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      </MarketingPageShell>
    </>
  );
}
