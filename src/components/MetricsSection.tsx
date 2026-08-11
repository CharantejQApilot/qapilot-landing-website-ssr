import { marketingSectionH2Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

interface Metric {
  value: string;
  label: string;
}

const metrics: Metric[] = [
  { value: "20K+", label: "Test Steps Generated" },
  { value: "230K+", label: "Test Steps Recorded" },
  { value: "3Mn+", label: "Test Steps Executed" },
  { value: "3000+", label: "Critical Bugs Surfaced" },
  { value: "5000+", label: "Hours Saved for QE Teams" },
];

/** S03 telemetry strip. Same metrics, horizontal instrument alignment. */
const MetricsSection = () => {
  return (
    <section className="relative w-full overflow-hidden section-edge">
      <div className="section-navy w-full">
        <div className="section-full relative py-8 sm:py-10 md:py-12 2xl:py-16">
          <div className="pointer-events-none absolute inset-0 bg-structured-grid opacity-10" />
          <p className="relative z-10 mb-3 text-left text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground/60 md:mb-4">
            At scale
          </p>
          <h2
            className={cn(
              marketingSectionH2Class,
              "relative z-10 mb-4 text-left md:mb-5",
            )}
          >
            QApilot By The Numbers
          </h2>
          <p className="relative z-10 w-full min-w-0 max-w-none text-left text-base leading-relaxed md:text-lg 2xl:text-xl">
            A live snapshot of platform activity. Every step the system
            generates, runs, and surfaces to keep teams moving.
          </p>
        </div>
      </div>

      <div
        className="w-full border-y border-border bg-background"
        aria-label="Platform metrics"
      >
        <div className="section-full flex w-full overflow-x-auto">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="sig-telemetry-item min-w-[11rem] flex-1 sm:min-w-[12rem]"
              style={{
                paddingLeft: index === 0 ? 0 : undefined,
                paddingRight: index === metrics.length - 1 ? 0 : undefined,
              }}
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-xs sm:tracking-[0.15em]">
                {metric.label}
              </span>
              <span className="font-heading text-2xl font-semibold tracking-tight tabular-nums text-foreground sm:text-3xl min-[1280px]:text-4xl 2xl:text-5xl">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
