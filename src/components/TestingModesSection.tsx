import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const modes = [
  {
    title: "Fully Autonomous",
    description: "AI handles most of your testing workflow",
    segments: ["Crawler (Sanity Testing)", "CoPilot", "RPA/Appium"],
  },
  {
    title: "AI-Assisted",
    description: "Blend of AI intelligence and manual control",
    segments: ["CoPilot", "RPA/Appium"],
  },
  {
    title: "Continuous Automation",
    description: "Traditional approach with full control",
    segments: ["RPA & Appium"],
  },
] as const;

export default function TestingModesSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="testing-modes-heading"
    >
      <div className="section-full py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="testing-modes-heading"
          title={
            <>
              Adapt <span className="text-primary">Testing</span> to Your Needs
            </>
          }
          description="With QApilot, you choose how much AI runs your tests. Fully autonomous, AI-assisted, or traditional scripted automation."
        />

        <MarketingLedger cols={3} aria-label="Testing modes">
          {modes.map((mode) => (
            <MarketingLedgerCell key={mode.title}>
              <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                {mode.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{mode.description}</p>
              <ul className="mt-5 space-y-2 border-t border-border pt-4">
                {mode.segments.map((segment) => (
                  <li key={segment} className="text-sm font-medium text-foreground md:text-base">
                    {segment}
                  </li>
                ))}
              </ul>
            </MarketingLedgerCell>
          ))}
        </MarketingLedger>
      </div>
    </section>
  );
}
