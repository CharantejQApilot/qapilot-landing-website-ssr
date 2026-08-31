import type { Metadata } from "next";
import {
  FlutterTestingFlowSection,
  FlutterTestingHero,
  FlutterTestingOutcomesSection,
  FlutterTestingProblemSection,
  FlutterTestingSolutionSection,
  FlutterTestingVideoSection,
} from "@/components/flutter-testing";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildStaticPageMetadata } from "@/lib/seo";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.FOR_FLUTTER}`;

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Flutter Testing That Actually Works",
  description:
    "QApilot runs Flutter, native, and webview in one flow. AI element discovery, low-maintenance tests, and release-ready coverage on real devices.",
  path: PATHS.FOR_FLUTTER,
  ogDescription:
    "Built for real apps, devices, and complexity. Cross-context execution, AI discovery, and autonomous risk detection.",
  twitterDescription:
    "Cross-context Flutter, native, and webview testing with AI discovery on real devices.",
});

export const revalidate = 300;

export default function ForFlutterPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Platform overview", path: PATHS.PRODUCT },
              { name: "Flutter Testing", path: PATHS.FOR_FLUTTER },
            ]),
          ),
        }}
      />
      <main>
        <FlutterTestingHero />
        <FlutterTestingProblemSection />
        <FlutterTestingSolutionSection />
        <FlutterTestingFlowSection />
        <FlutterTestingVideoSection />
        <FlutterTestingOutcomesSection />
      </main>
    </div>
  );
}
