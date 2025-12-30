import React, { useState, useEffect, useRef } from "react";
import ControlButtons from "../ControlButtons";

const CoinChangePage = () => {
  const [coinsInput, setCoinsInput] = useState("1,2,5");
  const [amount, setAmount] = useState(11);

  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [result, setResult] = useState(null);

  const timerRef = useRef(null);

  /* ================= FETCH ================= */
  const fetchCoinChangeSteps = async (coins) => {
    const res = await fetch("http://localhost:3000/dynamicalgo/coinchange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coins, amount }),
    });

    return res.json();
  };

  /* ================= PLAY ================= */
  const handlePlay = async () => {
    if (isPlaying) return;

    if (steps.length === 0) {
      const coins = coinsInput
        .split(",")
        .map((c) => Number(c.trim()))
        .filter((c) => !isNaN(c) && c > 0);

      if (coins.length === 0) return;

      const data = await fetchCoinChangeSteps(coins);
      setSteps(data.steps || []);
      setResult(data.result);
      setCurrentStepIndex(0);
      setExplanation("Starting Coin Change DP...");
    }

    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
  };

  const handleReplay = () => {
    clearTimeout(timerRef.current);
    setIsPlaying(false);
    setSteps([]);
    setCurrentStepIndex(0);
    setExplanation("");
    setResult(null);
  };

  /* ================= ANIMATION ================= */
  useEffect(() => {
    if (!isPlaying) return;

    if (currentStepIndex < steps.length) {
      timerRef.current = setTimeout(() => {
        setExplanation(steps[currentStepIndex]?.explanation || "");
        setCurrentStepIndex((prev) => prev + 1);
      }, 900);
    } else {
      setExplanation("✅ Coin Change computation complete");
      setIsPlaying(false);
    }

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIndex, steps]);

  /* ================= CURRENT DP ================= */
  const dp =
    steps.length > 0 && currentStepIndex > 0
      ? steps[Math.min(currentStepIndex - 1, steps.length - 1)].dpSnapshot
      : Array(amount + 1).fill(Infinity);

  const activeStep =
    currentStepIndex > 0 ? steps[currentStepIndex - 1] : null;

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-25">
<h1 className="text-3xl font-bold text-center mb-2">
  Coin Change (Minimum Coins – Dynamic Programming)
</h1>

<p className="text-center text-gray-400 max-w-3xl mx-auto mb-4">
  The Coin Change problem is a classic Dynamic Programming problem where the goal
  is to determine the minimum number of coins required to form a given amount.
  The solution builds upon smaller subproblems by storing intermediate results
  in a DP array, avoiding redundant computations.
</p>

<div className="max-w-3xl mx-auto bg-gray-800 rounded-lg p-4 mb-8">
  <p className="text-gray-300 mb-2">
    <span className="font-semibold text-white">Time Complexity:</span> O(n × m),
    where n is the target amount and m is the number of coin denominations.
  </p>
  <p className="text-gray-300">
    <span className="font-semibold text-white">Space Complexity:</span> O(n),
    for storing the DP array of size (amount + 1).
  </p>
</div>



      {/* INPUTS */}
      <div className="flex justify-center gap-6 mb-6 flex-wrap">
        <input
          value={coinsInput}
          disabled={isPlaying}
          onChange={(e) => setCoinsInput(e.target.value)}
          className="px-4 py-2 bg-gray-800 rounded"
          placeholder="Coins (e.g. 1,2,5)"
        />
        <input
          type="number"
          min="0"
          value={amount}
          disabled={isPlaying}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="px-4 py-2 bg-gray-800 rounded w-32"
          placeholder="Amount"
        />
      </div>

      <ControlButtons
        onPlay={handlePlay}
        onPause={handlePause}
        onReplay={handleReplay}
        disabled={isPlaying}
      />

      {/* EXPLANATION */}
      <div className="text-center text-blue-300 mb-6 min-h-[24px]">
        {explanation || "Click Play to start"}
      </div>

      {/* DP ARRAY */}
      <div className="flex justify-center gap-3 flex-wrap">
        {dp.map((value, idx) => {
          let bg = "bg-gray-700";

          if (activeStep?.currentAmount === idx) {
            bg = "bg-yellow-400 text-black";
          }

          if (activeStep?.from === idx) {
            bg = "bg-purple-400 text-black";
          }

          return (
            <div
              key={idx}
              className={`w-16 h-16 flex flex-col items-center justify-center rounded transition-all ${bg}`}
            >
              <div className="text-xs text-gray-300">dp[{idx}]</div>
              <div className="text-xl font-bold">
                {value === Infinity ? "∞" : value}
              </div>
            </div>
          );
        })}
      </div>

      {/* RESULT */}
      {!isPlaying && result !== null && (
        <div className="mt-8 text-center text-green-400 text-xl font-semibold">
          {result === -1
            ? "❌ Amount cannot be formed"
            : `Minimum coins required = ${result}`}
        </div>
      )}
    </div>
  );
};

export default CoinChangePage;
