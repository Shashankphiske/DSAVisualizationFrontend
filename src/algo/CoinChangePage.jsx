import { useState } from "react";
import { Coins } from "lucide-react";
import CodeViewer from "../CodeViewer";
import { AlgoPageHeader, AlgoPageShell } from "../AlgoPageTemplate";
import ControlBar from "../components/ControlBar";
import ExplanationBox from "../components/ExplanationBox";
import Legend from "../components/Legend";
import useAlgoPlayer from "../hooks/useAlgoPlayer";
import LeetCodeSection from "../components/LeetCodeSection";
import MeasuredComplexity from "../components/MeasuredComplexity";
import VideoEmbed from "../components/VideoEmbed";

const CODE = [
  "function coinChange(coins, amount) {",
  "  const dp = Array(amount + 1).fill(Infinity);",
  "  dp[0] = 0;",
  "  for (let i = 1; i <= amount; i++) {",
  "    for (const coin of coins) {",
  "      if (i - coin >= 0) {",
  "        const cand = dp[i - coin] + 1;",
  "        if (cand < dp[i]) dp[i] = cand;",
  "      }",
  "    }",
  "  }",
  "  return dp[amount] === Infinity ? -1 : dp[amount];",
  "}",
];

const lineFor = (step) => {
  const e = (step?.explanation || "").toLowerCase();
  if (e.includes("dp[0]") || e.includes("initialize")) return 1;
  if (step?.currentAmount !== undefined) return 7;
  if (e.includes("return") || e.includes("result")) return 11;
  return null;
};

const fetchSteps = async (coins, amount) => {
  const res = await fetch("http://localhost:3000/dynamicalgo/coinchange", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ coins, amount }),
  });
  return res.json();
};

const CoinChangePage = () => {
  const [coinsInput, setCoinsInput] = useState("1,2,5");
  const [amount, setAmount] = useState(11);
  const player = useAlgoPlayer();
  const { step, isPlaying, error, setError } = player;

  const handlePlay = async () => {
    if (player.steps.length === 0) {
      const coins = coinsInput.split(",").map((c) => Number(c.trim())).filter((c) => !isNaN(c) && c > 0);
      if (coins.length === 0) { setError("Enter at least one coin"); return; }
      try {
        const data = await fetchSteps(coins, amount);
        const loaded = await player.load(data.steps || []);
        if (!loaded) return;
      } catch {
        setError("Failed to load steps.");
        return;
      }
    }
    player.play();
  };

  const dp = step?.dpSnapshot ?? Array(amount + 1).fill(Infinity);
  const explain = step?.explanation || "";
  const highlightedLine = step ? lineFor(step) : null;
  const activeIdx = step?.currentAmount;

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Coins}
        title="Coin Change (DP)"
        description="Find the minimum number of coins needed to make a target amount, using bottom-up DP."
        complexity={{ time: "O(n × m)", space: "O(n)" , timeReason: "We build dp[0..n] where dp[a] = minimum coins for amount a. For each of the n+1 amounts we examine all m coin denominations and take the best option. That's (n+1)·m constant-time operations → O(n·m).", spaceReason: "Only one 1D DP table of size n+1 is needed because each entry depends solely on smaller amounts. No 2D table, recursion stack, or memoization map is required." }}
        badge="Dynamic Programming"
      />

      <section className="card p-5 space-y-4">
        <div className="card-title">Input</div>
        <div className="grid sm:grid-cols-[1fr_140px] gap-3">
          <div><label className="field-label">Coins</label><input className="input" value={coinsInput} onChange={(e) => setCoinsInput(e.target.value)} disabled={isPlaying} placeholder="1,2,5" /></div>
          <div><label className="field-label">Amount</label><input className="input" type="number" min="0" value={amount} onChange={(e) => setAmount(Number(e.target.value))} disabled={isPlaying} /></div>
        </div>
        {error && <p className="text-xs text-[hsl(var(--accent-4))] font-mono">{error}</p>}
      </section>

      <section className="card p-5 space-y-4">
        <ControlBar player={player} onPlay={handlePlay} />
        <ExplanationBox text={explain} isPlaying={isPlaying} />
      </section>

      <section className="grid lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <div className="card-title mb-4">DP Table</div>
          <div className="flex flex-wrap justify-center gap-2 min-h-[180px]">
            {dp.map((v, i) => {
              const isActive = activeIdx === i;
              let cls = "node-cell";
              if (isActive) cls += " node-active";
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-mono text-[hsl(var(--text-3))]">dp[{i}]</span>
                  <div className={cls}>{v === Infinity ? "∞" : v}</div>
                </div>
              );
            })}
          </div>
          <Legend items={[
            { label: "Idle",     color: "hsl(220 30% 19%)" },
            { label: "Updating", color: "hsl(38 92% 50%)" },
          ]} />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={highlightedLine} title="coin-change.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="coin-change" />
      <LeetCodeSection slug="coinChange" />
    </AlgoPageShell>
  );
};

export default CoinChangePage;
