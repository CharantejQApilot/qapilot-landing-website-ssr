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

function MetricCard({ metric, isLast }: { metric: Metric; isLast: boolean }) {
  const borderClasses = !isLast
    ? "border-b border-border min-[1280px]:border-b-0 sm:border-r border-border"
    : "";

  return (
    <div
      className={`px-4 py-5 text-center sm:px-6 sm:py-8 2xl:px-8 2xl:py-10 min-w-0 ${borderClasses}`}
    >
      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-muted-foreground mb-2 sm:mb-3 break-words leading-tight">
        {metric.label}
      </p>
      <div className="font-heading text-2xl sm:text-3xl min-[1280px]:text-5xl 2xl:text-6xl font-semibold text-foreground tracking-tight tabular-nums">
        {metric.value}
      </div>
    </div>
  );
}

/** Static metrics — no client JS or rAF count-up (better mobile INP). */
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

      <div className="border-b border-border bg-background w-full">
        <div className="section-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 min-[1280px]:grid-cols-5">
            {metrics.map((metric, index) => (
              <MetricCard
                key={metric.label}
                metric={metric}
                isLast={index === metrics.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
