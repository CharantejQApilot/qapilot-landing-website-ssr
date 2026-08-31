import { BookDemoLinkButton } from "@/components/book-demo/BookDemoLinkButton";
import { ProductOrbitalVisual } from "@/components/product/ProductOrbitalVisual";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function PlatformOverviewHero() {
  return (
    <section
      className="section-edge relative flex min-h-[calc(100dvh-4.375rem)] w-full flex-col justify-center overflow-x-hidden overflow-y-visible home-canvas lg:h-[calc(100dvh-4.375rem)] lg:overflow-hidden"
      aria-label="Platform overview"
    >
      <MarketingBackground variant="hero" />

      <div className="relative z-10 w-full section-full py-10 sm:py-14 md:py-16 lg:py-24 2xl:py-28">
        <div className="sig-split max-lg:[grid-template-columns:minmax(0,1fr)] min-h-0 items-center gap-8 sm:gap-10 lg:min-h-[70vh] lg:items-stretch lg:gap-14 lg:[grid-template-columns:2fr_3fr] xl:gap-16 2xl:gap-20">
          <div className="order-1 flex flex-col justify-center text-left">
            <h1 className={cn(marketingHeroH1Class, "mb-3 sm:mb-5 md:mb-6")}>
              Built For <span className="text-primary">Release Readiness</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg xl:text-xl 2xl:text-2xl">
              A unified system of capabilities designed to help teams generate coverage, reduce test maintenance,
              detect critical issues, and validate mobile releases with confidence.
            </p>
            <div className="mt-6 sm:mt-8 md:mt-10">
              <BookDemoLinkButton
                size="lg"
                className="rounded-md bg-primary px-8 py-6 text-base font-semibold text-primary-foreground shadow-none hover:bg-primary/90 2xl:px-10 2xl:py-7 2xl:text-lg"
              />
            </div>
          </div>

          <div className="order-2 hidden min-h-0 w-full min-w-0 items-center justify-end self-stretch lg:flex">
            <div className="w-full min-w-0 max-w-none origin-center scale-[0.9] xl:scale-[0.93] 2xl:scale-95">
              <ProductOrbitalVisual desktopContainerClassName="mx-0 ml-auto h-[min(700px,85vh)] w-full max-w-none lg:h-[min(720px,78vh)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
