/**
 * Themed graph SVG (radial layout) visualization.
 * Props:
 *   adj          – { node: [neighbors] | { neighbor: weight } }
 *   visited      – Set of visited node ids
 *   currentNode  – id of currently visiting node
 *   target       – id of target node (highlighted red on found)
 *   found        – boolean
 *   weighted     – render edge weights
 */
const GraphViz = ({ adj = {}, visited = new Set(), currentNode = null, target = null, found = false, weighted = false }) => {
  const nodeKeys = Object.keys(adj);
  const radius = 150, cx = 260, cy = 200;
  const positions = {};
  nodeKeys.forEach((node, i) => {
    const angle = (2 * Math.PI * i) / nodeKeys.length - Math.PI / 2;
    positions[node] = {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });

  const idle = "hsl(220, 30%, 19%)";
  const idleStroke = "hsl(220, 30%, 30%)";
  const visitedFill = "hsl(168, 100%, 42%)";
  const currentFill = "hsl(38, 92%, 50%)";
  const foundFill = "hsl(0, 84%, 60%)";

  const renderEdges = () => {
    const seen = new Set();
    const edges = [];
    nodeKeys.forEach((u) => {
      const list = adj[u];
      const neighbors = Array.isArray(list) ? list.map((n) => [n, null]) : Object.entries(list || {});
      neighbors.forEach(([v, w]) => {
        const key = [u, v].sort().join("→");
        if (seen.has(key)) return;
        seen.add(key);
        if (!positions[u] || !positions[v]) return;
        edges.push({ u, v, w, key });
      });
    });
    return edges.map(({ u, v, w, key }) => (
      <g key={key}>
        <line
          x1={positions[u].x} y1={positions[u].y}
          x2={positions[v].x} y2={positions[v].y}
          stroke="hsl(220, 30%, 25%)" strokeWidth="2"
        />
        {weighted && w != null && (
          <text
            x={(positions[u].x + positions[v].x) / 2}
            y={(positions[u].y + positions[v].y) / 2 - 4}
            fill="hsl(211, 39%, 63%)" fontSize="11" fontFamily="JetBrains Mono, monospace"
            textAnchor="middle"
          >{w}</text>
        )}
      </g>
    ));
  };

  return (
    <svg viewBox="0 0 520 400" className="w-full max-w-xl">
      {renderEdges()}
      {nodeKeys.map((node) => {
        const pos = positions[node];
        const isCurrent = node === String(currentNode);
        const isFoundTarget = found && node === String(target);
        const isVisited = visited.has(node);
        const fill = isFoundTarget ? foundFill : isCurrent ? currentFill : isVisited ? visitedFill : idle;
        const stroke = isFoundTarget ? foundFill : isCurrent ? currentFill : isVisited ? visitedFill : idleStroke;
        const textColor = isFoundTarget || isCurrent || isVisited ? "hsl(220, 35%, 5%)" : "hsl(217, 96%, 95%)";
        return (
          <g key={node}>
            <circle cx={pos.x} cy={pos.y} r="22" fill={fill} stroke={stroke} strokeWidth="2" />
            <text x={pos.x} y={pos.y + 5} textAnchor="middle" fill={textColor} fontWeight="700" fontFamily="JetBrains Mono, monospace" fontSize="14">
              {node}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default GraphViz;
