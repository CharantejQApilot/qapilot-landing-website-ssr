"use client";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";
import releaseCrawlerFlow from "@/assets/release-crawler-flow.png";
import releaseAccessibilityIssues from "@/assets/release-accessibility-issues.png";
import releaseSecurityReport from "@/assets/release-security-report.png";
import releaseAccessibilitySeverity from "@/assets/release-accessibility-severity.png";
import releaseAccessibilityCategories from "@/assets/release-accessibility-categories.png";
import releaseDeviceSetup from "@/assets/release-device-setup.png";

const imgSrc = (x: string | { src: string }) => (typeof x === "string" ? x : x.src);
import crossDevicePhones from "@/assets/cross-device-testing-phones.png";
import { marketingHeroH1Class } from "@/lib/marketing-typography";
import { cn } from "@/lib/utils";

const releaseDashboard = "/lovable-uploads/qapilot-release-dashboard.png";

export default function ForReleaseManagerClient() {
  const { openForm } = useHubSpotForm();

  return (
    <>
      <main className="min-h-screen" role="main" aria-label="QApilot for Release Managers">
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center overflow-hidden section-edge" aria-labelledby="rm-hero-title">
          {/* Abstract Network Grid */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
              <defs>
                <pattern id="rm-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#rm-grid)" />
              <circle cx="150" cy="200" r="3" fill="hsl(var(--primary))" />
              <circle cx="350" cy="100" r="3" fill="hsl(var(--primary))" />
              <circle cx="550" cy="250" r="3" fill="hsl(var(--primary))" />
              <circle cx="750" cy="150" r="3" fill="hsl(var(--primary))" />
              <circle cx="950" cy="300" r="3" fill="hsl(var(--primary))" />
              <circle cx="1100" cy="180" r="3" fill="hsl(var(--primary))" />
              <line x1="150" y1="200" x2="350" y2="100" stroke="hsl(var(--primary))" strokeWidth="1" />
              <line x1="350" y1="100" x2="550" y2="250" stroke="hsl(var(--primary))" strokeWidth="1" />
              <line x1="550" y1="250" x2="750" y2="150" stroke="hsl(var(--primary))" strokeWidth="1" />
              <line x1="750" y1="150" x2="950" y2="300" stroke="hsl(var(--primary))" strokeWidth="1" />
              <line x1="950" y1="300" x2="1100" y2="180" stroke="hsl(var(--primary))" strokeWidth="1" />
            </svg>
          </div>

          <div className="w-full relative z-10">
            <div className="grid lg:grid-cols-12 items-center min-h-screen">
              {/* Left Side - Content */}
              <div className="lg:col-span-5 px-4 sm:px-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-8 py-24 space-y-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary animate-fade-in-up">
                  For Release Managers
                </p>

                <h1 id="rm-hero-title" className={cn(marketingHeroH1Class, "animate-fade-in-up")}>
                  Confident Mobile App Releases.{" "}
                  <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                    Every Time.
                  </span>
                </h1>

                <p
                  className="text-lg md:text-xl font-medium text-foreground/70 animate-fade-in-up"
                  style={{ animationDelay: "0.1s" }}
                >
                  Turn your release anxiety into release confidence with QApilot.
                </p>

                <p
                  className="text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-in-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  Mobile engineering is moving fast. But accountability is not.
                  Someone still signs off every release.
                </p>
                <p
                  className="text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-in-up"
                  style={{ animationDelay: "0.25s" }}
                >
                  QApilot equips Release Managers with unified release
                  intelligence - combining autonomous test generation,
                  execution insights, defect intelligence, and coverage
                  visibility - so final sign-off becomes a moment of
                  confidence, not anxiety.
                </p>

                <div
                  className="pt-2 animate-fade-in-up"
                  style={{ animationDelay: "0.3s" }}
                >
                  <Button
                    size="lg"
                    className="text-base px-8 py-6 rounded-full font-semibold"
                    onClick={() =>
                      openForm(
                        "Book A Demo",
                        "Fill out the form below and our team will schedule a personalized demo for you."
                      )
                    }
                  >
                    Book A Demo
                  </Button>
                </div>
              </div>

              {/* Right Side - Screenshot extending to edge */}
              <div
                className="lg:col-span-7 relative h-full flex items-center animate-fade-in-up"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent" />

                <div className="relative w-full lg:pl-4 py-12 lg:py-0">
                  <div className="relative lg:-mr-[10%] xl:-mr-[5%]">
                    <div className="rounded-l-2xl lg:rounded-l-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] border border-border/30 border-r-0 lg:border-r-0">
                      <img
                        src={imgSrc(releaseDashboard)}
                        alt="QApilot release manager dashboard showing 100% test success rate across 750 test cases with AI-healed steps and execution insights for mobile app release sign-off"
                        title="QApilot Release Dashboard - Mobile App Test Execution Results"
                        className="w-full block"
                        loading="eager"
                        width="1200"
                        height="675"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section className="section-edge relative w-full overflow-hidden border-t border-border bg-background py-24" aria-labelledby="rm-features-title">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent" />
          {/* Subtle dot grid pattern */}
          <div className="absolute inset-0 opacity-[0.05]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="features-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#features-dots)" className="text-primary" />
            </svg>
          </div>
          {/* Soft radial glows */}
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/[0.06] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-primary/[0.06] rounded-full blur-[100px]" />
          <div className="relative z-10">
            <div className="section-full mx-auto max-w-screen-xl">
              <div className="text-center mb-20">
                <h2 id="rm-features-title" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                  QApilot Redefines Mobile{" "}
                  <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                    Release Confidence
                  </span>
                </h2>
              </div>
            </div>

            <div className="section-full mx-auto max-w-screen-xl space-y-24">
              {/* Feature 1 - Text Left, Image Right */}
              <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
                    Autonomous Mobile App Testing
                  </h3>
                  <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                    Get your sanity testing done autonomously in minutes. Sign off knowing critical user flows weren't missed.
                  </p>
                </div>
                <div className="relative">
                  <div className="rounded-xl overflow-hidden shadow-[0_8px_30px_-10px_rgba(0,0,0,0.2)] border border-border/20">
                    <img
                      src={imgSrc(releaseCrawlerFlow)}
                      alt="QApilot autonomous crawler flow discovering mobile app screens and user flows for automated sanity test coverage"
                      title="Autonomous Mobile App Test Coverage - QApilot Crawler"
                      className="w-full block"
                      loading="lazy"
                      width="800"
                      height="500"
                    />
                  </div>
                </div>
              </article>

              {/* Feature 2 - Image Left, Text Right */}
              <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="relative order-2 lg:order-1">
                  <div className="rounded-xl overflow-hidden shadow-[0_8px_30px_-10px_rgba(0,0,0,0.2)] border border-border/20">
                    <img
                      src={imgSrc(releaseAccessibilityIssues)}
                      alt="QApilot intelligent bug detection showing accessibility issues, app crashes, and regression analysis caught during mobile test execution"
                      title="Intelligent Bug Detection - QApilot Mobile Testing"
                      className="w-full block"
                      loading="lazy"
                      width="800"
                      height="500"
                    />
                  </div>
                </div>
                <div className="order-1 lg:order-2 space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
                    Intelligent Bug Detection
                  </h3>
                  <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                    Detect crashes, regressions, and anomalies during execution so high-risk issues are caught before they impact your customers.
                  </p>
                </div>
              </article>

              {/* Feature 3 - Text Left, Image Right */}
              <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
                    Mobile App Security Reports
                  </h3>
                  <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                    Validate your app's security posture before every release so you sign off knowing vulnerabilities are identified, documented, and not waiting to surface in production.
                  </p>
                </div>
                <div className="relative">
                  <div className="rounded-xl overflow-hidden shadow-[0_8px_30px_-10px_rgba(0,0,0,0.2)] border border-border/20">
                    <img
                      src={imgSrc(releaseSecurityReport)}
                      alt="QApilot mobile app security report showing risk score, vulnerability severity distribution, tracker detection, and threat analysis for release sign-off"
                      title="Mobile App Security Vulnerability Report - QApilot"
                      className="w-full block"
                      loading="lazy"
                      width="800"
                      height="500"
                    />
                  </div>
                </div>
              </article>

              {/* Feature 4 - Image Left, Text Right (stacked screenshots) */}
              <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="relative order-2 lg:order-1">
                  <div className="rounded-xl overflow-hidden shadow-[0_8px_30px_-10px_rgba(0,0,0,0.2)] border border-border/20 bg-card">
                    <img
                      src={imgSrc(releaseAccessibilitySeverity)}
                      alt="Mobile app accessibility severity summary showing 164 issues across high, medium and low categories for WCAG compliance testing"
                      title="Accessibility Severity Report - QApilot"
                      className="w-full block"
                      loading="lazy"
                      width="800"
                      height="300"
                    />
                    <div className="border-t border-border/10">
                      <img
                        src={imgSrc(releaseAccessibilityCategories)}
                        alt="Accessibility issues by category including content description, touch target size, color contrast and heading hierarchy for mobile app compliance"
                        title="Accessibility Issue Categories - QApilot"
                        className="w-full block"
                        loading="lazy"
                        width="800"
                        height="300"
                      />
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
                    Mobile App Accessibility Testing
                  </h3>
                  <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                    Be accessibility-ready in minutes, ensuring your release meets compliance and usability standards before it reaches your users.
                  </p>
                </div>
              </article>

              {/* Feature 5 - Text Left, Image Right */}
              <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
                    Cross-Device Mobile Testing
                  </h3>
                  <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                    Validate your build across devices and OS versions in a single run so you eliminate environment-specific surprises before shipping.
                  </p>
                </div>
                <div className="relative">
                  <div className="rounded-xl overflow-hidden shadow-[0_8px_30px_-10px_rgba(0,0,0,0.2)] border border-border/20">
                    <img
                      src={imgSrc(crossDevicePhones)}
                      alt="QApilot cross-device mobile testing showing simultaneous test execution across multiple Android and iOS devices and OS versions"
                      title="Cross-Device Mobile App Testing - QApilot"
                      className="w-full block"
                      loading="lazy"
                      width="800"
                      height="500"
                    />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* What Release Managers Gain Section */}
        <section className="section-edge relative w-full overflow-hidden border-t border-border bg-background py-24" aria-labelledby="rm-gains-title">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/[0.04] rounded-full blur-[150px]" />

          <div className="section-full relative z-10 mx-auto max-w-screen-xl">
            <div className="text-center mb-16">
              <h2 id="rm-gains-title" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                What Release Managers{" "}
                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  Gain
                </span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-0 divide-y divide-border/40">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ),
                  title: "Clear Release Readiness Visibility",
                  description: "See exactly where your release stands at any moment with unified quality dashboards.",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  ),
                  title: "Reduced Last-Minute Surprises",
                  description: "Catch regressions, crashes, and edge cases early — before they derail your timeline.",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  ),
                  title: "Confident, Defensible Sign-Off",
                  description: "Back every go/no-go decision with data-driven quality evidence.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-5 py-8 first:pt-0 last:pb-0"
                >
                  <div className="shrink-0 mt-1 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
