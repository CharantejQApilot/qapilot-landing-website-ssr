import { AspectRatio } from "@/components/ui/aspect-ratio";
import qualizealLogo from "@/assets/qualizeal-logo.png";
import kairosLogo from "@/assets/kairos-logo.png";

const PartnersSection = () => {
  const partners = [
    { name: "QualiZeal", logo: qualizealLogo },
    { name: "Kairos Technologies", logo: kairosLogo },
  ];

  return (
    <section aria-labelledby="partners-heading" className="py-16">
      <div className="container mx-auto max-w-screen-2xl px-6">
        <header className="text-center mb-12">
          <h1 id="partners-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="text-primary">Strategic Partners</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Collaborating with industry leaders to deliver exceptional value
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-3xl mx-auto">
          {partners.map((partner, index) => (
            <article
              key={index}
              className="group flex flex-col items-center text-center space-y-4"
            >
              <div className="w-56 md:w-64">
                <AspectRatio ratio={3 / 1}>
                  <div className="relative w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 bg-background/50 rounded-xl ring-1 ring-border/50 p-4 md:p-6">
                    <img
                      src={typeof partner.logo === "string" ? partner.logo : (partner.logo as { src: string }).src}
                      alt={`${partner.name} logo`}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-primary/30 -z-10 rounded-xl"></div>
                  </div>
                </AspectRatio>
              </div>
              <h2 className="text-lg font-semibold text-foreground">{partner.name}</h2>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
