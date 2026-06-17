import type { Metadata } from "next";
import {
  CoWorkCoverageProblemSection,
  CoWorkHero,
  CoWorkHowItWorksSection,
  CoWorkResultsSection,
  CoWorkWhatChangesSection,
  CoWorkWhyTeamsSection,
} from "@/components/cowork";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildStaticPageMetadata } from "@/lib/seo";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.COWORK}`;

export const metadata: Metadata = buildStaticPageMetadata({
  title: "CoWork — Activate Test Cases You Already Have",
  description:
    "CoWork turns existing test cases into executable mobile automation with AI planning, human-approved replanning, and real-device execution on iOS, Android, and Flutter.",
  path: PATHS.COWORK,
  ogDescription:
    "Activate hundreds of existing test cases before release. AI-assisted execution with human control on real mobile devices.",
  twitterDescription:
    "Turn Jira and TestRail cases into runnable mobile automation with CoWork on QApilot.",
});

export const revalidate = 300;

export default function CoWorkPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Platform overview", path: PATHS.PRODUCT },
              { name: "CoWork", path: PATHS.COWORK },
            ]),
          ),
        }}
      />
      <main>
        <CoWorkHero />
        <CoWorkResultsSection />
        <CoWorkCoverageProblemSection />
        <CoWorkWhatChangesSection />
        <CoWorkHowItWorksSection />
        <CoWorkWhyTeamsSection />
      </main>
    </div>
  );
}
