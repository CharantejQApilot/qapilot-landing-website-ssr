import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { marketingSectionIntroClass } from "@/lib/marketing-typography";

const OUTCOMES = [
  "Critical tests get prioritized",
  "Some tests are postponed",
  "Others never get executed",
] as const;

export function CoWorkCoverageProblemSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-dot-pattern-subtle"
      aria-labelledby="cowork-coverage-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="cowork-coverage-heading"
          title={
            <>
              Coverage Falls <span className="text-primary">Behind</span>
            </>
          }
          marginBottomClassName="mb-8 md:mb-10 2xl:mb-12"
        />

        <div className="mb-10 space-y-4 md:mb-12 2xl:mb-14">
          <p className={marketingSectionIntroClass}>
            Every release adds more tests. Not more time. Features ship. User journeys grow. Edge cases
            multiply. But execution capacity stays the same.
          </p>
          <p className="text-base font-medium leading-relaxed text-foreground md:text-lg">
            Coverage gradually falls behind the application.
          </p>
        </div>

        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground md:mb-8">
          As a result
        </p>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {OUTCOMES.map((item) => (
            <div
              key={item}
              className="group relative overflow-hidden rounded-2xl border border-border/80 bg-muted/20 p-5 shadow-sm sm:p-6 md:p-8"
            >
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
              <p className="font-heading text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
