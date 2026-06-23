import { getMobileAgentsLabsTool } from "@/lib/mobile-agents-labs-tools";
import { HomeHeroCta } from "@/lib/home-hero-cta";
import { marketingHeroLeadClass } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";

const deviceCoverageTool = getMobileAgentsLabsTool(PATHS.DEVICE_COVERAGE_MATRIX);

/** Right column of the home hero split — device coverage matrix CTA. */
export default function HomeHeroLabsPromo() {
  if (!deviceCoverageTool) return null;

  return (
    <>
      <p className={cn(marketingHeroLeadClass, "max-w-md text-balance lg:max-w-none")}>
        Not sure which devices you should cover{" "}
        <span className="font-semibold text-foreground">before every release</span>?
      </p>

      <HomeHeroCta href={deviceCoverageTool.href} variant="inverse">
        {deviceCoverageTool.name}
      </HomeHeroCta>
    </>
  );
}
