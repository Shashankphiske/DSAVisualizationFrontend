/**
 * Themed binary tree SVG visualization.
 * Props:
 *   adj          – { node: [left, right] }
 *   root         – id of the root node
 *   visited      – Set of visited node ids
 *   currentNode  – id of the currently active node (highlighted gold)
 */
const TreeViz = ({ adj = {}, root, visited = new Set(), currentNode = null }) => {
  const positions = {};
  const edges = [];

  const build = (node, x, y, gap) => {
    if (!node || positions[node]) return;
    positions[node] = { x, y };
    const [l, r] = adj[node] || [];
    if (l) { edges.push([node, l]); build(l, x - gap, y + 80, gap / 2); }
    if (r) { edges.push([node, r]); build(r, x + gap, y + 80, gap / 2); }
  };
  if (root) build(root, 400, 60, 160);

  const idle = "hsl(220, 30%, 19%)";
  const idleStroke = "hsl(220, 30%, 30%)";
  const visitedFill = "hsl(168, 100%, 42%)";
  const currentFill = "hsl(38, 92%, 50%)";

  return (
    <svg viewBox="0 0 800 380" className="w-full max-w-2xl">
      {edges.map(([u, v], i) =>
        positions[u] && positions[v] ? (
          <line
            key={i}
            x1={positions[u].x} y1={positions[u].y}
            x2={positions[v].x} y2={positions[v].y}
            stroke="hsl(220, 30%, 25%)" strokeWidth="2"
          />
        ) : null
      )}
      {Object.entries(positions).map(([node, pos]) => {
        const isCurrent = node === String(currentNode);
        const isVisited = visited.has(node);
        const fill = isCurrent ? currentFill : isVisited ? visitedFill : idle;
        const stroke = isCurrent ? currentFill : isVisited ? visitedFill : idleStroke;
        const textColor = isCurrent || isVisited ? "hsl(220, 35%, 5%)" : "hsl(217, 96%, 95%)";
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

export default TreeViz;
