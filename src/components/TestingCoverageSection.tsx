"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Play, Zap, FileText } from "lucide-react";
const TestingCoverageSection = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  const features = [{
    icon: Play,
    title: "Record & Playback",
    description: "Capture user interactions and replay them seamlessly"
  }, {
    icon: Zap,
    title: "Smart Execution",
    description: "Run tests efficiently at scale with intelligent optimization"
  }, {
    icon: FileText,
    title: "Actionable Reports",
    description: "Get clear insights with detailed, shareable test results"
  }];
  return <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 transition-all duration-700 ${isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-8'}`}>
            From <span className="text-primary">Smoke Testing</span> to <span className="text-primary">Full Coverage</span>
          </h2>
          <p className={`text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed transition-all duration-700 ${isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-8'}`} style={{
          animationDelay: '0.2s'
        }}>QApilot's network of intelligent agents deliver autonomous smoke testing while also giving you the flexibility to record and playback tests, execute them at scale, and analyze results in clear, shareable reports. All in one platform.</p>
        </div>

        {/* Features Block */}
        <div className={`bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 shadow-lg transition-all duration-700 ${isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-8'}`} style={{
        animationDelay: '0.4s'
      }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature, index) => {
            const Icon = feature.icon;
            return <div key={index} className={`group text-center transition-all duration-700 ${isVisible ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-8'}`} style={{
              animationDelay: `${0.6 + index * 0.1}s`
            }}>
                  {/* Icon Container */}
                  <div className="relative mb-6 mx-auto w-20 h-20 flex items-center justify-center">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl group-hover:scale-110 transition-transform duration-300 blur-sm"></div>
                    
                    {/* Icon Background */}
                    <div className="relative w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-primary/20">
                      <Icon className="w-8 h-8 text-primary group-hover:text-primary/80 transition-colors duration-300" />
                    </div>
                    
                    {/* Pulse Animation */}
                    <div className="absolute inset-0 rounded-2xl bg-primary/10 animate-ping opacity-20 group-hover:opacity-30"></div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>;
          })}
          </div>
        </div>

        {/* Bottom Accent */}
        <div className={`mt-12 flex justify-center transition-all duration-700 ${isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'}`} style={{
        animationDelay: '1s'
      }}>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
        </div>
      </div>
    </section>;
};
export default TestingCoverageSection;