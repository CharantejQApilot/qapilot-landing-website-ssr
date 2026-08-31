import type { ReactNode } from "react";
import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

type CompareHeroSectionProps = {
  heroId: string;
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
};

/** Compare / alternatives thesis hero — same compact height as case studies. */
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
      paddingClassName="py-10 sm:py-12 md:py-14 lg:py-16"
    />
  );
}
