import type { ReactNode } from "react";
import Link from "next/link";
import CompareHeroSection from "@/components/compare/CompareHeroSection";
import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { CompareMatrixTable } from "@/components/compare/CompareMatrixTable";
import { CompareFaqSection } from "@/components/compare/CompareFaqSection";
import {
  MarketingLedger,
  MarketingLedgerCell,
} from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing";
import { buildBreadcrumbList } from "@/lib/breadcrumb";
import { buildFaqPageJsonLd } from "@/lib/faq-jsonld";
import { PATHS } from "@/lib/routes";
import type { FaqItem } from "@/lib/faq-jsonld";

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
  faqs: readonly FaqItem[];
};

type AlternativeLandingPageProps = {
  config: AlternativePageConfig;
};

export function AlternativeLandingPage({
  config,
}: AlternativeLandingPageProps) {
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
    faqs,
  } = config;

  return (
    <div className="relative z-0 min-h-screen w-full section-edge bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            buildBreadcrumbList([
              { name: "Home", path: PATHS.HOME },
              { name: `${competitorName} Alternative`, path },
            ]),
            buildFaqPageJsonLd(faqs),
          ]),
        }}
      />

      <main>
        <CompareHeroSection
          heroId="alternative-hero"
          eyebrow={eyebrow}
          title={h1}
          description={lead}
        />

        <section className="section-edge w-full border-b border-border/50 bg-background py-12 md:py-16 2xl:py-20">
          <div className="section-full">
            <div className="sig-split items-start">
              <article className="min-w-0 border-b border-border pb-8 md:border-b-0 md:pb-0 md:pr-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {competitorName}
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground">
                  {competitorSubtitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {competitorBody}
                </p>
              </article>
              <article className="min-w-0 md:pl-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  QApilot
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground">
                  {qapilotSubtitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {qapilotBody}
                </p>
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
                  <span className="text-primary">QApilot</span> vs{" "}
                  {competitorName}
                </>
              }
              marginBottomClassName="mb-8 md:mb-10"
            />

            {/* S11 comparison matrix. Real table markup */}
            <CompareMatrixTable
              competitorName={competitorName}
              rows={comparisonRows}
            />
          </div>
        </section>

        <CompareFaqSection faqs={faqs} />

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

            <MarketingLedger
              cols={2}
              aria-label={`Reasons to choose QApilot over ${competitorName}`}
            >
              {whyPoints.map((point) => (
                <MarketingLedgerCell key={point} as="div">
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {point}
                  </p>
                </MarketingLedgerCell>
              ))}
            </MarketingLedger>

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:text-base">
              {complementaryNote}
            </p>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              Explore related capabilities:{" "}
              <Link
                href={PATHS.AUTONOMOUS_TESTING}
                className="text-primary hover:underline"
              >
                autonomous testing
              </Link>
              ,{" "}
              <Link
                href={PATHS.INTEGRATIONS}
                className="text-primary hover:underline"
              >
                integrations
              </Link>
              , and{" "}
              <Link
                href={PATHS.AI_SELF_HEALING}
                className="text-primary hover:underline"
              >
                AI self-healing
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="section-edge w-full border-b border-border/50 bg-gradient-to-b from-primary/[0.08] to-background py-12 md:py-16">
          <div className="section-full">
            <div className="sig-close">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                Ready for{" "}
                <span className="text-primary">Autonomous Mobile Testing</span>?
              </h2>
              <p className="mt-4 w-full text-base leading-relaxed text-muted-foreground md:text-lg">
                See how QApilot generates coverage faster, reduces maintenance,
                and delivers release-ready signals for mobile teams.
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
