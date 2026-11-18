import Link from "next/link";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { PLAY_POLICY_SAMPLE_FINDINGS } from "@/lib/play-policy-checker";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";

const SCORE = 62;
/** Ring radius 20. Circumference is about 126. */
const SCORE_ARC = "78 126";

const SEVERITY_CLASS = {
  Blocker: "text-destructive",
  High: "text-orange",
  Medium: "text-primary",
  Low: "text-muted-foreground",
} as const;

/**
 * Home hero slide 2. Full-width headline, one line of tagline under it,
 * and a two-by-two sample report beside the CTA row.
 * Home colors only. The Go lockup, green, and midnight poster stay on that page.
 */
export default function HomeHeroMcpPanel() {
  return (
    <div className="flex h-full w-full min-w-0 flex-col items-start">
      <div className="w-full">
        <p
          className={cn(
            marketingHeroH1Class,
            "mb-0 w-full text-left",
            "max-lg:text-[clamp(1.9rem,7.5vw,4.15rem)] max-lg:leading-[1.08]",
          )}
        >
          <span className="flex flex-col items-start gap-y-2 sm:gap-y-2.5 md:gap-y-3.5 lg:gap-y-4">
            <span className="block px-1 leading-[inherit] md:whitespace-nowrap">
              Will Google Play Reject Your App?
            </span>
            <Link
              href={PATHS.PLAY_POLICY_CHECKER}
              className="block rounded-sm px-1 leading-[inherit] text-hero-here transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:whitespace-nowrap"
            >
              Know Before You Submit.
            </Link>
          </span>
        </p>
        <p className="mt-6 px-1 text-base leading-snug text-muted-foreground sm:text-lg lg:mt-8 lg:whitespace-nowrap">
          Upload an APK or pick your Play listing. We crawl the app, scan the
          build, and email you every blocker.
        </p>

        {/* Open area right of the slide toggle and CTAs. */}
        <div className="absolute -bottom-6 left-[33rem] right-0 z-[2] hidden xl:block">
          <figure
            className="grid auto-rows-[4rem] grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border"
            aria-label="Sample report"
          >
            <div className="flex items-center gap-3 bg-background px-5">
              <div className="relative h-10 w-10 shrink-0">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 52 52"
                  role="img"
                  aria-label={`Readiness score ${SCORE} of 100`}
                >
                  <circle
                    cx="26"
                    cy="26"
                    r="20"
                    fill="none"
                    stroke="hsl(205 70% 48% / 0.18)"
                    strokeWidth="5"
                  />
                  <circle
                    cx="26"
                    cy="26"
                    r="20"
                    fill="none"
                    stroke="hsl(205 70% 48%)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={SCORE_ARC}
                    transform="rotate(-90 26 26)"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-heading text-sm font-semibold tracking-tight text-foreground">
                  {SCORE}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-heading text-sm font-semibold tracking-tight text-foreground">
                  Play readiness
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold uppercase tracking-wide text-destructive">
                    Blocked
                  </span>
                  {" · "}1 blocker · 2 high
                </p>
              </div>
            </div>
            {PLAY_POLICY_SAMPLE_FINDINGS.map((finding) => (
              <div
                key={finding.label}
                className="flex min-w-0 items-center gap-3 bg-background px-5"
              >
                <span
                  className={cn(
                    "w-14 shrink-0 text-[10px] font-semibold uppercase tracking-wide",
                    SEVERITY_CLASS[finding.severity],
                  )}
                >
                  {finding.severity}
                </span>
                <span className="min-w-0 text-sm leading-snug text-foreground">
                  {finding.label}
                </span>
              </div>
            ))}
          </figure>
        </div>
      </div>
    </div>
  );
}
