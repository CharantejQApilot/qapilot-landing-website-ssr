import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { PATHS } from "@/lib/routes";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Autonomous Mobile App Testing - Agentic QA Platform",
  description:
    "Experience agentic testing with QApilot: AI crawlers, intelligent agents, and a knowledge graph for autonomous mobile test coverage on iOS and Android.",
  alternates: {
    canonical: "https://qapilot.io/product/autonomous-testing",
  },
  openGraph: {
    title: "Autonomous Mobile App Testing - Agentic QA | QApilot",
    description:
      "AI crawlers and intelligent agents deliver autonomous mobile test coverage. Explore how QApilot works from upload to insights.",
    url: "https://qapilot.io/product/autonomous-testing",
  },
  twitter: {
    title: "Autonomous Mobile App Testing | QApilot",
    description:
      "Agentic mobile testing with AI crawlers, intelligent agents, and a knowledge graph for iOS and Android.",
  },
};

export const revalidate = 300;

export default function AutonomousTestingPage() {
  return (
    <MarketingPageShell background="hero" contentClassName="contain-layout">
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
      <main className="mx-auto max-w-4xl px-4 py-24 md:py-32">
        <h1 className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl">
          Autonomous testing
        </h1>
      </main>
      <Footer />
    </MarketingPageShell>
  );
}
