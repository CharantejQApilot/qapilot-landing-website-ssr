import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import HomeHeroContent from "@/components/HomeHeroContent";
import { HomeHeroTrustMarquee } from "@/components/HomeHeroTrustMarquee";

export default function HeroSection() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible lg:flex lg:min-h-[calc(100dvh-4.375rem)] lg:flex-col"
      aria-label="Hero"
    >
      <MarketingBackground
        variant="hero"
        showDiagonalGrid={false}
        showPixelRipple
        progressiveBlur={false}
      />

      <div className="relative z-10 flex w-full flex-col lg:min-h-0 lg:flex-1 lg:justify-center">
        <div className="section-full flex flex-col px-1 pt-10 sm:px-0 sm:pt-16 md:pt-20 lg:pt-0 lg:pb-0 2xl:pt-0">
          <div className="mx-auto flex w-full max-w-5xl max-lg:max-w-[36rem] flex-col items-center text-center">
            <HomeHeroContent />
          </div>
        </div>

        <HomeHeroTrustMarquee className="mt-10 shrink-0 sm:mt-14 md:mt-16 lg:mt-20 xl:mt-20 2xl:mt-24" />
      </div>
    </section>
  );
}
