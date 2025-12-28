import React, { useState, useEffect, useRef } from "react";

const DoublyReversalPage = () => {
  const [initialList, setInitialList] = useState("10,20,30,40,50");
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  const timerRef = useRef(null);

  const fetchReversalSteps = async (arr) => {
    const res = await fetch("http://localhost:3000/linkedlist/doublyreversal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ arr }),
    });

    const data = await res.json();
    return data.steps;
  };

  const handlePlay = async () => {
    if (isPlaying) return;

    if (steps.length === 0) {
      const arr = initialList.split(",").map((n) => Number(n.trim())).filter((n) => !isNaN(n));
      
      if (arr.length === 0) {
        setError('Please enter valid numbers (e.g., 10,20,30)');
        return;
      }
      
      setError("");
      setCurrentStepIndex(0);
      setExplanation("Starting Doubly Linked List Reversal...");

      const backendSteps = await fetchReversalSteps(arr);
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
    setCurrentStepIndex(0);
    setExplanation("");
    setError("");
  };

  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length) return;

    timerRef.current = setTimeout(() => {
      const step = steps[currentStepIndex];
      setExplanation(generateExplanation(step));
      setCurrentStepIndex((prev) => prev + 1);
    }, 1500);

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIndex, steps]);

  const currentStep = steps[currentStepIndex - 1] || {};

  const generateExplanation = (step) => {
    if (step.current) {
      return `Swapping prev and next pointers. Current node: ${step.current}`;
    }
    return "Reversal complete!";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Doubly Linked List - Reversal Visualization
      </h1>

      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">About Doubly Linked List Reversal</h2>
        <p className="text-gray-300 text-sm">
          Reversal involves swapping prev and next pointers for each node in the doubly linked list.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          ⏱ O(n) Time | 🧠 O(1) Space
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-6 flex-wrap items-start">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Demo: 10,20,30,40,50</label>
          <input
            value={initialList}
            onChange={(e) => setInitialList(e.target.value)}
            disabled={isPlaying}
            placeholder="Initial list (e.g., 10,20,30,40,50)"
            className="px-4 py-2 rounded bg-gray-800 border border-gray-600 w-64"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button onClick={handlePlay} disabled={isPlaying} className="bg-green-600 px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed">
          ▶ Play
        </button>

        <button onClick={handlePause} disabled={!isPlaying} className="bg-yellow-500 px-6 py-2 rounded hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed">
          ⏸ Pause
        </button>

        <button onClick={handleReplay} disabled={isPlaying} className="bg-red-600 px-6 py-2 rounded hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed">
          🔁 Replay
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-gray-800 p-4 rounded mb-6 text-center">
        <p className="text-lg text-blue-300 font-medium">
          {explanation || "Click Play to start the visualization"}
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">Doubly Linked List:</h3>
        <div className="flex items-center justify-center gap-2">
          {currentStep.list && currentStep.list.map((value, idx) => {
            let bgColor = "bg-blue-500";
            let scale = "scale-100";
            let shadow = "";
            
            if (currentStep.current === value) {
              bgColor = "bg-yellow-400";
              scale = "scale-125";
              shadow = "shadow-2xl shadow-yellow-400/80";
            } else if (currentStep.prev === value) {
              bgColor = "bg-purple-500";
              scale = "scale-110";
              shadow = "shadow-lg shadow-purple-500/50";
            }

            return (
              <React.Fragment key={idx}>
                <div
                  className={`
                    w-20 h-16 flex items-center justify-center
                    text-xl font-bold text-black rounded
                    transition-all duration-500
                    ${bgColor} ${scale} ${shadow}
                  `}
                >
                  {value}
                </div>
                {idx < currentStep.list.length - 1 && (
                  <div className="text-2xl text-gray-400">⇄</div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DoublyReversalPage;
