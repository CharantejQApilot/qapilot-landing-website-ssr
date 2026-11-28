import type { Metadata } from "next";
import { DesignTestingChecksSection } from "@/components/design-testing/DesignTestingChecksSection";
import { DesignTestingFitSection } from "@/components/design-testing/DesignTestingFitSection";
import { DesignTestingHero } from "@/components/design-testing/DesignTestingHero";
import { DesignTestingProblemSection } from "@/components/design-testing/DesignTestingProblemSection";
import { ProductSummariseBand } from "@/components/product/ProductSummariseBand";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { SITE_BASE_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";
import { buildStaticPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Design Testing. The Screen That Shipped",
  description:
    "Compare the running app with the intended UI. Design Testing names spacing, type, color, and missing elements before release.",
  path: PATHS.DESIGN_TESTING,
  ogDescription:
    "See where the shipped screen drifts from the design, on the devices your release already runs.",
  twitterDescription:
    "Spacing, type, color, and missing elements, named before the build ships.",
});

export const revalidate = 300;

export default function DesignTestingPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Platform overview", path: PATHS.PRODUCT },
              { name: "Design Testing", path: PATHS.DESIGN_TESTING },
            ]),
          ),
        }}
      />
      <main>
        <DesignTestingHero />
        <ProductSummariseBand
          pageUrl={`${SITE_BASE_URL}${PATHS.DESIGN_TESTING}`}
        />
        <DesignTestingProblemSection />
        <DesignTestingChecksSection />
        <DesignTestingFitSection />
      </main>
    </div>
  );
}
