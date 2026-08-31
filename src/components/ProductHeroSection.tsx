"use client";

import { Button } from "@/components/ui/button";
import { HomeHeroAtmosphere } from "@/components/home/HomeHeroAtmosphere";
import { ProductOrbitalVisual } from "@/components/product/ProductOrbitalVisual";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { BOOK_DEMO_CALENDAR_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ProductHeroSection = () => {
  return (
    <section className="relative flex min-h-[calc(100dvh-4.375rem)] w-full items-center justify-center section-edge home-canvas py-20 pb-8">
      <HomeHeroAtmosphere />
      <div className="section-full relative z-10 mx-auto max-w-screen-xl">
        <div className="mb-16 text-left">
          <h1 className={cn(marketingHeroH1Class, "mb-8")}>
            Experience <span className="text-primary">Agentic Testing</span> With QApilot.
          </h1>

          <p className="mb-1 max-w-4xl text-lg text-muted-foreground md:text-xl">
            AI crawlers, intelligent agents and a knowledge graph combine to deliver autonomous mobile test
            coverage.
          </p>

          <ProductOrbitalVisual />

          <div className="relative mx-auto max-w-4xl animate-fade-in" style={{ animationDelay: "2.0s" }}>
            <div className="relative rounded-md border border-border bg-card p-6 sm:p-8">

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
                    className="relative overflow-hidden rounded-md bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground hover:bg-primary/90"
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
