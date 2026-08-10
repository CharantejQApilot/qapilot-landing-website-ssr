import type { ReactNode } from "react";
import { QA_PILOT_PUBLIC_TESTIMONIALS } from "@/lib/qapilot-testimonials";
import { cn } from "@/lib/utils";

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Split quote into plain / highlighted runs; longer phrases first so shorter substrings don’t steal matches. */
function testimonialParts(
  text: string,
  highlightPhrases: readonly string[],
): ReactNode[] {
  const sorted = [...highlightPhrases].sort((a, b) => b.length - a.length);
  if (sorted.length === 0) return [text];
  const re = new RegExp(`(${sorted.map(escapeRegExp).join("|")})`, "gi");
  const chunks = text.split(re);
  const lowerSet = new Set(highlightPhrases.map((p) => p.toLowerCase()));
  return chunks.map((chunk, j) => {
    if (chunk === "") return null;
    if (lowerSet.has(chunk.toLowerCase())) {
      return (
        <strong key={j} className="font-semibold text-primary">
          {chunk}
        </strong>
      );
    }
    return <span key={j}>{chunk}</span>;
  });
}

/** Equal-weight dual testimonials. Same type scale and column share. */
const ClientsSection = () => {
  return (
    <section
      className="relative z-10 overflow-hidden section-edge"
      aria-label="Client testimonials"
    >
      <div className="section-testimonials relative overflow-hidden py-16 2xl:py-20">
        <div className="pointer-events-none absolute inset-0 bg-dot-pattern-subtle opacity-90" />
        <div className="section-full relative z-10">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground 2xl:mb-10">
            In their words
          </p>
          <h3 className="sr-only">Client Testimonials</h3>

          <div className="grid grid-cols-1 border-t border-border pt-8 md:grid-cols-2 md:pt-10">
            {QA_PILOT_PUBLIC_TESTIMONIALS.map((item, index) => (
              <figure
                key={item.label}
                className={cn(
                  "flex flex-col",
                  index === 0
                    ? "border-b border-border pb-8 md:border-b-0 md:border-r md:pb-0 md:pr-8 lg:pr-10"
                    : "pt-8 md:pt-0 md:pl-8 lg:pl-10",
                )}
                itemScope
                itemType="https://schema.org/Review"
              >
                <meta itemProp="itemReviewed" content="QApilot" />
                <blockquote itemProp="reviewBody" className="flex-1">
                  <p className="font-heading text-lg leading-relaxed tracking-tight text-foreground md:text-xl 2xl:text-2xl">
                    {testimonialParts(item.text, item.highlightPhrases)}
                  </p>
                </blockquote>
                <footer className="mt-6">
                  <cite className="not-italic text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </cite>
                </footer>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
