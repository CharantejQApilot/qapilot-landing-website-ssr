import { BadgeCheck, ClipboardList, Lightbulb, ShieldAlert } from "lucide-react";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const POINTS = [
  {
    title: "Same Pipeline As Functional QE",
    body: "No handoff to a separate team or tool for “the security pass.”",
    Icon: ShieldAlert,
  },
  {
    title: "Evidence Tied To The Build",
    body: "Know which binary, branch, and run produced each finding.",
    Icon: ClipboardList,
  },
  {
    title: "Readable For PM And Engineering",
    body: "Less security jargon, more “what to fix before we ship.”",
    Icon: Lightbulb,
  },
  {
    title: "Release Confidence",
    body: "A shared bar for risk—so sign-off isn’t a gut call.",
    Icon: BadgeCheck,
  },
] as const;

export function SecurityReportsWhyMattersSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60"
      aria-labelledby="sr-why-heading"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-background to-muted/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(hsl(var(--primary)/0.12)_1px,transparent_1px)] [background-size:20px_20px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-1/4 top-0 h-[60%] w-[70%] rounded-full bg-primary/[0.06] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[50%] w-[60%] rounded-full bg-primary/[0.05] blur-3xl"
        aria-hidden
      />

      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="sr-why-heading"
          title={
            <>
              Security That <span className="text-primary">Ships With Your App</span>
            </>
          }
          description="When security lives next to functional results, teams fix issues earlier and argue less at release time."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <MarketingLedger cols={2} aria-label="Why security reports matter">
          {POINTS.map((p) => (
            <MarketingLedgerCell key={p.title}>
              <div className="flex gap-4">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/15"
                  aria-hidden
                >
                  <p.Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground md:text-xl">{p.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </div>
            </MarketingLedgerCell>
          ))}
        </MarketingLedger>
      </div>
    </section>
  );
}
