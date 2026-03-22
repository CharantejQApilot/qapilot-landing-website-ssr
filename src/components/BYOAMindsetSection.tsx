"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const BYOAMindsetSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: progressRef, isVisible: progressVisible } = useScrollAnimation(0.3);

  const steps = [
    {
      verb: "Create",
      description: "your own agent, give it a role, a task, a purpose."
    },
    {
      verb: "Connect",
      description: "it to QApilot, instantly part of the AI testing ecosystem."
    },
    {
      verb: "Collaborate",
      description: "across agents, each one learning from shared context."
    },
    {
      verb: "Evolve",
      description: "your testing gets smarter with every run."
    }
  ];

  return (
    <section className="section-edge relative w-full overflow-hidden pt-12 pb-20">
      
      <div className="section-full relative z-10 mx-auto max-w-screen-xl">
        {/* Section Title */}
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-20 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The <span className="text-primary">BYOA</span> Mindset
          </h2>
        </div>

        {/* Horizontal Progress Animation */}
        <div 
          ref={progressRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-1000 ${
            progressVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Desktop View - Horizontal */}
          <div className="hidden md:block">
            <div className="relative max-w-5xl mx-auto">
              {/* Steps */}
              <div className="grid grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className="relative flex flex-col items-center"
                  >
                    {/* Step Circle */}
                    <div 
                      className={`w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-6 transition-all duration-700 ${
                        progressVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                      }`}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      <div className="relative">
                        {/* Pulse effect */}
                        <div 
                          className="absolute inset-0 rounded-full bg-primary animate-ping"
                          style={{ 
                            animationDelay: `${index * 200 + 500}ms`,
                            animationDuration: '2s',
                            animationIterationCount: 'infinite'
                          }}
                        ></div>
                        <span className="relative text-2xl font-bold text-primary-foreground">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    {index < steps.length - 1 && (
                      <div 
                        className={`absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-3rem)] flex items-center justify-center transition-all duration-700 ${
                          progressVisible ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ transitionDelay: `${index * 200 + 100}ms` }}
                      >
                        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div 
                      className={`text-center transition-all duration-700 ${
                        progressVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${index * 200 + 100}ms` }}
                    >
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {step.verb}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile View - Vertical */}
          <div className="md:hidden space-y-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`flex gap-6 transition-all duration-700 ${
                  progressVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 200 + 300}ms` }}
              >
                {/* Step Circle */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center relative">
                    <div className="relative">
                      <div 
                        className="absolute inset-0 rounded-full bg-primary animate-ping"
                        style={{ 
                          animationDelay: `${index * 200 + 800}ms`,
                          animationDuration: '2s',
                          animationIterationCount: 'infinite'
                        }}
                      ></div>
                      <span className="relative text-xl font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  
                  {/* Vertical connector */}
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent mx-auto mt-2"></div>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {step.verb}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BYOAMindsetSection;
