import { Link } from "react-router-dom";

const GraphAlgo = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Graph Algorithms
        </h1>
        <p className="text-gray-400 text-lg">
          Learn graph traversal algorithms for exploring nodes and edges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Link
          to="/bfs"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Breadth-First Search (BFS)</h2>
          <p className="text-gray-400 text-sm mb-4">
            Level-by-level graph traversal using a queue data structure.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>

        <Link
          to="/dfs"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Depth-First Search (DFS)</h2>
          <p className="text-gray-400 text-sm mb-4">
            Deep exploration graph traversal using a stack data structure.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>
      </div>
    </div>
  );
};

export default GraphAlgo;
