import React, { useState, useEffect, useRef } from "react";

const InorderPage = () => {
  /* ================= TREE INPUT ================= */
  const [nodes, setNodes] = useState([
    { node: "1", left: "2", right: "3" },
    { node: "2", left: "4", right: "5" },
    { node: "3", left: "", right: "" },
    { node: "4", left: "", right: "" },
    { node: "5", left: "", right: "" },
  ]);

  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  const timerRef = useRef(null);

  /* ================= BUILD ADJ LIST ================= */
  const buildAdjList = () => {
    const adj = {};
    for (let n of nodes) {
      if (!n.node) continue;
      adj[n.node] = [
        n.left ? n.left : null,
        n.right ? n.right : null,
      ];
    }
    return adj;
  };

  /* ================= FIND ROOT ================= */
  const findRoot = (adj) => {
    const children = new Set();
    for (let key in adj) {
      const [l, r] = adj[key];
      if (l) children.add(l);
      if (r) children.add(r);
    }
    return Object.keys(adj).find((k) => !children.has(k));
  };

  /* ================= FETCH ================= */
  const fetchInorderSteps = async (adj) => {
    const res = await fetch("http://localhost:3000/treealgo/inorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adj }),
    });
    const data = await res.json();
    return data.arr;
  };

  /* ================= PLAY ================= */
  const handlePlay = async () => {
    if (isPlaying) return;

    try {
      const adj = buildAdjList();
      if (Object.keys(adj).length === 0) {
        setError("Tree cannot be empty");
        return;
      }

      setError("");
      setCurrentStepIndex(0);
      setExplanation("Starting Inorder Traversal (Left → Root → Right)");

      const backendSteps = await fetchInorderSteps(adj);
      setSteps(backendSteps);
      setIsPlaying(true);
    } catch {
      setError("Invalid tree structure");
    }
  };

  /* ================= CONTROLS ================= */
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

  /* ================= ANIMATION ================= */
  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length) {
      if (currentStepIndex >= steps.length && steps.length > 0) {
        setExplanation(
          `Traversal complete: [${steps.join(", ")}]`
        );
      }
      return;
    }

    timerRef.current = setTimeout(() => {
      setExplanation(`Visiting node ${steps[currentStepIndex]}`);
      setCurrentStepIndex((prev) => prev + 1);
    }, 1200);

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIndex, steps]);

  /* ================= TREE LAYOUT ================= */
  const adj = buildAdjList();
  const root = findRoot(adj);

  const positions = {};
  const edges = [];

  const buildPositions = (node, x, y, gap) => {
    if (!node || positions[node]) return;

    positions[node] = { x, y };

    const [left, right] = adj[node] || [];

    if (left) {
      edges.push([node, left]);
      buildPositions(left, x - gap, y + 80, gap / 2);
    }

    if (right) {
      edges.push([node, right]);
      buildPositions(right, x + gap, y + 80, gap / 2);
    }
  };

  if (root) buildPositions(root, 400, 60, 160);

  const visitedSet = new Set(steps.slice(0, currentStepIndex));
  const currentNode = steps[currentStepIndex - 1];

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-25">
      <h1 className="text-3xl font-bold text-center mb-2">
        Inorder Traversal (Binary Tree)
      </h1>

      <p className="text-center text-gray-400 max-w-3xl mx-auto mb-4">
        Inorder Traversal is a depth-first traversal technique where nodes are visited
        in the order <span className="text-white">Left → Root → Right</span>.
        When applied to a Binary Search Tree, this traversal returns the nodes in
        sorted (ascending) order.
      </p>

      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg p-4 mb-8">
        <p className="text-gray-300 mb-2">
          <span className="font-semibold text-white">Time Complexity:</span> O(n)
        </p>
        <p className="text-gray-300">
          <span className="font-semibold text-white">Space Complexity:</span> O(h),
          where h is the height of the tree (O(log n) for balanced trees, O(n) in the
          worst case).
        </p>
      </div>


      {/* INPUT */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded mb-6">
        <h3 className="text-lg font-semibold mb-4">Tree Input</h3>

        {nodes.map((n, idx) => (
          <div key={idx} className="flex gap-3 mb-2 items-center">
            <input
              value={n.node}
              disabled={isPlaying}
              onChange={(e) => {
                const copy = [...nodes];
                copy[idx].node = e.target.value;
                setNodes(copy);
              }}
              placeholder="Node"
              className="px-3 py-2 bg-gray-700 rounded w-20"
            />
            <input
              value={n.left}
              disabled={isPlaying}
              onChange={(e) => {
                const copy = [...nodes];
                copy[idx].left = e.target.value;
                setNodes(copy);
              }}
              placeholder="Left"
              className="px-3 py-2 bg-gray-700 rounded w-20"
            />
            <input
              value={n.right}
              disabled={isPlaying}
              onChange={(e) => {
                const copy = [...nodes];
                copy[idx].right = e.target.value;
                setNodes(copy);
              }}
              placeholder="Right"
              className="px-3 py-2 bg-gray-700 rounded w-20"
            />
            <button
              disabled={isPlaying}
              onClick={() => {
                const del = nodes[idx].node;
                let updated = nodes.filter((_, i) => i !== idx);
                updated = updated.map((x) => ({
                  ...x,
                  left: x.left === del ? "" : x.left,
                  right: x.right === del ? "" : x.right,
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
            setNodes([...nodes, { node: "", left: "", right: "" }])
          }
          className="mt-3 px-4 py-2 bg-blue-600 rounded"
        >
          + Add Node
        </button>

        {error && <p className="text-red-400 mt-3">{error}</p>}
      </div>

      {/* CONTROLS */}
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

      {/* EXPLANATION */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-4 rounded mb-6 text-center">
        <p className="text-blue-300 font-medium">
          {explanation || "Click Play to start"}
        </p>
      </div>

      {/* TREE SVG */}
      <div className="flex justify-center">
        <svg width="800" height="400" className="bg-gray-800 rounded">
          {/* Edges */}
          {edges.map(([u, v], i) => (
            <line
              key={i}
              x1={positions[u].x}
              y1={positions[u].y}
              x2={positions[v].x}
              y2={positions[v].y}
              stroke="#555"
            />
          ))}

          {/* Nodes */}
          {Object.entries(positions).map(([node, pos]) => {
            let color = "#3b82f6";
            if (visitedSet.has(node)) color = "#22c55e";
            if (node === currentNode) color = "#facc15";

            return (
              <g key={node}>
                <circle cx={pos.x} cy={pos.y} r="18" fill={color} />
                <text
                  x={pos.x}
                  y={pos.y + 5}
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

export default InorderPage;
