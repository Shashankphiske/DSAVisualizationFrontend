import { useMemo, useState } from "react";
import { Waves, Plus } from "lucide-react";
import CodeViewer from "../CodeViewer";
import { AlgoPageHeader, AlgoPageShell } from "../AlgoPageTemplate";
import ControlBar from "../components/ControlBar";
import ExplanationBox from "../components/ExplanationBox";
import Legend from "../components/Legend";
import GraphViz from "../components/GraphViz";
import useAlgoPlayer from "../hooks/useAlgoPlayer";
import LeetCodeSection from "../components/LeetCodeSection";
import MeasuredComplexity from "../components/MeasuredComplexity";
import VideoEmbed from "../components/VideoEmbed";

const CODE = [
  "function bfs(graph, start, target) {",
  "  const queue = [start];",
  "  const visited = new Set([start]);",
  "  while (queue.length > 0) {",
  "    const node = queue.shift();",
  "    if (node === target) return node;",
  "    for (const neighbor of graph[node]) {",
  "      if (!visited.has(neighbor)) {",
  "        visited.add(neighbor);",
  "        queue.push(neighbor);",
  "      }",
  "    }",
  "  }",
  "  return null;",
  "}",
];

const fetchSteps = async (adjList, root, num) => {
  const res = await fetch("http://localhost:3000/graphalgo/breadthfirstsearch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adjList, root, num }),
  });
  return await res.json();
};

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
  const player = useAlgoPlayer();
  const { step, index, isPlaying, error, setError } = player;

  const adj = useMemo(() => {
    const a = {};
    for (const n of nodes) {
      const k = n.node.trim();
      if (!k) continue;
      a[k] = n.neighbors.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return a;
  }, [nodes]);

  const handlePlay = async () => {
    if (player.steps.length === 0) {
      if (!adj[root]) { setError(`Root "${root}" not defined`); return; }
      const data = await player.load(() => fetchSteps(adj, root, target));
      if (!data) return;
    }
    player.play();
  };

  const visited = new Set(player.steps.slice(0, index + 1).map((s) => String(s.num)));
  const currentNode = step?.num != null ? String(step.num) : null;
  const found = step?.found ?? false;
  const explain = step
    ? (found ? `🎯 Target ${target} found` : `Visiting node ${step.num}`)
    : "";
  const highlightedLine = step ? (found ? 5 : step.num !== undefined ? 4 : 13) : null;

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Waves}
        title="Breadth-First Search"
        description="Explore the graph level by level using a FIFO queue. Finds the shortest path in unweighted graphs."
        complexity={{ time: "O(V + E)", space: "O(V)" , timeReason: "BFS pulls each vertex from the queue exactly once (V dequeues) and from each one it scans all outgoing edges. Across the whole graph that adds up to E edge inspections. Total work is therefore proportional to V + E.", spaceReason: "We keep a visited set and a queue, each of which can grow to hold all V vertices in the worst case (e.g. when the start vertex is connected to everything). Edges are not stored separately, so the dominant term is V." }}
        badge="Graph"
      />

      <section className="card p-5 space-y-3">
        <div className="card-title">Graph input</div>
        {nodes.map((item, idx) => (
          <div key={idx} className="grid grid-cols-[80px_1fr] gap-2">
            <input className="input" value={item.node}      disabled={isPlaying} placeholder="Node"     onChange={(e) => { const c = [...nodes]; c[idx].node = e.target.value; setNodes(c); }} />
            <input className="input" value={item.neighbors} disabled={isPlaying} placeholder="Neighbors" onChange={(e) => { const c = [...nodes]; c[idx].neighbors = e.target.value; setNodes(c); }} />
          </div>
        ))}
        <button className="btn" onClick={() => setNodes([...nodes, { node: "", neighbors: "" }])} disabled={isPlaying}><Plus size={14} /> Add node</button>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div><label className="field-label">Root</label><input className="input" value={root}   onChange={(e) => setRoot(e.target.value)}   disabled={isPlaying} /></div>
          <div><label className="field-label">Target</label><input className="input" value={target} onChange={(e) => setTarget(e.target.value)} disabled={isPlaying} /></div>
        </div>
        {error && <p className="text-xs text-[hsl(var(--accent-4))] font-mono">{error}</p>}
      </section>

      <section className="card p-5 space-y-4">
        <ControlBar player={player} onPlay={handlePlay} />
        <ExplanationBox text={explain} isPlaying={isPlaying} />
      </section>

      <section className="grid lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <div className="card-title mb-4">Visualization</div>
          <div className="min-h-[320px] flex items-center justify-center">
            <GraphViz adj={adj} visited={visited} currentNode={currentNode} target={target} found={found} />
          </div>
          <Legend items={[
            { label: "Idle",    color: "hsl(220 30% 19%)" },
            { label: "Visited", color: "hsl(168 100% 42%)" },
            { label: "Current", color: "hsl(38 92% 50%)" },
            { label: "Target found", color: "hsl(0 84% 60%)" },
          ]} />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={highlightedLine} title="bfs.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="bfs" />
      <LeetCodeSection slug="bfs" />
    </AlgoPageShell>
  );
};

export default BFSPage;
