import { Lightbulb, Rocket, Users } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing";
import { marketingSectionIntroClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Lightbulb,
    title: "Hackathon / Side Project",
    description:
      "An idea sparks during a hackathon, a weekend experiment, or a conversation about what's missing in our workflow.",
  },
  {
    icon: Users,
    title: "Internal Dogfooding",
    description: "We use it ourselves. If it solves a real problem for our team, it's worth refining and sharing with others.",
  },
  {
    icon: Rocket,
    title: "Shipped as a Tool",
    description: "The best experiments graduate into standalone tools that anyone can use. Built fast, iterated openly.",
  },
] as const;

const LabsProcessSection = () => {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="labs-process-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="labs-process-heading"
          title={
            <>
              How Labs Projects <span className="text-primary">Start</span>
            </>
          }
          description={<p>From spark to shipped. Every tool follows the same path.</p>}
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
          {steps.map((step) => (
            <article
              key={step.title}
              className={cn(
                "relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-6 text-center shadow-sm backdrop-blur-sm md:p-8",
                "motion-safe:hover:border-primary/30 motion-safe:hover:shadow-md",
              )}
            >
              <div className="flex flex-col items-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <step.icon className="h-7 w-7 text-primary" strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {step.title}
                </h3>
                <p className={cn(marketingSectionIntroClass, "mt-4 text-center")}>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabsProcessSection;
