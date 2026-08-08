import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingBackground, MarketingSectionHeader } from "@/components/marketing";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import type { IntegrationTool } from "@/lib/integrations";
import { integrationPath } from "@/lib/integrations";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function IntegrationLandingPage({ tool }: { tool: IntegrationTool }) {
  const path = integrationPath(tool.slug);

  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: "Integrations", path: PATHS.INTEGRATIONS },
              { name: tool.name, path },
            ]),
          ),
        }}
      />

      <main>
        <section
          className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible border-b border-border/40"
          aria-labelledby={`${tool.slug}-hero`}
        >
          <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple />
          <div className="relative z-10 section-full py-12 sm:py-14 md:py-16 lg:py-20 2xl:py-24">
            <div className="mx-auto max-w-6xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary/90 sm:mb-4">
                Integrations · {tool.name}
              </p>
              <div className="mb-6 flex h-16 items-center">
                <img
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  width={96}
                  height={56}
                  className="max-h-14 max-w-[6rem] object-contain"
                />
              </div>
              <h1 id={`${tool.slug}-hero`} className={cn(marketingHeroH1Class, "mb-5 text-balance sm:mb-6 md:mb-8")}>
                QApilot + <span className="text-primary">{tool.name}</span>
              </h1>
              <p className={cn(marketingHeroLeadClass, "max-w-3xl text-pretty")}>{tool.heroLead}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <BookDemoCtaButton />
                <Link
                  href={PATHS.INTEGRATIONS}
                  className="inline-flex items-center text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
                >
                  All integrations
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <MarketingSectionHeader
              id={`${tool.slug}-highlights`}
              title={
                <>
                  Why teams connect <span className="text-primary">{tool.name}</span>
                </>
              }
              description={<p>{tool.description}</p>}
              marginBottomClassName="mb-10 md:mb-12"
            />
            <ul className="grid gap-4 md:grid-cols-3">
              {tool.highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-border/70 bg-card/90 p-5 text-sm leading-relaxed text-muted-foreground md:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 bg-gradient-to-b from-primary/[0.08] to-background py-12 md:py-16">
          <div className="section-full text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              See QApilot with <span className="text-primary">{tool.name}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Book a demo to learn how QApilot fits into your {tool.name} workflow.
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
