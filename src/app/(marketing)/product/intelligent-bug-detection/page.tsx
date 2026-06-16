import type { Metadata } from "next";
import { IntelligentBugCategoriesSection } from "@/components/intelligent-bug-detection/IntelligentBugCategoriesSection";
import { IntelligentBugDetectionHero } from "@/components/intelligent-bug-detection/IntelligentBugDetectionHero";
import { IntelligentBugIssueDetailSection } from "@/components/intelligent-bug-detection/IntelligentBugIssueDetailSection";
import { IntelligentBugProblemSection } from "@/components/intelligent-bug-detection/IntelligentBugProblemSection";
import { IntelligentBugReleaseNarrativeSection } from "@/components/intelligent-bug-detection/IntelligentBugReleaseNarrativeSection";
import { IntelligentBugScreenMappingSection } from "@/components/intelligent-bug-detection/IntelligentBugScreenMappingSection";
import { IntelligentBugShiftSection } from "@/components/intelligent-bug-detection/IntelligentBugShiftSection";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";

const path = PATHS.INTELLIGENT_BUG_DETECTION;
const canonicalUrl = `${SITE_BASE_URL}${path}`;

export const metadata: Metadata = {
  title: "Intelligent Bug Detection for Mobile Applications",
  description:
    "Go beyond pass or fail. QApilot detects accessibility, latency, and load issues during execution—mapped to exact screens with evidence, severity, and fix guidance.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Intelligent Bug Detection for Mobile | QApilot",
    description:
      "Actionable issue intelligence: categories, screen mapping, screenshots, metadata, and corrective guidance for stronger release readiness.",
    url: canonicalUrl,
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Intelligent Bug Detection for Mobile | QApilot",
    description:
      "Detect meaningful patterns during crawl and execution—not just failures—with context teams can act on.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export const revalidate = 300;

export default function IntelligentBugDetectionPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Platform overview", path: PATHS.PRODUCT },
              { name: "Intelligent Bug Detection", path },
            ]),
          ),
        }}
      />
      <main>
        <IntelligentBugDetectionHero />
        <IntelligentBugProblemSection />
        <IntelligentBugShiftSection />
        <IntelligentBugCategoriesSection />
        <IntelligentBugScreenMappingSection />
        <IntelligentBugIssueDetailSection />
        <IntelligentBugReleaseNarrativeSection />
      </main>
    </div>
  );
}
