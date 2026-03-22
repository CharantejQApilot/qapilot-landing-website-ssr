"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const TestingModesSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const modes = [
    {
      title: "Fully Autonomous",
      description: "AI handles most of your testing workflow",
      segments: [
        { name: "Crawler (Sanity Testing)", percentage: 33, pattern: "dots", color: "hsl(220, 90%, 65%)" },
        { name: "CoPilot", percentage: 34, pattern: "diagonal", color: "hsl(215, 85%, 55%)" },
        { name: "RPA/Appium", percentage: 33, pattern: "waves", color: "hsl(210, 80%, 45%)" }
      ]
    },
    {
      title: "AI-Assisted",
      description: "Blend of AI intelligence and manual control",
      segments: [
        { name: "CoPilot", percentage: 50, pattern: "diagonal", color: "hsl(215, 85%, 55%)" },
        { name: "RPA/Appium", percentage: 50, pattern: "waves", color: "hsl(210, 80%, 45%)" }
      ]
    },
    {
      title: "Continuous Automation",
      description: "Traditional approach with full control",
      segments: [
        { name: "RPA & Appium", percentage: 100, pattern: "waves", color: "hsl(210, 80%, 45%)" }
      ]
    }
  ];

  const getPatternSVG = (pattern: string, color: string) => {
    const patternId = `${pattern}-${color.replace(/[^a-zA-Z0-9]/g, '')}`;
    
    switch (pattern) {
      case "dots":
        return (
          <defs>
            <pattern id={patternId} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill={color} opacity="0.8" />
              <circle cx="10" cy="10" r="3" fill="white" opacity="0.3" />
            </pattern>
          </defs>
        );
      case "diagonal":
        return (
          <defs>
            <pattern id={patternId} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill={color} opacity="0.8" />
              <path d="M0,10 L10,0" stroke="white" strokeWidth="1" opacity="0.3" />
              <path d="M-1,1 L1,-1 M9,11 L11,9" stroke="white" strokeWidth="1" opacity="0.3" />
            </pattern>
          </defs>
        );
      case "waves":
        return (
          <defs>
            <pattern id={patternId} x="0" y="0" width="20" height="8" patternUnits="userSpaceOnUse">
              <rect width="20" height="8" fill={color} opacity="0.8" />
              <path d="M0,4 Q5,0 10,4 T20,4" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
            </pattern>
          </defs>
        );
      default:
        return null;
    }
  };

  return (
    <section ref={ref} className="section-edge relative w-full overflow-hidden border-t border-border bg-gradient-to-br from-background via-secondary/5 to-background pt-24 pb-12">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 1200 800">
          {/* Floating geometric shapes */}
          <circle
            cx="100"
            cy="100"
            r="2"
            fill="hsl(220, 90%, 65%)"
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-30' : 'opacity-0'
            }`}
          >
            <animate attributeName="cy" values="100;150;100" dur="8s" repeatCount="indefinite" />
          </circle>
          <circle
            cx="200"
            cy="200"
            r="3"
            fill="hsl(215, 85%, 55%)"
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-20' : 'opacity-0'
            }`}
          >
            <animate attributeName="cx" values="200;250;200" dur="10s" repeatCount="indefinite" />
          </circle>
          <circle
            cx="1000"
            cy="150"
            r="2"
            fill="hsl(210, 80%, 45%)"
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-25' : 'opacity-0'
            }`}
          >
            <animate attributeName="cy" values="150;100;150" dur="12s" repeatCount="indefinite" />
          </circle>
          <circle
            cx="1100"
            cy="300"
            r="3"
            fill="hsl(220, 90%, 65%)"
            className={`transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-20' : 'opacity-0'
            }`}
          >
            <animate attributeName="cx" values="1100;1050;1100" dur="9s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      
      <div className="section-full relative z-10 mx-auto max-w-7xl">
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight pb-2">
            <span className="text-foreground">Adapt </span>
            <span className="text-primary">Testing</span>
            <span className="text-foreground"> to Your Needs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            With QApilot, you choose how much AI runs your tests. Fully autonomous, AI-assisted, or traditional scripted automation.
          </p>
        </div>

        {/* Main comparison container */}
        <div className={`bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 transition-all duration-700 ease-out delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {modes.map((mode, index) => (
              <div
                key={mode.title}
                className={`group transition-all duration-600 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                {/* Mode header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                    {mode.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {mode.description}
                  </p>
                </div>

                {/* Testing workload visualization - Fixed height for consistency */}
                <div className="bg-background/80 rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/10 h-64">
                  {/* Stacked blocks with gaps */}
                  <div className="relative h-48 w-full bg-border/20 rounded-lg overflow-hidden">
                    <svg width="100%" height="100%" className="absolute inset-0">
                      {mode.segments.map((segment, segmentIndex) => {
                        // Calculate gaps and heights - total available height is 192px
                        const totalGaps = (mode.segments.length - 1) * 4; // 4px gap between segments
                        const availableHeight = 192 - totalGaps;
                        const startY = mode.segments.slice(0, segmentIndex).reduce((acc, seg) => acc + (seg.percentage / 100) * availableHeight + (segmentIndex > 0 ? 4 : 0), 0) + (segmentIndex * 4);
                        const height = (segment.percentage / 100) * availableHeight;
                        const patternId = `${segment.pattern}-${segment.color.replace(/[^a-zA-Z0-9]/g, '')}`;
                        
                        return (
                          <g key={segment.name}>
                            {getPatternSVG(segment.pattern, segment.color)}
                            <rect
                              x="0"
                              y={startY}
                              width="100%"
                              height={height}
                              fill={`url(#${patternId})`}
                              className={`transition-all duration-800 ease-out ${
                                isVisible ? 'opacity-100' : 'opacity-0'
                              }`}
                              style={{
                                transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
                                transformOrigin: 'bottom',
                                transitionDelay: `${(index + segmentIndex) * 200 + 400}ms`
                              }}
                            />
                            {/* Segment label */}
                            <text
                              x="50%"
                              y={startY + height / 2}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="fill-white text-xs font-medium"
                              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                            >
                              {segment.name}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestingModesSection;