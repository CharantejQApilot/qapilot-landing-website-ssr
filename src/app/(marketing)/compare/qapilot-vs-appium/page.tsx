import type { Metadata } from "next";
import Link from "next/link";
import CompareHeroSection from "@/components/compare/CompareHeroSection";
import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { CompareMatrixTable } from "@/components/compare/CompareMatrixTable";
import { CompareFaqSection } from "@/components/compare/CompareFaqSection";
import { ArticleSummariseWithAI } from "@/components/summarise-with-ai/ArticleSummariseWithAI";
import { MarketingSectionHeader } from "@/components/marketing";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { COMPARE_FAQS } from "@/lib/compare-faqs";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildFaqPageJsonLd } from "@/lib/faq-jsonld";
import { PATHS } from "@/lib/routes";
import { defaultOpenGraphImage } from "@/lib/seo";
import { formatPageTitle } from "@/lib/page-title";
import { cn } from "@/lib/utils";

const path = PATHS.COMPARE_APPIUM;
const canonicalUrl = `${SITE_BASE_URL}${path}`;
const faqs = COMPARE_FAQS.appium;

const heroComparisonCards = [
  {
    title: "Appium",
    subtitle: "Script-First Automation",
    body: "Teams define every flow, locator, device setup, and maintenance path manually.",
  },
  {
    title: "QApilot",
    subtitle: "Context-First Mobile Testing",
    body: "QApilot understands the app, generates coverage, executes journeys, heals failures, and shows release risk.",
  },
] as const;

const scalingPainPoints = [
  {
    title: "Heavy Authoring",
    body: "Every journey has to be scripted manually.",
  },
  {
    title: "Fragile Locators",
    body: "Tests break when IDs, hierarchy, or UI structure changes.",
  },
  {
    title: "High Maintenance",
    body: "App updates create constant script upkeep.",
  },
  {
    title: "Limited App Context",
    body: "Scripts know steps. They do not understand journeys.",
  },
  {
    title: "Slow Debugging",
    body: "Failed runs still need manual investigation across logs, screenshots, devices, and app state.",
  },
  {
    title: "Coverage Bottlenecks",
    body: "If no one writes the test, the flow remains uncovered.",
  },
] as const;

const comparisonRows = [
  ["Core Design", "Mobile automation framework", "AI-native mobile testing platform"],
  [
    "Primary Role",
    "Executes scripted tests",
    "Generates, executes, heals, debugs, and reports",
  ],
  [
    "Test Creation",
    "Manual script authoring",
    "Crawler-led generation, CoWork, and record/playback",
  ],
  ["Maintenance", "Manual locator and script updates", "Context-aware self-healing"],
  [
    "Debugging",
    "Shows failed steps and execution errors",
    "Shows why a mobile journey failed",
  ],
  [
    "Device Execution",
    "Requires setup and orchestration",
    "Built for real mobile execution workflows",
  ],
  [
    "Flutter Support",
    "Often workaround-heavy",
    "Built for Flutter, native, and hybrid complexity",
  ],
  [
    "Best Fit",
    "Teams with strong automation engineering bandwidth",
    "Mobile-first teams that need faster coverage and release confidence",
  ],
] as const;

const featureCards = [
  {
    title: "Autonomous Mobile Exploration",
    body: "Discover critical screens, actions, and journeys without defining every path upfront.",
  },
  {
    title: "AI-Native Test Generation",
    body: "Turn app understanding into executable coverage faster.",
  },
  {
    title: "CoWork From Existing Test Cases",
    body: "Bring test cases from your test management system and convert them into executable mobile tests.",
  },
  {
    title: "Context-Aware Self-Healing",
    body: "Reduce breakage using screen context, journey intent, metadata, and visual signals.",
  },
  {
    title: "Intelligent Bug Detection",
    body: "Surface mobile-specific risks like accessibility issues, action latency, page-load failures, and privacy/security signals.",
  },
  {
    title: "Release-Ready Reporting",
    body: "Get screenshots, logs, network traces, device metrics, failure context, and debugging evidence in one place.",
  },
] as const;

const betterFitPoints = [
  "Increase mobile coverage without increasing automation headcount.",
  "Reduce Appium maintenance and flaky test failures.",
  "Test Android and iOS releases faster.",
  "Handle Flutter, native, and hybrid app complexity.",
  "Convert existing manual test cases into automation.",
  "Get better debugging evidence for failed mobile journeys.",
  "Move from test execution to release readiness.",
] as const;

const PAGE_TITLE = formatPageTitle("QApilot vs Appium | AI-Native Mobile Testing");
const PAGE_TITLE_TEXT = PAGE_TITLE.absolute;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "QApilot vs Appium: autonomous crawling, AI test generation, self-healing, and release-ready reporting beyond script-first mobile automation.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    type: "website",
    title: PAGE_TITLE_TEXT,
    description:
      "QApilot vs Appium: autonomous crawling, AI test generation, self-healing, and release-ready reporting beyond scripts.",
    url: canonicalUrl,
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "QApilot vs Appium",
    description:
      "See how QApilot goes beyond Appium with autonomous crawling, AI-native generation, self-healing, and release-ready reporting.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export const revalidate = 300;

export default function QApilotVsAppiumComparisonPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "QApilot vs Appium", path },
            ]),
            buildFaqPageJsonLd(faqs),
          ]),
        }}
      />

      <main>
        <CompareHeroSection
          heroId="compare-appium-hero"
          eyebrow="QApilot vs Appium"
          title={
            <>
              QApilot vs Appium:{" "}
              <span className="text-primary">Release Mobile Apps With Confidence</span>
            </>
          }
          description={
            <>
              Appium Executes Scripts. QApilot Helps You Release Mobile Apps With Confidence. Appium is a
              powerful framework for mobile test automation. But mobile teams still carry the burden of
              authoring, maintaining, debugging, and scaling every test. QApilot adds the AI-native layer
              Appium was never designed to be. Autonomous exploration, context-aware execution, self-healing,
              and release-ready reporting for modern mobile teams.
            </>
          }
        />

        <div className="section-edge w-full border-b border-border/50 bg-background">
          <div className="section-full py-6 md:py-8">
            <ArticleSummariseWithAI pageUrl={`${SITE_BASE_URL}${path}`} />
          </div>
        </div>

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

            <MarketingSectionHeader
              id="appium-alone-not-enough"
              title={
                <>
                  Appium Is Strong. But Appium Alone Is{" "}
                  <span className="text-primary">Not Enough</span>.
                </>
              }
              description={
                <>
                  <p>
                    Appium solves mobile test execution. QApilot solves the larger mobile testing problem:
                    coverage, maintenance, debugging, and release readiness.
                  </p>
                  <p>
                    Most teams do not struggle because Appium cannot run a test. They struggle because every
                    new flow, UI change, device variation, permission, popup, OS behavior, or framework quirk
                    adds more effort.
                  </p>
                  <p>QApilot is built to reduce that effort.</p>
                </>
              }
              marginBottomClassName="mb-0 mt-12 md:mt-14"
            />
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 bg-muted/10 py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <MarketingSectionHeader
              id="appium-hard-to-scale"
              title={
                <>
                  Where Appium Gets <span className="text-primary">Hard To Scale</span>
                </>
              }
              marginBottomClassName="mb-10 md:mb-12"
            />

            <MarketingLedger cols={3} aria-label="Where Appium gets hard to scale">
              {scalingPainPoints.map((point) => (
                <MarketingLedgerCell key={point.title}>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{point.body}</p>
                </MarketingLedgerCell>
              ))}
            </MarketingLedger>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <MarketingSectionHeader
              id="appium-flutter-gap"
              title={
                <>
                  Appium&apos;s Biggest Mobile Gap: <span className="text-primary">Flutter</span>
                </>
              }
              description={
                <>
                  <p>
                    Flutter apps are not simple native apps with predictable locators. They often need special
                    drivers, extra setup, debug-friendly builds, and careful switching between Flutter, native,
                    and webview contexts.
                  </p>
                  <p>That turns Appium automation into an engineering-heavy effort.</p>
                  <p>
                    QApilot is built for this complexity. It can work across Flutter, native, and hybrid app
                    surfaces, understand journeys beyond locators, and reduce the scripting and maintenance
                    burden for Flutter-heavy mobile teams.
                  </p>
                </>
              }
              marginBottomClassName="mb-10 md:mb-12"
            />

            <div className="grid gap-0 overflow-hidden rounded-2xl border border-border/60 md:grid-cols-2">
              <article className="border-b border-border/60 p-6 md:border-b-0 md:border-r md:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Appium</p>
                <p className="mt-3 font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  With Appium, Flutter Testing Becomes A Workaround.
                </p>
              </article>
              <article className="p-6 md:bg-primary/[0.04] md:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">QApilot</p>
                <p className="mt-3 font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  With QApilot, Flutter Testing Becomes Part Of The Platform.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 bg-gradient-to-b from-muted/10 to-background py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <MarketingSectionHeader
              id="comparison-table"
              title={
                <>
                  <span className="text-primary">QApilot</span> vs Appium
                </>
              }
              marginBottomClassName="mb-8 md:mb-10"
            />

            <CompareMatrixTable competitorName="Appium" rows={comparisonRows} />
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <MarketingSectionHeader
              id="what-qapilot-brings"
              title={
                <>
                  What QApilot Brings <span className="text-primary">Beyond Appium</span>
                </>
              }
              marginBottomClassName="mb-10 md:mb-12"
            />

            <MarketingLedger cols={3} aria-label="What QApilot brings beyond Appium">
              {featureCards.map((feature) => (
                <MarketingLedgerCell key={feature.title}>
                  <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
                </MarketingLedgerCell>
              ))}
            </MarketingLedger>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 bg-muted/10 py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <MarketingSectionHeader
              id="journeys-not-steps"
              title={
                <>
                  Appium Automates Steps.{" "}
                  <span className="text-primary">QApilot Understands Journeys.</span>
                </>
              }
              description={
                <>
                  <p>
                    For mobile-first businesses, broken app journeys are business risks. KYC, checkout,
                    booking, payments, onboarding, renewals, transfers, uploads, and account actions cannot
                    be treated as isolated test steps. They need to be validated as complete mobile
                    experiences across devices, OS versions, app states, and frameworks.
                  </p>
                  <p>That is where QApilot fits.</p>
                </>
              }
              marginBottomClassName="mb-8 md:mb-10"
            />

            <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/85 p-6 md:p-8">
              <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                When QApilot Is The <span className="text-primary">Better Fit</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                Choose QApilot when your team needs to:
              </p>
              <ul className="mt-5 space-y-3">
                {betterFitPoints.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground md:text-base"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      aria-hidden
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:text-base">
              Explore related capabilities:{" "}
              <Link href={PATHS.AUTONOMOUS_TESTING} className="text-primary hover:underline">
                autonomous testing
              </Link>
              ,{" "}
              <Link href={PATHS.AI_SELF_HEALING} className="text-primary hover:underline">
                AI self-healing
              </Link>
              ,{" "}
              <Link href={PATHS.INTELLIGENT_BUG_DETECTION} className="text-primary hover:underline">
                intelligent bug detection
              </Link>
              , and{" "}
              <Link href={PATHS.FOR_FLUTTER} className="text-primary hover:underline">
                Flutter testing automation
              </Link>
              .
            </p>
          </div>
        </section>

        <CompareFaqSection faqs={faqs} />

        <section className="section-edge w-full border-b border-border/50 bg-gradient-to-b from-primary/[0.08] to-background py-12 md:py-16">
          <div className="section-full">
            <div className="sig-close">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              Ready To Move Beyond <span className="text-primary">Scripted Mobile Automation</span>?
            </h2>
            <p className="mt-4 w-full text-base leading-relaxed text-muted-foreground md:text-lg">
              QApilot helps mobile teams generate coverage faster, reduce maintenance, execute across real
              devices, and understand release readiness with mobile app context.
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
