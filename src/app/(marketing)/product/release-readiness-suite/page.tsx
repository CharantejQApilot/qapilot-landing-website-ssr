import type { Metadata } from "next";
import { ReleaseReadinessSuiteHero } from "@/components/release-readiness-suite/ReleaseReadinessSuiteHero";
import { ReleaseReadinessSuitePillars } from "@/components/release-readiness-suite/ReleaseReadinessSuitePillars";
import { CompareFaqSection } from "@/components/compare/CompareFaqSection";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildStaticPageMetadata } from "@/lib/seo";
import { ProductSummariseBand } from "@/components/product/ProductSummariseBand";
import { buildFaqPageJsonLd } from "@/lib/faq-jsonld";
import { RELEASE_READINESS_FAQS } from "@/lib/page-faqs";

const path = PATHS.RELEASE_READINESS_SUITE;
const canonicalUrl = `${SITE_BASE_URL}${path}`;

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Release Readiness. Bugs, Security, Self-Healing",
  description:
    "Release Readiness Suite: intelligent bug detection, security reports, AI self-healing, and device metrics so mobile teams ship with clearer confidence.",
  path,
  ogDescription:
    "Bug signals, security insight, and self-healing tests in one suite for mobile release readiness.",
  twitterDescription:
    "Intelligent bug detection, security reports, and AI self-healing for mobile release readiness.",
});

export const revalidate = 300;

export default function ReleaseReadinessSuitePage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Platform overview", path: PATHS.PRODUCT },
              { name: "Release Readiness Suite", path },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqPageJsonLd(RELEASE_READINESS_FAQS)),
        }}
      />
      <main>
        <ReleaseReadinessSuiteHero />
        <ProductSummariseBand pageUrl={canonicalUrl} />
        <ReleaseReadinessSuitePillars />
        <CompareFaqSection
          faqs={RELEASE_READINESS_FAQS}
          headingId="release-readiness-faqs"
          title={
            <>
              Frequently asked <span className="text-primary">questions</span>
            </>
          }
        />
      </main>
    </div>
  );
}
