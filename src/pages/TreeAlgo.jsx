import { Link } from "react-router-dom";

const TreeAlgo = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Tree Traversal Algorithms
        </h1>
        <p className="text-gray-400 text-lg">
          Explore different methods to traverse binary trees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Link
          to="/inorder"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Inorder Traversal</h2>
          <p className="text-gray-400 text-sm mb-4">
            Left → Root → Right traversal order.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>

        <Link
          to="/preorder"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Preorder Traversal</h2>
          <p className="text-gray-400 text-sm mb-4">
            Root → Left → Right traversal order.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>

        <Link
          to="/postorder"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Postorder Traversal</h2>
          <p className="text-gray-400 text-sm mb-4">
            Left → Right → Root traversal order.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>
      </div>
    </div>
  );
};

export default TreeAlgo;
