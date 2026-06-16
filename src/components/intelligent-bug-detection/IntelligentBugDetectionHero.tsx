import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function IntelligentBugDetectionHero() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible"
      aria-label="Intelligent bug detection for mobile"
    >
      <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple />

      <div className="relative z-10 w-full section-full py-16 sm:py-20 md:py-24 lg:py-28 2xl:py-32">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-3 text-center sm:px-4 lg:max-w-7xl 2xl:max-w-[90rem]">
          <h1 className={cn(marketingHeroH1Class, "mb-5 w-full sm:mb-6 md:mb-8 text-balance")}>
            <span className="text-primary">Intelligent Bug Detection</span> for
            <br className="hidden lg:block" aria-hidden="true" />{" "}
            Mobile Applications
          </h1>

          <p className={cn(marketingHeroLeadClass, "mx-auto mb-8 max-w-3xl text-balance sm:mb-10 md:mb-11 lg:max-w-4xl")}>
            Go beyond pass or fail. QApilot detects accessibility issues, action latency, and page load failures during
            execution — mapping every issue to the exact screen, interaction, and context where it occurs.
          </p>

          <div className="mb-2 sm:mb-4">
            <BookDemoCtaButton />
          </div>
        </div>
      </div>
    </section>
  );
}
