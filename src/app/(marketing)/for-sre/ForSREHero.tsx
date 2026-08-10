import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

export function ForSREHero() {
  return (
    <MarketingThesisHero
      ariaLabel="Hero"
      titleId="sre-hero-title"
      title={
        <>
          Release Reliability for{" "}
          <span className="text-primary">SRE Teams</span>
        </>
      }
      lead={
        <span className="font-medium text-foreground/90">
          Reduce production risk before it reaches users.
        </span>
      }
      cta={<BookDemoCtaButton>Book Demo</BookDemoCtaButton>}
    >
      <p className="mb-8 w-full text-pretty text-base leading-relaxed text-muted-foreground sm:mb-10 sm:text-lg md:mb-11 md:text-xl md:leading-relaxed">
        QApilot helps SRE teams improve release reliability by identifying
        mobile quality risks early, strengthening pre-release signals, and
        reducing incidents caused by poor launches.
      </p>
    </MarketingThesisHero>
  );
}
