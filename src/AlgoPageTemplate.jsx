/**
 * Reusable layout primitives for algorithm pages — all themed via index.css tokens.
 * Backwards-compatible exports: AlgoPageHeader, AlgoExplanation, AlgoVisualizationContainer.
 */
import ComplexityBadges from "./components/ComplexityBadges";
import ExplanationBox from "./components/ExplanationBox";

export const AlgoPageHeader = ({ icon: Icon, title, description, complexity, badge }) => (
  <header className="space-y-4">
    {badge && <div className="header-badge">{badge}</div>}

    <div className="flex items-start gap-4">
      {Icon && (
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 glow"
          style={{ background: "hsl(var(--accent))" }}
        >
          {Icon && (
            <Icon size={22} strokeWidth={2.2} className="text-[hsl(var(--bg))]" />
          )}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="display text-3xl sm:text-4xl font-extrabold tracking-tight">
          <span className="text-[hsl(var(--text))]">{title.split(" ")[0]} </span>
          <span className="gradient-text">{title.split(" ").slice(1).join(" ")}</span>
        </h1>
        {description && (
          <p className="text-sm text-[hsl(var(--text-2))] mt-2 leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </div>

    {complexity && (
      <ComplexityBadges
        time={complexity.time}
        space={complexity.space}
        stable={complexity.stable}
      />
    )}

    {complexity && (complexity.timeReason || complexity.spaceReason) && (
      <div className="grid sm:grid-cols-2 gap-2 max-w-3xl">
        {complexity.timeReason && (
          <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))]/40 px-3 py-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[hsl(var(--accent))] mb-1">
              Why time {complexity.time}
            </div>
            <p className="text-xs text-[hsl(var(--text-2))] leading-relaxed">
              {complexity.timeReason}
            </p>
          </div>
        )}
        {complexity.spaceReason && (
          <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))]/40 px-3 py-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[hsl(var(--accent-2))] mb-1">
              Why space {complexity.space}
            </div>
            <p className="text-xs text-[hsl(var(--text-2))] leading-relaxed">
              {complexity.spaceReason}
            </p>
          </div>
        )}
      </div>
    )}
  </header>
);

export const AlgoExplanation = ({ explanation, isPlaying }) => (
  <ExplanationBox text={explanation} isPlaying={isPlaying} />
);

export const AlgoVisualizationContainer = ({ children, className = "" }) => (
  <div className={`min-h-[280px] flex items-center justify-center p-4 ${className}`}>
    {children}
  </div>
);

export const AlgoPageShell = ({ children }) => (
  <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto space-y-6">{children}</div>
  </div>
);
