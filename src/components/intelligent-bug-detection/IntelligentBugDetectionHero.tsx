import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

export function IntelligentBugDetectionHero() {
  return (
    <MarketingThesisHero
      ariaLabel="Intelligent bug detection for mobile"
      title={
        <>
          <span className="text-primary">Intelligent Bug Detection</span> for
          <br className="hidden lg:block" aria-hidden="true" />{" "}
          Mobile Applications
        </>
      }
      lead="Go beyond pass or fail. QApilot detects accessibility issues, action latency, and page load failures during execution — mapping every issue to the exact screen, interaction, and context where it occurs."
      cta={<BookDemoCtaButton />}
    />
  );
}
