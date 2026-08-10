import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import HomeHeroContent from "@/components/HomeHeroContent";
import { HomeHeroTrustMarquee } from "@/components/HomeHeroTrustMarquee";
import HomeHeroProductHuntBadge from "@/components/home-hero/HomeHeroProductHuntBadge";

const heroContentShellClass =
  "mx-auto flex w-full min-w-0 max-w-6xl flex-col items-center lg:max-w-7xl lg:items-stretch 2xl:max-w-[min(100%,88rem)]";

/** S01 thesis hero + S02 trust rail (flush). */
export default function HeroSection() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-clip lg:flex lg:min-h-[calc(100dvh-4.375rem)] lg:flex-col"
      aria-label="Hero"
    >
      <MarketingBackground
        variant="hero"
        showDiagonalGrid={false}
        showPixelRipple
        progressiveBlur={false}
      />

      <div className="relative z-10 flex w-full min-h-0 flex-1 flex-col">
        {/* Badge band — outside flex centering so it is never clipped on short viewports */}
        <div className="section-full shrink-0 pt-6 sm:pt-8 md:pt-10 lg:pt-10">
          <div className={heroContentShellClass}>
            <HomeHeroProductHuntBadge className="mb-3 sm:mb-4 lg:self-start" />
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col lg:justify-center">
          <div className="section-full flex flex-col">
            <div className={heroContentShellClass}>
              <HomeHeroContent />
            </div>
          </div>

          <div className="sig-trust mt-8 shrink-0 border-border sm:mt-10 md:mt-12 lg:mt-14">
            <div className="section-full w-full">
              <HomeHeroTrustMarquee
                layout="contained"
                title="Trusted by industry leaders"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
