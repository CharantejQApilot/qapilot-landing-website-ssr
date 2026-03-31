import { CheckCircle2, GitCompareArrows, MousePointerClick, ShieldCheck } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const STEPS = [
  { title: "Review healed step", Icon: ShieldCheck },
  { title: "Compare old vs new locator", Icon: GitCompareArrows },
  { title: "Click update", Icon: MousePointerClick },
  { title: "Future runs use updated locator", Icon: CheckCircle2 },
] as const;

export function AiSelfHealingApprovalSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="ash-approval-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="ash-approval-heading"
          title={
            <>
              Approve Once. <span className="text-primary">Stay Fixed.</span>
            </>
          }
          description="Human-in-the-loop control over locator updates—so healing stays transparent and intentional."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="flex gap-4 rounded-2xl border border-border/70 bg-card/90 p-5 shadow-sm md:p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {i + 1}
              </span>
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <step.Icon className="mt-1 h-6 w-6 shrink-0 text-primary" strokeWidth={1.35} aria-hidden />
                <p className="pt-1 text-base font-semibold leading-snug text-foreground md:text-lg">{step.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
