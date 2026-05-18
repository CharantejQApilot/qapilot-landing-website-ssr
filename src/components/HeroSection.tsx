import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import HomeHeroInteractive from "@/components/HomeHeroInteractive";
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

      <div className="relative z-10 flex w-full flex-col lg:min-h-0 lg:flex-1">
        <div className="section-full flex flex-col px-1 pt-16 sm:px-0 sm:pt-20 md:pt-24 max-lg:pt-[4.5rem] max-lg:sm:pt-24 max-lg:md:pt-28 lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:pt-28 lg:pb-3 2xl:pt-32 2xl:pb-6">
          <div className="mx-auto flex w-full max-w-5xl max-lg:max-w-[36rem] flex-col items-center text-center">
            <HomeHeroInteractive />
          </div>
        </div>

        <HomeHeroTrustMarquee className="mt-1 shrink-0 sm:mt-1.5 lg:mt-auto" />
      </div>
    </section>
  );
}
