import { Link } from "react-router-dom";

const GraphAlgo = () => {
  const algorithms = [
    { to: "/bfs", title: "Breadth-First Search", abbr: "BFS", desc: "Level-by-level graph traversal using a queue data structure.", icon: "🌊" },
    { to: "/dfs", title: "Depth-First Search", abbr: "DFS", desc: "Deep exploration graph traversal using a stack data structure.", icon: "🏔️" }
  ];

  return (
    <div className="min-h-screen text-white pt-24 pb-16 px-6">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-block mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center glow">
            <span className="text-3xl">🕸️</span>
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-6">
          <span className="gradient-text">Graph Algorithms</span>
        </h1>
        <p className="text-gray-300 text-xl mb-4">
          Master graph traversal techniques and explore complex networks
        </p>
        <p className="text-gray-400">
          Learn how to navigate nodes and edges effectively
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {algorithms.map((algo, index) => (
          <Link
            key={index}
            to={algo.to}
            className="glass-card rounded-2xl p-8 group hover:scale-105 transition-all duration-300"
          >
            <div className="text-5xl mb-4">{algo.icon}</div>
            <h2 className="text-2xl font-semibold mb-2 group-hover:gradient-text transition-all">{algo.title}</h2>
            <div className="inline-block px-3 py-1 rounded-full glass text-xs font-semibold mb-3">{algo.abbr}</div>
            <p className="text-gray-400 mb-4 leading-relaxed">{algo.desc}</p>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
              Visualize
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GraphAlgo;
