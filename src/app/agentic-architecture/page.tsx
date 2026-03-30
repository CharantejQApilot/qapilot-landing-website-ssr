import type { Metadata } from "next";
import Footer from "@/components/Footer";
import DifferentiatorsHeroSection from "@/components/DifferentiatorsHeroSection";
import { MarketingPageShell } from "@/components/marketing";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { SITE_BASE_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.AGENTIC_ARCHITECTURE}`;

export const metadata: Metadata = {
  title: "QApilot's Agentic Architecture | AI Agents",
  description:
    "How QApilot orchestrates specialized agents for exploration, test generation, execution, and issue detection—native agents, your agents, and the QApilot framework as one system.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "QApilot's Agentic Architecture | AI Agents",
    description:
      "See how specialized agents connect through the QApilot framework for autonomous mobile testing.",
    url: canonicalUrl,
  },
};

export const revalidate = 300;

const breadcrumbList = buildBreadcrumbList([
  { name: "Home", path: PATHS.HOME },
  { name: "Platform overview", path: PATHS.PRODUCT },
  { name: "QApilot's Agentic Architecture", path: PATHS.AGENTIC_ARCHITECTURE },
]);

export default function AgenticArchitecturePage() {
  return (
    <MarketingPageShell
      background="hero"
      heroBackgroundOptions={{ showDiagonalGrid: false, showPixelRipple: false }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <main>
        <DifferentiatorsHeroSection
          title={
            <>
              QApilot&apos;s <span className="text-primary">Agentic Architecture</span>
            </>
          }
          subtitle={
            <>
              <p>
                Autonomous testing is not a single model—it is a <span className="font-semibold text-primary">network of specialized agents</span>{" "}
                coordinating exploration, coverage, execution, and detection through a shared framework.
              </p>
              <p className="text-xl font-semibold text-foreground">
                Native agents, your agents, and QApilot—wired as one system.
              </p>
            </>
          }
        />
      </main>
      <Footer />
    </MarketingPageShell>
  );
}
