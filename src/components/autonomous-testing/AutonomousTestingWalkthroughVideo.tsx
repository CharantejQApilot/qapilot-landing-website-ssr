"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { AUTONOMOUS_WALKTHROUGH_SCENIC_URL } from "@/lib/core-advantage-scenic-urls.mjs";

const VIDEO_ID = "0rFUbrdW_fc";

export function AutonomousTestingWalkthroughVideo() {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerIdRef = useRef(
    `yt-walkthrough-${Math.random().toString(36).slice(2, 9)}`,
  );
  const ytApiPlayerRef = useRef<{ destroy?: () => void } | null>(null);

  useEffect(() => {
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
        videoId: VIDEO_ID,
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
          playlist: VIDEO_ID,
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
  }, []);

  return (
    <div
      className="relative mb-14 overflow-hidden rounded-2xl border border-border/70 shadow-[0_24px_48px_-12px_hsl(220_20%_12%/0.08)] md:mb-16 2xl:mb-20"
      aria-label="Autonomous testing walkthrough video"
    >
      {/* Scenic backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-background" aria-hidden>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-[-10%] motion-safe:animate-scenic-ken-burns">
            <Image
              src={AUTONOMOUS_WALKTHROUGH_SCENIC_URL}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(min-width: 1280px) 1200px, 100vw"
              unoptimized
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-transparent to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-transparent to-background/10" />
        <div className="absolute inset-0 bg-primary/[0.02]" />
      </div>

      <div className="relative z-[2] px-[6%] py-[6.5%] sm:px-[7%] sm:py-[7%] md:px-[8%] md:py-[7.5%]">
        <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-black shadow-[inset_0_0_0_1px_hsl(0_0%_100%/0.06)] outline outline-1 outline-white/25 [outline-offset:0]">
          {/* 16:9 container — overflow-hidden clips the scaled iframe */}
          <div className="relative w-full overflow-hidden" style={{ paddingBottom: "56.25%" }}>
            <div
              className="absolute inset-0 h-full w-full"
              style={{
                transform: "scale(1.15)",
                transformOrigin: "center center",
              }}
            >
              <div
                ref={playerRef}
                id={playerIdRef.current}
                className="h-full w-full"
              />
            </div>
            {/* Transparent shield blocks hover from reaching the YouTube iframe */}
            <div className="absolute inset-0" style={{ zIndex: 10 }} />
          </div>
        </div>
      </div>

      <noscript>
        <p className="relative z-[2] px-6 pb-6 text-center text-sm text-muted-foreground">
          <a
            href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
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
