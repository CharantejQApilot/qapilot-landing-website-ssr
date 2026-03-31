"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SafeHtmlContent from "@/components/SafeHtmlContent";
import { cn } from "@/lib/utils";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
}

interface FAQsClientProps {
  faqs: FAQ[];
}

export default function FAQsClient({ faqs }: FAQsClientProps) {
  const groupedFAQs = faqs.reduce(
    (acc, faq) => {
      const category = faq.category || "General";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(faq);
      return acc;
    },
    {} as Record<string, FAQ[]>
  );
  const categories = Object.keys(groupedFAQs);

  if (faqs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          No FAQs available at the moment. Check back soon!
        </p>
      </div>
    );
  }

  /* Inset inside the full-bleed card only (page gutters come from `section-full` on the page) */
  const itemPadding = "px-4 sm:px-6 md:px-10 lg:px-12 xl:px-14";

  if (categories.length === 1) {
    return (
      <Accordion
        type="single"
        collapsible
        className="w-full divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card"
      >
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id} className={cn("border-0", itemPadding)}>
            <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline md:text-lg py-5 md:py-6">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 md:pb-8 pt-0">
              <SafeHtmlContent
                html={faq.answer}
                className="prose prose-sm prose-slate max-w-none dark:prose-invert"
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  return (
    <div className="w-full space-y-12 md:space-y-14">
      {categories.map((category, catIdx) => (
        <section key={category} className="w-full" aria-labelledby={`faq-category-${catIdx}`}>
          <h2
            id={`faq-category-${catIdx}`}
            className="font-heading mb-5 border-b border-border pb-3 text-2xl font-semibold text-foreground md:mb-6 md:text-3xl"
          >
            {category}
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card"
          >
            {groupedFAQs[category].map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className={cn("border-0", itemPadding)}>
                <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline md:text-lg py-5 md:py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 md:pb-8 pt-0">
                  <SafeHtmlContent
                    html={faq.answer}
                    className="prose prose-sm prose-slate max-w-none dark:prose-invert"
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      ))}
    </div>
  );
}
