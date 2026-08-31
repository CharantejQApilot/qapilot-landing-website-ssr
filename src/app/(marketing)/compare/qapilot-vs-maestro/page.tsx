import type { Metadata } from "next";
import Link from "next/link";
import CompareHeroSection from "@/components/compare/CompareHeroSection";
import { CompareMatrixTable } from "@/components/compare/CompareMatrixTable";
import { CompareFaqSection } from "@/components/compare/CompareFaqSection";
import { ArticleSummariseWithAI } from "@/components/summarise-with-ai/ArticleSummariseWithAI";
import {
  MarketingCloseCta,
  MarketingSection,
  MarketingSectionHeader,
} from "@/components/marketing";
import {
  MarketingLedger,
  MarketingLedgerCell,
} from "@/components/marketing/MarketingLedger";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { COMPARE_FAQS } from "@/lib/compare-faqs";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildFaqPageJsonLd } from "@/lib/faq-jsonld";
import { PATHS } from "@/lib/routes";
import { defaultOpenGraphImage } from "@/lib/seo";
import { formatPageTitle } from "@/lib/page-title";
import { cn } from "@/lib/utils";

const path = PATHS.COMPARE_MAESTRO;
const canonicalUrl = `${SITE_BASE_URL}${path}`;
const faqs = COMPARE_FAQS.maestro;

const heroComparisonCards = [
  {
    title: "Maestro",
    subtitle: "Flow-Based Mobile UI Testing",
    body: "Teams define YAML flows for UI interactions and run them across devices. Fast to start, but bounded by what you script.",
  },
  {
    title: "QApilot",
    subtitle: "Autonomous Mobile Testing Platform",
    body: "QApilot crawls your app, maps journeys, generates coverage, self-heals changes, and reports release readiness without flow files.",
  },
] as const;

const comparisonRows = [
  [
    "Approach",
    "Declarative YAML flows for UI automation",
    "Autonomous exploration and knowledge-graph-driven testing",
  ],
  [
    "Test Creation",
    "Write and maintain flow definitions",
    "Crawler discovers and generates tests from app behavior",
  ],
  [
    "Maintenance",
    "Update flows when selectors or screens change",
    "Context-aware self-healing across journeys",
  ],
  [
    "Coverage Scope",
    "Flows you author",
    "Critical paths discovered automatically plus human overrides",
  ],
  [
    "Mobile Depth",
    "Strong for UI flow automation",
    "Journey validation with bug detection, accessibility, latency, and security signals",
  ],
  [
    "Best Fit",
    "Teams wanting lightweight mobile UI flow tests",
    "Teams needing autonomous coverage and release-ready reporting at scale",
  ],
] as const;

const featureCards = [
  {
    title: "Zero-Flow Coverage Discovery",
    body: "Find critical screens and journeys without authoring every YAML flow upfront.",
  },
  {
    title: "Self-Healing Execution",
    body: "Continue testing when UI elements change. Reduce flaky flow maintenance.",
  },
  {
    title: "Flutter & Hybrid Support",
    body: "Handle Flutter, native, and webview complexity beyond simple UI taps.",
  },
  {
    title: "Release-Ready Reporting",
    body: "Screenshots, logs, device metrics, and failure context in one place.",
  },
] as const;

const PAGE_TITLE = formatPageTitle(
  "QApilot vs Maestro | Autonomous Mobile Testing",
);
const PAGE_TITLE_TEXT = PAGE_TITLE.absolute;
const PAGE_DESCRIPTION =
  "Compare QApilot vs Maestro for mobile app testing. See how autonomous exploration and self-healing go beyond YAML flow automation for release-ready mobile QA.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    title: PAGE_TITLE_TEXT,
    description: PAGE_DESCRIPTION,
    url: canonicalUrl,
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "QApilot vs Maestro",
    description: PAGE_DESCRIPTION,
    images: [
      { url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt },
    ],
  },
};

export const revalidate = 300;

export default function QApilotVsMaestroPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "QApilot vs Maestro", path },
            ]),
            buildFaqPageJsonLd(faqs),
          ]),
        }}
      />

      <main>
        <CompareHeroSection
          heroId="compare-maestro-hero"
          eyebrow="QApilot vs Maestro"
          title={
            <>
              QApilot vs Maestro:{" "}
              <span className="text-primary">Discover What Matters</span>
            </>
          }
          description={
            <>
              Maestro Runs Your Flows. QApilot Discovers What Matters. Maestro
              makes mobile UI flow testing approachable with simple YAML
              definitions. QApilot is for teams that need autonomous coverage.
              Exploring apps post-build, generating tests, healing UI changes,
              and delivering release-ready signals without maintaining every
              flow by hand.
            </>
          }
        />

        <MarketingSection paddingClassName="py-6 md:py-8">
            <ArticleSummariseWithAI pageUrl={`${SITE_BASE_URL}${path}`} />
        </MarketingSection>

        <MarketingSection surface="tint">
            <div className="grid gap-0 overflow-hidden rounded-md border border-border/60 md:grid-cols-2">
              {heroComparisonCards.map((card, index) => (
                <article
                  key={card.title}
                  className={cn(
                    "border-b border-border/60 p-6 md:p-7",
                    index === 0 && "md:border-b-0 md:border-r",
                    index === 1 && "md:bg-primary/[0.04]",
                  )}
                >
                  <p
                    className={cn(
                      "text-xs font-semibold uppercase tracking-[0.18em]",
                      index === 0 ? "text-muted-foreground" : "text-primary",
                    )}
                  >
                    {card.title}
                  </p>
                  <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground">
                    {card.subtitle}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>
        </MarketingSection>

        <MarketingSection>
            <MarketingSectionHeader
              id="comparison-table"
              title={
                <>
                  <span className="text-primary">QApilot</span> vs Maestro
                </>
              }
              marginBottomClassName="mb-8 md:mb-10"
            />

            <CompareMatrixTable competitorName="Maestro" rows={comparisonRows} />
        </MarketingSection>

        <MarketingSection surface="tint">
            <MarketingSectionHeader
              id="what-qapilot-brings"
              title={
                <>
                  What QApilot Brings{" "}
                  <span className="text-primary">Beyond Maestro</span>
                </>
              }
              marginBottomClassName="mb-10 md:mb-12"
            />

            <MarketingLedger
              cols={2}
              aria-label="What QApilot brings beyond Maestro"
            >
              {featureCards.map((feature) => (
                <MarketingLedgerCell key={feature.title}>
                  <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.body}
                  </p>
                </MarketingLedgerCell>
              ))}
            </MarketingLedger>

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:text-base">
              Explore{" "}
              <Link
                href={PATHS.AUTONOMOUS_TESTING}
                className="text-primary hover:underline"
              >
                autonomous testing
              </Link>
              ,{" "}
              <Link
                href={PATHS.AI_SELF_HEALING}
                className="text-primary hover:underline"
              >
                AI self-healing
              </Link>
              , and{" "}
              <Link
                href={PATHS.INTELLIGENT_BUG_DETECTION}
                className="text-primary hover:underline"
              >
                intelligent bug detection
              </Link>
              .
            </p>
        </MarketingSection>

        <CompareFaqSection faqs={faqs} />

        <MarketingCloseCta
          title={
            <>
              Ready To Go{" "}
                <span className="text-primary">Beyond Flow Files</span>?
            </>
          }
          lead={<>See how QApilot autonomously explores your app and delivers
                release-ready mobile coverage.</>}
        />
      </main>
    </div>
  );
}
