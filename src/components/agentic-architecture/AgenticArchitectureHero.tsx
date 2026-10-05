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
      lead="QApilot is powered by a network of specialized AI agents working on a shared knowledge graph. On WIO that graph covers 11,025 steps across 29 test plans. Aditya Challa and Chaitanya Devalapally founded the company in Hyderabad in 2024."
      cta={<BookDemoCtaButton />}
    />
  );
}
