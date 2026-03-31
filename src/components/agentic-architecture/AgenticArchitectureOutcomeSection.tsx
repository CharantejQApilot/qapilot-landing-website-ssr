import { Check } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const OUTCOMES = [
  "Continuous coverage generation",
  "Reduced dependency on manual scripts",
  "Smarter test execution",
  "Better issue understanding",
  "Faster release cycles",
] as const;

export function AgenticArchitectureOutcomeSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="agentic-outcomes-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="agentic-outcomes-heading"
          title={
            <>
              What This <span className="text-primary">Enables</span>
            </>
          }
          marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
        />

        <ul className="mx-auto grid max-w-3xl gap-4">
          {OUTCOMES.map((line) => (
            <li
              key={line}
              className="flex items-center gap-4 rounded-2xl border border-border/80 bg-muted/15 px-5 py-4 md:px-7 md:py-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Check className="h-5 w-5" strokeWidth={2.5} aria-hidden />
              </span>
              <span className="text-base font-medium text-foreground md:text-lg">{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
