"use client";
import Footer from "@/components/Footer";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";
import YouTubeVideoPlayer from "@/components/YouTubeVideoPlayer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Lightbulb, Target, Shield, Users, TrendingUp, Bot, Rocket, Activity, Zap, Calendar, MessageSquare, TreePine, Sparkles, Brain, Cog, Handshake, Megaphone } from "lucide-react";
const AboutClient = () => {
  const {
    ref: heroRef,
    isVisible: heroVisible
  } = useScrollAnimation(0.2);
  return (
    <>
        {/* Hero Section with Animation */}
        <section className="section-edge relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden border-b border-border bg-gradient-to-b from-primary-light/40 via-background to-background py-20">
          {/* Enhanced Background with SVG Animations */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background">
            {/* Animated Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#heroGrid)" />
            </svg>

            {/* Floating Orbs */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Large floating orb - top left */}
              <circle cx="15%" cy="20%" r="150" fill="url(#orbGradient1)" opacity="0.15" />
              {/* Medium orb - bottom right */}
              <circle cx="85%" cy="70%" r="100" fill="url(#orbGradient2)" opacity="0.12" />
              {/* Small orb - center left */}
              <circle cx="10%" cy="60%" r="60" fill="hsl(var(--primary))" opacity="0.08" />
              {/* Small orb - top right */}
              <circle cx="90%" cy="30%" r="80" fill="hsl(var(--primary))" opacity="0.1" />
              <defs>
                <radialGradient id="orbGradient1" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="orbGradient2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>

            {/* Animated circuit lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              {/* Horizontal line with traveling pulse */}
              <line x1="0" y1="25%" x2="100%" y2="25%" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.2" />

              {/* Diagonal line */}
              <line x1="0" y1="80%" x2="40%" y2="50%" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.15" />

              {/* Right diagonal */}
              <line x1="100%" y1="70%" x2="60%" y2="45%" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.15" />

              {/* Bottom horizontal */}
              <line x1="20%" y1="85%" x2="80%" y2="85%" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.12" />
            </svg>

            {/* Floating dots/particles */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20%" cy="40%" r="2" fill="hsl(var(--primary))" opacity="0.35" />
              <circle cx="75%" cy="25%" r="1.5" fill="hsl(var(--primary))" opacity="0.28" />
              <circle cx="40%" cy="75%" r="2" fill="hsl(var(--primary))" opacity="0.32" />
              <circle cx="85%" cy="55%" r="1.5" fill="hsl(var(--primary))" opacity="0.32" />
              <circle cx="5%" cy="70%" r="2" fill="hsl(var(--primary))" opacity="0.22" />
              <circle cx="60%" cy="15%" r="1.5" fill="hsl(var(--primary))" opacity="0.32" />
              <circle cx="95%" cy="40%" r="2" fill="hsl(var(--primary))" opacity="0.28" />
              <circle cx="30%" cy="10%" r="1.5" fill="hsl(var(--primary))" opacity="0.22" />
            </svg>
          </div>

          <div className="section-full relative z-10 mx-auto max-w-screen-xl">
            {/* Main Hero Content */}
            <div className="text-center mb-16">
              <h1 className={cn(marketingHeroH1Class, "mb-8 animate-fade-in-up")}>
                Building Quality for an <span className="text-primary">AI-First World</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                A team united by the belief that testing should be intelligent, effortless, and built for the future.
              </p>
            </div>

            {/* Teamwork Network Visualization */}
            <div className="relative max-w-5xl mx-auto h-[350px] md:h-[420px] hidden md:block">
              {/* SVG for connections and animations */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 900 420" fill="none">
                {/* Connection lines - straight and modern */}
                <line x1="120" y1="140" x2="380" y2="200" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.2" />
                <line x1="120" y1="280" x2="380" y2="220" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.2" />
                <line x1="520" y1="200" x2="780" y2="140" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.2" />
                <line x1="520" y1="220" x2="780" y2="280" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.2" />
                <line x1="300" y1="80" x2="450" y2="160" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.15" />
                <line x1="600" y1="80" x2="450" y2="160" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.15" />
                <line x1="300" y1="340" x2="450" y2="260" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.15" />
                <line x1="600" y1="340" x2="450" y2="260" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.15" />

              </svg>

              {/* Network Nodes */}
              <div className="relative h-full">
                {/* Left Column Nodes */}
                <div className="absolute left-0 top-1/4 transform -translate-y-1/2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-card border border-border rounded-xl flex items-center justify-center shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105 hover:border-primary/50">
                      <Lightbulb size={24} className="text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Innovation</span>
                  </div>
                </div>

                <div className="absolute left-0 top-3/4 transform -translate-y-1/2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-card border border-border rounded-xl flex items-center justify-center shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105 hover:border-primary/50">
                      <Bot size={24} className="text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">AI-Native</span>
                  </div>
                </div>

                {/* Top Row Nodes */}
                <div className="absolute left-1/4 top-0 transform -translate-x-1/2 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center shadow-md hover:shadow-glow transition-all duration-300 hover:scale-105 hover:border-primary/50">
                      <Shield size={20} className="text-primary" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">Quality</span>
                  </div>
                </div>

                <div className="absolute right-1/4 top-0 transform translate-x-1/2 animate-fade-in-up" style={{ animationDelay: '0.55s' }}>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center shadow-md hover:shadow-glow transition-all duration-300 hover:scale-105 hover:border-primary/50">
                      <Target size={20} className="text-primary" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">Focus</span>
                  </div>
                </div>

                {/* Central QApilot Hub */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <div className="relative">
                    <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-primary bg-card shadow-2xl">
                      <img src="/lovable-uploads/40829201-8081-41bf-8cf5-1e80143e6a36.png" alt="QApilot" className="h-16 w-16 object-contain" />
                    </div>
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-base font-bold text-primary whitespace-nowrap">QApilot</span>
                    <div className="absolute -inset-4 rounded-3xl border border-primary/20" />
                  </div>
                </div>

                {/* Bottom Row Nodes */}
                <div className="absolute left-1/4 bottom-0 transform -translate-x-1/2 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-xs font-medium text-muted-foreground">Speed</span>
                    <div className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center shadow-md hover:shadow-glow transition-all duration-300 hover:scale-105 hover:border-primary/50">
                      <Rocket size={20} className="text-primary" />
                    </div>
                  </div>
                </div>

                <div className="absolute right-1/4 bottom-0 transform translate-x-1/2 animate-fade-in-up" style={{ animationDelay: '0.75s' }}>
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-xs font-medium text-muted-foreground">Growth</span>
                    <div className="w-12 h-12 bg-card border border-border rounded-lg flex items-center justify-center shadow-md hover:shadow-glow transition-all duration-300 hover:scale-105 hover:border-primary/50">
                      <TrendingUp size={20} className="text-primary" />
                    </div>
                  </div>
                </div>

                {/* Right Column Nodes */}
                <div className="absolute right-0 top-1/4 transform -translate-y-1/2 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="w-14 h-14 bg-card border border-border rounded-xl flex items-center justify-center shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105 hover:border-primary/50">
                      <Users size={24} className="text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Teamwork</span>
                  </div>
                </div>

                <div className="absolute right-0 top-3/4 transform -translate-y-1/2 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="w-14 h-14 bg-card border border-border rounded-xl flex items-center justify-center shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105 hover:border-primary/50">
                      <Activity size={24} className="text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">Excellence</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
              <div className="flex justify-center mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="w-20 h-20 bg-card border-2 border-primary rounded-xl flex items-center justify-center shadow-xl">
                  <img src="/lovable-uploads/40829201-8081-41bf-8cf5-1e80143e6a36.png" alt="QApilot" className="h-12 w-12 object-contain" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                <div className="flex items-center gap-3 bg-card/50 border border-border rounded-lg p-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Lightbulb size={18} className="text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground">Innovation</span>
                </div>
                <div className="flex items-center gap-3 bg-card/50 border border-border rounded-lg p-3 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users size={18} className="text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground">Teamwork</span>
                </div>
                <div className="flex items-center gap-3 bg-card/50 border border-border rounded-lg p-3 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Bot size={18} className="text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground">AI-Native</span>
                </div>
                <div className="flex items-center gap-3 bg-card/50 border border-border rounded-lg p-3 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp size={18} className="text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground">Growth</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How QApilot Started Section */}
        <section className="section-edge w-full border-t border-border py-16 md:py-24">
          <div className="section-full mx-auto max-w-screen-xl">
            <div ref={heroRef as React.RefObject<HTMLDivElement>} className={`transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 tracking-tight text-foreground text-center">
                How <span className="text-primary">QApilot</span> Started
              </h2>
              
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Opening statement */}
                <p className="text-xl md:text-2xl font-semibold text-foreground">
                  QApilot started with a very real problem.
                </p>
                
                {/* The problem */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Testing mobile apps was slow, brittle, and frustrating. Test automation promised scale, but in reality it meant scripts that broke constantly, endless maintenance, and teams spending more time fixing tests than shipping features.
                </p>
                
                {/* The gap */}
                <p className="text-xl md:text-2xl font-semibold text-primary">
                  We saw a clear gap.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  AI was being added around testing, but not into its core. Most tools were AI-assisted at best - a little faster, maybe, but not fundamentally different.
                </p>
                
                {/* The opportunity */}
                <p className="text-xl md:text-2xl font-semibold text-foreground">
                  We saw an opportunity to rethink mobile testing from first principles.
                </p>
                
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  So we caught it with both hands.
                </p>
                
                {/* The solution */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Instead of scripting flows, we built systems that understand apps, explore them like real users, and adapt as apps change. That belief became QApilot.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Life at QApilot Section */}
        <section className="section-edge relative w-full overflow-hidden border-t border-border pt-4 pb-8 md:pt-6 md:pb-12">
          <div className="section-full mx-auto max-w-screen-xl">
            {/* Section Title */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Life at <span className="text-primary">QApilot</span>
              </h2>
            </div>

            {/* Video */}
            <div className="mb-16">
              <YouTubeVideoPlayer
                videoId="qwNEigdExx4"
                title="Life at QApilot - Culture and Team"
                description="A glimpse into the culture and people at QApilot. From hackathons and conferences to building the future of mobile testing together."
                uploadDate="2024-12-01T00:00:00Z"
                duration="PT2M30S"
              />
            </div>

            {/* Content with creative layout */}
            <div className="w-full">
              {/* Lead statement - full width, centered */}
              <div className="text-center mb-10">
                <p className="text-2xl md:text-3xl font-semibold text-foreground leading-relaxed">
                  We build fast, learn in public, and show up for the community.
                </p>
              </div>

              {/* Main paragraph - full width, centered */}
              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-lg text-muted-foreground leading-relaxed text-center">
                  From hackathons and conferences to late-night prep before events, we value being present - not just online, but in real conversations with real people solving real problems.
                </p>
              </div>

              {/* You'll find us - Grid layout for better space usage */}
              <div className="mb-12">
                <p className="text-xl md:text-2xl font-semibold text-foreground text-center mb-8">
                  You'll find us:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 bg-card/30 border border-border/30 rounded-xl p-4 hover:border-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Zap size={18} className="text-primary" />
                    </div>
                    <span className="text-base text-foreground">Shipping features</span>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-card/30 border border-border/30 rounded-xl p-4 hover:border-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Calendar size={18} className="text-primary" />
                    </div>
                    <span className="text-base text-foreground">Attending & sponsoring QA events</span>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-card/30 border border-border/30 rounded-xl p-4 hover:border-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <MessageSquare size={18} className="text-primary" />
                    </div>
                    <span className="text-base text-foreground">Participating in builder communities</span>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-card/30 border border-border/30 rounded-xl p-4 hover:border-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <TreePine size={18} className="text-primary" />
                    </div>
                    <span className="text-base text-foreground italic">Touching grass occasionally</span>
                  </div>
                </div>
              </div>

              {/* Closing statement */}
              <div className="text-center">
                <div className="inline-block bg-card/50 border border-border/30 rounded-full px-8 py-4">
                  <p className="text-lg md:text-xl font-medium text-foreground">
                    This mix keeps us <span className="text-primary font-bold">grounded</span> and <span className="text-primary font-bold">curious</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet The Team Section */}
        <section className="section-edge relative w-full overflow-hidden border-t border-border pt-8 pb-16 md:pt-12 md:pb-24">
          <div className="section-full mx-auto max-w-screen-xl">
            {/* Section Title */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Meet The <span className="text-primary">Team</span>
              </h2>
            </div>

            {/* First Row - Co-Founders */}
            <div className="flex justify-center gap-8 md:gap-12 mb-10">
              {[
                { name: "Aditya Challa", designation: "Co-Founder", linkedin: "https://www.linkedin.com/in/adityachalla1831/", Icon: Rocket },
                { name: "Chaitanya Devalapally", designation: "Co-Founder", linkedin: "https://www.linkedin.com/in/chaitanya-devalapally-41b41b2/", Icon: Rocket },
              ].map((member, index) => (
                <a
                  key={index}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener"
                  className="group flex flex-col items-center text-center transition-transform hover:scale-105 w-[160px] md:w-[180px]"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-card border border-border/50 flex items-center justify-center mb-3 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
                    <member.Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{member.designation}</p>
                </a>
              ))}
            </div>

            {/* Second Row - Department Heads */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-10 mb-12">
              {[
                { name: "Surendranath Jillella", designation: "Head of AI", linkedin: "https://www.linkedin.com/in/jsurendranathreddy/", Icon: Brain },
                { name: "Subrahmanyam Marella", designation: "Head of Engineering", linkedin: "https://www.linkedin.com/in/subrahmanyam-marella-a5640311a/", Icon: Cog },
                { name: "Dinesh Reddy M", designation: "Customer Success Lead", linkedin: "https://www.linkedin.com/in/dinesh-reddy-m-329613140/", Icon: Handshake },
                { name: "Charan Tej Kammara", designation: "Product Marketing Lead", linkedin: "https://www.linkedin.com/in/charan-tej-kammara/", Icon: Megaphone },
              ].map((member, index) => (
                <a
                  key={index}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener"
                  className="group flex flex-col items-center text-center transition-transform hover:scale-105 w-[160px] md:w-[180px]"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-card border border-border/50 flex items-center justify-center mb-3 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
                    <member.Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{member.designation}</p>
                </a>
              ))}
            </div>

            {/* Rest of the Team Indicator */}
            <div className="flex justify-center items-center">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[Sparkles, Sparkles, Sparkles, Sparkles, Sparkles].map((Icon, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-muted/30 border-2 border-background flex items-center justify-center"
                    >
                      <Icon className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground/50" />
                    </div>
                  ))}
                </div>
                <span className="text-muted-foreground/70 text-sm italic ml-1">...and more</span>
              </div>
            </div>
          </div>
        </section>


        <Footer />
    </>
  );
};

export default AboutClient;
