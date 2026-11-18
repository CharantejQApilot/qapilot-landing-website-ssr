import { PlayPolicyAnalyzeCta } from "@/components/play-policy/PlayPolicyAnalyzeCta";
import { PlayPolicyReportCard } from "@/components/play-policy/PlayPolicyReportCard";

export function PlayPolicyHero() {
  return (
    <section
      className="qg-poster qg-midnight"
      aria-labelledby="play-policy-hero-title"
    >
      <span className="qg-poster__bracket qg-poster__bracket--tl" aria-hidden />
      <span className="qg-poster__bracket qg-poster__bracket--br" aria-hidden />
      <span className="qg-pixel" style={{ right: 192, top: 48 }} aria-hidden />
      <span
        className="qg-pixel qg-pixel--line"
        style={{ right: 144, top: 96 }}
        aria-hidden
      />
      <span
        className="qg-pixel qg-pixel--blue"
        style={{ right: 96, top: 144 }}
        aria-hidden
      />
      <span
        className="qg-pixel qg-pixel--go"
        style={{ right: 48, top: 96 }}
        aria-hidden
      />
      <span className="qg-pixel" style={{ right: 96, top: 240 }} aria-hidden />

      <div className="qg-hero-grid section-full">
        <div>
          <div className="qg-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="qg-lockup"
              src="/brand/qapilot-go/qapilot-go-reversed.svg"
              alt="QApilot Go"
              width={312}
              height={32}
            />
          </div>
          <p className="qg-eyebrow">Play Policy Checker</p>
          <h1 id="play-policy-hero-title" className="qg-hero-title">
            <span>Will Google Play</span>
            <span>Reject Your App?</span>
            <em>Know Before You Submit.</em>
          </h1>
          <p className="qg-hero-lede">
            Upload an APK or pick your Play listing. We crawl the app, scan
            the build, and email you every blocker.
          </p>
          <PlayPolicyAnalyzeCta className="mt-8" />
        </div>
        <PlayPolicyReportCard />
      </div>
    </section>
  );
}
