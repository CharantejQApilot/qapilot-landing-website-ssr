import type { ReactNode } from "react";
import { Quote } from "lucide-react";
import { QA_PILOT_PUBLIC_TESTIMONIALS } from "@/lib/qapilot-testimonials";
import { PARTNER_LOGOS_PATH_PREFIX } from "@/lib/seo";

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

type ClientLogo = {
  name: string;
  logo: string;
  url: string;
  visualScale: number;
};

const ALL_CLIENTS: ClientLogo[] = [
  { name: "Orange Group", logo: `${PARTNER_LOGOS_PATH_PREFIX}orange-group-logo.png`, url: "https://www.orange.com/en", visualScale: 1.15 },
  { name: "WIO Bank", logo: `${PARTNER_LOGOS_PATH_PREFIX}wio-bank-logo.png`, url: "https://wio.io/", visualScale: 1.28 },
  { name: "Royal Enfield", logo: `${PARTNER_LOGOS_PATH_PREFIX}royal-enfield-logo.png`, url: "https://www.royalenfield.com/in/en/home/", visualScale: 1.15 },
  { name: "Indosat Ooredoo", logo: `${PARTNER_LOGOS_PATH_PREFIX}indosat-logo.png`, url: "https://im3.id/portal/en/indexpersonal", visualScale: 1 },
  { name: "Zessta", logo: `${PARTNER_LOGOS_PATH_PREFIX}zessta-logo.svg`, url: "https://zessta.com/", visualScale: 0.72 },
  { name: "mySherpas", logo: `${PARTNER_LOGOS_PATH_PREFIX}mysherpas-logo.svg`, url: "https://www.mypaisaa.com/", visualScale: 0.72 },
  { name: "GrowSari", logo: `${PARTNER_LOGOS_PATH_PREFIX}growsari-logo.webp`, url: "https://growsari.com/", visualScale: 1.36 },
  { name: "Qwipo", logo: `${PARTNER_LOGOS_PATH_PREFIX}qwipo-new-logo.png`, url: "https://qwipo.com/", visualScale: 1.36 },
];

/** Featured row order: Wio, Orange, Royal Enfield — static, larger treatment */
const FEATURED_NAMES = ["WIO Bank", "Orange Group", "Royal Enfield"] as const;

const ClientsSection = () => {
  const featuredClients = FEATURED_NAMES.map((name) => {
    const c = ALL_CLIENTS.find((x) => x.name === name);
    if (!c) throw new Error(`Missing client logo: ${name}`);
    return c;
  });

  const carouselClients = ALL_CLIENTS.filter((c) => !(FEATURED_NAMES as readonly string[]).includes(c.name));

  const marqueeItems = [...carouselClients, ...carouselClients];

  return (
    <section className="relative overflow-hidden section-edge" aria-labelledby="clients-heading">
      {/* Clients — featured strip (static) + marquee for remaining logos */}
      <div className="py-12 2xl:py-16 border border-white/30 bg-[#04041C]">
        <div className="section-full mb-8 md:mb-10 2xl:mb-12">
          <h2 id="clients-heading" className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white text-center">
            Trusted by Industry Leaders
          </h2>
        </div>

        {/* Spotlight partners — larger logos, fixed (does not scroll with marquee) */}
        <div className="relative z-30 px-4 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-3 gap-3 sm:gap-8 md:gap-12 lg:gap-16 items-center justify-items-center rounded-2xl border border-white/15 bg-white/[0.04] px-3 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:px-8 sm:py-8 md:py-10">
              {featuredClients.map((client) => (
                <a
                  key={client.name}
                  href={client.url}
                  target="_blank"
                  rel="noopener"
                  className="flex w-full max-w-[200px] items-center justify-center py-2 sm:py-3 transition-opacity hover:opacity-90"
                >
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={200}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="h-9 w-auto max-h-[42px] max-w-[min(100%,160px)] object-contain sm:h-14 sm:max-h-[56px] md:h-16 md:max-h-[72px] md:max-w-[200px] lg:h-[4.25rem] lg:max-h-none"
                    style={{ transform: `scale(${client.visualScale})`, transformOrigin: "center" }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="relative z-10 mx-auto mt-8 max-w-5xl px-6 md:mt-10"
          aria-hidden="true"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </div>

        <div className="relative z-10 mt-8 w-full md:mt-10" aria-label="Additional client logos">
          <div className="absolute left-0 top-0 bottom-0 z-20 w-16 bg-gradient-to-r from-[#04041C] to-transparent pointer-events-none sm:w-24 md:w-40" />
          <div className="absolute right-0 top-0 bottom-0 z-20 w-16 bg-gradient-to-l from-[#04041C] to-transparent pointer-events-none sm:w-24 md:w-40" />

          <div className="flex animate-infinite-scroll hover:[animation-play-state:paused] w-max pt-1">
            {marqueeItems.map((client, index) => (
              <a
                key={`${client.name}-${index}`}
                href={client.url}
                target="_blank"
                rel="noopener"
                className="flex-shrink-0 mx-6 sm:mx-8 md:mx-12 2xl:mx-16 flex items-center justify-center h-14 md:h-20 w-28 sm:w-32 md:w-40 2xl:w-48"
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={160}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="h-7 sm:h-8 md:h-12 w-auto max-w-[110px] sm:max-w-[120px] md:max-w-[160px] object-contain opacity-90"
                  style={{ transform: `scale(${client.visualScale})`, transformOrigin: "center" }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials — edge-to-edge, 2–3 line quotes, geometric accents */}
      <div className="section-cream py-16 2xl:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern-subtle pointer-events-none" />
        {/* Geometric pattern: diagonal lines (stronger) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.09]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="testimonials-diagonal" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
                <line x1="0" y1="0" x2="0" y2="24" stroke="hsl(var(--foreground))" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#testimonials-diagonal)" />
          </svg>
        </div>
        <div className="section-full relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground text-center mb-8 2xl:mb-10">
            In their words
          </p>
          <h3 className="sr-only">Client Testimonials</h3>
          <div className="flex flex-col gap-4 md:gap-5">
            {testimonials.map((item: (typeof testimonials)[number], i) => (
              <figure
                key={i}
                className="relative bg-background border border-border rounded-xl overflow-hidden group w-full"
                itemScope
                itemType="https://schema.org/Review"
              >
                <meta itemProp="itemReviewed" content="QApilot" />
                {/* Corner geometric accents */}
                <span className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/35 rounded-tl-xl pointer-events-none" aria-hidden="true" />
                <span className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/35 rounded-br-xl pointer-events-none" aria-hidden="true" />
                {/* Row layout only at 960px+ (75% of 1280px); below that, persona on bottom */}
                <div className="flex flex-col min-[960px]:flex-row min-[960px]:items-center gap-4 min-[960px]:gap-6 py-5 px-5 sm:px-6 min-[960px]:py-6 min-[960px]:px-8 2xl:py-6 2xl:px-10">
                  <Quote className="hidden min-[960px]:block flex-shrink-0 text-primary/20" size={28} aria-hidden="true" />
                  <blockquote itemProp="reviewBody" className="flex-1 min-w-0 w-full">
                    <p className="font-heading text-foreground text-base min-[960px]:text-lg 2xl:text-xl leading-relaxed tracking-tight w-full">
                      {testimonialParts(item.text, item.highlightPhrases)}
                    </p>
                  </blockquote>
                  <footer className="flex-shrink-0 pt-4 mt-2 border-t border-border/80 min-[960px]:border-0 min-[960px]:pt-0 min-[960px]:mt-0 min-[960px]:text-right">
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
