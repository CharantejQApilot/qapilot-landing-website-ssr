import type { ReactNode } from "react";
import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingSection } from "@/components/marketing/MarketingSection";
import { marketingSectionH2Class } from "@/lib/marketing-typography";

type MarketingCloseCtaProps = {
  title: ReactNode;
  lead: ReactNode;
  headingId?: string;
  cta?: ReactNode;
};

/** Navy closing chapter. Same atmosphere as the site footer CTA. */
export function MarketingCloseCta({
  title,
  lead,
  headingId = "close-cta",
  cta = <BookDemoCtaButton />,
}: MarketingCloseCtaProps) {
  return (
    <MarketingSection
      surface="navy"
      glow="bottom-right"
      aria-labelledby={headingId}
    >
      <div className="sig-close">
        <h2 id={headingId} className={marketingSectionH2Class}>
          {title}
        </h2>
        <p className="mt-4 w-full text-base leading-relaxed md:text-lg">
          {lead}
        </p>
        <div className="sig-cta-row">{cta}</div>
      </div>
    </MarketingSection>
  );
}
