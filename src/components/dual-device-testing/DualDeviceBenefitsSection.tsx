import { GitBranch, Link2, MapPin, Waypoints } from "lucide-react";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const BENEFITS = [
  {
    title: "Dependency-Aware Orchestration",
    body: "Plans coordinate through defined waits and triggers, never brittle fixed timers.",
    Icon: Waypoints,
  },
  {
    title: "Cross-Session State Management",
    body: "Each device keeps its own live session while QApilot tracks the shared state between them.",
    Icon: Link2,
  },
  {
    title: "Step-Level Synchronization",
    body: "Handoffs fire at exact steps, so timing never drifts between the two devices.",
    Icon: GitBranch,
  },
  {
    title: "Failure Attribution",
    body: "When a run breaks, you see the exact device and the exact step that caused it.",
    Icon: MapPin,
  },
] as const;

/** Under-the-hood benefits. */
export function DualDeviceBenefitsSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="ddt-benefits-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="ddt-benefits-heading"
          eyebrow="Under the hood"
          title={
            <>
              The Complete Transaction:{" "}
              <span className="text-primary">Executed and Evaluated as One Test</span>
            </>
          }
          description="Benefits that matter when dual-device workflows are critical to your industry and your release bar."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <MarketingLedger cols={2} aria-label="Dual device testing benefits">
          {BENEFITS.map(({ title, body, Icon }) => (
            <MarketingLedgerCell key={title} as="article">
              <div className="flex gap-4 p-6 md:p-8">
                <Icon className="mt-0.5 size-6 shrink-0 text-primary" strokeWidth={1.35} aria-hidden />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground md:text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{body}</p>
                </div>
              </div>
            </MarketingLedgerCell>
          ))}
        </MarketingLedger>
      </div>
    </section>
  );
}
