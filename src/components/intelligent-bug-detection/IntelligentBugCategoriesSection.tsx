import { Accessibility, Gauge, Loader2 } from "lucide-react";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const CATEGORIES = [
  {
    id: "latency",
    title: "Assets Latency",
    chip: "Performance",
    line: "Measures delay between interactions and visible results.",
    detail:
      "Detects actions that take longer to show results by measuring latency between screens. When debug builds are used, corresponding network traces can also be displayed.",
    Icon: Gauge,
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
    visual: "focus",
  },
] as const;

export function IntelligentBugCategoriesSection() {
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

        <MarketingLedger cols={3} aria-label="Critical issue types">
          {CATEGORIES.map((c) => {
            const Icon = c.Icon;
            return (
              <MarketingLedgerCell key={c.id}>
                <div className="mb-5 flex h-28 items-center justify-center rounded-xl border border-border/60 bg-muted/30 md:h-32">
                  {c.visual === "timeline" ? (
                    <div className="flex w-full max-w-[200px] flex-col gap-2 px-4">
                      <div className="flex h-1.5 overflow-hidden rounded-full bg-border">
                        <div className="h-full w-1/3 rounded-full bg-primary" />
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
                        <Loader2 className="h-5 w-5 text-muted-foreground/50" />
                        <span className="text-xs text-muted-foreground">Unstable state</span>
                      </div>
                    </div>
                  ) : null}
                  {c.visual === "focus" ? (
                    <div className="relative flex h-16 w-28 items-center justify-center rounded-lg border-2 border-dashed border-primary/40 bg-background">
                      <div className="rounded px-3 py-1.5 text-[10px] font-medium ring-2 ring-muted-foreground/30 ring-offset-2 ring-offset-transparent">
                        Focus
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="flex items-start justify-between gap-2">
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
                <p className="mt-2 text-sm text-muted-foreground">{c.line}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.detail}</p>
              </MarketingLedgerCell>
            );
          })}
        </MarketingLedger>
      </div>
    </section>
  );
}
