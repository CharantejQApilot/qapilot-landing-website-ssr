import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { cn } from "@/lib/utils";

export function SecurityReportsOverviewSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-background via-muted/10 to-background"
      aria-labelledby="sr-overview-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="sr-overview-heading"
          title={
            <>
              Your Build&apos;s <span className="text-primary">Security Snapshot</span>
            </>
          }
          description="A single dashboard-style summary: score, severity mix, volume, and what was detected—before you merge or ship."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/70 bg-card/90 p-6 text-center shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Risk Score</p>
            <div
              className="relative mt-4 flex h-28 w-28 items-center justify-center rounded-full border-4 border-primary/30 bg-primary/5"
              aria-hidden
            >
              <span className="font-heading text-3xl font-bold text-primary">72</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Modeled composite</p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Severity</p>
            <div className="mt-4 space-y-3">
              {[
                { label: "Critical", w: "w-[18%]", tone: "bg-destructive" },
                { label: "Warning", w: "w-[42%]", tone: "bg-amber-500" },
                { label: "Info", w: "w-[28%]", tone: "bg-primary/60" },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3 text-sm">
                  <span className="w-16 shrink-0 text-muted-foreground">{row.label}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className={cn("h-full rounded-full", row.tone, row.w)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/90 p-6 text-center shadow-sm sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Issues</p>
            <p className="mt-4 font-heading text-4xl font-bold text-foreground">128</p>
            <p className="mt-2 text-sm text-muted-foreground">Across latest run</p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-sm sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trackers</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Analytics", "Ads", "Crash", "Attribution"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border/80 bg-muted/40 px-3 py-1 text-xs font-medium text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
