import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const STEPS = [
  {
    n: "1",
    title: "Select Plans & Devices",
    body: "Choose the workflow running on each device: buyer and seller, sender and receiver, agent and supervisor.",
  },
  {
    n: "2",
    title: "Configure Dependencies",
    body: "Define where one plan waits for or triggers the other at exact steps, never brittle fixed timers.",
  },
  {
    n: "3",
    title: "Launch & Review",
    body: "Execute both plans as one synchronized workflow. See the handoff, the outcome, and clear failure attribution.",
  },
] as const;

const FLOW = [
  { device: "Device A", lines: ["Open transfer", "Enter amount", "Submit & trigger", "Await result"] },
  { device: "QApilot", lines: ["Synchronization engine", "trigger →", "← result ✓", "release →"] },
  { device: "Device B", lines: ["Wait for trigger", "Receive request", "Approve", "Confirm & return"] },
] as const;

/** Orchestration story: handoff + three-step setup. */
export function DualDeviceHowItWorksSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/10 via-background to-background"
      aria-labelledby="ddt-how-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="ddt-how-heading"
          title={
            <>
              Coordinate the Handoff. <span className="text-primary">Validate the Outcome.</span>
            </>
          }
          description="Device A submits and waits · QApilot releases the trigger · Device B approves and confirms as one orchestrated run."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {FLOW.map((col) => (
            <div
              key={col.device}
              className="rounded-2xl border border-border/70 bg-card/90 p-5 shadow-sm md:p-6"
            >
              <p
                className={
                  col.device === "QApilot"
                    ? "text-xs font-semibold uppercase tracking-[0.16em] text-primary"
                    : "text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                }
              >
                {col.device}
              </p>
              <ol className="mt-4 space-y-2.5">
                {col.lines.map((line, i) => (
                  <li key={line} className="flex gap-2.5 text-sm leading-snug text-foreground md:text-base">
                    <span className="shrink-0 font-semibold text-primary/70">{i + 1}.</span>
                    <span className={col.device === "QApilot" ? "font-medium text-primary" : undefined}>
                      {line}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <ol className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3 xl:gap-5">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-background/80 p-5 md:p-6"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {step.n}
              </span>
              <h3 className="font-heading text-lg font-semibold text-foreground md:text-xl">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
