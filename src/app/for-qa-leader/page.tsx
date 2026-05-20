import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { ForQALeaderHero } from "./ForQALeaderHero";
import { ForQALeaderSections } from "./ForQALeaderSections";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.FOR_QA_LEADER}`;

export const metadata: Metadata = {
  title: "Release Readiness for QE Leader",
  description:
    "Scale quality engineering without scaling complexity. Reduce test maintenance, improve release confidence, and expand mobile coverage with autonomous, AI-native testing.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Release Readiness for QE Leader | QApilot",
    description:
      "Autonomous, AI-native mobile testing for QE leaders—less maintenance, stronger release signals, broader coverage.",
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Release Readiness for QE Leader | QApilot",
    description:
      "Move from maintenance-heavy testing to scalable mobile release readiness with QApilot.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

const breadcrumbList = buildBreadcrumbList([
  { name: "Home", path: PATHS.HOME },
  { name: "Platform overview", path: PATHS.PRODUCT },
  { name: "QE Leader", path: PATHS.FOR_QA_LEADER },
]);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Release Readiness for QE Leader",
  description:
    "How QApilot helps QE leaders reduce automation maintenance, improve release confidence, and expand mobile test coverage with autonomous, AI-native testing.",
  url: canonicalUrl,
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "QApilot",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "iOS, Android",
    description:
      "AI-native mobile testing platform with autonomous exploration, intelligent bug detection, self-healing, and enterprise-ready reporting.",
    offers: {
      "@type": "Offer",
      category: "Mobile App Testing",
    },
  },
  breadcrumb: breadcrumbList,
};

export default function ForQALeaderPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main>
        <ForQALeaderHero />
        <ForQALeaderSections />
      </main>
      <Footer />
    </div>
  );
}
