import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { ScenicYoutubeVideo } from "@/components/marketing/ScenicYoutubeVideo";
import { INTELLIGENT_BUG_ISSUE_DETAIL_SCENIC_URL } from "@/lib/core-advantage-scenic-urls.mjs";

const BREAKDOWN = [
  {
    title: "Issue Summary",
    text: "A clear description of the detected problem.",
  },
  {
    title: "Severity Indicator",
    text: "Highlights the likely impact and priority.",
  },
  {
    title: "Screenshot Context",
    text: "Shows the affected screen, with the problematic element visually identifiable.",
  },
  {
    title: "UI Metadata",
    text: "Includes element type, resource ID, class name, text, and screen bounds.",
  },
  {
    title: "How to Fix",
    text: "Provides recommended corrective action so teams can resolve the issue faster.",
  },
] as const;

export function IntelligentBugIssueDetailSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-gradient-to-b from-muted/20 via-background to-background"
      aria-labelledby="ibd-detail-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="ibd-detail-heading"
          title={
            <>
              From Detection to Diagnosis — <span className="text-primary">Instantly</span>
            </>
          }
          description="Every detected issue comes with the context needed to understand what failed, where it occurred, and how to fix it."
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="mx-auto w-full max-w-6xl 2xl:max-w-7xl">
          <ScenicYoutubeVideo
            videoId="vHJJtQpi384"
            scenicUrl={INTELLIGENT_BUG_ISSUE_DETAIL_SCENIC_URL}
            ariaLabel="Walkthrough: intelligent bug detection from detection to diagnosis"
          />
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 sm:gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-12 xl:gap-16 2xl:max-w-7xl">
          <div className="relative w-full max-w-lg shrink-0">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-primary/5 blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl">
              <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Issue Detail</span>
                <span className="rounded-full bg-destructive/15 px-2.5 py-0.5 text-xs font-bold text-destructive">High</span>
              </div>
              <div className="p-4">
                <h3 className="font-heading text-lg font-semibold text-foreground">Tap Target Below Minimum Size</h3>
                <p className="mt-1 text-sm text-muted-foreground">Checkout · Shipping method row</p>
                <div className="relative mt-5 overflow-hidden rounded-xl border border-border bg-muted/40">
                  <div className="aspect-[16/10] w-full bg-gradient-to-br from-muted to-background p-4">
                    <div className="h-full w-full rounded-lg bg-card/90 p-3 shadow-inner">
                      <div className="h-2 w-1/3 rounded bg-muted-foreground/15" />
                      <div className="mt-3 space-y-2">
                        <div className="h-8 w-full rounded border border-border/80 bg-background" />
                        <div className="relative h-8 w-full rounded border border-border/80 bg-background">
                          <div className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded border-2 border-primary bg-primary/20 ring-4 ring-primary/25" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="border-t border-border/60 bg-background/90 px-3 py-2 text-[11px] text-muted-foreground">
                    Highlight: control bounds 36×36dp — below 48dp guideline
                  </p>
                </div>
                <dl className="mt-4 space-y-2 rounded-xl bg-muted/25 p-4 text-xs">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">resource-id</dt>
                    <dd className="font-mono text-foreground">btn_ship_continue</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">class</dt>
                    <dd className="truncate font-mono text-foreground">android.widget.ImageButton</dd>
                  </div>
                </dl>
                <div className="mt-4 rounded-xl border border-primary/25 bg-primary/[0.06] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">How To Fix</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    Increase tappable area to at least 48×48dp or add an invisible touch target padding layer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ol className="w-full max-w-lg shrink-0 space-y-0 divide-y divide-border/70 rounded-2xl border border-border/60 bg-card/50 sm:max-w-xl lg:max-w-[26rem] xl:max-w-md 2xl:max-w-lg">
            {BREAKDOWN.map((item, i) => (
              <li key={item.title} className="flex gap-4 px-5 py-5 md:px-6 md:py-6">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground md:text-lg">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-base">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
