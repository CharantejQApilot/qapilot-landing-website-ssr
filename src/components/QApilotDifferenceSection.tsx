"use client";

import { Brain, Clock, Moon, Plug, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const QApilotDifferenceSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: lineRef, isVisible: lineVisible } = useScrollAnimation(0.1);
  const { ref: feature1Ref, isVisible: feature1Visible } = useScrollAnimation(0.3);
  const { ref: feature2Ref, isVisible: feature2Visible } = useScrollAnimation(0.3);
  const { ref: feature3Ref, isVisible: feature3Visible } = useScrollAnimation(0.3);
  const { ref: feature4Ref, isVisible: feature4Visible } = useScrollAnimation(0.3);
  const { ref: feature5Ref, isVisible: feature5Visible } = useScrollAnimation(0.3);

  const AIIllustration = () => (
    <div className="relative w-72 h-48">
      <svg className="w-full h-full" viewBox="0 0 300 200" fill="none">
        {/* Brain neural network */}
        <defs>
          <path id="neuralPath1" d="M 50 100 Q 100 80 150 100 Q 200 120 250 100" />
          <path id="neuralPath2" d="M 50 120 Q 100 100 150 120 Q 200 140 250 120" />
          <path id="neuralPath3" d="M 50 80 Q 100 60 150 80 Q 200 100 250 80" />
        </defs>
        
        {/* Neural pathways */}
        <path d="M 50 100 Q 100 80 150 100 Q 200 120 250 100" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" fill="none" strokeDasharray="2 2" />
        <path d="M 50 120 Q 100 100 150 120 Q 200 140 250 120" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" fill="none" strokeDasharray="2 2" />
        <path d="M 50 80 Q 100 60 150 80 Q 200 100 250 80" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" fill="none" strokeDasharray="2 2" />
        
        {/* Animated neural signals */}
        <circle r="2" fill="hsl(var(--primary))" opacity="0.8">
          <animateMotion dur="4s" repeatCount="indefinite">
            <mpath href="#neuralPath1" />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
        </circle>
        
        <circle r="2" fill="hsl(var(--primary))" opacity="0.8">
          <animateMotion dur="5s" repeatCount="indefinite" begin="1s">
            <mpath href="#neuralPath2" />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;0" dur="5s" repeatCount="indefinite" begin="1s" />
        </circle>
        
        <circle r="2" fill="hsl(var(--primary))" opacity="0.8">
          <animateMotion dur="3.5s" repeatCount="indefinite" begin="2s">
            <mpath href="#neuralPath3" />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;0" dur="3.5s" repeatCount="indefinite" begin="2s" />
        </circle>
        
        {/* Central AI brain */}
        <g transform="translate(150, 100)">
          <circle r="25" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.9" />
          <circle r="20" fill="hsl(var(--primary))" opacity="0.1" />
          {/* Neural nodes */}
          <circle cx="-8" cy="-8" r="3" fill="hsl(var(--primary))" opacity="0.7">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="8" cy="-8" r="3" fill="hsl(var(--primary))" opacity="0.7">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle cx="0" cy="8" r="3" fill="hsl(var(--primary))" opacity="0.7">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="1s" />
          </circle>
          <circle cx="-8" cy="8" r="2" fill="hsl(var(--primary))" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" begin="1.5s" />
          </circle>
          <circle cx="8" cy="8" r="2" fill="hsl(var(--primary))" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" begin="0.3s" />
          </circle>
        </g>
        
        {/* Floating AI particles */}
        <circle cx="80" cy="60" r="1.5" fill="hsl(var(--primary))" opacity="0.6">
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="220" cy="140" r="1" fill="hsl(var(--primary))" opacity="0.4">
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="4s" repeatCount="indefinite" begin="1s" />
        </circle>
      </svg>
    </div>
  );

  const TimeIllustration = () => (
    <div className="relative w-72 h-48">
      <svg className="w-full h-full" viewBox="0 0 300 200" fill="none">
        {/* Clock face */}
        <g transform="translate(150, 100)">
          <circle r="40" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="3" />
          <circle r="35" fill="hsl(var(--background))" opacity="0.8" />
          
          {/* Clock numbers */}
          <text x="0" y="-25" textAnchor="middle" className="text-xs fill-foreground" opacity="0.7">12</text>
          <text x="25" y="5" textAnchor="middle" className="text-xs fill-foreground" opacity="0.7">3</text>
          <text x="0" y="30" textAnchor="middle" className="text-xs fill-foreground" opacity="0.7">6</text>
          <text x="-25" y="5" textAnchor="middle" className="text-xs fill-foreground" opacity="0.7">9</text>
          
          {/* Animated clock hands */}
          <line x1="0" y1="0" x2="0" y2="-20" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" values="0;360" dur="12s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="0" x2="0" y2="-15" stroke="hsl(var(--foreground))" strokeWidth="3" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" values="0;30" dur="12s" repeatCount="indefinite" />
          </line>
          
          {/* Center dot */}
          <circle r="3" fill="hsl(var(--primary))" />
        </g>
        
        {/* Speed lines indicating time saved */}
        <g opacity="0.4">
          <line x1="60" y1="80" x2="90" y2="80" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5 3">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="60" y1="120" x2="85" y2="120" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5 3">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </line>
          <line x1="210" y1="80" x2="240" y2="80" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5 3">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="1s" />
          </line>
          <line x1="215" y1="120" x2="240" y2="120" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5 3">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="1.5s" />
          </line>
        </g>
        
        {/* Time saved indicators */}
        <text x="70" y="50" className="text-xs fill-primary" opacity="0.8">Time</text>
        <text x="65" y="65" className="text-xs fill-primary" opacity="0.8">Saved</text>
        
        <text x="220" y="50" className="text-xs fill-primary" opacity="0.8">Fast</text>
        <text x="215" y="65" className="text-xs fill-primary" opacity="0.8">Cycles</text>
      </svg>
    </div>
  );

  const NightIllustration = () => (
    <div className="relative w-72 h-48">
      <svg className="w-full h-full" viewBox="0 0 300 200" fill="none">
        {/* Night sky background */}
        <rect width="300" height="200" fill="hsl(var(--card))" opacity="0.3" rx="10" />
        
        {/* Moon */}
        <g transform="translate(80, 60)">
          <circle r="25" fill="hsl(var(--primary))" opacity="0.8" />
          <circle r="20" fill="hsl(var(--background))" opacity="0.9" />
          {/* Moon craters */}
          <circle cx="-5" cy="-5" r="3" fill="hsl(var(--muted))" opacity="0.3" />
          <circle cx="5" cy="3" r="2" fill="hsl(var(--muted))" opacity="0.3" />
          <circle cx="-3" cy="8" r="1.5" fill="hsl(var(--muted))" opacity="0.3" />
          
          {/* Moon glow */}
          <circle r="30" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.4;0.2" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
        
        {/* Stars */}
        <circle cx="130" cy="40" r="1" fill="hsl(var(--primary))" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="180" cy="30" r="0.8" fill="hsl(var(--primary))" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="4s" repeatCount="indefinite" begin="1s" />
        </circle>
        <circle cx="220" cy="50" r="1.2" fill="hsl(var(--primary))" opacity="0.7">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite" begin="2s" />
        </circle>
        
        {/* Automated test suite building */}
        <g transform="translate(180, 120)">
          <rect x="-30" y="-20" width="60" height="40" rx="5" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.8" />
          
          {/* Building blocks animation */}
          <rect x="-20" y="-10" width="10" height="6" fill="hsl(var(--primary))" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </rect>
          <rect x="-5" y="-10" width="10" height="6" fill="hsl(var(--primary))" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </rect>
          <rect x="10" y="-10" width="10" height="6" fill="hsl(var(--primary))" opacity="0.6">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="1s" />
          </rect>
          
          {/* Progress indicator */}
          <rect x="-25" y="10" width="50" height="3" fill="hsl(var(--muted))" opacity="0.3" />
          <rect x="-25" y="10" width="0" height="3" fill="hsl(var(--primary))">
            <animate attributeName="width" values="0;50;0" dur="6s" repeatCount="indefinite" />
          </rect>
          
          <text x="0" y="-25" textAnchor="middle" className="text-xs fill-primary" opacity="0.8">Building...</text>
        </g>
        
        {/* Z's for sleep */}
        <text x="50" y="120" className="text-lg fill-primary" opacity="0.5">z</text>
        <text x="45" y="105" className="text-md fill-primary" opacity="0.6">z</text>
        <text x="40" y="90" className="text-sm fill-primary" opacity="0.7">z</text>
      </svg>
    </div>
  );

  const ExtensibleIllustration = () => (
    <div className="relative w-72 h-48">
      <svg className="w-full h-full" viewBox="0 0 300 200" fill="none">
        {/* Core platform */}
        <g transform="translate(150, 100)">
          <rect x="-30" y="-20" width="60" height="40" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" className="text-xs fill-primary">CORE</text>
        </g>
        
        {/* Plugin connectors */}
        <g opacity="0.6">
          <line x1="120" y1="100" x2="90" y2="80" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="180" y1="100" x2="210" y2="80" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="120" y1="100" x2="90" y2="120" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="180" y1="100" x2="210" y2="120" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="3 2" />
        </g>
        
        {/* Plugin modules */}
        <g transform="translate(90, 80)">
          <rect x="-15" y="-10" width="30" height="20" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
          <circle cx="0" cy="0" r="3" fill="hsl(var(--primary))" opacity="0.7">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x="0" y="-15" textAnchor="middle" className="text-xs fill-muted-foreground">Plugin A</text>
        </g>
        
        <g transform="translate(210, 80)">
          <rect x="-15" y="-10" width="30" height="20" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
          <circle cx="0" cy="0" r="3" fill="hsl(var(--primary))" opacity="0.7">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <text x="0" y="-15" textAnchor="middle" className="text-xs fill-muted-foreground">Plugin B</text>
        </g>
        
        <g transform="translate(90, 120)">
          <rect x="-15" y="-10" width="30" height="20" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
          <circle cx="0" cy="0" r="3" fill="hsl(var(--primary))" opacity="0.7">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="1s" />
          </circle>
          <text x="0" y="25" textAnchor="middle" className="text-xs fill-muted-foreground">Custom</text>
        </g>
        
        <g transform="translate(210, 120)">
          <rect x="-15" y="-10" width="30" height="20" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
          <circle cx="0" cy="0" r="3" fill="hsl(var(--primary))" opacity="0.7">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="1.5s" />
          </circle>
          <text x="0" y="25" textAnchor="middle" className="text-xs fill-muted-foreground">BYOA</text>
        </g>
        
        {/* Data flow animation */}
        <circle r="2" fill="hsl(var(--primary))" opacity="0.8">
          <animateMotion dur="3s" repeatCount="indefinite" path="M 90 80 L 150 100" />
          <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
        </circle>
        
        <circle r="2" fill="hsl(var(--primary))" opacity="0.8">
          <animateMotion dur="3s" repeatCount="indefinite" begin="1s" path="M 210 80 L 150 100" />
          <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="1s" />
        </circle>
      </svg>
    </div>
  );

  const AcceleratorIllustration = () => (
    <div className="relative w-72 h-48">
      <svg className="w-full h-full" viewBox="0 0 300 200" fill="none">
        {/* Speed trail background */}
        <defs>
          <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* QE acceleration rocket */}
        <g transform="translate(200, 100)">
          <ellipse rx="20" ry="8" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
          <ellipse rx="15" ry="6" fill="hsl(var(--primary))" opacity="0.2" />
          
          {/* Rocket flames */}
          <g transform="translate(-20, 0)">
            <ellipse rx="8" ry="3" fill="hsl(var(--primary))" opacity="0.6">
              <animate attributeName="rx" values="8;12;8" dur="0.5s" repeatCount="indefinite" />
            </ellipse>
            <ellipse rx="6" ry="2" fill="hsl(var(--primary))" opacity="0.8">
              <animate attributeName="rx" values="6;9;6" dur="0.4s" repeatCount="indefinite" begin="0.1s" />
            </ellipse>
          </g>
          
          <text x="0" y="5" textAnchor="middle" className="text-xs fill-primary font-bold">QE</text>
          
          {/* Speed animation */}
          <animateTransform attributeName="transform" type="translate" values="50,100; 200,100; 200,100" dur="4s" repeatCount="indefinite" />
        </g>
        
        {/* Speed lines */}
        <g opacity="0.5">
          <line x1="20" y1="90" x2="120" y2="90" stroke="url(#speedGradient)" strokeWidth="2">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
          </line>
          <line x1="30" y1="100" x2="130" y2="100" stroke="url(#speedGradient)" strokeWidth="3">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" begin="0.2s" />
          </line>
          <line x1="20" y1="110" x2="120" y2="110" stroke="url(#speedGradient)" strokeWidth="2">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" begin="0.4s" />
          </line>
        </g>
        
        {/* Team transformation indicators */}
        <g transform="translate(50, 150)">
          <circle r="5" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1" />
        </g>
        
        <g transform="translate(100, 150)">
          <circle r="5" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1" />
        </g>
        
        <g transform="translate(150, 150)">
          <circle r="5" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1" />
        </g>
        
        {/* Acceleration arrows */}
        <path d="M 40 130 L 50 135 L 40 140" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </path>
        
        <path d="M 90 130 L 100 135 L 90 140" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.5s" />
        </path>
        
        <path d="M 140 130 L 150 135 L 140 140" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1s" />
        </path>
        
        <text x="100" y="175" textAnchor="middle" className="text-xs fill-primary" opacity="0.8">Teams Accelerated</text>
      </svg>
    </div>
  );

  const features = [
    {
      title: "AI-Native Platform",
      description: "State-of-the-art AI that makes testing effortless.",
      illustration: AIIllustration,
      ref: feature1Ref,
      isVisible: feature1Visible,
    },
    {
      title: "Time Saving",
      description: "Cut execution cycles dramatically with autonomous smoke tests and self-healing runs.",
      illustration: TimeIllustration,
      ref: feature2Ref,
      isVisible: feature2Visible,
    },
    {
      title: "Overnight Test Suite Automation",
      description: "Wake up to complete test coverage with your test suites executed while you sleep.",
      illustration: NightIllustration,
      ref: feature3Ref,
      isVisible: feature3Visible,
    },
    {
      title: "Extensible by Design",
      description: "Add custom automation with BYOA (Bring Your Own Agent) for enterprise-specific needs.",
      illustration: ExtensibleIllustration,
      ref: feature4Ref,
      isVisible: feature4Visible,
    },
    {
      title: "QE Accelerator",
      description: "Accelerate Quality Engineering transformations across teams with scalable, mobile-first automation.",
      illustration: AcceleratorIllustration,
      ref: feature5Ref,
      isVisible: feature5Visible,
    },
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Enterprise Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-primary/20 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-primary/25 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-20 right-40 w-1 h-1 bg-primary/15 rounded-full animate-pulse delay-700"></div>
        </div>
        
        {/* Geometric patterns */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/10 rotate-45 rounded-lg animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-primary/5 rotate-12 rounded-lg animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The <span className="text-primary">QApilot</span> Difference
          </h2>
        </div>

        {/* Central Dotted Flow */}
        <div className="relative max-w-6xl mx-auto">
          <div 
            ref={lineRef as React.RefObject<HTMLDivElement>}
            className={`absolute left-1/2 transform -translate-x-1/2 h-full w-px transition-all duration-1000 ${
              lineVisible 
                ? 'opacity-100 scale-y-100' 
                : 'opacity-0 scale-y-0'
            }`}
            style={{ transformOrigin: 'top' }}
          >
            {/* Subtle dotted line */}
            <div className="w-full h-full bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 opacity-60" 
                 style={{ 
                   maskImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, black 2px, black 6px)',
                   WebkitMaskImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, black 2px, black 6px)'
                 }}>
              {/* Subtle pulsing animation */}
              <div className="w-full h-full bg-primary/20 animate-pulse"></div>
            </div>
          </div>
          
          {/* Features Flow */}
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              ref={feature.ref as React.RefObject<HTMLDivElement>}
              className={`relative mb-24 last:mb-0 transition-all duration-700 ${
                feature.isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : `opacity-0 ${index % 2 === 0 ? '-translate-x-10' : 'translate-x-10'}`
              }`}
            >
              {/* Connection point on central line */}
              <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10 transition-all duration-500 ${
                feature.isVisible ? 'scale-100' : 'scale-0'
              }`}></div>
              
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content Side */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} transition-all duration-700 delay-200 ${
                  feature.isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : `opacity-0 ${index % 2 === 0 ? '-translate-x-10' : 'translate-x-10'}`
                }`}>
                  {/* Connection line to central point */}
                  <div className="relative">
                    <div className={`absolute ${index % 2 === 0 ? 'right-0' : 'left-0'} top-1/2 w-12 h-px bg-gradient-to-${index % 2 === 0 ? 'r' : 'l'} ${index % 2 === 0 ? 'from-primary/60 to-transparent' : 'from-transparent to-primary/60'} transform -translate-y-1/2 lg:block hidden`}></div>
                    
                    <div className={`${index % 2 === 0 ? 'pr-16' : 'pl-16'}`}>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                        <span className="text-primary">{feature.title.split(' ')[0]}</span>
                        {feature.title.includes(' ') && ` ${feature.title.split(' ').slice(1).join(' ')}`}
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Illustration Side */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} flex ${index % 2 === 0 ? 'justify-center lg:justify-start' : 'justify-center lg:justify-end'} transition-all duration-700 delay-300 ${
                  feature.isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : `opacity-0 ${index % 2 === 0 ? 'translate-x-10' : '-translate-x-10'}`
                }`}>
                  {/* Connection line to central point */}
                  <div className="relative">
                    <div className={`absolute ${index % 2 === 0 ? 'left-0' : 'right-0'} top-1/2 w-12 h-px bg-gradient-to-${index % 2 === 0 ? 'l' : 'r'} ${index % 2 === 0 ? 'from-primary/60 to-transparent' : 'from-transparent to-primary/60'} transform -translate-y-1/2 lg:block hidden`}></div>
                    
                    <div className={`${index % 2 === 0 ? 'pl-16' : 'pr-16'} lg:pl-16 lg:pr-16 pl-0 pr-0`}>
                      <feature.illustration />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QApilotDifferenceSection;