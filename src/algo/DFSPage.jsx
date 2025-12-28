import React, { useState, useEffect, useRef } from "react";

const DFSPage = () => {
  const [adjListInput, setAdjListInput] = useState('{"0":["1","2"],"1":["0","3","4"],"2":["0","5"],"3":["1"],"4":["1"],"5":["2"]}');
  const [root, setRoot] = useState("0");
  const [target, setTarget] = useState("5");
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  const timerRef = useRef(null);

  const fetchDFSSteps = async (adjList, root, target) => {
    const res = await fetch("http://localhost:3000/graphalgo/dfs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adjList, root, num: target }),
    });

    const data = await res.json();
    return data.arr;
  };

  const handlePlay = async () => {
    if (isPlaying) return;

    if (steps.length === 0) {
      try {
        const adjList = JSON.parse(adjListInput);
        if (!adjList || typeof adjList !== 'object') {
          setError('Invalid adjacency list! Please enter valid JSON format');
          return;
        }
        if (!adjList[root]) {
          setError(`Root node "${root}" not found in adjacency list!`);
          return;
        }
        setError("");
        setCurrentStepIndex(0);
        setExplanation("Starting DFS Traversal...");

        const backendSteps = await fetchDFSSteps(adjList, root, target);
        setSteps(backendSteps);
      } catch (e) {
        setError('Invalid JSON format! Example: {"0":["1","2"],"1":["0","3"],"2":["0"],"3":["1"]}');
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
    if (step.found) {
      return `Found target node ${step.current}!`;
    }

    return `Visiting node ${step.current}, exploring neighbors: [${step.neighbours.join(", ")}]. Stack: [${step.stack.join(", ")}]`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Depth-First Search (DFS) Visualization
      </h1>

      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">About DFS</h2>
        <p className="text-gray-300 text-sm">
          DFS explores a graph by going as deep as possible along each branch before backtracking.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          ⏱ O(V + E) Time | 🧠 O(V) Space
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-6 flex-wrap items-start">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Demo Graph: {'{"0":["1","2"],"1":["0","3","4"],"2":["0","5"],"3":["1"],"4":["1"],"5":["2"]}'} | Root: 0 | Target: 5</label>
          <div className="flex gap-2 flex-wrap">
            <input
              value={adjListInput}
              onChange={(e) => setAdjListInput(e.target.value)}
              disabled={isPlaying}
              placeholder='{"0":["1","2"]}'
              className="px-4 py-2 rounded bg-gray-800 border border-gray-600 w-96"
            />
            <input
              value={root}
              onChange={(e) => setRoot(e.target.value)}
              disabled={isPlaying}
              placeholder="Root node"
              className="px-4 py-2 rounded bg-gray-800 border border-gray-600 w-24"
            />
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              disabled={isPlaying}
              placeholder="Target"
              className="px-4 py-2 rounded bg-gray-800 border border-gray-600 w-24"
            />
          </div>
          {error && <p className="text-red-500 text-sm max-w-2xl">{error}</p>}
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
        <div className="grid grid-cols-6 gap-4">
          {steps.length > 0 && (
            <>
              {Object.keys(JSON.parse(adjListInput)).map((node, idx) => {
                let bgColor = "bg-blue-500";
                let scale = "scale-100";
                let shadow = "";

                if (currentStep.current === node && currentStep.found) {
                  bgColor = "bg-green-500";
                  scale = "scale-125";
                  shadow = "shadow-2xl shadow-green-500/80";
                } else if (currentStep.current === node) {
                  bgColor = "bg-yellow-400";
                  scale = "scale-125";
                  shadow = "shadow-2xl shadow-yellow-400/80";
                } else if (currentStep.stack && currentStep.stack.includes(node)) {
                  bgColor = "bg-purple-500";
                  scale = "scale-110";
                  shadow = "shadow-lg shadow-purple-500/50";
                }

                return (
                  <div
                    key={idx}
                    className={`
                      w-16 h-16 flex items-center justify-center
                      text-xl font-bold text-black rounded-full
                      transition-all duration-500
                      ${bgColor} ${scale} ${shadow}
                    `}
                  >
                    {node}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DFSPage;
