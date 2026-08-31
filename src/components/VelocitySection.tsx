import Link from "next/link";
import { Zap, Settings, Link2 } from "lucide-react";
import { HomeSeam } from "@/components/home/HomeSeam";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { PATHS } from "@/lib/routes";

const CI_CD_BLOG_PATH = `${PATHS.BLOGS}/enhance-mobile-apps-end-to-end-lifecycle-with-ci-cd-integrations`;

const cards = [
  {
    stat: "10x",
    label: "Faster Time To Market",
    description:
      "Autonomous test execution and an intuitive recording experience dramatically compress your test cycle. So releases ship in hours, not weeks.",
    highlight: "Autonomous test execution",
    icon: Zap,
  },
  {
    stat: "90%",
    label: "Less Test Maintenance",
    description:
      "AI-native self-healing adapts to UI changes automatically, eliminating flaky tests and freeing your team from endless maintenance loops.",
    highlight: "AI-native self-healing",
    highlightHref: PATHS.AI_SELF_HEALING,
    icon: Settings,
  },
  {
    stat: "75%",
    label: "Less QE Bottlenecks",
    description:
      "Seamless CI/CD integration with massively parallel test execution across your entire device matrix. No more queues, no more waiting.",
    highlight: "Seamless CI/CD integration",
    highlightHref: CI_CD_BLOG_PATH,
    icon: Link2,
  },
] as const;

function highlightPhrase(text: string, phrase: string, href?: string) {
  const parts = text.split(
    new RegExp(`(${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "i"),
  );
  return parts.map((part, i) =>
    part.toLowerCase() === phrase.toLowerCase() ? (
      href ? (
        <Link
          key={i}
          href={href}
          className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
        >
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

/** S06 capability ledger. Same velocity content, shared-border cells. */
const VelocitySection = () => {
  return (
    <section
      className="relative overflow-hidden home-canvas section-edge w-full"
      aria-labelledby="velocity-heading"
    >
      <HomeSeam />
      <div className="section-full pt-16 md:pt-20 lg:py-24 pb-16 md:pb-20">
        <MarketingSectionHeader
          id="velocity-heading"
          eyebrow="Velocity"
          title={
            <>
              <span className="text-primary">Engineering Velocity</span> Without
              The QE Overhead
            </>
          }
          description={
            <>
              Traditional test automation requires constant maintenance and
              manual effort. QApilot enables engineering teams to validate
              mobile builds automatically within{" "}
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

        <div className="sig-ledger">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.label}
                className="sig-cell flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                      {card.stat}
                    </span>
                    <span className="mt-1 block text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {card.label}
                    </span>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </div>
                </div>
                <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
                  {highlightPhrase(
                    card.description,
                    card.highlight,
                    "highlightHref" in card ? card.highlightHref : undefined,
                  )}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VelocitySection;
