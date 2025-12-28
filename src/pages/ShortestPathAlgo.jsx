import { Link } from "react-router-dom";

const ShortestPathAlgo = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Shortest Path Algorithms
        </h1>
        <p className="text-gray-400 text-lg">
          Find the shortest path between nodes in weighted graphs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Link
          to="/dijkstra"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Dijkstra's Algorithm</h2>
          <p className="text-gray-400 text-sm mb-4">
            Greedy algorithm to find shortest paths in weighted graphs.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>

        <Link
          to="/astar"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">A* Algorithm</h2>
          <p className="text-gray-400 text-sm mb-4">
            Informed search using heuristics for optimal pathfinding.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>
      </div>
    </div>
  );
};

export default ShortestPathAlgo;
