"use client";

import { Network, Eye, Database, Users, Plug, Sparkles, Video, Play, BarChart, Navigation, Shield, FileText, ClipboardCheck, Layers, Wrench, EyeOff, Accessibility, Bug, Palette } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const bottomLayerIcons = [
  { label: "Generation", Icon: Sparkles },
  { label: "Recording", Icon: Video },
  { label: "Execution", Icon: Play },
  { label: "Reporting", Icon: BarChart },
];

const agentLayerIcons = [
  { label: "Navigation Agent", Icon: Navigation },
  { label: "Interruption Handler Agent", Icon: Shield },
  { label: "Test Data Generator Agent", Icon: FileText },
];

const topLayerIcons = [
  { label: "Test Case Creation", Icon: ClipboardCheck },
  { label: "Test Suite Creation", Icon: Layers },
  { label: "Auto Healing", Icon: Wrench },
  { label: "Data Masking", Icon: EyeOff },
  { label: "Accessibility", Icon: Accessibility },
  { label: "Bug Reporting", Icon: Bug },
  { label: "Design Testing", Icon: Palette },
];

const AgenticArchitectureDiagram = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative w-full flex flex-col justify-start pt-2 md:pt-4 pb-4 md:pb-8"
    >
      {/* Layer 4 - Top Layer (Icons Only in a Single Container) */}
      <div
        className={`mb-3 md:mb-4 transition-all duration-700 delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-card/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 md:p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02]">
            <h3 className="text-sm md:text-lg font-semibold text-foreground text-center mb-3 md:mb-4">
              Network of AI Agents working together
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2 md:gap-3">
              {topLayerIcons.map(({ label, Icon }, index) => (
                <div 
                  key={label} 
                  className={`relative group ${index >= 4 ? 'hidden md:block' : ''}`}
                >
                  <div className="relative bg-background/60 border border-border/50 rounded-lg p-2 md:p-3 hover:border-blue-500/50 transition-all duration-200 hover:shadow-glow">
                    <div className="flex items-center justify-center">
                      <div className="p-1.5 md:p-2 bg-blue-500/20 rounded-lg">
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Layer 3 - Agent Layer */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-4 transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {agentLayerIcons.map(({ label, Icon }, index) => (
          <div key={label} className="relative group h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-card/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3 md:p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow h-full">
              <div className="text-center">
                <div className="inline-block p-2 md:p-3 bg-blue-500/20 rounded-lg mb-1.5 md:mb-3">
                  <Icon className="w-4 h-4 md:w-6 md:h-6 text-blue-500" />
                </div>
                <h3 className="text-xs md:text-sm font-semibold text-foreground">{label}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Layer 2 - Agent Middleware and Knowledge Graph */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-3 md:mb-4 transition-all duration-700 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Knowledge Graph Block - Simplified on mobile */}
        <div className="relative group h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-card/80 backdrop-blur-sm border border-primary/30 rounded-lg p-3 md:p-6 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
              <div className="p-1.5 md:p-2 bg-primary/20 rounded-lg">
                <Network className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-foreground">The Knowledge Graph</h3>
            </div>
            <div className="flex-1 flex items-center justify-center relative">
              {/* Animated network visualization - smaller on mobile */}
              <div className="relative w-20 h-20 md:w-32 md:h-32">
                {/* Central node */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 animate-pulse bg-primary/30 rounded-full blur-md md:blur-lg"></div>
                    <div className="absolute inset-0 animate-ping bg-primary/20 rounded-full"></div>
                    <Network className="w-10 h-10 md:w-16 md:h-16 text-primary relative z-10 animate-float" />
                  </div>
                </div>
                
                {/* Orbiting nodes - visible only on desktop */}
                <div className="hidden md:block absolute inset-0 animate-[spin_8s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
                </div>
                
                {/* Connection lines effect - visible only on desktop */}
                <div className="hidden md:block absolute inset-0 animate-[spin_12s_linear_infinite_reverse] opacity-30">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/60 rounded-full"></div>
                  <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary/60 rounded-full"></div>
                  <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-primary/60 rounded-full"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-primary/60 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Middleware and Orchestration Block - Simplified on mobile */}
        <div className="relative group h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-card/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3 md:p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
            <h3 className="text-sm md:text-lg font-semibold text-foreground mb-2 md:mb-4">
              Agent Middleware and Orchestration
            </h3>
            <div className="grid grid-cols-2 gap-1.5 md:gap-2">
              {/* Sub-blocks */}
              <div className="bg-background/60 border border-border/50 rounded p-2 md:p-3 hover:border-blue-500/50 transition-all duration-200">
                <span className="text-[10px] md:text-xs font-medium text-foreground">Agent Observability</span>
              </div>
              <div className="bg-background/60 border border-border/50 rounded p-2 md:p-3 hover:border-blue-500/50 transition-all duration-200">
                <span className="text-[10px] md:text-xs font-medium text-foreground">Shared State</span>
              </div>
              <div className="bg-background/60 border border-border/50 rounded p-2 md:p-3 hover:border-blue-500/50 transition-all duration-200">
                <span className="text-[10px] md:text-xs font-medium text-foreground leading-tight">Human-In-The-Loop</span>
              </div>
              <div className="bg-background/60 border border-border/50 rounded p-2 md:p-3 hover:border-blue-500/50 transition-all duration-200">
                <span className="text-[10px] md:text-xs font-medium text-foreground">External Integrations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 1 - Bottom Layer */}
      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {bottomLayerIcons.map(({ label, Icon }, index) => (
          <div key={label} className="relative group" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300"></div>
            <div className="relative bg-card/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-2 md:p-4 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow">
              <div className="text-center">
                <div className="inline-block p-2 md:p-3 bg-blue-500/20 rounded-lg mb-1 md:mb-2">
                  <Icon className="w-4 h-4 md:w-6 md:h-6 text-blue-500" />
                </div>
                <h4 className="text-xs md:text-sm font-semibold text-foreground">{label}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgenticArchitectureDiagram;
