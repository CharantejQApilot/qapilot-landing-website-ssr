import { Activity, Battery, Cpu, Wifi } from "lucide-react";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";

const METRICS = [
  {
    title: "CPU & Memory",
    line: "Spot resource spikes tied to the exact step and screen.",
    Icon: Cpu,
  },
  {
    title: "Battery Impact",
    line: "See drain patterns that hurt real-world session quality.",
    Icon: Battery,
  },
  {
    title: "Network Health",
    line: "Correlate latency and failures with traffic during the flow.",
    Icon: Wifi,
  },
  {
    title: "Runtime Signals",
    line: "Capture device-level evidence alongside functional results.",
    Icon: Activity,
  },
] as const;

/** Device metrics detail grid under the suite pillar header. */
export function DeviceMetricsSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden bg-gradient-to-b from-muted/10 via-background to-background"
      aria-label="Device metrics capabilities"
    >
      <div className="section-full relative z-10 pb-14 pt-10 md:pb-20 md:pt-12 2xl:pb-24">
        <MarketingLedger cols={2} aria-label="Device metrics capabilities">
          {METRICS.map(({ title, line, Icon }) => (
            <MarketingLedgerCell key={title} as="article">
              <div className="flex gap-4 p-6 md:p-8">
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-primary" strokeWidth={1.35} aria-hidden />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground md:text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{line}</p>
                </div>
              </div>
            </MarketingLedgerCell>
          ))}
        </MarketingLedger>
      </div>
    </section>
  );
}
