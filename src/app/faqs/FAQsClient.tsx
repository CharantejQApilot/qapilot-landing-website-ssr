"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SafeHtmlContent from "@/components/SafeHtmlContent";

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

  if (categories.length === 1) {
    return (
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="border border-border rounded-lg px-6 bg-card"
          >
            <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline py-5">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-5">
              <SafeHtmlContent
                html={faq.answer}
                className="prose prose-sm prose-slate max-w-none"
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  return (
    <div className="space-y-10">
      {categories.map((category) => (
        <div key={category}>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
            {category}
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {groupedFAQs[category].map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  <SafeHtmlContent
                    html={faq.answer}
                    className="prose prose-sm prose-slate max-w-none"
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
