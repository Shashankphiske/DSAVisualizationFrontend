import { useState } from "react";
import { Sigma } from "lucide-react";
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
  "function fibonacci(n) {",
  "  if (n <= 1) return n;",
  "  const dp = new Array(n + 1);",
  "  dp[0] = 0;",
  "  dp[1] = 1;",
  "  for (let i = 2; i <= n; i++) {",
  "    dp[i] = dp[i - 1] + dp[i - 2];",
  "  }",
  "  return dp[n];",
  "}",
];

const lineFor = (step) => {
  const e = (step?.explanation || "").toLowerCase();
  if (e.includes("base case") || e.includes("n <= 1")) return 1;
  if (e.includes("dp[1]")) return 4;
  if (e.includes("dp[0]")) return 3;
  if (e.includes("initialize") || e.includes("array")) return 2;
  if (step?.index >= 2) return 6;
  if (e.includes("return") || e.includes("result")) return 8;
  return null;
};

const fetchSteps = async (n) => {
  const res = await fetch("http://localhost:3000/dynamicalgo/fibonacci", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ n }),
  });
  return res.json();
};

const FibonacciPage = () => {
  const [n, setN] = useState(8);
  const [result, setResult] = useState(null);
  const player = useAlgoPlayer();
  const { step, index, isPlaying, error, setError } = player;

  const handlePlay = async () => {
    if (player.steps.length === 0) {
      try {
        const data = await fetchSteps(n);
        setResult(data.result);
        const loaded = await player.load(data.steps || []);
        if (!loaded) return;
      } catch {
        setError("Failed to load steps.");
        return;
      }
    }
    player.play();
  };

  const dp = step?.dpSnapshot ?? Array(n + 1).fill(0);
  const explain = step?.explanation || "";
  const highlightedLine = step ? lineFor(step) : null;
  const activeIdx = step?.index;
  const fromSet = new Set(step?.from || []);
  const isComplete = !isPlaying && index === player.steps.length - 1 && result != null;

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Sigma}
        title="Fibonacci (DP)"
        description="Bottom-up dynamic programming computes Fibonacci numbers in linear time by reusing previous results."
        complexity={{ time: "O(n)", space: "O(n)" , timeReason: "Bottom-up DP fills a table dp[0..n] where each entry is computed as dp[i−1] + dp[i−2] — a constant-time lookup. With n entries the total work is linear, a huge improvement over the naive recursion which is O(2ⁿ) due to repeated subproblems.", spaceReason: "We allocate an array of size n+1 to hold every intermediate Fibonacci value so later entries can reuse them. (This can be reduced to O(1) by keeping only the last two values, but the table version is shown here for clarity.)" }}
        badge="Dynamic Programming"
      />

      <section className="card p-5 space-y-4">
        <div className="card-title">Input</div>
        <label className="field-label">n (0 – 20)</label>
        <input className="input max-w-[140px]" type="number" min="0" max="20" value={n} disabled={isPlaying} onChange={(e) => setN(Number(e.target.value))} />
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
              const isFrom = fromSet.has(i);
              let cls = "node-cell";
              if (isActive) cls += " node-active";
              else if (isFrom) cls += " node-secondary";
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-mono text-[hsl(var(--text-3))]">dp[{i}]</span>
                  <div className={cls}>{v}</div>
                </div>
              );
            })}
          </div>
          {isComplete && (
            <div className="mt-5 text-center font-mono text-sm text-[hsl(var(--accent))]">
              Fibonacci({n}) = {result}
            </div>
          )}
          <Legend items={[
            { label: "Idle",       color: "hsl(220 30% 19%)" },
            { label: "Computing",  color: "hsl(38 92% 50%)" },
            { label: "Reading from", color: "hsl(249 92% 70%)" },
          ]} />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={highlightedLine} title="fibonacci.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="dp-fibonacci" />
      <LeetCodeSection slug="fibonacci" />
    </AlgoPageShell>
  );
};

export default FibonacciPage;
