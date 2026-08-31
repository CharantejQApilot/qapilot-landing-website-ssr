import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import {
  MarketingCloseCta,
  MarketingSection,
  MarketingSectionHeader,
  MarketingThesisHero,
} from "@/components/marketing";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import type { IntegrationTool } from "@/lib/integrations";
import { integrationPath } from "@/lib/integrations";
import { PATHS } from "@/lib/routes";
import Link from "next/link";

function PointList({
  items,
  label,
}: {
  items: readonly string[];
  label: string;
}) {
  return (
    <ul className="space-y-3" aria-label={label}>
      {items.map((item) => (
        <li
          key={item}
          className="border-l-2 border-primary/35 pl-4 text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function IntegrationLandingPage({ tool }: { tool: IntegrationTool }) {
  const path = integrationPath(tool.slug);

  return (
    <div className="relative z-0 min-h-screen w-full section-edge home-canvas">
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
        <MarketingThesisHero
          titleId={`${tool.slug}-hero`}
          eyebrow={`Integrations · ${tool.name}`}
          title={
            <>
              QApilot + <span className="text-primary">{tool.name}</span>
            </>
          }
          lead={tool.heroLead}
          beforeTitle={
            <div className="mb-6 flex h-16 items-center">
              <img
                src={tool.logo}
                alt={`${tool.name} logo`}
                width={96}
                height={56}
                className="max-h-14 max-w-[6rem] object-contain"
              />
            </div>
          }
          cta={
            <>
              <BookDemoCtaButton />
              <Link
                href={PATHS.INTEGRATIONS}
                className="inline-flex items-center text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
              >
                All integrations
              </Link>
            </>
          }
        />

        <MarketingSection>
          <MarketingSectionHeader
            id={`${tool.slug}-highlights`}
            title={
              <>
                Why teams connect{" "}
                <span className="text-primary">{tool.name}</span>
              </>
            }
            description={<p>{tool.description}</p>}
            marginBottomClassName="mb-10 md:mb-12"
          />
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {tool.highlights.map((item) => (
              <li
                key={item}
                className="border-l-2 border-primary/35 pl-4 text-sm leading-relaxed text-foreground/85 md:text-base"
              >
                {item}
              </li>
            ))}
          </ul>
        </MarketingSection>

        <MarketingSection surface="tint">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2
                id={`${tool.slug}-in-practice`}
                className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
              >
                In practice
              </h2>
              <p className="mt-3 mb-6 text-sm text-muted-foreground md:text-base">
                How this usually shows up once it is wired in.
              </p>
              <PointList
                items={tool.inPractice}
                label={`${tool.name} in practice`}
              />
            </div>
            <div>
              <h2
                id={`${tool.slug}-worth-knowing`}
                className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
              >
                Worth knowing
              </h2>
              <p className="mt-3 mb-6 text-sm text-muted-foreground md:text-base">
                Straight notes before you plan the rollout.
              </p>
              <PointList
                items={tool.worthKnowing}
                label={`${tool.name} notes`}
              />
            </div>
          </div>
        </MarketingSection>

        <MarketingCloseCta
          title={
            <>
              See QApilot with <span className="text-primary">{tool.name}</span>
            </>
          }
          lead={`Book a short demo if you want to see this against your own ${tool.name} setup.`}
        />
      </main>
    </div>
  );
}
