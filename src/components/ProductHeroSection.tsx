"use client";

import { Button } from "@/components/ui/button";
import { ProductOrbitalVisual } from "@/components/product/ProductOrbitalVisual";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { BOOK_DEMO_CALENDAR_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ProductHeroSection = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center section-edge py-20 pb-8">
      <div className="section-full relative z-10 mx-auto max-w-screen-xl">
        <div className="mb-16 text-center">
          <h1 className={cn(marketingHeroH1Class, "mb-8")}>
            Experience <span className="text-primary">Agentic Testing</span> with QApilot.
          </h1>

          <p className="mx-auto mb-1 max-w-4xl text-lg text-muted-foreground md:text-xl">
            AI crawlers, intelligent agents and a knowledge graph combine to deliver autonomous mobile test
            coverage.
          </p>

          <ProductOrbitalVisual />

          <div className="relative mx-auto max-w-4xl animate-fade-in" style={{ animationDelay: "2.0s" }}>
            <div className="relative rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:scale-[1.01] hover:shadow-glow sm:p-8">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 bg-[length:200%_100%] opacity-30 animate-[shimmer_3s_ease-in-out_infinite]" />

              <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                <div className="flex-1 animate-fade-in text-left" style={{ animationDelay: "2.2s" }}>
                  <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">Start testing</h2>
                  <p className="text-muted-foreground">
                    Experience AI-native Autonomous Mobile App Testing now
                  </p>
                </div>

                <div className="flex-shrink-0 animate-fade-in" style={{ animationDelay: "2.4s" }}>
                  <Button
                    asChild
                    className="relative overflow-hidden rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-glow"
                  >
                    <a
                      href={BOOK_DEMO_CALENDAR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="relative z-10">Book a Demo</span>
                      <div className="absolute inset-0 -translate-x-full skew-x-12 transform bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_2s_ease-in-out_infinite]" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductHeroSection;
