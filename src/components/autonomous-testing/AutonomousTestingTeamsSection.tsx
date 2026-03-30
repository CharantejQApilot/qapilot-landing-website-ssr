import type { ReactNode } from "react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { ArrowRight } from "lucide-react";

const ROWS: { from: string; to: ReactNode }[] = [
  {
    from: "Writing tests",
    to: (
      <>
        Building <span className="text-primary">coverage</span>
      </>
    ),
  },
  {
    from: "Fragile suites",
    to: (
      <>
        <span className="text-primary">Resilient</span> <span className="text-primary">execution</span>
      </>
    ),
  },
  {
    from: "Narrow validation",
    to: (
      <>
        <span className="text-primary">Broader journey</span> coverage
      </>
    ),
  },
  {
    from: "Delayed surprises",
    to: (
      <>
        <span className="text-primary">Continuous</span> <span className="text-primary">release signals</span>
      </>
    ),
  },
  {
    from: "Uncertainty",
    to: (
      <>
        <span className="text-primary">Release</span> <span className="text-primary">confidence</span>
      </>
    ),
  },
];

export function AutonomousTestingTeamsSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-background via-muted/[0.35] to-background"
      aria-labelledby="autonomous-teams-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="autonomous-teams-heading"
          title={
            <>
              What Changes for <span className="text-primary">Teams</span>
            </>
          }
          marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
        />

        <div className="mx-auto max-w-4xl space-y-3 md:space-y-4">
          {ROWS.map((row) => (
            <div
              key={row.from}
              className="group grid grid-cols-1 items-center gap-4 rounded-2xl border border-border/70 bg-background/70 px-5 py-5 backdrop-blur-sm transition-colors hover:border-primary/20 md:grid-cols-[1fr_auto_1fr] md:gap-6 md:px-8 md:py-6"
            >
              <p className="text-center font-heading text-base font-medium text-muted-foreground md:text-left md:text-lg">
                {row.from}
              </p>
              <div className="flex justify-center" aria-hidden>
                <ArrowRight className="h-5 w-5 text-primary/60 transition-transform group-hover:translate-x-0.5 md:h-6 md:w-6" />
              </div>
              <p className="text-center font-heading text-base font-semibold text-foreground md:text-right md:text-lg">
                {row.to}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
