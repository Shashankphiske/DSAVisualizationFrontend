import { useMemo, useState } from "react";
import { Star, Plus } from "lucide-react";
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
  "function aStar(adj, start, end, h) {",
  "  const g = {}, f = {}, visited = new Set();",
  "  const pq = [{ node: start, f: h[start] }];",
  "  while (pq.length > 0) {",
  "    pq.sort((a, b) => a.f - b.f);",
  "    const current = pq.shift().node;",
  "    if (visited.has(current)) continue;",
  "    visited.add(current);",
  "    if (current === end) return FOUND;",
  "    for (const [v, w] of adj[current]) {",
  "      const tg = g[current] + w;",
  "      if (tg < g[v]) {",
  "        g[v] = tg; f[v] = tg + h[v];",
  "        pq.push({ node: v, f: f[v] });",
  "      }",
  "    }",
  "  }",
  "}",
];

const lineFor = (action) => ({ init: 1, select: 5, check: 9, relax: 11, found: 8 }[action] ?? null);

const fetchSteps = async (adj, start, end, heuristic) => {
  const res = await fetch("http://localhost:3000/shortestpathrouter/astaralgo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adj, start, end, heuristic }),
  });
  return await res.json();
};

const AStarPage = () => {
  const [nodes, setNodes] = useState([
    { node: "A", neighbors: "B:4,C:2", h: 7 },
    { node: "B", neighbors: "A:4,C:1,D:5", h: 6 },
    { node: "C", neighbors: "A:2,B:1,D:8", h: 2 },
    { node: "D", neighbors: "B:5,C:8", h: 0 },
  ]);
  const [start, setStart] = useState("A");
  const [end, setEnd] = useState("D");
  const player = useAlgoPlayer();
  const { step, isPlaying, error, setError } = player;

  const { adj, heuristic } = useMemo(() => {
    const a = {}, h = {};
    for (const item of nodes) {
      const u = item.node.trim();
      if (!u) continue;
      h[u] = Number(item.h) || 0;
      a[u] = {};
      item.neighbors.split(",").map((x) => x.trim()).filter(Boolean).forEach((pair) => {
        const [v, w] = pair.split(":");
        if (v && !isNaN(Number(w))) a[u][v.trim()] = Number(w);
      });
    }
    return { adj: a, heuristic: h };
  }, [nodes]);

  const handlePlay = async () => {
    if (player.steps.length === 0) {
      if (!adj[start] || !adj[end]) { setError("Start or end node missing"); return; }
      const data = await player.load(() => fetchSteps(adj, start, end, heuristic));
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
        icon={Star}
        title="A* Algorithm"
        description="Combine actual cost (g) and heuristic (h) to expand the most promising node first."
        complexity={{ time: "O((V+E) log V)", space: "O(V)" , timeReason: "A* explores nodes in order of f = g + h using a min-heap. Like Dijkstra, each vertex is extracted once and each edge can trigger one heap update, both at log V cost — yielding (V + E)·log V. A good heuristic prunes large parts of the search but doesn't change the worst-case bound.", spaceReason: "We track the open set (priority queue), the closed set, plus g-score and came-from maps. Each can hold up to V entries, so memory grows linearly with the number of reachable nodes." }}
        badge="Shortest Path"
      />

      <section className="card p-5 space-y-3">
        <div className="card-title">Graph + heuristic</div>
        <div className="grid grid-cols-[80px_1fr_80px] gap-2 text-[10px] font-mono uppercase tracking-widest text-[hsl(var(--text-2))]">
          <span>Node</span><span>Neighbors</span><span>h</span>
        </div>
        {nodes.map((item, idx) => (
          <div key={idx} className="grid grid-cols-[80px_1fr_80px] gap-2">
            <input className="input" value={item.node}      disabled={isPlaying} onChange={(e) => { const c = [...nodes]; c[idx].node = e.target.value; setNodes(c); }} />
            <input className="input" value={item.neighbors} disabled={isPlaying} onChange={(e) => { const c = [...nodes]; c[idx].neighbors = e.target.value; setNodes(c); }} />
            <input className="input" type="number" value={item.h} disabled={isPlaying} onChange={(e) => { const c = [...nodes]; c[idx].h = e.target.value; setNodes(c); }} />
          </div>
        ))}
        <button className="btn" onClick={() => setNodes([...nodes, { node: "", neighbors: "", h: 0 }])} disabled={isPlaying}><Plus size={14} /> Add node</button>
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
          <CodeViewer code={CODE} highlightedLine={highlightedLine} title="a-star.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="astar" />
      <LeetCodeSection slug="aStar" />
    </AlgoPageShell>
  );
};

export default AStarPage;
