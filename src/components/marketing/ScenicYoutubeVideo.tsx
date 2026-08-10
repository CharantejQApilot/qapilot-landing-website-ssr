"use client";

import { useRef, useEffect, useId } from "react";
import { AbstractFrameBackdrop } from "@/components/marketing/AbstractFrameBackdrop";
import { useNearViewport } from "@/hooks/use-near-viewport";
import { cn } from "@/lib/utils";

type ScenicYoutubeVideoProps = {
  videoId: string;
  ariaLabel: string;
  className?: string;
};

/**
 * Muted autoplay YouTube embed with abstract CSS backdrop, scale crop for pillarboxing,
 * and transparent shield. Player + iframe API mount only when near viewport.
 */
export function ScenicYoutubeVideo({
  videoId,
  ariaLabel,
  className,
}: ScenicYoutubeVideoProps) {
  const { ref: nearRef, isNear } = useNearViewport<HTMLDivElement>({
    rootMargin: "400px 0px",
  });
  const playerRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const playerIdRef = useRef(`yt-scenic-${uid}`);
  const ytApiPlayerRef = useRef<{ destroy?: () => void } | null>(null);

  useEffect(() => {
    if (!isNear) return;

    let pauseNudgeTimer: ReturnType<typeof setTimeout> | null = null;

    const initializePlayer = () => {
      if (!playerRef.current || !window.YT?.Player) return;

      try {
        ytApiPlayerRef.current?.destroy?.();
      } catch {
        /* ignore */
      }
      ytApiPlayerRef.current = null;

      new window.YT.Player(playerRef.current, {
        height: "100%",
        width: "100%",
        videoId,
        playerVars: {
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          fs: 0,
          cc_load_policy: 0,
          iv_load_policy: 3,
          autohide: 1,
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: videoId,
          disablekb: 1,
          enablejsapi: 1,
          origin: window.location.origin,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            const p = event.target;
            ytApiPlayerRef.current = p;
            p.mute();
            p.playVideo();
          },
          onStateChange: (event: any) => {
            const target = event.target;
            const playerState = event.data;
            const YT = window.YT;

            if (playerState === YT.PlayerState.PAUSED) {
              let t = 0;
              let d = 0;
              try {
                t = target.getCurrentTime();
                d = target.getDuration();
              } catch {
                /* ignore */
              }
              if (d > 0 && t > d - 1.1) return;

              if (pauseNudgeTimer) clearTimeout(pauseNudgeTimer);
              pauseNudgeTimer = setTimeout(() => {
                pauseNudgeTimer = null;
                try {
                  if (target.getPlayerState() === YT.PlayerState.PAUSED) {
                    target.playVideo();
                  }
                } catch {
                  /* ignore */
                }
              }, 320);
            }
          },
          onError: (event: any) => {
            setTimeout(() => {
              try {
                event.target?.playVideo?.();
              } catch {
                /* ignore */
              }
            }, 2000);
          },
        },
      });
    };

    if (window.YT?.Player) {
      initializePlayer();
    } else if (!window.YT) {
      const existing = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      );
      if (!existing) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const first = document.getElementsByTagName("script")[0];
        first.parentNode?.insertBefore(tag, first);
      }
      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      window.onYouTubeIframeAPIReady = initializePlayer;
    }

    return () => {
      if (pauseNudgeTimer) clearTimeout(pauseNudgeTimer);
      try {
        ytApiPlayerRef.current?.destroy?.();
      } catch {
        /* ignore */
      }
      ytApiPlayerRef.current = null;
    };
  }, [videoId, isNear]);

  return (
    <div
      ref={nearRef}
      className={cn(
        "relative mb-14 hidden overflow-hidden rounded-2xl border border-border/70 shadow-[0_24px_48px_-12px_hsl(220_20%_12%/0.08)] lg:mb-16 lg:block 2xl:mb-20",
        className,
      )}
      aria-label={ariaLabel}
    >
      <AbstractFrameBackdrop animate />

      <div className="relative z-[2] px-[6%] py-[6.5%] sm:px-[7%] sm:py-[7%] md:px-[8%] md:py-[7.5%]">
        <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-black shadow-[inset_0_0_0_1px_hsl(0_0%_100%/0.06)] outline outline-1 outline-white/25 [outline-offset:0]">
          <div
            className="relative w-full overflow-hidden"
            style={{ paddingBottom: "56.25%" }}
          >
            <div
              className="absolute inset-0 h-full w-full"
              style={{
                transform: "scale(1.15)",
                transformOrigin: "center center",
              }}
            >
              {isNear ? (
                <div
                  ref={playerRef}
                  id={playerIdRef.current}
                  className="h-full w-full"
                />
              ) : null}
            </div>
            <div className="absolute inset-0" style={{ zIndex: 10 }} />
          </div>
        </div>
      </div>

      <noscript>
        <p className="relative z-[2] px-6 pb-6 text-center text-sm text-muted-foreground">
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            className="text-primary underline-offset-4 hover:underline"
            rel="noopener noreferrer"
          >
            Watch on YouTube
          </a>
        </p>
      </noscript>
    </div>
  );
}
