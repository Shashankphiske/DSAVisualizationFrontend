import { Link } from "react-router-dom";

const SortingAlgo = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Sorting Algorithms
        </h1>
        <p className="text-gray-400 text-lg">
          Learn Data Structures and Algorithms through interactive visual
          animations. Play, pause, and understand every step.
        </p>
      </div>

      {/* Algorithm Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Link
          to="/bubble-sort"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Bubble Sort</h2>
          <p className="text-gray-400 text-sm mb-4">
            Simple comparison-based sorting algorithm.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>

        <Link
          to="/selection-sort"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Selection Sort</h2>
          <p className="text-gray-400 text-sm mb-4">
            Simple comparison-based sorting algorithm.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>

        <Link
          to="/insertion-sort"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Insertion Sort</h2>
          <p className="text-gray-400 text-sm mb-4">
            Simple comparison-based sorting algorithm.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>
        <Link
          to="/merge-sort"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Merge Sort</h2>
          <p className="text-gray-400 text-sm mb-4">
            Simple comparison-based sorting algorithm.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>
        <Link
          to="/quick-sort"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Quick Sort</h2>
          <p className="text-gray-400 text-sm mb-4">
            Simple comparison-based sorting algorithm.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>
        <Link
          to="/heap-sort"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Heap Sort</h2>
          <p className="text-gray-400 text-sm mb-4">
            Simple comparison-based sorting algorithm.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>
      </div>
    </div>
  );
};

export default SortingAlgo;
