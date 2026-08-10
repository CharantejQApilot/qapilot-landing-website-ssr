import { MarketingSectionHeader } from "@/components/marketing";
import { marketingSectionIntroClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const HowWeWorkSection = () => {
  return (
    <section
      className="section-edge relative w-full border-t border-border/60 bg-background"
      aria-labelledby="how-we-work-heading"
    >
      <div className="section-full py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="how-we-work-heading"
          title={
            <>
              How We <span className="text-primary">Work</span>
            </>
          }
          description="Low on ceremony, high on ownership. With clear ownership and outcomes over rigid roles."
          marginBottomClassName="mb-10 md:mb-12 2xl:mb-14"
        />

        <div className="max-w-4xl space-y-8">
          <div className="relative border-l-2 border-primary pl-6">
            <p className="text-xl font-semibold leading-snug text-foreground md:text-2xl">
              Our culture is intentionally simple.
            </p>
          </div>

          <p className={cn(marketingSectionIntroClass, "!text-foreground/90")}>
            People take responsibility, step in where needed, and focus on
            outcomes over roles.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              "Engineers pitch in on demos",
              "Marketers understand the product",
              "Everyone ships",
            ].map((label) => (
              <span
                key={label}
                className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-foreground"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur-sm md:p-8">
            <p className="text-lg leading-relaxed text-foreground md:text-xl">
              We take the work seriously,{" "}
              <span className="font-bold text-primary">
                ourselves, not so much.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
