"use client";

import { useState } from "react";
import { Accessibility, Gauge, Loader2 } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  {
    id: "latency",
    title: "Assets Latency",
    chip: "Performance",
    line: "Measures delay between interactions and visible results.",
    detail:
      "Detects actions that take longer to show results by measuring latency between screens. When debug builds are used, corresponding network traces can also be displayed.",
    Icon: Gauge,
    accent: "from-amber-500/20 to-transparent",
    visual: "timeline",
  },
  {
    id: "load",
    title: "Page Not Loaded",
    chip: "Stability",
    line: "Surfaces screens that never reach a stable, complete state.",
    detail:
      "Flags screens that did not load fully or failed to reach a stable state during navigation.",
    Icon: Loader2,
    accent: "from-sky-500/15 to-transparent",
    visual: "skeleton",
  },
  {
    id: "a11y",
    title: "Accessibility",
    chip: "Inclusion",
    line: "Flags structural and attribute-level accessibility risks.",
    detail:
      "Highlights potential accessibility violations based on UI structure and attributes.",
    Icon: Accessibility,
    accent: "from-violet-500/15 to-transparent",
    visual: "focus",
  },
] as const;

export function IntelligentBugCategoriesSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-muted/10"
      aria-labelledby="ibd-categories-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="ibd-categories-heading"
          title={
            <>
              Automatically Detects <span className="text-primary">Critical Issue Types</span>
            </>
          }
          description="QApilot classifies issues into clear categories so teams can immediately understand what kind of problem was found and where it occurred."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="grid gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
          {CATEGORIES.map((c) => {
            const active = hovered === c.id;
            const Icon = c.Icon;
            return (
              <article
                key={c.id}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 md:p-7",
                  active ? "border-primary/40 shadow-lg shadow-primary/10 md:-translate-y-1" : "border-border/70 hover:border-primary/25",
                )}
                onMouseEnter={() => setHovered(c.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(c.id)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br opacity-60 blur-2xl transition-opacity duration-300",
                    c.accent,
                    active ? "opacity-100" : "opacity-40 group-hover:opacity-70",
                  )}
                  aria-hidden
                />

                <div className="relative mb-5 flex h-28 items-center justify-center rounded-xl border border-border/60 bg-muted/30 md:h-32">
                  {c.visual === "timeline" ? (
                    <div className="flex w-full max-w-[200px] flex-col gap-2 px-4">
                      <div className="flex h-1.5 overflow-hidden rounded-full bg-border">
                        <div
                          className={cn(
                            "h-full w-1/3 rounded-full bg-primary transition-all duration-500",
                            active && "w-2/3",
                          )}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        <span>Tap</span>
                        <span className="text-primary">Wait</span>
                        <span>Render</span>
                      </div>
                    </div>
                  ) : null}
                  {c.visual === "skeleton" ? (
                    <div className="flex w-full max-w-[180px] flex-col gap-2 px-4">
                      <div className="h-3 w-3/4 rounded bg-muted-foreground/20" />
                      <div className="h-3 w-full rounded bg-muted-foreground/15" />
                      <div className="mt-2 flex items-center gap-2">
                        <Loader2 className={cn("h-5 w-5 text-muted-foreground/50", active && "text-primary/70")} />
                        <span className="text-xs text-muted-foreground">Unstable state</span>
                      </div>
                    </div>
                  ) : null}
                  {c.visual === "focus" ? (
                    <div className="relative flex h-16 w-28 items-center justify-center rounded-lg border-2 border-dashed border-primary/40 bg-background">
                      <div
                        className={cn(
                          "rounded px-3 py-1.5 text-[10px] font-medium ring-2 ring-offset-2 transition-all duration-300",
                          active ? "ring-primary ring-offset-background" : "ring-muted-foreground/30 ring-offset-transparent",
                        )}
                      >
                        Focus
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="relative flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">{c.title}</h3>
                  </div>
                  <span className="shrink-0 rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {c.chip}
                  </span>
                </div>
                <p className="relative mt-2 text-sm text-muted-foreground">{c.line}</p>
                <p
                  className={cn(
                    "relative mt-4 text-sm leading-relaxed text-muted-foreground transition-opacity duration-300",
                    active ? "opacity-100" : "opacity-80 md:opacity-70",
                  )}
                >
                  {c.detail}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
