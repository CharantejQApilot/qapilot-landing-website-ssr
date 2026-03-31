"use client";

import { Button } from "@/components/ui/button";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import { AgentNetworkCircuitVisual } from "./AgentNetworkCircuitVisual";

export function AgenticArchitectureHero() {
  const { openForm } = useHubSpotForm();

  return (
    <section
      className="section-edge relative flex min-h-screen w-full flex-col justify-center overflow-x-hidden overflow-y-visible lg:h-screen lg:overflow-hidden"
      aria-label="QApilot agentic architecture"
    >
      <MarketingBackground variant="hero" />

      <div className="relative z-10 w-full section-full py-10 sm:py-14 md:py-16 lg:py-24 2xl:py-28">
        <div className="grid min-h-0 grid-cols-1 items-center gap-8 sm:gap-10 lg:min-h-[70vh] lg:grid-cols-[2fr_3fr] lg:items-stretch lg:gap-14 xl:gap-16 2xl:gap-20">
          <div className="order-1 flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
            <h1 className={cn(marketingHeroH1Class, "mb-3 max-w-4xl sm:mb-5 md:mb-6")}>
              QApilot&apos;s <span className="text-primary">Agentic Architecture</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg xl:text-xl 2xl:text-2xl">
              QApilot is powered by a network of specialized AI agents working on a shared knowledge graph —
              enabling autonomous exploration, adaptive testing, and continuous learning across your app.
            </p>
            <div className="mt-6 sm:mt-8 md:mt-10">
              <Button
                type="button"
                onClick={() => openForm()}
                size="lg"
                className="rounded-lg bg-primary px-8 py-6 text-base font-semibold text-primary-foreground hover:bg-primary/90 2xl:px-10 2xl:py-7 2xl:text-lg"
              >
                Get Access
              </Button>
            </div>
          </div>

          <div className="order-2 hidden min-h-0 w-full min-w-0 items-center justify-center lg:flex lg:justify-end lg:self-stretch">
            <div className="w-full min-w-0 max-w-full origin-center scale-[0.82] sm:scale-90 md:scale-[0.88] lg:max-w-none lg:scale-[0.9] xl:scale-[0.93] 2xl:scale-95">
              <AgentNetworkCircuitVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
