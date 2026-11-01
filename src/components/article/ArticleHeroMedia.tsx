import { ArticleLoopVideo } from "@/components/article/ArticleLoopVideo";
import { CmsRemoteImage } from "@/components/CmsRemoteImage";
import { extractYouTubeId } from "@/utils/youtube";

type ArticleHeroMediaProps = {
  youtubeUrl?: string | null;
  imageUrl?: string | null;
  imageAlt: string;
};

/** Full-width hero inside the article margins. A YouTube URL replaces the cover. */
export function ArticleHeroMedia({
  youtubeUrl,
  imageUrl,
  imageAlt,
}: ArticleHeroMediaProps) {
  const trimmedVideo = youtubeUrl?.trim() ?? "";
  const videoId = trimmedVideo ? extractYouTubeId(trimmedVideo) : null;
  const cover = imageUrl?.trim() ?? "";

  if (!videoId && !cover) return null;

  return (
    <div className="mb-8 w-full overflow-hidden rounded-lg">
      {videoId ? (
        <ArticleLoopVideo videoId={videoId} title={imageAlt} />
      ) : (
        <CmsRemoteImage
          src={cover}
          alt={imageAlt}
          className="h-auto w-full object-contain"
          width={1200}
          height={630}
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          style={{ aspectRatio: "1200/630" }}
        />
      )}
    </div>
  );
}
