import React, { useState, useEffect, useRef } from "react";

const AStarPage = () => {
  /* ================= GRAPH INPUT ================= */
  const [nodes, setNodes] = useState([
    { node: "A", neighbors: "B:4,C:2", h: 7 },
    { node: "B", neighbors: "A:4,C:1,D:5", h: 6 },
    { node: "C", neighbors: "A:2,B:1,D:8", h: 2 },
    { node: "D", neighbors: "B:5,C:8", h: 0 },
  ]);

  const [start, setStart] = useState("A");
  const [end, setEnd] = useState("D");

  /* ================= A* STATE ================= */
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");

  const timerRef = useRef(null);

  /* ================= BUILD ADJ + HEURISTIC ================= */
  const buildAdjAndHeuristic = () => {
    const adj = {};
    const heuristic = {};

    for (let item of nodes) {
      const u = item.node.trim();
      if (!u) continue;

      heuristic[u] = Number(item.h) || 0;
      adj[u] = {};

      item.neighbors
        .split(",")
        .map(x => x.trim())
        .filter(Boolean)
        .forEach(pair => {
          const [v, w] = pair.split(":");
          if (v && !isNaN(Number(w))) {
            adj[u][v.trim()] = Number(w);
          }
        });
    }

    return { adj, heuristic };
  };

  /* ================= FETCH A* ================= */
  const fetchAStarSteps = async (adj, start, end, heuristic) => {
    const res = await fetch(
      "http://localhost:3000/shortestpathrouter/astaralgo",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adj, start, end, heuristic }),
      }
    );

    const data = await res.json();
    return data.arr;
  };

  /* ================= PLAY ================= */
  const handlePlay = async () => {
    if (isPlaying) return;

    try {
      const { adj, heuristic } = buildAdjAndHeuristic();

      if (!adj[start] || !adj[end]) {
        setError("Start or end node does not exist.");
        return;
      }

      for (let u in adj) {
        for (let v in adj[u]) {
          if (!adj[v]) {
            setError(`Neighbor "${v}" is not defined as a node.`);
            return;
          }
        }
      }

      setError("");
      setSteps([]);
      setCurrentStepIndex(0);

      const astarSteps = await fetchAStarSteps(adj, start, end, heuristic);
      setSteps(astarSteps);
      setIsPlaying(true);
    } catch {
      setError("Invalid graph input.");
    }
  };

  /* ================= PAUSE / REPLAY ================= */
  const handlePause = () => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
  };

  const handleReplay = () => {
    clearTimeout(timerRef.current);
    setIsPlaying(false);
    setSteps([]);
    setCurrentStepIndex(0);
  };

  /* ================= ANIMATION ================= */
  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length) return;

    timerRef.current = setTimeout(() => {
      setCurrentStepIndex(i => i + 1);
    }, 1800);

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIndex, steps]);

  const step = steps[currentStepIndex - 1] || {};

  /* ================= GRAPH LAYOUT ================= */
  const { adj } = buildAdjAndHeuristic();
  const nodeKeys = Object.keys(adj);

  const radius = 170;
  const cx = 280;
  const cy = 240;

  const positions = {};
  nodeKeys.forEach((node, i) => {
    const angle = (2 * Math.PI * i) / nodeKeys.length;
    positions[node] = {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });

  /* ================= EXPLANATION ================= */
  const explanation = step.found
    ? `Target "${end}" reached using A* algorithm`
    : step.currentNode
    ? `Visiting ${step.currentNode}, evaluating neighbors`
    : "Click Play to start";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        A* Algorithm Visualization
      </h1>

      {/* ================= INPUT ================= */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Graph Input (Adjacency List + Heuristic)
        </h2>

        {nodes.map((item, idx) => (
          <div key={idx} className="flex gap-3 mb-2 items-center">
            <input
              value={item.node}
              disabled={isPlaying}
              onChange={e => {
                const copy = [...nodes];
                copy[idx].node = e.target.value;
                setNodes(copy);
              }}
              placeholder="Node"
              className="px-3 py-2 bg-gray-700 rounded w-20"
            />

            <input
              value={item.neighbors}
              disabled={isPlaying}
              onChange={e => {
                const copy = [...nodes];
                copy[idx].neighbors = e.target.value;
                setNodes(copy);
              }}
              placeholder="B:4,C:2"
              className="px-3 py-2 bg-gray-700 rounded flex-1"
            />

            <input
              type="number"
              value={item.h}
              disabled={isPlaying}
              onChange={e => {
                const copy = [...nodes];
                copy[idx].h = e.target.value;
                setNodes(copy);
              }}
              placeholder="h"
              className="px-3 py-2 bg-gray-700 rounded w-20"
            />

            <button
              disabled={isPlaying}
              onClick={() => {
                const nodeToDelete = nodes[idx].node;
                let updated = nodes.filter((_, i) => i !== idx);
                updated = updated.map(item => ({
                  ...item,
                  neighbors: item.neighbors
                    .split(",")
                    .filter(x => !x.startsWith(nodeToDelete + ":"))
                    .join(","),
                }));
                setNodes(updated);
              }}
              className="px-3 py-2 bg-red-600 rounded"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={() =>
            setNodes([...nodes, { node: "", neighbors: "", h: 0 }])
          }
          className="mt-3 px-4 py-2 bg-blue-600 rounded"
        >
          + Add Node
        </button>
      </div>

      {/* ================= START / END ================= */}
      <div className="flex justify-center gap-4 mb-6">
        <input
          value={start}
          onChange={e => setStart(e.target.value)}
          placeholder="Start"
          className="px-4 py-2 bg-gray-800 rounded w-24"
        />
        <input
          value={end}
          onChange={e => setEnd(e.target.value)}
          placeholder="End"
          className="px-4 py-2 bg-gray-800 rounded w-24"
        />
      </div>

      {/* ================= CONTROLS ================= */}
      <div className="flex justify-center gap-4 mb-6">
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

      {error && <p className="text-center text-red-400 mb-4">{error}</p>}

      {/* ================= EXPLANATION ================= */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-4 rounded mb-6 text-center">
        <p className="text-blue-300 font-medium">{explanation}</p>
      </div>

      {/* ================= GRAPH ================= */}
      <div className="flex justify-center mb-6">
        <svg width="560" height="480" className="bg-gray-800 rounded">
          {/* Edges */}
          {nodeKeys.map(u =>
            Object.entries(adj[u]).map(([v, w], i) =>
              positions[u] && positions[v] ? (
                <g key={`${u}-${v}-${i}`}>
                  <line
                    x1={positions[u].x}
                    y1={positions[u].y}
                    x2={positions[v].x}
                    y2={positions[v].y}
                    stroke="#555"
                  />
                  <text
                    x={(positions[u].x + positions[v].x) / 2}
                    y={(positions[u].y + positions[v].y) / 2}
                    fill="#ccc"
                    fontSize="12"
                  >
                    {w}
                  </text>
                </g>
              ) : null
            )
          )}

          {/* Nodes */}
          {nodeKeys.map(node => {
            let color = "#3b82f6";

            if (step.visited && step.visited.includes(node))
              color = "#22c55e";
            if (step.currentNode === node) color = "#facc15";
            if (step.found && node === end) color = "#ef4444";

            return (
              <g key={node}>
                <circle
                  cx={positions[node].x}
                  cy={positions[node].y}
                  r="20"
                  fill={color}
                />
                <text
                  x={positions[node].x}
                  y={positions[node].y + 5}
                  textAnchor="middle"
                  fill="black"
                  fontWeight="bold"
                >
                  {node}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default AStarPage;
