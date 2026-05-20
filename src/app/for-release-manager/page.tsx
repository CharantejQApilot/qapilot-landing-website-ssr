import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { ForReleaseManagerHero } from "./ForReleaseManagerHero";
import { ForReleaseManagerSections } from "./ForReleaseManagerSections";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.FOR_RELEASE_MANAGER}`;

export const metadata: Metadata = {
  title: "Release Confidence for Release Managers",
  description:
    "Ship faster with clearer go / no-go decisions. QApilot reduces pre-launch uncertainty with faster validation, clearer quality signals, and scalable release readiness testing.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Release Confidence for Release Managers | QApilot",
    description:
      "Structured readiness signals, faster validation, and resilient mobile testing for confident release sign-off.",
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Release Confidence for Release Managers | QApilot",
    description:
      "Clearer go / no-go decisions and scalable release readiness testing for mobile launches.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

const breadcrumbList = buildBreadcrumbList([
  { name: "Home", path: PATHS.HOME },
  { name: "Platform overview", path: PATHS.PRODUCT },
  { name: "Release Manager", path: PATHS.FOR_RELEASE_MANAGER },
]);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Release Confidence for Release Managers",
  description:
    "How QApilot helps Release Managers reduce uncertainty before mobile launches through faster validation, clearer quality signals, and scalable release readiness testing.",
  url: canonicalUrl,
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "QApilot",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "iOS, Android",
    description:
      "AI-native mobile testing platform with autonomous testing, intelligent bug detection, reporting, and release readiness signals.",
    offers: {
      "@type": "Offer",
      category: "Mobile App Testing",
    },
  },
  breadcrumb: breadcrumbList,
};

export default function ForReleaseManagerPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main>
        <ForReleaseManagerHero />
        <ForReleaseManagerSections />
      </main>
      <Footer />
    </div>
  );
}
