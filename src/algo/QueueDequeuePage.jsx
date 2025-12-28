import React, { useState, useEffect, useRef } from "react";

const QueueDequeuePage = () => {
  const [initialQueue, setInitialQueue] = useState("10,20,30,40,50");
  const [dequeueCount, setDequeueCount] = useState("2");
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  const timerRef = useRef(null);

  const fetchDequeueSteps = async (queue, count) => {
    const res = await fetch("http://localhost:3000/queuealgo/dequeue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ queue, dequeue: Array(count).fill(0) }),
    });

    const data = await res.json();
    return data.steps;
  };

  const handlePlay = async () => {
    if (isPlaying) return;

    if (steps.length === 0) {
      const queue = initialQueue.split(",").map((n) => Number(n.trim())).filter((n) => !isNaN(n));
      const count = parseInt(dequeueCount);
      
      if (queue.length === 0) {
        setError("Invalid initial queue! Please enter comma-separated numbers");
        return;
      }
      setError("");
      
      setCurrentStepIndex(0);
      setExplanation("Starting Queue Dequeue operations...");

      const backendSteps = await fetchDequeueSteps(queue, count);
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
    if (step.action === "dequeue-start") {
      return `Dequeuing ${step.pointer.current} from the front of the queue...`;
    }
    if (step.action === "dequeue-complete") {
      return `Successfully dequeued from the queue!`;
    }
    return "Queue operation in progress...";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Queue Dequeue Visualization
      </h1>

      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">About Queue Dequeue</h2>
        <p className="text-gray-300 text-sm">
          Dequeue operation removes an element from the front of the queue (FIFO - First In First Out).
        </p>
        <p className="text-gray-400 text-sm mt-2">
          ⏱ O(1) Time | 🧠 O(1) Space
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-6 flex-wrap items-start">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Demo: 10,20,30,40,50</label>
          <input
            value={initialQueue}
            onChange={(e) => setInitialQueue(e.target.value)}
            disabled={isPlaying}
            placeholder="e.g., 10,20,30,40,50"
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
        <h3 className="text-xl font-semibold mb-4 text-center">Queue (Front → Rear):</h3>
        <div className="flex items-center justify-center gap-2">
          {currentStep.list && currentStep.list.map((value, idx) => {
            let bgColor = "bg-blue-500";
            let scale = "scale-100";
            let shadow = "";
            
            if (currentStep.highlight && currentStep.highlight.includes(value)) {
              if (currentStep.action === "dequeue-start") {
                bgColor = "bg-red-400";
                scale = "scale-125";
                shadow = "shadow-2xl shadow-red-500/80";
              } else {
                bgColor = "bg-yellow-400";
                scale = "scale-125";
                shadow = "shadow-2xl shadow-yellow-400/80";
              }
            }

            return (
              <div
                key={idx}
                className={`
                  w-20 h-16 flex items-center justify-center
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
        {currentStep.list && currentStep.list.length > 0 && (
          <div className="flex justify-between mt-4 text-gray-400 text-sm px-4">
            <span>← Front</span>
            <span>Rear →</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueueDequeuePage;
