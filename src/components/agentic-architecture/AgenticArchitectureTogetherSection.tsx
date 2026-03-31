import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { marketingSectionIntroClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const ENABLERS = [
  "autonomous test generation",
  "adaptive execution",
  "meaningful issue detection",
] as const;

export function AgenticArchitectureTogetherSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="agentic-together-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="agentic-together-heading"
          title={
            <>
              From Architecture to <span className="text-primary">Outcomes</span>
            </>
          }
          marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
        />

        <div className={cn("mx-auto max-w-3xl space-y-8", marketingSectionIntroClass)}>
          <p>The combination of:</p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {["agents", "shared context", "continuous learning"].map((item) => (
              <li
                key={item}
                className="rounded-xl border border-primary/25 bg-primary/[0.06] px-4 py-3 text-center text-sm font-semibold capitalize text-foreground md:text-base"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="font-medium text-foreground">enables:</p>
          <ul className="space-y-3">
            {ENABLERS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-foreground md:text-lg">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
