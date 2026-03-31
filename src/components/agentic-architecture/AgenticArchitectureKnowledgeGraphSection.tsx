import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { marketingSectionIntroClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { AgenticArchitectureKnowledgeGraphVisual } from "./AgenticArchitectureKnowledgeGraphVisual";

const CAPTURES = ["screens", "flows", "interactions", "relationships"] as const;

const ENABLES = [
  "Agents don’t work in isolation",
  "Each decision builds on previous understanding",
  "Testing evolves as the app evolves",
] as const;

export function AgenticArchitectureKnowledgeGraphSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="agentic-kg-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="agentic-kg-heading"
          title={
            <>
              The Context Layer That <span className="text-primary">Powers Everything</span>
            </>
          }
          marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-14">
          <div className={cn("space-y-8", marketingSectionIntroClass)}>
            <div className="space-y-4">
              <p className="font-medium text-foreground">
                The knowledge graph is not a byproduct. It is the foundation of the system.
              </p>
              <p>It captures:</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {CAPTURES.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-border/70 bg-muted/20 px-4 py-3 text-center text-sm font-medium capitalize text-foreground md:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p>And makes this context available to every agent.</p>
            </div>

            <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.06] to-transparent px-5 py-6 md:px-7 md:py-8">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">What this enables</p>
              <ul className="space-y-3">
                {ENABLES.map((line) => (
                  <li key={line} className="flex gap-3 text-base text-foreground md:text-lg">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <AgenticArchitectureKnowledgeGraphVisual className="shadow-lg shadow-primary/5" />
        </div>
      </div>
    </section>
  );
}
