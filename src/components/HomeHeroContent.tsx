import HomeHeroDemoButton from "@/components/HomeHeroDemoButton";
import HomeHeroExploreStage from "@/components/home-hero/HomeHeroExploreStage";
import HomeHeroLandingPanel from "@/components/home-hero/HomeHeroLandingPanel";
import { HomeHeroCta } from "@/lib/home-hero-cta";
import { PATHS } from "@/lib/routes";

/** Server-rendered hero shell; slide 1 panel + stage are client for layout measurement. */
export default function HomeHeroContent() {
  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col items-stretch justify-center">
      {/* Positioning box for the slide 1 quote card and the slide 2 terminal. */}
      <div className="relative flex w-full flex-col">
        <HomeHeroExploreStage>
          <HomeHeroLandingPanel />
        </HomeHeroExploreStage>

        <div className="mt-8 grid w-fit max-w-full shrink-0 grid-cols-1 gap-3 self-start sm:grid-cols-2 lg:mt-10">
          <HomeHeroDemoButton className="w-full" />
          <HomeHeroCta
            href={`${PATHS.MCP_GUIDE}#install`}
            variant="inverse"
            className="w-full"
          >
            Install QApilot MCP
          </HomeHeroCta>
        </div>
      </div>
    </div>
  );
}
