import AgenticArchitectureDiagram from "@/components/AgenticArchitectureDiagram";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

export function AgenticArchitectureSystemOverviewSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="agentic-system-overview-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="agentic-system-overview-heading"
          title={
            <>
              A System, <span className="text-primary">Not a Single Model</span>
            </>
          }
          marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
        />

        <div className="relative rounded-2xl border border-border/60 bg-muted/10 p-4 md:p-8 lg:p-10">
          <AgenticArchitectureDiagram />
        </div>

        <p className="mt-10 w-full text-left text-lg font-medium leading-relaxed text-foreground md:text-xl">
          The knowledge graph acts as the central context layer. Connecting all
          agents and enhancing every stage of the testing lifecycle.
        </p>
      </div>
    </section>
  );
}
