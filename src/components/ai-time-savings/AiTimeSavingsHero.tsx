import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function AiTimeSavingsHero() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible border-b border-border/60"
      aria-label="AI time savings calculator"
      aria-labelledby="ai-time-savings-hero-title"
    >
      <MarketingBackground
        variant="hero"
        showDiagonalGrid={false}
        showPixelRipple={false}
        progressiveBlur={false}
        className="opacity-60"
      />

      <div className="relative z-10 w-full section-full py-8 sm:py-10 md:py-12">
        <div className="mx-auto flex w-full max-w-[100rem] flex-col items-start text-left">
          <h1
            id="ai-time-savings-hero-title"
            className={cn(marketingHeroH1Class, "w-full max-w-4xl text-balance")}
          >
            See What AI Testing{" "}
            <span className="text-primary">Actually Saves</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
