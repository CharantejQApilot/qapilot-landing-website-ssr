"use client";

import { HomeEyebrow } from "@/components/home/HomeEyebrow";
import { MarketingBackground } from "@/components/marketing/MarketingBackground";
import { McpWaitlistForm } from "@/components/mcp/McpWaitlistForm";
import {
  marketingFormTitleClass,
  marketingHeroFormCardClass,
  marketingHeroFormInnerClass,
} from "@/lib/forms/marketing-form-classes";
import { MCP_WAITLIST_FORM_ID } from "@/lib/mcp-page";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export function McpHero() {
  return (
    <section
      className="hero-prominent relative section-edge w-full overflow-x-hidden overflow-y-visible home-canvas"
      aria-label="QApilot MCP"
      aria-labelledby="mcp-hero-title"
    >
      <MarketingBackground variant="hero" />

      <div className="relative z-10 w-full section-full py-14 sm:py-16 md:py-20 lg:py-28 2xl:py-32">
        <div
          className={cn(
            "mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 gap-10 sm:gap-12",
            "lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-x-10 lg:gap-y-0",
            "xl:gap-x-14 2xl:mx-auto 2xl:max-w-[min(100%,88rem)] 2xl:gap-x-16",
          )}
        >
          <div className="flex min-w-0 flex-col items-start text-left lg:max-w-none lg:pr-2 xl:pr-4">
            <HomeEyebrow>QApilot MCP · Early access</HomeEyebrow>
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
            <div className={marketingHeroFormCardClass}>
              <div className="relative z-[1] pb-5 sm:pb-6">
                <h2 className={marketingFormTitleClass}>Request Access</h2>
              </div>
              <div className={marketingHeroFormInnerClass}>
                <McpWaitlistForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
