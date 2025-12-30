import { Link } from "react-router-dom";

const DynamicAlgorithms = () => {
  const algorithms = [
    {
      to: "/dp/fibonacci",
      title: "Fibonacci DP",
      description: "Top-down and bottom-up Fibonacci visualization."
    },
    {
      to: "/dp/coinchange",
      title: "Coin Change DP",
      description: "Given a set of coin denominations and a target amount, the goal is to determine the minimum number of coins required to make that amount."
    }
  ];

  return (
    <div className="min-h-screen text-white pt-24 px-6">
      <h1 className="text-4xl font-bold text-center mb-12">
        Dynamic Programming Algorithms
      </h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {algorithms.map((algo, idx) => (
          <Link
            key={idx}
            to={algo.to}
            className="glass-card p-6 rounded-xl hover:scale-105 transition-all"
          >
            <h2 className="text-xl font-semibold mb-2 gradient-text">
              {algo.title}
            </h2>
            <p className="text-gray-400 text-sm">
              {algo.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DynamicAlgorithms;
