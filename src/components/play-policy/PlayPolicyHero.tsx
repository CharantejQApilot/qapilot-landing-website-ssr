import { HomeEyebrow } from "@/components/home/HomeEyebrow";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { PlayPolicyEmailForm } from "@/components/play-policy/PlayPolicyEmailForm";
import { PlayPolicyReportCard } from "@/components/play-policy/PlayPolicyReportCard";
import { PLAY_POLICY_ACCESS_ID } from "@/lib/play-policy-checker";
import { cn } from "@/lib/utils";

/** Large, but sized so the claim, the form, and the report card share the first screen. */
const playPolicyHeroTitleClass =
  "font-heading font-semibold tracking-[-0.03em] text-foreground leading-[1.02] text-[2.35rem] sm:text-5xl lg:text-[3.25rem] xl:text-6xl 2xl:text-7xl";

export function PlayPolicyHero() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible home-canvas"
      aria-labelledby="play-policy-hero-title"
    >
      <MarketingBackground variant="hero" />
      <div className="relative z-10 w-full section-full py-14 sm:py-16 md:py-20 lg:py-24">
        <div className="grid w-full grid-cols-1 items-stretch gap-10 lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:gap-x-12 xl:gap-x-16">
          <div className="flex min-w-0 flex-col items-start text-left">
            <HomeEyebrow>Play Policy Checker</HomeEyebrow>
            <h1
              id="play-policy-hero-title"
              className={cn(playPolicyHeroTitleClass, "mb-0 w-full min-w-0 text-balance")}
            >
              <span className="flex flex-col items-start gap-y-1 sm:gap-y-2">
                <span>Will Google Play</span>
                <span>Reject Your App?</span>
                <span className="text-primary">Know Before You Submit.</span>
              </span>
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
              Upload an APK or pick your Play listing. We crawl the app, scan
              the build, and email you every blocker.
            </p>
            <PlayPolicyEmailForm
              id={PLAY_POLICY_ACCESS_ID}
              className="mt-8 scroll-mt-28 sm:mt-10"
            />
          </div>
          <PlayPolicyReportCard />
        </div>
      </div>
    </section>
  );
}
