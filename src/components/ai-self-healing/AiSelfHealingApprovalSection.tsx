import {
  CheckCircle2,
  GitCompareArrows,
  MousePointerClick,
  ShieldCheck,
} from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

const STEPS = [
  { title: "Review Healed Step", Icon: ShieldCheck },
  { title: "Compare Old Vs New Locator", Icon: GitCompareArrows },
  { title: "Click Update", Icon: MousePointerClick },
  { title: "Future Runs Use Updated Locator", Icon: CheckCircle2 },
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
          description="Human-in-the-loop control over locator updates. So healing stays transparent and intentional."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <ol
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5"
          aria-label="Healing approval steps"
        >
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm md:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <step.Icon
                  className="h-5 w-5 shrink-0 text-primary"
                  strokeWidth={1.35}
                  aria-hidden
                />
              </div>
              <p className="text-base font-semibold leading-snug text-foreground md:text-lg">
                {step.title}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
