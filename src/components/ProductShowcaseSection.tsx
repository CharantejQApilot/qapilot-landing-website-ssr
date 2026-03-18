"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const ProductShowcaseSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="relative bg-background overflow-hidden section-edge w-full">
      <div className="section-full relative z-10 pt-7 pb-[2.8rem] md:pt-[2.45rem] md:pb-14 2xl:pt-[2.8rem] 2xl:pb-[4.2rem]">
        <header
          className={`mb-14 w-full rounded-2xl border border-border bg-muted/20 px-6 py-8 shadow-sm md:px-10 md:py-10 2xl:mb-20 2xl:px-12 2xl:py-12 relative overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          aria-labelledby="product-showcase-heading"
        >
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl" aria-hidden />
          <div className="relative pl-4 md:pl-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-3 md:mb-4">
              Interactive demo
            </p>
            <h2
              id="product-showcase-heading"
              className="font-heading text-2xl font-bold text-foreground tracking-tight leading-snug sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-[3.25rem] mb-4 md:mb-5"
            >
              QApilot <span className="text-primary">In Action</span>
            </h2>
            <p
              className={`max-w-3xl text-base leading-relaxed text-muted-foreground transition-all duration-700 delay-200 md:text-lg 2xl:text-xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              See QApilot in action on this interactive demo. Experience the power of AI-native quality assurance
              firsthand.
            </p>
          </div>
        </header>

        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
          <div className="relative border border-border rounded-2xl overflow-hidden bg-background">
            <div className="relative w-full" style={{ paddingBottom: 'calc(57.88888888888889% + 41px)', height: 0, minHeight: '400px' }}>
              <iframe
                src="https://demo.arcade.software/x3NLaq1qHaQD5B4JZPIm?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
                title="QApilot Autonomous Smoke Test Demo"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                loading="lazy"
                allowFullScreen
                allow="clipboard-write"
                style={{ colorScheme: 'light' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
