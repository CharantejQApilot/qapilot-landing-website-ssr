import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

export function ForReleaseManagerHero() {
  return (
    <MarketingThesisHero
      ariaLabel="Hero"
      titleId="rm-hero-title"
      title={
        <>
          Release Confidence for{" "}
          <span className="text-primary">Release Managers</span>
        </>
      }
      lead={<span className="font-medium text-foreground/90">Ship faster with clearer go / no-go decisions.</span>}
      cta={<BookDemoCtaButton>Book Demo</BookDemoCtaButton>}
    >
      <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground text-balance sm:mb-11 sm:text-lg md:max-w-4xl md:text-xl md:leading-relaxed">
        QApilot helps Release Managers reduce uncertainty before mobile launches through faster validation, clearer
        quality signals, and scalable release readiness testing.
      </p>
    </MarketingThesisHero>
  );
}
