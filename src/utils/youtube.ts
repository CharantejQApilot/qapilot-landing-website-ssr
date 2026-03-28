/**
 * Extract a YouTube video ID from various URL formats.
 */
export const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

/**
 * Get the highest-quality YouTube thumbnail URL for a given video URL.
 * Returns null if the URL is invalid.
 */
export const getYouTubeThumbnail = (url: string): string | null => {
  const id = extractYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
};

/**
 * youtube-nocookie embed URL: autoplay, muted, loop, no controls (GIF-like hero).
 * `playlist` must match `videoId` for loop to work on a single video.
 * `origin` reduces embed quirks; defaults to production site (override for local dev if needed).
 */
export function buildYouTubeHeroEmbedUrl(
  videoId: string,
  origin: string = "https://qapilot.io",
): string {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: videoId,
    controls: "0",
    modestbranding: "1",
    playsinline: "1",
    rel: "0",
    disablekb: "1",
    fs: "0",
    iv_load_policy: "3",
    cc_load_policy: "0",
    ...(origin ? { origin } : {}),
  });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}
