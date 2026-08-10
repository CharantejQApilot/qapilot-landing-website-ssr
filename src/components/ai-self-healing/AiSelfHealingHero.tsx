import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

export function AiSelfHealingHero() {
  return (
    <MarketingThesisHero
      ariaLabel="AI self-healing tests"
      title={
        <>
          Tests That
          <br aria-hidden="true" />
          <span className="text-primary">Fix Themselves</span>
        </>
      }
      lead="Automatically recover from UI changes and keep your tests stable across every release."
      cta={<BookDemoCtaButton />}
    />
  );
}
