import HomeHeroContent from "@/components/HomeHeroContent";
import { HomeHeroTrustMarquee } from "@/components/HomeHeroTrustMarquee";
import { HomeHeroAtmosphere } from "@/components/home/HomeHeroAtmosphere";
import { HomeSeam } from "@/components/home/HomeSeam";

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
      className="hero-prominent relative section-edge flex w-full flex-col overflow-x-clip home-canvas lg:min-h-[calc(100dvh-4.375rem)]"
      aria-label="Hero"
    >
      <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col">
        <div className="relative flex min-h-0 flex-1 flex-col">
          <HomeHeroAtmosphere />
          <div className="section-full relative z-[1] flex min-h-0 flex-1 flex-col pt-5 sm:pt-6 md:pt-8 lg:pt-6 pb-8 sm:pb-10 md:pb-12">
            <div className={`${heroContentShellClass} min-h-0 flex-1`}>
              <HomeHeroContent />
            </div>
          </div>
        </div>

        <div
          data-home-hero-trust
          className="relative shrink-0 overflow-hidden home-ice"
        >
          <div
            className="pointer-events-none absolute inset-0 home-ice-grid"
            aria-hidden
          />
          <HomeSeam />
          <div className="relative z-[1] section-full w-full py-8 sm:py-9 md:py-10">
            <HomeHeroTrustMarquee
              layout="contained"
              title="Trusted by industry leaders"
              edgeFade="ice"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
