"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";

export default function HomeHeroInteractive() {
  const { openForm } = useHubSpotForm();

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
        <Button
          type="button"
          onClick={() => openForm()}
          size="lg"
          className={cn(
            "rounded-xl bg-primary font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-shadow",
            "hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20",
            "px-8 py-5 text-base sm:px-10 sm:py-7 sm:text-lg md:text-xl 2xl:px-14 2xl:py-8 2xl:text-xl",
            "max-lg:px-7 max-lg:py-4 max-lg:text-base max-lg:shadow-xl max-lg:shadow-primary/30",
            "max-lg:sm:px-10 max-lg:sm:py-6 max-lg:sm:text-lg max-lg:md:px-12 max-lg:md:py-7 max-lg:md:text-xl",
          )}
        >
          Book a Demo
        </Button>
      </div>
    </>
  );
}
