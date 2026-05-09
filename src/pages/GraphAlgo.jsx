import { Network, Waves, Mountain } from "lucide-react";
import CategoryPage from "../components/CategoryPage";

const items = [
  { to: "/bfs", title: "Breadth-First Search", desc: "Level-by-level traversal of a graph using a FIFO queue.",            Icon: Waves,    badge: "BFS" },
  { to: "/dfs", title: "Depth-First Search",   desc: "Goes as deep as possible along each branch before backtracking.",     Icon: Mountain, badge: "DFS" },
];

const GraphAlgo = () => (
  <CategoryPage
    icon={Network}
    eyebrow="Category · Graphs"
    title="Graph Traversal"
    subtitle="Explore nodes and edges with classical traversal strategies."
    description="Adjacency list input · queue / stack visualization"
    items={items}
  />
);

export default GraphAlgo;
