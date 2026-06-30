import Link from "next/link";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";
import HomeHeroDemoButton from "@/components/HomeHeroDemoButton";
import HomeHeroLabsPromo from "@/components/home-hero/HomeHeroLabsPromo";
import HomeHeroProductHuntBadge from "@/components/home-hero/HomeHeroProductHuntBadge";

/** Server-rendered hero copy; only the demo button hydrates on the client. */
export default function HomeHeroContent() {
  return (
    <>
      <div className="relative w-full min-w-0 sm:pt-[4.75rem]">
        <HomeHeroProductHuntBadge />
        <h1
          className={cn(
            marketingHeroH1Class,
            "mb-8 w-full text-center text-balance sm:mb-14 md:mb-16",
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
      </div>

      <div
        className={cn(
          "grid w-full grid-cols-1 gap-8 border-t border-border/50 pt-8 sm:gap-10 sm:pt-10 md:pt-12",
          "lg:grid-cols-2 lg:items-start lg:gap-x-12 lg:pt-14 xl:gap-x-16 2xl:gap-x-20",
        )}
      >
        <div className="flex flex-col items-center gap-6 text-center sm:gap-8 lg:items-start lg:text-left lg:pr-4 xl:pr-6">
          <p className={cn(marketingHeroLeadClass, "max-w-md text-balance lg:max-w-none")}>
            <Link
              href={PATHS.COMPARE_WEB_FIRST}
              className="inline-block text-muted-foreground transition-colors hover:text-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              <span className="font-semibold text-primary underline decoration-primary/55 underline-offset-[0.2em] hover:decoration-primary">
                Your mobile app isn&apos;t a smaller browser screen.
              </span>
            </Link>
          </p>
          <HomeHeroDemoButton />
        </div>

        <div
          className={cn(
            "flex flex-col items-center gap-6 text-center sm:gap-8",
            "border-t border-border/50 pt-8 sm:pt-10",
            "lg:items-start lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0 lg:text-left xl:pl-6",
          )}
        >
          <HomeHeroLabsPromo />
        </div>
      </div>
    </>
  );
}
