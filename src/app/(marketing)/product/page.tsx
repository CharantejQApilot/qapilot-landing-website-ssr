import type { Metadata } from "next";
import Link from "next/link";
import { PlatformOverviewHero } from "@/components/platform-overview/PlatformOverviewHero";
import { PlatformOverviewProblemSection } from "@/components/platform-overview/PlatformOverviewProblemSection";
import { PlatformOverviewQualityJourneySection } from "@/components/platform-overview/PlatformOverviewQualityJourneySection";
import CoreAdvantageHeading from "@/components/CoreAdvantageHeading";
import { PATHS, PLATFORM_BY_SOLUTION } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { buildStaticPageMetadata } from "@/lib/seo";
import { ProductSummariseBand } from "@/components/product/ProductSummariseBand";
import { softwareApplicationJsonLd } from "@/lib/root-jsonld";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd),
        }}
      />
      <main>
        <PlatformOverviewHero />
        <ProductSummariseBand pageUrl={`${SITE_BASE_URL}${PRODUCT_PATH}`} />
        <nav
          aria-label="Platform capabilities"
          className="section-full border-t border-border/70 py-6"
        >
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Platform capabilities:{" "}
            {PLATFORM_BY_SOLUTION.filter((item) => item.path !== PATHS.OVERVIEW)
              .map((item, index, items) => (
                <span key={item.path}>
                  <Link href={item.path} className="font-semibold text-primary hover:underline">
                    {item.label}
                  </Link>
                  {index < items.length - 1 ? ", " : "."}
                </span>
              ))}
          </p>
        </nav>
        <PlatformOverviewProblemSection />
        <PlatformOverviewQualityJourneySection />
        <CoreAdvantageHeading />
      </main>
    </div>
  );
}
