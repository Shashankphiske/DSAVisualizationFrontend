import { useMemo, useState } from "react";
import { Route, Plus } from "lucide-react";
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
  "function dijkstra(adj, start, end) {",
  "  const dist = {}, visited = new Set();",
  "  const pq = [{ node: start, distance: 0 }];",
  "  while (pq.length > 0) {",
  "    pq.sort((a, b) => a.distance - b.distance);",
  "    const current = pq.shift().node;",
  "    if (visited.has(current)) continue;",
  "    visited.add(current);",
  "    if (current === end) return FOUND;",
  "    for (const [v, w] of adj[current]) {",
  "      const nd = dist[current] + w;",
  "      if (nd < dist[v]) {",
  "        dist[v] = nd;",
  "        pq.push({ node: v, distance: nd });",
  "      }",
  "    }",
  "  }",
  "}",
];

const lineFor = (action) => ({ init: 1, select: 5, check: 9, relax: 11, found: 8 }[action] ?? null);

const fetchSteps = async (adj, start, end) => {
  const res = await fetch("http://localhost:3000/shortestpathrouter/dijkstrasalgo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adj, start, end }),
  });
  return await res.json();
};

const DijkstraPage = () => {
  const [nodes, setNodes] = useState([
    { node: "A", neighbors: "B:4,C:2" },
    { node: "B", neighbors: "A:4,C:1,D:5" },
    { node: "C", neighbors: "A:2,B:1,D:8" },
    { node: "D", neighbors: "B:5,C:8" },
  ]);
  const [start, setStart] = useState("A");
  const [end, setEnd] = useState("D");
  const player = useAlgoPlayer();
  const { step, isPlaying, error, setError } = player;

  const adj = useMemo(() => {
    const a = {};
    for (const item of nodes) {
      const u = item.node.trim();
      if (!u) continue;
      a[u] = {};
      item.neighbors.split(",").map((x) => x.trim()).filter(Boolean).forEach((pair) => {
        const [v, w] = pair.split(":");
        if (v && !isNaN(Number(w))) a[u][v.trim()] = Number(w);
      });
    }
    return a;
  }, [nodes]);

  const handlePlay = async () => {
    if (player.steps.length === 0) {
      if (!adj[start] || !adj[end]) { setError("Start or end node missing"); return; }
      const data = await player.load(() => fetchSteps(adj, start, end));
      if (!data) return;
    }
    player.play();
  };

  const visited = new Set((step?.visited || []).map(String));
  const currentNode = step?.currentNode != null ? String(step.currentNode) : null;
  const found = step?.found ?? false;
  const explain = step?.reason || "";
  const highlightedLine = step ? lineFor(step.action) : null;

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Route}
        title="Dijkstra's Algorithm"
        description="Find the shortest path between two nodes in a weighted graph using a priority queue."
        complexity={{ time: "O((V+E) log V)", space: "O(V)" , timeReason: "Each of the V vertices is extracted from the min-heap once at cost O(log V) → V·log V. For every edge we may push an updated distance, costing O(log V) per push → E·log V. Combined: (V + E)·log V.", spaceReason: "We maintain a distance map of size V, a previous-vertex map of size V, and a priority queue that can hold up to V entries. All three structures scale with the number of vertices." }}
        badge="Shortest Path"
      />

      <section className="card p-5 space-y-3">
        <div className="card-title">Graph input · format <span className="text-[hsl(var(--accent))]">node:weight</span></div>
        {nodes.map((item, idx) => (
          <div key={idx} className="grid grid-cols-[80px_1fr] gap-2">
            <input className="input" value={item.node}      disabled={isPlaying} placeholder="Node"     onChange={(e) => { const c = [...nodes]; c[idx].node = e.target.value; setNodes(c); }} />
            <input className="input" value={item.neighbors} disabled={isPlaying} placeholder="B:4,C:2"  onChange={(e) => { const c = [...nodes]; c[idx].neighbors = e.target.value; setNodes(c); }} />
          </div>
        ))}
        <button className="btn" onClick={() => setNodes([...nodes, { node: "", neighbors: "" }])} disabled={isPlaying}><Plus size={14} /> Add node</button>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div><label className="field-label">Start</label><input className="input" value={start} onChange={(e) => setStart(e.target.value)} disabled={isPlaying} /></div>
          <div><label className="field-label">End</label><input className="input" value={end}   onChange={(e) => setEnd(e.target.value)}   disabled={isPlaying} /></div>
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
            <GraphViz adj={adj} visited={visited} currentNode={currentNode} target={end} found={found} weighted />
          </div>
          <Legend items={[
            { label: "Idle",    color: "hsl(220 30% 19%)" },
            { label: "Visited", color: "hsl(168 100% 42%)" },
            { label: "Current", color: "hsl(38 92% 50%)" },
            { label: "End reached", color: "hsl(0 84% 60%)" },
          ]} />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={highlightedLine} title="dijkstra.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="dijkstra" />
      <LeetCodeSection slug="dijkstra" />
    </AlgoPageShell>
  );
};

export default DijkstraPage;
