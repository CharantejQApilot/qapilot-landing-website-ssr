import type { Metadata } from "next";
import PartnersClient from "./PartnersClient";
import Footer from "@/components/Footer";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";
import { buildBreadcrumbList } from "@/lib/breadcrumb";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.PARTNERS}`;

export const metadata: Metadata = {
  title: "Partners - Service-as-Software for Mobile App Testing | QApilot",
  description:
    "QApilot partners with consulting and technology firms to deliver Service-as-Software for mobile app testing: AI-native, outcomes-led quality engineering that scales beyond manual effort.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Partners - Service-as-Software for Mobile App Testing | QApilot",
    description:
      "QApilot partners with consulting and technology firms to deliver Service-as-Software for mobile app testing: AI-native, outcomes-led quality engineering that scales beyond manual effort.",
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners - Service-as-Software for Mobile App Testing | QApilot",
    description:
      "QApilot partners with consulting and technology firms to deliver Service-as-Software for mobile app testing: AI-native, outcomes-led quality engineering that scales beyond manual effort.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export default function PartnersPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Platform overview", path: PATHS.PRODUCT },
              { name: "Partners", path: PATHS.PARTNERS },
            ]),
          ),
        }}
      />
      <main>
        <PartnersClient />
      </main>
      <Footer />
    </div>
  );
}
