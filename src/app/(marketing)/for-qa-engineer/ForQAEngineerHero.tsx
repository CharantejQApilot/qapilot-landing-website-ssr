import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

export function ForQAEngineerHero() {
  return (
    <MarketingThesisHero
      ariaLabel="Hero"
      titleId="qa-engineer-hero-title"
      title={
        <>
          Better Testing for{" "}
          <span className="text-primary">Quality Assurance Engineers</span>
        </>
      }
      lead={<span className="font-medium text-foreground/90">Spend less time maintaining tests. More time improving quality.</span>}
      cta={<BookDemoCtaButton>Book Demo</BookDemoCtaButton>}
    >
      <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground text-balance sm:mb-11 sm:text-lg md:max-w-4xl md:text-xl md:leading-relaxed">
        QApilot helps QA Engineers create coverage faster, debug failures quicker, and reduce brittle automation work
        across mobile apps.
      </p>
    </MarketingThesisHero>
  );
}
