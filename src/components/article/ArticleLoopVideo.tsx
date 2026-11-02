"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

type YtPlayer = {
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getVolume: () => number;
  setVolume: (volume: number) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  destroy: () => void;
  getIframe?: () => HTMLIFrameElement;
  unloadModule?: (module: string) => void;
  getOption?: (module: string, option: string) => { languageCode?: string } | null;
  setOption?: (module: string, option: string, value: unknown) => void;
};

/**
 * YouTube draws previous, pause, and next at a fixed size inside the iframe
 * whenever the playhead is moved. Mounting the player larger and scaling it
 * back down shrinks that chrome to nothing. The video itself is sized in
 * percentages, so it still fills the frame.
 * 14 keeps a max-width article under the size where the player stops filling
 * the frame.
 */
const YOUTUBE_CHROME_SCALE = 14;

function concealYouTubeChrome(iframe: HTMLIFrameElement) {
  const scale = YOUTUBE_CHROME_SCALE;
  iframe.style.setProperty("position", "absolute", "important");
  iframe.style.setProperty("top", "0", "important");
  iframe.style.setProperty("left", "0", "important");
  iframe.style.setProperty("width", `${scale * 100}%`, "important");
  iframe.style.setProperty("height", `${scale * 100}%`, "important");
  iframe.style.setProperty("max-width", "none", "important");
  iframe.style.setProperty("border", "0", "important");
  iframe.style.setProperty("pointer-events", "none", "important");
  iframe.style.setProperty("transform", `scale(${1 / scale})`, "important");
  iframe.style.setProperty("transform-origin", "0 0", "important");
}

function hideYouTubeCaptions(player: YtPlayer) {
  try {
    const track = player.getOption?.("captions", "track");
    if (!track?.languageCode) return;
    player.setOption?.("captions", "track", {});
  } catch {
    /* captions module not ready */
  }
}

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

function formatTime(seconds: number) {
  const total = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(total / 60);
  const remainder = total % 60;
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

type ArticleLoopVideoProps = {
  videoId: string;
  title: string;
};

/**
 * Autoplaying, looping YouTube hero with no YouTube chrome.
 * Sound stays muted until the sound button is used, and that choice
 * is reapplied when the iframe scrolls off screen and back — the
 * player otherwise drops mute on its own. A seek bar scrubs the video.
 * Seeking makes YouTube paint previous, pause, and next in the middle;
 * the player is scaled so that chrome shrinks away. Play and pause are our own.
 */
export function ArticleLoopVideo({ videoId, title }: ArticleLoopVideoProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const seekRef = useRef<HTMLDivElement>(null);
  const mutedRef = useRef(true);
  const userPausedRef = useRef(false);
  const durationRef = useRef(0);
  const progressRef = useRef(0);
  const draggingRef = useRef(false);
  const seekId = useId();
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const enforcePause = (player: YtPlayer) => {
    if (!userPausedRef.current) return;
    try {
      const paused = window.YT?.PlayerState?.PAUSED;
      const ended = window.YT?.PlayerState?.ENDED;
      if (paused == null) return;
      const state = player.getPlayerState();
      if (state === paused || state === ended) return;
      player.pauseVideo();
    } catch {
      /* player not ready */
    }
  };

  const applyMute = (player: YtPlayer) => {
    try {
      if (mutedRef.current) {
        if (!player.isMuted()) {
          player.mute();
          player.setVolume(0);
        }
      } else if (player.isMuted() || player.getVolume() === 0) {
        player.unMute();
        player.setVolume(100);
      }
    } catch {
      /* player not ready */
    }
    // Unmuting resumes a paused YouTube video. Put the pause back.
    enforcePause(player);
  };

  const seekToRatio = (ratio: number) => {
    const player = playerRef.current;
    const duration = durationRef.current;
    if (!player || !(duration > 0)) return;
    const clamped = Math.min(1, Math.max(0, ratio));
    progressRef.current = clamped;
    setProgress(clamped);
    try {
      player.seekTo(clamped * duration, true);
    } catch {
      /* ignore */
    }
    applyMute(player);
  };

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const mount = document.createElement("div");
    mount.className = "h-full w-full";
    frame.appendChild(mount);

    let cancelled = false;

    const chromeObserver = new MutationObserver(() => {
      const iframe = frame.querySelector("iframe");
      if (iframe) concealYouTubeChrome(iframe);
    });
    chromeObserver.observe(frame, { childList: true, subtree: true });

    const syncFromPlayer = () => {
      if (cancelled) return;
      const player = playerRef.current;
      if (!player) return;
      applyMute(player);
      hideYouTubeCaptions(player);
      if (draggingRef.current) return;
      try {
        const duration = player.getDuration();
        const current = player.getCurrentTime();
        if (duration > 0) {
          durationRef.current = duration;
          const next = Math.min(1, Math.max(0, current / duration));
          if (Math.abs(next - progressRef.current) > 0.002) {
            progressRef.current = next;
            setProgress(next);
          }
        }
      } catch {
        /* ignore */
      }
    };

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
          controls: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          fs: 0,
          disablekb: 1,
          iv_load_policy: 3,
          cc_load_policy: 0,
          showinfo: 0,
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
            const iframe = event.target.getIframe?.();
            if (iframe) {
              iframe.tabIndex = -1;
              iframe.setAttribute("aria-hidden", "true");
              concealYouTubeChrome(iframe);
            }
            try {
              hideYouTubeCaptions(event.target);
              event.target.mute();
              event.target.setVolume(0);
              event.target.playVideo();
            } catch {
              /* ignore */
            }
          },
          onApiChange: (event: { target: YtPlayer }) => {
            if (cancelled) return;
            hideYouTubeCaptions(event.target);
            applyMute(event.target);
          },
          onStateChange: (event: { data: number; target: YtPlayer }) => {
            if (cancelled) return;
            applyMute(event.target);
            const playerState = window.YT?.PlayerState;
            if (!playerState) return;
            if (event.data === playerState.PLAYING || event.data === playerState.BUFFERING) {
              enforcePause(event.target);
            }
            if (event.data === playerState.ENDED) {
              if (userPausedRef.current) return;
              try {
                event.target.seekTo(0, true);
                event.target.playVideo();
                applyMute(event.target);
              } catch {
                /* ignore */
              }
              return;
            }
            if (event.data !== playerState.PAUSED || userPausedRef.current) return;
            window.setTimeout(() => {
              if (cancelled || userPausedRef.current) return;
              try {
                if (event.target.getPlayerState() === playerState.PAUSED) {
                  event.target.playVideo();
                  applyMute(event.target);
                }
              } catch {
                /* ignore */
              }
            }, 320);
          },
        },
      });
    });

    const poll = window.setInterval(syncFromPlayer, 200);

    const onVisibility = () => {
      const player = playerRef.current;
      if (player) applyMute(player);
    };
    document.addEventListener("visibilitychange", onVisibility);

    const root = frame.parentElement;
    const observer = new IntersectionObserver(onVisibility, {
      threshold: [0, 0.01, 0.25],
    });
    if (root) observer.observe(root);

    return () => {
      cancelled = true;
      chromeObserver.disconnect();
      window.clearInterval(poll);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
      durationRef.current = 0;
      progressRef.current = 0;
      mount.remove();
    };
  }, [videoId]);

  const onPlayClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const player = playerRef.current;
    const nextPaused = !userPausedRef.current;
    userPausedRef.current = nextPaused;
    setPlaying(!nextPaused);
    if (!player) return;
    try {
      if (nextPaused) {
        player.pauseVideo();
      } else {
        player.playVideo();
        applyMute(player);
      }
    } catch {
      /* ignore */
    }
  };

  const onSoundClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const player = playerRef.current;
    const nextMuted = !mutedRef.current;
    mutedRef.current = nextMuted;
    setMuted(nextMuted);
    if (!player) return;
    try {
      if (nextMuted) {
        player.mute();
        player.setVolume(0);
      } else {
        player.unMute();
        player.setVolume(100);
      }
      enforcePause(player);
    } catch {
      /* ignore */
    }
  };

  const ratioFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const bar = seekRef.current;
    if (!bar) return null;
    const rect = bar.getBoundingClientRect();
    if (rect.width <= 0) return null;
    return (event.clientX - rect.left) / rect.width;
  };

  const onSeekPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    const ratio = ratioFromPointer(event);
    if (ratio != null) seekToRatio(ratio);
  };

  const onSeekPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const ratio = ratioFromPointer(event);
    if (ratio != null) seekToRatio(ratio);
  };

  const onSeekPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const ratio = ratioFromPointer(event);
    if (ratio != null) seekToRatio(ratio);
  };

  const onSeekKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 0.1 : 0.05;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      seekToRatio(progressRef.current + step);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      seekToRatio(progressRef.current - step);
    } else if (event.key === "Home") {
      event.preventDefault();
      seekToRatio(0);
    } else if (event.key === "End") {
      event.preventDefault();
      seekToRatio(1);
    }
  };

  const duration = durationRef.current;
  const shownSeconds = progress * (duration > 0 ? duration : 0);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black">
      <div
        ref={frameRef}
        className="absolute inset-0"
      />
      <button
        type="button"
        onClick={onPlayClick}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute left-1/2 top-1/2 z-20 inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      >
        {playing ? (
          <Pause className="h-5 w-5" aria-hidden />
        ) : (
          <Play className="ml-0.5 h-5 w-5" aria-hidden />
        )}
      </button>
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
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8">
        <div
          ref={seekRef}
          id={seekId}
          role="slider"
          tabIndex={0}
          aria-label="Seek video"
          aria-valuemin={0}
          aria-valuemax={1000}
          aria-valuenow={Math.round(progress * 1000)}
          aria-valuetext={
            duration > 0
              ? `${formatTime(shownSeconds)} of ${formatTime(duration)}`
              : "Video loading"
          }
          onPointerDown={onSeekPointerDown}
          onPointerMove={onSeekPointerMove}
          onPointerUp={onSeekPointerUp}
          onPointerCancel={onSeekPointerUp}
          onKeyDown={onSeekKeyDown}
          className="group relative flex h-6 cursor-pointer touch-none items-center focus-visible:outline-none"
        >
          <div className="relative h-1 w-full rounded-full bg-white/35 transition-[height] group-hover:h-1.5 group-focus-visible:h-1.5">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-white"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow-sm"
            style={{ left: `clamp(0px, calc(${progress * 100}% - 6px), calc(100% - 12px))` }}
          />
        </div>
      </div>
      <p className="sr-only">{title}</p>
    </div>
  );
}
