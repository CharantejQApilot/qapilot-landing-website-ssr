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

const path = PATHS.COMPARE_TESTSIGMA;
const canonicalUrl = `${SITE_BASE_URL}${path}`;
const faqs = COMPARE_FAQS.testsigma;

const heroComparisonCards = [
  {
    title: "Testsigma",
    subtitle: "No-Code Test Automation",
    body: "Teams define flows through natural language or recorder-based steps, then maintain suites as the app evolves.",
  },
  {
    title: "QApilot",
    subtitle: "Fully Autonomous Mobile Testing",
    body: "QApilot explores the app, builds a knowledge graph, generates coverage, heals failures, and reports release risk. Without predefined flows.",
  },
] as const;

const comparisonRows = [
  [
    "Approach",
    "AI-assisted test authoring and maintenance",
    "Fully autonomous coverage discovery and upkeep",
  ],
  [
    "Test Creation",
    "Natural language, recorder, or scripted steps",
    "Crawler-led generation from real app exploration",
  ],
  [
    "Mobile Context",
    "Cross-platform with web and mobile support",
    "Mobile-first: native, hybrid, and Flutter from day one",
  ],
  [
    "Maintenance",
    "Update steps when UI changes",
    "Context-aware self-healing across journeys",
  ],
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

const PAGE_TITLE = formatPageTitle(
  "QApilot vs Testsigma | Autonomous Mobile Testing",
);
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
    images: [
      { url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt },
    ],
  },
};

export const revalidate = 300;

export default function QApilotVsTestsigmaPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "QApilot vs Testsigma", path },
            ]),
            buildFaqPageJsonLd(faqs),
          ]),
        }}
      />

      <main>
        <CompareHeroSection
          heroId="compare-testsigma-hero"
          eyebrow="QApilot vs Testsigma"
          title={
            <>
              QApilot vs Testsigma:{" "}
              <span className="text-primary">Autonomous Mobile Testing</span>
            </>
          }
          description={
            <>
              No-Code Helps You Write Tests Faster. QApilot Decides What To Test.
              Testsigma accelerates test creation with AI-assisted, no-code
              workflows. QApilot is built for teams that need autonomous mobile
              coverage. Exploration, generation, execution, healing, and release
              readiness without defining every journey manually.
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
                  <span className="text-primary">QApilot</span> vs Testsigma
                </>
              }
              marginBottomClassName="mb-8 md:mb-10"
            />

            <CompareMatrixTable competitorName="Testsigma" rows={comparisonRows} />
        </MarketingSection>

        <MarketingSection surface="tint">
            <MarketingSectionHeader
              id="what-qapilot-brings"
              title={
                <>
                  What QApilot Brings{" "}
                  <span className="text-primary">Beyond Testsigma</span>
                </>
              }
              marginBottomClassName="mb-10 md:mb-12"
            />

            <MarketingLedger
              cols={2}
              aria-label="What QApilot brings beyond Testsigma"
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
                href={PATHS.AGENTIC_ARCHITECTURE}
                className="text-primary hover:underline"
              >
                agentic architecture
              </Link>
              , and{" "}
              <Link
                href={PATHS.FOR_FLUTTER}
                className="text-primary hover:underline"
              >
                Flutter testing
              </Link>
              .
            </p>
        </MarketingSection>

        <CompareFaqSection faqs={faqs} />

        <MarketingCloseCta
          title={
            <>
              Ready for{" "}
                <span className="text-primary">Autonomous Mobile Coverage</span>
                ?
            </>
          }
          lead={<>See how QApilot helps mobile teams move from AI-assisted
                authoring to fully autonomous testing.</>}
        />
      </main>
    </div>
  );
}
