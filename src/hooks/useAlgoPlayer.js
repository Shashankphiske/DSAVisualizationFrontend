import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Centralized step playback engine for algorithm visualizations.
 *
 * Provides:
 *   - Play / pause / reset
 *   - Step forward / step back (history buffer = full step list)
 *   - Variable speed (1x..5x)
 *   - Progress percentage
 *
 * Usage:
 *   const player = useAlgoPlayer();
 *   await player.load(async () => fetchSteps(...))
 *   player.play();
 *   player.step.arr      // <- current step payload
 *   player.index         // 0-based, points at currently visible step
 */
export default function useAlgoPlayer() {
  const [steps, setSteps] = useState([]);
  const [index, setIndex] = useState(-1);          // -1 = nothing shown yet
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);            // 1..5
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState(null);          // backend-supplied metadata (e.g. measured complexity)

  const timerRef = useRef(null);
  const stepsRef = useRef([]);
  const indexRef = useRef(-1);
  const speedRef = useRef(2);

  stepsRef.current = steps;
  indexRef.current = index;
  speedRef.current = speed;

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const tick = useCallback(() => {
    const next = indexRef.current + 1;
    if (next >= stepsRef.current.length) {
      setIsPlaying(false);
      return;
    }
    setIndex(next);
    // delay scales inversely with speed; 1x = 1500ms, 5x = 300ms
    const delay = Math.max(180, 1700 - speedRef.current * 280);
    timerRef.current = setTimeout(tick, delay);
  }, []);

  const play = useCallback(() => {
    if (stepsRef.current.length === 0) return;
    if (indexRef.current >= stepsRef.current.length - 1) {
      // restart from beginning
      setIndex(-1);
      indexRef.current = -1;
    }
    setIsPlaying(true);
    clearTimer();
    timerRef.current = setTimeout(tick, 200);
  }, [tick]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    clearTimer();
  }, []);

  const stepForward = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setIndex((i) => Math.min(stepsRef.current.length - 1, i + 1));
  }, []);

  const stepBack = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setIndex((i) => Math.max(-1, i - 1));
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setSteps([]);
    setIndex(-1);
    setError("");
    setMeta(null);
  }, []);

  /**
   * Load steps from any source (sync array or async fn returning array).
   * Returns the loaded array or null on error.
   */
  const load = useCallback(async (source) => {
    clearTimer();
    setIsPlaying(false);
    setError("");
    setLoading(true);
    setMeta(null);
    try {
      const raw = typeof source === "function" ? await source() : source;
      // Accept either: an array of steps, or an object { steps, measured, ...meta }
      let data = raw;
      let extractedMeta = null;
      if (raw && !Array.isArray(raw) && typeof raw === "object") {
        data = raw.steps ?? raw.arr ?? raw.data ?? null;
        const { steps: _s, arr: _a, data: _d, ...rest } = raw;
        extractedMeta = Object.keys(rest).length ? rest : null;
      }
      if (!Array.isArray(data) || data.length === 0) {
        setError("No steps returned.");
        setLoading(false);
        return null;
      }
      setSteps(data);
      setIndex(-1);
      if (extractedMeta) setMeta(extractedMeta);
      setLoading(false);
      return data;
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to load steps.");
      setLoading(false);
      return null;
    }
  }, []);

  useEffect(() => () => clearTimer(), []);

  const step = index >= 0 ? steps[index] : null;
  const total = steps.length;
  const progress = total > 0 ? ((index + 1) / total) * 100 : 0;

  return {
    // state
    steps, step, index, total, progress,
    isPlaying, speed, error, loading, meta,
    // controls
    play, pause, stepForward, stepBack, reset, load,
    setSpeed, setError, setMeta,
  };
}
