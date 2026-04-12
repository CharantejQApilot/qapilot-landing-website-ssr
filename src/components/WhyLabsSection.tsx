import { MarketingSectionHeader } from "@/components/marketing";
import { marketingSectionIntroClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const WhyLabsSection = () => {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="labs-why-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="labs-why-heading"
          title={
            <>
              Why QApilot <span className="text-primary">Labs</span> Exists
            </>
          }
          description={
            <>
              <p className="text-xl font-semibold leading-snug !text-foreground md:text-2xl">
                Building AI systems isn&apos;t just about automation or scale. It&apos;s about making good decisions
                early.
              </p>
              <p>Through QApilot Labs, we:</p>
              <ul className="list-none space-y-3 pl-0">
                {[
                  "Experiment without product constraints,",
                  "Learn from real user feedback,",
                  "And stay close to how builders actually work.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    <span className={cn(marketingSectionIntroClass, "font-medium text-foreground/90")}>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          }
          marginBottomClassName="mb-0"
        />
      </div>
    </section>
  );
};

export default WhyLabsSection;
