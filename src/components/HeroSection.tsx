import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import HomeHeroContent from "@/components/HomeHeroContent";
import { HomeHeroTrustMarquee } from "@/components/HomeHeroTrustMarquee";

const heroContentShellClass =
  "mx-auto flex w-full min-w-0 max-w-6xl flex-col items-center lg:max-w-7xl lg:items-stretch 2xl:max-w-[min(100%,88rem)]";

/**
 * S01 thesis hero + S02 trust rail.
 * Product Hunt badge lives in a top band (inside HomeHeroExploreStage) outside
 * slide centering so it is never clipped by overflow or short viewports.
 */
export default function HeroSection() {
  return (
    <section
      className="hero-prominent relative section-edge flex w-full flex-col overflow-x-clip lg:min-h-[calc(100dvh-4.375rem)]"
      aria-label="Hero"
    >
      <MarketingBackground
        variant="hero"
        showDiagonalGrid={false}
        showPixelRipple
        progressiveBlur={false}
      />

      <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col">
        <div className="section-full flex min-h-0 flex-1 flex-col pt-5 sm:pt-6 md:pt-8 lg:pt-6">
          <div className={`${heroContentShellClass} min-h-0 flex-1`}>
            <HomeHeroContent />
          </div>
        </div>

        <div
          data-home-hero-trust
          className="sig-trust mt-8 shrink-0 border-border sm:mt-10 md:mt-12 lg:mt-10 xl:mt-12"
        >
          <div className="section-full w-full pb-6 sm:pb-8">
            <HomeHeroTrustMarquee
              layout="contained"
              title="Trusted by industry leaders"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
