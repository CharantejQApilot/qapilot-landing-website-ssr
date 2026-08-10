import type { ReactNode } from "react";
import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

type CompareHeroSectionProps = {
  heroId: string;
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
};

/** S01 compare / alternatives thesis hero. */
export default function CompareHeroSection({
  heroId,
  eyebrow,
  title,
  description,
}: CompareHeroSectionProps) {
  return (
    <MarketingThesisHero
      titleId={heroId}
      eyebrow={eyebrow}
      title={title}
      lead={description}
      cta={<BookDemoCtaButton />}
      fillViewport
    />
  );
}
