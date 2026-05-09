import { useState } from "react";
import { Target, Dices } from "lucide-react";
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
  "function selectionSort(arr) {",
  "  for (let i = 0; i < arr.length - 1; i++) {",
  "    let minIdx = i;",
  "    for (let j = i + 1; j < arr.length; j++) {",
  "      if (arr[j] < arr[minIdx]) {",
  "        minIdx = j;",
  "      }",
  "    }",
  "    if (minIdx !== i) {",
  "      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];",
  "    }",
  "  }",
  "  return arr;",
  "}",
];

const getHighlightedLine = (step) => {
  if (!step) return null;
  if (!step.comparing || step.comparing.length === 0) return 13;
  if (step.swapped) return 9;
  return 4;
};

const explain = (step) => {
  if (!step) return "";
  const arr = step.arr || [];
  if (!step.comparing?.length) return "Selection Sort completed.";
  if (step.swapped) return "Swapping current minimum into place";
  const [i, j] = step.comparing;
  return `Comparing arr[${j}]=${arr[j]} with current min arr[${i}]=${arr[i]}`;
};

const fetchSteps = async (arr) => {
  const res = await fetch("http://localhost:3000/sortingalgo/selectionsort", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ arr: JSON.stringify(arr) }),
  });
  return await res.json();
};

const SelectionSortPage = () => {
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
  const comparing = step?.comparing || [];
  const sorted = step?.sorted || [];
  const pivot = step?.selectedmin != null ? [step.selectedmin] : [];

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Target}
        title="Selection Sort"
        description="Repeatedly finds the minimum element in the unsorted portion and swaps it into its final position."
        complexity={{ time: "O(n²)", space: "O(1)", stable: "Unstable" , timeReason: "For each of the n positions we scan the unsorted suffix to find the minimum. The suffixes shrink: n−1, n−2, …, 1 comparisons, summing to n(n−1)/2 → O(n²). The number of comparisons is the same in the best, average, and worst case.", spaceReason: "Sorting is done in place inside the input array; we only track an index for the current minimum and perform direct swaps, so no extra memory grows with n." }}
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
          <BarsViz values={viewArr} comparing={comparing} sorted={sorted} pivotIndexes={pivot} swapped={step?.swapped} />
          <Legend
            items={[
              { label: "Unsorted",  color: "hsl(210 70% 55%)" },
              { label: "Min idx",   color: "hsl(262 80% 55%)" },
              { label: "Comparing", color: "hsl(40 90% 55%)" },
              { label: "Swapping",  color: "hsl(0 72% 55%)" },
              { label: "Sorted",    color: "hsl(150 65% 50%)" },
            ]}
          />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={getHighlightedLine(step)} title="selection-sort.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="selection-sort" />
      <LeetCodeSection slug="selectionSort" />
    </AlgoPageShell>
  );
};

export default SelectionSortPage;
