"use client";

import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";

type ProductOrbitalVisualProps = {
  className?: string;
  /** Wrapper for the large desktop orbital (default max-w-7xl h-[700px]) */
  desktopContainerClassName?: string;
};

/**
 * Shared agentic orbital diagram: desktop full diagram + mobile simplified strip.
 * Used by ProductHeroSection (centered) and PlatformOverviewHero (right column).
 */
export function ProductOrbitalVisual({
  className,
  desktopContainerClassName,
}: ProductOrbitalVisualProps) {
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative mx-auto hidden h-[700px] w-full max-w-7xl overflow-hidden md:block",
          desktopContainerClassName,
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform">
            <div className="flex flex-col items-center space-y-6">
              <span
                className="block animate-fade-in-up text-xl font-bold tracking-wider text-foreground"
                style={{ animationDelay: "0.3s" }}
              >
                SPECIALISED
              </span>
              <span
                className="block animate-fade-in-up text-xl font-bold tracking-wider text-foreground"
                style={{ animationDelay: "0.4s" }}
              >
                AGENTS
              </span>
              <svg className="h-48 w-32" viewBox="0 0 128 192" fill="none">
                <defs>
                  <path
                    id="po-left-flow-1"
                    d="M 10 20 Q 40 60 60 100 Q 80 140 100 180"
                  />
                  <path
                    id="po-left-flow-2"
                    d="M 20 30 Q 50 70 70 110 Q 90 150 110 190"
                  />
                  <path
                    id="po-left-flow-3"
                    d="M 5 40 Q 35 80 55 120 Q 75 160 95 190"
                  />
                </defs>
                <circle r="2" fill="hsl(var(--primary))" className="opacity-0">
                  <animateMotion dur="4s" repeatCount="indefinite" begin="0s">
                    <mpath href="#po-left-flow-1" />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.8;0.8;0"
                    dur="4s"
                    repeatCount="indefinite"
                    begin="0s"
                  />
                </circle>
                <circle r="2" fill="hsl(var(--primary))" className="opacity-0">
                  <animateMotion dur="5s" repeatCount="indefinite" begin="1.5s">
                    <mpath href="#po-left-flow-2" />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.6;0.6;0"
                    dur="5s"
                    repeatCount="indefinite"
                    begin="1.5s"
                  />
                </circle>
                <circle r="1.5" fill="hsl(var(--primary))" className="opacity-0">
                  <animateMotion dur="4.5s" repeatCount="indefinite" begin="3s">
                    <mpath href="#po-left-flow-3" />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.7;0.7;0"
                    dur="4.5s"
                    repeatCount="indefinite"
                    begin="3s"
                  />
                </circle>
                <path
                  d="M 10 20 Q 40 60 60 100 Q 80 140 100 180"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1"
                  fill="none"
                  className="opacity-20"
                />
                <path
                  d="M 20 30 Q 50 70 70 110 Q 90 150 110 190"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1"
                  fill="none"
                  className="opacity-15"
                />
              </svg>
            </div>
          </div>

          <div className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform">
            <div className="flex flex-col items-center space-y-6">
              <span
                className="block animate-fade-in-up text-xl font-bold tracking-wider text-foreground"
                style={{ animationDelay: "0.3s" }}
              >
                SHARED
              </span>
              <span
                className="block animate-fade-in-up text-xl font-bold tracking-wider text-foreground"
                style={{ animationDelay: "0.4s" }}
              >
                INTELLIGENCE
              </span>
              <svg className="h-48 w-32" viewBox="0 0 128 192" fill="none">
                <defs>
                  <path
                    id="po-right-flow-1"
                    d="M 118 20 Q 88 60 68 100 Q 48 140 28 180"
                  />
                  <path
                    id="po-right-flow-2"
                    d="M 108 30 Q 78 70 58 110 Q 38 150 18 190"
                  />
                  <path
                    id="po-right-flow-3"
                    d="M 123 40 Q 93 80 73 120 Q 53 160 33 190"
                  />
                </defs>
                <circle r="2" fill="hsl(var(--primary))" className="opacity-0">
                  <animateMotion dur="4s" repeatCount="indefinite" begin="0.5s">
                    <mpath href="#po-right-flow-1" />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.8;0.8;0"
                    dur="4s"
                    repeatCount="indefinite"
                    begin="0.5s"
                  />
                </circle>
                <circle r="2" fill="hsl(var(--primary))" className="opacity-0">
                  <animateMotion dur="5s" repeatCount="indefinite" begin="2s">
                    <mpath href="#po-right-flow-2" />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.6;0.6;0"
                    dur="5s"
                    repeatCount="indefinite"
                    begin="2s"
                  />
                </circle>
                <circle r="1.5" fill="hsl(var(--primary))" className="opacity-0">
                  <animateMotion dur="4.5s" repeatCount="indefinite" begin="3.5s">
                    <mpath href="#po-right-flow-3" />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.7;0.7;0"
                    dur="4.5s"
                    repeatCount="indefinite"
                    begin="3.5s"
                  />
                </circle>
                <path
                  d="M 118 20 Q 88 60 68 100 Q 48 140 28 180"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1"
                  fill="none"
                  className="opacity-20"
                />
                <path
                  d="M 108 30 Q 78 70 58 110 Q 38 150 18 190"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1"
                  fill="none"
                  className="opacity-15"
                />
              </svg>
            </div>
          </div>

          <div className="relative h-[600px] w-[600px]">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 600" fill="none">
              <defs>
                <path
                  id="po-inner-orbit"
                  d="M 300 300 m -120 0 a 120 120 0 1 1 240 0 a 120 120 0 1 1 -240 0"
                />
                <path
                  id="po-middle-orbit"
                  d="M 300 300 m -180 0 a 180 180 0 1 1 360 0 a 180 180 0 1 1 -360 0"
                />
                <path
                  id="po-outer-orbit"
                  d="M 300 300 m -240 0 a 240 240 0 1 1 480 0 a 240 240 0 1 1 -480 0"
                />
              </defs>
              <circle
                cx="300"
                cy="300"
                r="120"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                fill="none"
                className="opacity-40"
              />
              <circle
                cx="300"
                cy="300"
                r="180"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                fill="none"
                className="opacity-30"
              />
              <circle
                cx="300"
                cy="300"
                r="240"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                fill="none"
                className="opacity-25"
              />
              <circle r="4" fill="hsl(var(--primary))" className="opacity-0">
                <animateMotion dur="8s" repeatCount="indefinite" begin="0s">
                  <mpath href="#po-inner-orbit" />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur="8s"
                  repeatCount="indefinite"
                  begin="0s"
                />
              </circle>
              <circle r="3" fill="hsl(var(--primary))" className="opacity-0">
                <animateMotion dur="12s" repeatCount="indefinite" begin="2s">
                  <mpath href="#po-middle-orbit" />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;0.8;0.8;0"
                  dur="12s"
                  repeatCount="indefinite"
                  begin="2s"
                />
              </circle>
              <circle r="3" fill="hsl(var(--primary))" className="opacity-0">
                <animateMotion dur="16s" repeatCount="indefinite" begin="4s">
                  <mpath href="#po-outer-orbit" />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;0.6;0.6;0"
                  dur="16s"
                  repeatCount="indefinite"
                  begin="4s"
                />
              </circle>
            </svg>

            <div
              className="absolute z-20 flex animate-fade-in-up flex-col items-center"
              style={{
                left: "300px",
                top: "300px",
                transform: "translate(-50%, -50%)",
                animationDelay: "0.5s",
              }}
            >
              <div className="flex h-24 w-24 animate-pulse-glow items-center justify-center rounded-2xl border-2 border-primary bg-card shadow-lg">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  className="text-primary"
                >
                  <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <line x1="20" y1="4" x2="20" y2="36" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="4" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="8.6" y1="8.6" x2="31.4" y2="31.4" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="31.4" y1="8.6" x2="8.6" y2="31.4" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="14.1" y1="5.9" x2="25.9" y2="34.1" stroke="currentColor" strokeWidth="1" />
                  <line x1="25.9" y1="5.9" x2="14.1" y2="34.1" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
              <span className="mt-3 text-sm font-semibold text-primary">Mobile App Crawler</span>
            </div>

            <div
              className="absolute z-10 animate-fade-in-up"
              style={{
                left: "420px",
                top: "300px",
                transform: "translate(-50%, -50%)",
                animationDelay: "0.8s",
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-glow">
                <Brain size={18} className="text-primary" />
              </div>
            </div>
            <div
              className="absolute z-10 animate-fade-in-up"
              style={{
                left: "180px",
                top: "300px",
                transform: "translate(-50%, -50%)",
                animationDelay: "1.0s",
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-glow">
                <Brain size={18} className="text-primary" />
              </div>
            </div>
            <div
              className="absolute z-10 animate-fade-in-up"
              style={{
                left: "300px",
                top: "120px",
                transform: "translate(-50%, -50%)",
                animationDelay: "1.2s",
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-glow">
                <Brain size={18} className="text-primary" />
              </div>
            </div>
            <div
              className="absolute z-10 animate-fade-in-up"
              style={{
                left: "300px",
                top: "480px",
                transform: "translate(-50%, -50%)",
                animationDelay: "1.4s",
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-glow">
                <Brain size={18} className="text-primary" />
              </div>
            </div>
            <div
              className="absolute z-10 animate-fade-in-up"
              style={{
                left: "470px",
                top: "130px",
                transform: "translate(-50%, -50%)",
                animationDelay: "1.6s",
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-glow">
                <Brain size={18} className="text-primary" />
              </div>
            </div>
            <div
              className="absolute z-10 animate-fade-in-up"
              style={{
                left: "130px",
                top: "470px",
                transform: "translate(-50%, -50%)",
                animationDelay: "1.8s",
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-glow">
                <Brain size={18} className="text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12 block md:hidden">
        <div className="mb-6 flex items-center justify-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-card">
            <Brain size={16} className="text-primary" />
          </div>
          <div className="text-2xl text-primary">→</div>
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-primary bg-card">
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
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-card">
            <Brain size={16} className="text-primary" />
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground">AI Agents Working in Harmony</p>
      </div>
    </div>
  );
}
