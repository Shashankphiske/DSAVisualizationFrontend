import { Link } from "react-router-dom";

const LinkedListAlgo = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Linked List Operations
        </h1>
        <p className="text-gray-400 text-lg">
          Learn operations on singly and doubly linked lists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Link
          to="/singly-insertion"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Singly - Insertion</h2>
          <p className="text-gray-400 text-sm mb-4">
            Insert nodes in a singly linked list at any position.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>

        <Link
          to="/singly-deletion"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Singly - Deletion</h2>
          <p className="text-gray-400 text-sm mb-4">
            Delete nodes from a singly linked list at any position.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>

        <Link
          to="/singly-reversal"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Singly - Reversal</h2>
          <p className="text-gray-400 text-sm mb-4">
            Reverse a singly linked list by changing pointers.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>

        <Link
          to="/doubly-insertion"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Doubly - Insertion</h2>
          <p className="text-gray-400 text-sm mb-4">
            Insert nodes in a doubly linked list with prev pointers.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>

        <Link
          to="/doubly-deletion"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Doubly - Deletion</h2>
          <p className="text-gray-400 text-sm mb-4">
            Delete nodes from a doubly linked list.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>

        <Link
          to="/doubly-reversal"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Doubly - Reversal</h2>
          <p className="text-gray-400 text-sm mb-4">
            Reverse a doubly linked list by swapping pointers.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>
      </div>
    </div>
  );
};

export default LinkedListAlgo;
