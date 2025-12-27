import React, { useState, useEffect, useRef } from "react";

const BubbleSortPage = () => {
  const [input, setInput] = useState("5,3,8,4,2");
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [explanation, setExplanation] = useState("");

  const timerRef = useRef(null);

  // 🔹 Fetch steps
  const fetchBubbleSortSteps = async (arr) => {
    const res = await fetch("http://localhost:3000/sortingalgo/bubblesort", {
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
      const parsedArray = input
        .split(",")
        .map((n) => Number(n.trim()))
        .filter((n) => !isNaN(n));

      setArray(parsedArray);
      setCurrentStepIndex(0);
      setExplanation("Starting Bubble Sort...");

      const backendSteps = await fetchBubbleSortSteps(parsedArray);
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

  // 🎞 Animation engine
  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length) return;

    timerRef.current = setTimeout(() => {
      const step = steps[currentStepIndex];
      setArray(step.arr);

      // 🔹 Generate explanation
      setExplanation(generateExplanation(step, currentStepIndex));

      setCurrentStepIndex((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIndex, steps]);

  const currentStep = steps[currentStepIndex - 1] || {};
  const { comparing = [], swapped = false } = currentStep;

  // 🔹 Explanation generator
  const generateExplanation = (step, index) => {
    if (!step.comparing || step.comparing.length === 0) {
      return "Bubble Sort completed. The array is now sorted.";
    }

    const [i, j] = step.comparing;
    const a = step.arr;

    if (step.swapped) {
      return `Swapped ${a[j]} and ${a[i]} because ${a[j]} was smaller than ${a[i]}.`;
    }

    return `Comparing ${a[i]} and ${a[j]}. No swap needed since they are already in correct order.`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Bubble Sort Visualization
      </h1>

      {/* Info */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">About Bubble Sort</h2>
        <p className="text-gray-300 text-sm">
          Bubble Sort repeatedly compares adjacent elements and swaps them if
          they are in the wrong order.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          ⏱ O(n²) Time | 🧠 O(1) Space
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isPlaying}
          className="px-4 py-2 rounded bg-gray-800 border border-gray-600 w-64"
        />

        <button onClick={handlePlay} className="bg-green-600 px-6 py-2 rounded">
          ▶ Play
        </button>

        <button onClick={handlePause} className="bg-yellow-500 px-6 py-2 rounded">
          ⏸ Pause
        </button>

        <button onClick={handleReplay} className="bg-red-600 px-6 py-2 rounded">
          🔁 Replay
        </button>
      </div>

      {/* 🔹 Explanation Box */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-4 rounded mb-6 text-center">
        <p className="text-lg text-blue-300 font-medium">
          {explanation || "Click Play to start the visualization"}
        </p>
      </div>

      {/* Visualization */}
      <div className="flex justify-center items-center gap-4 bg-gray-800 p-8 rounded max-w-5xl mx-auto">
        {array.map((value, index) => {
          let bgColor = "bg-blue-500";

          if (comparing.includes(index)) {
            bgColor = swapped ? "bg-red-500" : "bg-yellow-400";
          }

          return (
            <div
              key={index}
              className={`
                w-16 h-16 flex items-center justify-center
                text-xl font-bold text-black rounded
                transition-all duration-500
                ${bgColor}
              `}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BubbleSortPage;
