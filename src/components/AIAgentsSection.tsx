import { Check } from "lucide-react";

const AIAgentsSection = () => {
  const agents = [
    {
      title: "Exploration with Purpose",
      description: "Intelligent navigation that understands user intent and business workflows"
    },
    {
      title: "Shared Intelligence", 
      description: "Collaborative AI agents that learn from each other's discoveries and insights"
    },
    {
      title: "Real-Time Adaptability",
      description: "Dynamic adjustment to UI changes and new features without manual intervention"
    },
    {
      title: "Behavior-Driven Insights",
      description: "Deep analysis of user behavior patterns to optimize test coverage and accuracy"
    },
    {
      title: "Seamless Collaboration",
      description: "Harmonious integration between multiple AI agents for comprehensive testing"
    }
  ];

  return (
    <section className="py-20 px-4 bg-background-alt">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            AI Agents assisting <span className="text-gradient">spAIder</span>
          </h2>
        </div>

        <div className="space-y-6">
          {agents.map((agent, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors">
              <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                <Check size={14} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {agent.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {agent.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIAgentsSection;