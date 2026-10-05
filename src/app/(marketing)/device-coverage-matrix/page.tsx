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
  title: "Device Coverage Matrix. Plan Mobile Device Coverage",
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
  operatingSystem: "Any",
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
              {
                name: "Device Coverage Matrix",
                path: PATHS.DEVICE_COVERAGE_MATRIX,
              },
            ]),
          ]),
        }}
      />

      <div className="relative z-0 min-h-screen w-full bg-background section-edge">
        <main>
          <DeviceCoverageMatrixHero />
          <section
            className="section-full bg-background py-10 md:py-14"
            aria-labelledby="device-coverage-how-heading"
          >
            <h2
              id="device-coverage-how-heading"
              className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
            >
              What this matrix is
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              The Device Coverage Matrix is a free planning tool. It turns a
              market and a coverage target into a ranked list of Android OEM
              and iOS profiles to test before a release. The baseline is
              StatCounter active-device share for April 2026, across 23
              markets and 10,479 OEM and OS-version rows.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              In India that month, Vivo is 19.0% of active devices, Xiaomi
              17.2%, Realme 13.1%, Samsung 13.0%, and Oppo 11.9%. A coverage
              target of 70% therefore starts with those five OEMs, not a
              generic flagship list.
            </p>
            <div className="mt-6 max-w-3xl overflow-x-auto">
              <table className="w-full min-w-[28rem] border-collapse text-left text-sm md:text-base">
                <caption className="mb-3 text-left font-heading text-lg font-semibold tracking-tight text-foreground">
                  India active-device share, April 2026
                </caption>
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="py-3 pr-4 font-semibold text-foreground">
                      OEM
                    </th>
                    <th scope="col" className="py-3 font-semibold text-foreground">
                      Share
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Vivo", "19.0%"],
                    ["Xiaomi", "17.2%"],
                    ["Realme", "13.1%"],
                    ["Samsung", "13.0%"],
                    ["Oppo", "11.9%"],
                  ].map(([oem, share]) => (
                    <tr key={oem} className="border-b border-border/80">
                      <th scope="row" className="py-3 pr-4 font-semibold text-foreground">
                        {oem}
                      </th>
                      <td className="py-3 text-muted-foreground">{share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="mt-8 font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
              How to use it
            </h3>
            <ol className="mt-3 max-w-3xl list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <li>Pick the market you ship to.</li>
              <li>Set a coverage target.</li>
              <li>
                Read the ranked OEM and platform list, then test those devices
                before release.
              </li>
            </ol>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              The result is a recommended device set. It is a planning output,
              not a pass or fail report from a test run.
            </p>
          </section>
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
