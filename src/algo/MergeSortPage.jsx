import React, { useState, useEffect, useRef } from "react";
import ControlButtons from "../ControlButtons";

const MergeSortPage = () => {
  const [input, setInput] = useState("5,3,8,4,2");
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  const timerRef = useRef(null);

  // 🔹 Fetch steps from backend
  const fetchMergeSortSteps = async (arr) => {
    const res = await fetch("http://localhost:3000/sortingalgo/mergesort", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ arr: JSON.stringify(arr) }),
    });

    const data = await res.json();
    return data.arr;
  };

  // ▶ Play
  const handlePlay = async () => {
    if (isPlaying) return;

    if (steps.length === 0) {
      const parsed = input.split(",").map(Number).filter(n => !isNaN(n));
      if (parsed.length === 0) {
        setError("Invalid input! Please enter comma-separated numbers (e.g., 5,3,8,4,2)");
        return;
      }
      setError("");
      setArray(parsed);
      setCurrentStepIndex(0);
      setExplanation("Starting Merge Sort. Dividing the array into smaller subarrays.");

      const backendSteps = await fetchMergeSortSteps(parsed);
      setSteps(backendSteps);
    }

    setIsPlaying(true);
  };

  // ⏸ Pause
  const handlePause = () => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
  };

  // 🔁 Replay
  const handleReplay = () => {
    clearTimeout(timerRef.current);
    setIsPlaying(false);
    setSteps([]);
    setArray([]);
    setCurrentStepIndex(0);
    setExplanation("");
    setError("");
  };

  // 🧠 Explanation generator
  const generateExplanation = (step) => {
    if (!step.comparing || step.comparing.length === 0) {
      return "Merge Sort completed. All subarrays have been merged into a sorted array.";
    }

    if (step.comparing.length === 2 && !step.swapped) {
      const [i, j] = step.comparing;
      return `Comparing ${step.arr[i]} and ${step.arr[j]} from two subarrays.`;
    }

    if (step.swapped && step.mergedIndexes.length > 0) {
      const idx = step.mergedIndexes[step.mergedIndexes.length - 1];
      return `Placed ${step.arr[idx]} into the merged array at position ${idx}.`;
    }

    return "Merging sorted subarrays.";
  };

  // 🎞 Animation engine
  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length) return;

    timerRef.current = setTimeout(() => {
      const step = steps[currentStepIndex];

      setArray(step.arr);
      setExplanation(generateExplanation(step));
      setCurrentStepIndex(i => i + 1);
    }, 1800);

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIndex, steps]);

  const currentStep = steps[currentStepIndex - 1] || {};
  const {
    comparing = [],
    mergedIndexes = [],
    swapped = false,
  } = currentStep;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Merge Sort Visualization
      </h1>

      {/* Info */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">About Merge Sort</h2>
        <p className="text-gray-300 text-sm">
          Merge Sort is a divide-and-conquer algorithm. It divides the array,
          sorts each half, and merges them back together.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          ⏱ O(n log n) Time | 🧠 O(n) Space
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap items-start">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Demo: 5,3,8,4,2 or 64,34,25,12,22,11,90</label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isPlaying}
            placeholder="e.g., 5,3,8,4,2"
            className="px-4 py-2 rounded bg-gray-800 border border-gray-600 w-96"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        
        <button onClick={handlePlay} disabled={isPlaying} className="bg-green-600 px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed mt-6">
          ▶ Play
        </button>
        <button onClick={handlePause} disabled={!isPlaying} className="bg-yellow-500 px-6 py-2 rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed mt-6">
          ⏸ Pause
        </button>
        <button onClick={handleReplay} className="bg-red-600 px-6 py-2 rounded hover:bg-red-700 mt-6">
          🔁 Replay
        </button>
      </div>

      {/* Explanation */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-4 rounded mb-6 text-center">
        <p className="text-lg text-blue-300 font-medium">
          {explanation || "Click Play to start Merge Sort visualization"}
        </p>
      </div>

      {/* Visualization */}
      <div className="flex justify-center items-end gap-2 bg-gray-800 p-8 rounded max-w-6xl mx-auto" style={{ minHeight: "400px" }}>
        {array.map((value, index) => {
          let bgColor = "bg-blue-500";
          let scale = "scale-100";
          let shadow = "";

          if (mergedIndexes.includes(index)) {
            bgColor = "bg-purple-500";
            scale = "scale-105";
            shadow = "shadow-lg shadow-purple-500/50";
          }
          if (comparing.includes(index)) {
            bgColor = swapped ? "bg-red-500" : "bg-yellow-400";
            scale = "scale-110";
            shadow = "shadow-2xl shadow-yellow-400/50";
          }

          const heightPercentage = (value / Math.max(...array)) * 100;

          return (
            <div
              key={index}
              className={`
                w-16 flex flex-col items-center justify-end
                transition-all duration-500 ease-in-out
                ${scale} ${shadow}
              `}
              style={{ height: "350px" }}
            >
              <div className="text-sm font-bold text-white mb-1">{value}</div>
              <div
                className={`
                  w-full rounded-t-lg
                  transition-all duration-500 ease-in-out
                  ${bgColor}
                `}
                style={{ height: `${heightPercentage}%` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MergeSortPage;
