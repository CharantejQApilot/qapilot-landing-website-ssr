"use client";

import { Button } from "@/components/ui/button";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";
import AgenticArchitectureDiagram from "./AgenticArchitectureDiagram";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const AgenticArchitectureHeroSection = () => {
  const { openForm } = useHubSpotForm();

  const handleGetAccessClick = () => {
    openForm();
  };

  return (
    <section className="relative min-h-[60vh] flex items-start md:items-center justify-start md:justify-center overflow-visible pt-28 sm:pt-40 sm:min-h-[80vh] md:pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 glow-bg"></div>
      
      {/* Professional Geometric Pattern */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-30" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 1 }}
      >
        <defs>
          <pattern id="hexagonPattern" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
            <path 
              d="M 25,0 L 75,0 L 100,43.3 L 75,86.6 L 25,86.6 L 0,43.3 Z" 
              fill="none" 
              stroke="hsl(var(--primary))" 
              strokeWidth="0.5" 
              opacity="0.4"
            />
          </pattern>
          
          <linearGradient id="professionalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Hexagonal Grid Background */}
        <rect width="100%" height="100%" fill="url(#hexagonPattern)" />
        
        {/* Clean Horizontal Lines with Gradient */}
        {[150, 300, 450, 600, 750].map((y, i) => (
          <g key={`h-group-${y}`}>
            <line
              x1="0"
              y1={y}
              x2="100%"
              y2={y}
              stroke="url(#professionalGradient)"
              strokeWidth="1.5"
              opacity="0.5"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.6;0.3"
                dur={`${4 + i}s`}
                repeatCount="indefinite"
              />
            </line>
          </g>
        ))}
        
        {/* Vertical Accent Lines */}
        {[250, 500, 750, 1000].map((x, i) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="100%"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            strokeDasharray="10,20"
            opacity="0.25"
          />
        ))}
        
        {/* Clean Geometric Nodes */}
        {[
          { x: 250, y: 150 }, { x: 500, y: 300 }, { x: 750, y: 450 },
          { x: 400, y: 250 }, { x: 650, y: 400 }, { x: 900, y: 550 },
          { x: 150, y: 350 }, { x: 550, y: 550 }, { x: 850, y: 250 }
        ].map((node, i) => (
          <g key={`node-${i}`}>
            <rect
              x={node.x - 6}
              y={node.y - 6}
              width="12"
              height="12"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              opacity="0.6"
              transform={`rotate(45 ${node.x} ${node.y})`}
            >
              <animate
                attributeName="opacity"
                values="0.4;0.8;0.4"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </rect>
            <circle
              cx={node.x}
              cy={node.y}
              r="2"
              fill="hsl(var(--primary))"
              opacity="0.8"
            />
          </g>
        ))}
        
        {/* Subtle Moving Line Indicator */}
        <line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          opacity="0.4"
        >
          <animate
            attributeName="y1"
            values="0;800;0"
            dur="15s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            values="0;800;0"
            dur="15s"
            repeatCount="indefinite"
          />
        </line>
      </svg>
      
      {/* Concentric circles motif */}
      <div className="absolute right-0 top-1/4 w-64 h-64 md:w-96 md:h-96 opacity-20 hidden md:block">
        {/* Concentric circles motif */}
        <div className="absolute inset-0 border border-primary/20 rounded-full"></div>
        <div className="absolute inset-2 md:inset-4 border border-primary/20 rounded-full"></div>
        <div className="absolute inset-4 md:inset-8 border border-primary/20 rounded-full"></div>
        <div className="absolute inset-6 md:inset-12 border border-primary/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-20 relative z-10">
        <div className="flex flex-col gap-6 md:gap-12 lg:grid lg:grid-cols-2 items-center">
          {/* Left Side - Content */}
          <div className="order-1 lg:order-none z-20 space-y-4 md:space-y-6 animate-fade-in text-center lg:text-left">
            <h1 className={cn(marketingHeroH1Class)}>
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Agentic Workforce
              </span>
              <br />
              <span className="text-foreground">
                for Your{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                  Mobile App
                </span>{" "}
                Testing
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Discover QApilot's intelligent agent ecosystem that transforms mobile app testing through autonomous collaboration
            </p>
            <div className="pt-2 md:pt-4">
              <Button
                onClick={handleGetAccessClick}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105"
              >
                Get Access
              </Button>
            </div>
          </div>

          {/* Right Side - Architecture Diagram */}
          <div className="relative w-full h-auto animate-fade-in order-2 lg:order-none z-10 mt-4 md:mt-0 overflow-visible" style={{ animationDelay: "0.2s" }}>
            <AgenticArchitectureDiagram />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgenticArchitectureHeroSection;
