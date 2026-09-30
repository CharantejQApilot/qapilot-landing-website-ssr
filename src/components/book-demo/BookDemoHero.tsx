import { BookDemoLeadForm } from "@/components/book-demo/BookDemoLeadForm";
import {
  BookDemoWioCaseStudy,
  BookDemoWioQuote,
} from "@/components/book-demo/BookDemoWioCaseStudy";
import { HomeEyebrow } from "@/components/home/HomeEyebrow";
import HomeHeroProductHuntBadge from "@/components/home-hero/HomeHeroProductHuntBadge";
import { BOOK_DEMO_FORM_ID } from "@/lib/book-demo";
import { BOOK_DEMO_HERO } from "@/lib/book-demo-what-to-expect";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import {
  marketingFormIntroClass,
  marketingFormTitleClass,
  marketingHeroFormCardClass,
  marketingHeroFormInnerClass,
} from "@/lib/forms/marketing-form-classes";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const bookDemoShellClass = cn(
  "mx-auto w-full max-w-7xl min-w-0",
  "lg:max-w-none 2xl:mx-auto 2xl:max-w-[min(100%,88rem)]",
);

export function BookDemoHero() {
  return (
    <section
      className={cn(
        "hero-prominent relative section-edge w-full overflow-x-clip home-canvas",
        "lg:flex lg:min-h-[calc(100dvh-4.375rem)] lg:flex-col",
      )}
      aria-label="Book A Demo"
    >
      <MarketingBackground variant="hero" />

      <div className="relative z-10 flex w-full min-h-0 flex-1 flex-col">
        <div className="section-full shrink-0 pt-10 sm:pt-14 md:pt-20 lg:pt-10">
          <div className={bookDemoShellClass}>
            <HomeHeroProductHuntBadge align="start" className="mb-3 sm:mb-4" />
          </div>
        </div>

        <div className="section-full flex min-h-0 flex-1 flex-col pb-10 sm:pb-14 md:pb-20 lg:justify-center lg:pb-16 2xl:pb-20">
          <div className={bookDemoShellClass}>
            <div className="sig-split w-full !items-stretch gap-10 sm:gap-12 xl:gap-x-16 2xl:gap-x-20">
              <div className="flex h-full min-w-0 flex-col items-start text-left lg:max-w-none lg:pr-4 xl:pr-6">
                <div className="w-full min-w-0">
                  <HomeEyebrow>{BOOK_DEMO_HERO.eyebrow}</HomeEyebrow>

                  <h1
                    className={cn(
                      marketingHeroH1Class,
                      "mb-5 w-full text-left text-balance sm:mb-6 md:mb-8",
                      "max-lg:text-[clamp(1.75rem,5.5vw,3.25rem)] max-lg:leading-[1.1]",
                    )}
                  >
                    {BOOK_DEMO_HERO.titleLead}{" "}
                    <span className="text-hero-here">{BOOK_DEMO_HERO.titleAccent}</span>
                  </h1>
                </div>

                <p
                  className={cn(
                    marketingHeroLeadClass,
                    "mt-0 max-w-2xl text-left text-pretty sm:leading-relaxed",
                    "lg:max-w-xl xl:max-w-2xl",
                    "max-lg:text-base max-lg:sm:text-lg",
                  )}
                >
                  {BOOK_DEMO_HERO.leadBefore}
                  <span className="font-semibold text-primary">{BOOK_DEMO_HERO.leadHighlight}</span>
                  {BOOK_DEMO_HERO.leadAfter}
                </p>

                <div className="mt-8 flex w-full flex-1 flex-col justify-end sm:mt-10 lg:mt-10">
                  <BookDemoWioCaseStudy />
                </div>
              </div>

              <div id={BOOK_DEMO_FORM_ID} className="min-w-0 w-full scroll-mt-28 lg:pl-2 xl:pl-4">
                <div className={marketingHeroFormCardClass}>
                  <div className="relative z-[1] space-y-1.5 pb-5 sm:pb-6">
                    <h2 className={marketingFormTitleClass}>{BOOK_DEMO_HERO.formTitle}</h2>
                    <p className={marketingFormIntroClass}>{BOOK_DEMO_HERO.formIntro}</p>
                  </div>
                  <div className={marketingHeroFormInnerClass}>
                    <BookDemoLeadForm />
                  </div>
                </div>
              </div>
            </div>
            <BookDemoWioQuote />
          </div>
        </div>
      </div>
    </section>
  );
}
