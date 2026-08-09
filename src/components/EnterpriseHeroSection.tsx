import BookDemoCtaButton from "@/components/compare/BookDemoCtaButton";
import { MarketingThesisHero } from "@/components/marketing/MarketingThesisHero";

function EnterpriseHeroSurface() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
        <p className="text-sm font-semibold text-foreground">QApilot Enterprise</p>
      </div>
      <div className="space-y-4 p-4 sm:p-5">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Execution Reports</p>
          {[
            { name: "Crawler_Report_Android", value: "95%" },
            { name: "Crawler_Report_IOS", value: "67%" },
            { name: "Cross-Platform Tests", value: "23%" },
          ].map((row) => (
            <div key={row.name} className="flex items-center justify-between gap-3 border-b border-border/70 pb-2 last:border-b-0 last:pb-0">
              <span className="min-w-0 truncate text-sm text-foreground">{row.name}</span>
              <span className="shrink-0 font-heading text-sm font-semibold tabular-nums text-foreground">
                {row.value}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 border-t border-border pt-4">
          {[
            { label: "Tests Run", value: "847" },
            { label: "Passed", value: "823" },
            { label: "Failed", value: "24" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-lg font-semibold tabular-nums text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EnterpriseHeroSection() {
  return (
    <MarketingThesisHero
      ariaLabel="Enterprise mobile testing"
      titleId="enterprise-hero-title"
      title={
        <>
          <span className="text-primary">Enterprise-Grade</span> Mobile App Testing with QApilot
        </>
      }
      lead="Deliver flawless apps at scale with autonomous smoke tests, flexible execution, and enterprise-ready reporting."
      cta={<BookDemoCtaButton />}
      media={<EnterpriseHeroSurface />}
      fillViewport
    >
      <div className="mb-8 w-full max-w-xl lg:mb-0">
        <div className="sig-telemetry-strip border-border">
          <div className="sig-telemetry-item min-w-0 flex-1">
            <span className="font-heading text-2xl font-semibold tracking-tight text-foreground tabular-nums">
              100K+
            </span>
            <span className="text-sm text-muted-foreground">Test Steps Executed</span>
          </div>
          <div className="sig-telemetry-item min-w-0 flex-1">
            <span className="font-heading text-2xl font-semibold tracking-tight text-foreground tabular-nums">
              99.9%
            </span>
            <span className="text-sm text-muted-foreground">Platform Uptime</span>
          </div>
        </div>
      </div>
    </MarketingThesisHero>
  );
}
