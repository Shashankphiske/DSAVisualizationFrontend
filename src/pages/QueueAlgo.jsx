import { Link } from "react-router-dom";

const QueueAlgo = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Queue Operations
        </h1>
        <p className="text-gray-400 text-lg">
          Understand FIFO (First In First Out) queue data structure operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Link
          to="/queue-enqueue"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Queue Enqueue</h2>
          <p className="text-gray-400 text-sm mb-4">
            Add elements to the rear of the queue.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>

        <Link
          to="/queue-dequeue"
          className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-semibold mb-2">Queue Dequeue</h2>
          <p className="text-gray-400 text-sm mb-4">
            Remove elements from the front of the queue.
          </p>
          <span className="text-blue-400">Visualize →</span>
        </Link>
      </div>
    </div>
  );
};

export default QueueAlgo;
