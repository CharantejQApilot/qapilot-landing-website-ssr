import { Eye, Clock, Split } from "lucide-react";
import {
  MarketingLedger,
  MarketingLedgerCell,
} from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const TILES = [
  {
    title: "Review is in the file",
    line: "The bug shows up on the device, after the design was already signed off.",
    icon: Split,
  },
  {
    title: "Checks are by eye",
    line: "Someone scrolls the build and hopes they still remember the spacing.",
    icon: Eye,
  },
  {
    title: "It happens late",
    line: "Design QA lands the day of the release, when the only choice is to ship or slip.",
    icon: Clock,
  },
] as const;

export function DesignTestingProblemSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/15 via-background to-background"
      aria-labelledby="design-testing-problem-heading"
    >
      <div className="section-full relative z-10 py-16 md:py-20 lg:py-24">
        <MarketingSectionHeader
          id="design-testing-problem-heading"
          eyebrow="The gap"
          title={
            <>
              The approved screen is not the{" "}
              <span className="text-primary">shipped screen</span>
            </>
          }
          description="Design review and the release build live in different places. The difference is usually found by whoever has time to look."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <MarketingLedger cols={3} aria-label="Why design and the build drift apart">
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
