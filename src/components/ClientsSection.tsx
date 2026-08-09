import type { ReactNode } from "react";
import { QA_PILOT_PUBLIC_TESTIMONIALS } from "@/lib/qapilot-testimonials";

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Split quote into plain / highlighted runs; longer phrases first so shorter substrings don’t steal matches. */
function testimonialParts(text: string, highlightPhrases: readonly string[]): ReactNode[] {
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

const testimonials = QA_PILOT_PUBLIC_TESTIMONIALS;
const [primary, secondary] = testimonials;

/** S09 proof split — existing testimonials, quote | secondary with hairline. */
const ClientsSection = () => {
  return (
    <section className="relative z-10 overflow-hidden section-edge" aria-label="Client testimonials">
      <div className="section-testimonials relative overflow-hidden py-16 2xl:py-20">
        <div className="pointer-events-none absolute inset-0 bg-dot-pattern-subtle opacity-90" />
        <div className="section-full relative z-10">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground 2xl:mb-10">
            In their words
          </p>
          <h3 className="sr-only">Client Testimonials</h3>

          <div className="sig-proof border-t border-border pt-8 md:pt-10">
            <figure
              className="sig-proof__quote"
              itemScope
              itemType="https://schema.org/Review"
            >
              <meta itemProp="itemReviewed" content="QApilot" />
              <blockquote itemProp="reviewBody">
                <p className="font-heading text-lg leading-relaxed tracking-tight text-foreground md:text-xl 2xl:text-2xl">
                  {testimonialParts(primary.text, primary.highlightPhrases)}
                </p>
              </blockquote>
              <footer className="mt-6">
                <cite className="not-italic text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {primary.label}
                </cite>
              </footer>
            </figure>

            {secondary ? (
              <figure
                className="sig-proof__outcomes"
                itemScope
                itemType="https://schema.org/Review"
              >
                <meta itemProp="itemReviewed" content="QApilot" />
                <blockquote itemProp="reviewBody">
                  <p className="font-heading text-base leading-relaxed tracking-tight text-foreground md:text-lg">
                    {testimonialParts(secondary.text, secondary.highlightPhrases)}
                  </p>
                </blockquote>
                <footer className="mt-6">
                  <cite className="not-italic text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {secondary.label}
                  </cite>
                </footer>
              </figure>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
