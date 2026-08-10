import { BadgeCheck, Footprints, RefreshCw, Zap } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    title: "Step Fails → QApilot Re-Identifies Element",
    Icon: RefreshCw,
  },
  {
    title: "Fallback Kicks In Automatically",
    Icon: Zap,
  },
  {
    title: "Step Continues Execution",
    Icon: Footprints,
  },
  {
    title: "Marked As “AI Assisted”",
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

        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className={cn(
                "flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm md:p-6",
              )}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <step.Icon
                  className="h-5 w-5 shrink-0 text-primary"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>
              <span className="text-base font-medium leading-snug text-foreground md:text-lg">
                {step.title}
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-2xl text-left text-sm text-muted-foreground md:text-base">
          Healed steps are flagged in execution logs so you always know what the
          engine touched.
        </p>
      </div>
    </section>
  );
}
