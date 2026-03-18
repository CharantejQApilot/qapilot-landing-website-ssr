"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const ProductJourneySection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: step1Ref, isVisible: step1Visible } = useScrollAnimation(0.3);
  const { ref: step2Ref, isVisible: step2Visible } = useScrollAnimation(0.3);
  const { ref: step3Ref, isVisible: step3Visible } = useScrollAnimation(0.3);
  const { ref: step4Ref, isVisible: step4Visible } = useScrollAnimation(0.3);
  const { ref: step5Ref, isVisible: step5Visible } = useScrollAnimation(0.3);
  const { ref: step6Ref, isVisible: step6Visible } = useScrollAnimation(0.3);
  const { ref: step7Ref, isVisible: step7Visible } = useScrollAnimation(0.3);

  const steps = [
    {
      title: "Upload Your App",
      description: "Start by uploading your Android or iOS app.",
      ref: step1Ref,
      isVisible: step1Visible,
      animation: (
        <div className="relative max-w-md mx-auto">
          <svg className="w-full h-64" viewBox="0 0 300 200" fill="none">
            {/* Upload cloud */}
            <g transform="translate(150, 80)">
              <path d="M-30,-10 C-35,-15 -25,-25 -15,-20 C-10,-30 10,-30 15,-20 C25,-25 35,-15 30,-10 L30,5 L-30,5 Z" 
                    fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="2">
                <animateTransform attributeName="transform" type="scale" values="1; 1.1; 1" dur="2s" repeatCount="indefinite" />
              </path>
              
              {/* Upload arrow */}
              <path d="M0,10 L0,-5 M-8,3 L0,-5 L8,3" stroke="hsl(var(--primary))" strokeWidth="3" 
                    fill="none" strokeLinecap="round" strokeLinejoin="round">
                <animate attributeName="opacity" values="0.5; 1; 0.5" dur="1.5s" repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="translateY" values="0; -3; 0" dur="1.5s" repeatCount="indefinite" />
              </path>
            </g>
            
            {/* File types bouncing */}
            <g transform="translate(80, 140)">
              <rect x="-18" y="-12" width="36" height="24" rx="6" fill="hsl(var(--primary))" opacity="0.9">
                <animateTransform attributeName="transform" type="translateY" values="0; -10; 0" dur="2s" repeatCount="indefinite" begin="0s" />
              </rect>
              <text x="0" y="3" textAnchor="middle" className="text-sm fill-primary-foreground font-bold">APK</text>
            </g>
            
            <g transform="translate(220, 140)">
              <rect x="-18" y="-12" width="36" height="24" rx="6" fill="hsl(var(--secondary))" opacity="0.9">
                <animateTransform attributeName="transform" type="translateY" values="0; -10; 0" dur="2s" repeatCount="indefinite" begin="0.7s" />
              </rect>
              <text x="0" y="3" textAnchor="middle" className="text-sm fill-secondary-foreground font-bold">IPA</text>
            </g>
            
            {/* Upload progress particles */}
            <circle cx="120" cy="100" r="2" fill="hsl(var(--primary))" opacity="0">
              <animate attributeName="opacity" values="0; 1; 0" dur="1s" repeatCount="indefinite" begin="0s" />
              <animateTransform attributeName="transform" type="translate" values="120,100; 150,80" dur="1s" repeatCount="indefinite" begin="0s" />
            </circle>
            <circle cx="180" cy="100" r="2" fill="hsl(var(--primary))" opacity="0">
              <animate attributeName="opacity" values="0; 1; 0" dur="1s" repeatCount="indefinite" begin="0.3s" />
              <animateTransform attributeName="transform" type="translate" values="180,100; 150,80" dur="1s" repeatCount="indefinite" begin="0.3s" />
            </circle>
            <circle cx="110" cy="120" r="2" fill="hsl(var(--primary))" opacity="0">
              <animate attributeName="opacity" values="0; 1; 0" dur="1s" repeatCount="indefinite" begin="0.6s" />
              <animateTransform attributeName="transform" type="translate" values="110,120; 150,80" dur="1s" repeatCount="indefinite" begin="0.6s" />
            </circle>
          </svg>
        </div>
      )
    },
    {
      title: "Generate Knowledge Graph", 
      description: "QApilot's crawler autonomously explores the app to produce a comprehensive knowledge graph of screens, transitions and states.",
      ref: step2Ref,
      isVisible: step2Visible,
      animation: (
        <div className="relative max-w-md mx-auto">
          <svg className="w-full h-64" viewBox="0 0 300 200" fill="none">
            {/* Random dots that connect with pulsing effect */}
            <circle cx="50" cy="50" r="4" fill="hsl(var(--primary))">
              <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0s" fill="freeze" />
              <animate attributeName="r" values="4; 6; 4" dur="2s" repeatCount="indefinite" begin="2s" />
            </circle>
            <circle cx="150" cy="40" r="4" fill="hsl(var(--primary))">
              <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0.3s" fill="freeze" />
              <animate attributeName="r" values="4; 6; 4" dur="2s" repeatCount="indefinite" begin="2.3s" />
            </circle>
            <circle cx="220" cy="80" r="4" fill="hsl(var(--primary))">
              <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0.6s" fill="freeze" />
              <animate attributeName="r" values="4; 6; 4" dur="2s" repeatCount="indefinite" begin="2.6s" />
            </circle>
            <circle cx="80" cy="120" r="4" fill="hsl(var(--primary))">
              <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0.9s" fill="freeze" />
              <animate attributeName="r" values="4; 6; 4" dur="2s" repeatCount="indefinite" begin="2.9s" />
            </circle>
            <circle cx="200" cy="140" r="4" fill="hsl(var(--primary))">
              <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="1.2s" fill="freeze" />
              <animate attributeName="r" values="4; 6; 4" dur="2s" repeatCount="indefinite" begin="3.2s" />
            </circle>
            <circle cx="120" cy="160" r="4" fill="hsl(var(--primary))">
              <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="1.5s" fill="freeze" />
              <animate attributeName="r" values="4; 6; 4" dur="2s" repeatCount="indefinite" begin="3.5s" />
            </circle>
            
            {/* Connecting lines */}
            <path d="M 50 50 L 150 40" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100">
              <animate attributeName="stroke-dashoffset" values="100; 0" dur="0.8s" begin="1s" fill="freeze" />
            </path>
            <path d="M 150 40 L 220 80" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100">
              <animate attributeName="stroke-dashoffset" values="100; 0" dur="0.8s" begin="1.3s" fill="freeze" />
            </path>
            <path d="M 50 50 L 80 120" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100">
              <animate attributeName="stroke-dashoffset" values="100; 0" dur="0.8s" begin="1.6s" fill="freeze" />
            </path>
            <path d="M 220 80 L 200 140" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100">
              <animate attributeName="stroke-dashoffset" values="100; 0" dur="0.8s" begin="1.9s" fill="freeze" />
            </path>
            <path d="M 80 120 L 120 160" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100">
              <animate attributeName="stroke-dashoffset" values="100; 0" dur="0.8s" begin="2.2s" fill="freeze" />
            </path>
            <path d="M 200 140 L 120 160" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100">
              <animate attributeName="stroke-dashoffset" values="100; 0" dur="0.8s" begin="2.5s" fill="freeze" />
            </path>
          </svg>
        </div>
      )
    },
    {
      title: "Generate the Sitemap",
      description: "The network of intelligent agents builds a sitemap, prioritising critical paths and capturing edge cases.",
      ref: step3Ref,
      isVisible: step3Visible,
      animation: (
        <div className="relative max-w-md mx-auto">
          <svg className="w-full h-64" viewBox="0 0 300 200" fill="none">
            {/* Tree structure */}
            <g transform="translate(150, 30)">
              {/* Root node */}
              <rect x="-15" y="-8" width="30" height="16" rx="4" fill="hsl(var(--primary))" />
              <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0s" fill="freeze" />
              
              {/* Level 1 branches */}
              <g transform="translate(-60, 40)">
                <rect x="-12" y="-6" width="24" height="12" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1" />
                <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0.5s" fill="freeze" />
              </g>
              <g transform="translate(0, 40)">
                <rect x="-12" y="-6" width="24" height="12" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
                <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0.5s" fill="freeze" />
              </g>
              <g transform="translate(60, 40)">
                <rect x="-12" y="-6" width="24" height="12" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1" />
                <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0.5s" fill="freeze" />
              </g>
              
              {/* Level 2 branches */}
              <g transform="translate(-80, 80)">
                <rect x="-8" y="-4" width="16" height="8" rx="2" fill="hsl(var(--muted))" />
                <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="1s" fill="freeze" />
              </g>
              <g transform="translate(-40, 80)">
                <rect x="-8" y="-4" width="16" height="8" rx="2" fill="hsl(var(--muted))" />
                <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="1s" fill="freeze" />
              </g>
              <g transform="translate(40, 80)">
                <rect x="-8" y="-4" width="16" height="8" rx="2" fill="hsl(var(--muted))" />
                <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="1s" fill="freeze" />
              </g>
              <g transform="translate(80, 80)">
                <rect x="-8" y="-4" width="16" height="8" rx="2" fill="hsl(var(--muted))" />
                <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="1s" fill="freeze" />
              </g>
              
              {/* Connecting lines */}
              <path d="M 0 8 L -60 32" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="50" strokeDashoffset="50">
                <animate attributeName="stroke-dashoffset" values="50; 0" dur="0.5s" begin="0.7s" fill="freeze" />
              </path>
              <path d="M 0 8 L 0 32" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="50" strokeDashoffset="50">
                <animate attributeName="stroke-dashoffset" values="50; 0" dur="0.5s" begin="0.7s" fill="freeze" />
              </path>
              <path d="M 0 8 L 60 32" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="50" strokeDashoffset="50">
                <animate attributeName="stroke-dashoffset" values="50; 0" dur="0.5s" begin="0.7s" fill="freeze" />
              </path>
            </g>
          </svg>
        </div>
      )
    },
    {
      title: "Test Case Generation",
      description: "Agents convert the knowledge graph into structured test cases, ready for execution.",
      ref: step4Ref,
      isVisible: step4Visible,
      animation: (
        <div className="relative max-w-md mx-auto">
          <svg className="w-full h-64" viewBox="0 0 300 200" fill="none">
            {/* Source document */}
            <g transform="translate(50, 100)">
              <rect x="-15" y="-20" width="30" height="40" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
              <line x1="-10" y1="-10" x2="10" y2="-10" stroke="hsl(var(--primary))" strokeWidth="1" />
              <line x1="-10" y1="-5" x2="10" y2="-5" stroke="hsl(var(--primary))" strokeWidth="1" />
              <line x1="-10" y1="0" x2="10" y2="0" stroke="hsl(var(--primary))" strokeWidth="1" />
            </g>
            
            {/* Test case sheets sliding out */}
            <g transform="translate(120, 80)">
              <rect x="-12" y="-15" width="24" height="30" rx="3" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1" />
              <circle cx="5" cy="-5" r="2" fill="hsl(var(--primary))" />
              <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0.5s" fill="freeze" />
              <animateTransform attributeName="transform" type="translate" values="50,100; 120,80" dur="0.8s" begin="0.5s" fill="freeze" />
            </g>
            
            <g transform="translate(150, 90)">
              <rect x="-12" y="-15" width="24" height="30" rx="3" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1" />
              <circle cx="5" cy="-5" r="2" fill="hsl(var(--primary))" />
              <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="1s" fill="freeze" />
              <animateTransform attributeName="transform" type="translate" values="50,100; 150,90" dur="0.8s" begin="1s" fill="freeze" />
            </g>
            
            <g transform="translate(180, 100)">
              <rect x="-12" y="-15" width="24" height="30" rx="3" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1" />
              <circle cx="5" cy="-5" r="2" fill="hsl(var(--primary))" />
              <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="1.5s" fill="freeze" />
              <animateTransform attributeName="transform" type="translate" values="50,100; 180,100" dur="0.8s" begin="1.5s" fill="freeze" />
            </g>
            
            <g transform="translate(210, 110)">
              <rect x="-12" y="-15" width="24" height="30" rx="3" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1" />
              <circle cx="5" cy="-5" r="2" fill="hsl(var(--primary))" />
              <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="2s" fill="freeze" />
              <animateTransform attributeName="transform" type="translate" values="50,100; 210,110" dur="0.8s" begin="2s" fill="freeze" />
            </g>
            
            {/* Checkmarks appearing */}
            <g transform="translate(120, 80)">
              <path d="M 2 -2 L 4 0 L 8 -4" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <animate attributeName="opacity" values="0; 1" dur="0.3s" begin="2.5s" fill="freeze" />
              </path>
            </g>
          </svg>
        </div>
      )
    },
    {
      title: "Record & Playback",
      description: "A \"human in the loop\" module lets you record bespoke flows or override AI decisions when needed.",
      ref: step5Ref,
      isVisible: step5Visible,
      animation: (
        <div className="relative max-w-md mx-auto">
          <svg className="w-full h-64" viewBox="0 0 300 200" fill="none">
            {/* Phone screen */}
            <g transform="translate(150, 100)">
              <rect x="-25" y="-35" width="50" height="70" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2">
                <animateTransform attributeName="transform" type="scale" values="1; 1.02; 1" dur="3s" repeatCount="indefinite" />
              </rect>
              <rect x="-20" y="-30" width="40" height="55" rx="4" fill="hsl(var(--background))" />
            </g>
            
            {/* Record button with pulsing effect */}
            <g transform="translate(80, 80)">
              <circle r="20" fill="hsl(var(--destructive))" opacity="0.2">
                <animate attributeName="r" values="20; 25; 20" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2; 0.05; 0.2" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="15" fill="hsl(var(--destructive))" opacity="0.9">
                <animate attributeName="r" values="15; 18; 15" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="8" fill="hsl(var(--destructive))" />
              
              {/* REC text */}
              <text x="0" y="35" textAnchor="middle" className="text-xs fill-destructive font-bold">REC</text>
            </g>
            
            {/* Playback button */}
            <g transform="translate(220, 80)" opacity="0">
              <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="3s" fill="freeze" />
              <circle r="20" fill="hsl(var(--primary))" opacity="0.2">
                <animate attributeName="r" values="20; 25; 20" dur="2s" repeatCount="indefinite" begin="3s" />
                <animate attributeName="opacity" values="0.2; 0.05; 0.2" dur="2s" repeatCount="indefinite" begin="3s" />
              </circle>
              <circle r="15" fill="hsl(var(--primary))" opacity="0.9" />
              <polygon points="-5,-8 -5,8 8,0" fill="hsl(var(--primary-foreground))">
                <animateTransform attributeName="transform" type="scale" values="1; 1.1; 1" dur="1.5s" repeatCount="indefinite" begin="3s" />
              </polygon>
              
              {/* PLAY text */}
              <text x="0" y="35" textAnchor="middle" className="text-xs fill-primary font-bold">PLAY</text>
            </g>
            
            {/* Recording flow indicator */}
            <path d="M 95 80 Q 150 50 205 80" stroke="hsl(var(--primary))" strokeWidth="2" 
                  fill="none" strokeDasharray="120" strokeDashoffset="120" opacity="0">
              <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="3s" fill="freeze" />
              <animate attributeName="stroke-dashoffset" values="120; 0" dur="1s" begin="3.5s" fill="freeze" />
            </path>
            
            {/* Action dots on phone */}
            <g transform="translate(150, 100)">
              <circle cx="8" cy="-15" r="3" fill="hsl(var(--accent))" opacity="0">
                <animate attributeName="opacity" values="0; 1; 0" dur="1s" repeatCount="indefinite" begin="1s" />
                <animate attributeName="r" values="3; 5; 3" dur="1s" repeatCount="indefinite" begin="1s" />
              </circle>
              <circle cx="-10" cy="0" r="3" fill="hsl(var(--accent))" opacity="0">
                <animate attributeName="opacity" values="0; 1; 0" dur="1s" repeatCount="indefinite" begin="1.5s" />
                <animate attributeName="r" values="3; 5; 3" dur="1s" repeatCount="indefinite" begin="1.5s" />
              </circle>
              <circle cx="12" cy="15" r="3" fill="hsl(var(--accent))" opacity="0">
                <animate attributeName="opacity" values="0; 1; 0" dur="1s" repeatCount="indefinite" begin="2s" />
                <animate attributeName="r" values="3; 5; 3" dur="1s" repeatCount="indefinite" begin="2s" />
              </circle>
            </g>
            
            {/* Playback replay effect */}
            <g transform="translate(150, 100)" opacity="0">
              <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="4s" fill="freeze" />
              <circle cx="8" cy="-15" r="3" fill="hsl(var(--secondary))" opacity="0">
                <animate attributeName="opacity" values="0; 1; 0" dur="0.8s" repeatCount="indefinite" begin="4.5s" />
                <animate attributeName="r" values="3; 4; 3" dur="0.8s" repeatCount="indefinite" begin="4.5s" />
              </circle>
              <circle cx="-10" cy="0" r="3" fill="hsl(var(--secondary))" opacity="0">
                <animate attributeName="opacity" values="0; 1; 0" dur="0.8s" repeatCount="indefinite" begin="4.8s" />
                <animate attributeName="r" values="3; 4; 3" dur="0.8s" repeatCount="indefinite" begin="4.8s" />
              </circle>
              <circle cx="12" cy="15" r="3" fill="hsl(var(--secondary))" opacity="0">
                <animate attributeName="opacity" values="0; 1; 0" dur="0.8s" repeatCount="indefinite" begin="5.1s" />
                <animate attributeName="r" values="3; 4; 3" dur="0.8s" repeatCount="indefinite" begin="5.1s" />
              </circle>
            </g>
          </svg>
        </div>
      )
    },
    {
      title: "Test Execution",
      description: "Execute tests across real devices and cloud farms (Browserstack, LambdaTest, SauceLabs) in parallel.",
      ref: step6Ref,
      isVisible: step6Visible,
      animation: (
        <div className="relative max-w-md mx-auto">
          <svg className="w-full h-64" viewBox="0 0 300 200" fill="none">
            {/* Multiple devices with enhanced animations */}
            <g transform="translate(60, 100)">
              <rect x="-15" y="-25" width="30" height="50" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2">
                <animateTransform attributeName="transform" type="scale" values="1; 1.05; 1" dur="3s" repeatCount="indefinite" begin="0s" />
              </rect>
              <rect x="-12" y="-20" width="24" height="35" rx="2" fill="hsl(var(--background))" />
              <rect x="-10" y="-15" width="20" height="5" rx="1" fill="hsl(var(--primary))" opacity="0">
                <animate attributeName="opacity" values="0; 1; 0" dur="1.5s" repeatCount="indefinite" begin="0s" />
                <animate attributeName="width" values="0; 20; 20" dur="1.5s" repeatCount="indefinite" begin="0s" />
              </rect>
              {/* Test completion checkmark */}
              <path d="M -5 5 L -2 8 L 3 3" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0">
                <animate attributeName="opacity" values="0; 1; 0" dur="0.5s" begin="1.5s" />
              </path>
            </g>
            
            <g transform="translate(120, 100)">
              <rect x="-15" y="-25" width="30" height="50" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2">
                <animateTransform attributeName="transform" type="scale" values="1; 1.05; 1" dur="3s" repeatCount="indefinite" begin="0.5s" />
              </rect>
              <rect x="-12" y="-20" width="24" height="35" rx="2" fill="hsl(var(--background))" />
              <rect x="-10" y="-15" width="20" height="5" rx="1" fill="hsl(var(--primary))" opacity="0">
                <animate attributeName="opacity" values="0; 1; 0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
                <animate attributeName="width" values="0; 20; 20" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
              </rect>
              <path d="M -5 5 L -2 8 L 3 3" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0">
                <animate attributeName="opacity" values="0; 1; 0" dur="0.5s" begin="2s" />
              </path>
            </g>
            
            <g transform="translate(180, 100)">
              <rect x="-15" y="-25" width="30" height="50" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2">
                <animateTransform attributeName="transform" type="scale" values="1; 1.05; 1" dur="3s" repeatCount="indefinite" begin="1s" />
              </rect>
              <rect x="-12" y="-20" width="24" height="35" rx="2" fill="hsl(var(--background))" />
              <rect x="-10" y="-15" width="20" height="5" rx="1" fill="hsl(var(--primary))" opacity="0">
                <animate attributeName="opacity" values="0; 1; 0" dur="1.5s" repeatCount="indefinite" begin="1s" />
                <animate attributeName="width" values="0; 20; 20" dur="1.5s" repeatCount="indefinite" begin="1s" />
              </rect>
              <path d="M -5 5 L -2 8 L 3 3" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0">
                <animate attributeName="opacity" values="0; 1; 0" dur="0.5s" begin="2.5s" />
              </path>
            </g>
            
            <g transform="translate(240, 100)">
              <rect x="-15" y="-25" width="30" height="50" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2">
                <animateTransform attributeName="transform" type="scale" values="1; 1.05; 1" dur="3s" repeatCount="indefinite" begin="1.5s" />
              </rect>
              <rect x="-12" y="-20" width="24" height="35" rx="2" fill="hsl(var(--background))" />
              <rect x="-10" y="-15" width="20" height="5" rx="1" fill="hsl(var(--primary))" opacity="0">
                <animate attributeName="opacity" values="0; 1; 0" dur="1.5s" repeatCount="indefinite" begin="1.5s" />
                <animate attributeName="width" values="0; 20; 20" dur="1.5s" repeatCount="indefinite" begin="1.5s" />
              </rect>
              <path d="M -5 5 L -2 8 L 3 3" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0">
                <animate attributeName="opacity" values="0; 1; 0" dur="0.5s" begin="3s" />
              </path>
            </g>
            
            {/* Progress bars */}
            <g transform="translate(60, 140)">
              <rect x="-12" y="-2" width="24" height="4" rx="2" fill="hsl(var(--muted))" />
              <rect x="-12" y="-2" width="0" height="4" rx="2" fill="hsl(var(--primary))">
                <animate attributeName="width" values="0; 24; 0" dur="3s" repeatCount="indefinite" begin="0s" />
              </rect>
            </g>
            
            <g transform="translate(120, 140)">
              <rect x="-12" y="-2" width="24" height="4" rx="2" fill="hsl(var(--muted))" />
              <rect x="-12" y="-2" width="0" height="4" rx="2" fill="hsl(var(--primary))">
                <animate attributeName="width" values="0; 24; 0" dur="3s" repeatCount="indefinite" begin="0.5s" />
              </rect>
            </g>
            
            <g transform="translate(180, 140)">
              <rect x="-12" y="-2" width="24" height="4" rx="2" fill="hsl(var(--muted))" />
              <rect x="-12" y="-2" width="0" height="4" rx="2" fill="hsl(var(--primary))">
                <animate attributeName="width" values="0; 24; 0" dur="3s" repeatCount="indefinite" begin="1s" />
              </rect>
            </g>
            
            <g transform="translate(240, 140)">
              <rect x="-12" y="-2" width="24" height="4" rx="2" fill="hsl(var(--muted))" />
              <rect x="-12" y="-2" width="0" height="4" rx="2" fill="hsl(var(--primary))">
                <animate attributeName="width" values="0; 24; 0" dur="3s" repeatCount="indefinite" begin="1.5s" />
              </rect>
            </g>
          </svg>
        </div>
      )
    },
    {
      title: "Reporting",
      description: "Receive detailed reports with coverage metrics, performance analytics and actionable insights.",
      ref: step7Ref,
      isVisible: step7Visible,
      animation: (
        <div className="relative max-w-md mx-auto">
          <svg className="w-full h-64" viewBox="0 0 300 200" fill="none">
            {/* Dashboard background */}
            <rect x="50" y="50" width="200" height="120" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
            
            {/* Bar chart */}
            <g transform="translate(80, 140)">
              <rect x="0" y="0" width="8" height="0" fill="hsl(var(--primary))">
                <animate attributeName="height" values="0; 25" dur="1s" begin="0.5s" fill="freeze" />
                <animate attributeName="y" values="0; -25" dur="1s" begin="0.5s" fill="freeze" />
              </rect>
              <rect x="15" y="0" width="8" height="0" fill="hsl(var(--primary))">
                <animate attributeName="height" values="0; 35" dur="1s" begin="0.8s" fill="freeze" />
                <animate attributeName="y" values="0; -35" dur="1s" begin="0.8s" fill="freeze" />
              </rect>
              <rect x="30" y="0" width="8" height="0" fill="hsl(var(--primary))">
                <animate attributeName="height" values="0; 20" dur="1s" begin="1.1s" fill="freeze" />
                <animate attributeName="y" values="0; -20" dur="1s" begin="1.1s" fill="freeze" />
              </rect>
              <rect x="45" y="0" width="8" height="0" fill="hsl(var(--primary))">
                <animate attributeName="height" values="0; 30" dur="1s" begin="1.4s" fill="freeze" />
                <animate attributeName="y" values="0; -30" dur="1s" begin="1.4s" fill="freeze" />
              </rect>
            </g>
            
            {/* Pie chart */}
            <g transform="translate(200, 100)">
              <circle r="25" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
              <circle r="25" fill="none" stroke="hsl(var(--primary))" strokeWidth="6" strokeDasharray="157" strokeDashoffset="157">
                <animate attributeName="stroke-dashoffset" values="157; 39" dur="2s" begin="1s" fill="freeze" />
              </circle>
            </g>
            
            {/* Coverage percentage */}
            <g transform="translate(200, 100)">
              <text x="0" y="0" textAnchor="middle" className="text-sm fill-foreground font-bold">
                <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="2.5s" fill="freeze" />
                95%
              </text>
            </g>
            
            {/* Bug indicators */}
            <g transform="translate(120, 80)">
              <circle r="4" fill="hsl(var(--destructive))" opacity="0">
                <animate attributeName="opacity" values="0; 1" dur="0.3s" begin="3s" fill="freeze" />
              </circle>
              <text x="8" y="2" className="text-xs fill-destructive">3 bugs</text>
            </g>
            
            {/* Performance metrics */}
            <g transform="translate(80, 65)">
              <rect x="0" y="0" width="40" height="8" rx="4" fill="hsl(var(--muted))" />
              <rect x="0" y="0" width="0" height="8" rx="4" fill="hsl(var(--primary))">
                <animate attributeName="width" values="0; 32" dur="1.5s" begin="2s" fill="freeze" />
              </rect>
            </g>
          </svg>
        </div>
      )
    }
  ];

  return (
    <section className="pt-8 pb-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-20 transition-all duration-700 ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            From <span className="text-primary">App Upload</span> to Full Test Coverage
          </h2>
        </div>

        {/* Steps */}
        <div className="space-y-32">
          {steps.map((step, index) => (
            <div 
              key={index}
              ref={step.ref as React.RefObject<HTMLDivElement>}
              className={`relative transition-all duration-700 ${
                step.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 0 ? '' : 'lg:flex-row-reverse'
              }`}>
                {/* Text Content */}
                <div className={`${
                  index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
                } transition-all duration-700 delay-200 ${
                  step.isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : `opacity-0 ${index % 2 === 0 ? '-translate-x-10' : 'translate-x-10'}`
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed pl-11">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Animation */}
                <div className={`${
                  index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
                } transition-all duration-700 delay-300 ${
                  step.isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : `opacity-0 ${index % 2 === 0 ? 'translate-x-10' : '-translate-x-10'}`
                }`}>
                  <div className="flex justify-center">
                    {step.animation}
                  </div>
                </div>
              </div>

              {/* Step connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-16">
                  <div className={`w-px h-16 bg-gradient-to-b from-primary/60 to-transparent transition-all duration-1000 delay-500 ${
                    step.isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                  }`} style={{ transformOrigin: 'top' }}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductJourneySection;