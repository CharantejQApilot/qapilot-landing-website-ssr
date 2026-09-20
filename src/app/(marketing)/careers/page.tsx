import type { Metadata } from "next";
import Link from "next/link";
import CareersHeroSection from "@/components/CareersHeroSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import { PATHS } from "@/lib/routes";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { buildStaticPageMetadata } from "@/lib/seo";
import {
  marketingSectionH2Class,
  marketingSectionIntroClass,
} from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { tryCreateServerSupabaseClient } from "@/integrations/supabase/server";
import { ArrowRight, MapPin } from "lucide-react";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Careers. Join the Team",
  description:
    "Join QApilot and help shape quality in an AI-first world. Reach out with a general application for careers in AI-powered mobile testing and quality assurance.",
  path: PATHS.CAREERS,
  ogDescription:
    "Join the team building AI-native mobile testing and release readiness.",
  twitterDescription:
    "Join the team building AI-native mobile testing and release readiness.",
});

export const revalidate = 120;

type OpenRole = {
  role: string;
  department: string;
  location: string;
  slug: string | null;
  id: string;
};

async function loadOpenRoles(): Promise<OpenRole[]> {
  const supabase = tryCreateServerSupabaseClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("job_openings")
    .select("id, role, department, location, slug")
    .eq("published", true)
    .order("role", { ascending: true });
  return (data ?? []) as OpenRole[];
}

export default async function CareersPage() {
  const breadcrumbData = buildBreadcrumbList([
    { name: "Home", path: PATHS.HOME },
    { name: "Platform overview", path: PATHS.PRODUCT },
    { name: "Careers", path: PATHS.CAREERS },
  ]);
  const openRoles = await loadOpenRoles();

  return (
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <main>
        <CareersHeroSection />
        {openRoles.length > 0 ? (
          <section
            aria-labelledby="careers-open-roles"
            className="section-edge border-b border-border/60"
          >
            <div className="section-full py-14 md:py-20 2xl:py-24">
              <h2
                id="careers-open-roles"
                className={cn(
                  marketingSectionH2Class,
                  "w-full text-balance text-foreground",
                )}
              >
                Open <span className="text-primary">roles</span>
              </h2>
              <p
                className={cn(
                  marketingSectionIntroClass,
                  "mt-4 max-w-2xl text-pretty",
                )}
              >
                Browse current openings. Each role links to the full description
                and application form.
              </p>
              <ul className="mt-8 divide-y divide-border border border-border bg-background">
                {openRoles.map((job) => {
                  const href = `${PATHS.CAREERS}/${job.slug || job.id}`;
                  return (
                    <li key={job.id}>
                      <Link
                        href={href}
                        className="group flex flex-col gap-2 px-5 py-5 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                      >
                        <div className="min-w-0">
                          <p className="font-heading text-lg font-semibold text-foreground group-hover:text-primary">
                            {job.role}
                          </p>
                          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                            <span>{job.department}</span>
                            {job.location ? (
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" aria-hidden />
                                {job.location}
                              </span>
                            ) : null}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                          View role
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ) : null}
        <section
          aria-labelledby="careers-about"
          className="section-edge border-b border-border/60 bg-muted/30"
        >
          <div className="section-full py-14 md:py-20 2xl:py-24">
            <h2
              id="careers-about"
              className={cn(
                marketingSectionH2Class,
                "w-full text-balance text-foreground",
              )}
            >
              Build the future of{" "}
              <span className="text-primary">AI-native mobile testing</span>
            </h2>
            <div
              className={cn(
                marketingSectionIntroClass,
                "mt-6 w-full max-w-none space-y-4 text-pretty md:mt-8",
              )}
            >
              <p>
                QApilot is growing a distributed team of engineers, product
                builders, and customer champions who care about release quality
                for Android, iOS, and Flutter apps. We work on autonomous
                exploration, intelligent bug detection, and the knowledge graph
                that powers context-aware automation.
              </p>
              <p>
                If you enjoy solving hard mobile QA problems, partnering with
                enterprise customers, and shipping quickly with high ownership,
                reach out above. We value curiosity, clear communication, and
                outcomes over rigid job descriptions.
              </p>
            </div>
          </div>
        </section>
        <HowWeWorkSection />
      </main>
    </div>
  );
}
