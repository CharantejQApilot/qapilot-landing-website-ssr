import { FlaskConical, Lightbulb, Wrench, Rocket, Zap, Code, Bug, Cpu, Sparkles, TestTube } from "lucide-react";

// Desktop nodes positioned around the center (450,250 in viewBox) using percentage positions
// Larger sizes, well-spaced constellation
const desktopNodes = [
  { Icon: Lightbulb, x: "5%",  y: "10%",  size: 24, delay: "0.3s" },
  { Icon: Cpu,       x: "25%", y: "8%",   size: 22, delay: "0.4s" },
  { Icon: Code,      x: "8%",  y: "52%",  size: 24, delay: "0.5s" },
  { Icon: TestTube,  x: "20%", y: "78%",  size: 22, delay: "0.55s" },
  { Icon: Bug,       x: "3%",  y: "82%",  size: 20, delay: "0.7s" },
  { Icon: Wrench,    x: "68%", y: "6%",   size: 24, delay: "0.6s" },
  { Icon: Zap,       x: "85%", y: "35%",  size: 22, delay: "0.8s" },
  { Icon: Sparkles,  x: "72%", y: "80%",  size: 24, delay: "0.45s" },
  { Icon: Rocket,    x: "88%", y: "72%",  size: 24, delay: "0.9s" },
];

// Mobile nodes arranged in two arcs around the center
const mobileNodes = [
  { Icon: Lightbulb, x: "8%",  y: "12%" },
  { Icon: Cpu,       x: "38%", y: "4%" },
  { Icon: Code,      x: "5%",  y: "50%" },
  { Icon: Bug,       x: "15%", y: "82%" },
  { Icon: Wrench,    x: "55%", y: "4%" },
  { Icon: Zap,       x: "82%", y: "18%" },
  { Icon: Sparkles,  x: "80%", y: "55%" },
  { Icon: Rocket,    x: "72%", y: "82%" },
];

const LabsHeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center px-4 pt-20 pb-0 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 glow-bg"></div>

      {/* Subtle dot grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="labs-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="16" cy="16" r="1" fill="hsl(var(--primary))" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#labs-dots)" />
      </svg>

      {/* Floating concentric arcs - left side */}
      <div className="absolute left-0 top-[40%] -translate-y-1/2 w-72 h-72 opacity-[0.06] hidden md:block">
        <div className="absolute inset-0 border border-primary/40 rounded-full"></div>
        <div className="absolute inset-6 border border-primary/30 rounded-full"></div>
        <div className="absolute inset-12 border border-primary/20 rounded-full"></div>
      </div>

      {/* Floating concentric arcs - right side */}
      <div className="absolute right-0 top-[55%] -translate-y-1/2 w-60 h-60 opacity-[0.05] hidden md:block">
        <div className="absolute inset-0 border border-primary/30 rounded-full"></div>
        <div className="absolute inset-5 border border-primary/20 rounded-full"></div>
        <div className="absolute inset-10 border border-primary/15 rounded-full"></div>
      </div>

      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header text */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight text-foreground animate-fade-in">
            Experiments. Tools.{" "}
            <span className="text-primary">Ideas shipped fast.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            QApilot Labs is where we build and ship experiments that explore the edges of AI-native development and testing.
          </p>
        </div>

        {/* ===== DESKTOP ILLUSTRATION (md+) ===== */}
        <div className="relative max-w-5xl mx-auto h-[480px] lg:h-[520px] hidden md:block">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 900 500" fill="none" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Curved connections from each node region toward center (450,250) */}
              <path id="c1" d="M 55 55 C 180 80, 320 180, 425 240" />
              <path id="c2" d="M 240 45 C 300 100, 380 180, 435 235" />
              <path id="c3" d="M 80 265 C 180 260, 300 255, 420 250" />
              <path id="c4" d="M 190 395 C 260 350, 350 300, 425 260" />
              <path id="c5" d="M 35 415 C 150 380, 300 310, 420 260" />
              <path id="c6" d="M 625 35 C 580 100, 510 180, 465 235" />
              <path id="c7" d="M 780 180 C 680 200, 560 230, 480 248" />
              <path id="c8" d="M 660 405 C 600 350, 520 290, 470 262" />
              <path id="c9" d="M 810 365 C 700 330, 560 290, 478 258" />

              {/* Additional cross-connections between outer nodes for richer feel */}
              <path id="x1" d="M 55 55 C 100 30, 180 25, 240 45" />
              <path id="x2" d="M 80 265 C 100 320, 140 370, 190 395" />
              <path id="x3" d="M 625 35 C 680 60, 740 110, 780 180" />
              <path id="x4" d="M 660 405 C 710 395, 760 380, 810 365" />
              <path id="x5" d="M 35 415 C 60 400, 130 395, 190 395" />
              <path id="x6" d="M 780 180 C 790 240, 800 300, 810 365" />
            </defs>

            {/* Draw connection lines */}
            {["c1","c2","c3","c4","c5","c6","c7","c8","c9"].map((id) => (
              <use key={id} href={`#${id}`} stroke="hsl(var(--primary))" strokeWidth="1.2" opacity="0.1" />
            ))}
            {/* Cross-connections (more subtle) */}
            {["x1","x2","x3","x4","x5","x6"].map((id) => (
              <use key={id} href={`#${id}`} stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.06" strokeDasharray="5 4" />
            ))}

            {/* Pulsing emanation rings from center */}
            {[
              { r0: 50, r1: 68, dur: "4s", op0: 0.1, op1: 0.02, sw: 1 },
              { r0: 85, r1: 105, dur: "5s", op0: 0.07, op1: 0.015, sw: 0.7 },
              { r0: 130, r1: 155, dur: "6s", op0: 0.05, op1: 0.01, sw: 0.5 },
              { r0: 180, r1: 210, dur: "7s", op0: 0.03, op1: 0.005, sw: 0.4 },
            ].map((ring, i) => (
              <circle key={`ring-${i}`} cx="450" cy="250" r={ring.r0} stroke="hsl(var(--primary))" strokeWidth={ring.sw} fill="none" opacity={ring.op0}>
                <animate attributeName="r" values={`${ring.r0};${ring.r1};${ring.r0}`} dur={ring.dur} repeatCount="indefinite" />
                <animate attributeName="opacity" values={`${ring.op0};${ring.op1};${ring.op0}`} dur={ring.dur} repeatCount="indefinite" />
              </circle>
            ))}

            {/* Central glow blob */}
            <circle cx="450" cy="250" r="38" fill="hsl(var(--primary))" opacity="0.07">
              <animate attributeName="opacity" values="0.05;0.12;0.05" dur="3s" repeatCount="indefinite" />
              <animate attributeName="r" values="36;42;36" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Primary flowing particles along main connections */}
            {[
              { path: "#c1", dur: "3.2s", begin: "0s" },
              { path: "#c2", dur: "2.8s", begin: "0.8s" },
              { path: "#c3", dur: "3.6s", begin: "1.4s" },
              { path: "#c4", dur: "3.0s", begin: "2.2s" },
              { path: "#c5", dur: "3.4s", begin: "0.5s" },
              { path: "#c6", dur: "3.2s", begin: "1.8s" },
              { path: "#c7", dur: "3.5s", begin: "0.3s" },
              { path: "#c8", dur: "3.0s", begin: "2.6s" },
              { path: "#c9", dur: "3.3s", begin: "1.0s" },
            ].map((p, i) => (
              <circle key={`fp-${i}`} r={3.5} fill="hsl(var(--primary))">
                <animateMotion dur={p.dur} repeatCount="indefinite" begin={p.begin}>
                  <mpath href={p.path} />
                </animateMotion>
                <animate attributeName="opacity" values="0;0.8;0" dur={p.dur} repeatCount="indefinite" begin={p.begin} />
              </circle>
            ))}

            {/* Secondary slower, smaller particles */}
            {[
              { path: "#c1", dur: "5s", begin: "2s" },
              { path: "#c3", dur: "5.5s", begin: "0s" },
              { path: "#c5", dur: "4.8s", begin: "1.5s" },
              { path: "#c6", dur: "5.2s", begin: "3s" },
              { path: "#c8", dur: "4.5s", begin: "0.5s" },
              { path: "#c9", dur: "5s", begin: "2.5s" },
            ].map((p, i) => (
              <circle key={`sp-${i}`} r={2} fill="hsl(var(--primary))">
                <animateMotion dur={p.dur} repeatCount="indefinite" begin={p.begin}>
                  <mpath href={p.path} />
                </animateMotion>
                <animate attributeName="opacity" values="0;0.45;0" dur={p.dur} repeatCount="indefinite" begin={p.begin} />
              </circle>
            ))}

            {/* Particles along cross-connections */}
            {[
              { path: "#x1", dur: "4s", begin: "0.5s" },
              { path: "#x3", dur: "4.2s", begin: "1s" },
              { path: "#x4", dur: "3.8s", begin: "2s" },
              { path: "#x6", dur: "5s", begin: "0s" },
            ].map((p, i) => (
              <circle key={`xp-${i}`} r={2} fill="hsl(var(--primary))">
                <animateMotion dur={p.dur} repeatCount="indefinite" begin={p.begin}>
                  <mpath href={p.path} />
                </animateMotion>
                <animate attributeName="opacity" values="0;0.35;0" dur={p.dur} repeatCount="indefinite" begin={p.begin} />
              </circle>
            ))}

            {/* Ambient sparkle dots — denser fill */}
            {[
              { cx: 150, cy: 150 }, { cx: 340, cy: 80 }, { cx: 560, cy: 110 },
              { cx: 700, cy: 280 }, { cx: 300, cy: 380 }, { cx: 500, cy: 430 },
              { cx: 200, cy: 200 }, { cx: 650, cy: 160 }, { cx: 380, cy: 320 },
              { cx: 530, cy: 370 }, { cx: 120, cy: 350 }, { cx: 750, cy: 420 },
              // Additional fill dots
              { cx: 60, cy: 170 }, { cx: 840, cy: 130 }, { cx: 420, cy: 50 },
              { cx: 470, cy: 450 }, { cx: 780, cy: 90 }, { cx: 100, cy: 450 },
              { cx: 250, cy: 100 }, { cx: 670, cy: 430 }, { cx: 810, cy: 250 },
              { cx: 50, cy: 310 }, { cx: 400, cy: 170 }, { cx: 520, cy: 200 },
            ].map((dot, i) => (
              <circle key={`sd-${i}`} cx={dot.cx} cy={dot.cy} r={i % 3 === 0 ? 2 : 1.2} fill="hsl(var(--primary))" opacity="0.15">
                <animate attributeName="opacity" values="0.08;0.3;0.08" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.6}s`} />
              </circle>
            ))}
          </svg>

          {/* Desktop icon nodes — larger, no text */}
          {desktopNodes.map(({ Icon, x, y, size, delay }, i) => (
            <div
              key={i}
              className="absolute w-14 h-14 bg-card border border-border rounded-xl flex items-center justify-center shadow-sm hover:shadow-glow transition-all duration-300 hover:scale-110 animate-fade-in"
              style={{ left: x, top: y, animationDelay: delay }}
            >
              <Icon size={size} className="text-primary" />
            </div>
          ))}

          {/* Central flask */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="w-24 h-24 bg-card border-2 border-primary rounded-2xl flex items-center justify-center shadow-lg animate-pulse-glow">
              <FlaskConical className="text-primary w-11 h-11" />
            </div>
          </div>
        </div>

        {/* ===== MOBILE ILLUSTRATION (below md) ===== */}
        <div className="md:hidden relative h-[340px] sm:h-[380px] w-full max-w-md mx-auto">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 340" fill="none" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Mobile connection curves to center (180,170) */}
              <path id="m1" d="M 40 50 C 80 80, 130 130, 170 162" />
              <path id="m2" d="M 150 20 C 160 60, 170 110, 177 158" />
              <path id="m3" d="M 30 175 C 70 175, 120 172, 168 170" />
              <path id="m4" d="M 70 290 C 100 260, 140 220, 172 180" />
              <path id="m5" d="M 210 20 C 200 60, 190 110, 183 158" />
              <path id="m6" d="M 310 70 C 270 100, 230 140, 192 162" />
              <path id="m7" d="M 305 195 C 270 190, 230 180, 193 172" />
              <path id="m8" d="M 275 290 C 250 260, 220 220, 190 180" />
            </defs>

            {/* Connection lines */}
            {["m1","m2","m3","m4","m5","m6","m7","m8"].map((id) => (
              <use key={id} href={`#${id}`} stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.1" />
            ))}

            {/* Pulsing rings */}
            {[
              { r0: 35, r1: 48, dur: "4s", op: 0.1, sw: 0.8 },
              { r0: 60, r1: 75, dur: "5s", op: 0.06, sw: 0.5 },
              { r0: 95, r1: 115, dur: "6s", op: 0.04, sw: 0.4 },
            ].map((ring, i) => (
              <circle key={`mr-${i}`} cx="180" cy="170" r={ring.r0} stroke="hsl(var(--primary))" strokeWidth={ring.sw} fill="none" opacity={ring.op}>
                <animate attributeName="r" values={`${ring.r0};${ring.r1};${ring.r0}`} dur={ring.dur} repeatCount="indefinite" />
                <animate attributeName="opacity" values={`${ring.op};${ring.op * 0.2};${ring.op}`} dur={ring.dur} repeatCount="indefinite" />
              </circle>
            ))}

            {/* Central glow */}
            <circle cx="180" cy="170" r="26" fill="hsl(var(--primary))" opacity="0.06">
              <animate attributeName="opacity" values="0.04;0.1;0.04" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Flowing particles */}
            {[
              { path: "#m1", dur: "3s", begin: "0s" },
              { path: "#m2", dur: "2.8s", begin: "0.7s" },
              { path: "#m3", dur: "3.2s", begin: "1.4s" },
              { path: "#m4", dur: "3s", begin: "2.1s" },
              { path: "#m5", dur: "2.9s", begin: "0.4s" },
              { path: "#m6", dur: "3.1s", begin: "1.8s" },
              { path: "#m7", dur: "3.3s", begin: "1.1s" },
              { path: "#m8", dur: "3s", begin: "2.5s" },
            ].map((p, i) => (
              <circle key={`mp-${i}`} r={2.5} fill="hsl(var(--primary))">
                <animateMotion dur={p.dur} repeatCount="indefinite" begin={p.begin}>
                  <mpath href={p.path} />
                </animateMotion>
                <animate attributeName="opacity" values="0;0.7;0" dur={p.dur} repeatCount="indefinite" begin={p.begin} />
              </circle>
            ))}

            {/* Ambient dots */}
            {[
              { cx: 100, cy: 100 }, { cx: 260, cy: 120 }, { cx: 130, cy: 250 },
              { cx: 240, cy: 240 }, { cx: 80, cy: 220 }, { cx: 290, cy: 150 },
            ].map((dot, i) => (
              <circle key={`md-${i}`} cx={dot.cx} cy={dot.cy} r={1.2} fill="hsl(var(--primary))" opacity="0.15">
                <animate attributeName="opacity" values="0.08;0.3;0.08" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} />
              </circle>
            ))}
          </svg>

          {/* Mobile icon nodes — properly sized */}
          {mobileNodes.map(({ Icon, x, y }, i) => (
            <div
              key={i}
              className="absolute w-11 h-11 bg-card border border-border rounded-xl flex items-center justify-center shadow-sm animate-fade-in"
              style={{ left: x, top: y, animationDelay: `${0.3 + i * 0.08}s` }}
            >
              <Icon size={18} className="text-primary" />
            </div>
          ))}

          {/* Mobile central flask */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-fade-in" style={{ animationDelay: "0.35s" }}>
            <div className="w-16 h-16 bg-card border-2 border-primary rounded-2xl flex items-center justify-center shadow-lg animate-pulse-glow">
              <FlaskConical size={28} className="text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabsHeroSection;
