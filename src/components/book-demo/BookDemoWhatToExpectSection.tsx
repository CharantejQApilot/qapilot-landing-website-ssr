import { BookDemoScrollToFormButton } from "@/components/book-demo/BookDemoScrollToFormButton";
import { MarketingLedger, MarketingLedgerCell } from "@/components/marketing/MarketingLedger";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";
import {
  BOOK_DEMO_DIFFERENTIATOR_LINE,
  BOOK_DEMO_DIFFERENTIATORS,
  BOOK_DEMO_EXPECT_DESCRIPTION,
} from "@/lib/book-demo-what-to-expect";

export function BookDemoWhatToExpectSection() {
  return (
    <section
      className="section-edge relative w-full border-t border-border/60"
      aria-labelledby="book-demo-expect-heading"
    >
      <div className="section-full relative z-10 py-14 md:py-20 2xl:py-24">
        <MarketingSectionHeader
          id="book-demo-expect-heading"
          title={
            <>
              What Sets <span className="text-primary">QApilot</span> Apart
            </>
          }
          description={BOOK_DEMO_EXPECT_DESCRIPTION}
          marginBottomClassName="mb-12 md:mb-14 2xl:mb-16"
        />

        <MarketingLedger cols={3} aria-label="What sets QApilot apart">
          {BOOK_DEMO_DIFFERENTIATORS.map((item) => (
            <MarketingLedgerCell key={item.title}>
              <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {item.body}
              </p>
            </MarketingLedgerCell>
          ))}
        </MarketingLedger>

        <blockquote className="mt-10 w-full min-w-0 md:mt-12" style={{ containerType: "inline-size" }}>
          <p className="min-w-0 font-heading text-base font-medium leading-snug tracking-tight text-pretty text-foreground sm:text-lg lg:whitespace-nowrap lg:text-[1.85cqi] lg:leading-none">
            {BOOK_DEMO_DIFFERENTIATOR_LINE}
          </p>
        </blockquote>

        <div className="mt-12 flex justify-center md:mt-16">
          <BookDemoScrollToFormButton />
        </div>
      </div>
    </section>
  );
}
