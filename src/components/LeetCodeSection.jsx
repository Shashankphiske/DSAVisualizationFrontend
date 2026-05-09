import { useEffect, useState, useMemo } from "react";
import { ExternalLink, Check, Trophy, ListChecks, RotateCcw } from "lucide-react";
import LEETCODE_PROBLEMS from "../data/leetcodeProblems";

const DIFF_STYLES = {
  Easy:   "text-[hsl(var(--accent))] bg-[hsl(var(--accent))/0.1] border-[hsl(var(--accent))/0.3]",
  Medium: "text-[hsl(var(--accent-3))] bg-[hsl(var(--accent-3))/0.1] border-[hsl(var(--accent-3))/0.3]",
  Hard:   "text-[hsl(var(--accent-4))] bg-[hsl(var(--accent-4))/0.1] border-[hsl(var(--accent-4))/0.3]",
};

const STORAGE_KEY = "lc-completed-v1";

const loadCompleted = () => {
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")); }
  catch { return new Set(); }
};
const saveCompleted = (set) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set))); } catch {}
};

/**
 * <LeetCodeSection slug="bubbleSort" />
 * Renders a curated LeetCode problem list with a left-side checkbox per row.
 * Completion is persisted to localStorage and shared across pages.
 */
const LeetCodeSection = ({ slug, title = "Practice on LeetCode" }) => {
  const problems = LEETCODE_PROBLEMS[slug] || [];
  const [completed, setCompleted] = useState(() => loadCompleted());

  useEffect(() => {
    const onStorage = (e) => { if (e.key === STORAGE_KEY) setCompleted(loadCompleted()); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = (id) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      saveCompleted(next);
      return next;
    });
  };

  const resetTopic = () => {
    setCompleted((prev) => {
      const next = new Set(prev);
      problems.forEach((p) => next.delete(p.id));
      saveCompleted(next);
      return next;
    });
  };

  const stats = useMemo(() => {
    const done = problems.filter((p) => completed.has(p.id)).length;
    return { done, total: problems.length, pct: problems.length ? Math.round((done / problems.length) * 100) : 0 };
  }, [problems, completed]);

  if (!problems.length) return null;

  return (
    <section className="card p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "hsl(var(--accent) / 0.12)", border: "1px solid hsl(var(--accent) / 0.25)" }}
          >
            <ListChecks size={18} className="text-[hsl(var(--accent))]" />
          </div>
          <div>
            <div className="card-title">LeetCode Practice</div>
            <h2 className="display text-lg font-bold text-[hsl(var(--text))] leading-tight">{title}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1.5 rounded-md bg-[hsl(var(--bg-2))] border border-[hsl(var(--border))] text-[hsl(var(--text-2))] inline-flex items-center gap-1.5">
            <Trophy size={12} className="text-[hsl(var(--accent))]" />
            <span className="text-[hsl(var(--accent))]">{stats.done}</span>
            <span className="text-[hsl(var(--text-3))]">/ {stats.total}</span>
          </span>
          {stats.done > 0 && (
            <button
              onClick={resetTopic}
              className="text-xs font-mono px-2.5 py-1.5 rounded-md bg-[hsl(var(--bg-2))] border border-[hsl(var(--border))] text-[hsl(var(--text-3))] hover:text-[hsl(var(--accent-4))] hover:border-[hsl(var(--accent-4))/0.5] transition-colors inline-flex items-center gap-1.5"
              title="Reset progress for this topic"
            >
              <RotateCcw size={12} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-[hsl(var(--bg-3))] overflow-hidden border border-[hsl(var(--border))]">
        <div
          className="h-full bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--accent-2))] transition-all duration-500"
          style={{ width: `${stats.pct}%` }}
        />
      </div>

      {/* Problem list */}
      <ul className="flex flex-col gap-2">
        {problems.map((p) => {
          const done = completed.has(p.id);
          return (
            <li
              key={p.id}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-200 ${
                done
                  ? "border-[hsl(var(--accent))/0.4] bg-[hsl(var(--accent))/0.05]"
                  : "border-[hsl(var(--border))] bg-[hsl(var(--bg-3))] hover:border-[hsl(var(--accent))/0.3]"
              }`}
            >
              {/* Checkbox */}
              <button
                role="checkbox"
                aria-checked={done}
                aria-label={done ? `Mark ${p.title} as not done` : `Mark ${p.title} as done`}
                onClick={() => toggle(p.id)}
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                  done
                    ? "bg-[hsl(var(--accent))] border-[hsl(var(--accent))]"
                    : "border-[hsl(var(--border))] hover:border-[hsl(var(--accent))] bg-[hsl(var(--bg-2))]"
                }`}
              >
                {done && <Check size={14} strokeWidth={3} className="text-[hsl(var(--bg))]" />}
              </button>

              {/* Number */}
              <span className="font-mono text-xs text-[hsl(var(--text-3))] w-10 shrink-0">#{p.id}</span>

              {/* Title (link) */}
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 min-w-0 truncate text-sm font-medium transition-colors ${
                  done ? "text-[hsl(var(--text-2))] line-through" : "text-[hsl(var(--text))] group-hover:text-[hsl(var(--accent))]"
                }`}
              >
                {p.title}
              </a>

              {/* Difficulty pill */}
              <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md border ${DIFF_STYLES[p.difficulty] || ""}`}>
                {p.difficulty}
              </span>

              {/* External link icon */}
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--text-3))] hover:text-[hsl(var(--accent))] transition-colors shrink-0"
                aria-label="Open on LeetCode"
              >
                <ExternalLink size={14} />
              </a>
            </li>
          );
        })}
      </ul>

      <p className="text-[11px] font-mono text-[hsl(var(--text-3))] text-center pt-1">
        Progress saved locally in your browser.
      </p>
    </section>
  );
};

export default LeetCodeSection;
