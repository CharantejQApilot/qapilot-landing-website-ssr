"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { COWORK_HERO_VIDEO_ID } from "@/lib/cowork";
import { cn } from "@/lib/utils";

type CoWorkHeroVideoProps = {
  className?: string;
};

type YtPlayer = {
  mute: () => void;
  unMute: () => void;
  setVolume: (volume: number) => void;
  playVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  getPlayerState: () => number;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy?: () => void;
};

function restartLoop(player: YtPlayer) {
  try {
    player.seekTo(0, true);
    player.playVideo();
  } catch {
    /* ignore */
  }
}

export function CoWorkHeroVideo({ className }: CoWorkHeroVideoProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [player, setPlayer] = useState<YtPlayer | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const playerIdRef = useRef(`cowork-hero-yt-${uid}`);
  const ytApiPlayerRef = useRef<YtPlayer | null>(null);

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
      setPlayer(null);

      new window.YT.Player(playerRef.current, {
        height: "100%",
        width: "100%",
        videoId: COWORK_HERO_VIDEO_ID,
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
          playlist: COWORK_HERO_VIDEO_ID,
          disablekb: 1,
          enablejsapi: 1,
          origin: window.location.origin,
          playsinline: 1,
        },
        events: {
          onReady: (event: { target: YtPlayer }) => {
            const p = event.target;
            ytApiPlayerRef.current = p;
            setPlayer(p);
            p.mute();
            p.playVideo();
          },
          onStateChange: (event: { target: YtPlayer; data: number }) => {
            const target = event.target;
            const playerState = event.data;
            const YT = window.YT;

            if (playerState === YT.PlayerState.ENDED) {
              if (pauseNudgeTimer) clearTimeout(pauseNudgeTimer);
              restartLoop(target);
              return;
            }

            if (playerState === YT.PlayerState.PAUSED) {
              let t = 0;
              let d = 0;
              try {
                t = target.getCurrentTime();
                d = target.getDuration();
              } catch {
                /* ignore */
              }
              if (d > 0 && t > d - 1.1) {
                restartLoop(target);
                return;
              }

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
          onError: (event: { target: YtPlayer }) => {
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
      const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
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
      setPlayer(null);
    };
  }, []);

  const toggleMute = () => {
    if (!player) return;
    try {
      if (isMuted) {
        player.unMute();
        player.setVolume(100);
        setIsMuted(false);
      } else {
        player.mute();
        setIsMuted(true);
      }
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-[0_24px_80px_-24px_hsl(220_25%_8%/0.28)]",
        className,
      )}
    >
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: "56.25%" }}>
        <div ref={playerRef} id={playerIdRef.current} className="absolute inset-0 h-full w-full" />
      </div>

      <button
        type="button"
        onClick={toggleMute}
        disabled={!player}
        className={cn(
          "absolute bottom-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full",
          "border border-white/30 bg-black/50 text-white shadow-lg backdrop-blur-md",
          "transition-colors hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          "disabled:opacity-50 sm:bottom-4 sm:right-4 sm:h-10 sm:w-10",
        )}
        aria-label={isMuted ? "Turn sound on" : "Turn sound off"}
        aria-pressed={!isMuted}
      >
        {isMuted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
      </button>
    </div>
  );
}
