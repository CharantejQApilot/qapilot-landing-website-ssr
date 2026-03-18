"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Plug } from "lucide-react";

const BYOAIntroSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="byoa-section" className="relative pt-20 pb-8 px-4 overflow-hidden">

      <div 
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className={`container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
            <Plug size={20} className="text-primary" />
            <span className="text-sm font-semibold text-primary">Bring Your Own Agent</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-foreground">
            Bring Your Own Agent. <span className="text-primary">Expand What's Possible.</span>
          </h2>

          <div className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto space-y-4">
            <p>
              With <span className="text-primary font-semibold">Bring Your Own Agent (BYOA)</span>, teams can plug in their own intelligence, 
              extend QApilot's capabilities, and automate use cases unique to their product, domain, or workflow.
            </p>
            <p className="text-xl font-semibold text-foreground">
              Your agents. Our framework. Limitless automation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BYOAIntroSection;
