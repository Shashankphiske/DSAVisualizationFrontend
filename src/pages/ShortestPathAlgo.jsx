import { Map, Compass, Star } from "lucide-react";
import CategoryPage from "../components/CategoryPage";

const items = [
  { to: "/dijkstra", title: "Dijkstra's Algorithm", desc: "Greedy shortest-path search on weighted graphs with non-negative edges.", Icon: Compass, badge: "Greedy" },
  { to: "/astar",    title: "A* Algorithm",         desc: "Heuristic-guided pathfinding combining cost-so-far with estimated distance.", Icon: Star,    badge: "Heuristic" },
];

const ShortestPathAlgo = () => (
  <CategoryPage
    icon={Map}
    eyebrow="Category · Shortest Path"
    title="Shortest Path Algorithms"
    subtitle="Find optimal routes between nodes in weighted graphs."
    description="Priority queue · relaxation · heuristics"
    items={items}
  />
);

export default ShortestPathAlgo;
