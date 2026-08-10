"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BugNinjaGame } from "./BugNinjaGame";
import { unlockBugNinjaAudio } from "./bug-ninja-sfx";
import { cn } from "@/lib/utils";

const STRIP_HEIGHT = "h-[280px] md:h-[300px]";
const MOBILE_MQ = "(max-width: 639px)";
const ARENA_BG = "bg-[hsl(var(--foreground))]";

/**
 * Full game strip on sm+ screens; Play button → fullscreen on phones only.
 */
export default function BugNinja() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setIsPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  if (!mounted) {
    return (
      <>
        <div
          className={cn(
            "hidden border-y border-white/[0.06] sm:block",
            ARENA_BG,
            STRIP_HEIGHT,
          )}
          aria-hidden
        />
        <div
          className={cn(
            "h-[76px] border-y border-white/[0.06] sm:hidden",
            ARENA_BG,
          )}
          aria-hidden
        />
      </>
    );
  }

  if (!isPhone) {
    return (
      <div className="section-edge w-full">
        <BugNinjaGame density="strip" />
      </div>
    );
  }

  return (
    <>
      <div className="section-edge w-full">
        <div
          className={cn(
            "relative overflow-hidden border-y border-white/[0.06] px-4 py-5",
            ARENA_BG,
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(hsl(210 100% 85% / 0.12) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
            aria-hidden
          />
          <div className="relative flex items-center justify-between gap-4">
            <div className="min-w-0 text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Bug Ninja
              </p>
              <p className="mt-1 font-heading text-base font-semibold tracking-tight text-white">
                One last bug hunt?
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                unlockBugNinjaAudio();
                setMobileOpen(true);
              }}
              className="shrink-0 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-[hsl(var(--navy))] transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Play →
            </button>
          </div>
        </div>
      </div>

      {mobileOpen &&
        createPortal(
          <div
            className={cn(
              "fixed inset-0 z-[1400] flex flex-col",
              ARENA_BG,
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Bug Ninja"
          >
            <BugNinjaGame
              density="fullscreen"
              showClose
              onClose={closeMobile}
              className="min-h-0 flex-1 border-y-0"
            />
          </div>,
          document.body,
        )}
    </>
  );
}
