import { HomeIcon } from "lucide-react"
import { getVideoId } from "../utils/algorithmVideos";

/**
 * Embed a YouTube tutorial for an algorithm.
 * Usage: <VideoEmbed slug="bubble-sort" />
 *        <VideoEmbed videoId="abc123" />
 */
const VideoEmbed = ({ slug, videoId, title = "Watch a video tutorial" }) => {
  const id = videoId || getVideoId(slug);

  return (
    <section className="card p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "hsl(var(--accent-4) / 0.15)" }}
        >
          <HomeIcon size={18} className="text-[hsl(var(--accent-4))]" />
        </div>
        <div>
          <div className="card-title">{title}</div>
          <p className="text-xs text-[hsl(var(--text-2))] mt-0.5">
            {id
              ? "A short primer to build intuition before diving in."
              : "Tutorial coming soon for this algorithm."}
          </p>
        </div>
      </div>

      {id ? (
        <div
          className="relative w-full overflow-hidden rounded-xl border"
          style={{
            paddingTop: "56.25%",
            borderColor: "hsl(var(--border))",
            background: "hsl(var(--bg-3))",
          }}
        >
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
            title="Algorithm tutorial"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : null}
    </section>
  );
};

export default VideoEmbed;
