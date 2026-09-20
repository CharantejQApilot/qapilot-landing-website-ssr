/**
 * Visible summary block for GEO/AEO crawlers that look for a "Key takeaways"
 * or summary section. Reuses the article excerpt — does not invent new copy.
 */
export function ArticleKeyTakeaways({ summary }: { summary: string }) {
  const text = summary.trim();
  if (!text) return null;

  return (
    <section
      className="mb-8 border border-border bg-muted/30 px-5 py-4 md:px-6 md:py-5"
      aria-labelledby="article-key-takeaways-heading"
    >
      <h2
        id="article-key-takeaways-heading"
        className="mb-2 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-primary"
      >
        Key takeaways
      </h2>
      <p className="text-base leading-relaxed text-foreground/90 md:text-lg md:leading-relaxed">
        {text}
      </p>
    </section>
  );
}
