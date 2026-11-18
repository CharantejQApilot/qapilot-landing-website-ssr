import {
  PLAY_POLICY_EVIDENCE,
  PLAY_POLICY_FAQS,
  PLAY_POLICY_FINDINGS,
  PLAY_POLICY_STAGES,
  PLAY_POLICY_STATUSES,
} from "@/lib/play-policy-checker";

const STATUS_CLASS = {
  BLOCKED: "qg-status qg-status--blocked",
  "NEEDS REVIEW": "qg-status qg-status--review",
  READY: "qg-status qg-status--ready",
} as const;

const FINDING_CLASS = {
  Blocker: "qg-sev qg-sev--blocker",
  High: "qg-sev qg-sev--high",
  Medium: "qg-sev qg-sev--medium",
  Low: "qg-sev qg-sev--low",
} as const;

const iconProps = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

function StageIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg {...iconProps}>
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <path d="M12 14V7" />
        <path d="M9 10l3-3 3 3" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg {...iconProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-4-4" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg {...iconProps}>
        <path d="M12 3l7 3v5c0 4.5-2.8 7.6-7 9-4.2-1.4-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function EvidenceIcon({ source }: { source: string }) {
  if (source === "The build") {
    return (
      <svg {...iconProps}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.3 7L12 12l8.7-5" />
        <path d="M12 22V12" />
      </svg>
    );
  }
  if (source === "The crawl") {
    return (
      <svg {...iconProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-4-4" />
      </svg>
    );
  }
  return (
    <svg {...iconProps}>
      <path d="M4 7h16v12H4z" />
      <path d="M8 7V5h8v2" />
      <path d="M8 12h8" />
      <path d="M8 16h5" />
    </svg>
  );
}

export function PlayPolicyPipeline() {
  return (
    <section className="qg-band" aria-labelledby="play-policy-pipeline">
      <div className="section-full">
        <div className="qg-section-head">
          <p className="qg-eyebrow">What runs</p>
          <h2 id="play-policy-pipeline" className="qg-section-title">
            Four passes. <em>One report.</em>
          </h2>
        </div>
        <ol className="qg-tile-grid qg-tile-grid--4">
          {PLAY_POLICY_STAGES.map((stage, index) => (
            <li
              key={stage.n}
              className={
                index === PLAY_POLICY_STAGES.length - 1
                  ? "qg-tile qg-tile--hero"
                  : "qg-tile"
              }
            >
              <span className="qg-tile__icon">
                <StageIcon index={index} />
              </span>
              <h3 className="qg-tile__title">{stage.title}</h3>
              <p className="qg-tile__text">{stage.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function PlayPolicyVerdict() {
  return (
    <section
      className="qg-band qg-band--mist"
      aria-labelledby="play-policy-verdict"
    >
      <div className="section-full">
        <div className="qg-section-head qg-section-head--wide">
          <p className="qg-eyebrow">The status</p>
          <h2 id="play-policy-verdict" className="qg-section-title qg-oneline">
            A gate, with the reason beside it.
          </h2>
        </div>
        <div className="qg-status-grid">
          {PLAY_POLICY_STATUSES.map((item) => (
            <div key={item.status}>
              <span className={STATUS_CLASS[item.status]}>{item.status}</span>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
        <p className="qg-note qg-oneline">
          The score sits next to coverage. 18 of 22 means four applicable rules
          did not run, and the number does not pretend they did.
        </p>
        <ul className="qg-findings">
          {PLAY_POLICY_FINDINGS.map((finding) => (
            <li key={finding.title} className="qg-finding qg-finding--detail">
              <span className={FINDING_CLASS[finding.severity]}>
                {finding.severity}
              </span>
              <span className="qg-finding__text">
                <span className="qg-finding__title">{finding.title}</span>
                <span className="qg-finding__body">{finding.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function PlayPolicyEvidence() {
  return (
    <section className="qg-band" aria-labelledby="play-policy-evidence">
      <div className="section-full">
        <div className="qg-section-head">
          <p className="qg-eyebrow">The evidence</p>
          <h2 id="play-policy-evidence" className="qg-section-title">
            130+ rules. <em>24 are blockers.</em>
          </h2>
          <p className="qg-lede">
            The catalog is the Play policy set. A report only scores the rules
            that had evidence.
          </p>
        </div>
        <div className="qg-tile-grid qg-tile-grid--3">
          {PLAY_POLICY_EVIDENCE.map((group) => (
            <article key={group.source} className="qg-tile">
              <span className="qg-tile__icon">
                <EvidenceIcon source={group.source} />
              </span>
              <h3 className="qg-tile__title">{group.source}</h3>
              <ul className="qg-tile-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlayPolicyFaqSection() {
  return (
    <section
      className="qg-band qg-band--mist"
      aria-labelledby="play-policy-faqs"
    >
      <div className="section-full">
        <div className="qg-section-head">
          <p className="qg-eyebrow">FAQ</p>
          <h2 id="play-policy-faqs" className="qg-section-title">
            Before you send the app
          </h2>
        </div>
        <dl className="qg-faqs">
          {PLAY_POLICY_FAQS.map((faq) => (
            <div key={faq.question} className="qg-faq">
              <dt>{faq.question}</dt>
              <dd>{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
