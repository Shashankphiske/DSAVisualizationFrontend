import { Link } from "react-router-dom";

const SearchingAlgo = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Searching Algorithms
        </h1>
        <p className="text-gray-400 text-lg">
          Explore different searching techniques to find elements in data structures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Link
          to="/binary-search"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Binary Search</h2>
          <p className="text-gray-400 text-sm mb-4">
            Efficient search algorithm for sorted arrays using divide and conquer.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>

        <Link
          to="/linear-search"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Linear Search</h2>
          <p className="text-gray-400 text-sm mb-4">
            Sequential search algorithm that checks each element one by one.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>
      </div>
    </div>
  );
};

export default SearchingAlgo;
