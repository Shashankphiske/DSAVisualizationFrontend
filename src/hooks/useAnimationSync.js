import { useEffect, useRef } from "react";

/**
 * Hook to synchronize animation timings with code highlighting.
 * 
 * Ensures that:
 * 1. Code highlighting updates quickly (200-300ms) to show current operation
 * 2. Animation completes (500ms CSS duration)
 * 3. Next step triggers after full delay (1800-2000ms)
 * 
 * @param {boolean} isPlaying - Whether animation is playing
 * @param {number} currentStepIndex - Current step index
 * @param {Array} steps - Array of animation steps
 * @param {number} animationSpeed - Speed multiplier (1 = normal, 2 = 2x, etc.)
 * @param {number} fullDelay - Full delay between steps in ms (default: 1800)
 * @param {Function} onHighlightUpdate - Called to update highlighted line
 * @param {Function} onStepUpdate - Called to move to next step
 * @param {Function} onAnimationComplete - Called when animation finishes
 */
export const useAnimationSync = ({
  isPlaying,
  currentStepIndex,
  steps,
  animationSpeed = 1,
  fullDelay = 1800,
  onHighlightUpdate,
  onStepUpdate,
  onAnimationComplete,
}) => {
  const timerRef = useRef(null);
  const highlightTimerRef = useRef(null);

  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length) {
      if (!isPlaying) {
        clearTimeout(timerRef.current);
        clearTimeout(highlightTimerRef.current);
      }
      return;
    }

    const step = steps[currentStepIndex];
    
    // Update code highlighting quickly (at 20% through the animation)
    const highlightDelay = (fullDelay / animationSpeed) * 0.2; // 200-400ms depending on delay
    highlightTimerRef.current = setTimeout(() => {
      if (onHighlightUpdate) {
        onHighlightUpdate(step);
      }
    }, highlightDelay);

    // Move to next step after full delay
    const stepDelay = fullDelay / animationSpeed;
    timerRef.current = setTimeout(() => {
      if (onStepUpdate) {
        onStepUpdate();
      }
      if (currentStepIndex === steps.length - 1 && onAnimationComplete) {
        onAnimationComplete();
      }
    }, stepDelay);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(highlightTimerRef.current);
    };
  }, [isPlaying, currentStepIndex, steps, animationSpeed, fullDelay]);

  const cleanup = () => {
    clearTimeout(timerRef.current);
    clearTimeout(highlightTimerRef.current);
  };

  return { cleanup };
};
