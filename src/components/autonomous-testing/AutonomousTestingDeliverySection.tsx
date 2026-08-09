import type { ReactNode } from "react";
import { AutonomousTestingWalkthroughVideo } from "@/components/autonomous-testing/AutonomousTestingWalkthroughVideo";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const STEPS: { id: string; title: ReactNode; body: string }[] = [
  {
    id: "explore",
    title: (
      <>
        <span className="text-primary">Explore</span> the <span className="text-primary">App</span>
      </>
    ),
    body: "The crawler navigates the mobile app like a real user, identifying screens, transitions, and journeys.",
  },
  {
    id: "knowledge-graph",
    title: (
      <>
        Create the <span className="text-primary">Knowledge Graph</span>
      </>
    ),
    body: "App behavior is converted into a structured knowledge graph that becomes the foundation for downstream testing tasks.",
  },
  {
    id: "coverage",
    title: (
      <>
        <span className="text-primary">Generate</span> <span className="text-primary">Coverage</span>
      </>
    ),
    body: "Agents transform the graph into test cases and prioritize the journeys that matter most.",
  },
  {
    id: "execute",
    title: (
      <>
        <span className="text-primary">Execute</span> Across <span className="text-primary">Environments</span>
      </>
    ),
    body: "Tests run across devices, platforms, and execution environments to validate real-world behavior.",
  },
  {
    id: "adapt",
    title: (
      <>
        <span className="text-primary">Adapt</span> as the App <span className="text-primary">Evolves</span>
      </>
    ),
    body: "The system keeps coverage current through self-healing and continuous recalibration.",
  },
];

export function AutonomousTestingDeliverySection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="autonomous-delivery-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="autonomous-delivery-heading"
          title={
            <>
              How <span className="text-primary">QApilot</span> Delivers{" "}
              <span className="text-primary">Autonomous Testing</span>
            </>
          }
          marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
        />

        <AutonomousTestingWalkthroughVideo />

        <MarketingLedger cols={5} aria-label="How QApilot delivers autonomous testing">
          {STEPS.map((step, i) => (
            <MarketingLedgerCell key={step.id} as="div">
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mb-3 font-heading text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">{step.body}</p>
            </MarketingLedgerCell>
          ))}
        </MarketingLedger>
      </div>
    </section>
  );
}
