"use client";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";
import { CheckCircle, Code, Users, Zap, Target, Layers } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import HubSpotEmbedForm from "@/components/HubSpotEmbedForm";
const ForFlutterClient = () => {
  const {
    openForm
  } = useHubSpotForm();

  useEffect(() => {
    const loadGAScripts = () => {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16956806550';
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-16956806550');
      `;
      document.head.appendChild(script2);

      const script3 = document.createElement('script');
      script3.innerHTML = `
        function gtag_report_conversion(url) {
          var callback = function () {
            if (typeof(url) != 'undefined') {
              window.location = url;
            }
          };
          gtag('event', 'conversion', {
              'send_to': 'AW-16956806550/sV_DCNj5tosbEJar0ZU_',
              'value': 1.0,
              'currency': 'INR',
              'event_callback': callback
          });
          return false;
        }
      `;
      document.head.appendChild(script3);

      return [script1, script2, script3];
    };

    let scripts: HTMLScriptElement[] = [];

    if ('requestIdleCallback' in window) {
      const idleId = (window as any).requestIdleCallback(() => {
        scripts = loadGAScripts();
      }, { timeout: 3000 });
      return () => {
        (window as any).cancelIdleCallback(idleId);
        scripts.forEach(s => s.parentNode?.removeChild(s));
      };
    } else {
      const timerId = setTimeout(() => {
        scripts = loadGAScripts();
      }, 1000);
      return () => {
        clearTimeout(timerId);
        scripts.forEach(s => s.parentNode?.removeChild(s));
      };
    }
  }, []);
  const {
    ref: heroRef,
    isVisible: heroVisible
  } = useScrollAnimation();
  const {
    ref: problemRef,
    isVisible: problemVisible
  } = useScrollAnimation();
  const {
    ref: solutionRef,
    isVisible: solutionVisible
  } = useScrollAnimation();
  const {
    ref: moreRef,
    isVisible: moreVisible
  } = useScrollAnimation();
  const handleGetStarted = () => {
    const formElement = document.querySelector('.hubspot-form-container');
    if (formElement) {
      formElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };
  return (
    <>
        {/* Hero Section */}
        <section ref={heroRef} className="section-edge w-full py-20 lg:py-32">
          <div className="section-full mx-auto max-w-screen-xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`space-y-12 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="space-y-8">
                  <h1 className="font-heading text-4xl font-medium leading-tight text-foreground lg:text-6xl">
                    The Best <span className="text-primary">AI-Native Platform</span> for{" "}
                    <span className="text-primary">Flutter App Testing</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                    Instant sanity checks and scalable functional coverage, engineered for Flutter's unique needs. Complete the form to get started.
                  </p>
                </div>

                <div className={`space-y-6 transition-all duration-700 delay-100 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Instant sanity checks and scalable functional coverage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Zero setup · Script-free · Cross-platform recording</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Engineered specifically for Flutter's unique needs</span>
                  </div>
                </div>

                {/* Additional Value Props */}
                <div className="space-y-6 pt-4">
                  
                </div>

                {/* Horizontal Decorative Elements */}
                <div className="mt-8">
                  {/* Flowing Connection Line */}
                  <div className="relative py-4">
                    <svg className="w-full h-8" viewBox="0 0 400 32">
                      <path d="M0 16 Q100 8 200 16 Q300 24 400 16" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeDasharray="8 4" className="animate-pulse" opacity="0.6" />
                      {/* Moving dots along the path */}
                      <circle cx="50" cy="14" r="3" fill="hsl(var(--primary))" className="animate-pulse delay-0" opacity="0.8" />
                      <circle cx="150" cy="16" r="2" fill="hsl(var(--primary))" className="animate-pulse delay-500" opacity="0.6" />
                      <circle cx="250" cy="18" r="3" fill="hsl(var(--primary))" className="animate-pulse delay-1000" opacity="0.8" />
                      <circle cx="350" cy="16" r="2" fill="hsl(var(--primary))" className="animate-pulse delay-1500" opacity="0.6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className={`lg:pl-12 transition-all duration-700 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <HubSpotEmbedForm formId="9fc3d64c-42df-4765-bffa-f1fa70a1b761" portalId="47284450" className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-2xl w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* The Flutter Testing Problem */}
        <section ref={problemRef} className="section-edge w-full border-t border-border bg-muted/30 py-20">
          <div className="section-full mx-auto max-w-screen-xl">
            <div className={`space-y-16 transition-all duration-700 ${problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center space-y-6">
                <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
                  The <span className="text-primary">Flutter Testing</span> Problem
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Flutter's unique architecture creates distinct challenges for traditional testing approaches
                </p>
              </div>

              {/* Visual Problem Flow */}
              <div className="relative max-w-6xl mx-auto">
                {/* Background connecting lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{
                height: '400px'
              }}>
                  <defs>
                    <linearGradient id="problemGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="hsl(var(--destructive))" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  
                  {/* Interrupted flow line */}
                  <path d="M0 200 Q150 180 300 200 Q450 220 600 200 Q750 180 900 200" stroke="url(#problemGradient)" strokeWidth="3" fill="none" strokeDasharray="10 5" className="animate-pulse" />
                  
                  {/* Problem indicators */}
                  <circle cx="200" cy="200" r="8" fill="hsl(var(--destructive))" className="animate-pulse delay-0">
                    <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="400" cy="200" r="8" fill="hsl(var(--destructive))" className="animate-pulse delay-500">
                    <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="600" cy="200" r="8" fill="hsl(var(--destructive))" className="animate-pulse delay-1000">
                    <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="800" cy="200" r="8" fill="hsl(var(--destructive))" className="animate-pulse delay-1500">
                    <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>

                {/* Problem blocks positioned along the flow */}
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 pb-8">
                  {/* Widget-Driven UI Structure */}
                  <div className={`relative group transition-all duration-700 delay-100 ${problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="bg-background/90 backdrop-blur-sm border border-destructive/20 rounded-xl p-6 hover:border-destructive/40 transition-all duration-300 hover:transform hover:scale-105 h-full">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
                          <div className="text-xs uppercase tracking-wider text-destructive font-medium">UNSTABLE</div>
                        </div>
                        <h3 className="font-bold text-foreground text-lg">Widget-Driven UI Structure</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Selectors are unstable, as widget trees change frequently.
                        </p>
                        {/* Visual indicator */}
                        <div className="flex items-center gap-2 pt-2">
                          <div className="w-4 h-1 bg-destructive/60 rounded"></div>
                          <div className="w-2 h-1 bg-destructive/40 rounded"></div>
                          <div className="w-6 h-1 bg-destructive/20 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Limited Tooling Support */}
                  <div className={`relative group transition-all duration-700 delay-300 ${problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="bg-background/90 backdrop-blur-sm border border-destructive/20 rounded-xl p-6 hover:border-destructive/40 transition-all duration-300 hover:transform hover:scale-105 h-full">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-destructive rounded-full animate-pulse delay-200"></div>
                          <div className="text-xs uppercase tracking-wider text-destructive font-medium">BRITTLE</div>
                        </div>
                        <h3 className="font-bold text-foreground text-lg">Limited Tooling Support</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Appium supports Flutter, but requires plugins and remains brittle.
                        </p>
                        <div className="flex items-center gap-2 pt-2">
                          <div className="w-2 h-1 bg-destructive/60 rounded"></div>
                          <div className="w-6 h-1 bg-destructive/40 rounded"></div>
                          <div className="w-3 h-1 bg-destructive/20 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cross-platform consistency issues */}
                  <div className={`relative group transition-all duration-700 delay-500 ${problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="bg-background/90 backdrop-blur-sm border border-destructive/20 rounded-xl p-6 hover:border-destructive/40 transition-all duration-300 hover:transform hover:scale-105 h-full">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-destructive rounded-full animate-pulse delay-400"></div>
                          <div className="text-xs uppercase tracking-wider text-destructive font-medium">INCONSISTENT</div>
                        </div>
                        <h3 className="font-bold text-foreground text-lg">Cross-platform consistency issues</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Apps behave differently on Android and iOS, especially with platform-specific integrations.
                        </p>
                        <div className="flex items-center gap-2 pt-2">
                          <div className="w-5 h-1 bg-destructive/60 rounded"></div>
                          <div className="w-2 h-1 bg-destructive/40 rounded"></div>
                          <div className="w-4 h-1 bg-destructive/20 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom flow indication */}
                <div className="text-center pt-4">
                  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-destructive/60 rounded-full animate-pulse"></div>
                    <span>Testing workflow disrupted at multiple points</span>
                    <div className="w-2 h-2 bg-destructive/60 rounded-full animate-pulse delay-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How QAPilot Solves Flutter Testing */}
        <section ref={solutionRef} className="section-edge relative w-full overflow-hidden border-t border-border py-12 md:py-20">
          <div className="section-full mx-auto max-w-screen-xl">
            <div className={`transition-all duration-700 ${solutionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center mb-16 space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-foreground">
                  How <span className="text-primary">QApilot Solves</span> Flutter Testing
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                  Purpose-built solutions that understand Flutter's unique architecture
                </p>
              </div>

              {/* Central Line - Hidden on mobile */}
              <div className="relative">
                <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-primary/20 via-primary/60 to-primary/20 transition-all duration-1000 hidden lg:block ${solutionVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`} style={{
                transformOrigin: 'top'
              }}></div>

                {/* Solution 1: AI-Native Self Healing */}
                <div className={`relative mb-12 lg:mb-24 transition-all duration-700 delay-100 ${solutionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  {/* Connection point on central line - Hidden on mobile */}
                  <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10 transition-all duration-500 hidden lg:block ${solutionVisible ? 'scale-100' : 'scale-0'}`}></div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Mobile: Text First, Desktop: Text Left */}
                    <div className="text-center lg:text-left order-1 lg:order-1">
                      {/* Connection line to central point - Hidden on mobile */}
                      <div className="relative">
                        <div className="absolute right-0 top-1/2 w-12 h-px bg-gradient-to-r from-primary/60 to-transparent transform -translate-y-1/2 lg:block hidden"></div>
                        
                        <div className="lg:pr-16">
                          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                            <span className="text-primary">AI-Native</span> Self Healing
                          </h3>
                          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                            Identifies and responds to UI alterations, ensuring stable tests
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Mobile: Animation Second, Desktop: Animation Right */}
                    <div className="flex justify-center order-2 lg:order-2">
                      {/* Connection line to central point - Hidden on mobile */}
                      <div className="relative">
                        <div className="absolute left-0 top-1/2 w-12 h-px bg-gradient-to-l from-primary/60 to-transparent transform -translate-y-1/2 lg:block hidden"></div>
                        
                        <div className="lg:pl-16">
                          {/* AI Self-Healing Animation */}
                          <div className="relative max-w-md mx-auto">
                            <svg className="w-full h-32" viewBox="0 0 160 80" fill="none">
                              {/* UI Element before change */}
                              <g transform="translate(40, 30)">
                                <rect x="-12" y="-8" width="24" height="16" rx="2" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.8">
                                  <animate attributeName="opacity" values="0.8; 0.3; 0.8" dur="3s" repeatCount="indefinite" />
                                </rect>
                                <text x="0" y="0" textAnchor="middle" fontSize="4" fill="hsl(var(--muted-foreground))">OLD</text>
                              </g>
                              
                              {/* AI Processing */}
                              <g transform="translate(80, 30)">
                                {/* Brain/AI symbol */}
                                <circle cx="0" cy="0" r="10" fill="hsl(var(--primary))" opacity="0.2" />
                                <circle cx="0" cy="0" r="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="1">
                                  <animate attributeName="stroke-dasharray" values="0 50; 50 0" dur="2s" repeatCount="indefinite" />
                                </circle>
                                
                                {/* Processing dots */}
                                <circle cx="-3" cy="-3" r="1" fill="hsl(var(--primary))">
                                  <animate attributeName="opacity" values="0.3; 1; 0.3" dur="1s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="3" cy="-3" r="1" fill="hsl(var(--primary))">
                                  <animate attributeName="opacity" values="0.3; 1; 0.3" dur="1s" begin="0.33s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="0" cy="3" r="1" fill="hsl(var(--primary))">
                                  <animate attributeName="opacity" values="0.3; 1; 0.3" dur="1s" begin="0.66s" repeatCount="indefinite" />
                                </circle>
                              </g>
                              
                              {/* UI Element after healing */}
                              <g transform="translate(120, 30)">
                                <rect x="-12" y="-8" width="24" height="16" rx="2" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1">
                                  <animate attributeName="opacity" values="0.3; 1; 0.3" dur="3s" repeatCount="indefinite" />
                                </rect>
                                <text x="0" y="0" textAnchor="middle" fontSize="4" fill="hsl(var(--muted-foreground))">NEW</text>
                                
                                {/* Success indicator */}
                                <circle cx="8" cy="-8" r="3" fill="hsl(var(--primary))" opacity="0.8">
                                  <animate attributeName="r" values="0; 3" dur="0.5s" begin="2s" repeatCount="indefinite" />
                                  <animate attributeName="opacity" values="0; 0.8; 0" dur="1s" begin="2s" repeatCount="indefinite" />
                                </circle>
                              </g>
                              
                              {/* Connection lines with data flow */}
                              <line x1="52" y1="30" x2="70" y2="30" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3 2">
                                <animate attributeName="stroke-dashoffset" values="0; 5" dur="1s" repeatCount="indefinite" />
                              </line>
                              <line x1="90" y1="30" x2="108" y2="30" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3 2">
                                <animate attributeName="stroke-dashoffset" values="0; 5" dur="1s" repeatCount="indefinite" />
                              </line>
                              
                              {/* Data packets */}
                              <circle r="1.5" fill="hsl(var(--primary))">
                                <animateMotion dur="2s" repeatCount="indefinite" path="M 52 30 L 70 30" />
                                <animate attributeName="opacity" values="0; 1; 0" dur="2s" repeatCount="indefinite" />
                              </circle>
                              <circle r="1.5" fill="hsl(var(--primary))">
                                <animateMotion dur="2s" repeatCount="indefinite" path="M 90 30 L 108 30" />
                                <animate attributeName="opacity" values="0; 1; 0" dur="2s" repeatCount="indefinite" />
                              </circle>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Solution 2: Built for Flutter */}
                <div className={`relative mb-12 lg:mb-24 transition-all duration-700 delay-300 ${solutionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  {/* Connection point on central line - Hidden on mobile */}
                  <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10 transition-all duration-500 hidden lg:block ${solutionVisible ? 'scale-100' : 'scale-0'}`}></div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Mobile: Text First, Desktop: Animation Left */}
                    <div className="flex justify-center order-2 lg:order-1">
                      {/* Connection line to central point - Hidden on mobile */}
                      <div className="relative">
                        <div className="absolute right-0 top-1/2 w-12 h-px bg-gradient-to-r from-transparent to-primary/60 transform -translate-y-1/2 lg:block hidden"></div>
                        
                        <div className="lg:pr-16">
                          {/* Flutter Testing Integration Animation */}
                          <div className="relative max-w-md mx-auto">
                            <svg className="w-full h-32" viewBox="0 0 160 80" fill="none">
                              {/* Flutter Widget Structure */}
                              <g transform="translate(50, 40)">
                                {/* Main widget container */}
                                <rect x="-20" y="-15" width="40" height="30" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.8" />
                                
                                {/* Widget tree nodes */}
                                <g opacity="0.9">
                                  <rect x="-12" y="-8" width="8" height="8" rx="2" fill="hsl(var(--primary))" opacity="0.6">
                                    <animate attributeName="opacity" values="0.6; 1; 0.6" dur="2s" repeatCount="indefinite" />
                                  </rect>
                                  <rect x="-2" y="-8" width="8" height="8" rx="2" fill="hsl(var(--primary))" opacity="0.6">
                                    <animate attributeName="opacity" values="0.6; 1; 0.6" dur="2s" begin="0.3s" repeatCount="indefinite" />
                                  </rect>
                                  <rect x="8" y="-8" width="8" height="8" rx="2" fill="hsl(var(--primary))" opacity="0.6">
                                    <animate attributeName="opacity" values="0.6; 1; 0.6" dur="2s" begin="0.6s" repeatCount="indefinite" />
                                  </rect>
                                  
                                  {/* Bottom widgets */}
                                  <rect x="-7" y="2" width="6" height="6" rx="1" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="0.5">
                                    <animate attributeName="opacity" values="0.5; 1; 0.5" dur="2s" begin="0.9s" repeatCount="indefinite" />
                                  </rect>
                                  <rect x="1" y="2" width="6" height="6" rx="1" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="0.5">
                                    <animate attributeName="opacity" values="0.5; 1; 0.5" dur="2s" begin="1.2s" repeatCount="indefinite" />
                                  </rect>
                                </g>
                              </g>
                              
                              {/* Test Actions - findElement */}
                              <g transform="translate(110, 25)">
                                <circle cx="0" cy="0" r="8" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                                {/* Magnifying glass */}
                                <circle cx="-1" cy="-1" r="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                                <line x1="1.5" y1="1.5" x2="3.5" y2="3.5" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" />
                                
                                {/* Scanning beam from findElement to widgets */}
                                <line x1="-8" y1="0" x2="-30" y2="15" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="2 2" opacity="0.4">
                                  <animate attributeName="stroke-dashoffset" values="0; 4" dur="1s" repeatCount="indefinite" />
                                </line>
                              </g>
                              
                              {/* Test Actions - getText */}
                              <g transform="translate(110, 45)">
                                <circle cx="0" cy="0" r="8" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                                {/* Document/text icon */}
                                <rect x="-3" y="-3" width="6" height="6" rx="0.5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
                                <line x1="-2" y1="-1" x2="2" y2="-1" stroke="hsl(var(--primary))" strokeWidth="0.5" />
                                <line x1="-2" y1="1" x2="2" y2="1" stroke="hsl(var(--primary))" strokeWidth="0.5" />
                                
                                {/* Connection to widgets */}
                                <line x1="-8" y1="0" x2="-30" y2="-5" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="2 2" opacity="0.4">
                                  <animate attributeName="stroke-dashoffset" values="0; 4" dur="1s" begin="0.3s" repeatCount="indefinite" />
                                </line>
                              </g>
                              
                              {/* Test Actions - validate */}
                              <g transform="translate(110, 65)">
                                <circle cx="0" cy="0" r="8" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                                {/* Checkmark */}
                                <path d="M -2 0 L -0.5 2 L 2.5 -2" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                
                                {/* Connection to widgets */}
                                <line x1="-8" y1="0" x2="-30" y2="-25" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="2 2" opacity="0.4">
                                  <animate attributeName="stroke-dashoffset" values="0; 4" dur="1s" begin="0.6s" repeatCount="indefinite" />
                                </line>
                              </g>
                              
                              {/* Data flow particles */}
                              <circle r="1" fill="hsl(var(--primary))">
                                <animateMotion dur="2s" repeatCount="indefinite" path="M 80 25 L 50 40" />
                                <animate attributeName="opacity" values="0; 1; 0" dur="2s" repeatCount="indefinite" />
                              </circle>
                              <circle r="1" fill="hsl(var(--primary))">
                                <animateMotion dur="2s" repeatCount="indefinite" path="M 80 45 L 50 40" />
                                <animate attributeName="opacity" values="0; 1; 0" dur="2s" begin="0.3s" repeatCount="indefinite" />
                              </circle>
                              <circle r="1" fill="hsl(var(--primary))">
                                <animateMotion dur="2s" repeatCount="indefinite" path="M 80 65 L 50 40" />
                                <animate attributeName="opacity" values="0; 1; 0" dur="2s" begin="0.6s" repeatCount="indefinite" />
                              </circle>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile: Text Second, Desktop: Text Right */}
                    <div className="text-center lg:text-left order-1 lg:order-2">
                      {/* Connection line to central point - Hidden on mobile */}
                      <div className="relative">
                        <div className="absolute left-0 top-1/2 w-12 h-px bg-gradient-to-l from-primary/60 to-transparent transform -translate-y-1/2 lg:block hidden"></div>
                        
                        <div className="lg:pl-16">
                          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                            Built for <span className="text-primary">Flutter</span>
                          </h3>
                          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                            Core test actions like findElement, getText, and validation routines optimized for Flutter.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Solution 3: Cross-Platform */}
                <div className={`relative mb-12 transition-all duration-700 delay-500 ${solutionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  {/* Connection point on central line - Hidden on mobile */}
                  <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10 transition-all duration-500 hidden lg:block ${solutionVisible ? 'scale-100' : 'scale-0'}`}></div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Mobile: Text First, Desktop: Text Left */}
                    <div className="text-center lg:text-left order-1 lg:order-1">
                      {/* Connection line to central point - Hidden on mobile */}
                      <div className="relative">
                        <div className="absolute right-0 top-1/2 w-12 h-px bg-gradient-to-r from-primary/60 to-transparent transform -translate-y-1/2 lg:block hidden"></div>
                        
                        <div className="lg:pr-16">
                          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                            Cross-<span className="text-primary">Platform</span>
                          </h3>
                          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                            Record on Android or iOS and execute flawlessly on the other.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Mobile: Animation Second, Desktop: Animation Right */}
                    <div className="flex justify-center order-2 lg:order-2">
                      {/* Connection line to central point - Hidden on mobile */}
                      <div className="relative">
                        <div className="absolute left-0 top-1/2 w-12 h-px bg-gradient-to-l from-primary/60 to-transparent transform -translate-y-1/2 lg:block hidden"></div>
                        
                        <div className="lg:pl-16">
                          {/* Cross-Platform Animation */}
                          <div className="relative max-w-md mx-auto">
                            <svg className="w-full h-32" viewBox="0 0 160 80" fill="none">
                              {/* Android Device */}
                              <g transform="translate(40, 40)">
                                <rect x="-10" y="-14" width="20" height="28" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1" />
                                <rect x="-8" y="-10" width="16" height="20" rx="1" fill="hsl(var(--background))" />
                                <text x="0" y="-2" textAnchor="middle" fontSize="5" fill="hsl(var(--primary))">A</text>
                                
                                {/* Recording indicator */}
                                <circle cx="6" cy="-10" r="1.5" fill="hsl(var(--destructive))">
                                  <animate attributeName="opacity" values="1; 0.3; 1" dur="1s" repeatCount="indefinite" />
                                </circle>
                                
                                {/* Interaction animation */}
                                <circle cx="0" cy="0" r="2" fill="hsl(var(--primary))" opacity="0">
                                  <animate attributeName="opacity" values="0; 0.6; 0" dur="1.5s" repeatCount="indefinite" />
                                  <animate attributeName="r" values="2; 4; 2" dur="1.5s" repeatCount="indefinite" />
                                </circle>
                              </g>
                              
                              {/* iOS Device */}
                              <g transform="translate(120, 40)">
                                <rect x="-10" y="-14" width="20" height="28" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1" />
                                <rect x="-8" y="-10" width="16" height="20" rx="1" fill="hsl(var(--background))" />
                                <text x="0" y="-2" textAnchor="middle" fontSize="5" fill="hsl(var(--primary))">i</text>
                                
                                {/* Playback indicator */}
                                <polygon points="5,-10 5,-8 8,-9" fill="hsl(var(--primary))">
                                  <animate attributeName="opacity" values="0.3; 1; 0.3" dur="1s" begin="0.5s" repeatCount="indefinite" />
                                </polygon>
                                
                                {/* Synchronized interaction */}
                                <circle cx="0" cy="0" r="2" fill="hsl(var(--primary))" opacity="0">
                                  <animate attributeName="opacity" values="0; 0.6; 0" dur="1.5s" repeatCount="indefinite" />
                                  <animate attributeName="r" values="2; 4; 2" dur="1.5s" repeatCount="indefinite" />
                                </circle>
                              </g>
                              
                              {/* Bidirectional data flow */}
                              <g>
                                {/* Left to right */}
                                <line x1="50" y1="35" x2="110" y2="35" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3 2">
                                  <animate attributeName="stroke-dashoffset" values="0; 5" dur="1s" repeatCount="indefinite" />
                                </line>
                                <polygon points="110,35 106,33 106,37" fill="hsl(var(--primary))" />
                                
                                {/* Right to left */}
                                <line x1="110" y1="45" x2="50" y2="45" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3 2">
                                  <animate attributeName="stroke-dashoffset" values="5; 0" dur="1s" repeatCount="indefinite" />
                                </line>
                                <polygon points="50,45 54,43 54,47" fill="hsl(var(--primary))" />
                              </g>
                              
                              {/* Data packets moving */}
                              <circle r="1.5" fill="hsl(var(--primary))">
                                <animateMotion dur="2s" repeatCount="indefinite" path="M 50 35 L 110 35" />
                                <animate attributeName="opacity" values="0; 1; 1; 0" dur="2s" repeatCount="indefinite" />
                              </circle>
                              <circle r="1.5" fill="hsl(var(--primary))">
                                <animateMotion dur="2s" repeatCount="indefinite" path="M 110 45 L 50 45" />
                                <animate attributeName="opacity" values="0; 1; 1; 0" dur="2s" repeatCount="indefinite" />
                              </circle>
                              
                              {/* Sync badge */}
                              <g transform="translate(80, 20)">
                                <circle r="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.9" />
                                <path d="M -2,-1 A 2,2 0 1,1 -2,1 M 2,1 A 2,2 0 1,1 2,-1" stroke="hsl(var(--primary))" strokeWidth="1" fill="none">
                                  <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="3s" repeatCount="indefinite" />
                                </path>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4 md:pt-8">
                  
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get More From QApilot */}
        <section ref={moreRef} className="section-edge w-full border-t border-border bg-muted/30 py-20">
          <div className="section-full mx-auto max-w-screen-xl">
            <div className={`space-y-16 transition-all duration-700 ${moreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center space-y-6">
                <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
                  Get More From <span className="text-primary">QApilot</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Beyond Flutter-specific features, leverage our full platform capabilities
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className={`p-8 bg-background rounded-2xl border border-border shadow-sm transition-all duration-700 delay-100 ${moreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <Zap className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground">Zero-Touch Validation</h3>
                      <p className="text-muted-foreground">
                        QApilot's crawler and AI agents explore your app instantly; sanity tests run without writing a line of code.
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`p-8 bg-background rounded-2xl border border-border shadow-sm transition-all duration-700 delay-300 ${moreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground">Full Regression, No Overhead</h3>
                      <p className="text-muted-foreground">
                        Scale up from quick smoke checks to full coverage effortlessly, reusing the same platform you already trust.
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`p-8 bg-background rounded-2xl border border-border shadow-sm transition-all duration-700 delay-500 ${moreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <Layers className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground">Extensible Agent Architecture</h3>
                      <p className="text-muted-foreground">
                        Bring your own custom logic or third-party agents to tailor your Flutter testing workflows.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
    </>
  );
};

export default ForFlutterClient;
