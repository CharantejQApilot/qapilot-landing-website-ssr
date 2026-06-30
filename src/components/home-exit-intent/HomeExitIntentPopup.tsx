"use client";

import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { HomeExitIntentEmailForm } from "@/components/home-exit-intent/HomeExitIntentEmailForm";
import { useHomeEngagementPopup } from "@/components/home-exit-intent/useHomeEngagementPopup";
import { Dialog, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { HOME_TRUST_LOGOS, type HomeTrustLogo } from "@/lib/home-trust-logos";
import { PRODUCT_HUNT_TOP_POST_BADGE } from "@/lib/product-hunt-badge";
import { PATHS } from "@/lib/routes";
import { cn } from "@/lib/utils";

const TRUST_LOGO_NAMES = ["Royal Enfield", "WIO Bank", "Orange Group"] as const;

const TRUST_LOGOS: HomeTrustLogo[] = TRUST_LOGO_NAMES.map((name) => {
  const logo = HOME_TRUST_LOGOS.find((entry) => entry.name === name);
  if (!logo) throw new Error(`Missing trust logo: ${name}`);
  return logo;
});

const VALUE_LINE =
  "Signup for a personalised demo of autonomous mobile coverage and release-ready reporting.";

/** Popup shell — full width on mobile, side-by-side layout from sm+. */
const POPUP_SHELL_CLASS =
  "w-[min(94vw,53rem)] max-h-[min(92dvh,40rem)] min-h-0 sm:w-[clamp(26rem,52.5vw,53rem)] sm:max-h-none sm:min-h-[clamp(21rem,42vh,34rem)]";

/** Scales type/spacing on desktop; fixed readable base on mobile. */
const POPUP_CONTENT_SCALE_CLASS = "text-[clamp(0.9375rem,1.15vw,1.1875rem)]";

function TrustLogo({ logo }: { logo: HomeTrustLogo }) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.logo}
      alt=""
      width={120}
      height={36}
      loading="lazy"
      decoding="async"
      className="h-auto w-auto object-contain opacity-90 max-h-[1.65rem] max-w-[4.75rem] sm:max-h-[2.75em] sm:max-w-[7.5em]"
      style={{ transform: `scale(${logo.visualScale})`, transformOrigin: "center" }}
    />
  );

  if (!logo.url) return img;

  return (
    <a href={logo.url} target="_blank" rel="noopener noreferrer" aria-label={logo.name}>
      {img}
    </a>
  );
}

export default function HomeExitIntentPopup() {
  const pathname = usePathname();
  const isHome = pathname === PATHS.HOME;
  const { open, onOpenChange, onSubmitSuccess } = useHomeEngagementPopup(isHome);

  if (!isHome) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-[1300] bg-black/50",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            POPUP_SHELL_CLASS,
            POPUP_CONTENT_SCALE_CLASS,
            "fixed left-1/2 top-1/2 z-[1301] flex -translate-x-1/2 -translate-y-1/2 flex-col",
            "overflow-y-auto sm:overflow-hidden rounded-xl border border-border/80 bg-background shadow-xl",
            "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "focus:outline-none",
          )}
        >
          <DialogTitle className="sr-only">Book a QApilot demo</DialogTitle>
          <DialogDescription className="sr-only">
            Sign up for a demo before you leave the home page.
          </DialogDescription>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute right-[0.85em] top-[0.85em] z-10 flex h-[2.25em] w-[2.25em] items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close"
          >
            <X className="h-[1.1em] w-[1.1em]" />
          </button>

          <header className="shrink-0 border-b border-border/60 px-4 py-3.5 text-center sm:px-[1.4em] sm:py-[1.15em]">
            <p className="text-[0.75em] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-[0.8em] sm:tracking-[0.18em]">
              Before you go
            </p>
            <p className="mt-2 text-[1.05em] font-semibold leading-snug text-foreground sm:mt-[0.45em] sm:text-[1.15em]">
              Ship mobile releases with{" "}
              <span className="text-primary">3× coverage</span> — same QE team.
            </p>
          </header>

          <div className="flex min-h-0 flex-1 flex-col sm:flex-row">
            <div
              className={cn(
                "flex w-full shrink-0 flex-col items-center justify-center gap-3",
                "border-b border-border/60 px-4 py-4",
                "sm:w-[44%] sm:gap-[1.15em] sm:border-b-0 sm:border-r sm:px-[1.4em] sm:py-[1.5em]",
              )}
            >
              <div className="w-full text-center">
                <p className="mb-3 text-[0.8em] font-semibold normal-case tracking-[0.12em] text-muted-foreground sm:mb-[0.85em] sm:text-[0.85em] sm:tracking-[0.14em]">
                  Trusted by
                </p>
                <ul
                  className={cn(
                    "mx-auto grid w-full max-w-[17.5rem] grid-cols-3 items-center justify-items-center gap-x-2 gap-y-2",
                    "sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-[1.85em] sm:gap-y-[0.65em]",
                  )}
                  aria-label="Trusted by industry leaders"
                >
                  {TRUST_LOGOS.map((logo) => (
                    <li
                      key={logo.name}
                      className="flex w-full items-center justify-center sm:w-auto sm:shrink-0 sm:px-[0.2em]"
                    >
                      <TrustLogo logo={logo} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full border-t border-border/60" aria-hidden />
              <a
                href={PRODUCT_HUNT_TOP_POST_BADGE.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center transition-opacity hover:opacity-90"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={PRODUCT_HUNT_TOP_POST_BADGE.imageAlt}
                  width={180}
                  height={38}
                  src={PRODUCT_HUNT_TOP_POST_BADGE.imageSrc}
                  className="h-auto w-[min(11.5rem,72vw)] max-w-full sm:w-[13.5em]"
                />
              </a>
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-4 sm:px-[1.6em] sm:py-[1.5em]">
              <HomeExitIntentEmailForm valueLine={VALUE_LINE} onSuccess={onSubmitSuccess} />
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </Dialog>
  );
}
