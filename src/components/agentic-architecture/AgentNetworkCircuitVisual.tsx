"use client";

import { useId } from "react";
import { Plug } from "lucide-react";
import { cn } from "@/lib/utils";

type AgentNetworkCircuitVisualProps = {
  className?: string;
};

/**
 * Animated agent↔framework circuit (formerly centered “differentiators” hero visual).
 * SVG path IDs use `useId()` for stable SSR/hydration.
 */
export function AgentNetworkCircuitVisual({ className }: AgentNetworkCircuitVisualProps) {
  const sid = useId().replace(/:/g, "");
  const pid = (name: string) => `${sid}-${name}`;
  const phref = (name: string) => `#${sid}-${name}`;

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative mx-auto mb-0 hidden w-full max-w-full overflow-visible md:block",
          "h-[min(680px,min(72vh,760px))]",
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 700" fill="none">
            <defs>
              <path id={pid("p-nav")} d="M 150 200 L 450 200 L 450 280 L 520 280" />
              <path id={pid("p-test")} d="M 150 350 L 300 350 L 300 280 L 520 280" />
              <path id={pid("p-access")} d="M 150 500 L 450 500 L 450 420 L 520 420" />
              <path id={pid("p-out1")} d="M 680 280 L 750 280 L 750 200 L 1050 200" />
              <path id={pid("p-out2")} d="M 680 350 L 900 350 L 900 280 L 1050 280" />
              <path id={pid("p-out3")} d="M 680 420 L 750 420 L 750 500 L 1050 500" />
              <path id={pid("p-byoa1")} d="M 150 280 L 520 280" />
              <path id={pid("p-byoa2")} d="M 150 420 L 520 420" />
            </defs>

            <line x1="150" y1="200" x2="1050" y2="200" stroke="hsl(var(--primary))" strokeWidth="2" className="opacity-20" />
            <line x1="150" y1="280" x2="1050" y2="280" stroke="hsl(var(--primary))" strokeWidth="3" className="opacity-30" />
            <line x1="150" y1="350" x2="1050" y2="350" stroke="hsl(var(--primary))" strokeWidth="2" className="opacity-25" />
            <line x1="150" y1="420" x2="1050" y2="420" stroke="hsl(var(--primary))" strokeWidth="3" className="opacity-30" />
            <line x1="150" y1="500" x2="1050" y2="500" stroke="hsl(var(--primary))" strokeWidth="2" className="opacity-20" />

            <line x1="300" y1="150" x2="300" y2="550" stroke="hsl(var(--primary))" strokeWidth="2" className="opacity-20" />
            <line x1="450" y1="150" x2="450" y2="550" stroke="hsl(var(--primary))" strokeWidth="2" className="opacity-25" />
            <line x1="600" y1="150" x2="600" y2="550" stroke="hsl(var(--primary))" strokeWidth="2" className="opacity-30" />
            <line x1="750" y1="150" x2="750" y2="550" stroke="hsl(var(--primary))" strokeWidth="2" className="opacity-25" />
            <line x1="900" y1="150" x2="900" y2="550" stroke="hsl(var(--primary))" strokeWidth="2" className="opacity-20" />

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

            <circle r="5" fill="hsl(var(--primary))" className="opacity-0">
              <animateMotion dur="3s" repeatCount="indefinite" begin="0s">
                <mpath href={phref("p-nav")} />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin="0s" />
            </circle>

            <circle r="5" fill="hsl(var(--primary))" className="opacity-0">
              <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.5s">
                <mpath href={phref("p-test")} />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" dur="3.5s" repeatCount="indefinite" begin="0.5s" />
            </circle>

            <circle r="5" fill="hsl(var(--primary))" className="opacity-0">
              <animateMotion dur="3s" repeatCount="indefinite" begin="1s">
                <mpath href={phref("p-access")} />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin="1s" />
            </circle>

            <circle r="5" fill="hsl(var(--primary))" className="opacity-0">
              <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.3s">
                <mpath href={phref("p-out1")} />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite" begin="0.3s" />
            </circle>

            <circle r="5" fill="hsl(var(--primary))" className="opacity-0">
              <animateMotion dur="3s" repeatCount="indefinite" begin="0.7s">
                <mpath href={phref("p-out2")} />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin="0.7s" />
            </circle>

            <circle r="5" fill="hsl(var(--primary))" className="opacity-0">
              <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.2s">
                <mpath href={phref("p-out3")} />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" repeatCount="indefinite" begin="1.2s" />
            </circle>

            <circle r="5" fill="hsl(var(--primary))" className="opacity-0">
              <animateMotion dur="2.5s" repeatCount="indefinite" begin="3.5s">
                <mpath href={phref("p-byoa1")} />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite" begin="3.5s" />
            </circle>

            <circle r="5" fill="hsl(var(--primary))" className="opacity-0">
              <animateMotion dur="2.5s" repeatCount="indefinite" begin="4s">
                <mpath href={phref("p-byoa2")} />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite" begin="4s" />
            </circle>
          </svg>

          <div
            className="absolute z-10"
            style={{ left: "450px", top: "280px", transform: "translate(-50%, -50%)" }}
          >
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="group relative flex h-24 w-24 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-primary/60 bg-card shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="relative z-10 mb-1 text-primary">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 9H15M9 12H15M9 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="px-1 text-center text-[10px] font-semibold text-primary">Native Agents</span>
              </div>
            </div>
          </div>

          <div
            className="absolute z-10"
            style={{ left: "300px", top: "350px", transform: "translate(-50%, -50%)" }}
          >
            <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <div className="group relative flex h-24 w-24 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-primary/60 bg-card shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="relative z-10 mb-1 text-primary">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 9H15M9 12H15M9 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="px-1 text-center text-[10px] font-semibold text-primary">Native Agents</span>
              </div>
            </div>
          </div>

          <div
            className="absolute z-10"
            style={{ left: "750px", top: "420px", transform: "translate(-50%, -50%)" }}
          >
            <div className="animate-fade-in-up" style={{ animationDelay: "0.9s" }}>
              <div className="group relative flex h-24 w-24 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-primary/60 bg-card shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="relative z-10 mb-1 text-primary">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 9H15M9 12H15M9 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="px-1 text-center text-[10px] font-semibold text-primary">Native Agents</span>
              </div>
            </div>
          </div>

          <div
            className="absolute z-10"
            style={{ left: "900px", top: "350px", transform: "translate(-50%, -50%)" }}
          >
            <div className="animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
              <div className="group relative flex h-24 w-24 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-primary/60 bg-card shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="relative z-10 mb-1 text-primary">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 9H15M9 12H15M9 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="px-1 text-center text-[10px] font-semibold text-primary">Native Agents</span>
              </div>
            </div>
          </div>

          <div
            className="absolute z-20 flex flex-col items-center"
            style={{
              left: "600px",
              top: "350px",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="animate-fade-in-up flex flex-col items-center" style={{ animationDelay: "0.4s" }}>
              <div className="border-3 group relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-2xl border-primary bg-card shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="relative z-10 text-primary">
                  <rect x="35" y="35" width="30" height="30" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.3" />
                  <line x1="50" y1="35" x2="50" y2="5" stroke="currentColor" strokeWidth="3" />
                  <line x1="50" y1="65" x2="50" y2="95" stroke="currentColor" strokeWidth="3" />
                  <line x1="35" y1="50" x2="5" y2="50" stroke="currentColor" strokeWidth="3" />
                  <line x1="65" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="3" />
                  <line x1="35" y1="35" x2="15" y2="15" stroke="currentColor" strokeWidth="2" />
                  <line x1="65" y1="35" x2="85" y2="15" stroke="currentColor" strokeWidth="2" />
                  <line x1="35" y1="65" x2="15" y2="85" stroke="currentColor" strokeWidth="2" />
                  <line x1="65" y1="65" x2="85" y2="85" stroke="currentColor" strokeWidth="2" />
                  <circle cx="50" cy="5" r="4" fill="currentColor" />
                  <circle cx="50" cy="95" r="4" fill="currentColor" />
                  <circle cx="5" cy="50" r="4" fill="currentColor" />
                  <circle cx="95" cy="50" r="4" fill="currentColor" />
                  <circle cx="15" cy="15" r="3" fill="currentColor" />
                  <circle cx="85" cy="15" r="3" fill="currentColor" />
                  <circle cx="15" cy="85" r="3" fill="currentColor" />
                  <circle cx="85" cy="85" r="3" fill="currentColor" />
                </svg>
              </div>
              <span className="mt-3 text-sm font-bold text-primary">QApilot Framework</span>
            </div>
          </div>

          <div
            className="absolute z-10"
            style={{
              left: "450px",
              top: "420px",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="animate-slide-in-right"
              style={{
                animationDelay: "2.5s",
              }}
            >
              <div className="relative flex h-24 w-24 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-primary bg-gradient-to-br from-primary/90 to-primary shadow-glow">
                <Plug size={32} className="relative z-10 mb-1 text-primary-foreground" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                <span className="px-1 text-center text-[10px] font-semibold text-primary-foreground">Your Agent</span>
              </div>
            </div>
          </div>

          <div
            className="absolute z-10"
            style={{
              left: "750px",
              top: "280px",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="animate-slide-in-right"
              style={{
                animationDelay: "3s",
              }}
            >
              <div className="relative flex h-24 w-24 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-primary bg-gradient-to-br from-primary/90 to-primary shadow-glow">
                <Plug size={32} className="relative z-10 mb-1 text-primary-foreground" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                <span className="px-1 text-center text-[10px] font-semibold text-primary-foreground">Your Agent</span>
              </div>
            </div>
          </div>

          <div
            className="absolute z-10"
            style={{
              left: "300px",
              top: "200px",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="animate-slide-in-right"
              style={{
                animationDelay: "3.5s",
              }}
            >
              <div className="relative flex h-24 w-24 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-primary bg-gradient-to-br from-primary/90 to-primary shadow-glow">
                <Plug size={32} className="relative z-10 mb-1 text-primary-foreground" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                <span className="px-1 text-center text-[10px] font-semibold text-primary-foreground">Your Agent</span>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0">
            <div
              className="animate-fade-in h-full w-full opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: "3.5s", animationDuration: "1.5s" }}
            >
              <svg className="h-full w-full" viewBox="0 0 1200 700" fill="none">
                <line x1="150" y1="280" x2="1050" y2="280" stroke="hsl(var(--primary))" strokeWidth="4" className="opacity-70" />
                <line x1="150" y1="420" x2="1050" y2="420" stroke="hsl(var(--primary))" strokeWidth="4" className="opacity-70" />
                <line x1="600" y1="150" x2="600" y2="550" stroke="hsl(var(--primary))" strokeWidth="3" className="opacity-50" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex justify-center pb-2 pt-6 md:hidden">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-primary/60 bg-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-primary/90 to-primary">
              <Plug size={20} className="text-primary-foreground" />
            </div>
          </div>
          <div className="text-2xl text-primary">→</div>
          <div className="relative flex h-20 w-20 items-center justify-center rounded-xl border-2 border-primary bg-card">
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
  );
}
