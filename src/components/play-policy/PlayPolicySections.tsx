import { HomeEyebrow } from "@/components/home/HomeEyebrow";
import { MarketingSection, MarketingSectionHeader } from "@/components/marketing";
import {
  PLAY_POLICY_EVIDENCE,
  PLAY_POLICY_FAQS,
  PLAY_POLICY_FINDINGS,
  PLAY_POLICY_STAGES,
  PLAY_POLICY_STATUSES,
} from "@/lib/play-policy-checker";
import { marketingSectionH2Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const STATUS_TONE = {
  BLOCKED: "!text-destructive",
  "NEEDS REVIEW": "!text-amber-200",
  READY: "!text-white",
} as const;

export function PlayPolicyPipeline() {
  return (
    <MarketingSection aria-labelledby="play-policy-pipeline">
      <MarketingSectionHeader
        id="play-policy-pipeline"
        eyebrow="What runs"
        title={
          <>
            Four passes. <span className="text-primary">One report.</span>
          </>
        }
        marginBottomClassName="mb-8 md:mb-10"
      />
      <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-4">
        {PLAY_POLICY_STAGES.map((stage) => (
          <li key={stage.n} className="bg-card px-5 py-6 sm:px-6">
            <p className="font-heading text-sm font-semibold tracking-[0.16em] text-primary">
              {stage.n}
            </p>
            <h3 className="mt-3 font-heading text-xl font-semibold tracking-tight text-foreground">
              {stage.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {stage.body}
            </p>
          </li>
        ))}
      </ol>
    </MarketingSection>
  );
}

export function PlayPolicyVerdict() {
  return (
    <MarketingSection
      surface="navy"
      glow="top"
      aria-labelledby="play-policy-verdict"
    >
      <HomeEyebrow invert>The status</HomeEyebrow>
      <h2
        id="play-policy-verdict"
        className={cn(marketingSectionH2Class, "max-w-3xl text-balance")}
      >
        A gate, with the reason beside it.
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 border-y border-white/15 py-6 md:mt-10 md:grid-cols-3 md:gap-8 md:py-8">
        {PLAY_POLICY_STATUSES.map((item) => (
          <div key={item.status}>
            <h3
              className={cn(
                "font-heading text-2xl font-semibold tracking-tight sm:text-3xl",
                STATUS_TONE[item.status],
              )}
            >
              {item.status}
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed sm:text-base">
              {item.body}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed sm:text-base">
        The score sits next to coverage. 18 of 22 means four applicable rules
        did not run, and the number does not pretend they did.
      </p>
      <ul className="mt-8 divide-y divide-white/10 border-t border-white/10">
        {PLAY_POLICY_FINDINGS.map((finding) => (
          <li
            key={finding.title}
            className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8 sm:py-6"
          >
            <p
              className={cn(
                "text-[11px] font-semibold uppercase tracking-[0.16em]",
                finding.severity === "Blocker"
                  ? "!text-destructive"
                  : "!text-white/50",
              )}
            >
              {finding.severity}
            </p>
            <div>
              <p className="font-heading text-lg font-semibold tracking-tight !text-white sm:text-xl">
                {finding.title}
              </p>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed sm:text-base">
                {finding.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </MarketingSection>
  );
}

export function PlayPolicyEvidence() {
  return (
    <MarketingSection aria-labelledby="play-policy-evidence">
      <MarketingSectionHeader
        id="play-policy-evidence"
        eyebrow="The evidence"
        title={
          <>
            130+ rules. <span className="text-primary">24 are blockers.</span>
          </>
        }
        description="The catalog is the Play policy set. A report only scores the rules that had evidence."
        marginBottomClassName="mb-8 md:mb-10"
      />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
        {PLAY_POLICY_EVIDENCE.map((group) => (
          <div key={group.source}>
            <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
              {group.source}
            </h3>
            <ul className="mt-4 space-y-3 border-t border-border pt-4">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </MarketingSection>
  );
}

export function PlayPolicyFaqSection() {
  return (
    <MarketingSection surface="tint" aria-labelledby="play-policy-faqs">
      <MarketingSectionHeader
        id="play-policy-faqs"
        eyebrow="FAQ"
        title="Before you send the app"
        marginBottomClassName="mb-2 md:mb-4"
      />
      <dl>
        {PLAY_POLICY_FAQS.map((faq) => (
          <div
            key={faq.question}
            className="grid grid-cols-1 gap-2 border-t border-border py-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-10 md:py-7"
          >
            <dt className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
              {faq.question}
            </dt>
            <dd className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </MarketingSection>
  );
}
