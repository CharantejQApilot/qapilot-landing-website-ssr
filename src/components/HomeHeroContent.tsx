import Link from "next/link";
import HomeHeroDemoButton from "@/components/HomeHeroDemoButton";
import HomeHeroExploreStage from "@/components/home-hero/HomeHeroExploreStage";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";

function HomeHeroLandingPanel() {
  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      <h1
        className={cn(
          marketingHeroH1Class,
          "mb-6 w-full text-center text-balance sm:mb-8 md:mb-10",
          "max-lg:text-[clamp(1.9rem,7.5vw,4.15rem)] max-lg:leading-[1.08]",
        )}
      >
        <span className="flex flex-col items-center gap-y-1.5 sm:gap-y-2.5 md:gap-y-3">
          <span className="block px-1 leading-[inherit] sm:whitespace-nowrap">
            When Your App Is <span className="text-hero-here">Mobile-first</span>,{" "}
          </span>
          <span className="block px-1 leading-[inherit] sm:whitespace-nowrap">
            Your Testing Should Be Too.
          </span>
        </span>
      </h1>

      <p
        className={cn(
          marketingHeroLeadClass,
          "max-w-xl text-center text-balance",
        )}
      >
        <Link
          href={PATHS.COMPARE_WEB_FIRST}
          className="inline-block rounded-sm text-muted-foreground transition-colors hover:text-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="font-semibold text-primary underline decoration-primary/55 underline-offset-[0.2em] hover:decoration-primary">
            Your mobile app isn&apos;t a smaller browser screen.
          </span>
        </Link>
      </p>
    </div>
  );
}

/** Server-rendered hero copy + client explore stage; demo CTA stays pinned below. */
export default function HomeHeroContent() {
  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      <HomeHeroExploreStage>
        <HomeHeroLandingPanel />
      </HomeHeroExploreStage>

      <div className="mt-8 flex w-full flex-col items-center sm:mt-10 md:mt-12">
        <HomeHeroDemoButton />
      </div>
    </div>
  );
}
