import type { Metadata } from "next";
import Link from "next/link";
import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import {
  MarketingBackground,
  MarketingSectionHeader,
} from "@/components/marketing";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { INTEGRATION_TOOLS, integrationPath } from "@/lib/integrations";
import {
  marketingHeroH1Class,
  marketingHeroLeadClass,
} from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { buildStaticPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const path = PATHS.INTEGRATIONS;

export const metadata: Metadata = buildStaticPageMetadata({
  title: "Integrations. Works With Your Testing Stack",
  description:
    "QApilot integrates with Jira, TestRail, Jenkins, BrowserStack, Sauce Labs, Slack, Teams, and more. Fit autonomous mobile testing into your existing QA stack.",
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
          <MarketingBackground
            variant="hero"
            showDiagonalGrid={false}
            showPixelRipple
          />
          <div className="relative z-10 section-full py-12 sm:py-14 md:py-16 lg:py-20 2xl:py-24">
            <div className="mx-auto w-full max-w-6xl text-left sm:px-0 lg:mx-0 lg:max-w-7xl 2xl:max-w-[90rem]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary/90 sm:mb-4">
                Ecosystem
              </p>
              <h1
                id="integrations-hero"
                className={cn(
                  marketingHeroH1Class,
                  "mb-5 text-balance sm:mb-6 md:mb-8",
                )}
              >
                Integrations. Works With Your{" "}
                <span className="text-primary">Existing Testing Stack</span>
              </h1>
              <p className={marketingHeroLeadClass}>
                QApilot fits into the tools your team already uses for planning,
                communication, CI/CD, and device execution. So autonomous mobile
                testing enhances your workflow instead of replacing it.
              </p>
              <div className="mt-8 flex justify-start">
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
                  Connected{" "}
                  <span className="text-primary">Partners & Tools</span>
                </>
              }
              description={
                <p>
                  QApilot integrates with test management, issue tracking, CI/CD
                  pipelines, messaging platforms, and device clouds. Giving
                  mobile teams end-to-end coverage from generation to execution
                  to reporting.
                </p>
              }
              marginBottomClassName="mb-10 md:mb-12"
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {INTEGRATION_TOOLS.map((integration) => (
                <Link
                  key={integration.slug}
                  href={integrationPath(integration.slug)}
                  className="flex flex-col rounded-2xl border border-border/70 bg-card/90 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md"
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
                  <span className="mt-4 text-sm font-semibold text-primary">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>

            <p className="mt-10 text-left text-sm text-muted-foreground/70 md:text-base">
              And many more. QApilot integrates with your entire testing
              ecosystem.
            </p>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 bg-gradient-to-b from-primary/[0.08] to-background py-12 md:py-16">
          <div className="section-full">
            <div className="sig-close">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                See QApilot in <span className="text-primary">Your Stack</span>
              </h2>
              <p className="mt-4 w-full text-base leading-relaxed text-muted-foreground md:text-lg">
                Book a demo to learn how QApilot connects with your CI/CD,
                device farms, and test management tools.
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
