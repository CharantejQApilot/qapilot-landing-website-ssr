import type { Metadata } from "next";
import Link from "next/link";
import CompareHeroSection from "@/components/compare/CompareHeroSection";
import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingSectionHeader } from "@/components/marketing";
import {
  MarketingLedger,
  MarketingLedgerCell,
} from "@/components/marketing/MarketingLedger";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { SITE_BASE_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";
import { defaultOpenGraphImage } from "@/lib/seo";
import { formatPageTitle } from "@/lib/page-title";
import { cn } from "@/lib/utils";

const path = PATHS.COMPARE_MAESTRO;
const canonicalUrl = `${SITE_BASE_URL}${path}`;

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
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "QApilot vs Maestro", path },
            ]),
          ),
        }}
      />

      <main>
        <CompareHeroSection
          heroId="compare-maestro-hero"
          eyebrow="QApilot vs Maestro"
          title={
            <>
              Maestro Runs Your Flows.{" "}
              <span className="text-primary">
                QApilot Discovers What Matters.
              </span>
            </>
          }
          description={
            <>
              Maestro makes mobile UI flow testing approachable with simple YAML
              definitions. QApilot is for teams that need autonomous coverage.
              Exploring apps post-build, generating tests, healing UI changes,
              and delivering release-ready signals without maintaining every
              flow by hand.
            </>
          }
        />

        <section className="section-edge w-full border-b border-border/50 bg-gradient-to-b from-muted/20 via-background to-background py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <div className="grid gap-0 overflow-hidden rounded-2xl border border-border/60 md:grid-cols-2">
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
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <MarketingSectionHeader
              id="comparison-table"
              title={
                <>
                  <span className="text-primary">QApilot</span> vs Maestro
                </>
              }
              marginBottomClassName="mb-8 md:mb-10"
            />

            <div className="grid gap-4 md:gap-5">
              {comparisonRows.map(([area, maestro, qapilot]) => (
                <article
                  key={area}
                  className="overflow-hidden rounded-2xl border border-border/70 bg-card/90 shadow-sm backdrop-blur-sm"
                >
                  <div className="border-b border-border/60 bg-muted/35 px-4 py-3 sm:px-5">
                    <p className="font-heading text-sm font-semibold tracking-tight text-foreground md:text-base">
                      {area}
                    </p>
                  </div>
                  <div className="grid divide-y divide-border/60 md:grid-cols-2 md:divide-x md:divide-y-0">
                    <div className="p-4 sm:p-5 md:p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Maestro
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {maestro}
                      </p>
                    </div>
                    <div className="relative bg-gradient-to-br from-primary/[0.07] via-transparent to-transparent p-4 sm:p-5 md:p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                        QApilot
                      </p>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-foreground md:text-base">
                        {qapilot}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 bg-muted/10 py-12 md:py-16 2xl:py-20">
          <div className="section-full">
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
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 bg-gradient-to-b from-primary/[0.08] to-background py-12 md:py-16">
          <div className="section-full">
            <div className="sig-close">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                Ready To Go{" "}
                <span className="text-primary">Beyond Flow Files</span>?
              </h2>
              <p className="mt-4 w-full text-base leading-relaxed text-muted-foreground md:text-lg">
                See how QApilot autonomously explores your app and delivers
                release-ready mobile coverage.
              </p>
              <div className="sig-cta-row">
                <BookDemoCtaButton />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
