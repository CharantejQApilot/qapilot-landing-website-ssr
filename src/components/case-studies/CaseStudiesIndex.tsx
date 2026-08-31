import Link from "next/link";
import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { CaseStudyPreviewCards } from "@/components/case-studies/CaseStudyPreviewCards";
import { MarketingSection, MarketingSectionHeader, MarketingThesisHero } from "@/components/marketing";
import { CASE_STUDIES, caseStudyPath } from "@/lib/case-studies-data";
import { cn } from "@/lib/utils";

export function CaseStudiesIndex() {
  return (
    <main>
      <MarketingThesisHero
        titleId="case-studies-hero"
        paddingClassName="py-10 sm:py-12 md:py-14 lg:py-16"
        eyebrow="Customer stories"
        title={
          <span className="flex flex-col items-start gap-y-2 sm:gap-y-2.5 md:gap-y-3.5 lg:gap-y-4">
            <span>Case Studies From Teams</span>
            <span>
              Shipping{" "}
              <span className="text-hero-here">Mobile Releases</span>
            </span>
          </span>
        }
        lead="How QApilot turned complex banking, dating, and B2B commerce apps into evidenced automation coverage."
        cta={
          <BookDemoCtaButton size="lg" />
        }
      >
        <nav className="mb-6 w-full sm:mb-8" aria-label="Featured case studies">
          <ul className="flex max-w-full flex-wrap items-center justify-start gap-2 sm:gap-2.5">
            {CASE_STUDIES.map((study) => (
              <li key={study.slug}>
                <Link
                  href={caseStudyPath(study.slug)}
                  className={cn(
                    "inline-flex items-center justify-center rounded-md border border-border/80 bg-background/80",
                    "px-3.5 py-1.5 text-sm font-medium text-foreground/80",
                    "transition-colors hover:border-primary/35 hover:bg-primary/[0.06] hover:text-primary",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "sm:px-4 sm:py-2 sm:text-[15px]",
                  )}
                >
                  {study.clientName}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </MarketingThesisHero>

      <MarketingSection>
          <MarketingSectionHeader
            id="case-study-list"
            title="Featured engagements"
            description="Wio, Geml, and GrowSari — open any story to read the full engagement."
            marginBottomClassName="mb-10 md:mb-12"
          />
          <CaseStudyPreviewCards />
      </MarketingSection>
    </main>
  );
}
