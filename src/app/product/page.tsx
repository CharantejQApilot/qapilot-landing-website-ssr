import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { PlatformOverviewHero } from "@/components/platform-overview/PlatformOverviewHero";
import { PlatformOverviewProblemSection } from "@/components/platform-overview/PlatformOverviewProblemSection";
import { PlatformOverviewQualityJourneySection } from "@/components/platform-overview/PlatformOverviewQualityJourneySection";
import CoreAdvantageHeading from "@/components/CoreAdvantageHeading";
import { PATHS } from "@/lib/routes";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";

const PRODUCT_PATH = PATHS.PRODUCT;
const canonicalUrl = `${SITE_BASE_URL}${PRODUCT_PATH}`;

export const metadata: Metadata = {
  title: "Mobile Testing Platform for Release Readiness",
  description:
    "QApilot is a unified mobile testing platform for release readiness: autonomous coverage, stable execution, intelligent issue detection, Flutter support, and security visibility—designed as one integrated system.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Mobile Testing Platform for Release Readiness | QApilot",
    description:
      "Generate coverage, reduce maintenance, detect critical issues, and validate mobile releases with confidence—one platform, built as a system.",
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Testing Platform for Release Readiness | QApilot",
    description:
      "Unified capabilities for mobile release confidence: coverage, stability, signal quality, Flutter, and risk visibility.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export const revalidate = 120;

const breadcrumbList = buildBreadcrumbList([
  { name: "Home", path: PATHS.HOME },
  { name: "Platform overview", path: PRODUCT_PATH },
]);

export default function ProductPage() {
  return (
    <div className="relative z-0 min-h-screen w-full bg-background section-edge">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <main>
        <PlatformOverviewHero />
        <PlatformOverviewProblemSection />
        <PlatformOverviewQualityJourneySection />
        <CoreAdvantageHeading />
      </main>
      <Footer />
    </div>
  );
}
