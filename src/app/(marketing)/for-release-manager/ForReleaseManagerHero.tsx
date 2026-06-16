import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function ForReleaseManagerHero() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible"
      aria-label="Hero"
      aria-labelledby="rm-hero-title"
    >
      <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple progressiveBlur={false} />

      <div className="relative z-10 w-full section-full py-16 sm:py-20 md:py-24 lg:py-28 2xl:py-32">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-3 text-center sm:px-4 lg:max-w-7xl 2xl:max-w-[90rem]">
          <h1
            id="rm-hero-title"
            className={cn(
              marketingHeroH1Class,
              "mb-5 w-full text-balance sm:mb-6 md:mb-8",
              "max-lg:text-[clamp(1.35rem,0.95rem+2.4vw,3.45rem)] max-lg:leading-[1.12]",
            )}
          >
            Release Confidence for{" "}
            <span className="text-primary">Release Managers</span>
          </h1>

          <p
            className={cn(
              marketingHeroLeadClass,
              "mx-auto mb-8 max-w-3xl text-balance font-medium text-foreground/90 sm:mb-10 md:mb-11 lg:max-w-4xl",
            )}
          >
            Ship faster with clearer go / no-go decisions.
          </p>

          <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground text-balance sm:mb-11 sm:text-lg md:max-w-4xl md:text-xl md:leading-relaxed">
            QApilot helps Release Managers reduce uncertainty before mobile launches through faster validation, clearer
            quality signals, and scalable release readiness testing.
          </p>

          <div className="mb-2 sm:mb-4">
            <BookDemoCtaButton>Book Demo</BookDemoCtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
