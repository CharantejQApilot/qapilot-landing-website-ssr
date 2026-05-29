import { FileWarning, Globe, KeyRound, Shield } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  {
    title: "Manifest Issues",
    total: 24,
    Icon: FileWarning,
    breakdown: [
      { label: "Critical", n: 2, className: "text-destructive" },
      { label: "Warning", n: 9, className: "text-amber-600 dark:text-amber-500" },
      { label: "Info", n: 13, className: "text-muted-foreground" },
    ],
  },
  {
    title: "Code Vulnerabilities",
    total: 41,
    Icon: Shield,
    breakdown: [
      { label: "Critical", n: 5, className: "text-destructive" },
      { label: "Warning", n: 18, className: "text-amber-600 dark:text-amber-500" },
      { label: "Info", n: 18, className: "text-muted-foreground" },
    ],
  },
  {
    title: "Certificate Issues",
    total: 8,
    Icon: KeyRound,
    breakdown: [
      { label: "Critical", n: 1, className: "text-destructive" },
      { label: "Warning", n: 3, className: "text-amber-600 dark:text-amber-500" },
      { label: "Info", n: 4, className: "text-muted-foreground" },
    ],
  },
  {
    title: "Network Issues",
    total: 55,
    Icon: Globe,
    breakdown: [
      { label: "Critical", n: 4, className: "text-destructive" },
      { label: "Warning", n: 22, className: "text-amber-600 dark:text-amber-500" },
      { label: "Info", n: 29, className: "text-muted-foreground" },
    ],
  },
] as const;

export function SecurityReportsCategoriesSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="sr-categories-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="sr-categories-heading"
          title={
            <>
              Grouped For <span className="text-primary">Faster Triage</span>
            </>
          }
          description="Issues roll up into categories your team already uses when planning fixes and sign-off."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {CATEGORIES.map((c) => (
            <div
              key={c.title}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-5 shadow-sm transition-shadow md:p-6",
                "motion-safe:hover:border-primary/25 motion-safe:hover:shadow-md",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <c.Icon className="h-7 w-7 text-primary" strokeWidth={1.35} aria-hidden />
                  <h3 className="mt-3 font-heading text-base font-semibold text-foreground md:text-lg">{c.title}</h3>
                </div>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold tabular-nums text-primary">
                  {c.total}
                </span>
              </div>
              <ul className="mt-4 space-y-2 border-t border-border/60 pt-4 text-sm">
                {c.breakdown.map((b) => (
                  <li key={b.label} className="flex justify-between gap-2">
                    <span className={cn("font-medium", b.className)}>{b.label}</span>
                    <span className="tabular-nums text-muted-foreground">{b.n}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
