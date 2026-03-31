import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { marketingSectionIntroClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const BULLETS = [
  "independent, specialized agents",
  "shared context",
  "continuous learning",
] as const;

export function AgenticArchitectureWhyMattersSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="agentic-why-matters-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="agentic-why-matters-heading"
          title={
            <>
              Testing Systems Are <span className="text-primary">Evolving</span>
            </>
          }
          marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
        />

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-10 xl:max-w-7xl xl:gap-14 2xl:gap-16">
          <div
            className={cn(
              "mx-auto min-w-0 w-full max-w-xl space-y-4 xl:max-w-2xl",
              marketingSectionIntroClass,
            )}
          >
            <p>
              Traditional automation relies on scripts. AI-assisted tools improve creation and maintenance.
            </p>
            <p className="font-medium text-foreground">But neither fundamentally changes how testing works.</p>
            <p className="text-lg font-semibold text-primary md:text-xl">Agentic systems do.</p>
          </div>

          <div className="mx-auto min-w-0 w-full max-w-xl rounded-2xl border border-border/80 bg-muted/15 px-5 py-6 text-left md:px-8 md:py-8 xl:max-w-lg xl:px-9 xl:py-9">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              They introduce:
            </p>
            <ul className="space-y-3">
              {BULLETS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-foreground md:text-lg">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
