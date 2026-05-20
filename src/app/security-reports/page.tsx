import type { Metadata } from "next";
import Footer from "@/components/Footer";
import {
  SecurityReportsAnalyzeGridSection,
  SecurityReportsCategoriesSection,
  SecurityReportsHero,
  SecurityReportsIssueDeepDiveSection,
  SecurityReportsOverviewSection,
  SecurityReportsProblemSection,
  SecurityReportsShiftSection,
  SecurityReportsWhyMattersSection,
} from "@/components/security-reports";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { PATHS } from "@/lib/routes";
import { SITE_BASE_URL } from "@/lib/constants";
import { defaultOpenGraphImage } from "@/lib/seo";

const path = PATHS.SECURITY_REPORTS;
const canonicalUrl = `${SITE_BASE_URL}${path}`;

export const metadata: Metadata = {
  title: "Security Reports for Mobile Applications",
  description:
    "Automated security insights alongside functional testing: permissions, network, storage, trackers, and release-ready risk visibility.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Security Reports for Mobile | QApilot",
    description:
      "Surface vulnerabilities during mobile testing with structured reports teams can act on before release.",
    url: canonicalUrl,
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Security Reports for Mobile | QApilot",
    description:
      "Security insights alongside functional mobile testing—permissions, network, storage, and risk visibility.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export const revalidate = 300;

export default function SecurityReportsPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Platform overview", path: PATHS.PRODUCT },
              { name: "Security Reports", path: PATHS.SECURITY_REPORTS },
            ]),
          ),
        }}
      />
      <main>
        <SecurityReportsHero />
        <SecurityReportsProblemSection />
        <SecurityReportsShiftSection />
        <SecurityReportsOverviewSection />
        <SecurityReportsAnalyzeGridSection />
        <SecurityReportsIssueDeepDiveSection />
        <SecurityReportsCategoriesSection />
        <SecurityReportsWhyMattersSection />
      </main>
      <Footer />
    </div>
  );
}
