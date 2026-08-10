import { CalendarClock, EyeOff, Layers } from "lucide-react";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const TILES = [
  {
    title: "Late Discovery",
    body: "Security gaps surface after code freeze—when fixes are expensive and releases slip.",
    Icon: CalendarClock,
  },
  {
    title: "Fragmented Tools",
    body: "Separate scanners and spreadsheets mean no single view of risk for the build you’re shipping.",
    Icon: Layers,
  },
  {
    title: "Low Visibility",
    body: "Teams lack a shared, release-ready picture of what changed and what still needs attention.",
    Icon: EyeOff,
  },
] as const;

export function SecurityReportsProblemSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/15 via-background to-background"
      aria-labelledby="sr-problem-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="sr-problem-heading"
          title={
            <>
              Why Security Feels <span className="text-primary">Invisible</span> in Mobile QE
            </>
          }
          description="Functional tests pass while exposure, misconfiguration, and third-party risk stay off the radar."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <MarketingLedger cols={3} aria-label="Security visibility problems">
          {TILES.map((tile) => (
            <MarketingLedgerCell key={tile.title}>
              <tile.Icon className="h-9 w-9 text-primary" strokeWidth={1.35} aria-hidden />
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground md:text-xl">
                {tile.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                {tile.body}
              </p>
            </MarketingLedgerCell>
          ))}
        </MarketingLedger>
      </div>
    </section>
  );
}
