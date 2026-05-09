import { useState } from "react";
import { ArrowDownNarrowWide, Dices } from "lucide-react";
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
  "function insertionSort(arr) {",
  "  for (let i = 1; i < arr.length; i++) {",
  "    let key = arr[i];",
  "    let j = i - 1;",
  "    while (j >= 0 && arr[j] > key) {",
  "      arr[j + 1] = arr[j];",
  "      j--;",
  "    }",
  "    arr[j + 1] = key;",
  "  }",
  "  return arr;",
  "}",
];

const getHighlightedLine = (step) => {
  if (!step) return null;
  if (!step.comparing?.length) return 10;
  return step.swapped ? 5 : 4;
};

const explain = (step) => {
  if (!step) return "";
  const arr = step.arr || [];
  if (!step.comparing?.length) return "Insertion Sort completed.";
  if (step.swapped) return "Shifting larger element to the right";
  return `Comparing key ${arr[step.keyindex]} with sorted prefix`;
};

const fetchSteps = async (arr) => {
  const res = await fetch("http://localhost:3000/sortingalgo/insertionsort", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ arr: JSON.stringify(arr) }),
  });
  return await res.json();
};

const InsertionSortPage = () => {
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
  const pivot = step?.keyindex != null ? [step.keyindex] : [];

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={ArrowDownNarrowWide}
        title="Insertion Sort"
        description="Builds the final sorted array one element at a time by inserting each new element into its correct position in the sorted prefix."
        complexity={{ time: "O(n²)", space: "O(1)", stable: "Stable" , timeReason: "For each of the n elements we may shift it past every previously sorted item to find its position. In the worst case (reverse-sorted input) shifts on pass i can be i, summing to 1+2+…+(n−1) = n(n−1)/2 → O(n²). Best case on already-sorted input is O(n).", spaceReason: "Insertion sort works in place — it shifts elements within the original array and uses one temporary 'key' variable per iteration. No auxiliary array is allocated." }}
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
          <BarsViz values={viewArr} comparing={comparing} pivotIndexes={pivot} swapped={step?.swapped} />
          <Legend
            items={[
              { label: "Unsorted",  color: "hsl(210 70% 55%)" },
              { label: "Key",       color: "hsl(262 80% 55%)" },
              { label: "Comparing", color: "hsl(40 90% 55%)" },
              { label: "Shifting",  color: "hsl(0 72% 55%)" },
            ]}
          />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={getHighlightedLine(step)} title="insertion-sort.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="insertion-sort" />
      <LeetCodeSection slug="insertionSort" />
    </AlgoPageShell>
  );
};

export default InsertionSortPage;
