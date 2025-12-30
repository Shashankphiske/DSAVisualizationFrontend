import React, { useState, useEffect, useRef } from "react";

const DoublyInsertionPage = () => {
  const [initialList, setInitialList] = useState("10,20,30,40");
  const [insertValue, setInsertValue] = useState("25");
  const [insertIndex, setInsertIndex] = useState("2");
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [explanation, setExplanation] = useState("");

  const timerRef = useRef(null);

  const fetchInsertionSteps = async (arr, value, index) => {
    const res = await fetch("http://localhost:3000/linkedlist/doublyinsertion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ arr, value: parseInt(value), index: parseInt(index) }),
    });

    const data = await res.json();
    return data.steps;
  };

  const handlePlay = async () => {
    if (isPlaying) return;

    if (steps.length === 0) {
      const arr = initialList.split(",").map((n) => Number(n.trim())).filter((n) => !isNaN(n));
      
      setCurrentStepIndex(0);
      setExplanation("Starting Doubly Linked List Insertion...");

      const backendSteps = await fetchInsertionSteps(arr, insertValue, insertIndex);
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
      return `Inserting ${step.current} at index ${insertIndex}. Adjusting prev and next pointers...`;
    }
    return "Insertion complete!";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-25">
      <h1 className="text-3xl font-bold text-center mb-6">
        Doubly Linked List - Insertion Visualization
      </h1>

      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">About Doubly Linked List Insertion</h2>
        <p className="text-gray-300 text-sm">
          Insertion in a doubly linked list involves creating a new node and adjusting both prev and next pointers.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          ⏱ O(n) Time | 🧠 O(1) Space
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <input
          value={initialList}
          onChange={(e) => setInitialList(e.target.value)}
          disabled={isPlaying}
          placeholder="Initial list (e.g., 10,20,30,40)"
          className="px-4 py-2 rounded bg-gray-800 border border-gray-600 w-64"
        />

        <input
          value={insertValue}
          onChange={(e) => setInsertValue(e.target.value)}
          disabled={isPlaying}
          placeholder="Value to insert"
          className="px-4 py-2 rounded bg-gray-800 border border-gray-600 w-32"
        />

        <input
          value={insertIndex}
          onChange={(e) => setInsertIndex(e.target.value)}
          disabled={isPlaying}
          placeholder="Index"
          className="px-4 py-2 rounded bg-gray-800 border border-gray-600 w-24"
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

export default DoublyInsertionPage;
