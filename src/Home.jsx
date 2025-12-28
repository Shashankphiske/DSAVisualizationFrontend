import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Algorithm Visualizer
        </h1>
        <p className="text-gray-400 text-lg">
          Learn Data Structures and Algorithms through interactive visual
          animations. Play, pause, and understand every step.
        </p>
      </div>

      {/* Algorithm Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Link
          to="/sortingalgorithms"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Sorting Algorithms</h2>
          <p className="text-gray-400 text-sm mb-4">
            Bubble, Selection, Insertion, Merge, Quick, and Heap Sort.
          </p>
          <span className="text-blue-400">Explore →</span>
        </Link>

        <Link
          to="/searchingalgorithms"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Searching Algorithms</h2>
          <p className="text-gray-400 text-sm mb-4">
            Binary Search and Linear Search techniques.
          </p>
          <span className="text-blue-400">Explore →</span>
        </Link>

        <Link
          to="/graphalgorithms"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Graph Algorithms</h2>
          <p className="text-gray-400 text-sm mb-4">
            BFS and DFS graph traversal methods.
          </p>
          <span className="text-blue-400">Explore →</span>
        </Link>

        <Link
          to="/treealgorithms"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Tree Traversals</h2>
          <p className="text-gray-400 text-sm mb-4">
            Inorder, Preorder, and Postorder tree traversals.
          </p>
          <span className="text-blue-400">Explore →</span>
        </Link>

        <Link
          to="/stackalgorithms"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Stack Operations</h2>
          <p className="text-gray-400 text-sm mb-4">
            Push and Pop operations on LIFO data structure.
          </p>
          <span className="text-blue-400">Explore →</span>
        </Link>

        <Link
          to="/queuealgorithms"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Queue Operations</h2>
          <p className="text-gray-400 text-sm mb-4">
            Enqueue and Dequeue operations on FIFO data structure.
          </p>
          <span className="text-blue-400">Explore →</span>
        </Link>

        <Link
          to="/linkedlistalgorithms"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Linked List Operations</h2>
          <p className="text-gray-400 text-sm mb-4">
            Insertion, Deletion, and Reversal in linked lists.
          </p>
          <span className="text-blue-400">Explore →</span>
        </Link>

        <Link
          to="/shortestpathalgorithms"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Shortest Path Algorithms</h2>
          <p className="text-gray-400 text-sm mb-4">
            Dijkstra's and A* pathfinding algorithms.
          </p>
          <span className="text-blue-400">Explore →</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
