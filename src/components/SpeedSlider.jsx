import React from "react";

const SpeedSlider = ({ speed, onSpeedChange }) => {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label htmlFor="speed-slider" className="text-lg font-semibold text-gray-300">
            Animation Speed
          </label>
          <span className="text-2xl font-bold text-blue-400">{speed.toFixed(1)}x</span>
        </div>

        <div className="flex items-center gap-4">
          <input
            id="speed-slider"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="slider flex-1 h-2 rounded-lg appearance-none cursor-pointer"
            aria-label="Animation speed control"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((speed - 0.5) / 1.5) * 100}%, #4b5563 ${((speed - 0.5) / 1.5) * 100}%, #4b5563 100%)`,
            }}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => onSpeedChange(0.5)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              Math.abs(speed - 0.5) < 0.01
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            aria-label="Set speed to 0.5x"
          >
            Slow
          </button>
          <button
            onClick={() => onSpeedChange(1)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              Math.abs(speed - 1) < 0.01
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            aria-label="Set speed to 1x"
          >
            Normal
          </button>
          <button
            onClick={() => onSpeedChange(1.5)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              Math.abs(speed - 1.5) < 0.01
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            aria-label="Set speed to 1.5x"
          >
            Fast
          </button>
          <button
            onClick={() => onSpeedChange(2)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              Math.abs(speed - 2) < 0.01
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            aria-label="Set speed to 2x"
          >
            2x
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeedSlider;
