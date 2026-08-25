import type { ReactNode } from "react";
import Image from "next/image";
import { Heart, MapPin, MessageCircle, X } from "lucide-react";
import { PhoneChassis } from "@/components/dual-device-testing/PhoneChassis";
import { cn } from "@/lib/utils";

type CaseStudyPhoneFrameProps = {
  className?: string;
  children: ReactNode;
  screenClassName?: string;
  homeIndicatorClassName?: string;
};

/**
 * Shared phone chassis shell for case-study heroes.
 */
export function CaseStudyPhoneFrame({
  className,
  children,
  screenClassName,
  homeIndicatorClassName = "bg-white/45",
}: CaseStudyPhoneFrameProps) {
  return (
    <div className={cn("relative mx-auto w-fit", className)}>
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] -z-0 h-[78%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.09] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-[8%] bottom-[4%] -z-0 h-8 rounded-[100%] bg-foreground/[0.07] blur-xl"
        aria-hidden
      />
      <PhoneChassis
        size="feature"
        layout="intrinsic"
        screenClassName={screenClassName}
        homeIndicatorClassName={homeIndicatorClassName}
      >
        {children}
      </PhoneChassis>
    </div>
  );
}

type CaseStudyPhoneScreenshotProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  screenClassName?: string;
};

export function CaseStudyPhoneScreenshot({
  src,
  alt,
  className,
  priority = false,
  screenClassName = "bg-[#4B1FD6]",
}: CaseStudyPhoneScreenshotProps) {
  return (
    <CaseStudyPhoneFrame className={className} screenClassName={screenClassName}>
      <div className="absolute inset-0 z-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="(min-width: 1280px) 281px, (min-width: 1024px) 263px, 185px"
          priority={priority}
        />
      </div>
    </CaseStudyPhoneFrame>
  );
}

/**
 * Generic Geml dating-app screen for the case-study hero
 * (app is not on the stores yet; logo-led mock only).
 */
export function GemlAppMock({ className }: { className?: string }) {
  return (
    <CaseStudyPhoneFrame
      className={className}
      screenClassName="bg-[#0B0F0B]"
      homeIndicatorClassName="bg-white/40"
    >
      <div
        className="absolute inset-0 z-0 flex flex-col overflow-hidden bg-[radial-gradient(ellipse_at_top,_#152015_0%,_#0B0F0B_55%)] text-white"
        aria-hidden
      >
        <div className="flex items-center justify-between px-4 pt-9 sm:px-5 sm:pt-10">
          <Image
            src="/case-studies/geml.png"
            alt=""
            width={28}
            height={28}
            className="size-7 rounded-md object-cover"
          />
          <p className="font-heading text-[11px] font-semibold tracking-[0.18em] text-[#6FBF6A]">
            GEML
          </p>
          <span className="flex size-7 items-center justify-center rounded-full bg-white/10 text-[10px] font-semibold text-white/80">
            JD
          </span>
        </div>

        <div className="mt-3 flex-1 px-3.5 pb-3 sm:px-4">
          <div className="relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#121812] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.65)]">
            <div className="relative min-h-0 flex-1 overflow-hidden bg-[#EDE6DC]">
              <div className="absolute inset-0 animate-geml-sketch-breathe">
                <Image
                  src="/case-studies/geml-profile-sketch.png"
                  alt=""
                  fill
                  className="object-cover object-[center_18%]"
                  sizes="(min-width: 1024px) 240px, 180px"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(11,15,11,0.18)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3.5 pb-3.5 pt-16">
                <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-black/35 px-2 py-1 text-[9px] font-medium text-white/85 backdrop-blur-sm">
                  <MapPin className="size-2.5 text-[#6FBF6A]" strokeWidth={2.5} />
                  2.4 mi away
                </div>
                <p className="font-heading text-[15px] font-semibold tracking-tight">
                  Alexa, 28
                </p>
                <p className="mt-0.5 text-[10px] leading-snug text-white/70">
                  Coffee, weekend hikes, and good conversation.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 px-4 py-3.5">
              <span className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70">
                <X className="size-4" strokeWidth={2.5} />
              </span>
              <span className="flex size-12 items-center justify-center rounded-full bg-[#388237] text-white shadow-lg shadow-[#388237]/35 animate-geml-heart-pulse">
                <Heart className="size-5 fill-current" strokeWidth={2} />
              </span>
              <span className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70">
                <MessageCircle className="size-4" strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-around px-6 pb-7 pt-1 text-[8px] font-medium tracking-wide text-white/45">
          <span className="text-[#6FBF6A]">Discover</span>
          <span>Matches</span>
          <span>Chat</span>
          <span>Profile</span>
        </div>
      </div>
    </CaseStudyPhoneFrame>
  );
}
