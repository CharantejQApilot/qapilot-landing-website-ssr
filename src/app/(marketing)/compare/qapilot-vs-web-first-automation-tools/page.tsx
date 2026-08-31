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

const path = PATHS.COMPARE_WEB_FIRST;
const canonicalUrl = `${SITE_BASE_URL}${path}`;
const faqs = COMPARE_FAQS.webFirst;

const comparisonRows = [
  [
    "Core Design",
    "Built for browser automation",
    "Built for mobile app testing",
  ],
  [
    "Mobile Support",
    "Added through extensions, wrappers, or integrations",
    "Native focus from day one",
  ],
  [
    "Test Creation",
    "Scripted, recorded, low-code, or prompt-assisted",
    "Crawler-led generation plus guided creation",
  ],
  [
    "App Understanding",
    "Step-based or selector-based",
    "Journey-based with a mobile app knowledge graph",
  ],
  [
    "Self-Healing",
    "Often locator-led",
    "Context-aware across screens, journeys, metadata, and visual signals",
  ],
  [
    "Device Coverage",
    "Requires external setup and configuration",
    "Designed for real mobile execution workflows",
  ],
  [
    "Debugging",
    "Shows where a step failed",
    "Shows why a mobile journey failed",
  ],
  [
    "Flutter Support",
    "Often limited or workaround-heavy",
    "Built to handle mobile framework complexity",
  ],
  [
    "Best Fit",
    "Web-first products and browser QA",
    "Mobile-first teams that need release confidence",
  ],
] as const;

const compactCards = [
  {
    title: "Web-First Tooling",
    body: "Most automation ecosystems matured around browsers, DOM structures, and web events.",
  },
  {
    title: "Mobile Complexity",
    body: "Mobile quality depends on devices, OS versions, gestures, permissions, app states, and frameworks.",
  },
  {
    title: "Purpose-Built Gap",
    body: "Mobile teams need testing infrastructure built around app journeys, not browser assumptions.",
  },
] as const;

const featureCards = [
  {
    title: "Autonomous Mobile Exploration",
    body: "QApilot crawls the app, discovers screens, identifies actions, and maps journeys without requiring teams to define every path upfront.",
  },
  {
    title: "Mobile App Knowledge Graph",
    body: "QApilot stores context across screens, states, flows, and actions so tests are not just isolated scripts.",
  },
  {
    title: "AI-Native Test Generation",
    body: "QApilot uses crawler context to generate relevant sanity and regression coverage faster.",
  },
  {
    title: "Self-Healing Mobile Tests",
    body: "QApilot uses app context when locators, UI, or app states change, reducing maintenance effort.",
  },
  {
    title: "Release-Ready Reporting",
    body: "QApilot gives teams step-level screenshots, logs, network traces, device metrics, accessibility checks, action latency, and failure evidence.",
  },
] as const;

const PAGE_TITLE = formatPageTitle(
  "QApilot vs Web-First Tools | Mobile Testing",
);
const PAGE_TITLE_TEXT = PAGE_TITLE.absolute;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "Web-first tools were built for browsers, then extended to mobile. QApilot is mobile-first for native, hybrid, and Flutter with better coverage.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    type: "website",
    title: PAGE_TITLE_TEXT,
    description:
      "Compare mobile-first testing with web-first testing tools and see why QApilot delivers stronger context, self-healing, and release readiness for mobile apps.",
    url: canonicalUrl,
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "QApilot vs Web-First Automation Tools",
    description:
      "Why mobile-first apps need mobile-first testing, not web-first tools extended to mobile.",
    images: [
      { url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt },
    ],
  },
};

export const revalidate = 300;

export default function QApilotVsWebFirstComparisonPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "QApilot vs Web-First Automation Tools", path },
            ]),
            buildFaqPageJsonLd(faqs),
          ]),
        }}
      />

      <main>
        <CompareHeroSection
          heroId="compare-web-first-hero"
          eyebrow="QApilot vs Web-First Automation Tools"
          title="QApilot vs Web-First Automation Tools"
          description={
            <>
              Most &ldquo;mobile&rdquo; testing tools are web tools with an extra tab. We&apos;re not.
              QApilot vs web-first automation tools: built for native apps, real
              devices, and release-ready journeys. Not browser automation
              extended sideways.
            </>
          }
        />

        <MarketingSection paddingClassName="py-6 md:py-8">
            <ArticleSummariseWithAI pageUrl={`${SITE_BASE_URL}${path}`} />
        </MarketingSection>

        <MarketingSection surface="tint">
            <MarketingSectionHeader
              id="mobile-app-engineering-underserved"
              title={
                <>
                  Mobile App Engineering Is{" "}
                  <span className="text-primary">Underserved</span>
                </>
              }
              description={
                <>
                  <p>
                    Modern tooling matured around web-first workflows. Mobile
                    teams still handle fragmentation, OS behavior, gestures, app
                    states, native/hybrid screens, and Flutter complexity with
                    fewer purpose-built systems.
                  </p>
                  <p>
                    QApilot exists because mobile app testing needs its own
                    foundation.
                  </p>
                </>
              }
              marginBottomClassName="mb-10 md:mb-12"
            />

            <MarketingLedger cols={3} aria-label="Web-first tooling gaps">
              {compactCards.map((card) => (
                <MarketingLedgerCell key={card.title}>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {card.body}
                  </p>
                </MarketingLedgerCell>
              ))}
            </MarketingLedger>
        </MarketingSection>

        <MarketingSection surface="tint">
            <MarketingSectionHeader
              id="self-healing-contrast"
              title={
                <>
                  Web Assumptions Break In{" "}
                  <span className="text-primary">Mobile Environments</span>
                </>
              }
              description="Self-healing is the clearest example."
              marginBottomClassName="mb-10 md:mb-12"
            />

            <div className="grid gap-0 overflow-hidden rounded-md border border-border/60 md:grid-cols-2">
              <article className="border-b border-border/60 p-6 md:border-b-0 md:border-r md:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Web
                </p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground">
                  Structure Defines Behavior
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  On the web, DOM hierarchy, selectors, and browser events give
                  automation tools a stable foundation, so tools can often
                  recover when a locator changes.
                </p>
                <aside className="mt-5 border-l-2 border-foreground/15 pl-4">
                  <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
                    <span className="font-medium text-foreground/80">
                      Example:{" "}
                    </span>
                    Locator shifts from{" "}
                    <code className="rounded bg-muted/80 px-1 py-0.5 text-[0.7rem]">
                      email
                    </code>{" "}
                    to an updated selector path. The platform can often infer
                    the change and continue.
                  </p>
                </aside>
              </article>

              <article className="p-6 md:bg-primary/[0.04] md:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Mobile
                </p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground">
                  Behavior Defines Structure
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  In mobile apps, intent is expressed through gestures,
                  sequences, app states, permissions, and device behavior, and
                  element metadata is often sparse or inconsistent.
                </p>
                <aside className="mt-5 border-l-2 border-primary/50 pl-4">
                  <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
                    <span className="font-medium text-foreground/80">
                      Example:{" "}
                    </span>
                    If reliable accessibility IDs, resource IDs, or
                    XPath-friendly attributes are missing, locator-based healing
                    has less context to work with.
                  </p>
                </aside>
              </article>
            </div>

            <div className="mt-8 border-l-4 border-primary bg-muted/20 px-5 py-5 md:px-6 md:py-6">
              <p className="font-heading text-xl font-semibold tracking-tight text-foreground">
                Mobile Self-Healing Needs More Than Locator Recovery.{" "}
                <span className="text-primary">It Needs App Context.</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                Healing cannot depend on selectors alone. It must understand the
                screen, journey, nearby elements, and intended action.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                That is the gap QApilot is built to solve.
              </p>
            </div>
        </MarketingSection>

        <MarketingSection>
            <MarketingSectionHeader
              id="built-around-mobile-context"
              title={
                <>
                  QApilot Is Built Around{" "}
                  <span className="text-primary">Mobile Context</span>
                </>
              }
              description={
                <>
                  <p>
                    QApilot starts by understanding the app. Its autonomous
                    crawler maps screens, actions, and journeys. That context is
                    stored in a mobile app knowledge graph, so generation,
                    execution, self-healing, and reporting are context-aware by
                    default.
                  </p>
                </>
              }
              marginBottomClassName="mb-10 md:mb-12"
            />

            <div className="grid gap-4 md:grid-cols-4">
              {[
                "Crawler Explores App",
                "Knowledge Graph Stores Context",
                "Agents Generate And Execute Tests",
                "Reports Show Release Readiness",
              ].map((step, index) => (
                <div
                  key={step}
                  className="relative rounded-xl border border-border/60 bg-card/80 p-4 text-sm font-medium text-foreground"
                >
                  <span className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs text-primary">
                    {index + 1}
                  </span>
                  <p>{step}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:text-base">
              Explore related capabilities:{" "}
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
              ,{" "}
              <Link
                href={PATHS.INTELLIGENT_BUG_DETECTION}
                className="text-primary hover:underline"
              >
                intelligent bug detection
              </Link>
              , and{" "}
              <Link
                href={PATHS.FOR_FLUTTER}
                className="text-primary hover:underline"
              >
                Flutter testing automation
              </Link>
              .
            </p>
        </MarketingSection>

        <MarketingSection>
            <MarketingSectionHeader
              id="comparison-table"
              title={
                <>
                  <span className="text-primary">QApilot</span> vs Web-First
                  Automation Tools
                </>
              }
              marginBottomClassName="mb-8 md:mb-10"
            />

            <CompareMatrixTable competitorName="Web-First Tools" rows={comparisonRows} />
        </MarketingSection>

        <MarketingSection>
            <MarketingSectionHeader
              id="what-qapilot-brings"
              title={
                <>
                  What QApilot Brings To{" "}
                  <span className="text-primary">Mobile-First Testing</span>
                </>
              }
              marginBottomClassName="mb-10 md:mb-12"
            />

            <MarketingLedger
              cols={5}
              aria-label="What QApilot brings to mobile-first testing"
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
        </MarketingSection>

        <MarketingSection>
            <MarketingSectionHeader
              id="why-this-matters-and-fit"
              title={
                <>
                  Why This Matters And When{" "}
                  <span className="text-primary">QApilot Fits Best</span>
                </>
              }
              marginBottomClassName="mb-8 md:mb-10"
            />
            <div className="overflow-hidden rounded-md border border-border/60 bg-muted/15 md:grid md:grid-cols-2">
              <div className="border-b border-border/50 p-6 md:border-b-0 md:border-r md:p-8">
                <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                  Why <span className="text-primary">This Matters</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  For mobile-first businesses, the app is where users onboard,
                  pay, book, subscribe, and build trust. Failures in KYC,
                  checkout, booking, transfers, or retries are release risks,
                  not minor test misses.
                </p>
              </div>
              <div className="p-6 md:bg-primary/[0.04] md:p-8">
                <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                  When QApilot Is The{" "}
                  <span className="text-primary">Better Fit</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  QApilot is built for teams shipping mobile apps frequently
                  across Android and iOS, dealing with fragmentation,
                  native/hybrid/Flutter complexity, and flaky automation. If
                  mobile quality affects revenue, trust, compliance, or
                  velocity, a mobile-first test platform is the better
                  foundation.
                </p>
              </div>
            </div>
        </MarketingSection>

        <CompareFaqSection faqs={faqs} />

        <MarketingCloseCta
          title={
            <>
              Ready For{" "}
                <span className="text-primary">Mobile-First Testing</span>?
            </>
          }
          lead={<>QApilot helps mobile teams generate coverage faster, reduce
                maintenance, execute across devices, and understand mobile app
                release readiness with more context.</>}
        />
      </main>
    </div>
  );
}
