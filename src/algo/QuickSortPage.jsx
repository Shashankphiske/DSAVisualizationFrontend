import { useState } from "react";
import { Zap, Dices } from "lucide-react";
import CodeViewer from "../CodeViewer";
import { AlgoPageHeader, AlgoPageShell } from "../AlgoPageTemplate";
import ControlBar from "../components/ControlBar";
import ExplanationBox from "../components/ExplanationBox";
import Legend from "../components/Legend";
import BarsViz from "../components/BarsViz";
import useAlgoPlayer from "../hooks/useAlgoPlayer";
import LeetCodeSection from "../components/LeetCodeSection";
import MeasuredComplexity from "../components/MeasuredComplexity";
import VideoEmbed from "../components/VideoEmbed";

const CODE = [
  "function quickSort(arr, lo, hi) {",
  "  if (lo < hi) {",
  "    const p = partition(arr, lo, hi);",
  "    quickSort(arr, lo, p - 1);",
  "    quickSort(arr, p + 1, hi);",
  "  }",
  "}",
  "function partition(arr, lo, hi) {",
  "  const pivot = arr[hi];",
  "  let i = lo - 1;",
  "  for (let j = lo; j < hi; j++) {",
  "    if (arr[j] < pivot) {",
  "      i++;",
  "      [arr[i], arr[j]] = [arr[j], arr[i]];",
  "    }",
  "  }",
  "  [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];",
  "  return i + 1;",
  "}",
];

const getHighlightedLine = (step) => {
  if (!step) return null;
  if (!step.comparing?.length) return 7;
  return step.swapped ? 13 : 11;
};

const explain = (step) => {
  if (!step) return "";
  const arr = step.arr || [];
  if (!step.comparing?.length) return "Quick Sort completed.";
  if (step.swapped) return "Swapping element below pivot";
  const [i, j] = step.comparing;
  return `Comparing arr[${j}]=${arr[j]} with pivot`;
};

const fetchSteps = async (arr) => {
  const res = await fetch("http://localhost:3000/sortingalgo/quicksort", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ arr: JSON.stringify(arr) }),
  });
  return await res.json();
};

const QuickSortPage = () => {
  const [input, setInput] = useState("5,3,8,4,2,7,1,6");
  const player = useAlgoPlayer();
  const { step, isPlaying, error, setError } = player;

  const handlePlay = async () => {
    if (player.steps.length === 0) {
      const parsed = input.split(",").map((n) => Number(n.trim())).filter((n) => !isNaN(n));
      if (parsed.length === 0) { setError("Please enter at least one number."); return; }
      const data = await player.load(() => fetchSteps(parsed));
      if (!data) return;
    }
    player.play();
  };

  const randomize = () => {
    const n = 6 + Math.floor(Math.random() * 4);
    const arr = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 99));
    setInput(arr.join(","));
    player.reset();
  };

  const viewArr = step?.arr ?? input.split(",").map(Number).filter((n) => !isNaN(n));
  const pivot = step?.pivotIndex != null ? [step.pivotIndex] : [];

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Zap}
        title="Quick Sort"
        description="Picks a pivot, partitions the array around it, and recursively sorts each side. Highly efficient on average but unstable."
        complexity={{ time: "O(n log n)", space: "O(log n)", stable: "Unstable" , timeReason: "Each partition step scans its slice in O(n). With a good pivot the array splits roughly in half, producing log n levels of recursion → n·log n total. On bad pivots (already sorted with last-element pivot) splits become 1 vs n−1 and degrade to O(n²).", spaceReason: "Quick sort sorts in place; the only extra memory is the recursion call stack. With balanced partitions the stack depth is log n; in the worst case it can grow to n." }}
        badge={<span>Sorting Algorithm</span>}
      />

      <section className="card p-5 space-y-4">
        <div className="card-title">Input</div>
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 w-full">
            <label className="field-label">Array (comma-separated)</label>
            <input className="input" value={input} onChange={(e) => setInput(e.target.value)} disabled={isPlaying} placeholder="e.g. 5,3,8,4,2" />
          </div>
          <button className="btn" onClick={randomize} disabled={isPlaying}>
            <Dices size={15} /> Random
          </button>
        </div>
        {error && <p className="text-xs text-[hsl(var(--accent-4))] font-mono">{error}</p>}
      </section>

      <section className="card p-5 space-y-4">
        <ControlBar player={player} onPlay={handlePlay} />
        <ExplanationBox text={explain(step)} isPlaying={isPlaying} />
      </section>

      <section className="grid lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <div className="card-title mb-4">Visualization</div>
          <BarsViz
            values={viewArr}
            comparing={step?.comparing || []}
            pivotIndexes={pivot}
            swapped={step?.swapped}
          />
          <Legend
            items={[
              { label: "Unsorted",  color: "hsl(210 70% 55%)" },
              { label: "Pivot",     color: "hsl(262 80% 55%)" },
              { label: "Comparing", color: "hsl(40 90% 55%)" },
              { label: "Swapping",  color: "hsl(0 72% 55%)" },
            ]}
          />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={getHighlightedLine(step)} title="quick-sort.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="quick-sort" />
      <LeetCodeSection slug="quickSort" />
    </AlgoPageShell>
  );
};

export default QuickSortPage;
