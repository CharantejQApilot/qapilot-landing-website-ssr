import type { ReactNode } from "react";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const BLOCKS: { from: string; to: ReactNode }[] = [
  {
    from: "predefined flows",
    to: (
      <>
        <span className="text-primary">Continuously</span> discovered{" "}
        <span className="text-primary">journeys</span>
      </>
    ),
  },
  {
    from: "manual test creation",
    to: (
      <>
        <span className="text-primary">System-generated</span>{" "}
        <span className="text-primary">coverage</span>
      </>
    ),
  },
  {
    from: "brittle maintenance",
    to: (
      <>
        <span className="text-primary">Adaptive</span> <span className="text-primary">validation</span>
      </>
    ),
  },
];

export function AutonomousTestingWhatChangesSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60"
      aria-labelledby="autonomous-what-changes-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="autonomous-what-changes-heading"
          title={
            <>
              What <span className="text-primary">Autonomous Testing</span> Changes
            </>
          }
          description="Autonomous testing changes the role of testing itself. Instead of writing and maintaining predefined flows, teams move to a system that explores, understands, and validates the app continuously."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <MarketingLedger cols={3} aria-label="What autonomous testing changes">
          {BLOCKS.map((block) => (
            <MarketingLedgerCell key={block.from}>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
                    From
                  </p>
                  <p className="font-heading text-lg font-medium leading-snug text-muted-foreground line-through decoration-muted-foreground/25 decoration-1 md:text-xl">
                    {block.from}
                  </p>
                </div>
                <div className="relative flex items-center gap-3">
                  <span className="h-px flex-1 bg-gradient-to-r from-border to-primary/40" aria-hidden />
                  <span className="shrink-0 rounded-full bg-primary/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    to
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-l from-border to-primary/40" aria-hidden />
                </div>
                <div>
                  <p className="font-heading text-xl font-semibold leading-snug tracking-tight text-foreground md:text-2xl">
                    {block.to}
                  </p>
                </div>
              </div>
            </MarketingLedgerCell>
          ))}
        </MarketingLedger>
      </div>
    </section>
  );
}
