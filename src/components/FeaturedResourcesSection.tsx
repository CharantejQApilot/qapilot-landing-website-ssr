import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";

interface Resource {
  header: string;
  subtext: string;
  text: string;
  cta: string;
  ctaLink: string;
  highlightWord?: string;
}

function resourcesWithCtas(ctaLinks: readonly [string, string]): Resource[] {
  return [
    {
      header: "Deep Links: Jump Straight to What Matters.",
      subtext: "Navigate complex app flows in seconds.",
      text: "QApilot's DeepLinks let you test any screen directly - authentication, installs, or web-to-app journeys, without the clicks in between.",
      cta: "Explore DeepLinks",
      ctaLink: ctaLinks[0],
      highlightWord: "Deep Links",
    },
    {
      header: "Debug Mode: Precision in Every Step.",
      subtext: "Run, pause, and inspect test cases in real time.",
      text: "With Debug Mode, you can trace failures, view screenshots, and analyze step-level data for faster, deeper insight, all inside QApilot.",
      cta: "Explore Debug Mode",
      ctaLink: ctaLinks[1],
      highlightWord: "Debug Mode",
    },
  ];
}

export default function FeaturedResourcesSection({
  ctaLinks,
}: {
  ctaLinks: readonly [string, string];
}) {
  const resources = resourcesWithCtas(ctaLinks);

  return (
    <section className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background">
      <div className="section-full py-14 md:py-20 2xl:py-24">
        <MarketingLedger cols={2} aria-label="Enterprise capabilities">
          {resources.map((resource) => (
            <MarketingLedgerCell key={resource.header} className="flex flex-col">
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {resource.highlightWord ? (
                  <>
                    <span className="text-primary">{resource.highlightWord}</span>
                    {resource.header.replace(resource.highlightWord, "")}
                  </>
                ) : (
                  resource.header
                )}
              </h2>
              <p className="mt-3 text-base font-semibold text-primary md:text-lg">{resource.subtext}</p>
              <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">
                {resource.text}
              </p>
              <div className="mt-6">
                <Button asChild size="lg" className="group">
                  <Link href={resource.ctaLink}>
                    {resource.cta}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </MarketingLedgerCell>
          ))}
        </MarketingLedger>
      </div>
    </section>
  );
}
