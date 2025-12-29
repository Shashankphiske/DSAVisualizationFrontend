// Reusable template styles for algorithm visualization pages
// This ensures consistent modern UI across all algorithm pages

export const AlgoPageHeader = ({ icon, title, description, complexity }) => (
  <div className="text-center max-w-4xl mx-auto mb-8">
    <div className="inline-block mb-4">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center glow">
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      <span className="gradient-text">{title}</span>
    </h1>
    
    <div className="glass-card rounded-2xl p-6 text-left">
      <h2 className="text-xl font-semibold mb-3 gradient-text-secondary">About {title}</h2>
      <p className="text-gray-300 text-sm mb-3 leading-relaxed">
        {description}
      </p>
      {complexity && (
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="glass px-4 py-2 rounded-lg">
            <span className="text-gray-400 text-xs">Time Complexity</span>
            <div className="text-yellow-400 font-semibold">{complexity.time}</div>
          </div>
          <div className="glass px-4 py-2 rounded-lg">
            <span className="text-gray-400 text-xs">Space Complexity</span>
            <div className="text-green-400 font-semibold">{complexity.space}</div>
          </div>
          {complexity.stable && (
            <div className="glass px-4 py-2 rounded-lg">
              <span className="text-gray-400 text-xs">Stability</span>
              <div className="text-blue-400 font-semibold">{complexity.stable}</div>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);

export const AlgoControls = ({ 
  input, 
  setInput, 
  isPlaying, 
  error, 
  handlePlay, 
  handlePause, 
  handleReplay,
  inputLabel = "Enter array (comma-separated numbers)",
  placeholder = "e.g., 5,3,8,4,2",
  examples = "Try: 5,3,8,4,2 or 64,34,25,12,22,11,90"
}) => (
  <div className="max-w-5xl mx-auto mb-8">
    <div className="glass-card rounded-2xl p-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-between">
        <div className="flex-1 w-full lg:w-auto">
          <label className="text-sm text-gray-400 mb-2 block">
            {inputLabel}
          </label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isPlaying}
            placeholder={placeholder}
            className="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-purple-500 focus:outline-none transition-all text-white placeholder-gray-500"
          />
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          {examples && <p className="text-xs text-gray-500 mt-2">{examples}</p>}
        </div>

        <div className="flex flex-wrap gap-3">
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

          <button 
            onClick={handlePause} 
            disabled={!isPlaying} 
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold hover:scale-105 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4zM13 4a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2h-2a2 2 0 01-2-2V4z" />
            </svg>
            Pause
          </button>

          <button 
            onClick={handleReplay} 
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 font-semibold hover:scale-105 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Replay
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const AlgoExplanation = ({ explanation, isPlaying }) => (
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
);

export const AlgoVisualizationContainer = ({ children, className = "" }) => (
  <div className="max-w-6xl mx-auto">
    <div className={`glass-card rounded-2xl p-8 ${className}`}>
      {children}
    </div>
  </div>
);
