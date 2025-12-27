import React, { useState, useEffect, useRef } from "react";
import ControlButtons from "../ControlButtons";

const MergeSortPage = () => {
  const [input, setInput] = useState("5,3,8,4,2");
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [explanation, setExplanation] = useState("");

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

      {/* Input */}
      <div className="flex justify-center mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isPlaying}
          className="px-4 py-2 rounded bg-gray-800 border border-gray-600 w-64"
        />
      </div>

      {/* Buttons */}
      <ControlButtons
        onPlay={handlePlay}
        onPause={handlePause}
        onReplay={handleReplay}
        disabled={isPlaying}
      />

      {/* Explanation */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-4 rounded mb-6 text-center">
        <p className="text-lg text-blue-300 font-medium">
          {explanation || "Click Play to start Merge Sort visualization"}
        </p>
      </div>

      {/* Visualization */}
      <div className="flex justify-center items-center gap-4 bg-gray-800 p-8 rounded max-w-6xl mx-auto flex-wrap">
        {array.map((value, index) => {
          let bgColor = "bg-blue-500";

          if (mergedIndexes.includes(index)) bgColor = "bg-purple-500";
          if (comparing.includes(index)) {
            bgColor = swapped ? "bg-red-500" : "bg-yellow-400";
          }

          return (
            <div
              key={index}
              className={`w-16 h-16 flex items-center justify-center text-xl font-bold text-black rounded transition-all duration-500 ${bgColor}`}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MergeSortPage;
