import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MarketingSectionHeader } from "@/components/marketing";
import { MCP_FAQS } from "@/lib/mcp-page";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function McpFaqSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden border-t border-border/60 bg-background"
      aria-labelledby="mcp-faqs"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[2fr_3fr] lg:gap-x-12 xl:gap-x-16 2xl:gap-x-20">
          <MarketingSectionHeader
            id="mcp-faqs"
            eyebrow="FAQ"
            title={
              <>
                Frequently Asked{" "}
                <span className="text-primary">Questions</span>
              </>
            }
            description="Quick answers before you join."
            marginBottomClassName="mb-0 max-lg:mb-8 lg:sticky lg:top-28 lg:pb-0 lg:border-b-0"
          />

          <Accordion
            type="multiple"
            className={cn(
              "w-full min-w-0 rounded-2xl border border-border bg-card shadow-[0_24px_48px_-12px_hsl(220_20%_12%/0.08)]",
              "px-4 sm:px-6 md:px-8",
            )}
          >
            {MCP_FAQS.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left font-heading text-base font-semibold tracking-tight md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {faq.question.includes("Maestro MCP") ? (
                    <>
                      Maestro runs declarative YAML UI flows you define. QApilot
                      MCP is verification in the editor you already use: say what
                      needs to hold, run it locally, and get a markdown report
                      your coding agent can query. See{" "}
                      <Link
                        href={PATHS.COMPARE_MAESTRO}
                        className="font-medium text-primary underline-offset-4 hover:underline"
                      >
                        QApilot vs Maestro
                      </Link>
                      .
                    </>
                  ) : (
                    faq.answer
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
