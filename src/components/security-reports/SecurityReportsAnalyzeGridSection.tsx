import {
  AppWindow,
  Binary,
  Fingerprint,
  Network,
  Radar,
} from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { cn } from "@/lib/utils";

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
    title: "App config",
    body: "Manifest flags, backup rules, and debug exposure.",
    Icon: AppWindow,
  },
  {
    title: "Tracker detection",
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
              Security Analysis To Make Your App <span className="text-primary">Release Ready</span>
            </>
          }
          description="Structured checks that mirror how attackers and auditors think—not a one-off scan buried in a folder."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={cn(
                "rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm backdrop-blur-sm transition-colors md:p-6",
                "motion-safe:hover:border-primary/30",
                i === 3 && "lg:col-start-2 lg:col-span-2",
                i === 4 && "lg:col-start-4 lg:col-span-2 md:col-span-2 md:mx-auto md:w-full md:max-w-xl lg:mx-0 lg:max-w-none",
                i < 3 && "lg:col-span-2",
              )}
            >
              <item.Icon className="h-8 w-8 text-primary" strokeWidth={1.35} aria-hidden />
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
