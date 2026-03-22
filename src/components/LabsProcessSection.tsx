import { Lightbulb, Users, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Hackathon / Side Project",
    description: "An idea sparks during a hackathon, a weekend experiment, or a conversation about what's missing in our workflow.",
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
];

const LabsProcessSection = () => {
  return (
    <section className="section-edge relative w-full border-t border-border py-10 md:py-14">
      <div className="section-full mx-auto max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How Labs Projects <span className="text-primary">Start</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From spark to shipped. Every tool follows the same path.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-start">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <div
                className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-glow transition-all duration-300 w-full animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <step.icon size={28} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>

              {/* Arrow between cards (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight size={20} className="text-primary/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabsProcessSection;
