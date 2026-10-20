import type { Metadata } from "next";
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

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Careers. Working at QApilot",
  description:
    "A small distributed team building AI-native mobile testing for Android, iOS, and Flutter. The group grows when the work needs another owner.",
  path: PATHS.CAREERS,
  ogDescription:
    "A small team building AI-native mobile testing and release readiness.",
  twitterDescription:
    "A small team building AI-native mobile testing and release readiness.",
});

export default function CareersPage() {
  const breadcrumbData = buildBreadcrumbList([
    { name: "Home", path: PATHS.HOME },
    { name: "Platform overview", path: PATHS.PRODUCT },
    { name: "Careers", path: PATHS.CAREERS },
  ]);

  return (
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
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
          <div className="section-full py-16 md:py-20 lg:py-24">
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
                QApilot is a distributed team of engineers, product builders,
                and customer champions who care about release quality for
                Android, iOS, and Flutter apps. The work is autonomous
                exploration, intelligent bug detection, and the knowledge graph
                that powers context-aware automation.
              </p>
              <p>
                The people who do well here like hard mobile QA problems, close
                work with enterprise customers, and shipping with high
                ownership. Curiosity and clear communication matter more than a
                perfect match to a job description.
              </p>
              <p>
                Headcount follows the work. A new seat appears when a problem
                is large enough to need another owner, and the team would
                rather wait than hire ahead of that.
              </p>
              <p>
                Days are spent on real devices and real release trains: an
                Android build that needs coverage before it ships, a Flutter
                flow that broke overnight, a customer who wants a signal they
                can trust. The same small group writes the product, sits with
                customers, and decides what quality means for the next release.
              </p>
            </div>
          </div>
        </section>
        <HowWeWorkSection />
      </main>
    </div>
  );
}
