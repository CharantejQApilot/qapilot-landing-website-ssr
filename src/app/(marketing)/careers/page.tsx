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
  title: "Careers. Join the Team",
  description:
    "Join QApilot and help shape quality in an AI-first world. Reach out with a general application for careers in AI-powered mobile testing and quality assurance.",
  path: PATHS.CAREERS,
  ogDescription:
    "Join the team building AI-native mobile testing and release readiness.",
  twitterDescription:
    "Join the team building AI-native mobile testing and release readiness.",
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
