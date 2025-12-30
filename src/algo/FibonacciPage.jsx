import React, { useState, useEffect, useRef } from "react";
import ControlButtons from "../ControlButtons";

const FibonacciPage = () => {
  const [n, setN] = useState(8);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [result, setResult] = useState(null);

  const timerRef = useRef(null);

  /* ================= FETCH ================= */
  const fetchFibonacciSteps = async () => {
    const res = await fetch("http://localhost:3000/dynamicalgo/fibonacci", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ n }),
    });

    return res.json();
  };

  /* ================= PLAY ================= */
  const handlePlay = async () => {
    if (isPlaying) return;

    if (steps.length === 0) {
      const data = await fetchFibonacciSteps();
      setSteps(data.steps || []);
      setResult(data.result);
      setCurrentStepIndex(0);
      setExplanation("Starting Fibonacci DP...");
    }

    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
  };

  const handleReplay = () => {
    clearTimeout(timerRef.current);
    setIsPlaying(false);
    setSteps([]);
    setCurrentStepIndex(0);
    setExplanation("");
    setResult(null);
  };

  /* ================= ANIMATION ================= */
  useEffect(() => {
    if (!isPlaying) return;

    if (currentStepIndex < steps.length) {
      timerRef.current = setTimeout(() => {
        setExplanation(steps[currentStepIndex]?.explanation || "");
        setCurrentStepIndex((prev) => prev + 1);
      }, 1000);
    } else {
      setExplanation("✅ Fibonacci computation complete");
      setIsPlaying(false);
    }

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIndex, steps]);

  /* ================= CURRENT DP ================= */
  const dp =
    steps.length > 0 && currentStepIndex > 0
      ? steps[Math.min(currentStepIndex - 1, steps.length - 1)].dpSnapshot
      : Array(n + 1).fill(0);

  const activeStep =
    currentStepIndex > 0 ? steps[currentStepIndex - 1] : null;

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-25">
<h1 className="text-3xl font-bold text-center mb-2">
  Fibonacci Sequence (Dynamic Programming)
</h1>

<p className="text-center text-gray-400 max-w-3xl mx-auto mb-4">
  The Fibonacci sequence is a classic problem used to demonstrate Dynamic
  Programming. Each number is computed as the sum of the two preceding numbers,
  and Dynamic Programming optimizes the process by storing previously computed
  results instead of recalculating them.
</p>

<div className="max-w-3xl mx-auto bg-gray-800 rounded-lg p-4 mb-8">
  <p className="text-gray-300 mb-2">
    <span className="font-semibold text-white">Time Complexity:</span> O(n),
    when solved using Dynamic Programming.
  </p>
  <p className="text-gray-300">
    <span className="font-semibold text-white">Space Complexity:</span> O(n),
    for storing the DP array (can be optimized to O(1)).
  </p>
</div>



      {/* INPUT */}
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="number"
          min="0"
          max="20"
          value={n}
          disabled={isPlaying}
          onChange={(e) => setN(Number(e.target.value))}
          className="px-4 py-2 bg-gray-800 rounded w-40"
          placeholder="Enter n"
        />
      </div>

      <ControlButtons
        onPlay={handlePlay}
        onPause={handlePause}
        onReplay={handleReplay}
        disabled={isPlaying}
      />

      {/* EXPLANATION */}
      <div className="text-center text-blue-300 mb-6 min-h-[24px]">
        {explanation || "Click Play to start"}
      </div>

      {/* DP ARRAY */}
      <div className="flex justify-center gap-3 flex-wrap">
        {dp.map((value, index) => {
          let bg = "bg-gray-700";

          if (activeStep?.index === index) {
            bg = "bg-yellow-400 text-black";
          }

          if (activeStep?.from?.includes(index)) {
            bg = "bg-purple-400 text-black";
          }

          return (
            <div
              key={index}
              className={`w-16 h-16 flex flex-col items-center justify-center rounded transition-all ${bg}`}
            >
              <div className="text-xs text-gray-300">dp[{index}]</div>
              <div className="text-xl font-bold">{value}</div>
            </div>
          );
        })}
      </div>

      {/* RESULT */}
      {!isPlaying && result !== null && (
        <div className="mt-8 text-center text-green-400 text-xl font-semibold">
          Fibonacci({n}) = {result}
        </div>
      )}
    </div>
  );
};

export default FibonacciPage;
