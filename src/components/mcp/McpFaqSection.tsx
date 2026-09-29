import { MarketingSection, MarketingSectionHeader } from "@/components/marketing";
import { MCP_FAQS } from "@/lib/mcp-page";
import { cn } from "@/lib/utils";

export function McpFaqSection() {
  return (
    <MarketingSection aria-labelledby="mcp-faqs">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[2fr_3fr] lg:gap-x-12 xl:gap-x-16 2xl:gap-x-20">
        <MarketingSectionHeader
          id="mcp-faqs"
          eyebrow="FAQ"
          title={
            <>
              Frequently Asked <span className="text-primary">Questions</span>
            </>
          }
          description="Quick answers before you start."
          marginBottomClassName="mb-0 max-lg:mb-8 lg:sticky lg:top-28 lg:pb-0 lg:border-b-0"
        />

        <div
          className={cn(
            "w-full min-w-0 rounded-md border border-border bg-card",
            "px-4 sm:px-6 md:px-8",
          )}
        >
          {MCP_FAQS.map((faq) => (
            <details
              key={faq.question}
              open
              className="group border-b border-border last:border-b-0"
            >
              <summary className="cursor-pointer list-none py-4 text-left font-heading text-base font-semibold tracking-tight marker:content-none md:text-lg [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span
                    className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                    aria-hidden
                  >
                    ▾
                  </span>
                </span>
              </summary>
              <p className="pb-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </MarketingSection>
  );
}
