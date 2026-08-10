import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

export function AutonomousTestingHero() {
  return (
    <MarketingThesisHero
      ariaLabel="Autonomous testing for mobile"
      title={
        <>
          <span className="text-primary">Autonomous</span> Testing for
          <br className="hidden lg:block" aria-hidden="true" />{" "}
          Mobile Applications
        </>
      }
      lead="QApilot moves testing beyond scripts, record-and-playback, and AI assistance. It explores your app, builds coverage across real user journeys, and continuously adapts as the app evolves — creating a faster path to release readiness."
      cta={<BookDemoCtaButton />}
    />
  );
}
