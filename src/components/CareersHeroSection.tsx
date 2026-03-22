"use client";

import { Users, Rocket, Sparkles, Target, Lightbulb, Zap, ChevronDown } from "lucide-react";

const CareersHeroSection = () => {
  const scrollToPositions = () => {
    const element = document.getElementById('open-positions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-edge relative flex min-h-[75vh] w-full items-center justify-center overflow-hidden pb-8 pt-20">
      {/* Animated Grid Pattern */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-30" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ zIndex: 1 }}
      >
        <defs>
          <pattern id="careersGridPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1.5" fill="hsl(var(--primary))" opacity="0.4" />
          </pattern>
          
          <linearGradient id="careersGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="verticalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>

          {/* Connection paths for talent flow */}
          <path id="talent-path-1" d="M 100 400 Q 300 300 500 350 T 900 300" />
          <path id="talent-path-2" d="M 100 300 Q 400 400 600 350 T 1000 400" />
          <path id="talent-path-3" d="M 200 500 Q 400 350 600 400 T 1100 350" />
        </defs>
        
        {/* Dot Grid Background */}
        <rect width="100%" height="100%" fill="url(#careersGridPattern)" />
        
        {/* Horizontal Flowing Lines */}
        {[180, 320, 460, 600].map((y, i) => (
          <g key={`h-career-${y}`}>
            <line
              x1="0"
              y1={y}
              x2="100%"
              y2={y}
              stroke="url(#careersGradient)"
              strokeWidth="1.5"
              opacity="0.4"
            >
              <animate
                attributeName="opacity"
                values="0.2;0.5;0.2"
                dur={`${5 + i}s`}
                repeatCount="indefinite"
              />
            </line>
          </g>
        ))}
        
        {/* Vertical Accent Lines */}
        {[200, 400, 600, 800, 1000, 1200].map((x) => (
          <line
            key={`v-career-${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="100%"
            stroke="url(#verticalGradient)"
            strokeWidth="0.5"
            strokeDasharray="5,15"
            opacity="0.3"
          />
        ))}
        
        {/* Talent Flow Particles - representing people joining */}
        <circle r="6" fill="hsl(var(--primary))">
          <animateMotion dur="6s" repeatCount="indefinite" begin="0s">
            <mpath href="#talent-path-1" />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" dur="6s" repeatCount="indefinite" />
          <animate attributeName="r" values="4;7;4" dur="6s" repeatCount="indefinite" />
        </circle>

        <circle r="5" fill="hsl(var(--primary))">
          <animateMotion dur="7s" repeatCount="indefinite" begin="1.5s">
            <mpath href="#talent-path-2" />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" dur="7s" repeatCount="indefinite" begin="1.5s" />
        </circle>

        <circle r="5" fill="hsl(var(--primary))">
          <animateMotion dur="5.5s" repeatCount="indefinite" begin="3s">
            <mpath href="#talent-path-3" />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" dur="5.5s" repeatCount="indefinite" begin="3s" />
        </circle>

        {/* Innovation Nodes - representing collaborative points */}
        {[
          { x: 300, y: 250 }, { x: 550, y: 350 }, { x: 800, y: 280 },
          { x: 400, y: 420 }, { x: 700, y: 480 }, { x: 950, y: 380 },
          { x: 250, y: 380 }, { x: 600, y: 220 }, { x: 1000, y: 300 }
        ].map((node, i) => (
          <g key={`talent-node-${i}`}>
            {/* Outer pulsing ring */}
            <circle
              cx={node.x}
              cy={node.y}
              r="12"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              opacity="0.3"
            >
              <animate
                attributeName="r"
                values="8;16;8"
                dur={`${3 + (i % 3)}s`}
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.5;0.1;0.5"
                dur={`${3 + (i % 3)}s`}
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
            {/* Core node */}
            <circle
              cx={node.x}
              cy={node.y}
              r="4"
              fill="hsl(var(--primary))"
              opacity="0.7"
            >
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Connection lines between nodes */}
        {[
          { x1: 300, y1: 250, x2: 550, y2: 350 },
          { x1: 550, y1: 350, x2: 800, y2: 280 },
          { x1: 400, y1: 420, x2: 550, y2: 350 },
          { x1: 550, y1: 350, x2: 700, y2: 480 },
          { x1: 800, y1: 280, x2: 950, y2: 380 },
          { x1: 600, y1: 220, x2: 800, y2: 280 },
        ].map((line, i) => (
          <line
            key={`connect-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            strokeDasharray="4,4"
            opacity="0.25"
          >
            <animate
              attributeName="strokeDashoffset"
              values="0;8"
              dur="1s"
              repeatCount="indefinite"
            />
          </line>
        ))}
      </svg>
      
      {/* Floating talent icons - decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block" style={{ zIndex: 2 }}>
        {/* Top left cluster */}
        <div className="absolute left-[10%] top-[25%] animate-float" style={{ animationDelay: '0s' }}>
          <div className="w-14 h-14 rounded-xl bg-card/80 border border-primary/30 flex items-center justify-center shadow-lg backdrop-blur-sm">
            <Lightbulb className="w-7 h-7 text-primary" />
          </div>
        </div>
        
        {/* Top right */}
        <div className="absolute right-[15%] top-[20%] animate-float" style={{ animationDelay: '0.5s' }}>
          <div className="w-16 h-16 rounded-xl bg-card/80 border border-primary/30 flex items-center justify-center shadow-lg backdrop-blur-sm">
            <Rocket className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        {/* Middle left */}
        <div className="absolute left-[8%] top-[55%] animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-12 h-12 rounded-xl bg-card/80 border border-primary/30 flex items-center justify-center shadow-lg backdrop-blur-sm">
            <Target className="w-6 h-6 text-primary" />
          </div>
        </div>
        
        {/* Bottom right */}
        <div className="absolute right-[12%] bottom-[25%] animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="w-14 h-14 rounded-xl bg-card/80 border border-primary/30 flex items-center justify-center shadow-lg backdrop-blur-sm">
            <Sparkles className="w-7 h-7 text-primary" />
          </div>
        </div>
        
        {/* Bottom left */}
        <div className="absolute left-[18%] bottom-[20%] animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-12 h-12 rounded-xl bg-card/80 border border-primary/30 flex items-center justify-center shadow-lg backdrop-blur-sm">
            <Zap className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
      
      {/* Concentric circles motif */}
      <div className="absolute right-0 top-1/4 w-64 h-64 md:w-96 md:h-96 opacity-15 hidden lg:block">
        <div className="absolute inset-0 border border-primary/20 rounded-full"></div>
        <div className="absolute inset-4 border border-primary/20 rounded-full"></div>
        <div className="absolute inset-8 border border-primary/20 rounded-full"></div>
        <div className="absolute inset-12 border border-primary/20 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="section-full relative z-10 mx-auto py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Join Our Team</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="font-heading text-4xl font-medium leading-tight md:text-5xl lg:text-6xl xl:text-7xl">
            <span className="text-foreground">Help shape what </span>
            <span className="text-gradient">quality</span>
            <span className="text-foreground"> looks like in an </span>
            <span className="text-gradient">AI-first world.</span>
          </h1>
          
          {/* Sub-heading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're building the future of software quality assurance. Join a team of innovators, 
            engineers, and dreamers who are redefining what's possible with AI-powered testing.
          </p>
          
          {/* Scroll CTA */}
          <div className="pt-10 flex justify-center">
            <button
              onClick={scrollToPositions}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-primary/40 rounded-full hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer"
            >
              {/* Animated ring */}
              <span className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-30" aria-hidden="true" />
              
              <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                View Open Positions
              </span>
              
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <ChevronDown className="w-5 h-5 text-primary animate-bounce" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersHeroSection;
