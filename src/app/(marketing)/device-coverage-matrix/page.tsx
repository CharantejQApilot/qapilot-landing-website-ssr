import type { Metadata } from "next";
import DeviceCoverageAdvisor from "@/components/DeviceCoverageAdvisor";
import { DeviceCoverageMatrixHero } from "@/components/device-coverage-matrix/DeviceCoverageMatrixHero";
import { EventExploreQApilotSection } from "@/components/events/EventExploreQApilotSection";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { SITE_BASE_URL } from "@/lib/constants";
import { DEFAULT_EVENT_EXPLORE_CTAS } from "@/lib/events";
import { PATHS } from "@/lib/routes";
import { buildStaticPageMetadata } from "@/lib/seo";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.DEVICE_COVERAGE_MATRIX}`;

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Device Coverage Matrix — Plan Mobile Device Coverage",
  description:
    "Pick your market, set a coverage target, and get a ranked OEM + platform matrix for Android and iOS before every release.",
  path: PATHS.DEVICE_COVERAGE_MATRIX,
  ogDescription:
    "Interactive advisor: choose region and platform, adjust coverage %, and see which OEM profiles to include.",
  twitterDescription:
    "Build a recommended OEM + platform matrix for your target market and coverage goal.",
});

export const revalidate = 3600;

const deviceCoverageWebAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Device Coverage Matrix",
  description:
    "Free QApilot Labs tool to plan mobile device coverage from real OEM + platform share data.",
  url: canonicalUrl,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  provider: {
    "@type": "Organization",
    name: "QApilot",
    url: SITE_BASE_URL,
  },
};

export default function DeviceCoverageMatrixPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            deviceCoverageWebAppJsonLd,
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Labs", path: PATHS.LABS },
              { name: "Device Coverage Matrix", path: PATHS.DEVICE_COVERAGE_MATRIX },
            ]),
          ]),
        }}
      />

      <div className="relative z-0 min-h-screen w-full bg-background section-edge">
        <main>
          <DeviceCoverageMatrixHero />
          <DeviceCoverageAdvisor />
          <section className="section-full bg-background pb-12 pt-0 md:pb-16">
            <EventExploreQApilotSection
              ctas={DEFAULT_EVENT_EXPLORE_CTAS}
              className="mt-0 [&_ul]:mt-3"
              layout="cards"
              headingId="device-coverage-explore-qapilot"
            />
          </section>
        </main>
      </div>
    </>
  );
}
