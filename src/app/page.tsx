import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import ClientsSection from "@/components/ClientsSection";
import VelocitySection from "@/components/VelocitySection";
import CoreAdvantageHeading from "@/components/CoreAdvantageHeading";
import ModernFrameworksSection from "@/components/ModernFrameworksSection";
import ProductShowcaseSection from "@/components/ProductShowcaseSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import MetricsSection from "@/components/MetricsSection";
import Footer from "@/components/Footer";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";
import {
  HOME_PAGE_DESCRIPTION,
  HOME_PAGE_OG_DESCRIPTION,
  HOME_PAGE_OG_TITLE,
  HOME_PAGE_TITLE,
  HOME_PAGE_TWITTER_DESCRIPTION,
  HOME_PAGE_TWITTER_TITLE,
  homeWebPageJsonLd,
} from "@/lib/home-page-seo";

const canonicalUrl = `${SITE_BASE_URL}/`;

export const metadata: Metadata = {
  title: { absolute: HOME_PAGE_TITLE },
  description: HOME_PAGE_DESCRIPTION,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: HOME_PAGE_OG_TITLE,
    description: HOME_PAGE_OG_DESCRIPTION,
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_PAGE_TWITTER_TITLE,
    description: HOME_PAGE_TWITTER_DESCRIPTION,
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export default function IndexPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWebPageJsonLd) }}
      />
      <main>
        <HeroSection />
        <ClientsSection />
        <MetricsSection />
        <VelocitySection />
        <CoreAdvantageHeading />
        <ModernFrameworksSection />
        <ProductShowcaseSection />
        <IntegrationsSection />
      </main>
      <Footer />
    </div>
  );
}
