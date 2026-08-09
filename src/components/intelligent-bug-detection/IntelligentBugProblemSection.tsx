import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { marketingSectionIntroClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const PANELS = [
  {
    label: "Missing Context",
    body: "A failed step without screen-level evidence slows diagnosis.",
  },
  {
    label: "Hidden Runtime Issues",
    body: "Latency, incomplete loads, and accessibility gaps are often missed.",
  },
  {
    label: "Fragmented Signals",
    body: "Logs, screenshots, and ownership live in different places.",
  },
] as const;

export function IntelligentBugProblemSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/15 via-background to-background"
      aria-labelledby="ibd-problem-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="ibd-problem-heading"
          title={
            <>
              Failures Don&apos;t Tell You <span className="text-primary">What&apos;s Wrong</span>
            </>
          }
          description="Most testing tools tell you that something failed. They rarely tell you why."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mb-10 max-w-xl md:mb-12">
          <ul className={cn("list-none space-y-2", marketingSectionIntroClass)}>
            <li>Failures lack context.</li>
            <li>Debugging requires manual investigation.</li>
            <li>Performance and accessibility issues often go unnoticed.</li>
            <li>Signals are fragmented across tools and teams.</li>
          </ul>
          <p className="mt-6 text-base font-medium leading-relaxed text-foreground md:text-lg">
            The result is slow diagnosis, unclear ownership, and delayed fixes.
          </p>
        </div>

        <MarketingLedger cols={3} aria-label="Failure signal problems">
          {PANELS.map((p) => (
            <MarketingLedgerCell key={p.label}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{p.label}</p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">{p.body}</p>
            </MarketingLedgerCell>
          ))}
        </MarketingLedger>
      </div>
    </section>
  );
}
