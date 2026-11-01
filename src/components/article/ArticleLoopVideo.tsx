"use client";

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { Volume2, VolumeX } from "lucide-react";

type YtPlayer = {
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  playVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  destroy: () => void;
};

let youtubeApiPromise: Promise<void> | null = null;

function loadYouTubeIframeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };

    const src = "https://www.youtube.com/iframe_api";
    if (!document.querySelector(`script[src="${src}"]`)) {
      const tag = document.createElement("script");
      tag.src = src;
      document.head.appendChild(tag);
    }
  });

  return youtubeApiPromise;
}

function unmutePlayer(player: YtPlayer) {
  player.unMute();
  player.setVolume(100);
}

type ArticleLoopVideoProps = {
  videoId: string;
  title: string;
};

/**
 * Muted, looping YouTube hero. Hover unmutes when the browser allows it
 * (hover is not a user gesture in Chrome/Safari until the page has been
 * clicked). A sound button unmutes on click. Pointer leave mutes again.
 * Touch keeps the video muted until the sound button is tapped.
 */
export function ArticleLoopVideo({ videoId, title }: ArticleLoopVideoProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const hoveringRef = useRef(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const mount = document.createElement("div");
    mount.className = "h-full w-full";
    frame.appendChild(mount);

    let cancelled = false;

    loadYouTubeIframeApi().then(() => {
      if (cancelled || !mount.isConnected || !window.YT?.Player) return;

      new window.YT.Player(mount, {
        videoId,
        host: "https://www.youtube-nocookie.com",
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: videoId,
          controls: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: { target: YtPlayer }) => {
            if (cancelled) {
              try {
                event.target.destroy();
              } catch {
                /* ignore */
              }
              return;
            }
            playerRef.current = event.target;
            try {
              event.target.mute();
              event.target.playVideo();
              if (hoveringRef.current) {
                unmutePlayer(event.target);
                setMuted(event.target.isMuted());
              }
            } catch {
              /* ignore */
            }
          },
          onStateChange: (event: { data: number; target: YtPlayer }) => {
            const ended = window.YT?.PlayerState?.ENDED;
            if (ended == null || event.data !== ended) return;
            try {
              event.target.seekTo(0, true);
              event.target.playVideo();
            } catch {
              /* ignore */
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
      mount.remove();
    };
  }, [videoId]);

  const onPointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    hoveringRef.current = true;
    const player = playerRef.current;
    if (!player) return;
    try {
      unmutePlayer(player);
      setMuted(player.isMuted());
    } catch {
      /* ignore */
    }
  };

  const onPointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    hoveringRef.current = false;
    const player = playerRef.current;
    if (!player) return;
    try {
      player.mute();
      setMuted(true);
    } catch {
      /* ignore */
    }
  };

  const onSoundClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const player = playerRef.current;
    if (!player) return;
    try {
      if (muted) {
        unmutePlayer(player);
        setMuted(player.isMuted());
      } else {
        player.mute();
        setMuted(true);
      }
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      className="relative aspect-video w-full bg-muted"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div
        ref={frameRef}
        className="absolute inset-0 [&_iframe]:h-full [&_iframe]:w-full"
      />
      <button
        type="button"
        onClick={onSoundClick}
        aria-pressed={!muted}
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
        className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      >
        {muted ? (
          <VolumeX className="h-4 w-4" aria-hidden />
        ) : (
          <Volume2 className="h-4 w-4" aria-hidden />
        )}
      </button>
      <p className="sr-only">{title}</p>
    </div>
  );
}
