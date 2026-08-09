import type { Metadata } from "next";
import Link from "next/link";
import CompareHeroSection from "@/components/compare/CompareHeroSection";
import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingSectionHeader } from "@/components/marketing";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { SITE_BASE_URL } from "@/lib/constants";
import { PATHS } from "@/lib/routes";
import { defaultOpenGraphImage } from "@/lib/seo";
import { formatPageTitle } from "@/lib/page-title";
import { cn } from "@/lib/utils";

const path = PATHS.COMPARE_TESTSIGMA;
const canonicalUrl = `${SITE_BASE_URL}${path}`;

const heroComparisonCards = [
  {
    title: "Testsigma",
    subtitle: "No-Code Test Automation",
    body: "Teams define flows through natural language or recorder-based steps, then maintain suites as the app evolves.",
  },
  {
    title: "QApilot",
    subtitle: "Fully Autonomous Mobile Testing",
    body: "QApilot explores the app, builds a knowledge graph, generates coverage, heals failures, and reports release risk — without predefined flows.",
  },
] as const;

const comparisonRows = [
  ["Approach", "AI-assisted test authoring and maintenance", "Fully autonomous coverage discovery and upkeep"],
  [
    "Test Creation",
    "Natural language, recorder, or scripted steps",
    "Crawler-led generation from real app exploration",
  ],
  ["Mobile Context", "Cross-platform with web and mobile support", "Mobile-first: native, hybrid, and Flutter from day one"],
  ["Maintenance", "Update steps when UI changes", "Context-aware self-healing across journeys"],
  [
    "Coverage Gaps",
    "Limited to flows teams define",
    "Autonomous exploration finds critical paths teams miss",
  ],
  [
    "Release Signals",
    "Test pass/fail and reports",
    "Journey validation, bug detection, accessibility, and security insights",
  ],
] as const;

const featureCards = [
  {
    title: "Autonomous Mobile Exploration",
    body: "Discover screens, actions, and journeys without writing every flow upfront.",
  },
  {
    title: "Knowledge Graph Architecture",
    body: "Shared context layer powers generation, execution, healing, and reporting.",
  },
  {
    title: "Context-Aware Self-Healing",
    body: "Recover from UI changes using journey intent, metadata, and visual signals.",
  },
  {
    title: "Post-Build Validation",
    body: "Test real app binaries on iOS and Android without source code access.",
  },
] as const;

const PAGE_TITLE = formatPageTitle("QApilot vs Testsigma | Autonomous Mobile Testing");
const PAGE_TITLE_TEXT = PAGE_TITLE.absolute;
const PAGE_DESCRIPTION =
  "Compare QApilot vs Testsigma for mobile testing. Autonomous exploration and self-healing go beyond no-code authoring for release-ready mobile QA.";

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
    title: "QApilot vs Testsigma",
    description: PAGE_DESCRIPTION,
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export const revalidate = 300;

export default function QApilotVsTestsigmaPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "QApilot vs Testsigma", path },
            ]),
          ),
        }}
      />

      <main>
        <CompareHeroSection
          heroId="compare-testsigma-hero"
          eyebrow="QApilot vs Testsigma"
          title={
            <>
              No-Code Helps You Write Tests Faster.{" "}
              <span className="text-primary">QApilot Decides What To Test.</span>
            </>
          }
          description={
            <>
              Testsigma accelerates test creation with AI-assisted, no-code workflows. QApilot is built for teams
              that need autonomous mobile coverage — exploration, generation, execution, healing, and release
              readiness without defining every journey manually.
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
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{card.body}</p>
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
                  <span className="text-primary">QApilot</span> vs Testsigma
                </>
              }
              marginBottomClassName="mb-8 md:mb-10"
            />

            <div className="grid gap-4 md:gap-5">
              {comparisonRows.map(([area, testsigma, qapilot]) => (
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
                        Testsigma
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{testsigma}</p>
                    </div>
                    <div className="relative bg-gradient-to-br from-primary/[0.07] via-transparent to-transparent p-4 sm:p-5 md:p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">QApilot</p>
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
                  What QApilot Brings <span className="text-primary">Beyond Testsigma</span>
                </>
              }
              marginBottomClassName="mb-10 md:mb-12"
            />

            <MarketingLedger cols={2} aria-label="What QApilot brings beyond Testsigma">
              {featureCards.map((feature) => (
                <MarketingLedgerCell key={feature.title}>
                  <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
                </MarketingLedgerCell>
              ))}
            </MarketingLedger>

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:text-base">
              Explore{" "}
              <Link href={PATHS.AUTONOMOUS_TESTING} className="text-primary hover:underline">
                autonomous testing
              </Link>
              ,{" "}
              <Link href={PATHS.AGENTIC_ARCHITECTURE} className="text-primary hover:underline">
                agentic architecture
              </Link>
              , and{" "}
              <Link href={PATHS.FOR_FLUTTER} className="text-primary hover:underline">
                Flutter testing
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 bg-gradient-to-b from-primary/[0.08] to-background py-12 md:py-16">
          <div className="section-full">
            <div className="sig-close">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              Ready for <span className="text-primary">Autonomous Mobile Coverage</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              See how QApilot helps mobile teams move from AI-assisted authoring to fully autonomous testing.
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
