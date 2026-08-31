import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { CoWorkHeroMediaColumn } from "@/components/cowork/CoWorkHeroMediaColumn";
import { HomeEyebrow } from "@/components/home/HomeEyebrow";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function CoWorkHero() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible home-canvas"
      aria-label="CoWork"
    >
      <MarketingBackground variant="hero" />

      <div className="relative z-10 w-full section-full py-14 sm:py-16 md:py-20 lg:py-28 2xl:py-32">
        <div
          className={cn(
            "mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-10 sm:gap-12",
            "lg:max-w-none lg:flex-row lg:items-stretch lg:gap-x-10",
            "xl:gap-x-14 2xl:mx-auto 2xl:max-w-[min(100%,92rem)] 2xl:gap-x-16",
          )}
        >
          <div
            className="flex min-w-0 flex-1 flex-col items-start justify-center text-left lg:max-w-none lg:pr-2 xl:pr-4"
          >
            <HomeEyebrow>Agentic · Human in the loop</HomeEyebrow>

            <h1 className={cn(marketingHeroH1Class, "mb-5 w-full text-left text-balance sm:mb-6 md:mb-8")}>
              Activate The <span className="text-primary">Test Cases</span> You Already Have
            </h1>

            <p
              className={cn(
                marketingHeroLeadClass,
                "mt-0 max-w-2xl text-left text-pretty lg:max-w-xl xl:max-w-2xl",
              )}
            >
              <span className="font-semibold text-primary">CoWork</span> turns existing test cases on your test ops
              into runnable mobile automation, with AI planning, human-approved steps, and real-device execution
              before every release.
            </p>

            <div className="mt-8 sm:mt-10">
              <BookDemoCtaButton />
            </div>
          </div>

          <div className="flex min-w-0 flex-[1.2] items-stretch lg:pl-2 xl:pl-4">
            <CoWorkHeroMediaColumn />
          </div>
        </div>
      </div>
    </section>
  );
}
