import type { ReactNode } from "react";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const ROWS: { before: string; after: ReactNode }[] = [
  {
    before: "Fragile tests",
    after: (
      <>
        <span className="text-primary">Reliable</span> execution
      </>
    ),
  },
  {
    before: "High maintenance",
    after: (
      <>
        <span className="text-primary">Low</span> upkeep
      </>
    ),
  },
  {
    before: "Limited coverage",
    after: (
      <>
        <span className="text-primary">Real</span> journeys
      </>
    ),
  },
  {
    before: "Low confidence",
    after: <span className="text-primary">Release-ready</span>,
  },
];

export function FlutterTestingOutcomesSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60"
      aria-labelledby="flutter-outcomes-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/[0.35] via-muted/[0.08] to-background"
        aria-hidden
      />
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="flutter-outcomes-heading"
          title={
            <>
              What <span className="text-primary">Changes</span>
            </>
          }
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <MarketingLedger cols={2} aria-label="Flutter testing outcomes">
          {ROWS.map((row) => (
            <MarketingLedgerCell key={row.before}>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/90">
                    From
                  </p>
                  <p className="font-heading text-lg font-medium leading-snug text-muted-foreground line-through decoration-muted-foreground/30 decoration-2 md:text-xl">
                    {row.before}
                  </p>
                </div>

                <div className="relative flex items-center gap-3">
                  <span className="h-px flex-1 bg-gradient-to-r from-border to-primary/45" aria-hidden />
                  <span className="shrink-0 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    to
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-l from-border to-primary/45" aria-hidden />
                </div>

                <div>
                  <p className="font-heading text-xl font-semibold leading-snug tracking-tight text-foreground md:text-2xl">
                    {row.after}
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
