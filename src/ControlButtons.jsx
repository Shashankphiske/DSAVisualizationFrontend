const ControlButtons = ({ onPlay, onPause, onReplay, disabled }) => {
  return (
    <div className="flex justify-center gap-4 mb-6">
      <button
        onClick={onPlay}
        disabled={disabled}
        className="px-6 py-2 bg-green-600 rounded hover:bg-green-700 disabled:bg-gray-600"
      >
        ▶ Play
      </button>

      <button
        onClick={onPause}
        className="px-6 py-2 bg-yellow-500 rounded hover:bg-yellow-600"
      >
        ⏸ Pause
      </button>

      <button
        onClick={onReplay}
        className="px-6 py-2 bg-red-600 rounded hover:bg-red-700"
      >
        🔁 Replay
      </button>
    </div>
  );
};

export default ControlButtons;
