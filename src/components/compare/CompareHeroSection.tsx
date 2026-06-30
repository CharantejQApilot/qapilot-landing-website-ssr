import type { ReactNode } from "react";
import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingBackground } from "@/components/marketing";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

type CompareHeroSectionProps = {
  heroId: string;
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
};

/** Edge-to-edge compare hero — matches home page hero width and vertical layout. */
export default function CompareHeroSection({
  heroId,
  eyebrow,
  title,
  description,
}: CompareHeroSectionProps) {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible border-b border-border/40 lg:flex lg:min-h-[calc(100dvh-4.375rem)] lg:flex-col"
      aria-labelledby={heroId}
    >
      <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple />

      <div className="relative z-10 flex w-full flex-col lg:min-h-0 lg:flex-1 lg:justify-center">
        <div className="section-full flex flex-col px-1 pt-10 sm:px-0 sm:pt-16 md:pt-20 lg:pt-0 lg:pb-0 2xl:pt-0">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-1 text-center sm:px-0 lg:max-w-7xl 2xl:max-w-[min(100%,88rem)]">
            <div className="w-full min-w-0">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary/90 sm:mb-4">
                {eyebrow}
              </p>
              <h1
                id={heroId}
                className={cn(
                  marketingHeroH1Class,
                  "mb-5 w-full text-balance sm:mb-6 md:mb-8",
                  "max-lg:text-[clamp(1.9rem,7.5vw,4.15rem)] max-lg:leading-[1.08]",
                )}
              >
                {title}
              </h1>
              <p
                className={cn(
                  marketingHeroLeadClass,
                  "mx-auto max-w-3xl text-pretty lg:max-w-4xl xl:max-w-5xl",
                )}
              >
                {description}
              </p>
              <div className="mt-8 flex justify-center sm:mt-10">
                <BookDemoCtaButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
