import type { Metadata } from "next";
import TestingModesSection from "@/components/TestingModesSection";
import EnterpriseHeroSection from "@/components/EnterpriseHeroSection";
import QApilotDifferenceSection from "@/components/QApilotDifferenceSection";
import TableStakesSection from "@/components/TableStakesSection";
import FeaturedResourcesSection from "@/components/FeaturedResourcesSection";
import { getFeaturedResourcesCtaLinks } from "@/lib/featured-resources-ctas";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";
import { formatPageTitle } from "@/lib/page-title";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { MarketingPageShell } from "@/components/marketing";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.ENTERPRISE}`;

const PAGE_TITLE = formatPageTitle("Enterprise Mobile Testing — Scale QA Automation");
const PAGE_TITLE_TEXT = PAGE_TITLE.absolute;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "Enterprise-grade mobile testing automation trusted by Fortune 500 companies. Scale your QA process with AI-powered testing for iOS and Android apps.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: PAGE_TITLE_TEXT,
    description:
      "Scale mobile QA with AI-powered testing for iOS and Android—built for enterprise teams.",
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Mobile Testing Solutions | QApilot",
    description:
      "Enterprise-grade mobile testing automation for iOS and Android at scale.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export default async function EnterprisePage() {
  const featuredCtaLinks = await getFeaturedResourcesCtaLinks();
  return (
    <MarketingPageShell background="hero" contentClassName="contain-layout">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbList([{ name: "Home", path: PATHS.HOME }, { name: "Enterprise", path: PATHS.ENTERPRISE }])) }} />
      <EnterpriseHeroSection />
      <FeaturedResourcesSection ctaLinks={featuredCtaLinks} />
      <QApilotDifferenceSection />
      <TableStakesSection />
      <TestingModesSection />
    </MarketingPageShell>
  );
}
