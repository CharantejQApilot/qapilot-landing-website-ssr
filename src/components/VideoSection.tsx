"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGO_URL } from "@/lib/constants";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const VIDEO_ID = "yTw379QdfSo";

export type VideoSectionVariant = "default" | "embed" | "fullBleed";

interface VideoSectionProps {
  /** embed: no section chrome (e.g. inside a grid). fullBleed: autoplay video below metrics, no heading copy. */
  variant?: VideoSectionVariant;
  /** @deprecated use variant="embed" */
  embedInGrid?: boolean;
}

const VideoSection = ({ variant: variantProp, embedInGrid = false }: VideoSectionProps) => {
  const variant: VideoSectionVariant =
    variantProp ?? (embedInGrid ? "embed" : "default");
  const isFullBleed = variant === "fullBleed";

  const [isActivated, setIsActivated] = useState(isFullBleed);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [player, setPlayer] = useState<any>(null);
  const [userPaused, setUserPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const userPausedRef = useRef(false);
  /** YouTube IFrame API instance — ref avoids stale destroy() on effect cleanup */
  const ytApiPlayerRef = useRef<{ destroy?: () => void; playVideo?: () => void } | null>(
    null,
  );

  const activatePlayer = () => {
    if (!isActivated) setIsActivated(true);
  };

  useEffect(() => {
    if (isFullBleed) setIsActivated(true);
  }, [isFullBleed]);

  useEffect(() => {
    if (!isActivated) return;

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
          origin: typeof window !== "undefined" ? window.location.origin : "",
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            const p = event.target;
            ytApiPlayerRef.current = p;
            setPlayer(p);
            try {
              setDuration(p.getDuration() || 0);
            } catch {
              /* ignore */
            }
            p.mute();
            p.playVideo();
          },
          onStateChange: (event: any) => {
            const target = event.target;
            const s = event.data;
            const YT = window.YT;
            if (s === YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              return;
            }
            if (s === YT.PlayerState.PAUSED) {
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
              // Native loop briefly reports PAUSED at the seam; nudging play here fights YouTube and glitches.
              if (d > 0 && t > d - 1.1) return;

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
              return;
            }
            // ENDED: do not seekTo(0) — loop + playlist (same video id) already restarts; double-handling stutters.
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

    if (window.YT && window.YT.Player) initializePlayer();
    else if (!window.YT) {
      const existing = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      );
      if (!existing) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.getElementsByTagName("script")[0].parentNode?.insertBefore(
          tag,
          document.getElementsByTagName("script")[0],
        );
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
  }, [isActivated]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasInView = isInView;
        setIsInView(!!entry?.isIntersecting);
        if (entry?.isIntersecting && !isActivated) activatePlayer();
        if (
          player &&
          entry?.isIntersecting &&
          !wasInView &&
          !userPausedRef.current &&
          player.getPlayerState() !== window.YT.PlayerState.PLAYING
        ) {
          player.playVideo();
        }
      },
      { threshold: 0.2, rootMargin: "80px 0px 80px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isInView, player, isActivated]);

  useEffect(() => {
    userPausedRef.current = userPaused;
  }, [userPaused]);

  useEffect(() => {
    if (isFullBleed || !player) return;
    const interval = setInterval(() => {
      try {
        const ct = player.getCurrentTime();
        const vd = player.getDuration();
        if (vd > 0) setProgress((ct / vd) * 100);
        if (
          isInView &&
          !userPausedRef.current &&
          player.getPlayerState() === window.YT.PlayerState.PAUSED
        ) {
          player.playVideo();
        }
      } catch {
        /* ignore */
      }
    }, 100);
    return () => clearInterval(interval);
  }, [player, isInView, isFullBleed]);

  const togglePlay = () => {
    if (!player) return;
    try {
      if (isPlaying) {
        setUserPaused(true);
        player.pauseVideo();
      } else {
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
        setIsMuted(false);
      } else {
        player.mute();
        setIsMuted(true);
      }
    } catch {
      /* ignore */
    }
  };
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!player) return;
    try {
      const r = e.currentTarget.getBoundingClientRect();
      player.seekTo(((e.clientX - r.left) / r.width) * duration);
      setTimeout(() => {
        if (player.getPlayerState() !== window.YT.PlayerState.PLAYING) player.playVideo();
      }, 100);
    } catch {
      /* ignore */
    }
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "QApilot - AI-Powered Mobile App Testing Platform",
    description: "Discover how QApilot revolutionizes mobile app testing with AI-driven automation.",
    thumbnailUrl: `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`,
    uploadDate: "2024-09-01T00:00:00Z",
    duration: "PT3M30S",
    contentUrl: `https://www.youtube.com/watch?v=${VIDEO_ID}`,
    embedUrl: `https://www.youtube.com/embed/${VIDEO_ID}`,
    publisher: {
      "@type": "Organization",
      name: "QApilot",
      logo: { "@type": "ImageObject", url: DEFAULT_LOGO_URL },
    },
    potentialAction: {
      "@type": "WatchAction",
      target: `https://www.youtube.com/watch?v=${VIDEO_ID}`,
    },
  };

  const hoverControls = (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 opacity-0 transition-opacity duration-200 pointer-events-none group-hover:bg-black/25 group-hover:opacity-100 group-hover:pointer-events-auto">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          variant="secondary"
          size="icon"
          aria-label={isPlaying ? "Pause" : "Play"}
          className="h-14 w-14 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg hover:bg-background"
        >
          {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
        </Button>
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          variant="secondary"
          size="icon"
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="h-14 w-14 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg hover:bg-background"
        >
          {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
        </Button>
      </div>
    </div>
  );

  if (isFullBleed) {
    return (
      <section
        ref={sectionRef}
        data-section="video"
        className="relative w-full section-edge overflow-hidden section-cream border-y border-border"
        aria-label="QApilot product demo video"
      >
        <div className="absolute inset-0 bg-dot-pattern-subtle pointer-events-none" aria-hidden="true" />
        {/* Diagonal lines — opposite tilt vs testimonials (they use +15°) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.09]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="video-section-diagonal"
                x="0"
                y="0"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(-15)"
              >
                <line x1="0" y1="0" x2="0" y2="24" stroke="hsl(var(--foreground))" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#video-section-diagonal)" />
          </svg>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }}
        />
        {/* Same horizontal inset as other sections (section-full); text-free — video only */}
        <div className="section-full relative z-10 py-2 sm:py-3 md:py-4">
          <div className="relative group w-full max-w-full mx-auto bg-black rounded-xl overflow-hidden border border-border/30 shadow-sm">
            <div className="relative w-full aspect-video bg-black">
            <div className="absolute inset-0">
              {!isActivated ? (
                <button
                  type="button"
                  onClick={activatePlayer}
                  className="absolute inset-0 w-full h-full cursor-pointer"
                  aria-label="Play QApilot demo video"
                >
                  <img
                    src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    width={1280}
                    height={720}
                  />
                </button>
              ) : (
                <div
                  ref={playerRef}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ isolation: "isolate", transform: "translateZ(0)" }}
                />
              )}
            </div>
            {hoverControls}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const videoBlock = (
    <>
      <div
        className={`relative rounded-2xl overflow-hidden border border-border bg-background transition-all duration-1000 ease-out ${
          isInView ? "shadow-xl" : "opacity-70"
        }`}
      >
        <div className="relative w-full" style={{ paddingBottom: "56.25%", minHeight: "360px" }}>
          {!isActivated ? (
            <button
              type="button"
              onClick={activatePlayer}
              className="absolute top-0 left-0 w-full h-full cursor-pointer group"
              aria-label="Play QApilot demo video"
            >
              <img
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt="QApilot demo video thumbnail"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={1280}
                height={720}
                style={{ aspectRatio: "16/9" }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 group-hover:bg-foreground/30 transition-colors">
                <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play size={32} className="text-foreground ml-1" />
                </div>
              </div>
            </button>
          ) : (
            <div
              ref={playerRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{ isolation: "isolate", transform: "translateZ(0)" }}
            />
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <div
            className="w-full h-1.5 bg-foreground/20 rounded-full cursor-pointer group hover:h-2.5 transition-all duration-200"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-foreground rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-foreground/5 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              onClick={togglePlay}
              variant="secondary"
              size="icon"
              aria-label={isPlaying ? "Pause" : "Play"}
              className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            <Button
              type="button"
              onClick={toggleMute}
              variant="secondary"
              size="icon"
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  if (variant === "embed") {
    return (
      <div ref={sectionRef} data-section="video" className="group relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }}
        />
        {videoBlock}
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      data-section="video"
      className="relative section-cream overflow-hidden section-edge"
    >
      <div className="absolute inset-0 bg-dot-pattern-subtle pointer-events-none" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }}
      />

      <div className="section-full relative z-10 py-16 md:py-24 2xl:py-32">
        <div className="text-center mb-10 2xl:mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
            See It In Action
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-semibold text-foreground">
            Watch QApilot Demo
          </h2>
        </div>
        {videoBlock}
      </div>
    </section>
  );
};

export default VideoSection;
