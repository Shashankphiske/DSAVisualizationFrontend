import React, { useState, useEffect, useRef } from "react";

const SelectionSortPage = () => {
  const [input, setInput] = useState("5,3,8,4,2");
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");

  const timerRef = useRef(null);

  // 🔹 Fetch steps from backend
  const fetchSelectionSortSteps = async (arr) => {
    const res = await fetch(
      "http://localhost:3000/sortingalgo/selectionsort",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          arr: JSON.stringify(arr),
        }),
      }
    );

    const data = await res.json();
    return data.arr;
  };

  // ▶ Play
  const handlePlay = async () => {
    if (isPlaying) return;

    if (steps.length === 0) {
      const parsedArray = input
        .split(",")
        .map((n) => Number(n.trim()))
        .filter((n) => !isNaN(n));

      if (parsedArray.length === 0) {
        setError("Invalid input! Please enter comma-separated numbers (e.g., 5,3,8,4,2)");
        return;
      }

      setError("");
      setArray(parsedArray);
      setCurrentStepIndex(0);

      const backendSteps = await fetchSelectionSortSteps(parsedArray);
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
    setError("");
  };

  // 🎞 Animation engine
  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length) return;

    timerRef.current = setTimeout(() => {
      const step = steps[currentStepIndex];
      setArray(step.arr);
      setCurrentStepIndex((prev) => prev + 1);
    }, 1800);

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIndex, steps]);

  const currentStep = steps[currentStepIndex - 1] || {};
  const {
    comparing = [],
    selectedmin = null,
    swapped = false,
  } = currentStep;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-25 ">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Selection Sort Visualization
      </h1>

      {/* Info */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded mb-8">
        <h2 className="text-xl font-semibold mb-2">About Selection Sort</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Selection Sort repeatedly selects the minimum element from the
          unsorted part of the array and swaps it with the first unsorted
          element. The sorted portion grows from left to right.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          ⏱ Time Complexity: O(n²) | 🧠 Space Complexity: O(1)
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap items-start">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Demo: 5,3,8,4,2 or 64,34,25,12,22,11,90</label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isPlaying}
            className="px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none w-96"
            placeholder="e.g., 5,3,8,4,2"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="px-6 py-2 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          ▶ Play
        </button>

        <button
          onClick={handlePause}
          disabled={!isPlaying}
          className="px-6 py-2 bg-yellow-500 rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          ⏸ Pause
        </button>

        <button
          onClick={handleReplay}
          className="px-6 py-2 bg-red-600 rounded hover:bg-red-700 mt-6"
        >
          🔁 Replay
        </button>
      </div>

      {/* Visualization */}
      <div className="flex justify-center items-end gap-2 bg-gray-800 p-8 rounded max-w-5xl mx-auto" style={{ minHeight: "400px" }}>
        {array.map((value, index) => {
          let bgColor = "bg-blue-500";
          let scale = "scale-100";
          let shadow = "";

          if (index === selectedmin) {
            bgColor = "bg-purple-500";
            scale = "scale-105";
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

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-500 rounded"></span> Unsorted
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-purple-500 rounded"></span> Selected Min
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-yellow-400 rounded"></span> Comparing
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-500 rounded"></span> Swapping
        </div>
      </div>
    </div>
  );
};

export default SelectionSortPage;
