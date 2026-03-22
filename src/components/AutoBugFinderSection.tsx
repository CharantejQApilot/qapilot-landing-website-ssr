"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Bug, Image, FileWarning, SpellCheck, Accessibility, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DOCS_URL } from "@/lib/constants";
const AutoBugFinderSection = () => {
  const {
    ref: sectionRef,
    isVisible
  } = useScrollAnimation(0.2);
  const {
    ref: cardsRef,
    isVisible: cardsVisible
  } = useScrollAnimation(0.3);
  const issueCategories = [{
    icon: Image,
    title: "Assets Not Loaded",
    description: "Detects UI elements where images or visual assets failed to render correctly",
    color: "text-orange-400"
  }, {
    icon: FileWarning,
    title: "Page Not Loaded",
    description: "Flags screens that did not load fully or failed to reach a stable state",
    color: "text-red-400"
  }, {
    icon: SpellCheck,
    title: "Spell Check",
    description: "Identifies spelling or textual inconsistencies detected on screens",
    color: "text-blue-400"
  }, {
    icon: Accessibility,
    title: "Accessibility",
    description: "Highlights potential accessibility violations based on UI structure",
    color: "text-purple-400"
  }];
  const benefits = ["Automatic issue detection after every crawl", "Visual evidence with screenshots & UI metadata", "Actionable fix recommendations for each issue", "Issues mapped to exact screens where they occurred"];
  return <section id="auto-bug-finder" ref={sectionRef as React.RefObject<HTMLElement>} className="section-edge relative w-full border-t border-border/40 py-12 md:py-16">
      <div className="section-full mx-auto max-w-screen-xl">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Bug className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Auto Bug Finder</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span className="text-primary">Find Bugs</span> Before Your Users Do
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            QApilot automatically analyzes every discovered screen and interaction to identify 
            common problem patterns, with actionable guidance for each issue.
          </p>
        </div>

        {/* Issue Categories Grid */}
        <div ref={cardsRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {issueCategories.map((category, index) => <div key={category.title} className={`group relative p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm 
                hover:bg-card/80 hover:border-primary/30 transition-all duration-500 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
          transitionDelay: `${index * 100}ms`
        }}>
              <div className={`w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center mb-4 
                group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className={`w-6 h-6 ${category.color}`} />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {category.title}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            </div>)}
        </div>

        {/* Benefits and Details */}
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
        transitionDelay: '400ms'
      }}>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            Issues That Are Immediately Actionable
          </h3>
          
          <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">Each issue is backed by screenshots, UI metadata, and actionable guidance, making it easy to understand both what failed and where it occurred.</p>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {benefits.map((benefit, index) => <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </div>)}
          </div>

          {/* Issue Details Highlight */}
          <div className="p-6 rounded-xl bg-card/50 border border-border/50 mb-8">
            <h4 className="font-semibold text-foreground mb-4 text-center">For each issue, QApilot provides:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2 justify-center">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">Issue Summary</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">Severity Indicator</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">Screenshot Context</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">How to Fix</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button asChild variant="outline" className="group border-primary/30 hover:border-primary hover:bg-primary/10">
              <a href={`${DOCS_URL}/detailed-documentation/autonomous-test-generation/auto-bug-finder`} target="_blank" rel="noopener">
                Learn more in our documentation
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default AutoBugFinderSection;