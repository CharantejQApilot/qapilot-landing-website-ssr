import Link from "next/link";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";
import HomeHeroDemoButton from "@/components/HomeHeroDemoButton";

/** Server-rendered hero copy; only the demo button hydrates on the client. */
export default function HomeHeroContent() {
  return (
    <>
      <h1
        className={cn(
          marketingHeroH1Class,
          "mb-8 text-center text-balance sm:mb-14 md:mb-16",
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
          "mx-auto mb-10 max-w-[22rem] text-center text-balance sm:mb-16 sm:max-w-3xl md:mb-20",
          "max-lg:text-base max-lg:leading-relaxed max-lg:sm:text-xl max-lg:md:text-[1.875rem]",
        )}
      >
        <Link
          href={PATHS.COMPARE_WEB_FIRST}
          className="inline-block text-muted-foreground transition-colors hover:text-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        >
          <span className="font-semibold text-primary underline decoration-primary/55 underline-offset-[0.2em] hover:decoration-primary">
            Your mobile app isn&apos;t a smaller browser screen.
          </span>
        </Link>
      </p>

      <div className="mb-0">
        <HomeHeroDemoButton />
      </div>
    </>
  );
}
