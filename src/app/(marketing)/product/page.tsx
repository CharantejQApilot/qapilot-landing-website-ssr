import type { Metadata } from "next";
import { PlatformOverviewHero } from "@/components/platform-overview/PlatformOverviewHero";
import { PlatformOverviewProblemSection } from "@/components/platform-overview/PlatformOverviewProblemSection";
import { PlatformOverviewQualityJourneySection } from "@/components/platform-overview/PlatformOverviewQualityJourneySection";
import CoreAdvantageHeading from "@/components/CoreAdvantageHeading";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { buildStaticPageMetadata } from "@/lib/seo";
import { ProductSummariseBand } from "@/components/product/ProductSummariseBand";

const PRODUCT_PATH = PATHS.PRODUCT;

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Product. Mobile Testing for Release Readiness",
  description:
    "Unified mobile testing for release readiness: autonomous coverage, stable execution, issue detection, Flutter support, and security visibility.",
  path: PRODUCT_PATH,
  ogDescription:
    "Generate coverage, cut maintenance, detect issues, and validate mobile releases. One platform.",
  twitterDescription:
    "Coverage, stability, Flutter, and risk visibility for mobile release confidence.",
});

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
        <ProductSummariseBand pageUrl={`${SITE_BASE_URL}${PRODUCT_PATH}`} />
        <PlatformOverviewProblemSection />
        <PlatformOverviewQualityJourneySection />
        <CoreAdvantageHeading />
      </main>
    </div>
  );
}
