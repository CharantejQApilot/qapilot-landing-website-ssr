import type { Metadata } from "next";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildStaticPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { ForSREHero } from "./ForSREHero";
import { ForSRESections } from "./ForSRESections";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.FOR_SRE}`;

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Release Reliability for SRE Teams",
  description:
    "Reduce production risk before it reaches users. Surface mobile quality risks early, strengthen pre-release signals, and cut incidents from bad launches.",
  path: PATHS.FOR_SRE,
  ogDescription:
    "Stronger pre-release signals, faster RCA evidence, and safer fast cadences for mobile reliability.",
  twitterDescription:
    "Identify mobile quality risks early and reduce release-caused incidents with QApilot.",
});

const breadcrumbList = buildBreadcrumbList([
  { name: "Home", path: PATHS.HOME },
  { name: "Platform overview", path: PATHS.PRODUCT },
  { name: "Site Reliability Engineer", path: PATHS.FOR_SRE },
]);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Release Reliability for SRE Teams",
  description:
    "How QApilot helps SRE teams improve release reliability by surfacing mobile quality risks early and strengthening pre-release signals.",
  url: canonicalUrl,
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "QApilot",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "iOS, Android",
    description:
      "Mobile testing platform for pre-release risk signals, intelligent bug detection, rich diagnostics, and autonomous coverage.",
    offers: {
      "@type": "Offer",
      category: "Mobile App Testing",
    },
  },
  breadcrumb: breadcrumbList,
};

export default function ForSREPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main>
        <ForSREHero />
        <ForSRESections />
      </main>
    </div>
  );
}
