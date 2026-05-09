import { Play, Pause, SkipBack, SkipForward, RotateCcw, Gauge } from "lucide-react";

/**
 * Modern playback control bar with step-back / step-forward / speed.
 * Pairs with useAlgoPlayer.
 */
const ControlBar = ({ player, onPlay }) => {
  const {
    isPlaying, index, total, speed, progress,
    play, pause, stepForward, stepBack, reset, setSpeed,
  } = player;

  const canStep = total > 0;
  const handlePlay = () => {
    if (onPlay) onPlay();
    else play();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        {isPlaying ? (
          <button className="btn btn-primary" onClick={pause}>
            <Pause size={15} strokeWidth={2.5} /> Pause
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handlePlay}>
            <Play size={15} strokeWidth={2.5} fill="currentColor" /> Play
          </button>
        )}
        <button className="btn" onClick={stepBack} disabled={!canStep || index < 0}>
          <SkipBack size={15} /> Back
        </button>
        <button className="btn" onClick={stepForward} disabled={!canStep || index >= total - 1}>
          <SkipForward size={15} /> Step
        </button>
        <button className="btn" onClick={reset}>
          <RotateCcw size={15} /> Reset
        </button>

        <div className="ml-auto flex items-center gap-2">
          <Gauge size={14} className="text-[hsl(var(--text-2))]" />
          <span className="text-xs font-mono text-[hsl(var(--text-2))]">Speed</span>
          <input
            type="range" min="1" max="5" value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="range"
          />
          <span className="text-xs font-mono text-[hsl(var(--accent))] w-7">{speed}x</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="font-mono text-xs text-[hsl(var(--text-2))]">
          Step <span className="text-[hsl(var(--accent))] font-bold text-sm">{Math.max(0, index + 1)}</span>
          <span className="mx-1">/</span>{total}
        </div>
        <div className="progress-bar flex-1">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
