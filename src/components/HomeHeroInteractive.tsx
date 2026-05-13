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
          "mb-5 text-center sm:mb-6 md:mb-8",
          "max-lg:text-[clamp(1rem,0.8rem+2.4vw,3.45rem)] max-lg:leading-[1.12]",
        )}
      >
        <span className="flex flex-col items-center gap-y-1.5 sm:gap-y-2 md:gap-y-2.5">
          <span className="block whitespace-nowrap px-1 leading-[inherit]">
              When Your App Is <span className="text-hero-here">Mobile-first</span>,
            </span>
            <span className="block whitespace-nowrap px-1 leading-[inherit]">Your Testing Should Be Too.</span>
        </span>
      </h1>

      <p className={cn(marketingHeroLeadClass, "mx-auto max-w-3xl mb-8 text-center sm:mb-10 md:mb-11")}>
        <Link
          href={PATHS.COMPARE_WEB_FIRST}
          className="inline-block text-muted-foreground transition-colors hover:text-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        >
          <span className="font-semibold text-primary underline decoration-primary/55 underline-offset-[0.2em] hover:decoration-primary">
            Your mobile app isn&apos;t a smaller browser screen.
          </span>
        </Link>
      </p>

      <div className="mb-12 sm:mb-14 md:mb-16">
        <Button
          type="button"
          onClick={() => openForm()}
          size="lg"
          className="bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 font-semibold rounded-xl px-8 py-5 text-base sm:px-10 sm:py-7 sm:text-lg md:text-xl 2xl:px-14 2xl:py-8 2xl:text-xl transition-shadow"
        >
          Book a Demo
        </Button>
      </div>
    </>
  );
}
