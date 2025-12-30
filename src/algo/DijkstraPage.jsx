import React, { useState, useEffect, useRef } from "react";

const DijkstraPage = () => {
  /* ================= GRAPH INPUT ================= */
  const [nodes, setNodes] = useState([
    { node: "A", neighbors: "B:4,C:2" },
    { node: "B", neighbors: "A:4,C:1,D:5" },
    { node: "C", neighbors: "A:2,B:1,D:8" },
    { node: "D", neighbors: "B:5,C:8" },
  ]);

  const [start, setStart] = useState("A");
  const [end, setEnd] = useState("D");

  /* ================= DIJKSTRA STATE ================= */
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");

  const timerRef = useRef(null);

  /* ================= BUILD ADJ LIST (WEIGHTED) ================= */
  const buildAdjList = () => {
    const adj = {};

    for (let item of nodes) {
      const u = item.node.trim();
      if (!u) continue;

      adj[u] = {};

      item.neighbors
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean)
        .forEach((pair) => {
          const [v, w] = pair.split(":");
          if (v && !isNaN(Number(w))) {
            adj[u][v.trim()] = Number(w);
          }
        });
    }

    return adj;
  };

  /* ================= FETCH DIJKSTRA ================= */
  const fetchDijkstraSteps = async (adjList, start, end) => {
    const res = await fetch(
      "http://localhost:3000/shortestpathrouter/dijkstrasalgo",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adj: adjList, start, end }),
      }
    );

    const data = await res.json();
    return data.arr;
  };

  /* ================= PLAY ================= */
  const handlePlay = async () => {
    if (isPlaying) return;

    try {
      const adjList = buildAdjList();

      if (!adjList[start] || !adjList[end]) {
        setError("Start or end node does not exist.");
        return;
      }

      // Validate neighbors
      for (let u in adjList) {
        for (let v in adjList[u]) {
          if (!adjList[v]) {
            setError(`Neighbor "${v}" is not defined as a node.`);
            return;
          }
        }
      }

      setError("");
      setSteps([]);
      setCurrentStepIndex(0);

      const dijkstraSteps = await fetchDijkstraSteps(
        adjList,
        start,
        end
      );

      setSteps(dijkstraSteps);
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
      setCurrentStepIndex((i) => i + 1);
    }, 1800);

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIndex, steps]);

  const step = steps[currentStepIndex - 1] || {};

  /* ================= GRAPH LAYOUT ================= */
  const adjList = buildAdjList();
  const nodeKeys = Object.keys(adjList);

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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Dijkstra’s Algorithm
      </h1>

      {/* ================= INFO ================= */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded mb-6">
        <p className="text-gray-300 text-sm">
          Dijkstra’s algorithm finds the shortest path from a source node to all
          other nodes in a weighted graph with non-negative weights.
        </p>
      </div>

      {/* ================= INPUT ================= */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Graph Input (Weighted Adjacency List)
        </h2>

        {nodes.map((item, idx) => (
          <div key={idx} className="flex gap-3 mb-2 items-center">
            <input
              value={item.node}
              disabled={isPlaying}
              onChange={(e) => {
                const copy = [...nodes];
                copy[idx].node = e.target.value;
                setNodes(copy);
              }}
              placeholder="Node"
              className="px-3 py-2 bg-gray-700 rounded w-24"
            />

            <input
              value={item.neighbors}
              disabled={isPlaying}
              onChange={(e) => {
                const copy = [...nodes];
                copy[idx].neighbors = e.target.value;
                setNodes(copy);
              }}
              placeholder="B:4, C:2"
              className="px-3 py-2 bg-gray-700 rounded flex-1"
            />

            <button
              disabled={isPlaying}
              onClick={() => {
                const nodeToDelete = nodes[idx].node;
                let updated = nodes.filter((_, i) => i !== idx);
                updated = updated.map((item) => ({
                  ...item,
                  neighbors: item.neighbors
                    .split(",")
                    .map((x) => x.trim())
                    .filter((x) => x && !x.startsWith(nodeToDelete + ":"))
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
            setNodes([...nodes, { node: "", neighbors: "" }])
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
          onChange={(e) => setStart(e.target.value)}
          placeholder="Start"
          className="px-4 py-2 bg-gray-800 rounded w-24"
        />
        <input
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          placeholder="End"
          className="px-4 py-2 bg-gray-800 rounded w-24"
        />
      </div>

      {/* ================= CONTROLS ================= */}
      <div className="flex justify-center gap-4 mb-6">
        <button onClick={handlePlay} className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 font-semibold hover:scale-105 transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
          Play
        </button>
        <button onClick={handlePause} className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 font-semibold hover:scale-105 transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4zM13 4a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2h-2a2 2 0 01-2-2V4z" />
          </svg>
          Pause
        </button>
        <button onClick={handleReplay} className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 font-semibold hover:scale-105 transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Replay
        </button>
      </div>

      {error && <p className="text-center text-red-400 mb-4">{error}</p>}

      {/* ================= GRAPH ================= */}
      <div className="flex justify-center mb-6">
        <svg width="560" height="480" className="bg-gray-800 rounded">
          {/* Edges */}
          {nodeKeys.map((u) =>
            Object.entries(adjList[u]).map(([v, w], i) => {
              if (!positions[u] || !positions[v]) return null;

              return (
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
              );
            })
          )}

          {/* Nodes */}
          {nodeKeys.map((node) => {
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

      {/* ================= DISTANCES ================= */}
      {step.distances && (
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded">
          <h3 className="text-lg font-semibold mb-3 text-center">
            Current Distances
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(step.distances).map(([node, d]) => (
              <div
                key={node}
                className="p-3 bg-blue-500 text-black rounded text-center"
              >
                <div className="font-bold">{node}</div>
                <div>{d === Infinity ? "∞" : d}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DijkstraPage;
