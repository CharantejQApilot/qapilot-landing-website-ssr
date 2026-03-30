import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { cn } from "@/lib/utils";

const SCREENS = [
  { name: "Home Screen", count: 2, selected: false },
  { name: "Login Screen", count: 5, selected: true },
  { name: "Settings", count: 1, selected: false },
  { name: "Checkout", count: 8, selected: false },
] as const;

const ISSUES_ON_SELECTED = [
  { cat: "Accessibility", n: 2 },
  { cat: "Assets Latency", n: 2 },
  { cat: "Page Not Loaded", n: 1 },
] as const;

export function IntelligentBugScreenMappingSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="ibd-screens-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="ibd-screens-heading"
          title={
            <>
              Every Issue Is Mapped to the <span className="text-primary">Right Screen</span>
            </>
          }
          description="Issues are grouped by screen so teams can move from detection to investigation quickly. Pages with issues are organized by screen name, and each category displays a count showing how many issues were found — so you can move from a high-level view to the exact part of the app that needs attention."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto grid max-w-5xl gap-6 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_32px_64px_-28px_hsl(220_20%_12%/0.12)] lg:grid-cols-[minmax(0,220px)_1fr] lg:gap-0">
          <div className="border-b border-border/60 bg-muted/20 p-4 lg:border-b-0 lg:border-r">
            <p className="px-2 pb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Screens</p>
            <ul className="space-y-1">
              {SCREENS.map((s) => (
                <li key={s.name}>
                  <div
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      s.selected
                        ? "bg-primary/10 font-medium text-foreground shadow-sm ring-1 ring-primary/20"
                        : "text-muted-foreground hover:bg-muted/50",
                    )}
                  >
                    <span className="truncate">{s.name}</span>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
                        s.selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                      )}
                    >
                      {s.count}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-4 flex items-center justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Selected screen</p>
                <p className="font-heading text-lg font-semibold text-foreground">Login Screen</p>
              </div>
              <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
                5 issues
              </span>
            </div>
            <ul className="space-y-3">
              {ISSUES_ON_SELECTED.map((row) => (
                <li
                  key={row.cat}
                  className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/15 px-4 py-3"
                >
                  <span className="text-sm font-medium text-foreground">{row.cat}</span>
                  <span className="rounded-md bg-background px-2 py-0.5 text-xs font-semibold tabular-nums text-primary ring-1 ring-border">
                    {row.n} open
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
