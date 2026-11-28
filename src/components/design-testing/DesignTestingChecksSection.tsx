import { AlignLeft, Palette, Puzzle, ScanSearch } from "lucide-react";
import {
  MarketingLedger,
  MarketingLedgerCell,
} from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const CHECKS = [
  {
    title: "Spacing and alignment",
    line: "Padding, gaps, and edges that no longer match the layout that was approved.",
    icon: AlignLeft,
  },
  {
    title: "Type and color",
    line: "Size, weight, and color that shifted when the screen was built.",
    icon: Palette,
  },
  {
    title: "Missing or extra pieces",
    line: "A control that never made the build, or one that showed up and was not in the design.",
    icon: Puzzle,
  },
  {
    title: "A named finding",
    line: "The difference is attached to the screen, so design and QA are not arguing over a heatmap.",
    icon: ScanSearch,
  },
] as const;

export function DesignTestingChecksSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/40"
      aria-labelledby="design-testing-checks-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/[0.35] via-transparent to-transparent"
        aria-hidden
      />
      <div className="section-full relative z-10 py-16 md:py-20 lg:py-24">
        <MarketingSectionHeader
          id="design-testing-checks-heading"
          eyebrow="What it names"
          title={
            <>
              Drift you can <span className="text-primary">point at</span>
            </>
          }
          description="Design Testing is not a screenshot gallery. It says what changed on the screen the user will actually see."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <MarketingLedger cols={2} aria-label="What Design Testing reports">
          {CHECKS.map((check) => (
            <MarketingLedgerCell key={check.title}>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.08] text-primary"
                  aria-hidden
                >
                  <check.icon className="h-7 w-7" strokeWidth={1.35} />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
                    {check.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {check.line}
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
