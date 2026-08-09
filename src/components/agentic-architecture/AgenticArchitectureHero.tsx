import { BookDemoLinkButton } from "@/components/book-demo/BookDemoLinkButton";
import { AgentNetworkCircuitVisual } from "@/components/agentic-architecture/AgentNetworkCircuitVisual";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

export function AgenticArchitectureHero() {
  return (
    <MarketingThesisHero
      ariaLabel="QApilot agentic architecture"
      title={
        <>
          QApilot&apos;s <span className="text-primary">Agentic Architecture</span>
        </>
      }
      lead="QApilot is powered by a network of specialized AI agents working on a shared knowledge graph — enabling autonomous exploration, adaptive testing, and continuous learning across your app."
      cta={
        <BookDemoLinkButton
          size="lg"
          className="rounded-lg bg-primary px-8 py-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 2xl:px-10 2xl:py-7 2xl:text-lg"
        />
      }
      media={<AgentNetworkCircuitVisual />}
      fillViewport
    />
  );
}
