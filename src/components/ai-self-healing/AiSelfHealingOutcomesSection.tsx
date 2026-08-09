import { ArrowRight } from "lucide-react";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

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

        <MarketingLedger cols={2} aria-label="Self-healing outcomes">
          {ROWS.map((row) => (
            <MarketingLedgerCell key={row.before}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{row.before}</span>
                <ArrowRight className="hidden h-4 w-4 shrink-0 text-primary sm:block" aria-hidden />
                <span className="font-heading text-lg font-semibold text-primary md:text-xl">{row.after}</span>
              </div>
            </MarketingLedgerCell>
          ))}
        </MarketingLedger>
      </div>
    </section>
  );
}
