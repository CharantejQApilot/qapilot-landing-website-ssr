import type { Metadata } from "next";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildStaticPageMetadata } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { ForQAEngineerHero } from "./ForQAEngineerHero";
import { ForQAEngineerSections } from "./ForQAEngineerSections";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.FOR_QA_ENGINEER}`;

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Better Testing for Quality Assurance Engineers",
  description:
    "Spend less time maintaining tests and more time improving quality. Create coverage faster, debug quicker, and reduce brittle mobile automation with QApilot.",
  path: PATHS.FOR_QA_ENGINEER,
  ogDescription:
    "AI self-healing, autonomous coverage, and rich diagnostics so QA Engineers ship mobile quality with less friction.",
  twitterDescription:
    "Less maintenance, faster coverage, clearer failures—mobile testing built for QA Engineers.",
});

const breadcrumbList = buildBreadcrumbList([
  { name: "Home", path: PATHS.HOME },
  { name: "Platform overview", path: PATHS.PRODUCT },
  { name: "Quality Assurance Engineer", path: PATHS.FOR_QA_ENGINEER },
]);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Better Testing for Quality Assurance Engineers",
  description:
    "How QApilot helps QA Engineers create coverage faster, debug failures quicker, and reduce brittle automation across mobile apps.",
  url: canonicalUrl,
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "QApilot",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "iOS, Android",
    description:
      "AI-native mobile testing with autonomous exploration, self-healing, intelligent bug detection, and rich execution evidence.",
    offers: {
      "@type": "Offer",
      category: "Mobile App Testing",
    },
  },
  breadcrumb: breadcrumbList,
};

export default function ForQAEngineerPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main>
        <ForQAEngineerHero />
        <ForQAEngineerSections />
      </main>
    </div>
  );
}
