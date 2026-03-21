import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CareersHeroSection from "@/components/CareersHeroSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import OpenPositionsSection, {
  type JobOpening,
  type JobOrganization,
} from "@/components/OpenPositionsSection";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";

export const metadata: Metadata = {
  title: "Careers - Join the QApilot Team",
  description:
    "Join the QApilot team. Help shape what quality looks like in an AI-first world. Explore career opportunities in AI-powered quality assurance.",
  keywords:
    "QApilot careers, QA automation jobs, AI testing jobs, software testing careers",
  alternates: { canonical: `${SITE_BASE_URL}${PATHS.CAREERS}` },
};

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
    { name: "Careers", path: PATHS.CAREERS },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <main className="min-h-screen bg-background">
        <CareersHeroSection />
        <OpenPositionsSection
          jobOpenings={jobOpenings}
          organizations={organizations}
        />
        <HowWeWorkSection />
      </main>
      <Footer />
    </>
  );
}
