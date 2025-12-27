import React, { useState, useEffect, useRef } from "react";

const SelectionSortPage = () => {
  const [input, setInput] = useState("5,3,8,4,2");
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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
    <div className="min-h-screen bg-gray-900 text-white p-8">
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
      <div className="flex justify-center gap-4 mb-8">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isPlaying}
          className="px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none w-64"
          placeholder="5,3,8,4,2"
        />

        <button
          onClick={handlePlay}
          className="px-6 py-2 bg-green-600 rounded hover:bg-green-700"
        >
          ▶ Play
        </button>

        <button
          onClick={handlePause}
          className="px-6 py-2 bg-yellow-500 rounded hover:bg-yellow-600"
        >
          ⏸ Pause
        </button>

        <button
          onClick={handleReplay}
          className="px-6 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          🔁 Replay
        </button>
      </div>

      {/* Visualization */}
      <div className="flex justify-center items-center gap-4 bg-gray-800 p-8 rounded max-w-5xl mx-auto">
        {array.map((value, index) => {
          let bgColor = "bg-blue-500";

          if (index === selectedmin) bgColor = "bg-purple-500";

          if (comparing.includes(index)) {
            bgColor = swapped ? "bg-red-500" : "bg-yellow-400";
          }

          return (
            <div
              key={index}
              className={`
                w-16 h-16 flex items-center justify-center
                text-xl font-bold text-black rounded
                transition-all duration-500 ease-in-out
                ${bgColor}
              `}
            >
              {value}
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
