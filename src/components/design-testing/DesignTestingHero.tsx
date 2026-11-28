import { DesignTestingLeadForm } from "@/components/design-testing/DesignTestingLeadForm";
import { HomeEyebrow } from "@/components/home/HomeEyebrow";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import {
  marketingHeroH1Class,
  marketingHeroLeadClass,
} from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function DesignTestingHero() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible home-canvas"
      aria-labelledby="design-testing-hero-title"
    >
      <MarketingBackground variant="hero" />

      <div className="relative z-10 w-full section-full pt-14 pb-0 sm:pt-16 md:pt-20 lg:pt-28 2xl:pt-32">
        <div className="flex w-full min-w-0 flex-col items-start text-left">
          <HomeEyebrow>Platform · Design</HomeEyebrow>
          <h1
            id="design-testing-hero-title"
            className={cn(
              marketingHeroH1Class,
              "mb-5 w-full text-balance sm:mb-6 md:mb-8",
              "max-lg:text-[clamp(1.9rem,7.5vw,4.15rem)] max-lg:leading-[1.08]",
            )}
          >
            Design Testing for the{" "}
            <span className="text-primary">screen that shipped</span>
          </h1>
          <p className={marketingHeroLeadClass}>
            The file that was approved and the screen on the device are not
            the same artifact. Design Testing compares the running app with
            the intended UI and names the drift: spacing, type, color, and
            elements that are missing or extra.
          </p>
          <div
            id="design-testing-request"
            className="mt-6 w-full scroll-mt-28 [&_label]:sr-only [&_#design-testing-lead-email-error:empty]:hidden"
          >
            <DesignTestingLeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
