import type { Metadata } from "next";
import CareersHeroSection from "@/components/CareersHeroSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import OpenPositionsSection, {
  type JobOpening,
  type JobOrganization,
} from "@/components/OpenPositionsSection";
import { PATHS } from "@/lib/routes";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import { buildStaticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Careers — Join the Team",
  description:
    "Join QApilot and help shape quality in an AI-first world. Explore careers in AI-powered mobile testing and quality assurance.",
  path: PATHS.CAREERS,
  ogDescription: "Career opportunities in AI-powered mobile testing and QA.",
  twitterDescription: "Join the team building AI-native mobile testing and release readiness.",
});

/** Server-render job listings for crawlers (full copy + links in HTML). */
export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const supabase = tryCreateServerSupabaseClient();

  let jobOpenings: JobOpening[] = [];
  let organizations: JobOrganization[] = [];

  if (supabase) {
    const [jobsRes, orgsRes] = await Promise.all([
      supabase
        .from("job_openings")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false }),
      supabase.from("job_organizations").select("*").order("name", {
        ascending: true,
      }),
    ]);

    jobOpenings = (jobsRes.error ? [] : jobsRes.data) as JobOpening[];
    organizations = (orgsRes.error ? [] : orgsRes.data) as JobOrganization[];
  }

  const breadcrumbData = buildBreadcrumbList([
    { name: "Home", path: PATHS.HOME },
    { name: "Platform overview", path: PATHS.PRODUCT },
    { name: "Careers", path: PATHS.CAREERS },
  ]);

  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <main>
        <CareersHeroSection />
        <section
          aria-labelledby="careers-about"
          className="section-edge border-b border-border/60 bg-muted/30"
        >
          <div className="section-full mx-auto max-w-3xl py-12 text-center md:py-16">
            <h2
              id="careers-about"
              className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
            >
              Build the future of AI-native mobile testing
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                QApilot is growing a distributed team of engineers, product builders, and customer
                champions who care about release quality for Android, iOS, and Flutter apps. We work
                on autonomous exploration, intelligent bug detection, and the knowledge graph that
                powers context-aware automation.
              </p>
              <p>
                If you enjoy solving hard mobile QA problems, partnering with enterprise customers,
                and shipping quickly with high ownership, explore the open roles below. We value
                curiosity, clear communication, and outcomes over rigid job descriptions.
              </p>
            </div>
          </div>
        </section>
        <OpenPositionsSection jobOpenings={jobOpenings} organizations={organizations} />
        <HowWeWorkSection />
      </main>
    </div>
  );
}
