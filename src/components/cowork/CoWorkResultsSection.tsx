import type { LucideIcon } from "lucide-react";
import { ListChecks, ShieldCheck, TrendingUp } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { cn } from "@/lib/utils";

type ResultItem = {
  stat: string;
  statSuffix?: string;
  title: string;
  body: string;
  Icon: LucideIcon;
};

const RESULTS: ResultItem[] = [
  {
    stat: "3×",
    statSuffix: "coverage",
    title: "More scenarios executed",
    body: "The same QA team can run significantly more test cases using assets they already have.",
    Icon: TrendingUp,
  },
  {
    stat: "Fewer",
    statSuffix: "gaps",
    title: "Tests left behind",
    body: "Shrink the backlog of cases that rarely get run before release.",
    Icon: ListChecks,
  },
  {
    stat: "Higher",
    statSuffix: "confidence",
    title: "Release readiness",
    body: "Broader validation across real devices before you ship.",
    Icon: ShieldCheck,
  },
];

export function CoWorkResultsSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 section-cream"
      aria-labelledby="cowork-results-heading"
    >
      <div
        className="pointer-events-none absolute -left-[12%] top-[10%] h-64 w-64 rounded-full bg-primary/[0.07] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[8%] bottom-[5%] h-72 w-72 rounded-full bg-primary/[0.05] blur-3xl"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern-subtle opacity-40" aria-hidden />

      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="cowork-results-heading"
          title={
            <>
              <span className="text-primary">3× Coverage</span> With the Team You Already Have
            </>
          }
          description="CoWork activates existing test cases before every release—without new scripts, new automation projects, or more headcount."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {RESULTS.map((item) => (
            <div
              key={item.title}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border/70 bg-background/90 p-6 shadow-sm backdrop-blur-sm",
                "transition-shadow duration-300 hover:border-primary/25 hover:shadow-[0_20px_48px_-20px_hsl(var(--primary)/0.18)]",
                "md:p-8",
              )}
            >
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-60 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-primary/[0.06] blur-2xl transition-opacity group-hover:bg-primary/[0.1]"
                aria-hidden
              />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/[0.08] text-primary shadow-sm">
                  <item.Icon className="h-5 w-5" aria-hidden />
                </div>
                <div className="text-right">
                  <p className="font-heading text-2xl font-bold tracking-tight text-primary md:text-3xl">
                    {item.stat}
                  </p>
                  {item.statSuffix ? (
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {item.statSuffix}
                    </p>
                  ) : null}
                </div>
              </div>

              <h3 className="relative mt-6 font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
                {item.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
