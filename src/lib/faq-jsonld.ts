export type FaqItem = {
  question: string;
  /** Plain text for JSON-LD (no HTML). */
  answer: string;
};

/** FAQPage JSON-LD for visible FAQ blocks (Google requires matching on-page FAQs). */
export function buildFaqPageJsonLd(faqs: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
