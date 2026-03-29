import { Quote } from "lucide-react";
import { SITE_BASE_URL } from "@/lib/constants";

const testimonials = [
  {
    text: "Complex mobile banking workflows were brought under reliable, repeatable test coverage much faster than expected. QApilot's Flutter support ensured consistent cross-platform execution from day one, lowering maintenance effort and improving regression stability.",
    label: "Test Lead, Middle East Digital Bank",
  },
  {
    text: "QApilot enabled us to create and stabilize priority test flows in a fraction of the time, delivering broader coverage with far less effort. With faster onboarding, lower maintenance overhead, and seamless CI/CD compatibility, it proved to be a scalable and cost-effective automation solution.",
    label: "QE Lead, Leading Southeast Asian Grocery & Delivery Platform",
  },
];

const reviewJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QApilot",
  applicationCategory: "DeveloperApplication",
  url: SITE_BASE_URL,
  review: testimonials.map((t) => ({
    "@type": "Review",
    reviewBody: t.text,
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    author: { "@type": "Person", name: t.label },
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: String(testimonials.length),
    bestRating: "5",
  },
};

const ClientsSection = () => {
  const clients = [
    { name: "Orange Group", logo: "/lovable-uploads/orange-group-logo.png", url: "https://www.orange.com/en", visualScale: 1.15 },
    { name: "WIO Bank", logo: "/lovable-uploads/wio-bank-logo.png", url: "https://wio.io/", visualScale: 1.28 },
    { name: "Royal Enfield", logo: "/lovable-uploads/royal-enfield-logo.png", url: "https://www.royalenfield.com/in/en/home/", visualScale: 1.15 },
    { name: "Indosat Ooredoo", logo: "/lovable-uploads/indosat-logo.png", url: "https://im3.id/portal/en/indexpersonal", visualScale: 1 },
    { name: "Zessta", logo: "/lovable-uploads/zessta-logo.svg", url: "https://zessta.com/", visualScale: 0.72 },
    { name: "mySherpas", logo: "/lovable-uploads/mysherpas-logo.svg", url: "https://www.mypaisaa.com/", visualScale: 0.72 },
    { name: "GrowSari", logo: "/lovable-uploads/growsari-logo.webp", url: "https://growsari.com/", visualScale: 1.36 },
    { name: "Qwipo", logo: "/lovable-uploads/qwipo-new-logo.png", url: "https://qwipo.com/", visualScale: 1.36 },
  ];

  const marqueeItems = [...clients, ...clients];

  return (
    <section className="relative overflow-hidden section-edge" aria-labelledby="clients-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }} />

      {/* Clients marquee — black background, white text, logos in original colour */}
      <div className="py-12 2xl:py-16 border border-white/30 bg-[#04041C]">
        <div className="section-full mb-10">
          <h2 id="clients-heading" className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white text-center">
            Trusted by Industry Leaders
          </h2>
        </div>

        <div className="relative w-full" aria-label="Client logos">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#04041C] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#04041C] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-infinite-scroll hover:[animation-play-state:paused] w-max">
            {marqueeItems.map((client, index) => (
              <a
                key={index}
                href={client.url}
                target="_blank"
                rel="noopener"
                className="flex-shrink-0 mx-8 md:mx-12 2xl:mx-16 flex items-center justify-center h-16 md:h-20 w-32 md:w-40 2xl:w-48"
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  loading="eager"
                  decoding="async"
                  className="h-8 md:h-12 w-auto max-w-[120px] md:max-w-[160px] object-contain"
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
            {testimonials.map((item, i) => (
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
                      {item.text.split(/(QApilot)/i).map((part, j) =>
                        part.toLowerCase() === "qapilot" ? (
                          <strong key={j} className="font-semibold text-primary">
                            QApilot
                          </strong>
                        ) : (
                          part
                        )
                      )}
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
