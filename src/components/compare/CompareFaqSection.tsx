import type { ReactNode } from "react";
import { MarketingSection, MarketingSectionHeader } from "@/components/marketing";
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
    <MarketingSection surface="tint">
      <MarketingSectionHeader
        id={headingId}
        title={title}
        marginBottomClassName="mb-8 md:mb-10"
      />
      <div className="w-full max-w-3xl">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            open
            className="group border-b border-border"
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
    </MarketingSection>
  );
}
