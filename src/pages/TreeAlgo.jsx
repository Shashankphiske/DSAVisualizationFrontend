import { Link } from "react-router-dom";

const TreeAlgo = () => {
  const algorithms = [
    { to: "/inorder", title: "Inorder Traversal", desc: "Left → Root → Right traversal order.", icon: "⬅️" },
    { to: "/preorder", title: "Preorder Traversal", desc: "Root → Left → Right traversal order.", icon: "🔼" },
    { to: "/postorder", title: "Postorder Traversal", desc: "Left → Right → Root traversal order.", icon: "➡️" }
  ];

  return (
    <div className="min-h-screen text-white pt-24 pb-16 px-6">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-block mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center glow">
            <span className="text-3xl">🌳</span>
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-6">
          <span className="gradient-text">Tree Traversals</span>
        </h1>
        <p className="text-gray-300 text-xl mb-4">
          Master different methods to traverse binary trees
        </p>
        <p className="text-gray-400">
          Understand the order of visiting nodes in tree structures
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {algorithms.map((algo, index) => (
          <Link
            key={index}
            to={algo.to}
            className="glass-card rounded-2xl p-8 group hover:scale-105 transition-all duration-300"
          >
            <div className="text-5xl mb-4">{algo.icon}</div>
            <h2 className="text-xl font-semibold mb-3 group-hover:gradient-text transition-all">{algo.title}</h2>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{algo.desc}</p>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
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

export default TreeAlgo;
