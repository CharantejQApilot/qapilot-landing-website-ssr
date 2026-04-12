import { ArrowUpRight, Sparkles } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing";
import {
  MOBILE_AGENTS_LABS_TOOLS,
  MOBILE_AGENTS_TOOLS_HUB_URL,
} from "@/lib/mobile-agents-labs-tools";
import { marketingSectionIntroClass } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

export default function LabsMobileAgentsToolsSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="labs-mobile-agents-tools-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="labs-mobile-agents-tools-heading"
          title={
            <>
              Ship Better <span className="text-primary">Mobile Apps</span> Faster
            </>
          }
          description={
            <>
              <p>
                The Entire Mobile SDLC, Supercharged. From market research to app store distribution. AI-powered
                automation for every stage of mobile development.
              </p>
              <p className="text-sm text-muted-foreground md:text-base">
                Tools from our friends at{" "}
                <a
                  href={MOBILE_AGENTS_TOOLS_HUB_URL}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mobile Agents
                </a>
                <span className="sr-only"> (opens in a new tab)</span>
              </p>
            </>
          }
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {MOBILE_AGENTS_LABS_TOOLS.map((tool) => (
            <li key={tool.href} className="min-h-0">
              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-colors",
                  "motion-safe:hover:border-primary/30 motion-safe:hover:shadow-md",
                )}
              >
                <span className="absolute bottom-0 left-0 top-0 w-1 bg-primary/90" aria-hidden />
                <div className="pl-4 md:pl-5">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {tool.trending ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                        <Sparkles className="h-3 w-3" aria-hidden />
                        Trending
                      </span>
                    ) : null}
                    <span className="rounded-full border border-border/80 bg-muted/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {tool.category}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground group-hover:text-primary md:text-xl">
                    {tool.name}
                  </h3>
                  <p className={cn(marketingSectionIntroClass, "mt-3 line-clamp-4")}>{tool.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Open tool
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center sm:mt-12">
          <a
            href={MOBILE_AGENTS_TOOLS_HUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors",
              "hover:bg-primary/90 hover:shadow-primary/25 md:px-8 md:py-4 md:text-base",
            )}
          >
            View all tools on Mobile Agents
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
