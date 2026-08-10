import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function DeviceCoverageMatrixHero() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible border-b border-border/60"
      aria-label="Device coverage matrix"
      aria-labelledby="device-coverage-hero-title"
    >
      <MarketingBackground
        variant="hero"
        showDiagonalGrid={false}
        showPixelRipple={false}
        progressiveBlur={false}
        className="opacity-60"
      />

      <div className="relative z-10 w-full section-full py-8 sm:py-10 md:py-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start px-3 text-left sm:px-4 lg:max-w-7xl">
          <h1
            id="device-coverage-hero-title"
            className={cn(marketingHeroH1Class, "w-full text-balance")}
          >
            Know Which Devices To Test{" "}
            <span className="text-primary">Before Every Release</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
