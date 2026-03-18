const WhyLabsSection = () => {
  return (
    <section className="py-10 md:py-14 relative">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left: Title */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Why QApilot <span className="text-primary">Labs</span> Exists
              </h2>
              <div className="mt-6 w-16 h-1 bg-primary rounded-full"></div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-8">
            {/* Primary statement */}
            <div className="relative pl-6 border-l-2 border-primary mb-10">
              <p className="text-2xl md:text-3xl font-semibold text-foreground leading-snug">
                Building AI systems isn't just about automation or scale. It's about making good decisions early.
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Through QApilot Labs, we:
            </p>

            {/* Bullet points */}
            <div className="space-y-4">
              {[
                "Experiment without product constraints,",
                "Learn from real user feedback,",
                "And stay close to how builders actually work.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2.5 shrink-0"></div>
                  <p className="text-lg text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyLabsSection;
