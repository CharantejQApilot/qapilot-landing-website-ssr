import { ArrowRight } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

export function IntelligentBugShiftSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="ibd-shift-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsl(var(--primary)/0.08),transparent_65%)]" aria-hidden />

      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="ibd-shift-heading"
          title={
            <>
              From Failures to <span className="text-primary">Actionable Signals</span>
            </>
          }
          description={
            <>
              <p>
                QApilot doesn&apos;t just report failures. It analyzes screens and interactions during execution to detect
                meaningful issue patterns.
              </p>
              <p>
                Each issue is identified automatically, mapped to the exact screen, and supported with visual and technical
                context.
              </p>
              <p className="font-medium text-foreground">
                That means teams can move from debugging symptoms to fixing root causes.
              </p>
            </>
          }
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-6 md:flex-row md:items-center md:gap-0">
          <div className="flex-1 rounded-2xl border border-dashed border-border bg-muted/20 p-5 sm:p-8 md:rounded-r-none md:border-r-0 md:py-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Before</p>
            <div className="mt-6 rounded-xl border border-border/80 bg-background/80 p-6 text-left shadow-inner">
              <div className="flex items-center gap-2 text-destructive">
                <span className="h-2 w-2 rounded-full bg-destructive" aria-hidden />
                <span className="text-sm font-semibold">Test failed</span>
              </div>
              <p className="mt-3 font-mono text-xs text-muted-foreground">AssertionError: expected true, received false</p>
              <p className="mt-4 text-sm text-muted-foreground">No screen reference. No severity. No next step.</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-center py-2 md:w-16 md:py-0" aria-hidden>
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary md:h-16 md:w-16">
              <ArrowRight className="h-6 w-6 md:h-7 md:w-7" />
            </div>
          </div>

          <div className="flex-1 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.07] to-background p-5 shadow-[0_24px_60px_-24px_hsl(var(--primary)/0.25)] sm:p-8 md:rounded-l-none md:py-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">After</p>
            <div className="mt-6 space-y-4 rounded-xl border border-primary/20 bg-card p-6 text-left shadow-md">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-destructive/15 px-2.5 py-0.5 text-xs font-semibold text-destructive">
                  High
                </span>
                <span className="text-sm font-semibold text-foreground">Action latency exceeded threshold</span>
              </div>
              <div className="flex gap-3">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                  <div className="absolute inset-2 rounded bg-background/90" />
                  <div className="absolute bottom-3 left-1/2 h-6 w-16 -translate-x-1/2 rounded border-2 border-primary ring-2 ring-primary/30" />
                </div>
                <div className="min-w-0 flex-1 space-y-1 text-xs text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Screen:</span> Checkout · Payment
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Element:</span> Button &quot;Pay now&quot;
                  </p>
                  <p className="text-primary">Guidance: Verify API response time and loading states on this step.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
