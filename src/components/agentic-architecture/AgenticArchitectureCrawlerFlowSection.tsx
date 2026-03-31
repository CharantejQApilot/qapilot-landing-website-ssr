import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { cn } from "@/lib/utils";

const STEPS: { title: string; body: string }[] = [
  {
    title: "Interruption Handler Agent",
    body: "Handles popups, permissions, blockers",
  },
  {
    title: "Guidance Agent",
    body: "Identifies the home screen",
  },
  {
    title: "Prioritization Agent",
    body: "Determines which journeys matter",
  },
  {
    title: "Test Data Generator Agent",
    body: "Enables deeper exploration",
  },
  {
    title: "Exploration & Graph Building",
    body: "Builds structured app understanding",
  },
  {
    title: "Test Case Generation",
    body: "Converts journeys into test coverage",
  },
];

function GraphWatermark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 400"
      fill="none"
      aria-hidden
    >
      <g opacity="0.35">
        {[80, 200, 320, 440].map((x, i) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="40"
            x2={x + (i % 2 === 0 ? 60 : -40)}
            y2="360"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
          />
        ))}
        {[100, 180, 260, 340].map((y) => (
          <line
            key={`h-${y}`}
            x1="40"
            y1={y}
            x2="560"
            y2={y}
            stroke="hsl(var(--primary))"
            strokeWidth="0.75"
            opacity={0.5}
          />
        ))}
        {[
          [120, 100],
          [280, 140],
          [420, 200],
          [200, 280],
          [380, 320],
        ].map(([cx, cy], i) => (
          <circle
            key={`n-${i}`}
            cx={cx}
            cy={cy}
            r="10"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            fill="hsl(var(--card))"
          />
        ))}
      </g>
    </svg>
  );
}

export function AgenticArchitectureCrawlerFlowSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="agentic-crawler-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="agentic-crawler-heading"
          title={
            <>
              How <span className="text-primary">Autonomous Exploration</span> Happens
            </>
          }
          description="An ordered flow of specialized agents on top of the knowledge graph — from handling interruptions to generating coverage."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="relative mx-auto max-w-3xl">
          <GraphWatermark className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 opacity-90 md:opacity-100" />

          <ol className="relative z-[1] space-y-0">
            <div
              className="absolute bottom-6 left-[1.125rem] top-6 w-px bg-gradient-to-b from-border via-primary/35 to-primary/55"
              aria-hidden
            />
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative pb-10 pl-12 last:pb-0">
                <div
                  className={cn(
                    "absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-bold text-primary-foreground",
                    "shadow-sm shadow-primary/20",
                  )}
                >
                  {i + 1}
                </div>
                <div
                  className={cn(
                    "rounded-2xl border px-5 py-4 transition-shadow md:px-6 md:py-5",
                    "border-border/80 bg-muted/20 hover:border-primary/25 hover:shadow-md hover:shadow-primary/5",
                  )}
                >
                  <h3 className="font-heading text-base font-semibold text-foreground md:text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
