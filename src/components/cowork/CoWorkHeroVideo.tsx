"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
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
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  getPlayerState: () => number;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy?: () => void;
  unloadModule?: (module: string) => void;
  setOption?: (module: string, option: string, value: unknown) => void;
};

function disableCaptions(player: YtPlayer) {
  try {
    player.unloadModule?.("captions");
    player.unloadModule?.("cc");
  } catch {
    /* ignore */
  }
  try {
    player.setOption?.("captions", "track", {});
  } catch {
    /* ignore */
  }
}

function restartLoop(player: YtPlayer) {
  try {
    player.seekTo(0, true);
    player.playVideo();
  } catch {
    /* ignore */
  }
}

export function CoWorkHeroVideo({ className }: CoWorkHeroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [player, setPlayer] = useState<YtPlayer | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const playerIdRef = useRef(`cowork-hero-yt-${uid}`);
  const ytApiPlayerRef = useRef<YtPlayer | null>(null);
  const userPausedRef = useRef(false);

  useEffect(() => {
    userPausedRef.current = userPaused;
  }, [userPaused]);

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
            disableCaptions(p);
            p.playVideo();
          },
          onApiChange: (event: { target: YtPlayer }) => {
            disableCaptions(event.target);
          },
          onStateChange: (event: { target: YtPlayer; data: number }) => {
            const target = event.target;
            const playerState = event.data;
            const YT = window.YT;

            if (playerState === YT.PlayerState.PLAYING) {
              disableCaptions(target);
              setIsPlaying(true);
              return;
            }

            if (playerState === YT.PlayerState.ENDED) {
              if (pauseNudgeTimer) clearTimeout(pauseNudgeTimer);
              restartLoop(target);
              return;
            }

            if (playerState === YT.PlayerState.PAUSED) {
              setIsPlaying(false);
              if (userPausedRef.current) return;

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
                if (userPausedRef.current) return;
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

  const togglePlay = () => {
    if (!player) return;
    try {
      if (isPlaying) {
        userPausedRef.current = true;
        setUserPaused(true);
        player.pauseVideo();
      } else {
        userPausedRef.current = false;
        setUserPaused(false);
        player.playVideo();
      }
    } catch {
      /* ignore */
    }
  };

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
        "group relative w-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-[0_24px_80px_-24px_hsl(220_25%_8%/0.28)]",
        className,
      )}
    >
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: "56.25%" }}>
        <div ref={playerRef} id={playerIdRef.current} className="absolute inset-0 h-full w-full" />

        {/* Blocks native YouTube chrome until hover. */}
        <div
          className="absolute inset-0 z-[10] bg-transparent transition-opacity duration-300 group-hover:pointer-events-none group-hover:opacity-0"
          aria-hidden
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 z-[11] h-[18%] min-h-[3rem]",
            "bg-gradient-to-t from-background via-background/90 to-transparent",
            "transition-opacity duration-300 group-hover:opacity-0",
          )}
          aria-hidden
        />
      </div>

      <div
        className={cn(
          "absolute inset-0 z-20 flex items-center justify-center gap-3",
          "bg-black/0 opacity-0 transition-opacity duration-300",
          "group-hover:bg-black/20 group-hover:opacity-100",
        )}
      >
        <button
          type="button"
          onClick={togglePlay}
          disabled={!player}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full",
            "border border-white/30 bg-black/50 text-white shadow-lg backdrop-blur-md",
            "transition-colors hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
            "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100",
            "disabled:opacity-50 sm:h-12 sm:w-12",
          )}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="h-5 w-5" aria-hidden /> : <Play className="h-5 w-5" aria-hidden />}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          disabled={!player}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full",
            "border border-white/30 bg-black/50 text-white shadow-lg backdrop-blur-md",
            "transition-colors hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
            "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100",
            "disabled:opacity-50 sm:h-12 sm:w-12",
          )}
          aria-label={isMuted ? "Turn sound on" : "Turn sound off"}
          aria-pressed={!isMuted}
        >
          {isMuted ? <VolumeX className="h-5 w-5" aria-hidden /> : <Volume2 className="h-5 w-5" aria-hidden />}
        </button>
      </div>
    </div>
  );
}
