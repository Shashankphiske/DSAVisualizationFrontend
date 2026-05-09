import { Activity, CircleDot } from "lucide-react";

const ExplanationBox = ({ text, isPlaying, tone = "default" }) => {
  const cls = tone === "warn" ? "explanation warn" : !text ? "explanation idle" : "explanation";
  return (
    <div className={cls}>
      <div className="flex items-start gap-2">
        {isPlaying ? (
          <Activity size={14} className="mt-0.5 text-[hsl(var(--accent))] shrink-0 pulse rounded-full" />
        ) : (
          <CircleDot size={14} className="mt-0.5 text-[hsl(var(--text-3))] shrink-0" />
        )}
        <span>{text || "Press Play to start the visualization."}</span>
      </div>
    </div>
  );
};

export default ExplanationBox;
