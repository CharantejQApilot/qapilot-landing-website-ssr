import { PLAY_POLICY_SAMPLE_FINDINGS } from "@/lib/play-policy-checker";
import { cn } from "@/lib/utils";

function ScreenChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-md border border-white/10 bg-[hsl(240_40%_10%)]">
      <div className="flex shrink-0 items-center justify-between px-2 py-1.5">
        <span className="h-1 w-5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-between gap-2 px-2 pb-2.5">
        {children}
      </div>
    </div>
  );
}

function Bar({ className }: { className?: string }) {
  return <span className={cn("block h-1.5 shrink-0 rounded-full bg-white/15", className)} />;
}

function Screen({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <ScreenChrome>{children}</ScreenChrome>
      <p className="mt-1.5 shrink-0 text-center text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">
        {label}
      </p>
    </div>
  );
}

export function PlayPolicyReportCard() {
  return (
    <div
      className="relative flex h-full min-h-0 w-full"
      aria-label="Play Policy Checker report"
    >
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[hsl(var(--primary)/0.18)] blur-3xl"
        aria-hidden
      />
      <div className="flex h-full w-full flex-1 flex-col overflow-hidden rounded-lg border border-white/10 bg-[hsl(var(--navy))] text-white shadow-[0_28px_70px_-32px_hsl(var(--navy)/0.8)]">
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-destructive" aria-hidden />
            <span className="truncate font-heading text-sm font-semibold tracking-tight">
              Your app
            </span>
          </div>
          <span className="shrink-0 font-heading text-sm font-semibold tracking-[0.14em] text-destructive">
            BLOCKED
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
          <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
            Crawl
          </p>
          <div className="mt-3 grid min-h-[8.5rem] flex-1 grid-cols-3 gap-2 sm:gap-3">
            <Screen label="Login">
              <Bar className="w-3/5" />
              <Bar />
              <Bar className="w-4/5" />
              <span className="block h-4 w-full shrink-0 rounded-sm bg-white/25" />
            </Screen>
            <Screen label="Permission">
              <Bar className="w-2/3" />
              <span className="block shrink-0 rounded-sm border border-white/15 p-1.5">
                <Bar className="w-full" />
                <span className="mt-1.5 block h-3 w-2/3 rounded-sm bg-white/25" />
              </span>
              <Bar className="w-1/2" />
            </Screen>
            <Screen label="Account">
              <Bar className="w-1/2" />
              <span className="flex shrink-0 items-center justify-between gap-2">
                <Bar className="w-2/3" />
                <span className="h-2 w-2 shrink-0 rounded-full bg-destructive" />
              </span>
              <Bar className="w-4/5" />
              <Bar className="w-3/5" />
            </Screen>
          </div>

          <div className="mt-5 shrink-0 border-t border-white/10 pt-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Score
                </p>
                <p className="font-heading text-5xl font-semibold leading-none tracking-tight">
                  62
                </p>
              </div>
              <p className="max-w-[8.5rem] text-right text-xs leading-snug text-white/60">
                18 of 22 rules ran
              </p>
            </div>
            <div
              className="mt-3 h-1 overflow-hidden rounded-full bg-white/10"
              role="img"
              aria-label="18 of 22 applicable rules ran"
            >
              <span className="block h-full w-[82%] rounded-full bg-white/70" />
            </div>
            <ul className="mt-4 flex flex-col gap-3">
              {PLAY_POLICY_SAMPLE_FINDINGS.map((finding) => (
                <li key={finding.label} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "w-16 shrink-0 pt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]",
                      finding.severity === "Blocker"
                        ? "text-destructive"
                        : "text-white/45",
                    )}
                  >
                    {finding.severity}
                  </span>
                  <span className="text-sm leading-snug text-white/90">
                    {finding.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
