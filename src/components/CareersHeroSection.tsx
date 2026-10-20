import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

const CareersHeroSection = () => {
  return (
    <MarketingThesisHero
      ariaLabel="Careers hero"
      titleId="careers-hero-title"
      eyebrow="Working at QApilot"
      title={
        <>
          Careers at <span className="text-primary">QApilot</span>
        </>
      }
      lead="Help shape what quality looks like in an AI-first world. Engineers, product builders, and customer champions here are redefining software quality assurance with AI-powered testing. The group stays small, and it grows when the work needs another owner."
    />
  );
};

export default CareersHeroSection;
