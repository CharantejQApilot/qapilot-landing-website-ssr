import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const LabsHeroSection = () => {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible"
      aria-label="Labs hero"
      aria-labelledby="labs-hero-title"
    >
      <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple progressiveBlur={false} />

      <div className="relative z-10 w-full section-full py-16 sm:py-20 md:py-24 lg:py-28 2xl:py-32">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-3 text-center sm:px-4 lg:max-w-7xl 2xl:max-w-[90rem]">
          <h1
            id="labs-hero-title"
            className={cn(
              marketingHeroH1Class,
              "mb-5 w-full text-balance sm:mb-6 md:mb-8",
              "max-lg:text-[clamp(1.35rem,0.95rem+2.4vw,3.45rem)] max-lg:leading-[1.12]",
            )}
          >
            Experiments. Tools.{" "}
            <span className="text-primary">Ideas shipped fast.</span>
          </h1>

          <p
            className={cn(
              marketingHeroLeadClass,
              "mx-auto mb-10 max-w-3xl text-balance sm:mb-11 md:mb-12 lg:max-w-4xl",
            )}
          >
            QApilot Labs is where we build and ship experiments that explore the edges of AI-native development and
            testing.
          </p>

          <div className="mb-2 sm:mb-4">
            <BookDemoCtaButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabsHeroSection;
