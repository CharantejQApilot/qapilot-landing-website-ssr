import type { Metadata } from "next";
import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingBackground, MarketingSectionHeader } from "@/components/marketing";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { PARTNER_LOGOS_PATH_PREFIX } from "@/lib/seo";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { buildStaticPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const path = PATHS.INTEGRATIONS;

const integrations = [
  {
    name: "TestRail",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}962197a9-5e99-40b8-8f8c-794b50520d5e.png`,
    description:
      "Import test cases from TestRail and convert them into executable mobile tests with QApilot CoWork — bridging manual test management and autonomous execution.",
  },
  {
    name: "Jira",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}jira-software-logo.png`,
    description:
      "Auto-log bugs and test failures to Jira with screen context, severity, and reproduction evidence — so engineering gets actionable tickets, not noise.",
  },
  {
    name: "Microsoft Teams",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}bcb4526d-637b-49ba-a92d-b437d33a0516.png`,
    description:
      "Send build and test notifications to Teams channels so release managers and QE leads stay informed without leaving their workflow.",
  },
  {
    name: "Slack",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}f9ca9bd8-d74c-4852-8fa6-34c1be76aea3.png`,
    description:
      "Get real-time alerts on test runs, failures, and release readiness signals directly in Slack.",
  },
  {
    name: "BrowserStack",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}445698aa-1a01-42ef-9a78-96903c80c41f.png`,
    description:
      "Run QApilot-generated tests on BrowserStack device clouds — autonomous coverage generation paired with real-device execution at scale.",
  },
  {
    name: "LambdaTest",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}9f5ef4eb-33b0-4852-a38a-61a25aaebe56.png`,
    description:
      "Execute mobile test suites across LambdaTest's device grid while QApilot handles exploration, generation, and self-healing.",
  },
  {
    name: "Sauce Labs",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}e9abab36-d809-4b15-8fd2-134b7e1d473e.png`,
    description:
      "Combine QApilot's autonomous testing with Sauce Labs cloud infrastructure for parallel mobile execution.",
  },
  {
    name: "Jenkins",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}7cbcd4d0-466c-4693-8d02-87a5f30f712b.png`,
    description:
      "Trigger QApilot test runs from Jenkins pipelines — integrate autonomous mobile QA into your CI/CD workflow.",
  },
  {
    name: "XRAY",
    logo: `${PARTNER_LOGOS_PATH_PREFIX}k3huxfe9vfbic6vuvurwtsvu5ggz.png`,
    description:
      "Sync test management workflows with XRAY for teams tracking coverage and release quality in Jira-native test management.",
  },
] as const;

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Integrations — Works With Your Testing Stack",
  description:
    "QApilot integrates with Jira, TestRail, Jenkins, BrowserStack, Sauce Labs, Slack, Teams, and more — fit autonomous mobile testing into your existing QA stack.",
  path,
  ogDescription:
    "Connect QApilot with Jira, CI/CD, device clouds, and test management tools your team already uses.",
});

export const revalidate = 300;

export default function IntegrationsPage() {
  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Integrations", path },
            ]),
          ),
        }}
      />

      <main>
        <section
          className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible border-b border-border/40"
          aria-labelledby="integrations-hero"
        >
          <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple />
          <div className="relative z-10 section-full py-12 sm:py-14 md:py-16 lg:py-20 2xl:py-24">
            <div className="mx-auto max-w-6xl text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary/90 sm:mb-4">
                Ecosystem
              </p>
              <h1 id="integrations-hero" className={cn(marketingHeroH1Class, "mb-5 text-balance sm:mb-6 md:mb-8")}>
                Integrations — Works With Your{" "}
                <span className="text-primary">Existing Testing Stack</span>
              </h1>
              <p className={cn(marketingHeroLeadClass, "mx-auto max-w-3xl text-pretty")}>
                QApilot fits into the tools your team already uses for planning, communication, CI/CD, and device
                execution — so autonomous mobile testing enhances your workflow instead of replacing it.
              </p>
              <div className="mt-8 flex justify-center">
                <BookDemoCtaButton />
              </div>
            </div>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <MarketingSectionHeader
              id="integration-partners"
              title={
                <>
                  Connected <span className="text-primary">Partners & Tools</span>
                </>
              }
              description={
                <p>
                  QApilot integrates with test management, issue tracking, CI/CD pipelines, messaging platforms, and
                  device clouds — giving mobile teams end-to-end coverage from generation to execution to reporting.
                </p>
              }
              marginBottomClassName="mb-10 md:mb-12"
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {integrations.map((integration) => (
                <article
                  key={integration.name}
                  className="flex flex-col rounded-2xl border border-border/70 bg-card/90 p-5 shadow-sm backdrop-blur-sm"
                >
                  <div className="mb-4 flex h-16 items-center">
                    <img
                      src={integration.logo}
                      alt={`${integration.name} logo`}
                      width={80}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      className="max-h-12 max-w-[5rem] object-contain"
                    />
                  </div>
                  <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                    {integration.name}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {integration.description}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-10 text-center text-sm text-muted-foreground/70 md:text-base">
              And many more — QApilot integrates with your entire testing ecosystem.
            </p>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 bg-gradient-to-b from-primary/[0.08] to-background py-12 md:py-16">
          <div className="section-full text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              See QApilot in <span className="text-primary">Your Stack</span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Book a demo to learn how QApilot connects with your CI/CD, device farms, and test management tools.
            </p>
            <div className="mt-8 flex justify-center">
              <BookDemoCtaButton />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
