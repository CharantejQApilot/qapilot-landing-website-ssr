import type { ComponentType } from "react";
import { Smartphone, Layers, CodeXml, Cpu } from "lucide-react";
import { HomeSeam } from "@/components/home/HomeSeam";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSectionHeader";

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.44.09 1.17-.33 2.35-1.02 3.28-.69.93-1.84 1.64-2.86 1.66-.12-1.15.41-2.35 1.04-3.5z" />
    </svg>
  );
}

type Platform = {
  id: string;
  label: string;
  sub: string;
  icon: ComponentType<Record<string, any>>;
};

const platforms: Platform[] = [
  {
    id: "android",
    label: "Android",
    sub: "APK · AAB · native & hybrid",
    icon: Smartphone,
  },
  {
    id: "ios",
    label: "iOS",
    sub: "Simulator & physical devices",
    icon: AppleIcon,
  },
  {
    id: "flutter",
    label: "Flutter",
    sub: "Cross-platform",
    icon: Layers,
  },
  {
    id: "react-native",
    label: "React Native",
    sub: "JS-driven apps",
    icon: CodeXml,
  },
  { id: "native", label: "Native", sub: "Kotlin · Swift · Obj-C", icon: Cpu },
];

function PlatformTile({ p }: { p: Platform }) {
  const Icon = p.icon;
  const isApple = p.id === "ios";

  return (
    <div className="sig-cell group relative flex h-full min-h-0 flex-col justify-between transition-colors duration-200 hover:bg-muted/30">
      <div className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary md:h-11 md:w-11">
        {isApple ? (
          <AppleIcon className="h-5 w-5 md:h-6 md:w-6" />
        ) : (
          <Icon
            className="h-5 w-5 md:h-6 md:w-6"
            strokeWidth={1.5}
            aria-hidden
          />
        )}
      </div>
      <div>
        <p className="font-heading text-sm font-bold text-foreground md:text-base">
          {p.label}
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs">
          {p.sub}
        </p>
      </div>
    </div>
  );
}

/** S13 compatibility ledger. Existing framework content, split + shared borders. */
const ModernFrameworksSection = () => {
  return (
    <section
      className="relative overflow-hidden home-canvas section-edge w-full"
      aria-labelledby="frameworks-heading"
    >
      <HomeSeam />

      <div className="section-full relative z-10 pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 2xl:pb-24">
        <MarketingSectionHeader
          id="frameworks-heading"
          eyebrow="Compatibility"
          title={
            <>
              Built for <span className="text-primary">Modern Mobile</span>{" "}
              Frameworks
            </>
          }
          description={
            <>
              QApilot works{" "}
              <strong className="font-semibold text-foreground">
                post-build
              </strong>
              {"\u00A0"}. it validates real application behavior on your
              binaries, independent of how they were built.
            </>
          }
        />

        <div className="mb-8 flex w-full flex-col gap-5 md:mb-10">
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Ship with confidence whether your team uses Android, iOS, Flutter,
            or React Native. One pipeline validates what users actually
            experience. No framework-specific test harness required.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            <span className="font-semibold text-foreground">
              Post-build validation
            </span>
            <span
              className="mx-2 select-none text-muted-foreground/45 md:mx-2.5"
              aria-hidden
            >
              ·
            </span>
            <span className="font-semibold text-foreground">
              Framework-agnostic
            </span>
          </p>
        </div>

        <div className="sig-ledger sig-ledger--5">
          {platforms.map((p) => (
            <PlatformTile key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernFrameworksSection;
