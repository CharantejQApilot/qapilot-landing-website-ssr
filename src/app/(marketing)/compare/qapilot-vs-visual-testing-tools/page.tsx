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
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { COMPARE_FAQS } from "@/lib/compare-faqs";
import { SITE_BASE_URL } from "@/lib/constants";
import { buildFaqPageJsonLd } from "@/lib/faq-jsonld";
import { PATHS } from "@/lib/routes";
import { defaultOpenGraphImage } from "@/lib/seo";
import { formatPageTitle } from "@/lib/page-title";
import { cn } from "@/lib/utils";

const path = PATHS.COMPARE_VISUAL_TESTING;
const canonicalUrl = `${SITE_BASE_URL}${path}`;
const faqs = COMPARE_FAQS.visual;

const heroComparisonCards = [
  {
    title: "Visual Testing Tools",
    subtitle: "Pixel-First Validation",
    body: "Compare screenshots, layouts, and visual differences across builds.",
  },
  {
    title: "QApilot",
    subtitle: "Journey-First Mobile Testing",
    body: "Understand app flows, execute user journeys, detect bugs, and surface release readiness signals.",
  },
] as const;

const limitationCards = [
  {
    title: "Pixel-Level Focus",
    body: "Visual testing validates how screens look, not whether journeys work.",
  },
  {
    title: "Limited Interaction Depth",
    body: "It may catch UI differences, but not always broken actions, failed transitions, or incomplete flows.",
  },
  {
    title: "No Journey Understanding",
    body: "Screens are compared as outputs, not as part of a larger user path.",
  },
  {
    title: "False Positives",
    body: "Minor visual differences can create noise even when the app behavior is correct.",
  },
  {
    title: "Missed Functional Failures",
    body: "A visually correct screen can still have broken buttons, failed APIs, latency issues, or blocked flows.",
  },
  {
    title: "Limited Release Context",
    body: "Visual checks alone do not show whether critical mobile journeys are ready for release.",
  },
] as const;

const behaviorSteps = [
  {
    title: "Explore",
    body: "The crawler discovers screens, actions, states, and journeys.",
  },
  {
    title: "Understand",
    body: "The knowledge graph stores app context across flows and screens.",
  },
  {
    title: "Execute",
    body: "Tests validate complete mobile journeys, not just screen appearance.",
  },
  {
    title: "Detect",
    body: "QApilot surfaces functional failures, accessibility issues, action latency, page-load problems, and privacy/security signals.",
  },
  {
    title: "Report",
    body: "Teams get release-ready evidence with screenshots, logs, network traces, device metrics, and failure context.",
  },
] as const;

const comparisonRows = [
  ["Core Design", "UI and screenshot comparison", "AI-native mobile app testing platform"],
  [
    "Primary Role",
    "Detects visual regressions",
    "Validates journeys, behavior, bugs, and release readiness",
  ],
  ["Test Focus", "How screens look", "Whether flows work"],
  ["App Understanding", "Screen-level comparison", "Journey-based mobile app context"],
  [
    "Test Creation",
    "Baseline screenshots and visual checkpoints",
    "Crawler-led generation, CoWork, and record/playback",
  ],
  [
    "Failure Detection",
    "Layout shifts, missing elements, visual differences",
    "Functional failures, app state issues, latency, accessibility, security signals, and bugs",
  ],
  ["Debugging", "Shows visual difference", "Shows why a mobile journey failed"],
  [
    "Device Coverage",
    "Useful for UI consistency across devices",
    "Built for real mobile execution workflows across devices and OS versions",
  ],
  [
    "Maintenance",
    "Baseline updates and visual review",
    "Context-aware self-healing and adaptive execution",
  ],
  [
    "Best Fit",
    "UI consistency and design regression checks",
    "Mobile-first teams that need release confidence",
  ],
] as const;

const featureCards = [
  {
    title: "Autonomous Mobile Exploration",
    body: "Discover critical screens, actions, and user journeys without defining every path upfront.",
  },
  {
    title: "Functional Journey Validation",
    body: "Validate whether onboarding, login, checkout, payment, booking, KYC, recharge, and other critical flows actually work.",
  },
  {
    title: "AI-Native Test Generation",
    body: "Turn app understanding into executable sanity and regression coverage.",
  },
  {
    title: "Context-Aware Self-Healing",
    body: "Reduce breakage using screen context, journey intent, metadata, and visual signals.",
  },
  {
    title: "Intelligent Bug Detection",
    body: "Surface issues beyond visual differences, including accessibility failures, action latency, page-load problems, and privacy/security risks.",
  },
  {
    title: "Release-Ready Reporting",
    body: "Get screenshots, logs, network traces, device metrics, failure evidence, and debugging context in one place.",
  },
] as const;

const betterFitPoints = [
  "Validate complete mobile journeys, not just screens.",
  "Increase functional coverage without increasing manual effort.",
  "Detect bugs that visual comparison cannot catch.",
  "Debug failures with logs, screenshots, network traces, and device metrics.",
  "Test across Android, iOS, devices, OS versions, and app states.",
  "Handle Flutter, native, and hybrid mobile complexity.",
  "Move from UI regression checks to release readiness.",
] as const;

const PAGE_TITLE = formatPageTitle("QApilot vs Visual Testing | Release Readiness");
const PAGE_TITLE_TEXT = PAGE_TITLE.absolute;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "Compare QApilot vs visual testing for mobile quality. Beyond screenshots: autonomous testing, journey validation, self-healing, and release-ready reporting.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    type: "website",
    title: PAGE_TITLE_TEXT,
    description:
      "QApilot vs visual testing: autonomous journeys, self-healing, and release-ready reporting beyond screenshots.",
    url: canonicalUrl,
    siteName: "QApilot",
    locale: "en_US",
    images: [defaultOpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "QApilot vs Visual Testing Tools",
    description:
      "See how QApilot goes beyond visual testing with journey validation, intelligent bug detection, and release-ready reporting.",
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export const revalidate = 300;

export default function QApilotVsVisualTestingComparisonPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "QApilot vs Visual Testing Tools", path },
            ]),
            buildFaqPageJsonLd(faqs),
          ]),
        }}
      />

      <main>
        <CompareHeroSection
          heroId="compare-visual-testing-hero"
          eyebrow="QApilot vs Visual Testing Tools"
          title={
            <>
              QApilot vs Visual Testing:{" "}
              <span className="text-primary">Catch What Could Break the Release</span>
            </>
          }
          description={
            <>
              Visual Testing Catches What Changed. QApilot Catches What Could Break Your Release.
              Visual testing tools are useful for spotting UI regressions. But mobile quality is more
              than pixels. QApilot validates real app journeys across screens, states, devices, gestures,
              performance signals, bugs, and release risks. Giving mobile teams confidence beyond visual
              comparison.
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
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{card.body}</p>
                </article>
              ))}
            </div>

            <MarketingSectionHeader
              id="visual-quality-not-full-picture"
              title={
                <>
                  Visual Quality Matters. But It Is Not The{" "}
                  <span className="text-primary">Full Mobile Quality Picture</span>.
                </>
              }
              description={
                <>
                  <p>
                    Visual testing helps teams detect layout shifts, broken UI, missing elements, and visual
                    regressions.
                  </p>
                  <p>But a mobile app can look correct and still fail.</p>
                  <p>
                    A checkout button may render perfectly but not respond. A KYC flow may look fine but fail
                    after OTP. A booking screen may load visually but break during payment. A page may appear
                    correct while network latency, app state, or backend failure creates a poor user
                    experience.
                  </p>
                  <p>QApilot is built for the full mobile journey.</p>
                </>
              }
              marginBottomClassName="mb-0 mt-12 md:mt-14"
            />
        </MarketingSection>

        <MarketingSection surface="tint">
            <MarketingSectionHeader
              id="visual-testing-limited"
              title={
                <>
                  Where Visual Testing Gets <span className="text-primary">Limited</span>
                </>
              }
              marginBottomClassName="mb-10 md:mb-12"
            />

            <MarketingLedger cols={3} aria-label="Where visual testing gets limited">
              {limitationCards.map((point) => (
                <MarketingLedgerCell key={point.title}>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{point.body}</p>
                </MarketingLedgerCell>
              ))}
            </MarketingLedger>
        </MarketingSection>

        <MarketingSection>
            <MarketingSectionHeader
              id="app-behavior"
              title={
                <>
                  QApilot Starts With <span className="text-primary">App Behavior</span>
                </>
              }
              description={
                <>
                  <p>QApilot does not stop at screenshots. It understands and validates how the app behaves.</p>
                </>
              }
              marginBottomClassName="mb-10 md:mb-12"
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {behaviorSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative rounded-xl border border-border/60 bg-card/80 p-4 text-sm"
                >
                  <span className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <p className="font-heading font-semibold tracking-tight text-foreground">{step.title}</p>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:text-base">
              Explore related capabilities:{" "}
              <Link href={PATHS.AUTONOMOUS_TESTING} className="text-primary hover:underline">
                autonomous testing
              </Link>
              ,{" "}
              <Link href={PATHS.INTELLIGENT_BUG_DETECTION} className="text-primary hover:underline">
                intelligent bug detection
              </Link>
              ,{" "}
              <Link href={PATHS.AI_SELF_HEALING} className="text-primary hover:underline">
                AI self-healing
              </Link>
              , and{" "}
              <Link href={PATHS.FOR_FLUTTER} className="text-primary hover:underline">
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
                  <span className="text-primary">QApilot</span> vs Visual Testing Tools
                </>
              }
              marginBottomClassName="mb-8 md:mb-10"
            />

            <CompareMatrixTable competitorName="Visual Testing Tools" rows={comparisonRows} />
        </MarketingSection>

        <MarketingSection>
            <MarketingSectionHeader
              id="what-qapilot-brings"
              title={
                <>
                  What QApilot Brings <span className="text-primary">Beyond Visual Testing</span>
                </>
              }
              marginBottomClassName="mb-10 md:mb-12"
            />

            <MarketingLedger cols={3} aria-label="What QApilot brings beyond visual testing">
              {featureCards.map((feature) => (
                <MarketingLedgerCell key={feature.title}>
                  <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
                </MarketingLedgerCell>
              ))}
            </MarketingLedger>
        </MarketingSection>

        <MarketingSection surface="tint">
            <MarketingSectionHeader
              id="journeys-not-screens"
              title={
                <>
                  Visual Testing Sees The Screen.{" "}
                  <span className="text-primary">QApilot Understands The Journey.</span>
                </>
              }
              description={
                <>
                  <p>
                    Mobile users do not experience apps as screenshots. They tap, swipe, wait, retry, upload,
                    verify, pay, cancel, search, book, renew, and move across app states.
                  </p>
                  <p>
                    A release is not ready because the UI looks right. A release is ready when critical
                    journeys work reliably across real mobile conditions.
                  </p>
                  <p>That is the gap QApilot is built to close.</p>
                </>
              }
              marginBottomClassName="mb-8 md:mb-10"
            />

            <div className="overflow-hidden rounded-md border border-border/60 bg-card/85 p-6 md:p-8">
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
        </MarketingSection>

        <CompareFaqSection faqs={faqs} />

        <MarketingCloseCta
          title={
            <>
              Ready To Test More Than <span className="text-primary">Pixels</span>?
            </>
          }
          lead={<>QApilot helps mobile teams validate real user journeys, detect release risks, and ship mobile
              apps with confidence.</>}
        />
      </main>

    </div>
  );
}
