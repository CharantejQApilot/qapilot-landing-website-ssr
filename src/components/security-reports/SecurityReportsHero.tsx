import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function SecurityReportsHero() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible"
      aria-label="Security reports for mobile"
    >
      <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple />

      <div className="relative z-10 w-full section-full py-16 sm:py-20 md:py-24 lg:py-28 2xl:py-32">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-3 text-center sm:px-4 lg:max-w-7xl 2xl:max-w-[90rem]">
          <h1 className={cn(marketingHeroH1Class, "mb-5 w-full sm:mb-6 md:mb-8 text-balance")}>
            <span className="text-primary">Security Reports</span> That Ship With Your Release
          </h1>

          <p
            className={cn(
              marketingHeroLeadClass,
              "mx-auto mb-8 max-w-3xl text-balance sm:mb-10 md:mb-11 lg:max-w-4xl",
            )}
          >
            Surface risk alongside functional testing—permissions, network, storage, and trackers—so
            every build is reviewed with the same rigor as your features.
          </p>

          <div className="mb-2 sm:mb-4">
            <BookDemoCtaButton />
          </div>
        </div>
      </div>
    </section>
  );
}
