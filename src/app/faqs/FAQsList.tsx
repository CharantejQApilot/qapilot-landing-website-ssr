import { cn } from "@/lib/utils";

export interface FAQListItem {
  id: string;
  question: string;
  answerHtml: string;
  category: string | null;
}

interface FAQsListProps {
  faqs: FAQListItem[];
}

const itemPadding = "px-4 sm:px-6 md:px-10 lg:px-12 xl:px-14";

function FAQDetails({ faq }: { faq: FAQListItem }) {
  return (
    <details className={cn("group border-b border-border last:border-b-0", itemPadding)}>
      <summary className="cursor-pointer list-none py-5 text-left text-base font-medium text-foreground marker:content-none md:py-6 md:text-lg [&::-webkit-details-marker]:hidden">
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
      <div
        className="prose prose-sm prose-slate max-w-none pb-6 text-muted-foreground dark:prose-invert md:pb-8"
        dangerouslySetInnerHTML={{ __html: faq.answerHtml }}
      />
    </details>
  );
}

export default function FAQsList({ faqs }: FAQsListProps) {
  const grouped = faqs.reduce(
    (acc, faq) => {
      const category = faq.category || "General";
      if (!acc[category]) acc[category] = [];
      acc[category].push(faq);
      return acc;
    },
    {} as Record<string, FAQListItem[]>,
  );
  const categories = Object.keys(grouped);

  if (categories.length === 1) {
    return (
      <div className="w-full overflow-hidden rounded-2xl border border-border bg-card">
        {faqs.map((faq) => (
          <FAQDetails key={faq.id} faq={faq} />
        ))}
      </div>
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
          <div className="w-full overflow-hidden rounded-2xl border border-border bg-card">
            {grouped[category].map((faq) => (
              <FAQDetails key={faq.id} faq={faq} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
