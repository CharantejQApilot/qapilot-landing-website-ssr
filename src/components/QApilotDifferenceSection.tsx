import { Brain, Clock, Moon, Plug, Zap } from "lucide-react";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const features = [
  {
    title: "AI-Native Platform",
    description: "State-of-the-art AI that makes testing effortless.",
    icon: Brain,
  },
  {
    title: "Time Saving",
    description:
      "Cut execution cycles dramatically with autonomous smoke tests and self-healing runs.",
    icon: Clock,
  },
  {
    title: "Overnight Test Suite Automation",
    description: "Wake up to complete test coverage with your test suites executed while you sleep.",
    icon: Moon,
  },
  {
    title: "Extensible by Design",
    description:
      "Add custom automation with BYOA (Bring Your Own Agent) for enterprise-specific needs.",
    icon: Plug,
  },
  {
    title: "QE Accelerator",
    description:
      "Accelerate Quality Engineering transformations across teams with scalable, mobile-first automation.",
    icon: Zap,
  },
] as const;

export default function QApilotDifferenceSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="qapilot-difference-heading"
    >
      <div className="section-full py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="qapilot-difference-heading"
          title={
            <>
              The <span className="text-primary">QApilot</span> Difference
            </>
          }
        />

        <MarketingLedger cols={3} aria-label="QApilot difference">
          {features.map(({ title, description, icon: Icon }) => (
            <MarketingLedgerCell key={title}>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </div>
              <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
                {title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
            </MarketingLedgerCell>
          ))}
        </MarketingLedger>
      </div>
    </section>
  );
}
