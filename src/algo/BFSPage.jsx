import React, { useState, useEffect, useRef } from "react";

const BFSPage = () => {
  const [nodes, setNodes] = useState([
    { node: "0", neighbors: "1,2" },
    { node: "1", neighbors: "0,3,4" },
    { node: "2", neighbors: "0,5" },
    { node: "3", neighbors: "1" },
    { node: "4", neighbors: "1" },
    { node: "5", neighbors: "2" },
  ]);

  const [root, setRoot] = useState("0");
  const [target, setTarget] = useState("5");

  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visited, setVisited] = useState(new Set());
  const [error, setError] = useState("");

  const timerRef = useRef(null);

  const buildAdjList = () => {
    const adj = {};
    for (let item of nodes) {
      const node = item.node.trim();
      if (!node) continue;

      adj[node] = item.neighbors
        .split(",")
        .map((n) => n.trim())
        .filter(Boolean);
    }
    return adj;
  };

  const fetchBFSSteps = async (adjList, root, target) => {
    const res = await fetch(
      "http://localhost:3000/graphalgo/breadthfirstsearch",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adjList,
          root,
          num: target,
        }),
      }
    );

    const data = await res.json();
    return data.arr;
  };

  const handlePlay = async () => {
    if (isPlaying) return;

    try {
      const adjList = buildAdjList();

      if (!adjList[root]) {
        setError(`Root node "${root}" does not exist.`);
        return;
      }

      for (let u in adjList) {
        for (let v of adjList[u]) {
          if (!adjList[v]) {
            setError(`Neighbor "${v}" is not defined as a node.`);
            return;
          }
        }
      }

      setError("");
      setVisited(new Set());
      setCurrentStepIndex(0);

      const bfsSteps = await fetchBFSSteps(adjList, root, target);
      setSteps(bfsSteps);
      setIsPlaying(true);
    } catch {
      setError("Invalid graph input.");
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
  };

  const handleReplay = () => {
    clearTimeout(timerRef.current);
    setIsPlaying(false);
    setSteps([]);
    setVisited(new Set());
    setCurrentStepIndex(0);
  };

  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length) return;

    timerRef.current = setTimeout(() => {
      const step = steps[currentStepIndex];
      setVisited((prev) => new Set(prev).add(step.num));
      setCurrentStepIndex((i) => i + 1);
    }, 1800);
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIndex, steps]);

  const step = steps[currentStepIndex - 1] || {};
  const { num: currentNode, queue = [], found = false } = step;

  const adjList = buildAdjList();
  const nodeKeys = Object.keys(adjList);

  const radius = 160;
  const cx = 260;
  const cy = 220;

  const positions = {};
  nodeKeys.forEach((node, i) => {
    const angle = (2 * Math.PI * i) / nodeKeys.length;
    positions[node] = {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-25">
<h1 className="text-3xl font-bold text-center mb-2">
  Breadth-First Search (BFS)
</h1>

<p className="text-center text-gray-400 max-w-3xl mx-auto mb-4">
  Breadth-First Search is a graph traversal algorithm that explores nodes level
  by level, starting from a given source node. It visits all immediate neighbors
  before moving deeper, using a queue to manage the traversal order.
</p>

<div className="max-w-3xl mx-auto bg-gray-800 rounded-lg p-4 mb-8">
  <p className="text-gray-300 mb-2">
    <span className="font-semibold text-white">Time Complexity:</span> O(V + E),
    where V is the number of vertices and E is the number of edges.
  </p>
  <p className="text-gray-300">
    <span className="font-semibold text-white">Space Complexity:</span> O(V),
    due to the queue and visited set used during traversal.
  </p>
</div>


      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Graph Input (Adjacency List)
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
              placeholder="Neighbors (comma separated)"
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
                    .map((n) => n.trim())
                    .filter((n) => n && n !== nodeToDelete)
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

      <div className="flex justify-center gap-4 mb-6">
        <input
          value={root}
          onChange={(e) => setRoot(e.target.value)}
          placeholder="Root"
          className="px-4 py-2 bg-gray-800 rounded w-24"
        />
        <input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Target"
          className="px-4 py-2 bg-gray-800 rounded w-24"
        />
      </div>

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

      {error && (
        <p className="text-center text-red-400 mb-4">{error}</p>
      )}

      <div className="flex justify-center mb-6">
        <svg width="520" height="440" className="bg-gray-800 rounded">
          {nodeKeys.map((u) =>
            adjList[u].map((v, i) => {
              if (!positions[u] || !positions[v]) return null;

              return (
                <line
                  key={`${u}-${v}-${i}`}
                  x1={positions[u].x}
                  y1={positions[u].y}
                  x2={positions[v].x}
                  y2={positions[v].y}
                  stroke="#555"
                />
              );
            })
          )}

          {nodeKeys.map((node) => {
            let color = "#3b82f6";

            if (visited.has(node)) color = "#22c55e";
            if (node === currentNode) color = "#facc15";
            if (found && node === target) color = "#ef4444";

            return (
              <g key={node}>
                <circle
                  cx={positions[node].x}
                  cy={positions[node].y}
                  r="18"
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

      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded">
        <p>
          <strong>Current Node:</strong>{" "}
          <span className="text-yellow-400">{currentNode || "-"}</span>
        </p>
        <p>
          <strong>Queue:</strong>{" "}
          {queue.length ? queue.join(" → ") : "Empty"}
        </p>

        {found && (
          <p className="text-green-400 font-semibold mt-2">
            🎯 Target node found!
          </p>
        )}
      </div>
    </div>
  );
};

export default BFSPage;
