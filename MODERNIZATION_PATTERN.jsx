// ============================================
// ALGORITHM PAGE MODERNIZATION PATTERN
// ============================================
// Use this template to modernize remaining algorithm visualization pages
// All pages follow the same structure with glass morphism, gradients, and modern controls

/* 
STEP 1: Update the return statement wrapper
OLD: <div className="min-h-screen bg-gray-900 text-white p-8">
NEW: <div className="min-h-screen text-white pt-24 pb-16 px-6">
*/

/*
STEP 2: Replace Title Section with Modern Header
OLD:
  <h1 className="text-3xl font-bold text-center mb-6">
    [Algorithm Name] Visualization
  </h1>

NEW:
  <div className="text-center max-w-4xl mx-auto mb-8">
    <div className="inline-block mb-4">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center glow">
        <span className="text-2xl">🎯</span> {/* Use relevant emoji */}
      </div>
    </div>
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      <span className="gradient-text">[Algorithm Name]</span>
    </h1>
    ...
  </div>
*/

/*
STEP 3: Replace Info Section with Glass Card
OLD:
  <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded mb-6">
    <h2 className="text-xl font-semibold mb-2">About [Algorithm]</h2>
    <p className="text-gray-300 text-sm">...</p>
    <p className="text-gray-400 text-sm mt-2">⏱ O(n²) Time | 🧠 O(1) Space</p>
  </div>

NEW:
  <div className="glass-card rounded-2xl p-6 mb-6 text-left">
    <h2 className="text-xl font-semibold mb-3 gradient-text-secondary">About [Algorithm]</h2>
    <p className="text-gray-300 text-sm mb-3 leading-relaxed">...</p>
    <div className="flex flex-wrap gap-4 mt-4">
      <div className="glass px-4 py-2 rounded-lg">
        <span className="text-gray-400 text-xs">Time Complexity</span>
        <div className="text-yellow-400 font-semibold">O(n²)</div>
      </div>
      <div className="glass px-4 py-2 rounded-lg">
        <span className="text-gray-400 text-xs">Space Complexity</span>
        <div className="text-green-400 font-semibold">O(1)</div>
      </div>
    </div>
  </div>
*/

/*
STEP 4: Modernize Control Buttons
OLD:
  <button onClick={handlePlay} disabled={isPlaying} className="bg-green-600 px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50">
    ▶ Play
  </button>

NEW:
  <button 
    onClick={handlePlay} 
    disabled={isPlaying} 
    className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold hover:scale-105 transition-all flex items-center gap-2"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
    </svg>
    Play
  </button>
  // Similar pattern for Pause (yellow-to-orange) and Replay (red-to-pink)
*/

/*
STEP 5: Modernize Input Fields
OLD:
  <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    disabled={isPlaying}
    className="px-4 py-2 rounded bg-gray-800 border border-gray-600 w-96"
    placeholder="e.g., 5,3,8,4,2"
  />

NEW:
  <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    disabled={isPlaying}
    placeholder="e.g., 5,3,8,4,2"
    className="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-purple-500 focus:outline-none transition-all text-white placeholder-gray-500"
  />
*/

/*
STEP 6: Add Status Indicator Box
NEW ADDITION (place before visualization):
  <div className="max-w-5xl mx-auto mb-8">
    <div className="glass-card rounded-2xl p-6 text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
        <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
          {isPlaying ? 'Running' : 'Ready'}
        </span>
      </div>
      <p className="text-lg text-blue-300 font-medium">
        {explanation || "Click Play to start the visualization"}
      </p>
    </div>
  </div>
*/

/*
STEP 7: Enhance Visualization Container
OLD:
  <div className="flex justify-center items-end gap-2 bg-gray-800 p-8 rounded max-w-5xl mx-auto" style={{ minHeight: "400px" }}>

NEW:
  <div className="max-w-6xl mx-auto">
    <div className="glass-card rounded-2xl p-8">
      <div className="flex justify-center items-end gap-2" style={{ minHeight: "400px" }}>
*/

/*
STEP 8: Update Visualization Elements (Bars/Nodes)
OLD BAR:
  <div className={`w-full rounded-t-lg transition-all duration-500 ease-in-out ${bgColor}`} style={{ height: `${heightPercentage}%` }} />

NEW BAR:
  <div className={`w-full rounded-t-xl transition-all duration-500 ease-in-out ${bgColor} relative overflow-hidden`} style={{ height: `${heightPercentage}%` }}>
    <div className="absolute inset-0 bg-white/20 shimmer"></div>
  </div>

UPDATE COLORS:
  Instead of: bg-blue-500, bg-red-500, bg-yellow-400
  Use: bg-gradient-to-t from-blue-500 to-cyan-400
       bg-gradient-to-t from-red-500 to-pink-400
       bg-gradient-to-t from-yellow-400 to-orange-400
*/

// ============================================
// FULL EXAMPLE: Sorting Algorithm Page Structure
// ============================================

const ModernAlgorithmPage = () => {
  // ... state and logic remain the same ...

  return (
    <div className="min-h-screen text-white pt-24 pb-16 px-6">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-8">
        <div className="inline-block mb-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center glow">
            <span className="text-2xl">🔢</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Algorithm Name</span>
        </h1>
        
        <div className="glass-card rounded-2xl p-6 text-left">
          <h2 className="text-xl font-semibold mb-3 gradient-text-secondary">About Algorithm</h2>
          <p className="text-gray-300 text-sm mb-3 leading-relaxed">
            Description of the algorithm...
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="glass px-4 py-2 rounded-lg">
              <span className="text-gray-400 text-xs">Time Complexity</span>
              <div className="text-yellow-400 font-semibold">O(n²)</div>
            </div>
            <div className="glass px-4 py-2 rounded-lg">
              <span className="text-gray-400 text-xs">Space Complexity</span>
              <div className="text-green-400 font-semibold">O(1)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-between">
            <div className="flex-1 w-full lg:w-auto">
              <label className="text-sm text-gray-400 mb-2 block">
                Enter array (comma-separated numbers)
              </label>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isPlaying}
                placeholder="e.g., 5,3,8,4,2"
                className="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-purple-500 focus:outline-none transition-all text-white placeholder-gray-500"
              />
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>

            <div className="flex flex-wrap gap-3">
              {/* Play, Pause, Replay buttons with modern styling */}
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="glass-card rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
              {isPlaying ? 'Running' : 'Ready'}
            </span>
          </div>
          <p className="text-lg text-blue-300 font-medium">
            {explanation || "Click Play to start the visualization"}
          </p>
        </div>
      </div>

      {/* Visualization */}
      <div className="max-w-6xl mx-auto">
        <div className="glass-card rounded-2xl p-8">
          {/* Visualization content here */}
        </div>
      </div>
    </div>
  );
};

// ============================================
// COLOR GRADIENTS FOR DIFFERENT CATEGORIES
// ============================================

/*
Sorting: from-purple-500 to-pink-500
Searching: from-blue-500 to-cyan-500
Graph: from-green-500 to-teal-500
Tree: from-yellow-500 to-orange-500
Stack: from-red-500 to-pink-500
Queue: from-indigo-500 to-purple-500
LinkedList: from-cyan-500 to-blue-500
ShortestPath: from-emerald-500 to-green-500
*/

export default ModernAlgorithmPage;
