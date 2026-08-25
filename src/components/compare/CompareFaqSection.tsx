import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MarketingSectionHeader } from "@/components/marketing";
import type { FaqItem } from "@/lib/faq-jsonld";

type CompareFaqSectionProps = {
  faqs: readonly FaqItem[];
  headingId?: string;
  title?: ReactNode;
};

/** Visible FAQ block for compare / alternatives pages (pairs with FAQPage JSON-LD). */
export function CompareFaqSection({
  faqs,
  headingId = "compare-faqs",
  title = (
    <>
      Frequently asked <span className="text-primary">questions</span>
    </>
  ),
}: CompareFaqSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="section-edge w-full border-b border-border/50 bg-muted/10 py-12 md:py-16 2xl:py-20">
      <div className="section-full">
        <MarketingSectionHeader
          id={headingId}
          title={title}
          marginBottomClassName="mb-8 md:mb-10"
        />
        <Accordion type="multiple" className="w-full max-w-3xl">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-left font-heading text-base font-semibold tracking-tight md:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
