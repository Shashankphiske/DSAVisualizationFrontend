import { Link } from "react-router-dom";

const Home = () => {
  const categories = [
    {
      to: "/sortingalgorithms",
      icon: "🔢",
      title: "Sorting Algorithms",
      description: "Bubble, Selection, Insertion, Merge, Quick, and Heap Sort.",
      gradient: "from-purple-500 to-pink-500",
      delay: "0"
    },
    {
      to: "/searchingalgorithms",
      icon: "🔍",
      title: "Searching Algorithms",
      description: "Binary Search and Linear Search techniques.",
      gradient: "from-blue-500 to-cyan-500",
      delay: "100"
    },
    {
      to: "/graphalgorithms",
      icon: "🕸️",
      title: "Graph Algorithms",
      description: "BFS and DFS graph traversal methods.",
      gradient: "from-green-500 to-teal-500",
      delay: "200"
    },
    {
      to: "/treealgorithms",
      icon: "🌳",
      title: "Tree Traversals",
      description: "Inorder, Preorder, and Postorder tree traversals.",
      gradient: "from-yellow-500 to-orange-500",
      delay: "300"
    },
    {
      to: "/stackalgorithms",
      icon: "📚",
      title: "Stack Operations",
      description: "Push and Pop operations on LIFO data structure.",
      gradient: "from-red-500 to-pink-500",
      delay: "400"
    },
    {
      to: "/queuealgorithms",
      icon: "🎫",
      title: "Queue Operations",
      description: "Enqueue and Dequeue operations on FIFO data structure.",
      gradient: "from-indigo-500 to-purple-500",
      delay: "500"
    },
    {
      to: "/linkedlistalgorithms",
      icon: "🔗",
      title: "Linked List Operations",
      description: "Insertion, Deletion, and Reversal in linked lists.",
      gradient: "from-cyan-500 to-blue-500",
      delay: "600"
    },
    {
      to: "/shortestpathalgorithms",
      icon: "🗺️",
      title: "Shortest Path Algorithms",
      description: "Dijkstra's and A* pathfinding algorithms.",
      gradient: "from-emerald-500 to-green-500",
      delay: "700"
    }
  ];

  return (
    <div className="min-h-screen text-white pt-24 pb-16 px-6">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-20">
        <div className="inline-block mb-6 float-animation">
          {/* <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center glow">
            <span className="text-4xl">🚀</span>
          </div> */}
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Algorithm Visualizer</span>
        </h1>
        
        <p className="text-gray-300 text-xl md:text-2xl mb-8 leading-relaxed">
          Learn Data Structures and Algorithms through 
          <span className="gradient-text-secondary font-semibold"> interactive visual animations</span>
        </p>
        
        <p className="text-gray-400 text-lg mb-10">
          Play, pause, and understand every step of complex algorithms in real-time
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/sortingalgorithms" 
            className="px-8 py-4 rounded-full btn-primary text-white font-semibold text-lg hover:scale-105 transition-all"
          >
            Get Started →
          </Link>
          {/* <a 
            href="https://github.com" 
            className="px-8 py-4 rounded-full glass-card text-white font-semibold text-lg hover:scale-105 transition-all"
          >
            ⭐ Star on GitHub
          </a> */}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-4xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold gradient-text mb-2">25+</div>
            <div className="text-gray-400">Algorithms</div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold gradient-text-secondary mb-2">8</div>
            <div className="text-gray-400">Categories</div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold gradient-text mb-2">100%</div>
            <div className="text-gray-400">Interactive</div>
          </div>
        </div>
      </div>

      {/* Algorithm Cards */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore <span className="gradient-text">Algorithm Categories</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.to}
              className="glass-card rounded-2xl p-6 group hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${category.delay}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <span className="text-3xl">{category.icon}</span>
              </div>
              
              <h2 className="text-xl font-semibold mb-3 group-hover:gradient-text transition-all">
                {category.title}
              </h2>
              
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {category.description}
              </p>
              
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Explore 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why <span className="gradient-text">AlgoVisualizer</span>?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
            <p className="text-gray-400">Optimized performance for smooth real-time visualization</p>
          </div>
          
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-3">Beautiful UI</h3>
            <p className="text-gray-400">Modern glass morphism design with premium aesthetics</p>
          </div>
          
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-3">Educational</h3>
            <p className="text-gray-400">Step-by-step explanations for better understanding</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

