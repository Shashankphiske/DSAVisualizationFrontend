import React, { useState, useEffect, useRef } from "react";

const InorderPage = () => {
  const [adjInput, setAdjInput] = useState('{"1":["2","3"],"2":["4","5"],"3":[null,null],"4":[null,null],"5":[null,null]}');
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  const timerRef = useRef(null);

  const fetchInorderSteps = async (adj) => {
    const res = await fetch("http://localhost:3000/treealgo/inorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adj }),
    });

    const data = await res.json();
    return data.arr;
  };

  const handlePlay = async () => {
    if (isPlaying) return;

    if (steps.length === 0) {
      try {
        const adj = JSON.parse(adjInput);
        if (!adj || typeof adj !== 'object') {
          setError('Invalid input! Please enter valid JSON format (see demo above)');
          return;
        }
        setError("");
        setCurrentStepIndex(0);
        setExplanation("Starting Inorder Traversal (Left → Root → Right)...");

        const backendSteps = await fetchInorderSteps(adj);
        setSteps(backendSteps);
      } catch (e) {
        setError('Invalid JSON format! Example: {"1":["2","3"],"2":["4","5"],"3":[null,null],"4":[null,null],"5":[null,null]}');
        return;
      }
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
    if (!isPlaying || currentStepIndex >= steps.length) {
      if (currentStepIndex >= steps.length && steps.length > 0) {
        setExplanation(`Inorder traversal complete! Result: [${steps.join(", ")}]`);
      }
      return;
    }

    timerRef.current = setTimeout(() => {
      const node = steps[currentStepIndex];
      setExplanation(`Visiting node: ${node}`);
      setCurrentStepIndex((prev) => prev + 1);
    }, 1000);

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIndex, steps]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Inorder Traversal Visualization
      </h1>

      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">About Inorder Traversal</h2>
        <p className="text-gray-300 text-sm">
          Inorder traversal visits nodes in Left → Root → Right order. For BST, it gives sorted output.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          ⏱ O(n) Time | 🧠 O(h) Space
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-6 flex-wrap items-start">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Demo: {'{"1":["2","3"],"2":["4","5"],"3":[null,null],"4":[null,null],"5":[null,null]}'}</label>
          <input
            value={adjInput}
            onChange={(e) => setAdjInput(e.target.value)}
            disabled={isPlaying}
            placeholder='{"1":["2","3"]}'
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

      <div className="max-w-4xl mx-auto bg-gray-800 p-4 rounded mb-6 text-center">
        <p className="text-lg text-blue-300 font-medium">
          {explanation || "Click Play to start the visualization"}
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded">
        <h3 className="text-xl font-semibold mb-6 text-center">Binary Tree - Inorder Traversal (Left → Root → Right)</h3>
        
        {/* Tree Visualization */}
        <div className="relative mb-12" style={{ height: "400px" }}>
          <svg className="absolute w-full h-full" style={{ zIndex: 0 }}>
            {/* Tree edges */}
            {/* Level 0 to Level 1 */}
            <line x1="50%" y1="50" x2="25%" y2="150" stroke="#555" strokeWidth="2" />
            <line x1="50%" y1="50" x2="75%" y2="150" stroke="#555" strokeWidth="2" />
            {/* Level 1 to Level 2 (left subtree) */}
            <line x1="25%" y1="150" x2="12.5%" y2="250" stroke="#555" strokeWidth="2" />
            <line x1="25%" y1="150" x2="37.5%" y2="250" stroke="#555" strokeWidth="2" />
            {/* Level 1 to Level 2 (right subtree) */}
            <line x1="75%" y1="150" x2="62.5%" y2="250" stroke="#555" strokeWidth="2" />
            <line x1="75%" y1="150" x2="87.5%" y2="250" stroke="#555" strokeWidth="2" />
          </svg>

          {/* Tree nodes positioned in levels */}
          {steps.length > 0 && (
            <>
              {/* Root (center) */}
              {steps[3] !== undefined && (
                <div
                  className={`absolute w-16 h-16 flex items-center justify-center text-xl font-bold rounded-full transition-all duration-500 ${
                    currentStepIndex > 3 ? "bg-green-500 scale-100" : currentStepIndex === 3 ? "bg-yellow-400 scale-125 shadow-2xl shadow-yellow-400/80" : "bg-blue-500"
                  }`}
                  style={{ left: "calc(50% - 32px)", top: "30px" }}
                >
                  {steps[3]}
                </div>
              )}
              
              {/* Level 1 - Left child */}
              {steps[1] !== undefined && (
                <div
                  className={`absolute w-16 h-16 flex items-center justify-center text-xl font-bold rounded-full transition-all duration-500 ${
                    currentStepIndex > 1 ? "bg-green-500 scale-100" : currentStepIndex === 1 ? "bg-yellow-400 scale-125 shadow-2xl shadow-yellow-400/80" : "bg-blue-500"
                  }`}
                  style={{ left: "calc(25% - 32px)", top: "130px" }}
                >
                  {steps[1]}
                </div>
              )}
              
              {/* Level 1 - Right child */}
              {steps[5] !== undefined && (
                <div
                  className={`absolute w-16 h-16 flex items-center justify-center text-xl font-bold rounded-full transition-all duration-500 ${
                    currentStepIndex > 5 ? "bg-green-500 scale-100" : currentStepIndex === 5 ? "bg-yellow-400 scale-125 shadow-2xl shadow-yellow-400/80" : "bg-blue-500"
                  }`}
                  style={{ left: "calc(75% - 32px)", top: "130px" }}
                >
                  {steps[5]}
                </div>
              )}

              {/* Level 2 - Leftmost */}
              {steps[0] !== undefined && (
                <div
                  className={`absolute w-16 h-16 flex items-center justify-center text-xl font-bold rounded-full transition-all duration-500 ${
                    currentStepIndex > 0 ? "bg-green-500 scale-100" : currentStepIndex === 0 ? "bg-yellow-400 scale-125 shadow-2xl shadow-yellow-400/80" : "bg-blue-500"
                  }`}
                  style={{ left: "calc(12.5% - 32px)", top: "230px" }}
                >
                  {steps[0]}
                </div>
              )}

              {/* Level 2 - Left center */}
              {steps[2] !== undefined && (
                <div
                  className={`absolute w-16 h-16 flex items-center justify-center text-xl font-bold rounded-full transition-all duration-500 ${
                    currentStepIndex > 2 ? "bg-green-500 scale-100" : currentStepIndex === 2 ? "bg-yellow-400 scale-125 shadow-2xl shadow-yellow-400/80" : "bg-blue-500"
                  }`}
                  style={{ left: "calc(37.5% - 32px)", top: "230px" }}
                >
                  {steps[2]}
                </div>
              )}

              {/* Level 2 - Right center */}
              {steps[4] !== undefined && (
                <div
                  className={`absolute w-16 h-16 flex items-center justify-center text-xl font-bold rounded-full transition-all duration-500 ${
                    currentStepIndex > 4 ? "bg-green-500 scale-100" : currentStepIndex === 4 ? "bg-yellow-400 scale-125 shadow-2xl shadow-yellow-400/80" : "bg-blue-500"
                  }`}
                  style={{ left: "calc(62.5% - 32px)", top: "230px" }}
                >
                  {steps[4]}
                </div>
              )}

              {/* Level 2 - Rightmost */}
              {steps[6] !== undefined && (
                <div
                  className={`absolute w-16 h-16 flex items-center justify-center text-xl font-bold rounded-full transition-all duration-500 ${
                    currentStepIndex > 6 ? "bg-green-500 scale-100" : currentStepIndex === 6 ? "bg-yellow-400 scale-125 shadow-2xl shadow-yellow-400/80" : "bg-blue-500"
                  }`}
                  style={{ left: "calc(87.5% - 32px)", top: "230px" }}
                >
                  {steps[6]}
                </div>
              )}
            </>
          )}
        </div>

        {/* Traversal Order Display */}
        <h4 className="text-lg font-semibold mb-4 text-center text-gray-300">Visited Order:</h4>
        <div className="flex justify-center items-center gap-2 flex-wrap">
          {steps.slice(0, currentStepIndex).map((node, idx) => (
            <div key={idx} className="w-12 h-12 flex items-center justify-center text-lg font-bold bg-green-500 text-black rounded-full">
              {node}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InorderPage;
