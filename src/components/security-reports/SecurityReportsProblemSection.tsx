import { CalendarClock, EyeOff, Layers } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { cn } from "@/lib/utils";

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

        <div className="grid gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
          {TILES.map((tile) => (
            <div
              key={tile.title}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-shadow md:p-7",
                "motion-safe:hover:border-primary/25 motion-safe:hover:shadow-md",
              )}
            >
              <div
                className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-primary/[0.06]"
                aria-hidden
              />
              <tile.Icon className="relative h-9 w-9 text-primary" strokeWidth={1.35} aria-hidden />
              <h3 className="relative mt-4 font-heading text-lg font-semibold text-foreground md:text-xl">
                {tile.title}
              </h3>
              <p className="relative mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                {tile.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
