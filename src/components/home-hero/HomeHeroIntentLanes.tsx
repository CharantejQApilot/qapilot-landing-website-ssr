import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HOME_HERO_EXPLORE_INTENTS } from "@/lib/home-hero-explore";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

type HomeHeroIntentLanesProps = {
  /** When true, play staggered entrance (Panel 2 just became active). */
  animateIn?: boolean;
  className?: string;
};

export default function HomeHeroIntentLanes({
  animateIn = false,
  className,
}: HomeHeroIntentLanesProps) {
  return (
    <div
      className={cn(
        "grid w-full min-w-0 grid-cols-1 gap-8 sm:gap-10",
        "lg:grid-cols-[3fr_2fr] lg:items-stretch lg:gap-x-6 lg:gap-y-0 xl:gap-x-8 2xl:gap-x-10",
        className,
      )}
    >
      <h2
        id="home-hero-explore-prompt"
        className={cn(
          marketingHeroH1Class,
          "mb-0 w-full self-center text-balance text-center lg:text-left",
          "max-lg:text-[clamp(1.9rem,7.5vw,4.15rem)] max-lg:leading-[1.08]",
        )}
      >
        <span className="flex flex-col items-center gap-y-1.5 sm:gap-y-2.5 md:gap-y-3 lg:items-start">
          <span className="block px-1 leading-[inherit]">Your Essentials</span>
          <span className="block px-1 leading-[inherit]">
            For <span className="text-hero-here">Confident</span>
          </span>
          <span className="block px-1 leading-[inherit]">Mobile Releases</span>
        </span>
      </h2>

      <ul
        className="flex h-full w-full list-none flex-col lg:border-l lg:border-border/50 lg:pl-6 xl:pl-8"
        aria-labelledby="home-hero-explore-prompt"
      >
        {HOME_HERO_EXPLORE_INTENTS.map((item, index) => (
          <li
            key={item.href}
            className={cn(
              "flex min-h-0 flex-1 border-border/50",
              index === 0 ? "border-t" : null,
              "border-b",
              animateIn && "motion-safe:animate-home-hero-lane-in",
              animateIn && "motion-reduce:animate-none",
            )}
            style={animateIn ? { animationDelay: `${index * 90}ms` } : undefined}
          >
            <Link
              href={item.href}
              className={cn(
                "group flex h-full w-full items-center gap-4 py-3 text-left sm:gap-5 sm:py-4",
                "transition-colors duration-200",
                "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "relative flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-primary/35 transition-[border-color,background-color,box-shadow] duration-200 sm:size-7",
                  "group-hover:border-primary group-hover:bg-primary group-hover:shadow-sm group-hover:shadow-primary/20",
                  "group-focus-visible:border-primary group-focus-visible:bg-primary",
                )}
              >
                <span className="size-1.5 rounded-full bg-primary/40 transition-colors duration-200 group-hover:bg-primary-foreground group-focus-visible:bg-primary-foreground sm:size-2" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="font-heading block text-base font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary sm:text-lg md:text-xl">
                  {item.intent}
                </span>
                <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.payoff}
                </span>
              </span>

              <ArrowUpRight
                aria-hidden
                className="size-5 shrink-0 text-primary/40 transition-[opacity,transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:size-6"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
