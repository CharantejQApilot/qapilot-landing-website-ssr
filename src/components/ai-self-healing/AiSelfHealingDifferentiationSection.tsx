import { Eye, GitBranch, Shield, UserCheck } from "lucide-react";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const POINTS = [
  { title: "Transparent Changes", body: "Every adaptation is inspectable—not a silent rewrite.", Icon: Eye },
  { title: "Full Visibility In Reports", body: "Healing is labeled and traceable across runs.", Icon: Shield },
  { title: "Human Approval Loop", body: "You decide when locators become canonical.", Icon: UserCheck },
  { title: "Continuous Test Evolution", body: "Tests learn from real UI drift instead of rotting.", Icon: GitBranch },
] as const;

export function AiSelfHealingDifferentiationSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="ash-diff-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="ash-diff-heading"
          title={
            <>
              Not Just Healing. <span className="text-primary">Controlled Healing.</span>
            </>
          }
          description="Built for teams who want resilience without giving up governance."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <MarketingLedger cols={2} aria-label="Controlled healing differentiators">
          {POINTS.map((p) => (
            <MarketingLedgerCell key={p.title}>
              <p.Icon className="h-7 w-7 text-primary" strokeWidth={1.35} aria-hidden />
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground md:text-lg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{p.body}</p>
            </MarketingLedgerCell>
          ))}
        </MarketingLedger>
      </div>
    </section>
  );
}
