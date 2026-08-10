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

/** S03 telemetry strip — same metrics, horizontal instrument alignment. */
const MetricsSection = () => {
  return (
    <section className="relative overflow-hidden section-edge w-full">
      <div className="section-navy w-full">
        <div className="section-full py-8 sm:py-10 md:py-12 2xl:py-16 relative">
          <div className="absolute inset-0 bg-structured-grid opacity-10 pointer-events-none" />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-center text-primary-foreground/60 mb-3 md:mb-4 relative z-10">
            At scale
          </p>
          <h2 className={cn(marketingSectionH2Class, "text-center relative z-10 px-2 mb-4 md:mb-5")}>
            QApilot By The Numbers
          </h2>
          <p className="relative z-10 mx-auto w-full min-w-0 max-w-none px-3 text-center text-base leading-relaxed md:text-lg 2xl:text-xl">
            A live snapshot of platform activity—every step the system generates, runs, and surfaces to keep teams moving.
          </p>
        </div>
      </div>

      <div
        className="sig-telemetry-strip w-full border-border bg-background"
        aria-label="Platform metrics"
      >
        {metrics.map((metric) => (
          <div key={metric.label} className="sig-telemetry-item min-w-[11rem] flex-1 sm:min-w-[12rem]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-xs sm:tracking-[0.15em]">
              {metric.label}
            </span>
            <span className="font-heading text-2xl font-semibold tracking-tight text-foreground tabular-nums sm:text-3xl min-[1280px]:text-4xl 2xl:text-5xl">
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MetricsSection;
