import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

export function AgenticArchitectureHero() {
  return (
    <MarketingThesisHero
      ariaLabel="QApilot agentic architecture"
      title={
        <>
          QApilot&apos;s{" "}
          <span className="text-primary">Agentic Architecture</span>
        </>
      }
      lead="QApilot is powered by a network of specialized AI agents working on a shared knowledge graph. Enabling autonomous exploration, adaptive testing, and continuous learning across your app."
      cta={<BookDemoCtaButton />}
    />
  );
}
