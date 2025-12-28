import { Link } from "react-router-dom";

const StackAlgo = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Stack Operations
        </h1>
        <p className="text-gray-400 text-lg">
          Understand LIFO (Last In First Out) stack data structure operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Link
          to="/stack-push"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Stack Push</h2>
          <p className="text-gray-400 text-sm mb-4">
            Add elements to the top of the stack.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>

        <Link
          to="/stack-pop"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Stack Pop</h2>
          <p className="text-gray-400 text-sm mb-4">
            Remove elements from the top of the stack.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>
      </div>
    </div>
  );
};

export default StackAlgo;
