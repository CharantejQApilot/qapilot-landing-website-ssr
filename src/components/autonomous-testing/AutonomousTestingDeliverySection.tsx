import type { ReactNode } from "react";
import { AutonomousTestingWalkthroughVideo } from "@/components/autonomous-testing/AutonomousTestingWalkthroughVideo";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { cn } from "@/lib/utils";

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

        <div className="relative">
          {/* Flow spine — desktop */}
          <div
            className="pointer-events-none absolute left-[10%] right-[10%] top-[42%] hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-border/70 to-transparent xl:block"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-[18%] left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-border/50 via-primary/20 to-transparent xl:block xl:h-[38%]"
            aria-hidden
          />

          <ol className="grid gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-5 xl:gap-4 2xl:gap-5">
            {STEPS.map((step, i) => (
              <li
                key={step.id}
                className={cn("relative", i % 2 === 1 ? "xl:mt-12" : "xl:mt-0")}
              >
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-2xl border border-border/80 bg-muted/15 p-5 transition-shadow duration-500 md:p-6",
                    "hover:border-primary/25 hover:shadow-md hover:shadow-primary/5",
                    "animate-fade-in [animation-fill-mode:both]",
                  )}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="hidden h-2 w-2 shrink-0 rounded-full bg-primary/50 shadow-[0_0_12px_hsl(var(--primary)/0.45)] xl:block"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mb-3 font-heading text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">{step.body}</p>
                </div>
                {i < STEPS.length - 1 ? (
                  <div
                    className="mx-auto my-2 flex h-8 w-px bg-gradient-to-b from-primary/30 to-border/60 xl:hidden"
                    aria-hidden
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
