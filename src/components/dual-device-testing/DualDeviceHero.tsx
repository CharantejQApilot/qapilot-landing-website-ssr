import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { DualDeviceHeroVisual } from "@/components/dual-device-testing/DualDeviceHeroVisual";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function DualDeviceHero() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-clip"
      aria-labelledby="dual-device-hero-title"
    >
      <MarketingBackground
        variant="hero"
        showDiagonalGrid={false}
        showPixelRipple
        progressiveBlur={false}
      />

      <div className="relative z-10 w-full section-full py-14 sm:py-16 md:py-20 lg:py-24">
        <div
          className={cn(
            "mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-12 sm:gap-14",
            "lg:flex-row lg:items-center lg:gap-x-12 xl:gap-x-16",
            "2xl:max-w-[min(100%,88rem)]",
          )}
        >
          <div className="flex min-w-0 flex-1 flex-col items-start text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:mb-4 sm:text-sm">
              Synchronised across two devices
            </p>
            <h1
              id="dual-device-hero-title"
              className={cn(
                marketingHeroH1Class,
                "mb-5 w-full text-balance sm:mb-6 md:mb-8",
                "max-lg:text-[clamp(1.85rem,6.5vw,3.75rem)] max-lg:leading-[1.08]",
              )}
            >
              Dual Device <span className="text-hero-here">Testing</span>
            </h1>
            <p
              className={cn(
                marketingHeroLeadClass,
                "max-w-xl text-pretty max-lg:text-base max-lg:sm:text-lg",
              )}
            >
              Real journeys span two devices. QApilot runs both sides as one continuous transaction.
            </p>
            <div className="sig-cta-row mt-8 w-full justify-start sm:mt-10">
              <BookDemoCtaButton />
            </div>
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-end lg:flex">
            <DualDeviceHeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
