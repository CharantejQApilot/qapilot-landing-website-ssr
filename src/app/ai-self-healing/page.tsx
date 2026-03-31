import type { Metadata } from "next";
import Footer from "@/components/Footer";
import {
  AiSelfHealingApprovalSection,
  AiSelfHealingDifferentiationSection,
  AiSelfHealingExecutionSection,
  AiSelfHealingHealingEngineSection,
  AiSelfHealingHero,
  AiSelfHealingOutcomesSection,
  AiSelfHealingProblemSection,
  AiSelfHealingReportSection,
  AiSelfHealingShiftSection,
} from "@/components/ai-self-healing";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { PATHS } from "@/lib/routes";

const path = PATHS.AI_SELF_HEALING;
const canonicalUrl = `https://qapilot.io${path}`;

export const metadata: Metadata = {
  title: "AI Self-Healing Tests | QApilot",
  description:
    "Automatically recover from UI changes and keep mobile tests stable—multi-layer healing, real-time execution, approvals, and full report visibility.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "AI Self-Healing Tests | QApilot",
    description:
      "Tests that fix themselves: transparent healing, human approval for locators, and execution reports you can trust.",
    url: canonicalUrl,
  },
};

export const revalidate = 300;

export default function AiSelfHealingPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Platform overview", path: PATHS.PRODUCT },
              { name: "AI Self Healing", path: PATHS.AI_SELF_HEALING },
            ]),
          ),
        }}
      />
      <main>
        <AiSelfHealingHero />
        <AiSelfHealingProblemSection />
        <AiSelfHealingShiftSection />
        <AiSelfHealingHealingEngineSection />
        <AiSelfHealingExecutionSection />
        <AiSelfHealingReportSection />
        <AiSelfHealingApprovalSection />
        <AiSelfHealingOutcomesSection />
        <AiSelfHealingDifferentiationSection />
      </main>
      <Footer />
    </div>
  );
}
