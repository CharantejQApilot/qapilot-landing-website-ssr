import type { Metadata } from "next";
import { AiTimeSavingsHero } from "@/components/ai-time-savings/AiTimeSavingsHero";
import AiTimeSavingsCalculator from "@/components/AiTimeSavingsCalculator";
import { EventExploreQApilotSection } from "@/components/events/EventExploreQApilotSection";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { SITE_BASE_URL } from "@/lib/constants";
import { DEFAULT_EVENT_EXPLORE_CTAS } from "@/lib/events";
import { PATHS } from "@/lib/routes";
import { buildStaticPageMetadata } from "@/lib/seo";

const canonicalUrl = `${SITE_BASE_URL}${PATHS.AI_TIME_SAVINGS}`;

export const metadata: Metadata = buildStaticPageMetadata({
  title: "AI Time Savings Calculator. Real QA Effort Savings",
  description:
    "Model AI test generation vs manual QA. Adjust accuracy and verification cost to see naïve savings versus actual effort after the verification tax.",
  path: PATHS.AI_TIME_SAVINGS,
  ogDescription:
    "Interactive Labs tool: compare manual QA effort to AI-assisted workflows and uncover the hidden verification tax.",
  twitterDescription:
    "See how AI accuracy and verification cost change real time savings for test generation.",
});

export const revalidate = 3600;

const aiTimeSavingsWebAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Time Savings Calculator",
  description:
    "Free QApilot Labs tool to model real effort savings from AI-generated test cases versus manual QA.",
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

export default function AiTimeSavingsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            aiTimeSavingsWebAppJsonLd,
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Labs", path: PATHS.LABS },
              { name: "AI Time Savings", path: PATHS.AI_TIME_SAVINGS },
            ]),
          ]),
        }}
      />

      <div className="relative z-0 min-h-screen w-full bg-background section-edge">
        <main>
          <AiTimeSavingsHero />
          <AiTimeSavingsCalculator />
          <section className="section-full bg-background pb-12 pt-0 md:pb-16">
            <div className="mx-auto w-full min-w-0 max-w-[100rem]">
              <EventExploreQApilotSection
                ctas={DEFAULT_EVENT_EXPLORE_CTAS}
                className="mt-0 [&_ul]:mt-4"
                layout="cards"
                headingId="ai-time-savings-explore-qapilot"
              />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
