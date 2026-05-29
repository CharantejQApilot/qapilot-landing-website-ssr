import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { cn } from "@/lib/utils";

const WITHOUT = ["tests are predefined", "coverage is limited", "failures lack meaning"] as const;

const WITH = ["coverage is discovered", "flows are understood", "issues are explained"] as const;

export function AgenticArchitectureContextMattersSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="agentic-context-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="agentic-context-heading"
          title={
            <>
              Why Testing Needs <span className="text-primary">Context</span>
            </>
          }
          marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
        />

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="flex h-full flex-col rounded-2xl border border-border/80 bg-muted/15 p-6 md:p-8">
            <h3 className="mb-4 font-heading text-lg font-semibold text-muted-foreground md:text-xl">Without Context</h3>
            <ul className="space-y-3 text-base leading-relaxed text-muted-foreground md:text-lg">
              {WITHOUT.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="text-primary" aria-hidden>
                    —
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={cn(
              "flex h-full flex-col rounded-2xl border border-primary/35 bg-gradient-to-b from-primary/[0.08] via-primary/[0.04] to-background p-6 shadow-md shadow-primary/10 md:p-8",
              "ring-1 ring-primary/15",
            )}
          >
            <h3 className="mb-4 font-heading text-lg font-semibold text-primary md:text-xl">With Context</h3>
            <ul className="space-y-3 text-base font-medium leading-relaxed text-foreground md:text-lg">
              {WITH.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="text-primary" aria-hidden>
                    ✓
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
