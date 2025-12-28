import React, { useState, useEffect, useRef } from "react";

const BinarySearchPage = () => {
  const [input, setInput] = useState("2,5,8,12,16,23,38,45,56,67,78");
  const [target, setTarget] = useState("23");
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  const timerRef = useRef(null);

  const fetchBinarySearchSteps = async (arr, num) => {
    const res = await fetch("http://localhost:3000/searchingalgo/binarysearch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ arr: JSON.stringify(arr), num: parseInt(num) }),
    });

    const data = await res.json();
    return data.arr;
  };

  const handlePlay = async () => {
    if (isPlaying) return;

    if (steps.length === 0) {
      const parsedArray = input.split(",").map(n => Number(n.trim())).filter(n => !isNaN(n));
      const targetNum = Number(target.trim());

      if (parsedArray.length === 0) {
        setError("Invalid array! Please enter comma-separated numbers");
        return;
      }
      if (isNaN(targetNum)) {
        setError("Invalid target! Please enter a valid number");
        return;
      }
      setError("");

      setArray(parsedArray);
      setCurrentStepIndex(0);
      setExplanation("Starting Binary Search...");

      const backendSteps = await fetchBinarySearchSteps(parsedArray, target);
      setSteps(backendSteps);
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
    setArray([]);
    setCurrentStepIndex(0);
    setExplanation("");
    setError("");
  };

  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length) return;

    timerRef.current = setTimeout(() => {
      const step = steps[currentStepIndex];
      setArray(step.arr);
      setExplanation(generateExplanation(step));
      setCurrentStepIndex((prev) => prev + 1);
    }, 1500);

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIndex, steps]);

  const currentStep = steps[currentStepIndex - 1] || {};
  const { left = -1, right = -1, mid = -1, found = false } = currentStep;

  const generateExplanation = (step) => {
    if (step.found) {
      return `Found ${target} at index ${step.mid}!`;
    }

    const midValue = step.arr[step.mid];
    if (parseInt(target) < midValue) {
      return `${target} < ${midValue}, searching left half [${step.left}...${step.mid - 1}]`;
    } else {
      return `${target} > ${midValue}, searching right half [${step.mid + 1}...${step.right}]`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Binary Search Visualization
      </h1>

      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">About Binary Search</h2>
        <p className="text-gray-300 text-sm">
          Binary Search efficiently finds a target value in a sorted array by repeatedly dividing the search interval in half.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          ⏱ O(log n) Time | 🧠 O(1) Space
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-6 flex-wrap items-start">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Demo Array: 2,5,8,12,16,23,38,45,56,67,78 | Target: 23</label>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isPlaying}
              placeholder="Sorted array: 1,3,5,7,9"
              className="px-4 py-2 rounded bg-gray-800 border border-gray-600 w-64"
            />
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              disabled={isPlaying}
              placeholder="Target: 7"
              className="px-4 py-2 rounded bg-gray-800 border border-gray-600 w-32"
            />
          </div>
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

      <div className="max-w-4xl mx-auto bg-gray-800 p-4 rounded mb-6 text-center">
        <p className="text-lg text-blue-300 font-medium">
          {explanation || "Click Play to start the visualization"}
        </p>
      </div>

      <div className="flex justify-center items-center gap-4 bg-gray-800 p-8 rounded max-w-5xl mx-auto">
        {array.map((value, index) => {
          let bgColor = "bg-blue-500";
          let scale = "scale-100";
          let shadow = "";

          if (index === mid && found) {
            bgColor = "bg-green-500";
            scale = "scale-125";
            shadow = "shadow-2xl shadow-green-500/80";
          } else if (index === mid) {
            bgColor = "bg-yellow-400";
            scale = "scale-125";
            shadow = "shadow-2xl shadow-yellow-400/80";
          } else if (index >= left && index <= right) {
            bgColor = "bg-purple-500";
            scale = "scale-105";
          } else {
            bgColor = "bg-gray-600";
            scale = "scale-95";
          }

          return (
            <div
              key={index}
              className={`
                w-16 h-16 flex items-center justify-center
                text-xl font-bold text-black rounded
                transition-all duration-500
                ${bgColor} ${scale} ${shadow}
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

export default BinarySearchPage;
