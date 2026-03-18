import { Badge } from "@/components/ui/badge";

const FeaturesGrid = () => {
  const features = [
    {
      label: "QUICK",
      title: "Instant, script-free test coverage",
      description: "Start testing immediately without writing a single line of code. Our AI analyzes your app and creates comprehensive test coverage in minutes."
    },
    {
      label: "AUTOMATED",
      title: "Lower maintenance and debugging effort", 
      description: "Self-healing tests that adapt to UI changes automatically. Spend less time maintaining tests and more time building features."
    },
    {
      label: "VELOCITY",
      title: "Faster, safer releases",
      description: "Accelerate your release cycle with confidence. Catch bugs before they reach production and ship with certainty."
    },
    {
      label: "INTEGRATIONS", 
      title: "Integrates into your workflows",
      description: "Seamlessly connects with your existing CI/CD pipeline and development tools. No disruption to your current processes."
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
              {/* Grid overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl"></div>
              
              <div className="relative z-10">
                <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary/30 font-bold text-xs uppercase tracking-wide">
                  {feature.label}
                </Badge>
                
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;