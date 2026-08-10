import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

export function ForQALeaderHero() {
  return (
    <MarketingThesisHero
      ariaLabel="Hero"
      titleId="qe-leader-hero-title"
      title={
        <>
          Release Readiness for{" "}
          <span className="text-primary">QE Leaders</span>
        </>
      }
      lead={<span className="font-medium text-foreground/90">Scale quality engineering without scaling complexity.</span>}
      cta={<BookDemoCtaButton />}
    >
      <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground text-balance sm:mb-11 sm:text-lg md:max-w-4xl md:text-xl md:leading-relaxed">
        QApilot helps QE leaders reduce maintenance overhead, improve release confidence, and expand mobile test
        coverage through autonomous, AI-native testing built for modern engineering teams.
      </p>
    </MarketingThesisHero>
  );
}
