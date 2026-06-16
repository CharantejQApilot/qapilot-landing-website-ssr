import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { marketingHeroH1Class, marketingHeroLeadClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function BringYourOwnAgentHero() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible"
      aria-label="Bring your own agent"
    >
      <MarketingBackground variant="hero" showDiagonalGrid={false} showPixelRipple />

      <div className="relative z-10 w-full section-full py-16 sm:py-20 md:py-24 lg:py-28 2xl:py-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-3 text-center sm:px-4">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary/90">Platform</p>
          <h1 className={cn(marketingHeroH1Class, "mb-5 text-balance sm:mb-6 md:mb-8")}>
            Bring Your Own <span className="text-primary">Agent</span>
          </h1>
          <p className={cn(marketingHeroLeadClass, "mx-auto mb-8 max-w-3xl text-balance sm:mb-10 md:mb-11")}>
            Integrate your own AI agents into QApilot and leverage the knowledge graph to build custom testing
            workflows.
          </p>
          <BookDemoCtaButton />
        </div>
      </div>
    </section>
  );
}
