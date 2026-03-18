import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Resource {
  header: string;
  subtext: string;
  text: string;
  cta: string;
  ctaLink: string;
  illustration: string;
  reverse?: boolean;
  highlightWord?: string;
}

const resources: Resource[] = [
  {
    header: "Deep Links: Jump Straight to What Matters.",
    subtext: "Navigate complex app flows in seconds.",
    text: "QApilot's DeepLinks let you test any screen directly - authentication, installs, or web-to-app journeys, without the clicks in between.",
    cta: "Explore DeepLinks",
    ctaLink: "/blogs/deep-links-jump-straight-to-what-matters",
    illustration: "/lovable-uploads/deeplinks-illustration.jpg",
    reverse: false,
    highlightWord: "Deep Links"
  },
  {
    header: "Debug Mode: Precision in Every Step.",
    subtext: "Run, pause, and inspect test cases in real time.",
    text: "With Debug Mode, you can trace failures, view screenshots, and analyze step-level data for faster, deeper insight, all inside QApilot.",
    cta: "Explore Debug Mode",
    ctaLink: "/blogs/debug-mode-precision-in-every-step",
    illustration: "/lovable-uploads/debug-mode-illustration.jpg",
    reverse: true,
    highlightWord: "Debug Mode"
  },
];

const FeaturedResourcesSection = () => {
  return (
    <section className="pt-0 pb-0 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {resources.map((resource, index) => (
          <div
            key={index}
            className={`grid lg:grid-cols-2 gap-12 items-center mb-4 last:mb-0 ${
              resource.reverse ? "lg:grid-flow-dense" : ""
            }`}
          >
            {/* Content */}
            <div className={`space-y-6 ${resource.reverse ? "lg:col-start-2" : ""}`}>
              <div className="space-y-3">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                  {resource.highlightWord ? (
                    <>
                      <span className="text-primary">{resource.highlightWord}</span>
                      {resource.header.replace(resource.highlightWord, "")}
                    </>
                  ) : (
                    resource.header
                  )}
                </h2>
                <p className="text-xl text-primary font-semibold">
                  {resource.subtext}
                </p>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {resource.text}
              </p>
              <Link href={resource.ctaLink}>
                <Button 
                  size="lg" 
                  className="group mt-4"
                >
                  {resource.cta}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* SVG Animation */}
            <div className={`relative ${resource.reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}>
              <div className="aspect-[4/3] flex items-center justify-center">
                {index === 0 ? (
                  // Deep Links Animation - Complex interconnected flow
                  <svg viewBox="0 0 500 400" className="w-full h-full">
                    <defs>
                      <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0.3 }} />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Central phone device */}
                    <g className="animate-[float_4s_ease-in-out_infinite]">
                      <rect x="200" y="100" width="100" height="180" rx="12" fill="hsl(var(--background))" stroke="url(#linkGradient)" strokeWidth="3" filter="url(#glow)" />
                      <rect x="210" y="110" width="80" height="160" rx="6" fill="hsl(var(--primary))" opacity="0.1" />
                      
                      {/* Screen content - multiple app screens */}
                      <g opacity="0.6">
                        <rect x="220" y="125" width="60" height="15" rx="3" fill="hsl(var(--primary))" className="animate-[pulse_2s_ease-in-out_infinite_0.2s]" />
                        <rect x="220" y="150" width="60" height="15" rx="3" fill="hsl(var(--primary))" className="animate-[pulse_2s_ease-in-out_infinite_0.4s]" />
                        <rect x="220" y="175" width="60" height="15" rx="3" fill="hsl(var(--primary))" className="animate-[pulse_2s_ease-in-out_infinite_0.6s]" />
                        <rect x="220" y="200" width="60" height="15" rx="3" fill="hsl(var(--primary))" className="animate-[pulse_2s_ease-in-out_infinite_0.8s]" />
                        <rect x="220" y="225" width="60" height="15" rx="3" fill="hsl(var(--primary))" className="animate-[pulse_2s_ease-in-out_infinite_1s]" />
                      </g>
                      
                      {/* Target indicator */}
                      <circle cx="250" cy="182" r="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" className="animate-ping" />
                    </g>
                    
                    {/* Orbiting connection nodes */}
                    <g className="animate-[spin_20s_linear_infinite]" style={{ transformOrigin: "250px 200px" }}>
                      <circle cx="250" cy="80" r="12" fill="hsl(var(--primary))" opacity="0.8" filter="url(#glow)" />
                      <circle cx="380" cy="200" r="12" fill="hsl(var(--primary))" opacity="0.8" filter="url(#glow)" />
                      <circle cx="250" cy="320" r="12" fill="hsl(var(--primary))" opacity="0.8" filter="url(#glow)" />
                      <circle cx="120" cy="200" r="12" fill="hsl(var(--primary))" opacity="0.8" filter="url(#glow)" />
                    </g>
                    
                    {/* Connection paths with animated dashes */}
                    <g opacity="0.6">
                      <path d="M 250 90 L 250 100" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" className="animate-[flow_2s_linear_infinite]" />
                      <path d="M 300 150 Q 340 175 370 200" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" className="animate-[flow_2s_linear_infinite_0.5s]" />
                      <path d="M 250 280 L 250 310" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" className="animate-[flow_2s_linear_infinite_1s]" />
                      <path d="M 200 150 Q 160 175 130 200" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" className="animate-[flow_2s_linear_infinite_1.5s]" />
                    </g>
                    
                    {/* Data packets flowing */}
                    <g className="animate-[flow_3s_ease-in-out_infinite]">
                      <circle cx="250" cy="95" r="4" fill="hsl(var(--primary))" />
                      <circle cx="335" cy="185" r="4" fill="hsl(var(--primary))" />
                      <circle cx="250" cy="295" r="4" fill="hsl(var(--primary))" />
                      <circle cx="165" cy="185" r="4" fill="hsl(var(--primary))" />
                    </g>
                    
                    {/* External service icons */}
                    <g opacity="0.4">
                      <rect x="100" y="180" width="40" height="40" rx="8" fill="hsl(var(--primary))" />
                      <rect x="360" y="180" width="40" height="40" rx="8" fill="hsl(var(--primary))" />
                      <rect x="230" y="50" width="40" height="40" rx="8" fill="hsl(var(--primary))" />
                      <rect x="230" y="310" width="40" height="40" rx="8" fill="hsl(var(--primary))" />
                    </g>
                  </svg>
                ) : (
                  // Debug Mode Animation - Code inspection with interactive elements
                  <svg viewBox="0 0 500 400" className="w-full h-full">
                    <defs>
                      <linearGradient id="debugGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0.2 }} />
                      </linearGradient>
                      <filter id="debugGlow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Main code window */}
                    <rect x="50" y="60" width="300" height="280" rx="8" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.9" />
                    
                    {/* Window header */}
                    <rect x="50" y="60" width="300" height="30" rx="8" fill="url(#debugGradient)" />
                    <circle cx="70" cy="75" r="5" fill="hsl(var(--destructive))" className="animate-pulse" />
                    <circle cx="90" cy="75" r="5" fill="hsl(var(--primary))" opacity="0.5" />
                    <circle cx="110" cy="75" r="5" fill="hsl(var(--primary))" opacity="0.5" />
                    
                    {/* Code lines with syntax highlighting effect */}
                    <g opacity="0.7">
                      <rect x="70" y="110" width="80" height="8" rx="2" fill="hsl(var(--primary))" opacity="0.6" className="animate-[pulse_3s_ease-in-out_infinite]" />
                      <rect x="160" y="110" width="50" height="8" rx="2" fill="hsl(var(--primary))" opacity="0.4" className="animate-[pulse_3s_ease-in-out_infinite_0.2s]" />
                      
                      <rect x="90" y="135" width="100" height="8" rx="2" fill="hsl(var(--primary))" opacity="0.5" className="animate-[pulse_3s_ease-in-out_infinite_0.4s]" />
                      <rect x="200" y="135" width="60" height="8" rx="2" fill="hsl(var(--primary))" opacity="0.3" className="animate-[pulse_3s_ease-in-out_infinite_0.6s]" />
                      
                      {/* Highlighted debug line */}
                      <rect x="65" y="155" width="250" height="20" rx="2" fill="hsl(var(--primary))" opacity="0.2" className="animate-[pulse_2s_ease-in-out_infinite]" />
                      <rect x="70" y="160" width="70" height="8" rx="2" fill="hsl(var(--destructive))" opacity="0.8" />
                      <rect x="150" y="160" width="90" height="8" rx="2" fill="hsl(var(--primary))" opacity="0.6" />
                      
                      <rect x="90" y="185" width="80" height="8" rx="2" fill="hsl(var(--primary))" opacity="0.4" className="animate-[pulse_3s_ease-in-out_infinite_0.8s]" />
                      <rect x="180" y="185" width="60" height="8" rx="2" fill="hsl(var(--primary))" opacity="0.3" className="animate-[pulse_3s_ease-in-out_infinite_1s]" />
                      
                      <rect x="70" y="210" width="90" height="8" rx="2" fill="hsl(var(--primary))" opacity="0.5" className="animate-[pulse_3s_ease-in-out_infinite_1.2s]" />
                      <rect x="170" y="210" width="70" height="8" rx="2" fill="hsl(var(--primary))" opacity="0.4" className="animate-[pulse_3s_ease-in-out_infinite_1.4s]" />
                      
                      <rect x="90" y="235" width="100" height="8" rx="2" fill="hsl(var(--primary))" opacity="0.3" className="animate-[pulse_3s_ease-in-out_infinite_1.6s]" />
                      
                      <rect x="70" y="260" width="60" height="8" rx="2" fill="hsl(var(--primary))" opacity="0.5" className="animate-[pulse_3s_ease-in-out_infinite_1.8s]" />
                      <rect x="140" y="260" width="80" height="8" rx="2" fill="hsl(var(--primary))" opacity="0.4" className="animate-[pulse_3s_ease-in-out_infinite_2s]" />
                    </g>
                    
                    {/* Breakpoints */}
                    <circle cx="62" cy="164" r="6" fill="hsl(var(--destructive))" className="animate-pulse" filter="url(#debugGlow)" />
                    <circle cx="62" cy="189" r="5" fill="hsl(var(--primary))" opacity="0.4" />
                    <circle cx="62" cy="214" r="5" fill="hsl(var(--primary))" opacity="0.4" />
                    
                    {/* Magnifying glass inspection tool */}
                    <g className="animate-[float_4s_ease-in-out_infinite]">
                      <circle cx="380" cy="180" r="50" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="4" opacity="0.9" filter="url(#debugGlow)" />
                      <line x1="415" y1="215" x2="450" y2="250" stroke="hsl(var(--primary))" strokeWidth="5" strokeLinecap="round" />
                      
                      {/* Magnified content */}
                      <g opacity="0.8">
                        <text x="360" y="170" fill="hsl(var(--primary))" fontSize="12" fontFamily="monospace">{"{"}</text>
                        <text x="365" y="185" fill="hsl(var(--primary))" fontSize="10" fontFamily="monospace">val:</text>
                        <text x="365" y="195" fill="hsl(var(--destructive))" fontSize="10" fontFamily="monospace">null</text>
                        <text x="360" y="205" fill="hsl(var(--primary))" fontSize="12" fontFamily="monospace">{"}"}</text>
                      </g>
                      
                      {/* Scan line effect */}
                      <line x1="340" y1="180" x2="420" y2="180" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.5" className="animate-[pulse_2s_ease-in-out_infinite]" />
                    </g>
                    
                    {/* Control buttons */}
                    <g className="animate-[pulse_2s_ease-in-out_infinite]">
                      <rect x="70" y="300" width="30" height="25" rx="4" fill="hsl(var(--primary))" opacity="0.3" />
                      <polygon points="80,307 80,318 90,312.5" fill="hsl(var(--primary))" />
                    </g>
                    
                    <g opacity="0.5">
                      <rect x="110" y="300" width="30" height="25" rx="4" fill="hsl(var(--primary))" opacity="0.2" />
                      <rect x="118" y="307" width="4" height="11" rx="1" fill="hsl(var(--primary))" />
                      <rect x="126" y="307" width="4" height="11" rx="1" fill="hsl(var(--primary))" />
                    </g>
                    
                    {/* Data flow visualization */}
                    <g className="animate-[flow_3s_linear_infinite]" opacity="0.4">
                      <path d="M 350 80 Q 380 100 380 130" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4,4" fill="none" />
                      <circle cx="380" cy="130" r="4" fill="hsl(var(--primary))" />
                    </g>
                    
                    {/* Step counter */}
                    <g opacity="0.6">
                      <circle cx="420" cy="300" r="20" fill="hsl(var(--primary))" opacity="0.2" className="animate-pulse" />
                      <text x="412" y="308" fill="hsl(var(--primary))" fontSize="16" fontWeight="bold">3</text>
                    </g>
                  </svg>
                )}
              </div>
              {/* Decorative element */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedResourcesSection;
