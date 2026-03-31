import { BadgeCheck, Footprints, RefreshCw, Zap } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const STEPS = [
  {
    title: "Step fails → QApilot re-identifies element",
    Icon: RefreshCw,
  },
  {
    title: "Fallback kicks in automatically",
    Icon: Zap,
  },
  {
    title: "Step continues execution",
    Icon: Footprints,
  },
  {
    title: "Marked as “AI Assisted”",
    Icon: BadgeCheck,
  },
] as const;

export function AiSelfHealingExecutionSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="ash-exec-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="ash-exec-heading"
          title={
            <>
              Healed in <span className="text-primary">Real Time</span>
            </>
          }
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <ol className="mx-auto max-w-3xl space-y-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm md:p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {i + 1}
              </span>
              <div className="flex min-w-0 flex-1 items-start gap-3 pt-0.5">
                <step.Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} aria-hidden />
                <span className="text-base font-medium leading-relaxed text-foreground md:text-lg">{step.title}</span>
              </div>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground md:text-base">
          Healed steps are flagged in execution logs so you always know what the engine touched.
        </p>
      </div>
    </section>
  );
}
