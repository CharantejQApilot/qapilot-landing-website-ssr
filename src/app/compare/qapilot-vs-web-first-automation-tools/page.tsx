import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { MarketingBackground, MarketingSectionHeader } from "@/components/marketing";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { SITE_BASE_URL } from "@/lib/constants";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { defaultOpenGraphImage } from "@/lib/seo";
import { cn } from "@/lib/utils";
import BookDemoCtaButton from "./BookDemoCtaButton";

const path = PATHS.COMPARE_WEB_FIRST;
const canonicalUrl = `${SITE_BASE_URL}${path}`;

const faqItems = [
  {
    question: "Is QApilot a replacement for web automation tools?",
    answer:
      "No. QApilot is built for mobile app testing. If your product is primarily web-first, web automation tools may still be the right fit. If your mobile app is business-critical, QApilot is designed for that use case.",
  },
  {
    question: "Why not use a web-first tool with mobile support?",
    answer:
      "That can work for simple flows. The challenge starts when teams need reliable coverage across real devices, app states, native screens, hybrid views, Flutter screens, gestures, permissions, and frequent releases.",
  },
  {
    question: "What makes QApilot mobile-first?",
    answer:
      "QApilot is designed around mobile app realities: APK and IPA workflows, real device execution, autonomous mobile crawling, gestures, permissions, pop-ups, app states, framework complexity, network traces, device metrics, and mobile-specific reporting.",
  },
  {
    question: "How is QApilot's self-healing different?",
    answer:
      "QApilot's self-healing is guided by mobile app context, not just locator recovery. It can use screen context, journey history, element metadata, screenshots, hierarchy, and surrounding actions to understand what changed.",
  },
  {
    question: "Does QApilot support Flutter apps?",
    answer:
      "Yes. Flutter testing is one of the areas where QApilot's mobile-first approach matters most, especially when traditional automation struggles with framework-specific complexity.",
  },
  {
    question: "Can teams still control and edit tests in QApilot?",
    answer:
      "Yes. QApilot is autonomous, but not a black box. Teams can review, edit, record, guide, and rerun flows. The goal is to reduce repetitive effort while keeping testers in control.",
  },
] as const;

const comparisonRows = [
  ["Core design", "Built for browser automation", "Built for mobile app testing"],
  ["Mobile support", "Added through extensions, wrappers, or integrations", "Native focus from day one"],
  [
    "Test creation",
    "Scripted, recorded, low-code, or prompt-assisted",
    "Crawler-led generation plus guided creation",
  ],
  ["App understanding", "Step-based or selector-based", "Journey-based with a mobile app knowledge graph"],
  [
    "Self-healing",
    "Often locator-led",
    "Context-aware across screens, journeys, metadata, and visual signals",
  ],
  ["Device coverage", "Requires external setup and configuration", "Designed for real mobile execution workflows"],
  ["Debugging", "Shows where a step failed", "Shows why a mobile journey failed"],
  ["Flutter support", "Often limited or workaround-heavy", "Built to handle mobile framework complexity"],
  ["Best fit", "Web-first products and browser QA", "Mobile-first teams that need release confidence"],
] as const;

const compactCards = [
  {
    title: "Web-first tooling",
    body: "Most automation ecosystems matured around browsers, DOM structures, and web events.",
  },
  {
    title: "Mobile complexity",
    body: "Mobile quality depends on devices, OS versions, gestures, permissions, app states, and frameworks.",
  },
  {
    title: "Purpose-built gap",
    body: "Mobile teams need testing infrastructure built around app journeys, not browser assumptions.",
  },
] as const;

const featureCards = [
  {
    title: "Autonomous mobile exploration",
    body: "QApilot crawls the app, discovers screens, identifies actions, and maps journeys without requiring teams to define every path upfront.",
  },
  {
    title: "Mobile app knowledge graph",
    body: "QApilot stores context across screens, states, flows, and actions so tests are not just isolated scripts.",
  },
  {
    title: "AI-native test generation",
    body: "QApilot uses crawler context to generate relevant sanity and regression coverage faster.",
  },
  {
    title: "Self-healing mobile tests",
    body: "QApilot uses app context when locators, UI, or app states change, reducing maintenance effort.",
  },
  {
    title: "Release-ready reporting",
    body: "QApilot gives teams step-level screenshots, logs, network traces, device metrics, accessibility checks, action latency, and failure evidence.",
  },
] as const;

export const metadata: Metadata = {
  title: "QApilot vs Web-First Automation Tools | Mobile-First App Testing",
  description:
    "Web-first automation tools were built for browsers, then extended to mobile. QApilot is built mobile-first, helping teams test native, hybrid, and Flutter apps with better coverage, lower maintenance, and faster release confidence.",
  keywords: [
    "QApilot vs web-first automation tools",
    "mobile-first testing",
    "mobile app test automation",
    "mobile automation testing",
    "web-first testing tools",
    "mobile app release readiness",
    "AI-native mobile testing",
    "Flutter testing automation",
    "self-healing mobile tests",
    "mobile test automation platform",
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    type: "website",
    title: "QApilot vs Web-First Automation Tools | Mobile-First App Testing",
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
    images: [{ url: defaultOpenGraphImage.url, alt: defaultOpenGraphImage.alt }],
  },
};

export const revalidate = 300;

export default function QApilotVsWebFirstComparisonPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const structuredData = [
    buildBreadcrumbList([
      { name: "Home", path: PATHS.HOME },
      { name: "QApilot vs Web-First Automation Tools", path },
    ]),
    faqSchema,
  ];

  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <main>
        <section
          className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible border-b border-border/40"
          aria-labelledby="compare-web-first-hero"
        >
          <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple />
          <div className="relative z-10 section-full py-12 sm:py-14 md:py-16 lg:py-20 2xl:py-24">
            <div className="mx-auto max-w-5xl text-center">
              <div className="min-w-0">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary/90 sm:mb-4">
                  QApilot vs Web-First Automation Tools
                </p>
                <h1 id="compare-web-first-hero" className={cn(marketingHeroH1Class, "mb-5 text-balance sm:mb-6 md:mb-8")}>
                  When Your App Is <span className="text-primary">Mobile-first</span>, Your Testing Should Be
                  <span className="text-primary"> Too</span>.
                </h1>
                <p className={cn(marketingHeroLeadClass, "mx-auto max-w-3xl text-pretty")}>
                  Most automation tools were built for browsers first. Mobile support came later.
                </p>
                <div className="mt-8 flex justify-center">
                  <BookDemoCtaButton />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 bg-gradient-to-b from-muted/20 via-background to-background py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <MarketingSectionHeader
              id="mobile-app-engineering-underserved"
              title={
                <>
                  Mobile app engineering is <span className="text-primary">underserved</span>
                </>
              }
              description={
                <>
                  <p>
                    Modern tooling matured around web-first workflows. Mobile teams still handle
                    fragmentation, OS behavior, gestures, app states, native/hybrid screens, and Flutter
                    complexity with fewer purpose-built systems.
                  </p>
                  <p>QApilot exists because mobile app testing needs its own foundation.</p>
                </>
              }
              marginBottomClassName="mb-10 md:mb-12"
            />

            <div className="grid gap-5 md:grid-cols-3 md:gap-6">
              {compactCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-2xl border border-border/70 bg-card/85 p-6 shadow-sm backdrop-blur-sm"
                >
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 bg-muted/10 py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <MarketingSectionHeader
              id="self-healing-contrast"
              title={
                <>
                  Web assumptions break in <span className="text-primary">mobile environments</span>
                </>
              }
              description="Self-healing is the clearest example."
              marginBottomClassName="mb-10 md:mb-12"
            />

            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              <article className="rounded-2xl border border-border/70 bg-card/85 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Web</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground">
                  Structure defines behavior
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  On the web, DOM hierarchy, selectors, and browser events give automation tools a stable
                  foundation, so tools can often recover when a locator changes.
                </p>
                <p className="mt-4 rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                  Locator shifts from <code>email</code> to an updated selector path. The platform can
                  often infer the change and continue.
                </p>
              </article>

              <article className="rounded-2xl border border-primary/30 bg-primary/[0.08] p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Mobile</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground">
                  Behavior defines structure
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  In mobile apps, intent is expressed through gestures, sequences, app states, permissions,
                  and device behavior, and element metadata is often sparse or inconsistent.
                </p>
                <p className="mt-4 rounded-lg border border-primary/30 bg-background/70 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                  If reliable accessibility IDs, resource IDs, or XPath-friendly attributes are missing,
                  locator-based healing has less context to work with.
                </p>
              </article>
            </div>

            <div className="mt-8 rounded-2xl border border-primary/35 bg-primary/[0.07] px-6 py-5">
              <p className="font-heading text-xl font-semibold tracking-tight text-foreground">
                Mobile self-healing needs more than locator recovery. It needs app context.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                Healing cannot depend on selectors alone. It must understand the screen, journey, nearby
                elements, and intended action.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                That is the gap QApilot is built to solve.
              </p>
            </div>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <MarketingSectionHeader
              id="built-around-mobile-context"
              title={
                <>
                  QApilot is built around <span className="text-primary">mobile context</span>
                </>
              }
              description={
                <>
                  <p>
                    QApilot starts by understanding the app. Its autonomous crawler maps screens, actions,
                    and journeys. That context is stored in a mobile app knowledge graph, so generation,
                    execution, self-healing, and reporting are context-aware by default.
                  </p>
                </>
              }
              marginBottomClassName="mb-10 md:mb-12"
            />

            <div className="grid gap-4 md:grid-cols-4">
              {[
                "Crawler explores app",
                "Knowledge graph stores context",
                "Agents generate and execute tests",
                "Reports show release readiness",
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
              <Link href="/platform/autonomous-testing" className="text-primary hover:underline">
                autonomous testing
              </Link>
              ,{" "}
              <Link href="/platform/ai-self-healing" className="text-primary hover:underline">
                AI self-healing
              </Link>
              ,{" "}
              <Link href="/platform/intelligent-bug-detection" className="text-primary hover:underline">
                intelligent bug detection
              </Link>
              , and{" "}
              <Link href="/solutions/flutter-testing" className="text-primary hover:underline">
                Flutter testing automation
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 bg-gradient-to-b from-muted/10 to-background py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <MarketingSectionHeader
              id="comparison-table"
              title={
                <>
                  <span className="text-primary">QApilot</span> vs web-first automation tools
                </>
              }
              marginBottomClassName="mb-8 md:mb-10"
            />

            <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card/85 shadow-sm">
              <table className="w-full min-w-[760px] border-collapse">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="border-b border-border/70 px-4 py-3 text-left text-sm font-semibold text-foreground">
                      Area
                    </th>
                    <th className="border-b border-border/70 px-4 py-3 text-left text-sm font-semibold text-foreground">
                      Web-first automation tools
                    </th>
                    <th className="border-b border-border/70 px-4 py-3 text-left text-sm font-semibold text-foreground">
                      QApilot
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row[0]} className="align-top">
                      <td className="border-b border-border/50 px-4 py-3 text-sm font-medium text-foreground">
                        {row[0]}
                      </td>
                      <td className="border-b border-border/50 px-4 py-3 text-sm text-muted-foreground">
                        {row[1]}
                      </td>
                      <td className="border-b border-border/50 px-4 py-3 text-sm text-muted-foreground">
                        {row[2]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <MarketingSectionHeader
              id="what-qapilot-brings"
              title={
                <>
                  What QApilot brings to <span className="text-primary">mobile-first testing</span>
                </>
              }
              marginBottomClassName="mb-10 md:mb-12"
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {featureCards.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-xl border border-border/65 bg-card/85 p-4 shadow-sm"
                >
                  <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <MarketingSectionHeader
              id="why-this-matters-and-fit"
              title={
                <>
                  Why this matters and when <span className="text-primary">QApilot fits best</span>
                </>
              }
              marginBottomClassName="mb-8 md:mb-10"
            />
            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              <article className="rounded-2xl border border-border/70 bg-card/85 p-6 shadow-sm">
                <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                  Why this matters
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  For mobile-first businesses, the app is where users onboard, pay, book, subscribe, and
                  build trust. Failures in KYC, checkout, booking, transfers, or retries are release risks,
                  not minor test misses.
                </p>
              </article>
              <article className="rounded-2xl border border-primary/30 bg-primary/[0.08] p-6 shadow-sm">
                <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                  When QApilot is the better fit
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  QApilot is built for teams shipping mobile apps frequently across Android and iOS, dealing
                  with fragmentation, native/hybrid/Flutter complexity, and flaky automation. If mobile
                  quality affects revenue, trust, compliance, or velocity, a mobile-first test platform is
                  the better foundation.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 bg-foreground py-12 text-background md:py-16 2xl:py-20">
          <div className="section-full">
            <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-5xl">
              The <span className="text-primary">shift</span>
            </h2>
            <div className="mt-7 space-y-3 text-lg leading-relaxed text-background/85 md:text-2xl">
              <p>Web-first automation asks:</p>
              <p className="font-heading text-xl text-background md:text-3xl">&quot;Can this step run?&quot;</p>
              <p>QApilot asks:</p>
              <p className="font-heading text-xl text-background md:text-3xl">
                &quot;Is this mobile journey ready for release?&quot;
              </p>
              <p>That is the difference between running tests and building release confidence.</p>
            </div>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 bg-gradient-to-b from-primary/[0.08] to-background py-12 md:py-16">
          <div className="section-full text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              Ready for <span className="text-primary">mobile-first testing</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              QApilot helps mobile teams generate coverage faster, reduce maintenance, execute across
              devices, and understand mobile app release readiness with more context.
            </p>
            <div className="mt-8 flex justify-center">
              <BookDemoCtaButton />
            </div>
          </div>
        </section>

        <section className="section-edge w-full py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <MarketingSectionHeader
              id="faqs"
              title={
                <>
                  <span className="text-primary">FAQs</span>
                </>
              }
              marginBottomClassName="mb-8 md:mb-10"
            />
            <div className="space-y-4">
              {faqItems.map((faq) => (
                <details key={faq.question} className="group rounded-xl border border-border/70 bg-card/75 p-5">
                  <summary className="cursor-pointer list-none font-heading text-lg font-semibold text-foreground">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
