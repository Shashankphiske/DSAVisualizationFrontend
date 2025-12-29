import { Link } from "react-router-dom";

const SortingAlgo = () => {
  const algorithms = [
    { to: "/bubble-sort", title: "Bubble Sort", desc: "Simple comparison-based sorting algorithm.", icon: "🫧" },
    { to: "/selection-sort", title: "Selection Sort", desc: "Selects the minimum element and places it in position.", icon: "🎯" },
    { to: "/insertion-sort", title: "Insertion Sort", desc: "Builds the sorted array one element at a time.", icon: "📌" },
    { to: "/merge-sort", title: "Merge Sort", desc: "Divide and conquer sorting with O(n log n) time.", icon: "🔀" },
    { to: "/quick-sort", title: "Quick Sort", desc: "Efficient partitioning-based sorting algorithm.", icon: "⚡" },
    { to: "/heap-sort", title: "Heap Sort", desc: "Uses binary heap data structure for sorting.", icon: "🏔️" }
  ];

  return (
    <div className="min-h-screen text-white pt-24 pb-16 px-6">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-block mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center glow">
            <span className="text-3xl">🔢</span>
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-6">
          <span className="gradient-text">Sorting Algorithms</span>
        </h1>
        <p className="text-gray-300 text-xl mb-4">
          Master sorting techniques through interactive visualizations
        </p>
        <p className="text-gray-400">
          Compare, understand, and analyze different sorting methods
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {algorithms.map((algo, index) => (
          <Link
            key={index}
            to={algo.to}
            className="glass-card rounded-2xl p-6 group hover:scale-105 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{algo.icon}</div>
            <h2 className="text-xl font-semibold mb-3 group-hover:gradient-text transition-all">{algo.title}</h2>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{algo.desc}</p>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
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

export default SortingAlgo;
