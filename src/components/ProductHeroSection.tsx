"use client";

import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";

const ProductHeroSection = () => {
  const { openForm } = useHubSpotForm();
  
  const handleGetAccessClick = () => {
    openForm();
  };
  return <section className="relative min-h-screen flex items-center justify-center px-4 py-20 pb-8">
      {/* Background Effects */}
      <div className="absolute inset-0 glow-bg"></div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-20">
        {/* Concentric circles motif */}
        <div className="absolute inset-0 border border-primary/20 rounded-full"></div>
        <div className="absolute inset-4 border border-primary/20 rounded-full"></div>
        <div className="absolute inset-8 border border-primary/20 rounded-full"></div>
        <div className="absolute inset-12 border border-primary/20 rounded-full"></div>
      </div>

      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Content */}
        <div className="text-center mb-16">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight text-foreground">
            Experience <span className="text-primary">Agentic Testing</span> with QApilot.
          </h1>

          {/* Sub-heading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-1">
            AI crawlers, intelligent agents and a knowledge graph combine to deliver autonomous mobile test coverage.
          </p>

          {/* Central Orbital System - Rebuilt from scratch */}
          <div className="relative w-full max-w-7xl mx-auto h-[700px] hidden md:block overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              
              {/* Left Side - Specialised Agents */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
                <div className="flex flex-col items-center space-y-6">
                  <span className="block text-xl font-bold text-foreground tracking-wider animate-fade-in-up" style={{
                  animationDelay: '0.3s'
                }}>
                    SPECIALISED
                  </span>
                  <span className="block text-xl font-bold text-foreground tracking-wider animate-fade-in-up" style={{
                  animationDelay: '0.4s'
                }}>
                    AGENTS
                  </span>
                  
                  {/* Left side flowing animations */}
                  <svg className="w-32 h-48" viewBox="0 0 128 192" fill="none">
                    <defs>
                      <path id="left-flow-1" d="M 10 20 Q 40 60 60 100 Q 80 140 100 180" />
                      <path id="left-flow-2" d="M 20 30 Q 50 70 70 110 Q 90 150 110 190" />
                      <path id="left-flow-3" d="M 5 40 Q 35 80 55 120 Q 75 160 95 190" />
                    </defs>
                    
                    {/* Flowing particles toward center */}
                    <circle r="2" fill="hsl(var(--primary))" className="opacity-0">
                      <animateMotion dur="4s" repeatCount="indefinite" begin="0s">
                        <mpath href="#left-flow-1" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;0.8;0.8;0" dur="4s" repeatCount="indefinite" begin="0s" />
                    </circle>
                    
                    <circle r="2" fill="hsl(var(--primary))" className="opacity-0">
                      <animateMotion dur="5s" repeatCount="indefinite" begin="1.5s">
                        <mpath href="#left-flow-2" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;0.6;0.6;0" dur="5s" repeatCount="indefinite" begin="1.5s" />
                    </circle>
                    
                    <circle r="1.5" fill="hsl(var(--primary))" className="opacity-0">
                      <animateMotion dur="4.5s" repeatCount="indefinite" begin="3s">
                        <mpath href="#left-flow-3" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;0.7;0.7;0" dur="4.5s" repeatCount="indefinite" begin="3s" />
                    </circle>
                    
                    {/* Subtle connecting lines */}
                    <path d="M 10 20 Q 40 60 60 100 Q 80 140 100 180" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" className="opacity-20" />
                    <path d="M 20 30 Q 50 70 70 110 Q 90 150 110 190" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" className="opacity-15" />
                  </svg>
                </div>
              </div>

              {/* Right Side - Shared Intelligence */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
                <div className="flex flex-col items-center space-y-6">
                  <span className="block text-xl font-bold text-foreground tracking-wider animate-fade-in-up" style={{
                  animationDelay: '0.3s'
                }}>
                    SHARED
                  </span>
                  <span className="block text-xl font-bold text-foreground tracking-wider animate-fade-in-up" style={{
                  animationDelay: '0.4s'
                }}>
                    INTELLIGENCE
                  </span>
                  
                  {/* Right side flowing animations */}
                  <svg className="w-32 h-48" viewBox="0 0 128 192" fill="none">
                    <defs>
                      <path id="right-flow-1" d="M 118 20 Q 88 60 68 100 Q 48 140 28 180" />
                      <path id="right-flow-2" d="M 108 30 Q 78 70 58 110 Q 38 150 18 190" />
                      <path id="right-flow-3" d="M 123 40 Q 93 80 73 120 Q 53 160 33 190" />
                    </defs>
                    
                    {/* Flowing particles from center */}
                    <circle r="2" fill="hsl(var(--primary))" className="opacity-0">
                      <animateMotion dur="4s" repeatCount="indefinite" begin="0.5s">
                        <mpath href="#right-flow-1" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;0.8;0.8;0" dur="4s" repeatCount="indefinite" begin="0.5s" />
                    </circle>
                    
                    <circle r="2" fill="hsl(var(--primary))" className="opacity-0">
                      <animateMotion dur="5s" repeatCount="indefinite" begin="2s">
                        <mpath href="#right-flow-2" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;0.6;0.6;0" dur="5s" repeatCount="indefinite" begin="2s" />
                    </circle>
                    
                    <circle r="1.5" fill="hsl(var(--primary))" className="opacity-0">
                      <animateMotion dur="4.5s" repeatCount="indefinite" begin="3.5s">
                        <mpath href="#right-flow-3" />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;0.7;0.7;0" dur="4.5s" repeatCount="indefinite" begin="3.5s" />
                    </circle>
                    
                    {/* Subtle connecting lines */}
                    <path d="M 118 20 Q 88 60 68 100 Q 48 140 28 180" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" className="opacity-20" />
                    <path d="M 108 30 Q 78 70 58 110 Q 38 150 18 190" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" className="opacity-15" />
                  </svg>
                </div>
              </div>
              
              {/* Orbital System Container - Fixed 600x600 system */}
              <div className="relative w-[600px] h-[600px]">
                
                {/* SVG for orbital rings and animations */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600" fill="none">
                  {/* Define orbital paths for particles */}
                  <defs>
                    <path id="inner-orbit" d="M 300 300 m -120 0 a 120 120 0 1 1 240 0 a 120 120 0 1 1 -240 0" />
                    <path id="middle-orbit" d="M 300 300 m -180 0 a 180 180 0 1 1 360 0 a 180 180 0 1 1 -360 0" />
                    <path id="outer-orbit" d="M 300 300 m -240 0 a 240 240 0 1 1 480 0 a 240 240 0 1 1 -480 0" />
                  </defs>

                  {/* Three Concentric Orbital Rings */}
                  <circle cx="300" cy="300" r="120" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" className="opacity-40" />
                  <circle cx="300" cy="300" r="180" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" className="opacity-30" />
                  <circle cx="300" cy="300" r="240" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" className="opacity-25" />

                  {/* Animated data particles */}
                  <circle r="4" fill="hsl(var(--primary))" className="opacity-0">
                    <animateMotion dur="8s" repeatCount="indefinite" begin="0s">
                      <mpath href="#inner-orbit" />
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;1;0" dur="8s" repeatCount="indefinite" begin="0s" />
                  </circle>
                  
                  <circle r="3" fill="hsl(var(--primary))" className="opacity-0">
                    <animateMotion dur="12s" repeatCount="indefinite" begin="2s">
                      <mpath href="#middle-orbit" />
                    </animateMotion>
                    <animate attributeName="opacity" values="0;0.8;0.8;0" dur="12s" repeatCount="indefinite" begin="2s" />
                  </circle>
                  
                  <circle r="3" fill="hsl(var(--primary))" className="opacity-0">
                    <animateMotion dur="16s" repeatCount="indefinite" begin="4s">
                      <mpath href="#outer-orbit" />
                    </animateMotion>
                    <animate attributeName="opacity" values="0;0.6;0.6;0" dur="16s" repeatCount="indefinite" begin="4s" />
                  </circle>
                </svg>

                {/* Central Spider Web Icon */}
                <div className="absolute z-20 animate-fade-in-up flex flex-col items-center" style={{
                left: '300px',
                top: '300px',
                transform: 'translate(-50%, -50%)',
                animationDelay: '0.5s'
              }}>
                  <div className="w-24 h-24 bg-card border-2 border-primary rounded-2xl flex items-center justify-center shadow-lg animate-pulse-glow">
                    {/* Custom Spider Web SVG */}
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-primary">
                      {/* Concentric web circles */}
                      <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      
                      {/* Radiating web lines */}
                      <line x1="20" y1="4" x2="20" y2="36" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="4" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="8.6" y1="8.6" x2="31.4" y2="31.4" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="31.4" y1="8.6" x2="8.6" y2="31.4" stroke="currentColor" strokeWidth="1.5" />
                      
                      {/* Additional web threads */}
                      <line x1="14.1" y1="5.9" x2="25.9" y2="34.1" stroke="currentColor" strokeWidth="1" />
                      <line x1="25.9" y1="5.9" x2="14.1" y2="34.1" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-primary mt-3">Mobile App Crawler</span>
                </div>

                {/* AI Agents on Inner Orbit (120px radius) - 2 agents */}
                {/* Agent at 0° (right) */}
                <div className="absolute z-10 animate-fade-in-up" style={{
                left: '420px',
                // 300 + 120
                top: '300px',
                // center
                transform: 'translate(-50%, -50%)',
                animationDelay: '0.8s'
              }}>
                  <div className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center shadow-sm hover:shadow-glow transition-all duration-300 hover:scale-110">
                    <Brain size={18} className="text-primary" />
                  </div>
                </div>

                {/* Agent at 180° (left) */}
                <div className="absolute z-10 animate-fade-in-up" style={{
                left: '180px',
                // 300 - 120
                top: '300px',
                // center
                transform: 'translate(-50%, -50%)',
                animationDelay: '1.0s'
              }}>
                  <div className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center shadow-sm hover:shadow-glow transition-all duration-300 hover:scale-110">
                    <Brain size={18} className="text-primary" />
                  </div>
                </div>

                {/* AI Agents on Middle Orbit (180px radius) - 2 agents */}
                {/* Agent at 90° (top) */}
                <div className="absolute z-10 animate-fade-in-up" style={{
                left: '300px',
                // center
                top: '120px',
                // 300 - 180
                transform: 'translate(-50%, -50%)',
                animationDelay: '1.2s'
              }}>
                  <div className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center shadow-sm hover:shadow-glow transition-all duration-300 hover:scale-110">
                    <Brain size={18} className="text-primary" />
                  </div>
                </div>

                {/* Agent at 270° (bottom) */}
                <div className="absolute z-10 animate-fade-in-up" style={{
                left: '300px',
                // center
                top: '480px',
                // 300 + 180
                transform: 'translate(-50%, -50%)',
                animationDelay: '1.4s'
              }}>
                  <div className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center shadow-sm hover:shadow-glow transition-all duration-300 hover:scale-110">
                    <Brain size={18} className="text-primary" />
                  </div>
                </div>

                {/* AI Agents on Outer Orbit (240px radius) - 2 agents */}
                {/* Agent at 45° (top-right) */}
                <div className="absolute z-10 animate-fade-in-up" style={{
                left: '470px',
                // 300 + (240 * cos(45°)) = 300 + 170
                top: '130px',
                // 300 - (240 * sin(45°)) = 300 - 170
                transform: 'translate(-50%, -50%)',
                animationDelay: '1.6s'
              }}>
                  <div className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center shadow-sm hover:shadow-glow transition-all duration-300 hover:scale-110">
                    <Brain size={18} className="text-primary" />
                  </div>
                </div>

                {/* Agent at 225° (bottom-left) */}
                <div className="absolute z-10 animate-fade-in-up" style={{
                left: '130px',
                // 300 - (240 * cos(45°)) = 300 - 170
                top: '470px',
                // 300 + (240 * sin(45°)) = 300 + 170
                transform: 'translate(-50%, -50%)',
                animationDelay: '1.8s'
              }}>
                  <div className="w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center shadow-sm hover:shadow-glow transition-all duration-300 hover:scale-110">
                    <Brain size={18} className="text-primary" />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Mobile-friendly simplified visual */}
          <div className="block md:hidden mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center">
                <Brain size={16} className="text-primary" />
              </div>
              <div className="text-2xl text-primary">→</div>
              <div className="w-16 h-16 bg-card border-2 border-primary rounded-xl flex items-center justify-center">
                {/* Mobile Spider Web SVG */}
                <svg width="24" height="24" viewBox="0 0 40 40" fill="none" className="text-primary">
                  <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" fill="none" />
                  <line x1="20" y1="4" x2="20" y2="36" stroke="currentColor" strokeWidth="2" />
                  <line x1="4" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="2" />
                  <line x1="8.6" y1="8.6" x2="31.4" y2="31.4" stroke="currentColor" strokeWidth="2" />
                  <line x1="31.4" y1="8.6" x2="8.6" y2="31.4" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="text-2xl text-primary">→</div>
              <div className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center">
                <Brain size={16} className="text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">AI Agents Working in Harmony</p>
          </div>

          {/* CTA Section */}
          <div className="relative max-w-4xl mx-auto animate-fade-in" style={{
          animationDelay: '2.0s'
        }}>
            <div className="relative bg-card border border-border rounded-2xl p-6 sm:p-8 hover:shadow-glow transition-all duration-500 hover:scale-[1.01]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] opacity-30 -z-10"></div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Left Side - CTA Text */}
                <div className="flex-1 text-left animate-fade-in" style={{
                animationDelay: '2.2s'
              }}>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Start testing
                  </h2>
                  <p className="text-muted-foreground">Experience AI-native Autonomous Mobile App Testing now</p>
                </div>

                {/* Right Side - CTA Button */}
                <div className="flex-shrink-0 animate-fade-in" style={{
                animationDelay: '2.4s'
              }}>
                  <Button 
                    onClick={handleGetAccessClick}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-full text-lg hover:scale-105 transition-all duration-300 hover:shadow-glow relative overflow-hidden"
                  >
                    <span className="relative z-10">Get Access</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shine_2s_ease-in-out_infinite] transform skew-x-12"></div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ProductHeroSection;