"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const BYOAFlowSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: step1Ref, isVisible: step1Visible } = useScrollAnimation(0.3);
  const { ref: step2Ref, isVisible: step2Visible } = useScrollAnimation(0.3);
  const { ref: step3Ref, isVisible: step3Visible } = useScrollAnimation(0.3);

  const steps = [
    {
      title: (
        <>
          Modular by <span className="text-primary">design</span>
        </>
      ),
      description: "QApilot's native agents handle navigation, accessibility, data, and bug analysis, all working in sync.",
      ref: step1Ref,
      isVisible: step1Visible,
      animation: (
        <div className="relative max-w-md mx-auto">
          <svg className="w-full h-64" viewBox="0 0 300 200" fill="none">
            {/* Central hub */}
            <g transform="translate(150, 100)">
              <circle cx="0" cy="0" r="15" fill="hsl(var(--primary))" opacity="0.3">
                <animate attributeName="r" values="15; 18; 15" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3; 0.5; 0.3" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="0" cy="0" r="8" fill="hsl(var(--primary))">
                <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0s" fill="freeze" />
              </circle>
            </g>
            
            {/* Module blocks around the hub */}
            <g transform="translate(80, 60)">
              <rect x="-12" y="-12" width="24" height="24" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0">
                <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0.5s" fill="freeze" />
              </rect>
            </g>
            
            <g transform="translate(220, 60)">
              <rect x="-12" y="-12" width="24" height="24" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0">
                <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0.7s" fill="freeze" />
              </rect>
            </g>
            
            <g transform="translate(80, 140)">
              <rect x="-12" y="-12" width="24" height="24" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0">
                <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0.9s" fill="freeze" />
              </rect>
            </g>
            
            <g transform="translate(220, 140)">
              <rect x="-12" y="-12" width="24" height="24" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0">
                <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="1.1s" fill="freeze" />
              </rect>
            </g>
            
            {/* Connecting lines with animation */}
            <path d="M 92 60 L 138 100" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="60" strokeDashoffset="60" opacity="0.5">
              <animate attributeName="stroke-dashoffset" values="60; 0" dur="0.6s" begin="1.3s" fill="freeze" />
            </path>
            <path d="M 208 60 L 162 100" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="60" strokeDashoffset="60" opacity="0.5">
              <animate attributeName="stroke-dashoffset" values="60; 0" dur="0.6s" begin="1.5s" fill="freeze" />
            </path>
            <path d="M 92 140 L 138 100" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="60" strokeDashoffset="60" opacity="0.5">
              <animate attributeName="stroke-dashoffset" values="60; 0" dur="0.6s" begin="1.7s" fill="freeze" />
            </path>
            <path d="M 208 140 L 162 100" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="60" strokeDashoffset="60" opacity="0.5">
              <animate attributeName="stroke-dashoffset" values="60; 0" dur="0.6s" begin="1.9s" fill="freeze" />
            </path>
            
            {/* Pulsing data flow */}
            <circle r="3" fill="hsl(var(--primary))">
              <animateMotion dur="2s" repeatCount="indefinite" begin="2.5s" path="M92,60 L150,100" />
              <animate attributeName="opacity" values="0; 1; 1; 0" dur="2s" repeatCount="indefinite" begin="2.5s" />
            </circle>
            <circle r="3" fill="hsl(var(--primary))">
              <animateMotion dur="2s" repeatCount="indefinite" begin="3s" path="M208,60 L150,100" />
              <animate attributeName="opacity" values="0; 1; 1; 0" dur="2s" repeatCount="indefinite" begin="3s" />
            </circle>
          </svg>
        </div>
      )
    },
    {
      title: (
        <>
          Extensible by <span className="text-primary">choice</span>
        </>
      ),
      description: "Build and plug in your own AI agents using QApilot's open framework.",
      ref: step2Ref,
      isVisible: step2Visible,
      animation: (
        <div className="relative max-w-md mx-auto">
          <svg className="w-full h-64" viewBox="0 0 300 200" fill="none">
            {/* Custom building blocks */}
            <g transform="translate(70, 70)">
              <rect x="-15" y="-15" width="30" height="30" rx="6" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0">
                <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0s" fill="freeze" />
                <animateTransform attributeName="transform" type="translate" values="0,-20; 0,0" dur="0.5s" begin="0s" fill="freeze" />
              </rect>
            </g>
            
            <g transform="translate(120, 70)">
              <rect x="-15" y="-15" width="30" height="30" rx="6" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0">
                <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0.3s" fill="freeze" />
                <animateTransform attributeName="transform" type="translate" values="0,-20; 0,0" dur="0.5s" begin="0.3s" fill="freeze" />
              </rect>
            </g>
            
            <g transform="translate(170, 70)">
              <rect x="-15" y="-15" width="30" height="30" rx="6" fill="hsl(var(--muted))" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0">
                <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0.6s" fill="freeze" />
                <animateTransform attributeName="transform" type="translate" values="0,-20; 0,0" dur="0.5s" begin="0.6s" fill="freeze" />
              </rect>
            </g>
            
            {/* Assembly into custom agent */}
            <g opacity="0">
              <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="1.5s" fill="freeze" />
              <rect x="55" y="100" width="130" height="50" rx="10" fill="hsl(var(--primary))" opacity="0.9">
                <animateTransform attributeName="transform" type="scale" values="0.8; 1" dur="0.5s" begin="1.5s" fill="freeze" />
              </rect>
            </g>
            
            {/* Sparkle effect during assembly */}
            <circle cx="70" cy="105" r="2" fill="hsl(var(--primary))" opacity="0">
              <animate attributeName="opacity" values="0; 1; 0" dur="0.8s" begin="1.5s" fill="freeze" />
            </circle>
            <circle cx="120" cy="100" r="2" fill="hsl(var(--primary))" opacity="0">
              <animate attributeName="opacity" values="0; 1; 0" dur="0.8s" begin="1.6s" fill="freeze" />
            </circle>
            <circle cx="170" cy="105" r="2" fill="hsl(var(--primary))" opacity="0">
              <animate attributeName="opacity" values="0; 1; 0" dur="0.8s" begin="1.7s" fill="freeze" />
            </circle>
            
            {/* Framework slot below */}
            <rect x="40" y="170" width="160" height="15" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="6 6" opacity="0">
              <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="2.5s" fill="freeze" />
            </rect>
            
            {/* Agent moving into slot */}
            <g opacity="0">
              <animate attributeName="opacity" values="0; 1" dur="0.3s" begin="3s" fill="freeze" />
              <rect x="80" y="120" width="80" height="30" rx="8" fill="hsl(var(--primary))" opacity="0.8">
                <animateTransform attributeName="transform" type="translate" values="0,0; 0,40" dur="0.8s" begin="3s" fill="freeze" />
              </rect>
            </g>
            
            {/* Connection complete pulse */}
            <circle cx="120" cy="177" r="5" fill="hsl(var(--primary))" opacity="0">
              <animate attributeName="opacity" values="0; 0.8; 0" dur="1s" begin="3.8s" fill="freeze" />
              <animate attributeName="r" values="5; 20" dur="1s" begin="3.8s" fill="freeze" />
            </circle>
            
            {/* Success indicators */}
            <circle cx="50" cy="177" r="3" fill="hsl(var(--primary))" opacity="0">
              <animate attributeName="opacity" values="0; 1" dur="0.3s" begin="4.5s" fill="freeze" />
              <animate attributeName="opacity" values="0.5; 1; 0.5" dur="1.5s" repeatCount="indefinite" begin="4.8s" />
            </circle>
            <circle cx="190" cy="177" r="3" fill="hsl(var(--primary))" opacity="0">
              <animate attributeName="opacity" values="0; 1" dur="0.3s" begin="4.7s" fill="freeze" />
              <animate attributeName="opacity" values="0.5; 1; 0.5" dur="1.5s" repeatCount="indefinite" begin="5s" />
            </circle>
          </svg>
        </div>
      )
    },
    {
      title: (
        <>
          Collaborative by <span className="text-primary">nature</span>
        </>
      ),
      description: "Agents share context through QApilot's knowledge graph, learning and adapting in real time.",
      ref: step3Ref,
      isVisible: step3Visible,
      animation: (
        <div className="relative max-w-md mx-auto">
          <svg className="w-full h-64" viewBox="0 0 300 200" fill="none">
            {/* Central knowledge hub */}
            <g transform="translate(150, 100)">
              <circle cx="0" cy="0" r="20" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0">
                <animate attributeName="opacity" values="0; 1" dur="0.5s" begin="0s" fill="freeze" />
              </circle>
              
              {/* Inner network pattern */}
              <circle cx="0" cy="0" r="3" fill="hsl(var(--primary))" opacity="0">
                <animate attributeName="opacity" values="0; 1" dur="0.3s" begin="0.5s" fill="freeze" />
              </circle>
              <circle cx="-6" cy="-6" r="1.5" fill="hsl(var(--primary))" opacity="0">
                <animate attributeName="opacity" values="0; 1" dur="0.3s" begin="0.6s" fill="freeze" />
              </circle>
              <circle cx="6" cy="-6" r="1.5" fill="hsl(var(--primary))" opacity="0">
                <animate attributeName="opacity" values="0; 1" dur="0.3s" begin="0.7s" fill="freeze" />
              </circle>
              <circle cx="-6" cy="6" r="1.5" fill="hsl(var(--primary))" opacity="0">
                <animate attributeName="opacity" values="0; 1" dur="0.3s" begin="0.8s" fill="freeze" />
              </circle>
              <circle cx="6" cy="6" r="1.5" fill="hsl(var(--primary))" opacity="0">
                <animate attributeName="opacity" values="0; 1" dur="0.3s" begin="0.9s" fill="freeze" />
              </circle>
            </g>
            
            {/* Agent nodes */}
            <circle cx="60" cy="60" r="12" fill="hsl(var(--primary))" opacity="0">
              <animate attributeName="opacity" values="0; 0.7" dur="0.5s" begin="1s" fill="freeze" />
            </circle>
            <circle cx="240" cy="60" r="12" fill="hsl(var(--primary))" opacity="0">
              <animate attributeName="opacity" values="0; 0.7" dur="0.5s" begin="1.2s" fill="freeze" />
            </circle>
            <circle cx="60" cy="140" r="12" fill="hsl(var(--primary))" opacity="0">
              <animate attributeName="opacity" values="0; 0.7" dur="0.5s" begin="1.4s" fill="freeze" />
            </circle>
            <circle cx="240" cy="140" r="12" fill="hsl(var(--primary))" opacity="0">
              <animate attributeName="opacity" values="0; 0.7" dur="0.5s" begin="1.6s" fill="freeze" />
            </circle>
            
            {/* Connection lines */}
            <path d="M 72 60 L 138 100" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100" opacity="0.3">
              <animate attributeName="stroke-dashoffset" values="100; 0" dur="0.8s" begin="1.8s" fill="freeze" />
            </path>
            <path d="M 228 60 L 162 100" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100" opacity="0.3">
              <animate attributeName="stroke-dashoffset" values="100; 0" dur="0.8s" begin="2s" fill="freeze" />
            </path>
            <path d="M 72 140 L 138 100" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100" opacity="0.3">
              <animate attributeName="stroke-dashoffset" values="100; 0" dur="0.8s" begin="2.2s" fill="freeze" />
            </path>
            <path d="M 228 140 L 162 100" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="100" strokeDashoffset="100" opacity="0.3">
              <animate attributeName="stroke-dashoffset" values="100; 0" dur="0.8s" begin="2.4s" fill="freeze" />
            </path>
            
            {/* Data particles flowing between agents */}
            <circle r="3" fill="hsl(var(--primary))">
              <animateMotion dur="2s" repeatCount="indefinite" begin="3s" path="M60,60 L150,100" />
              <animate attributeName="opacity" values="0; 1; 1; 0" dur="2s" repeatCount="indefinite" begin="3s" />
            </circle>
            <circle r="3" fill="hsl(var(--primary))">
              <animateMotion dur="2s" repeatCount="indefinite" begin="3.3s" path="M240,60 L150,100" />
              <animate attributeName="opacity" values="0; 1; 1; 0" dur="2s" repeatCount="indefinite" begin="3.3s" />
            </circle>
            <circle r="3" fill="hsl(var(--primary))">
              <animateMotion dur="2s" repeatCount="indefinite" begin="3.6s" path="M60,140 L150,100" />
              <animate attributeName="opacity" values="0; 1; 1; 0" dur="2s" repeatCount="indefinite" begin="3.6s" />
            </circle>
            <circle r="3" fill="hsl(var(--primary))">
              <animateMotion dur="2s" repeatCount="indefinite" begin="3.9s" path="M240,140 L150,100" />
              <animate attributeName="opacity" values="0; 1; 1; 0" dur="2s" repeatCount="indefinite" begin="3.9s" />
            </circle>
            
            {/* Pulsing effect on center when data arrives */}
            <circle cx="150" cy="100" r="20" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0">
              <animate attributeName="opacity" values="0; 0.6; 0" dur="1s" repeatCount="indefinite" begin="4s" />
              <animate attributeName="r" values="20; 30" dur="1s" repeatCount="indefinite" begin="4s" />
            </circle>
          </svg>
        </div>
      )
    }
  ];

  return (
    <section className="section-edge relative w-full overflow-hidden py-12">
      
      <div className="section-full relative z-10 mx-auto max-w-screen-xl">
        {/* Section Title */}
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-20 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="space-y-32">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 -bottom-32 w-0.5 h-32 bg-gradient-to-b from-primary/50 to-transparent hidden md:block"></div>
              )}
              
              <div 
                ref={step.ref as React.RefObject<HTMLDivElement>}
                className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
                  step.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Text Content */}
                <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'} space-y-4`}>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Animation */}
                <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  {step.animation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BYOAFlowSection;
