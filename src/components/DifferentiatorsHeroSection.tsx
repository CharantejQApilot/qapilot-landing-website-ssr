"use client";

import { Button } from "@/components/ui/button";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";
import { Plug } from "lucide-react";

const DifferentiatorsHeroSection = () => {
  const { openForm } = useHubSpotForm();
  
  const handleGetAccessClick = () => {
    openForm();
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center section-edge w-full py-20 pb-8">
      <div className="section-full relative z-10 mx-auto max-w-screen-xl">
        {/* Main Hero Content */}
        <div className="text-center mb-0">
          {/* Headline */}
          <h1 className="font-heading text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl mb-8">
            What Makes QApilot <span className="text-primary">Different</span>
          </h1>

          {/* Sub-heading */}
          <div className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-0 space-y-4">
            <p>
              QApilot isn't just another testing tool. It's an <span className="text-primary font-semibold">AI-native platform</span> built 
              from the ground up for intelligent, adaptive, and extensible mobile app testing.
            </p>
            <p className="text-xl font-semibold text-foreground">
              Explore what sets us apart.
            </p>
          </div>

          {/* Central Circuit Animation - Enhanced and Broader */}
          <div className="relative w-full max-w-7xl mx-auto h-[700px] hidden md:block overflow-visible -mt-8 mb-0">
            <div className="absolute inset-0 flex items-center justify-center">
              
              {/* Expanded Digital Circuit Grid - SVG Based */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700" fill="none">
                <defs>
                  {/* Define glowing gradient for data flow */}
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  </linearGradient>

                  {/* Enhanced Circuit paths for data flow animations */}
                  {/* Left agents to QApilot Framework */}
                  <path id="diff-circuit-path-nav" d="M 150 200 L 450 200 L 450 280 L 520 280" />
                  <path id="diff-circuit-path-test" d="M 150 350 L 300 350 L 300 280 L 520 280" />
                  <path id="diff-circuit-path-access" d="M 150 500 L 450 500 L 450 420 L 520 420" />
                  
                  {/* QApilot Framework to outputs */}
                  <path id="diff-circuit-path-out1" d="M 680 280 L 750 280 L 750 200 L 1050 200" />
                  <path id="diff-circuit-path-out2" d="M 680 350 L 900 350 L 900 280 L 1050 280" />
                  <path id="diff-circuit-path-out3" d="M 680 420 L 750 420 L 750 500 L 1050 500" />
                  
                  {/* BYOA agents to framework */}
                  <path id="diff-circuit-path-byoa1" d="M 150 280 L 520 280" />
                  <path id="diff-circuit-path-byoa2" d="M 150 420 L 520 420" />
                </defs>

                {/* Enhanced Circuit Grid Base Structure */}
                {/* Horizontal Lines - Main Data Highways */}
                <line x1="150" y1="200" x2="1050" y2="200" stroke="hsl(var(--primary))" strokeWidth="2" className="opacity-20" />
                <line x1="150" y1="280" x2="1050" y2="280" stroke="hsl(var(--primary))" strokeWidth="3" className="opacity-30" />
                <line x1="150" y1="350" x2="1050" y2="350" stroke="hsl(var(--primary))" strokeWidth="2" className="opacity-25" />
                <line x1="150" y1="420" x2="1050" y2="420" stroke="hsl(var(--primary))" strokeWidth="3" className="opacity-30" />
                <line x1="150" y1="500" x2="1050" y2="500" stroke="hsl(var(--primary))" strokeWidth="2" className="opacity-20" />

                {/* Vertical Lines - Connection Channels */}
                <line x1="300" y1="150" x2="300" y2="550" stroke="hsl(var(--primary))" strokeWidth="2" className="opacity-20" />
                <line x1="450" y1="150" x2="450" y2="550" stroke="hsl(var(--primary))" strokeWidth="2" className="opacity-25" />
                <line x1="600" y1="150" x2="600" y2="550" stroke="hsl(var(--primary))" strokeWidth="2" className="opacity-30" />
                <line x1="750" y1="150" x2="750" y2="550" stroke="hsl(var(--primary))" strokeWidth="2" className="opacity-25" />
                <line x1="900" y1="150" x2="900" y2="550" stroke="hsl(var(--primary))" strokeWidth="2" className="opacity-20" />

                {/* Circuit Nodes (Connection Points) */}
                <circle cx="300" cy="280" r="4" fill="hsl(var(--primary))" className="opacity-60" />
                <circle cx="300" cy="350" r="4" fill="hsl(var(--primary))" className="opacity-60" />
                <circle cx="450" cy="200" r="4" fill="hsl(var(--primary))" className="opacity-60" />
                <circle cx="450" cy="280" r="4" fill="hsl(var(--primary))" className="opacity-60" />
                <circle cx="450" cy="420" r="4" fill="hsl(var(--primary))" className="opacity-60" />
                <circle cx="450" cy="500" r="4" fill="hsl(var(--primary))" className="opacity-60" />
                <circle cx="750" cy="200" r="4" fill="hsl(var(--primary))" className="opacity-60" />
                <circle cx="750" cy="280" r="4" fill="hsl(var(--primary))" className="opacity-60" />
                <circle cx="750" cy="420" r="4" fill="hsl(var(--primary))" className="opacity-60" />
                <circle cx="750" cy="500" r="4" fill="hsl(var(--primary))" className="opacity-60" />
                <circle cx="900" cy="280" r="4" fill="hsl(var(--primary))" className="opacity-60" />
                <circle cx="900" cy="350" r="4" fill="hsl(var(--primary))" className="opacity-60" />

                {/* Animated Data Flow Particles */}
                {/* Navigation Agent to Framework */}
                <circle r="5" fill="hsl(var(--primary))" className="opacity-0">
                  <animateMotion dur="3s" repeatCount="indefinite" begin="0s">
                    <mpath href="#diff-circuit-path-nav" />
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin="0s" />
                </circle>

                {/* Test Creation Agent to Framework */}
                <circle r="5" fill="hsl(var(--primary))" className="opacity-0">
                  <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.5s">
                    <mpath href="#diff-circuit-path-test" />
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="3.5s" repeatCount="indefinite" begin="0.5s" />
                </circle>

                {/* Accessibility Agent to Framework */}
                <circle r="5" fill="hsl(var(--primary))" className="opacity-0">
                  <animateMotion dur="3s" repeatCount="indefinite" begin="1s">
                    <mpath href="#diff-circuit-path-access" />
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin="1s" />
                </circle>

                {/* Framework outputs */}
                <circle r="5" fill="hsl(var(--primary))" className="opacity-0">
                  <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.3s">
                    <mpath href="#diff-circuit-path-out1" />
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite" begin="0.3s" />
                </circle>

                <circle r="5" fill="hsl(var(--primary))" className="opacity-0">
                  <animateMotion dur="3s" repeatCount="indefinite" begin="0.7s">
                    <mpath href="#diff-circuit-path-out2" />
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin="0.7s" />
                </circle>

                <circle r="5" fill="hsl(var(--primary))" className="opacity-0">
                  <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.2s">
                    <mpath href="#diff-circuit-path-out3" />
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" repeatCount="indefinite" begin="1.2s" />
                </circle>

                {/* BYOA agents data flow (will appear after agents slide in) */}
                <circle r="5" fill="hsl(var(--primary))" className="opacity-0">
                  <animateMotion dur="2.5s" repeatCount="indefinite" begin="3.5s">
                    <mpath href="#diff-circuit-path-byoa1" />
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite" begin="3.5s" />
                </circle>

                <circle r="5" fill="hsl(var(--primary))" className="opacity-0">
                  <animateMotion dur="2.5s" repeatCount="indefinite" begin="4s">
                    <mpath href="#diff-circuit-path-byoa2" />
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite" begin="4s" />
                </circle>
              </svg>

              {/* Native Agents - Positioned at random nodes */}
              {/* Native Agent 1 */}
              <div className="absolute animate-fade-in-up z-10" style={{ left: '450px', top: '280px', transform: 'translate(-50%, -50%)', animationDelay: '0.3s' }}>
                <div className="w-24 h-24 bg-card border-2 border-primary/60 rounded-xl flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-primary relative z-10 mb-1">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 9H15M9 12H15M9 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[10px] font-semibold text-primary text-center px-1">Native Agents</span>
                </div>
              </div>

              {/* Native Agent 2 */}
              <div className="absolute animate-fade-in-up z-10" style={{ left: '300px', top: '350px', transform: 'translate(-50%, -50%)', animationDelay: '0.6s' }}>
                <div className="w-24 h-24 bg-card border-2 border-primary/60 rounded-xl flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-primary relative z-10 mb-1">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 9H15M9 12H15M9 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[10px] font-semibold text-primary text-center px-1">Native Agents</span>
                </div>
              </div>

              {/* Native Agent 3 */}
              <div className="absolute animate-fade-in-up z-10" style={{ left: '750px', top: '420px', transform: 'translate(-50%, -50%)', animationDelay: '0.9s' }}>
                <div className="w-24 h-24 bg-card border-2 border-primary/60 rounded-xl flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-primary relative z-10 mb-1">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 9H15M9 12H15M9 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[10px] font-semibold text-primary text-center px-1">Native Agents</span>
                </div>
              </div>

              {/* Native Agent 4 */}
              <div className="absolute animate-fade-in-up z-10" style={{ left: '900px', top: '350px', transform: 'translate(-50%, -50%)', animationDelay: '1.2s' }}>
                <div className="w-24 h-24 bg-card border-2 border-primary/60 rounded-xl flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-primary relative z-10 mb-1">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 9H15M9 12H15M9 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[10px] font-semibold text-primary text-center px-1">Native Agents</span>
                </div>
              </div>

              {/* Central QApilot Framework - Enhanced */}
              <div className="absolute z-20 animate-fade-in-up flex flex-col items-center" style={{
                left: '600px',
                top: '350px',
                transform: 'translate(-50%, -50%)',
                animationDelay: '0.4s'
              }}>
                <div className="w-40 h-40 bg-card border-3 border-primary rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group">
                  {/* Enhanced Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Enhanced Circuit Board Pattern */}
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="text-primary relative z-10">
                    {/* Central processor - larger */}
                    <rect x="35" y="35" width="30" height="30" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.3" />
                    
                    {/* Connection lines radiating out - enhanced */}
                    <line x1="50" y1="35" x2="50" y2="5" stroke="currentColor" strokeWidth="3" />
                    <line x1="50" y1="65" x2="50" y2="95" stroke="currentColor" strokeWidth="3" />
                    <line x1="35" y1="50" x2="5" y2="50" stroke="currentColor" strokeWidth="3" />
                    <line x1="65" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="3" />
                    
                    {/* Corner connections */}
                    <line x1="35" y1="35" x2="15" y2="15" stroke="currentColor" strokeWidth="2" />
                    <line x1="65" y1="35" x2="85" y2="15" stroke="currentColor" strokeWidth="2" />
                    <line x1="35" y1="65" x2="15" y2="85" stroke="currentColor" strokeWidth="2" />
                    <line x1="65" y1="65" x2="85" y2="85" stroke="currentColor" strokeWidth="2" />
                    
                    {/* External nodes - larger */}
                    <circle cx="50" cy="5" r="4" fill="currentColor" />
                    <circle cx="50" cy="95" r="4" fill="currentColor" />
                    <circle cx="5" cy="50" r="4" fill="currentColor" />
                    <circle cx="95" cy="50" r="4" fill="currentColor" />
                    <circle cx="15" cy="15" r="3" fill="currentColor" />
                    <circle cx="85" cy="15" r="3" fill="currentColor" />
                    <circle cx="15" cy="85" r="3" fill="currentColor" />
                    <circle cx="85" cy="85" r="3" fill="currentColor" />
                  </svg>
                  
                  {/* Enhanced Pulsing animation */}
                  <div className="absolute inset-0 border-3 border-primary rounded-2xl animate-ping opacity-30"></div>
                </div>
                <span className="text-sm font-bold text-primary mt-3">QApilot Framework</span>
              </div>

              {/* BYOA Custom Agent Modules - Your Agents with Plug Symbol */}
              {/* Your Agent 1 */}
              <div className="absolute animate-slide-in-right z-10" style={{ 
                left: '450px', 
                top: '420px', 
                transform: 'translate(-50%, -50%)', 
                animationDelay: '2.5s',
                animationDuration: '1s',
                animationFillMode: 'forwards'
              }}>
                <div className="w-24 h-24 bg-gradient-to-br from-primary/90 to-primary rounded-xl flex flex-col items-center justify-center shadow-glow border-2 border-primary relative overflow-hidden">
                  <Plug size={32} className="text-primary-foreground relative z-10 mb-1" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                  <span className="text-[10px] font-semibold text-primary-foreground text-center px-1">Your Agent</span>
                </div>
              </div>

              {/* Your Agent 2 */}
              <div className="absolute animate-slide-in-right z-10" style={{ 
                left: '750px', 
                top: '280px', 
                transform: 'translate(-50%, -50%)', 
                animationDelay: '3s',
                animationDuration: '1s',
                animationFillMode: 'forwards'
              }}>
                <div className="w-24 h-24 bg-gradient-to-br from-primary/90 to-primary rounded-xl flex flex-col items-center justify-center shadow-glow border-2 border-primary relative overflow-hidden">
                  <Plug size={32} className="text-primary-foreground relative z-10 mb-1" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                  <span className="text-[10px] font-semibold text-primary-foreground text-center px-1">Your Agent</span>
                </div>
              </div>

              {/* Your Agent 3 */}
              <div className="absolute animate-slide-in-right z-10" style={{ 
                left: '300px', 
                top: '200px', 
                transform: 'translate(-50%, -50%)', 
                animationDelay: '3.5s',
                animationDuration: '1s',
                animationFillMode: 'forwards'
              }}>
                <div className="w-24 h-24 bg-gradient-to-br from-primary/90 to-primary rounded-xl flex flex-col items-center justify-center shadow-glow border-2 border-primary relative overflow-hidden">
                  <Plug size={32} className="text-primary-foreground relative z-10 mb-1" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                  <span className="text-[10px] font-semibold text-primary-foreground text-center px-1">Your Agent</span>
                </div>
              </div>

              {/* Circuit Brightening Effect - Overlay (appears when BYOA agents connect) */}
              <div className="absolute inset-0 opacity-0 animate-fade-in" style={{ animationDelay: '3.5s', animationDuration: '1.5s', animationFillMode: 'forwards' }}>
                <svg className="w-full h-full" viewBox="0 0 1200 700" fill="none">
                  <line x1="150" y1="280" x2="1050" y2="280" stroke="hsl(var(--primary))" strokeWidth="4" className="opacity-70" />
                  <line x1="150" y1="420" x2="1050" y2="420" stroke="hsl(var(--primary))" strokeWidth="4" className="opacity-70" />
                  <line x1="600" y1="150" x2="600" y2="550" stroke="hsl(var(--primary))" strokeWidth="3" className="opacity-50" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile-friendly simplified visual */}
          <div className="block md:hidden mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-14 h-14 bg-card border-2 border-primary/60 rounded-lg flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-primary/90 to-primary rounded-lg flex items-center justify-center">
                  <Plug size={20} className="text-primary-foreground" />
                </div>
              </div>
              <div className="text-2xl text-primary">→</div>
              <div className="w-20 h-20 bg-card border-2 border-primary rounded-xl flex items-center justify-center relative">
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="text-primary">
                  <rect x="35" y="35" width="30" height="30" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.2" />
                  <line x1="50" y1="35" x2="50" y2="5" stroke="currentColor" strokeWidth="2" />
                  <line x1="50" y1="65" x2="50" y2="95" stroke="currentColor" strokeWidth="2" />
                  <line x1="35" y1="50" x2="5" y2="50" stroke="currentColor" strokeWidth="2" />
                  <line x1="65" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative max-w-4xl mx-auto animate-fade-in -mt-20">
          <div className="relative bg-card border border-border rounded-2xl p-6 sm:p-8 hover:shadow-glow transition-all duration-500 hover:scale-[1.01]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] opacity-30 -z-10"></div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Left Side - CTA Text */}
              <div className="flex-1 text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Start testing
                </h3>
                <p className="text-muted-foreground">Experience AI-native Autonomous Mobile App Testing now</p>
              </div>

              {/* Right Side - CTA Button */}
              <div className="flex-shrink-0">
                <Button 
                  onClick={handleGetAccessClick}
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105"
                >
                  Get Access
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorsHeroSection;
