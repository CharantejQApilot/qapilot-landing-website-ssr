import type { Metadata } from "next";
import Link from "next/link";
import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import {
  MarketingCloseCta,
  MarketingSection,
  MarketingSectionHeader,
  MarketingThesisHero,
} from "@/components/marketing";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { INTEGRATION_TOOLS, integrationPath } from "@/lib/integrations";
import { PATHS } from "@/lib/routes";
import { buildStaticPageMetadata } from "@/lib/seo";

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
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
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
        <MarketingThesisHero
          titleId="integrations-hero"
          eyebrow="Ecosystem"
          title={
            <>
              Integrations. Works With Your{" "}
              <span className="text-primary">Existing Testing Stack</span>
            </>
          }
          lead="QApilot fits into the tools your team already uses for planning, communication, CI/CD, and device execution. So autonomous mobile testing enhances your workflow instead of replacing it."
          cta={<BookDemoCtaButton />}
        />

        <MarketingSection>
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

          <div className="grid gap-0 overflow-hidden rounded-md border border-border sm:grid-cols-2 lg:grid-cols-3">
            {INTEGRATION_TOOLS.map((integration) => (
              <Link
                key={integration.slug}
                href={integrationPath(integration.slug)}
                className="flex flex-col border-b border-border p-5 transition-colors hover:bg-muted/40 sm:border-r"
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
        </MarketingSection>

        <MarketingCloseCta
          title={
            <>
              See QApilot in <span className="text-primary">Your Stack</span>
            </>
          }
          lead="Book a demo to learn how QApilot connects with your CI/CD, device farms, and test management tools."
        />
      </main>
    </div>
  );
}
