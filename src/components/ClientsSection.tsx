import type { ReactNode } from "react";
import { Quote } from "lucide-react";
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

const ClientsSection = () => {
  return (
    <section className="relative z-10 overflow-hidden section-edge" aria-label="Client testimonials">
      <div className="section-testimonials relative overflow-hidden py-16 2xl:py-20 lg:rounded-t-3xl lg:shadow-[0_-12px_40px_-12px_hsl(var(--foreground)/0.06)]">
        <div className="pointer-events-none absolute inset-0 bg-dot-pattern-subtle opacity-90" />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <svg className="absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="testimonials-diagonal" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
                <line x1="0" y1="0" x2="0" y2="24" stroke="hsl(var(--foreground))" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#testimonials-diagonal)" />
          </svg>
        </div>
        <div className="section-full relative z-10">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground 2xl:mb-10">
            In their words
          </p>
          <h3 className="sr-only">Client Testimonials</h3>
          <div className="flex flex-col gap-4 md:gap-5">
            {testimonials.map((item: (typeof testimonials)[number], i) => (
              <figure
                key={i}
                className="group relative w-full overflow-hidden rounded-xl border border-border bg-background"
                itemScope
                itemType="https://schema.org/Review"
              >
                <meta itemProp="itemReviewed" content="QApilot" />
                <span className="pointer-events-none absolute left-0 top-0 h-16 w-16 rounded-tl-xl border-l-2 border-t-2 border-primary/35" aria-hidden="true" />
                <span className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 rounded-br-xl border-b-2 border-r-2 border-primary/35" aria-hidden="true" />
                <div className="flex flex-col gap-4 py-5 px-5 sm:px-6 min-[960px]:flex-row min-[960px]:items-center min-[960px]:gap-6 min-[960px]:px-8 min-[960px]:py-6 2xl:px-10 2xl:py-6">
                  <Quote className="hidden min-[960px]:block shrink-0 text-primary/20" size={28} aria-hidden="true" />
                  <blockquote itemProp="reviewBody" className="min-w-0 w-full flex-1">
                    <p className="font-heading w-full text-base leading-relaxed tracking-tight text-foreground min-[960px]:text-lg 2xl:text-xl">
                      {testimonialParts(item.text, item.highlightPhrases)}
                    </p>
                  </blockquote>
                  <footer className="mt-2 shrink-0 border-t border-border/80 pt-4 min-[960px]:mt-0 min-[960px]:border-0 min-[960px]:pt-0 min-[960px]:text-right">
                    <cite className="not-italic text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </cite>
                  </footer>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
