import { useMemo, useState } from "react";
import { Mountain, Plus } from "lucide-react";
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
  "function dfs(graph, start, target) {",
  "  const stack = [start];",
  "  const visited = new Set();",
  "  while (stack.length > 0) {",
  "    const node = stack.pop();",
  "    if (visited.has(node)) continue;",
  "    visited.add(node);",
  "    if (node === target) return node;",
  "    for (const neighbor of graph[node]) {",
  "      if (!visited.has(neighbor))",
  "        stack.push(neighbor);",
  "    }",
  "  }",
  "  return null;",
  "}",
];

const fetchSteps = async (adjList, root, num) => {
  const res = await fetch("http://localhost:3000/graphalgo/depthfirstsearch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adjList, root, num }),
  });
  return await res.json();
};

const DFSPage = () => {
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

  const visited = new Set(player.steps.slice(0, index + 1).map((s) => String(s.current)));
  const currentNode = step?.current != null ? String(step.current) : null;
  const found = step?.found ?? false;
  const explain = step
    ? (found ? `🎯 Target ${target} found` : `Visiting node ${step.current}`)
    : "";
  const highlightedLine = step ? (found ? 7 : step.current !== undefined ? 4 : 13) : null;

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Mountain}
        title="Depth-First Search"
        description="Explore as far as possible along each branch before backtracking, using a stack."
        complexity={{ time: "O(V + E)", space: "O(V)" , timeReason: "DFS marks each vertex visited exactly once (V work) and from each vertex follows every outgoing edge once (E work). The total is V + E — independent of how the graph is shaped.", spaceReason: "The recursion call stack can reach depth V on a long path graph, and the visited set stores up to V flags. Both scale linearly with the number of vertices." }}
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
          <CodeViewer code={CODE} highlightedLine={highlightedLine} title="dfs.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="dfs" />
      <LeetCodeSection slug="dfs" />
    </AlgoPageShell>
  );
};

export default DFSPage;
