import type { ReactNode } from "react";
import { Fragment } from "react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { cn } from "@/lib/utils";

type EvolutionStage = {
  id: string;
  label: ReactNode;
  description: string;
  emphasis?: boolean;
};

const STAGES: EvolutionStage[] = [
  {
    id: "script",
    label: <span className="text-primary">Script</span>,
    description: "Tests are written manually and tightly coupled to UI.",
  },
  {
    id: "record",
    label: (
      <>
        <span className="text-primary">Record</span> &{" "}
        <span className="text-primary">Playback</span>
      </>
    ),
    description: "Faster to create, but still brittle and difficult to scale.",
  },
  {
    id: "ai-assisted",
    label: (
      <>
        <span className="text-primary">AI-Assisted</span>
      </>
    ),
    description:
      "Improves creation and maintenance, but still depends on predefined flows.",
  },
  {
    id: "autonomous",
    label: <span className="text-primary">Autonomous</span>,
    description:
      "Coverage is discovered, generated, executed, and maintained by the system.",
    emphasis: true,
  },
];

export function AutonomousTestingEvolutionSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="autonomous-evolution-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="autonomous-evolution-heading"
          title={
            <>
              The <span className="text-primary">Evolution</span> of{" "}
              <span className="text-primary">Test Automation</span>
            </>
          }
          description="Test automation has moved from manual scripting to system-driven testing. Each step improved speed or usability, but only autonomous testing changes how coverage is created and maintained."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="relative">
          {/* Desktop / tablet: horizontal band */}
          <div className="hidden md:flex md:items-stretch">
            {STAGES.map((stage, i) => (
              <Fragment key={stage.id}>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div
                    className={cn(
                      "flex h-full flex-col rounded-2xl border px-4 py-6 transition-shadow lg:px-5 lg:py-8",
                      stage.emphasis
                        ? "border-primary/40 bg-gradient-to-b from-primary/10 via-primary/[0.06] to-background shadow-md shadow-primary/10 ring-1 ring-primary/20"
                        : "border-border/80 bg-muted/20",
                    )}
                  >
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="font-heading text-sm font-semibold tracking-tight text-foreground lg:text-base">
                        {stage.label}
                      </span>
                      {stage.emphasis ? (
                        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                          QApilot
                        </span>
                      ) : null}
                    </div>
                    <p
                      className={cn(
                        "text-sm leading-relaxed lg:text-[0.9375rem]",
                        stage.emphasis
                          ? "text-foreground/90"
                          : "text-muted-foreground",
                      )}
                    >
                      {stage.description}
                    </p>
                  </div>
                </div>
                {i < STAGES.length - 1 ? (
                  <div
                    className="relative flex w-4 shrink-0 items-center sm:w-5 lg:w-6"
                    aria-hidden
                  >
                    <div className="h-px w-full bg-gradient-to-r from-border/40 via-primary/35 to-border/40" />
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>

          {/* Mobile: vertical progression */}
          <ol className="relative space-y-0 md:hidden">
            <div
              className="absolute bottom-4 left-[0.65rem] top-4 w-px bg-gradient-to-b from-border via-primary/25 to-primary/50"
              aria-hidden
            />
            {STAGES.map((stage) => (
              <li key={stage.id} className="relative pl-10 pb-8 last:pb-0">
                <span
                  className={cn(
                    "absolute left-0 top-1.5 flex h-[13px] w-[13px] rounded-full border-2 border-background",
                    stage.emphasis
                      ? "bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.2)]"
                      : "bg-muted-foreground/35",
                  )}
                  aria-hidden
                />
                <div
                  className={cn(
                    "rounded-2xl border px-4 py-5",
                    stage.emphasis
                      ? "border-primary/35 bg-gradient-to-br from-primary/10 to-background ring-1 ring-primary/15"
                      : "border-border/80 bg-muted/15",
                  )}
                >
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="font-heading text-base font-semibold text-foreground">
                      {stage.label}
                    </span>
                    {stage.emphasis ? (
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        QApilot
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {stage.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-12 w-full text-left text-base leading-relaxed text-foreground/90 md:mt-14 md:text-lg 2xl:text-xl">
          QApilot operates in the autonomous layer. Where testing is no longer
          manually defined, but continuously discovered, generated, and
          maintained by the system.
        </p>
      </div>
    </section>
  );
}
