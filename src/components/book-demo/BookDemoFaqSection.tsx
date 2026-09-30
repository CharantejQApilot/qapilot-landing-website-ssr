import { HomeSeam } from "@/components/home/HomeSeam";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import { BOOK_DEMO_FAQS, bookDemoFaqAnchor } from "@/lib/book-demo-what-to-expect";
import { cn } from "@/lib/utils";

export function BookDemoFaqSection() {
  return (
    <section
      className="section-edge relative w-full overflow-hidden home-tint"
      aria-labelledby="book-demo-faqs"
    >
      <HomeSeam />
      <div className="section-full relative py-16 md:py-20 lg:py-24">
        <MarketingSectionHeader
          id="book-demo-faqs"
          eyebrow="Common questions"
          title={
            <>
              Frequently Asked <span className="text-primary">Questions</span>
            </>
          }
          marginBottomClassName="mb-8 md:mb-10"
        />

        <div className="flex flex-col gap-0 border border-border bg-background">
          {BOOK_DEMO_FAQS.map((item, index) => (
            <div
              key={item.question}
              id={bookDemoFaqAnchor(item.question)}
              className={cn(
                "flex scroll-mt-28 flex-col gap-3 px-5 py-6 sm:px-6 sm:py-7 md:px-8",
                index < BOOK_DEMO_FAQS.length - 1 && "border-b border-border",
              )}
            >
              <h3 className="font-heading text-lg font-bold tracking-tight text-foreground md:text-xl">
                {item.question}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
