const HowWeWorkSection = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Two-column layout: Title left, Content right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left: Title - takes 4 columns, sticky on desktop */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                How We <span className="text-primary">Work</span>
              </h2>
              <div className="mt-6 w-16 h-1 bg-primary rounded-full"></div>
            </div>
          </div>
          
          {/* Right: Content - takes 8 columns with clean hierarchy */}
          <div className="lg:col-span-8">
            {/* Primary statement with left accent */}
            <div className="relative pl-6 border-l-2 border-primary mb-10">
              <p className="text-2xl md:text-3xl font-semibold text-foreground leading-snug">
                Our culture is intentionally simple.
              </p>
            </div>
            
            {/* Main paragraph */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              We keep things low on ceremony and high on ownership. People take responsibility, step in where needed, and focus on outcomes over roles.
            </p>
            
            {/* Highlights - horizontal flow with subtle visual distinction */}
            <div className="flex flex-wrap gap-3 mb-10">
              <span className="inline-flex items-center bg-primary/10 text-foreground font-medium px-4 py-2 rounded-full text-sm border border-primary/20">
                Engineers pitch in on demos
              </span>
              <span className="inline-flex items-center bg-primary/10 text-foreground font-medium px-4 py-2 rounded-full text-sm border border-primary/20">
                Marketers understand the product
              </span>
              <span className="inline-flex items-center bg-primary/10 text-foreground font-medium px-4 py-2 rounded-full text-sm border border-primary/20">
                Everyone ships
              </span>
            </div>
            
            {/* Closing statement - clear hierarchy with emphasis */}
            <div className="bg-card/30 border border-border/30 rounded-2xl p-6 md:p-8">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                We take the work seriously, <span className="text-primary font-bold">ourselves, not so much.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
