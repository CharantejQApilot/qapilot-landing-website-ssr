import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { ForProductOwnerHero } from "./ForProductOwnerHero";
import { ForProductOwnerSections } from "./ForProductOwnerSections";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.FOR_PRODUCT_OWNER}`;

export const metadata: Metadata = {
  title: "Faster Releases for Product Managers",
  description:
    "Launch with confidence and fewer post-release surprises. Improve release readiness, shorten validation cycles, and surface mobile issues before users do.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Faster Releases for Product Managers | QApilot",
    description:
      "Release confidence for mobile: autonomous coverage, clear reporting, and early detection of user-impacting issues.",
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faster Releases for Product Managers | QApilot",
    description:
      "Ship mobile features faster with shared readiness signals and less quality-related delay.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

const breadcrumbList = buildBreadcrumbList([
  { name: "Home", path: PATHS.HOME },
  { name: "Platform overview", path: PATHS.PRODUCT },
  { name: "Product Manager", path: PATHS.FOR_PRODUCT_OWNER },
]);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Faster Releases for Product Managers",
  description:
    "How QApilot helps Product Managers ship mobile features faster by improving release confidence, reducing quality-related delays, and surfacing issues before users do.",
  url: canonicalUrl,
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "QApilot",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "iOS, Android",
    description:
      "AI-native mobile testing with autonomous coverage, reporting, intelligent bug detection, and security insights for release-ready product teams.",
    offers: {
      "@type": "Offer",
      category: "Mobile App Testing",
    },
  },
  breadcrumb: breadcrumbList,
};

export default function ForProductOwnerPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main>
        <ForProductOwnerHero />
        <ForProductOwnerSections />
      </main>
      <Footer />
    </div>
  );
}
