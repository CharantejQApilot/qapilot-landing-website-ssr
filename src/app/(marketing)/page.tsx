import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import { HomeCaseStudiesSection } from "@/components/case-studies/HomeCaseStudiesSection";
import ClientsSection from "@/components/ClientsSection";
import MetricsSection from "@/components/MetricsSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import HomeKeyTakeawaysSection from "@/components/HomeKeyTakeawaysSection";

/** Below-fold client sections. Split JS bundles without changing SSR output or visuals. */
const CoreAdvantageHeading = dynamic(
  () => import("@/components/CoreAdvantageHeading"),
);
const ProductShowcaseSection = dynamic(
  () => import("@/components/ProductShowcaseSection"),
);
const HomeExitIntentPopup = dynamic(
  () => import("@/components/home-exit-intent/HomeExitIntentPopup"),
  { ssr: false },
);
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";
import {
  HOME_PAGE_DESCRIPTION,
  HOME_PAGE_OG_DESCRIPTION,
  HOME_PAGE_OG_TITLE,
  HOME_PAGE_QUESTIONS,
  HOME_PAGE_TITLE,
  HOME_PAGE_TWITTER_DESCRIPTION,
  HOME_PAGE_TWITTER_TITLE,
  homeWebPageJsonLd,
} from "@/lib/home-page-seo";
import { buildFaqPageJsonLd } from "@/lib/faq-jsonld";
import { softwareApplicationJsonLd } from "@/lib/root-jsonld";

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
    images: [
      { url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt },
    ],
  },
};

export default function IndexPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWebPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildFaqPageJsonLd(
              HOME_PAGE_QUESTIONS.map(({ question, answer }) => ({
                question,
                answer,
              })),
            ),
          ),
        }}
      />
      <main>
        {/* S01–S02 hero + trust · S09 proof · S03 metrics · S04 product · S07 demo · S12 ecosystem · takeaways */}
        <HeroSection />
        <HomeCaseStudiesSection />
        <ClientsSection />
        <MetricsSection />
        <CoreAdvantageHeading />
        <ProductShowcaseSection />
        <IntegrationsSection />
        <HomeKeyTakeawaysSection />
      </main>
      <HomeExitIntentPopup />
    </div>
  );
}
