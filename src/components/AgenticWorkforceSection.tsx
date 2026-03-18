"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Smartphone, Navigation, AlertTriangle, Database, FileText, Bug, Activity, Eye, Palette } from "lucide-react";

const AgenticWorkforceSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: coreRef, isVisible: coreVisible } = useScrollAnimation(0.3);
  const { ref: downstreamRef, isVisible: downstreamVisible } = useScrollAnimation(0.4);
  const { ref: byoaRef, isVisible: byoaVisible } = useScrollAnimation(0.5);

  const upstreamAgents = [
    {
      name: "Navigation Agent",
      description: "Paths through the app",
      angle: 0,
      delay: "0s"
    },
    {
      name: "Interruption Handling Agent", 
      description: "Pop-ups, errors",
      angle: 120,
      delay: "0.5s"
    },
    {
      name: "Test Data Generator Agent",
      description: "Form autofill, mock data",
      angle: 240,
      delay: "1s"
    }
  ];

  const downstreamAgents = [
    { name: "Test Suite Creation Agent", icon: FileText, description: "Creates comprehensive test suites" },
    { name: "Test Case Generation Agent", icon: Database, description: "Generates specific test cases" },
    { name: "Bug Reporting Agent", icon: Bug, description: "Identifies and reports bugs" },
    { name: "Monkey Testing Agent", icon: Activity, description: "Random stress testing" },
    { name: "Accessibility Testing Agent", icon: Eye, description: "Ensures app accessibility" },
    { name: "Design Validation Agent", icon: Palette, description: "Validates UI/UX design" }
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-background to-muted/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-secondary/20 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-accent/20 rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-20 right-1/3 w-4 h-4 bg-primary/10 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      </div>

      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div 
          ref={titleRef as any}
          className={`text-center mb-20 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-primary">Agentic</span> Workforce for Your{" "}
            <span className="text-primary">Mobile App</span> Testing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover QApilot's intelligent agent ecosystem that transforms mobile app testing through autonomous collaboration
          </p>
        </div>

        {/* Core Section - Crawler with Upstream Agents */}
        <div 
          ref={coreRef as any}
          className={`mb-24 transition-all duration-1000 ${
            coreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Core Intelligence Layer</h3>
            <p className="text-muted-foreground">The crawler sits at the heart of our agentic architecture, supported by specialized upstream agents</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Flow diagram */}
            <div className="flex items-center justify-center gap-16 xl:gap-24 flex-wrap lg:flex-nowrap">
              {/* Mobile App Crawler */}
              <div 
                className={`flex flex-col items-center transition-all duration-1000 ${
                  coreVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ animationDelay: '0.5s' }}
              >
                <div className="relative">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 rounded-2xl p-8 min-w-[240px] group hover:scale-105 transition-transform duration-300">
                    {/* Mobile phone with scanning animation */}
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center relative">
                      <Smartphone className="w-8 h-8 text-primary relative z-10" />
                      
                      {/* Scanning beam animation */}
                      <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent transform -translate-y-full animate-[slide-down_2s_ease-in-out_infinite]"></div>
                      </div>
                      
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-xl border border-primary/50 animate-ping"></div>
                    </div>
                    
                    <h4 className="text-lg font-bold text-center text-primary">Mobile App<br />Crawler</h4>
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl animate-pulse"></div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center mx-4">
                <div className="w-12 h-0.5 bg-primary/60 relative">
                  <div className="absolute right-0 top-0 w-2 h-2 border-r-2 border-t-2 border-primary/60 transform rotate-45 -translate-y-1"></div>
                  <div className="w-12 h-0.5 bg-primary/60 animate-pulse absolute top-0"></div>
                </div>
              </div>

              {/* Supporting Agents */}
              <div className="flex flex-col items-center space-y-8 px-6">
                <h4 className="font-semibold text-center text-sm text-muted-foreground">Supported by</h4>
                <div className="grid grid-cols-1 gap-6 min-w-[280px]">
                  {upstreamAgents.map((agent, index) => (
                    <div 
                      key={index}
                      className={`group flex items-center gap-4 p-4 bg-card/50 border border-border/50 rounded-lg hover:bg-card transition-all duration-300 hover:scale-105 ${
                        coreVisible ? 'animate-fade-in' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${index * 0.2 + 0.5}s` }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {agent.name.includes('Navigation') && <Navigation className="w-6 h-6 text-primary" />}
                        {agent.name.includes('Interruption') && <AlertTriangle className="w-6 h-6 text-primary" />}
                        {agent.name.includes('Data') && <Database className="w-6 h-6 text-primary" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium group-hover:text-primary transition-colors">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">{agent.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center mx-4">
                <div className="w-12 h-0.5 bg-primary/60 relative">
                  <div className="absolute right-0 top-0 w-2 h-2 border-r-2 border-t-2 border-primary/60 transform rotate-45 -translate-y-1"></div>
                  <div className="w-12 h-0.5 bg-primary/60 animate-pulse absolute top-0"></div>
                </div>
              </div>

              {/* Sitemap Generation Block */}
              <div 
                className={`flex flex-col items-center transition-all duration-1000 ${
                  coreVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ animationDelay: '1.5s' }}
              >
                <div className="relative">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 rounded-2xl p-8 min-w-[240px]">
                    {/* Network visualization */}
                    <svg className="w-32 h-24 mx-auto mb-4" viewBox="0 0 128 96" fill="none">
                      {/* Animated background grid */}
                      <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.1">
                            <animate attributeName="opacity" values="0.1; 0.3; 0.1" dur="4s" repeatCount="indefinite" />
                          </path>
                        </pattern>
                      </defs>
                      <rect width="128" height="96" fill="url(#grid)" />
                      
                      {/* Main nodes with pulsing animation */}
                      <circle cx="20" cy="20" r="4" fill="hsl(var(--primary))" opacity="0">
                        <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0.5s" fill="freeze" />
                        <animate attributeName="r" values="4; 6; 4" dur="2s" begin="1s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="60" cy="15" r="4" fill="hsl(var(--primary))" opacity="0">
                        <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0.7s" fill="freeze" />
                        <animate attributeName="r" values="4; 6; 4" dur="2s" begin="1.3s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="100" cy="25" r="4" fill="hsl(var(--primary))" opacity="0">
                        <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0.9s" fill="freeze" />
                        <animate attributeName="r" values="4; 6; 4" dur="2s" begin="1.6s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="30" cy="50" r="4" fill="hsl(var(--primary))" opacity="0">
                        <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="1.1s" fill="freeze" />
                        <animate attributeName="r" values="4; 6; 4" dur="2s" begin="1.9s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="80" cy="55" r="4" fill="hsl(var(--primary))" opacity="0">
                        <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="1.3s" fill="freeze" />
                        <animate attributeName="r" values="4; 6; 4" dur="2s" begin="2.2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="50" cy="75" r="4" fill="hsl(var(--primary))" opacity="0">
                        <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="1.5s" fill="freeze" />
                        <animate attributeName="r" values="4; 6; 4" dur="2s" begin="2.5s" repeatCount="indefinite" />
                      </circle>
                      
                      {/* Connections with progressive drawing and flow animation */}
                      <path d="M20,20 L60,15" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" opacity="0">
                        <animate attributeName="opacity" values="0; 0.8" dur="0.3s" begin="1.7s" fill="freeze" />
                        <animate attributeName="stroke-dashoffset" values="10; 0" dur="1.5s" begin="1.7s" repeatCount="indefinite" />
                      </path>
                      <path d="M60,15 L100,25" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" opacity="0">
                        <animate attributeName="opacity" values="0; 0.8" dur="0.3s" begin="1.9s" fill="freeze" />
                        <animate attributeName="stroke-dashoffset" values="10; 0" dur="1.5s" begin="1.9s" repeatCount="indefinite" />
                      </path>
                      <path d="M20,20 L30,50" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" opacity="0">
                        <animate attributeName="opacity" values="0; 0.8" dur="0.3s" begin="2.1s" fill="freeze" />
                        <animate attributeName="stroke-dashoffset" values="10; 0" dur="1.5s" begin="2.1s" repeatCount="indefinite" />
                      </path>
                      <path d="M30,50 L50,75" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" opacity="0">
                        <animate attributeName="opacity" values="0; 0.8" dur="0.3s" begin="2.3s" fill="freeze" />
                        <animate attributeName="stroke-dashoffset" values="10; 0" dur="1.5s" begin="2.3s" repeatCount="indefinite" />
                      </path>
                      <path d="M50,75 L80,55" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" opacity="0">
                        <animate attributeName="opacity" values="0; 0.8" dur="0.3s" begin="2.5s" fill="freeze" />
                        <animate attributeName="stroke-dashoffset" values="10; 0" dur="1.5s" begin="2.5s" repeatCount="indefinite" />
                      </path>
                      <path d="M80,55 L100,25" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" opacity="0">
                        <animate attributeName="opacity" values="0; 0.8" dur="0.3s" begin="2.7s" fill="freeze" />
                        <animate attributeName="stroke-dashoffset" values="10; 0" dur="1.5s" begin="2.7s" repeatCount="indefinite" />
                      </path>
                      
                      {/* Data flow particles */}
                      <circle r="2" fill="hsl(var(--secondary))" opacity="0.8">
                        <animateMotion dur="3s" begin="2s" repeatCount="indefinite">
                          <path d="M20,20 L60,15 L100,25" />
                        </animateMotion>
                      </circle>
                      <circle r="2" fill="hsl(var(--secondary))" opacity="0.8">
                        <animateMotion dur="3s" begin="2.5s" repeatCount="indefinite">
                          <path d="M20,20 L30,50 L50,75 L80,55" />
                        </animateMotion>
                      </circle>
                      
                      {/* Central hub indicator */}
                      <circle cx="50" cy="40" r="6" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0">
                        <animate attributeName="opacity" values="0; 0.6; 0" dur="2s" begin="3s" repeatCount="indefinite" />
                        <animate attributeName="r" values="6; 12; 6" dur="2s" begin="3s" repeatCount="indefinite" />
                      </circle>
                    </svg>
                    
                    <h4 className="text-lg font-bold text-center text-primary">Sitemap<br />Generation</h4>
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Downstream Agents Section */}
        <div 
          ref={downstreamRef as any}
          className={`mb-24 transition-all duration-1000 ${
            downstreamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Downstream Agent Ecosystem</h3>
            <p className="text-muted-foreground">Once the sitemap is built, specialized agents activate to perform comprehensive testing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {downstreamAgents.map((agent, index) => (
              <div 
                key={index}
                className={`group p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                  downstreamVisible ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <agent.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {agent.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {agent.description}
                  </p>
                </div>
                
                {/* Activation indicator */}
                <div className="mt-4 flex justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bring Your Own Agent Section */}
        <div 
          ref={byoaRef as any}
          className={`text-center transition-all duration-1000 ${
            byoaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Bring Your Own Agent</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Easily integrate third-party or custom-built agents into QApilot's workflow
            </p>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
                <div className="flex items-center justify-center gap-8 flex-wrap">
                  {/* Puzzle piece visual */}
                  <div className="relative">
                    <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none">
                      {/* Main puzzle piece */}
                      <path d="M10,10 L30,10 L30,5 C30,0 35,0 40,5 C45,0 50,0 50,5 L50,10 L70,10 L70,30 L75,30 C80,30 80,35 75,40 C80,45 80,50 75,50 L70,50 L70,70 L50,70 L50,75 C50,80 45,80 40,75 C35,80 30,80 30,75 L30,70 L10,70 L10,10 Z" 
                            fill="hsl(var(--primary))" opacity="0.8">
                        <animate attributeName="opacity" values="0.8; 1; 0.8" dur="2s" repeatCount="indefinite" />
                      </path>
                      
                      {/* Connection points */}
                      <circle cx="40" cy="5" r="2" fill="hsl(var(--secondary))" />
                      <circle cx="75" cy="40" r="2" fill="hsl(var(--secondary))" />
                      <circle cx="40" cy="75" r="2" fill="hsl(var(--secondary))" />
                    </svg>
                    
                    {/* Floating connection indicators */}
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-secondary rounded-full animate-bounce"></div>
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.5s" }}></div>
                  </div>
                  
                  <div className="text-left">
                    <h4 className="text-xl font-semibold mb-2">Extensible Architecture</h4>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• Plug-and-play integration</li>
                      <li>• Custom agent development</li>
                      <li>• Third-party tool connections</li>
                      <li>• Scalable workflow enhancement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgenticWorkforceSection;