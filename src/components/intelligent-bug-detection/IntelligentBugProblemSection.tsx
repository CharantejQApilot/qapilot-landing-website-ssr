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

        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 2xl:gap-20">
          <div className="max-w-xl lg:pt-0">
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

          <div className="relative flex flex-col gap-5 pl-0 lg:pl-6">
            <div
              className="pointer-events-none absolute -left-4 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-primary/40 via-border to-transparent lg:block"
              aria-hidden
            />
            {PANELS.map((p, i) => (
              <div
                key={p.label}
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-shadow md:p-7",
                  i === 1 && "lg:translate-x-4",
                  i === 2 && "lg:translate-x-2",
                )}
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-primary/[0.06]" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{p.label}</p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
