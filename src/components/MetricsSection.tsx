import { HomeDarkAtmosphere } from "@/components/home/HomeDarkAtmosphere";
import { HomeEyebrow } from "@/components/home/HomeEyebrow";
import { HomeSeam } from "@/components/home/HomeSeam";
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

/** S03 telemetry. Full dark chapter. */
const MetricsSection = () => {
  return (
    <section className="relative w-full overflow-hidden section-edge section-navy">
      <HomeSeam invert />
      <HomeDarkAtmosphere glow="left" />
      <div className="section-full relative py-16 md:py-20 lg:pb-0 lg:pt-20">
        <HomeEyebrow invert>At scale</HomeEyebrow>
        <h2
          className={cn(
            marketingSectionH2Class,
            "relative z-10 mb-4 text-left text-white md:mb-5",
          )}
        >
          QApilot By The Numbers
        </h2>
        <p className="relative z-10 w-full min-w-0 max-w-none text-left text-base leading-relaxed !text-white/50 md:text-lg 2xl:text-xl">
          A live snapshot of platform activity. Every step the system generates,
          runs, and surfaces to keep teams moving.
        </p>
      </div>

      <div
        className="relative mt-10 w-full border-t border-white/10 md:mt-12"
        aria-label="Platform metrics"
      >
        <div className="section-full flex w-full overflow-x-auto">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={cn(
                "sig-telemetry-item min-w-[11rem] flex-1 border-white/10 sm:min-w-[12rem]",
                index === metrics.length - 1 && "border-r-0",
              )}
              style={{
                paddingLeft: index === 0 ? 0 : undefined,
                paddingRight: index === metrics.length - 1 ? 0 : undefined,
              }}
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40 sm:text-xs sm:tracking-[0.15em]">
                {metric.label}
              </span>
              <span className="font-heading text-2xl font-semibold tracking-tight tabular-nums text-white sm:text-3xl min-[1280px]:text-4xl 2xl:text-5xl">
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
