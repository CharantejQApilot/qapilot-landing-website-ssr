import HomeHeroDemoButton from "@/components/HomeHeroDemoButton";
import HomeHeroExploreStage from "@/components/home-hero/HomeHeroExploreStage";
import HomeHeroLandingPanel from "@/components/home-hero/HomeHeroLandingPanel";

/** Server-rendered hero shell; slide 1 panel + stage are client for layout measurement. */
export default function HomeHeroContent() {
  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col items-stretch">
      <HomeHeroExploreStage>
        <HomeHeroLandingPanel />
      </HomeHeroExploreStage>

      <div className="sig-cta-row mt-6 w-full shrink-0 justify-start sm:mt-8 md:mt-8">
        <HomeHeroDemoButton />
      </div>
    </div>
  );
}
