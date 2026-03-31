import { ArrowRight, Sparkles, XCircle } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

export function AiSelfHealingShiftSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="ash-shift-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="ash-shift-heading"
          title={
            <>
              From Broken Tests to <span className="text-primary">Self-Healing Execution</span>
            </>
          }
          description="QApilot automatically repairs failed steps during execution instead of letting tests break."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto flex max-w-4xl flex-col items-stretch gap-6 md:flex-row md:items-center md:justify-center md:gap-4">
          <div className="flex-1 rounded-2xl border border-dashed border-border bg-muted/20 p-5 sm:p-6 md:rounded-r-none md:border-r-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Failed step</p>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-border/80 bg-background/90 p-4 text-left shadow-inner">
              <XCircle className="h-5 w-5 shrink-0 text-destructive" aria-hidden />
              <span className="text-sm font-semibold text-foreground">Element not found</span>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-center md:w-14" aria-hidden>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary md:h-14 md:w-14">
              <ArrowRight className="h-5 w-5 rotate-90 md:rotate-0 md:h-6 md:w-6" />
            </div>
          </div>

          <div className="flex-1 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.07] to-background p-5 shadow-lg shadow-primary/10 sm:p-6 md:rounded-l-none">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Healed step</p>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-primary/20 bg-card p-4 text-left shadow-md">
              <Sparkles className="h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span className="text-sm font-semibold text-foreground">Target re-identified · run continues</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
