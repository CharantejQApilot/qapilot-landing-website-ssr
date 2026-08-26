"use client";

import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { McpWaitlistForm } from "@/components/mcp/McpWaitlistForm";
import {
  marketingFormTitleClass,
} from "@/lib/forms/marketing-form-classes";
import { MCP_WAITLIST_FORM_ID } from "@/lib/mcp-page";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function McpHero() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible"
      aria-label="QApilot MCP"
      aria-labelledby="mcp-hero-title"
    >
      <MarketingBackground
        variant="hero"
        showDiagonalGrid={false}
        showPixelRipple
      />

      <div className="relative z-10 w-full section-full py-14 sm:py-16 md:py-20 lg:py-28 2xl:py-32">
        <div
          className={cn(
            "mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 gap-10 sm:gap-12",
            "lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-x-10 lg:gap-y-0",
            "xl:gap-x-14 2xl:mx-auto 2xl:max-w-[min(100%,88rem)] 2xl:gap-x-16",
          )}
        >
          <div className="flex min-w-0 flex-col items-start text-left lg:max-w-none lg:pr-2 xl:pr-4">
            <p className="mb-3 w-full text-left text-xs font-semibold uppercase tracking-[0.22em] text-primary/90 sm:mb-4">
              QApilot MCP · Early access
            </p>
            <h1
              id="mcp-hero-title"
              className={cn(
                marketingHeroH1Class,
                "mb-5 w-full text-left text-balance sm:mb-6 md:mb-8",
              )}
            >
              <span className="flex flex-col items-start gap-y-2 sm:gap-y-2.5 md:gap-y-3.5 lg:gap-y-4">
                <span>Test At The Speed Of</span>
                <span>
                  Your <span className="text-hero-here">Coding Agents</span>
                </span>
              </span>
            </h1>
            <p
              className={cn(
                "mt-0 max-w-2xl text-left text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed",
                "lg:max-w-xl xl:max-w-2xl",
              )}
            >
              Say what needs to hold. Your coding agent writes mobile code
              faster than anyone can check it. QApilot runs the test on your
              device and returns a report your agent can read.
            </p>
          </div>

          <div
            id={MCP_WAITLIST_FORM_ID}
            className="min-w-0 w-full scroll-mt-28 lg:pl-2 xl:pl-4"
          >
            <div
              className={cn(
                "relative flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/85 p-5 shadow-[0_24px_80px_-24px_hsl(220_25%_8%/0.25)] backdrop-blur-md",
                "sm:p-7 md:p-8",
                "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-primary/[0.06] before:via-transparent before:to-transparent",
              )}
            >
              <div className="relative z-[1] pb-5 sm:pb-6">
                <h2 className={marketingFormTitleClass}>Request Access</h2>
              </div>
              <div className="relative z-[1] min-h-0 min-w-0 flex-1 rounded-xl border border-border/40 bg-background/70 p-3 sm:p-4 md:p-5">
                <McpWaitlistForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
