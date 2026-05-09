import { Activity, Clock, Database, Hash } from "lucide-react";

/**
 * Small box that displays the *actual* complexity / metrics computed by the
 * backend for the run that just played. `meta` is whatever the backend returns
 * alongside `steps`, e.g.:
 *   { time: "O(n log n)", space: "O(n)", comparisons: 42, swaps: 12, steps: 87, durationMs: 3 }
 *
 * Renders nothing if `meta` is falsy. Unknown keys are shown as raw chips.
 */
const FRIENDLY = {
  time: { label: "Time", icon: Clock },
  space: { label: "Space", icon: Database },
  comparisons: { label: "Comparisons", icon: Hash },
  swaps: { label: "Swaps", icon: Hash },
  operations: { label: "Operations", icon: Hash },
  steps: { label: "Steps", icon: Hash },
  durationMs: { label: "Duration", icon: Activity, suffix: " ms" },
};

const formatKey = (k) =>
  k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

const MeasuredComplexity = ({ meta }) => {
  if (!meta || typeof meta !== "object") return null;
  const entries = Object.entries(meta).filter(
    ([, v]) => v !== null && v !== undefined && v !== ""
  );
  if (entries.length === 0) return null;

  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Activity size={14} className="text-[hsl(var(--accent))]" />
        <div className="card-title !mb-0">Measured complexity</div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[hsl(var(--text-2))]">
          from this run
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {entries.map(([key, value]) => {
          const cfg = FRIENDLY[key] || {};
          const Icon = cfg.icon || Hash;
          const label = cfg.label || formatKey(key);
          const suffix = cfg.suffix || "";
          return (
            <span key={key} className="badge badge-time">
              <Icon size={12} /> {label}{" "}
              <span className="font-semibold text-[hsl(var(--text))] ml-1">
                {String(value)}
                {suffix}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default MeasuredComplexity;
