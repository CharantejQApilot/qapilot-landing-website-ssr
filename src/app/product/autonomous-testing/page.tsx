import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { AutonomousTestingAgentsSection } from "@/components/autonomous-testing/AutonomousTestingAgentsSection";
import { AutonomousTestingDeliverySection } from "@/components/autonomous-testing/AutonomousTestingDeliverySection";
import { AutonomousTestingEvolutionSection } from "@/components/autonomous-testing/AutonomousTestingEvolutionSection";
import { AutonomousTestingHero } from "@/components/autonomous-testing/AutonomousTestingHero";
import { AutonomousTestingReleaseReadinessSection } from "@/components/autonomous-testing/AutonomousTestingReleaseReadinessSection";
import { AutonomousTestingTeamsSection } from "@/components/autonomous-testing/AutonomousTestingTeamsSection";
import { AutonomousTestingWhatChangesSection } from "@/components/autonomous-testing/AutonomousTestingWhatChangesSection";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { PATHS } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Autonomous Testing for Mobile Applications | QApilot",
  description:
    "Define autonomous testing for mobile: system-discovered journeys, adaptive coverage, and release readiness. See how QApilot operates beyond scripts and record-and-playback.",
  alternates: {
    canonical: "https://qapilot.io/product/autonomous-testing",
  },
  openGraph: {
    title: "Autonomous Testing for Mobile Applications | QApilot",
    description:
      "Coverage discovered, generated, and maintained by the system—so teams move faster from exploration to release confidence.",
    url: "https://qapilot.io/product/autonomous-testing",
  },
  twitter: {
    title: "Autonomous Testing for Mobile | QApilot",
    description:
      "Autonomous mobile testing: exploration, knowledge graph, coverage generation, execution, and continuous adaptation.",
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
      <Footer />
    </div>
  );
}
