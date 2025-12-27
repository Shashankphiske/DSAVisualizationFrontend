import React, { useState, useEffect, useRef } from "react";
import ControlButtons from "../ControlButtons";

const NODE_SIZE = 48;
const LEVEL_HEIGHT = 80;

/* 🔹 Calculate tree node position from array index */
const getPosition = (index) => {
  const level = Math.floor(Math.log2(index + 1));
  const levelStart = Math.pow(2, level) - 1;
  const posInLevel = index - levelStart;
  const nodesInLevel = Math.pow(2, level);

  const containerWidth = 900;
  const gap = containerWidth / nodesInLevel;

  return {
    x: gap * posInLevel + gap / 2,
    y: level * LEVEL_HEIGHT + 40,
  };
};

const HeapSortPage = () => {
  const [input, setInput] = useState("5,3,8,4,2");
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [explanation, setExplanation] = useState("");

  const timerRef = useRef(null);

  /* 🔹 Fetch steps from backend */
  const fetchHeapSortSteps = async (arr) => {
    const res = await fetch("http://localhost:3000/sortingalgo/heapsort", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ arr: JSON.stringify(arr) }),
    });
    const data = await res.json();
    return data.arr;
  };

  /* ▶ Play */
  const handlePlay = async () => {
    if (isPlaying) return;

    if (steps.length === 0) {
      const parsed = input
        .split(",")
        .map(Number)
        .filter((n) => !isNaN(n));

      setArray(parsed);
      setCurrentStepIndex(0);
      setExplanation("Building a max heap from the input array.");

      const backendSteps = await fetchHeapSortSteps(parsed);
      setSteps(backendSteps);
    }

    setIsPlaying(true);
  };

  /* ⏸ Pause */
  const handlePause = () => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
  };

  /* 🔁 Replay */
  const handleReplay = () => {
    clearTimeout(timerRef.current);
    setIsPlaying(false);
    setSteps([]);
    setArray([]);
    setCurrentStepIndex(0);
    setExplanation("");
  };

  /* 🧠 Explanation generator */
  const generateExplanation = (step, prevStep) => {
    if (!step.comparing || step.comparing.length === 0) {
      return "Heap Sort completed. All elements are now sorted.";
    }

    const [i, j] = step.comparing;

    if (!step.swapped) {
      return `Comparing parent ${step.arr[i]} with child ${step.arr[j]} to maintain the max heap property.`;
    }

    if (prevStep && step.heapRange < prevStep.heapRange) {
      return "Moved the maximum element to its correct sorted position and reduced the heap size.";
    }

    return `Swapped ${step.arr[i]} and ${step.arr[j]} to restore the max heap property.`;
  };

  /* 🎞 Animation engine */
  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length) return;

    timerRef.current = setTimeout(() => {
      const step = steps[currentStepIndex];
      const prevStep = steps[currentStepIndex - 1];

      setArray(step.arr);
      setExplanation(generateExplanation(step, prevStep));
      setCurrentStepIndex((i) => i + 1);
    }, 1800);

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIndex, steps]);

  const step = steps[currentStepIndex - 1] || {};
  const { comparing = [], heapRange = array.length, swapped = false } = step;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Heap Sort (Tree Visualization)
      </h1>

      {/* About Heap Sort */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">About Heap Sort</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          Heap Sort is a comparison-based sorting algorithm that uses a binary
          heap data structure. The array is first converted into a max heap,
          where the largest element is always at the root. The root element is
          repeatedly removed and placed at the end of the array, and the heap
          size is reduced and restored using heapify.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          ⏱ O(n log n) Time | 🧠 O(1) Space | 🌳 Binary Heap
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

      {/* Controls */}
      <ControlButtons
        onPlay={handlePlay}
        onPause={handlePause}
        onReplay={handleReplay}
        disabled={isPlaying}
      />

      {/* Explanation */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-4 rounded mb-6 text-center">
        <p className="text-lg text-blue-300 font-medium">
          {explanation || "Click Play to start Heap Sort visualization"}
        </p>
      </div>

      {/* Tree Visualization */}
      <div
        className="relative mx-auto bg-gray-800 rounded p-6"
        style={{ width: 900, height: 420 }}
      >
        <svg className="absolute top-0 left-0 w-full h-full">
          {array.map((_, i) => {
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            const from = getPosition(i);

            return (
              <React.Fragment key={i}>
                {left < heapRange && (
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={getPosition(left).x}
                    y2={getPosition(left).y}
                    stroke="#555"
                  />
                )}
                {right < heapRange && (
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={getPosition(right).x}
                    y2={getPosition(right).y}
                    stroke="#555"
                  />
                )}
              </React.Fragment>
            );
          })}
        </svg>

        {array.map((value, index) => {
          const { x, y } = getPosition(index);
          let bg = "bg-blue-500";

          if (index >= heapRange) bg = "bg-green-500";
          if (comparing.includes(index)) {
            bg = swapped ? "bg-red-500" : "bg-yellow-400";
          }

          return (
            <div
              key={index}
              className={`absolute w-12 h-12 rounded-full flex items-center justify-center font-bold text-black transition-all duration-500 ${bg}`}
              style={{ left: x - NODE_SIZE / 2, top: y }}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeapSortPage;
