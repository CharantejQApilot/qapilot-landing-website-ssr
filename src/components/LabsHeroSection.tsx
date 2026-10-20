import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

const LabsHeroSection = () => {
  return (
    <MarketingThesisHero
      ariaLabel="Labs hero"
      titleId="labs-hero-title"
      title={
        <>
          <span className="text-primary">QApilot</span> Labs
        </>
      }
      lead="Experiments, tools, and ideas shipped fast. QApilot Labs is where we build and ship experiments that explore the edges of AI-native development and testing."
      cta={<BookDemoCtaButton />}
    />
  );
};

export default LabsHeroSection;
