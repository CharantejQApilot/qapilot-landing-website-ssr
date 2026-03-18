import { Upload, Cpu, Users, Play, BarChart3 } from "lucide-react";

const TimelineSection = () => {
  const steps = [
    {
      icon: <Upload className="w-6 h-6" />,
      label: "Upload",
      title: "Upload Your App"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      label: "Generate", 
      title: "AI Test Generation"
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "Human in the loop",
      title: "Review & Refine"
    },
    {
      icon: <Play className="w-6 h-6" />,
      label: "Execute",
      title: "Run Tests"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      label: "Analyze",
      title: "View Results"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Revolutionize Your Testing with a Unified AI-Driven Platform
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border transform -translate-y-1/2 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Icon Circle */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full mb-4 relative z-10 shadow-glow">
                  {step.icon}
                </div>
                
                {/* Content */}
                <div>
                  <div className="text-xs font-bold text-primary uppercase tracking-wide mb-1">
                    {step.label}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {step.title}
                  </h3>
                </div>

                {/* Connector line for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden w-px h-8 bg-border mx-auto mt-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;