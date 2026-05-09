import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import CodeViewer from "./CodeViewer";
import { AlgoPageHeader, AlgoPageShell } from "./AlgoPageTemplate";
import ControlBar from "./components/ControlBar";
import ExplanationBox from "./components/ExplanationBox";
import Legend from "./components/Legend";
import TreeViz from "./components/TreeViz";
import LeetCodeSection from "./components/LeetCodeSection";
import MeasuredComplexity from "./components/MeasuredComplexity";
import VideoEmbed from "./components/VideoEmbed";
import useAlgoPlayer from "./hooks/useAlgoPlayer";

/**
 * Shared template for in/pre/post-order traversals.
 * Backend returns { arr: [nodeId, …] } — list of visited nodes in order.
 */
const TreeTraversalTemplate = ({ icon: Icon, title, description, order, endpoint, code, codeLine, leetcodeSlug, videoSlug }) => {
  const [nodes, setNodes] = useState([
    { node: "1", left: "2", right: "3" },
    { node: "2", left: "4", right: "5" },
    { node: "3", left: "", right: "" },
    { node: "4", left: "", right: "" },
    { node: "5", left: "", right: "" },
  ]);
  const player = useAlgoPlayer();
  const { step, index, isPlaying, error, setError } = player;

  const adj = useMemo(() => {
    const a = {};
    for (const n of nodes) {
      if (!n.node) continue;
      a[n.node] = [n.left || null, n.right || null];
    }
    return a;
  }, [nodes]);

  const root = useMemo(() => {
    const children = new Set();
    for (const k in adj) {
      const [l, r] = adj[k];
      if (l) children.add(l);
      if (r) children.add(r);
    }
    return Object.keys(adj).find((k) => !children.has(k));
  }, [adj]);

  const fetchSteps = async () => {
    const res = await fetch(`http://localhost:3000/treealgo/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adj }),
    });
    return await res.json();
  };

  const handlePlay = async () => {
    if (player.steps.length === 0) {
      if (Object.keys(adj).length === 0) { setError("Tree cannot be empty"); return; }
      const data = await player.load(fetchSteps);
      if (!data) return;
    }
    player.play();
  };

  const visited = new Set(player.steps.slice(0, index + 1).map(String));
  const currentNode = step != null ? String(step) : null;
  const explain = step != null
    ? `Visiting node ${step}`
    : (player.steps.length > 0 && index === player.steps.length - 1 ? `Complete: [${player.steps.join(", ")}]` : "");

  const addNode = () => setNodes([...nodes, { node: "", left: "", right: "" }]);

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Icon}
        title={title}
        description={description}
        complexity={{ time: "O(n)", space: "O(h)" , timeReason: "We touch every node exactly once and do a constant amount of work per node (compare, recurse left, recurse right, print). With n nodes that totals c·n operations, which is O(n). Adding more nodes increases the cost linearly.", spaceReason: "Memory is dominated by the recursion call stack. At any moment we have one frame per ancestor of the current node, so the stack peaks at the tree height h. A balanced tree gives h ≈ log n, but a skewed tree (every node has only one child) degrades to h = n." }}
        badge={<>Tree · {order}</>}
      />

      <section className="card p-5 space-y-3">
        <div className="card-title">Tree input</div>
        <div className="grid grid-cols-[80px_1fr_1fr] gap-2 text-[10px] font-mono uppercase tracking-widest text-[hsl(var(--text-2))]">
          <span>Node</span><span>Left</span><span>Right</span>
        </div>
        {nodes.map((n, idx) => (
          <div key={idx} className="grid grid-cols-[80px_1fr_1fr] gap-2">
            <input className="input" value={n.node}  disabled={isPlaying} onChange={(e) => { const c = [...nodes]; c[idx].node = e.target.value; setNodes(c); }} />
            <input className="input" value={n.left}  disabled={isPlaying} onChange={(e) => { const c = [...nodes]; c[idx].left = e.target.value; setNodes(c); }} />
            <input className="input" value={n.right} disabled={isPlaying} onChange={(e) => { const c = [...nodes]; c[idx].right = e.target.value; setNodes(c); }} />
          </div>
        ))}
        <button className="btn" onClick={addNode} disabled={isPlaying}><Plus size={14} /> Add node</button>
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
            <TreeViz adj={adj} root={root} visited={visited} currentNode={currentNode} />
          </div>
          <Legend items={[
            { label: "Idle",     color: "hsl(220 30% 19%)" },
            { label: "Visited",  color: "hsl(168 100% 42%)" },
            { label: "Current",  color: "hsl(38 92% 50%)" },
          ]} />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={code} highlightedLine={step != null ? codeLine : null} title={`${endpoint}.js`} />
        </div>
      </section>

      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug={videoSlug || endpoint} />
      {leetcodeSlug && <LeetCodeSection slug={leetcodeSlug} />}
    </AlgoPageShell>
  );
};

export default TreeTraversalTemplate;
