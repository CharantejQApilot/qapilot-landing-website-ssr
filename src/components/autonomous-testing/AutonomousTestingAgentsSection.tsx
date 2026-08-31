import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/lib/routes";

const CAPABILITIES = [
  "Interruption Handling",
  "Home Page Identification",
  "Navigation",
  "Test Data Generation",
  "Test Case Generation",
  "Bug Reporting",
  "And more…",
] as const;

export function AutonomousTestingAgentsSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden home-canvas"
      aria-labelledby="autonomous-agents-heading"
    >

      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="autonomous-agents-heading"
          title={
            <>
              Powered by <span className="text-primary">Specialized Agents</span>
            </>
          }
          description="Autonomous testing is not driven by a single model. It is powered by a network of specialized agents that collaborate across exploration, prioritization, test generation, execution, and issue detection."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-background/70 px-5 py-6 text-center backdrop-blur-sm transition-colors duration-200 hover:border-primary/30 hover:bg-background/90 md:px-6 md:py-7"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <span className="relative text-sm font-medium text-foreground/85 md:text-[0.938rem]">
                {cap}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:mt-12">
          <Button variant="outline" size="lg" className="group rounded-xl border-primary/30 bg-background/80 px-8 font-semibold" asChild>
            <Link href={PATHS.AGENTIC_ARCHITECTURE}>
              Explore AI Agents
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
