import type { ReactNode } from "react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const BLOCKS: { from: string; to: ReactNode }[] = [
  {
    from: "Test cases sitting in Jira",
    to: (
      <>
        <span className="text-primary">Runnable</span> mobile automation
      </>
    ),
  },
  {
    from: "Manual execution bottlenecks",
    to: (
      <>
        <span className="text-primary">AI-assisted</span> execution
      </>
    ),
  },
  {
    from: "Coverage gaps",
    to: (
      <>
        Broader <span className="text-primary">release validation</span>
      </>
    ),
  },
];

export function CoWorkWhatChangesSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="cowork-what-changes-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="cowork-what-changes-heading"
          title={
            <>
              What <span className="text-primary">CoWork</span> Changes
            </>
          }
          description="Instead of creating new automation from scratch, CoWork starts with the tests you already have."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {BLOCKS.map((block) => (
            <div
              key={block.from}
              className="group relative overflow-hidden rounded-2xl border border-border/80 bg-muted/20 p-5 shadow-sm sm:p-6 md:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex flex-col gap-6">
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
                    From
                  </p>
                  <p className="font-heading text-lg font-medium leading-snug text-muted-foreground line-through decoration-muted-foreground/25 md:text-xl">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
