import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const sections = [
  {
    title: "Test Creation & Management",
    features: [
      "Record & Playback",
      "Copilot – Natural Language Test Creation",
      "Conditional Logic Support",
      "Deep Link Testing",
      "Test Case Management",
    ],
  },
  {
    title: "Execution at Scale",
    features: [
      "Parallel Test Runs on Cloud",
      "Data-Driven Testing",
      "Debug Mode & Auto-Healing",
      "CI/CD Integration",
      "Network Logs During Execution",
    ],
  },
  {
    title: "Reporting & Insights",
    features: [
      "Execution Overview",
      "Report Comparison",
      "Accessibility Reporting",
      "RCA Suggestions",
      "Audit Trail",
    ],
  },
] as const;

export default function TableStakesSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="table-stakes-heading"
    >
      <div className="section-full py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="table-stakes-heading"
          title={
            <>
              Table Stakes, <span className="text-primary">Done Right</span>
            </>
          }
          description={
            "Enterprises expect reliability, scalability, and clear insights. QApilot delivers all the essentials you need,\u00a0on top of state-of-the-art AI."
          }
        />

        <div className="grid gap-10 lg:gap-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                {section.title}
              </h3>
              <MarketingLedger cols={3} aria-label={section.title}>
                {section.features.map((feature) => (
                  <MarketingLedgerCell key={feature} as="div">
                    <p className="text-base font-medium leading-snug text-foreground md:text-lg">
                      {feature}
                    </p>
                  </MarketingLedgerCell>
                ))}
              </MarketingLedger>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
