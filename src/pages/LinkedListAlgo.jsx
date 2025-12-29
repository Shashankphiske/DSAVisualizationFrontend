import { Link } from "react-router-dom";

const LinkedListAlgo = () => {
  const algorithms = [
    { to: "/singly-insertion", title: "Singly - Insertion", desc: "Insert nodes in a singly linked list at any position.", icon: "➕", type: "Singly" },
    { to: "/singly-deletion", title: "Singly - Deletion", desc: "Delete nodes from a singly linked list at any position.", icon: "➖", type: "Singly" },
    { to: "/singly-reversal", title: "Singly - Reversal", desc: "Reverse a singly linked list by changing pointers.", icon: "🔄", type: "Singly" },
    { to: "/doubly-insertion", title: "Doubly - Insertion", desc: "Insert nodes in a doubly linked list with prev pointers.", icon: "➕", type: "Doubly" },
    { to: "/doubly-deletion", title: "Doubly - Deletion", desc: "Delete nodes from a doubly linked list.", icon: "➖", type: "Doubly" },
    { to: "/doubly-reversal", title: "Doubly - Reversal", desc: "Reverse a doubly linked list by swapping pointers.", icon: "🔄", type: "Doubly" }
  ];

  return (
    <div className="min-h-screen text-white pt-24 pb-16 px-6">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-block mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center glow">
            <span className="text-3xl">🔗</span>
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-6">
          <span className="gradient-text">Linked List Operations</span>
        </h1>
        <p className="text-gray-300 text-xl mb-4">
          Learn operations on singly and doubly linked lists
        </p>
        <p className="text-gray-400">
          Master insertion, deletion, and reversal techniques
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {algorithms.map((algo, index) => (
          <Link
            key={index}
            to={algo.to}
            className="glass-card rounded-2xl p-6 group hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">{algo.icon}</span>
              <span className={`px-2 py-1 rounded-full glass text-xs font-semibold ${algo.type === 'Singly' ? 'text-cyan-300' : 'text-blue-300'}`}>
                {algo.type}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-3 group-hover:gradient-text transition-all">{algo.title}</h2>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{algo.desc}</p>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
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

export default LinkedListAlgo;
