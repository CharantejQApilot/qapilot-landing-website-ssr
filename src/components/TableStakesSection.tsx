"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
const SPACING = 160; // px between feature nodes
const START_OFFSET = 200; // px padding before first node
const BRANCH_LEN = 84; // px branch length up/down from the center line

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const primary = (alpha = 1) => `hsl(var(--primary) / ${alpha})`;
const TableStakesSection = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation(0.1);

  // Sticky timeline mechanics
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [vw, setVw] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1280);
  const [xOffset, setXOffset] = useState(0); // current horizontal offset
  const [scrollSpace, setScrollSpace] = useState(800); // vertical scroll distance driving horizontal motion
  const [contentWidth, setContentWidth] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const sections = [{
    title: "Test Creation & Management",
    features: ["Record & Playback", "Copilot – Natural Language Test Creation", "Conditional Logic Support", "Deep Link Testing", "Test Case Management"]
  }, {
    title: "Execution at Scale",
    features: ["Parallel Test Runs on Cloud", "Data-Driven Testing", "Debug Mode & Auto-Healing", "CI/CD Integration", "Network Logs During Execution"]
  }, {
    title: "Reporting & Insights",
    features: ["Execution Overview", "Report Comparison", "Accessibility Reporting", "RCA Suggestions", "Audit Trail"]
  }];

  // Alternate features on top / bottom of the center line - GLOBALLY across all sections
  let globalFeatureIndex = 0;
  const allFeatures = sections.flatMap((section, sectionIndex) => section.features.map((feature, featureIndex) => ({
    text: feature,
    sectionIndex,
    isTop: globalFeatureIndex++ % 2 === 0 // Global alternating pattern
  })));

  const loopWidth = allFeatures.length * SPACING;
  // Measure and compute derived sizes
  useLayoutEffect(() => {
    const measure = () => {
      const width = window.innerWidth;
      setVw(width);
      const totalWidth = START_OFFSET * 2 + (allFeatures.length - 1) * SPACING;
      setContentWidth(totalWidth);
      const neededScroll = Math.max(0, totalWidth - width);
      setScrollSpace(0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [allFeatures.length]);

  // Auto-scroll horizontal offset (looping)
  useEffect(() => {
    let rafId: number;
    let last = performance.now();
    const speed = 40; // px per second
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setXOffset((prev) => {
        const slideWidth = Math.max(1, loopWidth);
        return (prev + speed * dt) % slideWidth;
      });
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [loopWidth]);

  // Update active section based on current offset
  useEffect(() => {
    const xCenter = xOffset + vw / 2;
    const approxIndex = Math.round((xCenter - START_OFFSET) / SPACING);
    const clampedIndex = clamp(approxIndex, 0, allFeatures.length - 1);
    const secIdx = allFeatures[Math.floor(clampedIndex)]?.sectionIndex ?? 0;
    setActiveSection(secIdx);
  }, [xOffset, vw, allFeatures]);

  // Colors: section-specific colors with reduced intensity
  const getColors = (sectionIndex: number) => {
    const variants = [{
      strong: `hsl(45, 70%, 55%)`, // Reduced saturation and brightness
      medium: `hsl(45, 70%, 55%, 0.6)`,
      light: `hsl(45, 70%, 55%, 0.25)`
    },
    // Yellow
    {
      strong: `hsl(221, 65%, 50%)`, // Reduced saturation and brightness
      medium: `hsl(221, 65%, 50%, 0.6)`,
      light: `hsl(221, 65%, 50%, 0.25)`
    },
    // Blue
    {
      strong: `hsl(142, 60%, 35%)`, // Reduced saturation
      medium: `hsl(142, 60%, 35%, 0.6)`,
      light: `hsl(142, 60%, 35%, 0.25)`
    } // Green
    ];
    return variants[sectionIndex] || variants[0];
  };
  return <section className="section-edge relative w-full border-t border-border bg-background pt-24 pb-0" ref={ref}>
      <div className="section-full mx-auto max-w-7xl">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Table Stakes, <span className="text-primary">Done Right</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-loose">Enterprises expect reliability, scalability, and clear insights. QApilot delivers all the essentials you need, on top of state-of-the-art AI.</p>
        </div>

        {/* Sticky horizontal timeline driven by vertical scroll */}
        <div className="relative h-[40vh] rounded-xl overflow-hidden">
          <div className="relative h-full">
            {/* Enhanced Background Animations */}
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" viewBox="0 0 1000 500">
                <defs>
                  {/* Subtle gradient definitions */}
                  <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(45, 70%, 55%)" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="hsl(45, 70%, 55%)" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(221, 65%, 50%)" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="hsl(221, 65%, 50%)" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="glow3" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="hsl(142, 60%, 35%)" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="hsl(142, 60%, 35%)" stopOpacity="0" />
                  </radialGradient>
                  
                  {/* Geometric patterns */}
                  <pattern id="techPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <rect width="40" height="40" fill="none" />
                    <circle cx="20" cy="20" r="1" fill="hsl(var(--primary))" opacity="0.1" />
                    <rect x="15" y="15" width="10" height="10" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.05" />
                  </pattern>
                </defs>
                
                {/* Floating tech elements */}
                <g opacity="0.6">
                  <circle cx="150" cy="80" r="25" fill="url(#glow1)">
                    <animateTransform attributeName="transform" type="translate" values="0,0; 15,-8; 0,0" dur="10s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="450" cy="150" r="35" fill="url(#glow2)">
                    <animateTransform attributeName="transform" type="translate" values="0,0; -12,12; 0,0" dur="14s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="750" cy="300" r="20" fill="url(#glow3)">
                    <animateTransform attributeName="transform" type="translate" values="0,0; 8,15; 0,0" dur="12s" repeatCount="indefinite" />
                  </circle>
                </g>
                
                {/* Flowing data streams */}
                <g opacity="0.4">
                  <path d="M0,180 Q200,160 400,180 Q600,200 800,180 Q900,170 1000,180" 
                        stroke="hsl(var(--primary))" strokeWidth="1" fill="none" strokeDasharray="3 6">
                    <animate attributeName="stroke-dashoffset" values="0;-20;0" dur="8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
                  </path>
                  <path d="M0,320 Q300,300 600,320 Q800,340 1000,320" 
                        stroke="hsl(var(--primary))" strokeWidth="0.8" fill="none" strokeDasharray="2 8">
                    <animate attributeName="stroke-dashoffset" values="0;-15;0" dur="12s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.1;0.4;0.1" dur="6s" repeatCount="indefinite" />
                  </path>
                </g>
                
                {/* Geometric tech decorations */}
                <g opacity="0.3">
                  <rect x="100" y="50" width="8" height="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5">
                    <animateTransform attributeName="transform" type="rotate" values="0 104 54;360 104 54" dur="20s" repeatCount="indefinite" />
                  </rect>
                  <rect x="600" y="400" width="6" height="6" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5">
                    <animateTransform attributeName="transform" type="rotate" values="0 603 403;-360 603 403" dur="25s" repeatCount="indefinite" />
                  </rect>
                </g>
                
                {/* Subtle pattern overlay */}
                <rect width="1000" height="500" fill="url(#techPattern)" opacity="0.3" />
                
                {/* Minimalist floating particles */}
                <circle cx="250" cy="120" r="1.5" fill="hsl(var(--primary))" opacity="0.4">
                  <animate attributeName="opacity" values="0.2; 0.6; 0.2" dur="5s" repeatCount="indefinite" />
                  <animateTransform attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur="8s" repeatCount="indefinite" />
                </circle>
                <circle cx="520" cy="380" r="1" fill="hsl(var(--primary))" opacity="0.3">
                  <animate attributeName="opacity" values="0.1; 0.5; 0.1" dur="7s" repeatCount="indefinite" />
                  <animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="6s" repeatCount="indefinite" />
                </circle>
                <circle cx="820" cy="180" r="1.2" fill="hsl(var(--primary))" opacity="0.4">
                  <animate attributeName="opacity" values="0.3; 0.7; 0.3" dur="6s" repeatCount="indefinite" />
                  <animateTransform attributeName="transform" type="translate" values="0,0; 0,-4; 0,0" dur="9s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>

            {/* Central horizontal line (perfectly centered) */}
            <div className="absolute left-0 right-0 top-1/2 h-px" style={{
              transform: "translateY(-50%)",
              background: `linear-gradient(90deg, ${getColors(activeSection).strong}, ${getColors(activeSection).light})`
            }} aria-hidden />

              {/* Sliding content */}
              <div className="absolute top-0 left-0 h-full will-change-transform" style={{
              width: `${contentWidth}px`,
              transform: `translate3d(-${xOffset}px, 0, 0)`
            }}>
                {/* Invisible start/end spacers for balance */}
                <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${START_OFFSET}px`
              }} />
                <div style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: `${START_OFFSET}px`
              }} />

                {/* Nodes and branches */}
                {allFeatures.map((feature, i) => {
                const x = START_OFFSET + i * SPACING;
                const isActive = feature.sectionIndex === activeSection;
                const colors = getColors(feature.sectionIndex);
                const branchColor = isActive ? colors.strong : colors.light;
                const textColor = isActive ? colors.strong : colors.medium;
                return <div key={`${feature.text}-${i}-a`} className="absolute" style={{
                  left: `${x}px`,
                  top: "50%",
                  transform: "translate(-50%, -50%)"
                }}>
                      {/* Branch up (top) */}
                      <div className="absolute left-1/2 w-px" style={{
                    bottom: "50%",
                    height: `${BRANCH_LEN}px`,
                    transform: "translateX(-50%)",
                    backgroundColor: branchColor,
                    opacity: feature.isTop ? 1 : 0.35,
                    boxShadow: feature.isTop && isActive ? `0 2px 8px ${colors.light}` : undefined
                  }} aria-hidden />

                      {/* Center node on the line */}
                      <div className="absolute left-1/2 w-3 h-3 rounded-full" style={{
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: branchColor,
                    boxShadow: isActive ? `0 2px 6px ${colors.light}` : undefined,
                    opacity: 1
                  }} aria-hidden />

                      {/* Branch down (bottom) */}
                      <div className="absolute left-1/2 w-px" style={{
                    top: "50%",
                    height: `${BRANCH_LEN}px`,
                    transform: "translateX(-50%)",
                    backgroundColor: branchColor,
                    opacity: feature.isTop ? 0.35 : 1,
                    boxShadow: !feature.isTop && isActive ? `0 2px 8px ${colors.light}` : undefined
                  }} aria-hidden />

                      {/* Feature label */}
                      <div className="absolute left-1/2 text-center" style={{
                    color: textColor,
                    transform: feature.isTop ? `translate(-50%, calc(-50% - ${BRANCH_LEN + 14}px))` : `translate(-50%, calc(-50% + ${BRANCH_LEN + 14}px))`
                  }}>
                        {/* Floating dots around active feature */}
                        {isActive && (
                          <>
                            <div className="absolute -top-2 -left-2 w-1 h-1 rounded-full opacity-60" style={{
                              backgroundColor: colors.medium,
                              animation: 'float 3s ease-in-out infinite'
                            }} />
                            <div className="absolute -top-1 -right-3 w-0.5 h-0.5 rounded-full opacity-40" style={{
                              backgroundColor: colors.medium,
                              animation: 'float 3s ease-in-out infinite 1s'
                            }} />
                            <div className="absolute -bottom-2 -right-2 w-1 h-1 rounded-full opacity-50" style={{
                              backgroundColor: colors.medium,
                              animation: 'float 3s ease-in-out infinite 2s'
                            }} />
                            <div className="absolute -bottom-1 -left-3 w-0.5 h-0.5 rounded-full opacity-35" style={{
                              backgroundColor: colors.medium,
                              animation: 'float 3s ease-in-out infinite 0.5s'
                            }} />
                          </>
                        )}
                        
                        <div className={`text-sm leading-tight px-4 py-3 rounded-xl border backdrop-blur-sm transition-all duration-300`} style={{
                      background: isActive 
                        ? `linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--background-alt)) 100%)` 
                        : 'hsl(var(--card))',
                      borderColor: isActive ? colors.medium : colors.light,
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? colors.strong : 'hsl(var(--foreground))',
                      boxShadow: isActive 
                        ? `0 2px 12px ${colors.light}` 
                        : `0 2px 8px hsl(var(--background-alt) / 0.3)`
                    }}>
                          {feature.text}
                        </div>
                      </div>
                    </div>;
              })}
              </div>

              {/* Duplicate sliding content for seamless loop */}
              <div className="absolute top-0 h-full will-change-transform" style={{
              left: `${loopWidth}px`,
              width: `${contentWidth}px`,
              transform: `translate3d(-${xOffset}px, 0, 0)`
            }}>
                {/* Invisible start/end spacers for balance */}
                <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${START_OFFSET}px`
              }} />
                <div style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: `${START_OFFSET}px`
              }} />

                {/* Nodes and branches */}
                {allFeatures.map((feature, i) => {
                const x = START_OFFSET + i * SPACING;
                const isActive = feature.sectionIndex === activeSection;
                const colors = getColors(feature.sectionIndex);
                const branchColor = isActive ? colors.strong : colors.light;
                const textColor = isActive ? colors.strong : colors.medium;
                return <div key={`${feature.text}-${i}-b`} className="absolute" style={{
                  left: `${x}px`,
                  top: "50%",
                  transform: "translate(-50%, -50%)"
                }}>
                      {/* Branch up (top) */}
                      <div className="absolute left-1/2 w-px" style={{
                    bottom: "50%",
                    height: `${BRANCH_LEN}px`,
                    transform: "translateX(-50%)",
                    backgroundColor: branchColor,
                    opacity: feature.isTop ? 1 : 0.35,
                    boxShadow: feature.isTop && isActive ? `0 2px 8px ${colors.light}` : undefined
                  }} aria-hidden />

                      {/* Center node on the line */}
                      <div className="absolute left-1/2 w-3 h-3 rounded-full" style={{
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: branchColor,
                    boxShadow: isActive ? `0 2px 6px ${colors.light}` : undefined,
                    opacity: 1
                  }} aria-hidden />

                      {/* Branch down (bottom) */}
                      <div className="absolute left-1/2 w-px" style={{
                    top: "50%",
                    height: `${BRANCH_LEN}px`,
                    transform: "translateX(-50%)",
                    backgroundColor: branchColor,
                    opacity: feature.isTop ? 0.35 : 1,
                    boxShadow: !feature.isTop && isActive ? `0 2px 8px ${colors.light}` : undefined
                  }} aria-hidden />

                      {/* Feature label */}
                      <div className="absolute left-1/2 text-center" style={{
                    color: textColor,
                    transform: feature.isTop ? `translate(-50%, calc(-50% - ${BRANCH_LEN + 14}px))` : `translate(-50%, calc(-50% + ${BRANCH_LEN + 14}px))`
                  }}>
                        {/* Floating dots around active feature */}
                        {isActive && (
                          <>
                            <div className="absolute -top-2 -left-2 w-1 h-1 rounded-full opacity-60" style={{
                              backgroundColor: colors.medium,
                              animation: 'float 3s ease-in-out infinite'
                            }} />
                            <div className="absolute -top-1 -right-3 w-0.5 h-0.5 rounded-full opacity-40" style={{
                              backgroundColor: colors.medium,
                              animation: 'float 3s ease-in-out infinite 1s'
                            }} />
                            <div className="absolute -bottom-2 -right-2 w-1 h-1 rounded-full opacity-50" style={{
                              backgroundColor: colors.medium,
                              animation: 'float 3s ease-in-out infinite 2s'
                            }} />
                            <div className="absolute -bottom-1 -left-3 w-0.5 h-0.5 rounded-full opacity-35" style={{
                              backgroundColor: colors.medium,
                              animation: 'float 3s ease-in-out infinite 0.5s'
                            }} />
                          </>
                        )}
                        
                        <div className={`text-sm leading-tight px-4 py-3 rounded-xl border backdrop-blur-sm transition-all duration-300`} style={{
                      background: isActive 
                        ? `linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--background-alt)) 100%)` 
                        : 'hsl(var(--card))',
                      borderColor: isActive ? colors.medium : colors.light,
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? colors.strong : 'hsl(var(--foreground))',
                      boxShadow: isActive 
                        ? `0 2px 12px ${colors.light}` 
                        : `0 2px 8px hsl(var(--background-alt) / 0.3)`
                    }}>
                          {feature.text}
                        </div>
                      </div>
                    </div>;
              })}
              </div>
            </div>

          </div>

        {/* Dynamic subtitle under the tree */}
        <div className="text-center mt-6">
          <h3 className="text-3xl font-semibold transition-colors" style={{ color: getColors(activeSection).strong }}>
            {sections[activeSection].title}
          </h3>
        </div>

        {/* Bottom spacing */}
        <div className="mt-4" />
      </div>
    </section>;
};
export default TableStakesSection;