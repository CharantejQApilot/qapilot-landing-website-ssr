import { AppWindow, Binary, Fingerprint, Network, Radar } from "lucide-react";
import {
  MarketingLedger,
  MarketingLedgerCell,
} from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const ITEMS = [
  {
    title: "Permissions",
    body: "Over-privileged APIs, dangerous combinations, and policy drift.",
    Icon: Fingerprint,
  },
  {
    title: "Network",
    body: "Cleartext, certificate chain issues, and unexpected endpoints.",
    Icon: Network,
  },
  {
    title: "Code",
    body: "Patterns and dependencies that increase exploit surface.",
    Icon: Binary,
  },
  {
    title: "App Config",
    body: "Manifest flags, backup rules, and debug exposure.",
    Icon: AppWindow,
  },
  {
    title: "Tracker Detection",
    body: "SDKs and beacons mapped to privacy and compliance risk.",
    Icon: Radar,
  },
] as const;

export function SecurityReportsAnalyzeGridSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="sr-analyze-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="sr-analyze-heading"
          title={
            <>
              Security Analysis To Make Your App{" "}
              <span className="text-primary">Release Ready</span>
            </>
          }
          description="Structured checks that mirror how attackers and auditors think. Not a one-off scan buried in a folder."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <MarketingLedger cols={5} aria-label="Security analysis areas">
          {ITEMS.map((item) => (
            <MarketingLedgerCell key={item.title}>
              <item.Icon
                className="h-8 w-8 text-primary"
                strokeWidth={1.35}
                aria-hidden
              />
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                {item.body}
              </p>
            </MarketingLedgerCell>
          ))}
        </MarketingLedger>
      </div>
    </section>
  );
}
