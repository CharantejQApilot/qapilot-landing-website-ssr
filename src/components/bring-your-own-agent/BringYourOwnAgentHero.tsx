import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

export function BringYourOwnAgentHero() {
  return (
    <MarketingThesisHero
      ariaLabel="Bring your own agent"
      eyebrow="Platform"
      title={
        <>
          Bring Your Own <span className="text-primary">Agent</span>
        </>
      }
      lead="Integrate your own AI agents into QApilot and leverage the knowledge graph to build custom testing workflows."
      cta={<BookDemoCtaButton />}
    />
  );
}
