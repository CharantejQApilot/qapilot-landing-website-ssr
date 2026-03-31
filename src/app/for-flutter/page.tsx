import type { Metadata } from "next";
import Footer from "@/components/Footer";
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

export const metadata: Metadata = {
  title: "Flutter Testing That Actually Works | QApilot",
  description:
    "QApilot runs Flutter, native, and webview in one flow—AI element discovery, low-maintenance tests, and release-ready coverage on real devices.",
  alternates: {
    canonical: "https://qapilot.io/for-flutter",
  },
  openGraph: {
    title: "Flutter Testing That Actually Works | QApilot",
    description:
      "Built for real apps, devices, and complexity. Cross-context execution, AI discovery, and autonomous risk detection.",
    url: "https://qapilot.io/for-flutter",
  },
};

export const revalidate = 300;

export default function ForFlutterPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
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
      <Footer />
    </div>
  );
}
