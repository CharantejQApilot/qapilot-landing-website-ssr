import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

const LabsHeroSection = () => {
  return (
    <MarketingThesisHero
      ariaLabel="Labs hero"
      titleId="labs-hero-title"
      title={
        <>
          Experiments. Tools.{" "}
          <span className="text-primary">Ideas Shipped Fast.</span>
        </>
      }
      lead="QApilot Labs is where we build and ship experiments that explore the edges of AI-native development and testing."
      cta={<BookDemoCtaButton />}
    />
  );
};

export default LabsHeroSection;
