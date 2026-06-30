import type { ReactNode } from "react";
import Link from "next/link";
import CompareHeroSection from "@/components/compare/CompareHeroSection";
import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingSectionHeader } from "@/components/marketing";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { PATHS } from "@/lib/routes";

export type AlternativePageConfig = {
  path: string;
  competitorName: string;
  eyebrow: string;
  h1: ReactNode;
  lead: string;
  competitorSubtitle: string;
  competitorBody: string;
  qapilotSubtitle: string;
  qapilotBody: string;
  comparisonRows: readonly (readonly [string, string, string])[];
  whyPoints: readonly string[];
  complementaryNote: string;
};

type AlternativeLandingPageProps = {
  config: AlternativePageConfig;
};

export function AlternativeLandingPage({ config }: AlternativeLandingPageProps) {
  const {
    path,
    competitorName,
    eyebrow,
    h1,
    lead,
    competitorSubtitle,
    competitorBody,
    qapilotSubtitle,
    qapilotBody,
    comparisonRows,
    whyPoints,
    complementaryNote,
  } = config;

  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: `${competitorName} Alternative`, path },
            ]),
          ),
        }}
      />

      <main>
        <CompareHeroSection
          heroId="alternative-hero"
          eyebrow={eyebrow}
          title={h1}
          description={lead}
        />

        <section className="section-edge w-full border-b border-border/50 bg-gradient-to-b from-muted/20 via-background to-background py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <div className="grid gap-0 overflow-hidden rounded-2xl border border-border/60 md:grid-cols-2">
              <article className="border-b border-border/60 p-6 md:border-b-0 md:border-r md:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {competitorName}
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground">
                  {competitorSubtitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{competitorBody}</p>
              </article>
              <article className="p-6 md:bg-primary/[0.04] md:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">QApilot</p>
                <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground">
                  {qapilotSubtitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{qapilotBody}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <MarketingSectionHeader
              id="comparison-table"
              title={
                <>
                  <span className="text-primary">QApilot</span> vs {competitorName}
                </>
              }
              marginBottomClassName="mb-8 md:mb-10"
            />

            <div className="grid gap-4 md:gap-5">
              {comparisonRows.map(([area, competitor, qapilot]) => (
                <article
                  key={area}
                  className="overflow-hidden rounded-2xl border border-border/70 bg-card/90 shadow-sm backdrop-blur-sm"
                >
                  <div className="border-b border-border/60 bg-muted/35 px-4 py-3 sm:px-5">
                    <p className="font-heading text-sm font-semibold tracking-tight text-foreground md:text-base">
                      {area}
                    </p>
                  </div>
                  <div className="grid divide-y divide-border/60 md:grid-cols-2 md:divide-x md:divide-y-0">
                    <div className="p-4 sm:p-5 md:p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {competitorName}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{competitor}</p>
                    </div>
                    <div className="relative bg-gradient-to-br from-primary/[0.07] via-transparent to-transparent p-4 sm:p-5 md:p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">QApilot</p>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-foreground md:text-base">
                        {qapilot}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 bg-muted/10 py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <MarketingSectionHeader
              id="why-qapilot"
              title={
                <>
                  Why Teams Choose QApilot Over{" "}
                  <span className="text-primary">{competitorName}</span>
                </>
              }
              marginBottomClassName="mb-8 md:mb-10"
            />

            <ul className="space-y-3">
              {whyPoints.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 rounded-xl border border-border/65 bg-card/85 p-4 text-sm leading-relaxed text-muted-foreground md:text-base"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:text-base">{complementaryNote}</p>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              Explore related capabilities:{" "}
              <Link href={PATHS.AUTONOMOUS_TESTING} className="text-primary hover:underline">
                autonomous testing
              </Link>
              ,{" "}
              <Link href={PATHS.INTEGRATIONS} className="text-primary hover:underline">
                integrations
              </Link>
              , and{" "}
              <Link href={PATHS.AI_SELF_HEALING} className="text-primary hover:underline">
                AI self-healing
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 bg-gradient-to-b from-primary/[0.08] to-background py-12 md:py-16">
          <div className="section-full text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              Ready for <span className="text-primary">Autonomous Mobile Testing</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              See how QApilot generates coverage faster, reduces maintenance, and delivers release-ready signals
              for mobile teams.
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
