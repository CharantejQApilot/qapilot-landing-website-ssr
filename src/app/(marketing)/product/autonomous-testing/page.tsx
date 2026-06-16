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
import { defaultOpenGraphImage } from "@/lib/seo";
import { formatPageTitle } from "@/lib/page-title";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.AUTONOMOUS_TESTING}`;

const PAGE_TITLE = formatPageTitle("Autonomous Mobile Testing — No Scripts");
const PAGE_TITLE_TEXT = PAGE_TITLE.absolute;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "QApilot's autonomous testing engine crawls your app like a real user, builds a knowledge graph, and generates test coverage automatically — zero scripting required. iOS & Android.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: PAGE_TITLE_TEXT,
    description:
      "QApilot's autonomous testing engine crawls your app like a real user, builds a knowledge graph, and generates test coverage automatically — zero scripting required. iOS & Android.",
    url: canonicalUrl,
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE_TEXT,
    description:
      "Crawl your app like a real user, build a knowledge graph, and generate test coverage automatically — zero scripting required.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export const revalidate = 300;

export default function AutonomousTestingPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
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
