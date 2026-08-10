import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { marketingSectionIntroClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const AGENTS = [
  "Navigation",
  "Interruption Handling",
  "Prioritization",
  "Test Data Generation",
  "Test Case Generation",
  "Execution",
  "Issue Detection",
] as const;

export function AgenticArchitectureAgentLayerSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="agentic-agents-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="agentic-agents-heading"
          title={
            <>
              Specialized Agents,{" "}
              <span className="text-primary">Working Together</span>
            </>
          }
          description="QApilot uses multiple agents. Each designed for a specific task:"
          marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {AGENTS.map((name) => (
            <div
              key={name}
              className="rounded-2xl border border-border/80 bg-muted/15 px-4 py-4 text-center transition-shadow hover:border-primary/25 hover:shadow-md hover:shadow-primary/5 md:py-5"
            >
              <span className="text-sm font-semibold text-foreground md:text-base">
                {name}
              </span>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "mt-12 max-w-3xl space-y-6 text-left",
            marketingSectionIntroClass,
          )}
        >
          <p>
            Each agent{" "}
            <span className="font-medium text-foreground">
              reads from the knowledge graph, writes back new insights, and
              improves system understanding.
            </span>
          </p>
          <p className="rounded-2xl border border-primary/30 bg-primary/[0.06] px-6 py-5 text-lg font-semibold text-foreground md:text-xl">
            This is not one model doing everything. It is a coordinated system
            of agents.
          </p>
        </div>
      </div>
    </section>
  );
}
