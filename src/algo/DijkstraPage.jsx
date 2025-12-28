import React, { useState, useEffect, useRef } from "react";

const DijkstraPage = () => {
  const [adjInput, setAdjInput] = useState('{"A":{"B":4,"C":2},"B":{"A":4,"C":1,"D":5},"C":{"A":2,"B":1,"D":8},"D":{"B":5,"C":8}}');
  const [start, setStart] = useState("A");
  const [end, setEnd] = useState("D");
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  const timerRef = useRef(null);

  const fetchDijkstraSteps = async (adj, start, end) => {
    const res = await fetch("http://localhost:3000/shortestpathrouter/dijkstrasalgo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adj, start, end }),
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
          setError('Invalid graph! Please enter valid JSON format');
          return;
        }
        if (!adj[start]) {
          setError(`Start node "${start}" not found in graph!`);
          return;
        }
        if (!adj[end]) {
          setError(`End node "${end}" not found in graph!`);
          return;
        }
        
        setError("");
        setCurrentStepIndex(0);
        setExplanation("Starting Dijkstra's Algorithm...");

        const backendSteps = await fetchDijkstraSteps(adj, start, end);
        setSteps(backendSteps);
      } catch (e) {
        setError('Invalid JSON format! Example: {"A":{"B":4,"C":2},"B":{"A":4,"D":5}}');
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
    }, 2000);

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIndex, steps]);

  const currentStep = steps[currentStepIndex - 1] || {};

  const generateExplanation = (step) => {
    if (step.found) {
      return `Found shortest path to ${step.currentNode}! Final distances: ${JSON.stringify(step.distances)}`;
    }

    return `Visiting ${step.currentNode}, exploring neighbors: [${step.neighbors?.join(", ")}]. Updated distances: ${JSON.stringify(step.distances)}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Dijkstra's Algorithm Visualization
      </h1>

      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">About Dijkstra's Algorithm</h2>
        <p className="text-gray-300 text-sm">
          Dijkstra's algorithm finds the shortest path between nodes in a weighted graph using a greedy approach.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          ⏱ O((V + E) log V) Time | 🧠 O(V) Space
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-6 flex-wrap items-start">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Demo: {'{"A":{"B":4,"C":2},"B":{"A":4,"C":1,"D":5}}'}</label>
          <input
            value={adjInput}
            onChange={(e) => setAdjInput(e.target.value)}
            disabled={isPlaying}
            placeholder='Graph adjacency list'
            className="px-4 py-2 rounded bg-gray-800 border border-gray-600 w-96"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Start Node</label>
          <input
            value={start}
            onChange={(e) => setStart(e.target.value)}
            disabled={isPlaying}
            placeholder="Start node"
            className="px-4 py-2 rounded bg-gray-800 border border-gray-600 w-24"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">End Node</label>
          <input
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            disabled={isPlaying}
            placeholder="End node"
            className="px-4 py-2 rounded bg-gray-800 border border-gray-600 w-24"
          />
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

      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded">
        <h3 className="text-xl font-semibold mb-4 text-center">Current Distances:</h3>
        <div className="grid grid-cols-4 gap-4">
          {currentStep.distances && Object.keys(currentStep.distances).map((node, idx) => {
            let bgColor = "bg-blue-500";
            let scale = "scale-100";
            let shadow = "";

            if (currentStep.currentNode === node && currentStep.found) {
              bgColor = "bg-green-500";
              scale = "scale-110";
              shadow = "shadow-xl shadow-green-500/50";
            } else if (currentStep.currentNode === node) {
              bgColor = "bg-yellow-400";
              scale = "scale-125";
              shadow = "shadow-2xl shadow-yellow-400/80";
            } else if (currentStep.visited && currentStep.visited.includes(node)) {
              bgColor = "bg-purple-500";
              scale = "scale-105";
              shadow = "shadow-lg shadow-purple-500/50";
            }

            return (
              <div key={idx} className={`p-4 rounded ${bgColor} text-black text-center transition-all duration-500 ${scale} ${shadow}`}>
                <div className="font-bold text-lg">{node}</div>
                <div className="text-sm">
                  {currentStep.distances[node] === Infinity ? "∞" : currentStep.distances[node]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DijkstraPage;
