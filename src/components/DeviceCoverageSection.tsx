import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import DeviceCoverageAdvisorLazy from "@/components/DeviceCoverageAdvisorLazy";

const DeviceCoverageSection = () => {
  return (
    <section
      className="relative z-10 w-full overflow-hidden border-t border-border section-edge bg-background"
      aria-labelledby="device-coverage-advisor"
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern-subtle opacity-80" aria-hidden />
      <div className="section-full relative z-10 py-14 md:py-16 2xl:py-20">
        <MarketingSectionHeader
          id="device-coverage-advisor"
          eyebrow="Plan your matrix"
          title={
            <>
              Device Coverage <span className="text-primary">Advisor</span>
            </>
          }
          description="Pick a target market and coverage goal to see a data-driven device-family matrix—sorted by real-world share so you know exactly what to test."
          marginBottomClassName="mb-8 md:mb-10 2xl:mb-12"
        />
        <DeviceCoverageAdvisorLazy />
      </div>
    </section>
  );
};

export default DeviceCoverageSection;
