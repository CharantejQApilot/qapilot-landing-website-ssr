import { Crosshair, Gauge, Unlink } from "lucide-react";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const TILES = [
  {
    title: "Missing Selectors",
    line: "Elements are hard to identify reliably",
    icon: Crosshair,
  },
  {
    title: "Flaky Execution",
    line: "Passes locally, fails in CI",
    icon: Gauge,
  },
  {
    title: "Broken Transitions",
    line: "Flutter, native, and webviews don’t sync",
    icon: Unlink,
  },
] as const;

export function FlutterTestingProblemSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/15 via-background to-background"
      aria-labelledby="flutter-problems-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="flutter-problems-heading"
          title={
            <>
              Why <span className="text-primary">Flutter Testing</span> Breaks
            </>
          }
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <MarketingLedger cols={3} aria-label="Flutter testing problems">
          {TILES.map((tile) => (
            <MarketingLedgerCell key={tile.title}>
              <div className="flex flex-col gap-4">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.08] text-primary"
                  aria-hidden
                >
                  <tile.icon className="h-6 w-6" strokeWidth={1.35} />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
                    {tile.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {tile.line}
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
