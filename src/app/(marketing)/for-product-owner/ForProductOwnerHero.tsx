import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

export function ForProductOwnerHero() {
  return (
    <MarketingThesisHero
      ariaLabel="Hero"
      titleId="pm-hero-title"
      title={
        <>
          Faster Releases for{" "}
          <span className="text-primary">Product Managers</span>
        </>
      }
      lead={<span className="font-medium text-foreground/90">Launch with confidence. Reduce surprises after release.</span>}
      cta={<BookDemoCtaButton>Book Demo</BookDemoCtaButton>}
    >
      <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground text-balance sm:mb-11 sm:text-lg md:max-w-4xl md:text-xl md:leading-relaxed">
        QApilot helps Product Managers ship mobile features faster by improving release confidence, reducing
        quality-related delays, and surfacing issues before users do.
      </p>
    </MarketingThesisHero>
  );
}
