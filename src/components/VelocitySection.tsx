import Link from "next/link";
import { Zap, Settings, Link2 } from "lucide-react";
import ReleaseReadinessFlowSection from "@/components/ReleaseReadinessFlowSection";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { PATHS } from "@/lib/routes";

const CI_CD_BLOG_PATH = `${PATHS.BLOGS}/enhance-mobile-apps-end-to-end-lifecycle-with-ci-cd-integrations`;

const cards = [
  {
    stat: "10x",
    label: "Faster Time To Market",
    description:
      "Autonomous test execution and an intuitive recording experience dramatically compress your test cycle — so releases ship in hours, not weeks.",
    highlight: "Autonomous test execution",
    icon: Zap,
    statFirst: true,
  },
  {
    stat: "90%",
    label: "Less Test Maintenance",
    description:
      "AI-native self-healing adapts to UI changes automatically, eliminating flaky tests and freeing your team from endless maintenance loops.",
    highlight: "AI-native self-healing",
    highlightHref: PATHS.AI_SELF_HEALING,
    icon: Settings,
    statFirst: false,
  },
  {
    stat: "75%",
    label: "Less QE Bottlenecks",
    description:
      "Seamless CI/CD integration with massively parallel test execution across your entire device matrix — no more queues, no more waiting.",
    highlight: "Seamless CI/CD integration",
    highlightHref: CI_CD_BLOG_PATH,
    icon: Link2,
    statFirst: true,
  },
] as const;

function highlightPhrase(text: string, phrase: string, href?: string) {
  const parts = text.split(new RegExp(`(${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "i"));
  return parts.map((part, i) =>
    part.toLowerCase() === phrase.toLowerCase() ? (
      href ? (
        <Link key={i} href={href} className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary">
          {phrase}
        </Link>
      ) : (
        <strong key={i} className="font-semibold text-primary">
          {phrase}
        </strong>
      )
    ) : (
      part
    ),
  );
}

/** Two vertical rails + diagonal hatch; height = grid cell (matches card stack) */
function VelocityPillar() {
  const diagonalFill =
    "repeating-linear-gradient(-45deg, transparent 0, transparent 6px, hsl(var(--foreground) / 0.2) 6px, hsl(var(--foreground) / 0.2) 7px)";

  return (
    <div
      className="relative flex min-h-0 w-10 flex-1 flex-row overflow-hidden border-y border-r border-border bg-muted/30 sm:w-11 md:w-12"
      aria-hidden="true"
    >
      <span className="min-h-0 w-[2px] shrink-0 self-stretch bg-foreground/25" />
      <div className="min-h-0 min-w-0 flex-1 self-stretch bg-muted/25" style={{ backgroundImage: diagonalFill }} />
      <span className="min-h-0 w-[2px] shrink-0 self-stretch bg-foreground/25" />
    </div>
  );
}

const VelocitySection = () => {
  return (
    <section
      className="relative overflow-hidden bg-background section-edge w-full"
      aria-labelledby="velocity-heading"
    >
      <div className="section-full pt-10 md:pt-14 2xl:pt-16 pb-2 sm:pb-3 md:pb-4 2xl:pb-4">
        <MarketingSectionHeader
          id="velocity-heading"
          eyebrow="Velocity"
          title={
            <>
              <span className="text-primary">Engineering Velocity</span> Without The QE Overhead
            </>
          }
          description={
            <>
              Traditional test automation requires constant maintenance and manual effort. QApilot enables engineering
              teams to validate mobile builds automatically within{" "}
              <Link
                href={CI_CD_BLOG_PATH}
                className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
              >
                CI/CD pipelines
              </Link>
              .
            </>
          }
        />

        <ReleaseReadinessFlowSection embedded />

        {/* Grid: pillar cell height = cards column (combined card stack) */}
        <div className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-stretch gap-x-5 md:gap-x-7 lg:gap-x-9">
          <div className="flex min-h-0 min-w-0 flex-col self-stretch">
            <VelocityPillar />
          </div>
          <div className="flex min-w-0 flex-col gap-6 md:gap-8">
            {cards.map((card, index) => {
              const Icon = card.icon;
              const statBlock = (
                <div className="flex flex-col justify-center">
                  <span className="font-heading text-4xl md:text-5xl 2xl:text-6xl font-semibold text-foreground tracking-tight">
                    {card.stat}
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground mt-1">
                    {card.label}
                  </span>
                </div>
              );
              const descBlock = (
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                    <Icon className="w-5 h-5" strokeWidth={1.5} aria-hidden />
                  </div>
                  <p className="text-foreground/90 text-lg md:text-xl leading-relaxed pt-0.5 min-w-0">
                    {highlightPhrase(card.description, card.highlight, "highlightHref" in card ? card.highlightHref : undefined)}
                  </p>
                </div>
              );

              return (
                <article
                  key={index}
                  className="bg-card border border-border rounded-2xl p-8 md:p-10 2xl:p-12 shadow-sm flex flex-col md:flex-row md:items-center gap-8 md:gap-12"
                >
                  {card.statFirst ? (
                    <>
                      <div className="md:min-w-[180px] 2xl:min-w-[200px]">{statBlock}</div>
                      <div className="flex-1 min-w-0">{descBlock}</div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 min-w-0 order-2 md:order-1">{descBlock}</div>
                      <div className="md:min-w-[180px] 2xl:min-w-[200px] order-1 md:order-2 md:text-right">
                        {statBlock}
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VelocitySection;
