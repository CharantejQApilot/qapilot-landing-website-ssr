"use client";

import {
  Network,
  Plug,
  Sparkles,
  Video,
  Play,
  BarChart,
  ClipboardCheck,
  Layers,
  Wrench,
  EyeOff,
  Accessibility,
  Bug,
  Palette,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const bottomLayerIcons = [
  { label: "Generation", Icon: Sparkles },
  { label: "Recording", Icon: Video },
  { label: "Execution", Icon: Play },
  { label: "Reporting", Icon: BarChart },
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
      {/* BYOA — title, copy, single plug */}
      <div
        className={`mb-3 md:mb-4 transition-all duration-700 delay-75 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-card/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 md:p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02]">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-6 sm:text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 ring-1 ring-blue-500/20">
                <Plug className="h-7 w-7 text-blue-500" strokeWidth={2} aria-hidden />
              </div>
              <div className="max-w-2xl">
                <h3 className="text-sm font-semibold text-foreground md:text-lg">Bring Your Own Agent (BYOA)</h3>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground md:text-xs">
                  Plug in your agents and extend QApilot with your tooling
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Agents */}
      <div
        className={`mb-3 md:mb-4 transition-all duration-700 delay-150 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-card/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 md:p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02]">
            <div className="mb-3 md:mb-4 text-center">
              <h3 className="text-sm md:text-lg font-semibold text-foreground">AI Agents</h3>
              <p className="mt-1 text-[11px] text-muted-foreground md:text-xs">
                Multiple specialized capabilities, one coordinated layer
              </p>
            </div>
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

      {/* Knowledge Graph — full width */}
      <div
        className={`mb-3 md:mb-4 transition-all duration-700 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative group h-full w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative bg-card/80 backdrop-blur-sm border border-primary/40 ring-2 ring-primary/25 ring-offset-2 ring-offset-background rounded-lg p-3 md:p-8 hover:border-primary/50 transition-all duration-300 hover:scale-[1.01] flex flex-col shadow-md shadow-primary/10">
            <div className="flex flex-col items-center gap-2 text-center md:mb-2 md:flex-row md:justify-center md:gap-3 md:text-left">
              <div className="p-1.5 md:p-2 bg-primary/20 rounded-lg">
                <Network className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm md:text-lg font-semibold text-foreground">Knowledge Graph</h3>
                <p className="text-[10px] font-medium text-primary md:text-xs">Core context layer</p>
              </div>
            </div>
            <div className="flex min-h-[10rem] flex-1 items-center justify-center py-6 md:min-h-[12rem] md:py-8">
              <div className="relative h-32 w-32 md:h-44 md:w-44">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/25 rounded-full blur-md md:blur-lg"></div>
                    <Network className="relative z-10 h-20 w-20 animate-float text-primary md:h-28 md:w-28" />
                  </div>
                </div>

                <div className="absolute inset-0 animate-[spin_8s_linear_infinite] max-md:hidden">
                  <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-lg shadow-primary/50"></div>
                  <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-lg shadow-primary/50"></div>
                  <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary shadow-lg shadow-primary/50"></div>
                  <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary shadow-lg shadow-primary/50"></div>
                </div>

                <div className="absolute inset-0 max-md:hidden animate-[spin_12s_linear_infinite_reverse] opacity-30">
                  <div className="absolute left-1/4 top-1/4 h-2 w-2 rounded-full bg-primary/60"></div>
                  <div className="absolute right-1/4 top-1/4 h-2 w-2 rounded-full bg-primary/60"></div>
                  <div className="absolute bottom-1/4 left-1/4 h-2 w-2 rounded-full bg-primary/60"></div>
                  <div className="absolute bottom-1/4 right-1/4 h-2 w-2 rounded-full bg-primary/60"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 1 - Bottom Layer — testing lifecycle */}
      <div
        className={`transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground md:text-xs md:mb-4">
          Testing lifecycle modules
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
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
    </div>
  );
};

export default AgenticArchitectureDiagram;
