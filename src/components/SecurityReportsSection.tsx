"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Shield, FileSearch, Award, Code, Network, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DOCS_URL } from "@/lib/constants";
const SecurityReportsSection = () => {
  const {
    ref: sectionRef,
    isVisible
  } = useScrollAnimation(0.2);
  const {
    ref: cardsRef,
    isVisible: cardsVisible
  } = useScrollAnimation(0.3);

  const analysisTypes = [{
    icon: FileSearch,
    title: "Manifest Analysis",
    description: "Deep inspection of app permissions, components, and configuration risks."
  }, {
    icon: Award,
    title: "Certificate Analysis",
    description: "Validate signing certificates and detect potential trust issues."
  }, {
    icon: Code,
    title: "Code Analysis",
    description: "Static analysis to identify vulnerabilities and security anti-patterns."
  }, {
    icon: Network,
    title: "Network Security",
    description: "Analyze network configurations and data transmission security."
  }];

  const benefits = ["On-demand security scans per app version", "Integrated directly within your testing workflow", "No separate tools or manual handoffs required", "Accessible from Reports section and App Source view", "Full control over when scans are performed"];

  return (
    <section id="security-reports" className="relative py-20 px-4 overflow-hidden">
      <div ref={sectionRef as React.RefObject<HTMLDivElement>} className={`container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
            <Shield size={20} className="text-primary" />
            <span className="text-sm font-semibold text-primary">Security Reports</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-foreground">
            Security Analysis. <span className="text-primary">Built Right In.</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto">
            Bring static security analysis into your existing mobile testing workflow. Spot potential risks earlier and make informed release decisions, <span className="text-primary font-semibold">without juggling multiple tools.</span>
          </p>
        </div>

        {/* Analysis Types Cards */}
        <div ref={cardsRef as React.RefObject<HTMLDivElement>} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {analysisTypes.map((type, index) => (
            <div key={index} className={`group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 transition-all duration-700 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
              transitionDelay: `${index * 150}ms`
            }}>
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <type.icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {type.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {type.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
          transitionDelay: '400ms'
        }}>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            What This Means For You
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
          
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8 italic">
            By bringing security analysis into the same reporting flow, teams can spot potential risks 
            earlier and make more informed release decisions.
          </p>

          <div className="text-center">
            <Button asChild variant="outline" className="group border-primary/30 hover:border-primary hover:bg-primary/10">
              <a href={`${DOCS_URL}/detailed-documentation/reports/security-reports`} target="_blank" rel="noopener">
                Learn more in our documentation
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityReportsSection;
