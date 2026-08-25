import { ArticleSummariseWithAI } from "@/components/summarise-with-ai/ArticleSummariseWithAI";

type ProductSummariseBandProps = {
  pageUrl: string;
};

/** Thin AEO band under product / solution heroes. */
export function ProductSummariseBand({ pageUrl }: ProductSummariseBandProps) {
  return (
    <div className="section-edge w-full border-b border-border/50 bg-background">
      <div className="section-full py-6 md:py-8">
        <ArticleSummariseWithAI pageUrl={pageUrl} className="mb-0" />
      </div>
    </div>
  );
}
