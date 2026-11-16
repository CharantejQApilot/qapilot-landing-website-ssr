import { PLAY_POLICY_SAMPLE_FINDINGS } from "@/lib/play-policy-checker";

const SCORE = 62;
/** Ring radius 50. Arc length is score × 3.14 of a 314 circumference. */
const SCORE_ARC = `${SCORE * 3.14} 314`;

const SEVERITY_CLASS = {
  Blocker: "qg-sev qg-sev--blocker",
  High: "qg-sev qg-sev--high",
  Medium: "qg-sev qg-sev--medium",
  Low: "qg-sev qg-sev--low",
} as const;

export function PlayPolicyReportCard() {
  return (
    <article className="qg-readiness qg-readiness--tilt" aria-label="Sample report">
      <div className="qg-readiness__brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/qapilot-go/qapilot-go-square-256.png"
          alt=""
          width={28}
          height={28}
          style={{ width: 28, height: 28, borderRadius: 6 }}
        />
        <p className="qg-sample">Sample report. Illustrative findings.</p>
      </div>
      <div className="qg-readiness__head">
        <div className="qg-ring">
          <svg
            width="112"
            height="112"
            viewBox="0 0 120 120"
            role="img"
            aria-label={`Readiness score ${SCORE} of 100`}
          >
            <circle className="qg-ring__track" cx="60" cy="60" r="50" />
            <circle
              className="qg-ring__value"
              cx="60"
              cy="60"
              r="50"
              strokeDasharray={SCORE_ARC}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <span className="qg-ring__num">{SCORE}</span>
        </div>
        <div className="qg-readiness__side">
          <p className="qg-readiness__title">Play readiness</p>
          <span className="qg-status qg-status--blocked">Blocked</span>
          <p className="qg-readiness__meta">
            1 blocker · 2 high · 18 of 22 rules ran
          </p>
        </div>
      </div>
      <ul className="qg-readiness__list">
        {PLAY_POLICY_SAMPLE_FINDINGS.map((finding) => (
          <li key={finding.label} className="qg-finding">
            <span className={SEVERITY_CLASS[finding.severity]}>
              {finding.severity}
            </span>
            <span className="qg-finding__text">{finding.label}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
