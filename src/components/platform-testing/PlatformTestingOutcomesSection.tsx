import type { ReactNode } from "react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import type { PlatformTestingContent } from "@/lib/platform-testing";
import { cn } from "@/lib/utils";

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

export function PlatformTestingOutcomesSection({ content }: { content: PlatformTestingContent }) {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-dot-pattern-subtle"
      aria-labelledby={`${content.slug}-outcomes-heading`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/[0.35] via-muted/[0.08] to-background"
        aria-hidden
      />
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id={`${content.slug}-outcomes-heading`}
          title={
            <>
              What <span className="text-primary">Changes</span>
            </>
          }
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {ROWS.map((row) => (
            <div
              key={row.before}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-5 shadow-md backdrop-blur-sm transition-shadow motion-safe:hover:shadow-lg sm:p-6 md:p-8",
              )}
            >
              <div
                className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-primary/[0.07] transition-opacity group-hover:bg-primary/[0.1]"
                aria-hidden
              />
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />

              <div className="relative flex flex-col gap-6">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
