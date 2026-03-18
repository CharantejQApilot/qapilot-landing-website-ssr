import { Button } from "@/components/ui/button";
import { Brain, Cpu, Target } from "lucide-react";

const SpiderSection = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Intelligent Crawling",
      description: "Advanced AI algorithms explore your app systematically, understanding user flows and navigation patterns."
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Test Case Generation", 
      description: "Automatically generates comprehensive test cases based on discovered functionality and user interactions."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Grounding Engine",
      description: "Contextual understanding of UI elements and business logic for more accurate and reliable test execution."
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Main Content */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Meet Our AI-Crawler: <span className="text-gradient">spAIder</span>
          </h2>
          
          <div className="space-y-6 text-muted-foreground max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed">
              spAIder is our proprietary AI crawler that understands your mobile app like a human tester would. 
              It explores every screen, interaction, and user flow to create comprehensive test coverage automatically.
            </p>
            
            <p className="text-lg leading-relaxed">
              Using advanced machine learning and computer vision, spAIder adapts to your app's unique interface 
              and generates intelligent test scenarios that cover edge cases you might never think to test manually.
            </p>
            
            <p className="text-lg leading-relaxed">
              The result? Complete test automation that requires zero setup time and delivers maximum coverage 
              from day one of your development cycle.
            </p>
          </div>

          <div className="mt-8">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3 rounded-full">
              Meet spAIder
            </Button>
          </div>
        </div>

        {/* Three-column features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 text-primary rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpiderSection;