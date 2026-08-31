import type { Metadata } from "next";
import { AutonomousTestingAgentsSection } from "@/components/autonomous-testing/AutonomousTestingAgentsSection";
import { AutonomousTestingDeliverySection } from "@/components/autonomous-testing/AutonomousTestingDeliverySection";
import { AutonomousTestingEvolutionSection } from "@/components/autonomous-testing/AutonomousTestingEvolutionSection";
import { AutonomousTestingHero } from "@/components/autonomous-testing/AutonomousTestingHero";
import { AutonomousTestingReleaseReadinessSection } from "@/components/autonomous-testing/AutonomousTestingReleaseReadinessSection";
import { AutonomousTestingTeamsSection } from "@/components/autonomous-testing/AutonomousTestingTeamsSection";
import { AutonomousTestingWhatChangesSection } from "@/components/autonomous-testing/AutonomousTestingWhatChangesSection";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildStaticPageMetadata } from "@/lib/seo";
import { ProductSummariseBand } from "@/components/product/ProductSummariseBand";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Autonomous Mobile Testing. No Scripts",
  description:
    "Crawl your app like a real user, build a knowledge graph, and generate iOS & Android coverage automatically. Zero scripting required.",
  path: PATHS.AUTONOMOUS_TESTING,
  ogDescription:
    "Autonomous mobile testing: explore, map journeys, and generate coverage with no scripts.",
  twitterDescription:
    "Crawl like a real user and generate test coverage automatically. Zero scripting.",
});

export const revalidate = 300;

export default function AutonomousTestingPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Platform overview", path: PATHS.PRODUCT },
              { name: "Autonomous testing", path: PATHS.AUTONOMOUS_TESTING },
            ]),
          ),
        }}
      />
      <main>
        <AutonomousTestingHero />
        <ProductSummariseBand
          pageUrl={`${SITE_BASE_URL}${PATHS.AUTONOMOUS_TESTING}`}
        />
        <AutonomousTestingEvolutionSection />
        <AutonomousTestingWhatChangesSection />
        <AutonomousTestingDeliverySection />
        <AutonomousTestingTeamsSection />
        <AutonomousTestingAgentsSection />
        <AutonomousTestingReleaseReadinessSection />
      </main>
    </div>
  );
}
