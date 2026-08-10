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
      lead={<span className="font-medium text-foreground/90">Reduce production risk before it reaches users.</span>}
      cta={<BookDemoCtaButton>Book Demo</BookDemoCtaButton>}
    >
      <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground text-balance sm:mb-11 sm:text-lg md:max-w-4xl md:text-xl md:leading-relaxed">
        QApilot helps SRE teams improve release reliability by identifying mobile quality risks early, strengthening
        pre-release signals, and reducing incidents caused by poor launches.
      </p>
    </MarketingThesisHero>
  );
}
