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

interface YouTubeVideoPlayerProps {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  uploadDate?: string;
  duration?: string;
}

const YouTubeVideoPlayer = ({ 
  videoId, 
  title, 
  description,
  thumbnailUrl,
  uploadDate = "2024-01-01T00:00:00Z",
  duration = "PT3M00S"
}: YouTubeVideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [player, setPlayer] = useState<any>(null);
  const [userPaused, setUserPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const userPausedRef = useRef(false);
  const playerIdRef = useRef(`youtube-player-${videoId}-${Math.random().toString(36).substr(2, 9)}`);
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
        videoId: videoId,
        playerVars: {
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          fs: 1,
          cc_load_policy: 0,
          iv_load_policy: 3,
          autohide: 1,
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: videoId,
          disablekb: 0,
          enablejsapi: 1,
          origin: window.location.origin,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            const p = event.target;
            ytApiPlayerRef.current = p;
            setPlayer(p);
            setVideoDuration(p.getDuration());
            p.mute();
            p.playVideo();
          },
          onStateChange: (event: any) => {
            const target = event.target;
            const playerState = event.data;
            const YT = window.YT;

            if (playerState === YT.PlayerState.PLAYING) {
              setIsPlaying(true);
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
            // ENDED: rely on loop + playlist; avoid seekTo(0) double-restart glitch.
          },
          onError: (event: any) => {
            console.error("YouTube player error:", event.data);
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

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else if (!window.YT) {
      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      );

      if (!existingScript) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
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
  }, [videoId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasInView = isInView;
        setIsInView(entry.isIntersecting);
        
        if (player && entry.isIntersecting && !wasInView && !userPausedRef.current) {
          if (player.getPlayerState() !== window.YT.PlayerState.PLAYING) {
            player.playVideo();
          }
        }
      },
      {
        threshold: 0.3,
        rootMargin: "50px 0px 50px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isInView, player]);

  useEffect(() => {
    userPausedRef.current = userPaused;
  }, [userPaused]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (player) {
      interval = setInterval(() => {
        try {
          const currentTime = player.getCurrentTime();
          const totalDuration = player.getDuration();
          if (totalDuration > 0) {
            setProgress((currentTime / totalDuration) * 100);
          }
          
          if (
            isInView &&
            !userPausedRef.current &&
            player.getPlayerState() === window.YT.PlayerState.PAUSED
          ) {
            player.playVideo();
          }
        } catch (error) {
          console.warn('Error updating video progress:', error);
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [player, isInView]);

  const togglePlay = () => {
    if (player) {
      try {
        if (isPlaying) {
          setUserPaused(true);
          player.pauseVideo();
        } else {
          setUserPaused(false);
          player.playVideo();
        }
      } catch (error) {
        console.warn('Error toggling video playback:', error);
      }
    }
  };

  const toggleMute = () => {
    if (player) {
      try {
        if (isMuted) {
          player.unMute();
          setIsMuted(false);
        } else {
          player.mute();
          setIsMuted(true);
        }
      } catch (error) {
        console.warn('Error toggling video mute:', error);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (player) {
      try {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * videoDuration;
        player.seekTo(newTime);
        setTimeout(() => {
          if (player.getPlayerState() !== window.YT.PlayerState.PLAYING) {
            player.playVideo();
          }
        }, 100);
      } catch (error) {
        console.warn('Error seeking video:', error);
      }
    }
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title,
    "description": description,
    "thumbnailUrl": thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    "uploadDate": uploadDate,
    "duration": duration,
    "contentUrl": `https://www.youtube.com/watch?v=${videoId}`,
    "embedUrl": `https://www.youtube.com/embed/${videoId}`,
    "publisher": {
      "@type": "Organization",
      "name": "QApilot",
      "logo": {
        "@type": "ImageObject",
        "url": DEFAULT_LOGO_URL
      }
    },
    "potentialAction": {
      "@type": "WatchAction",
      "target": `https://www.youtube.com/watch?v=${videoId}`
    }
  };

  return (
    <div ref={sectionRef} className="relative hidden lg:block">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }}
      />
      
      <div 
        className={`
          relative rounded-2xl overflow-hidden border border-border 
          transition-all duration-1000 ease-out
          ${isInView 
            ? 'scale-105 shadow-2xl shadow-primary/20' 
            : 'scale-95 opacity-70'
          }
        `}
      >
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <div
            ref={playerRef}
            id={playerIdRef.current}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ 
              isolation: 'isolate',
              transform: 'translateZ(0)'
            }}
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <div 
            className="w-full h-2 bg-white/30 rounded-full cursor-pointer group hover:h-3 transition-all duration-200"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-primary rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
          <div className="flex items-center gap-4">
            <Button
              onClick={togglePlay}
              variant="secondary"
              size="icon"
              className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            
            <Button
              onClick={toggleMute}
              variant="secondary" 
              size="icon"
              className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </Button>
          </div>
        </div>

        <div 
          className={`
            absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 
            rounded-3xl blur-xl transition-opacity duration-1000
            ${isInView ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ zIndex: -1 }}
        />
      </div>
    </div>
  );
};

export default YouTubeVideoPlayer;
