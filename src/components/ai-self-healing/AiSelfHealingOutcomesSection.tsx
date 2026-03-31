import { ArrowRight } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { cn } from "@/lib/utils";

const ROWS = [
  { before: "Broken tests", after: "Stable execution" },
  { before: "Manual fixes", after: "Automatic recovery" },
  { before: "Flaky runs", after: "Consistent results" },
  { before: "Maintenance overhead", after: "Minimal" },
] as const;

export function AiSelfHealingOutcomesSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/15 via-background to-background"
      aria-labelledby="ash-outcomes-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="ash-outcomes-heading"
          title={
            <>
              What <span className="text-primary">Changes</span>
            </>
          }
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:gap-6">
          {ROWS.map((row) => (
            <div
              key={row.before}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-6 shadow-md backdrop-blur-sm",
                "motion-safe:hover:border-primary/25 motion-safe:hover:shadow-lg",
              )}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{row.before}</span>
                <ArrowRight className="hidden h-4 w-4 shrink-0 text-primary sm:block" aria-hidden />
                <span className="font-heading text-lg font-semibold text-primary md:text-xl">{row.after}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
