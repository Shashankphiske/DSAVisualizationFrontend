import { useState } from "react";
import { Shuffle, Dices } from "lucide-react";
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
  "function mergeSort(arr) {",
  "  if (arr.length <= 1) return arr;",
  "  const mid = Math.floor(arr.length / 2);",
  "  const left = mergeSort(arr.slice(0, mid));",
  "  const right = mergeSort(arr.slice(mid));",
  "  return merge(left, right);",
  "}",
  "function merge(left, right) {",
  "  const result = [];",
  "  while (left.length && right.length) {",
  "    if (left[0] <= right[0]) result.push(left.shift());",
  "    else result.push(right.shift());",
  "  }",
  "  return [...result, ...left, ...right];",
  "}",
];

const getHighlightedLine = (step) => {
  if (!step) return null;
  if (!step.comparing?.length) return 13;
  if (step.swapped && step.mergedIndexes?.length > 0) return 10;
  return 9;
};

const explain = (step) => {
  if (!step) return "";
  const arr = step.arr || [];
  if (!step.comparing?.length) return "Merge Sort completed.";
  if (step.swapped && step.mergedIndexes?.length > 0) {
    const idx = step.mergedIndexes[step.mergedIndexes.length - 1];
    return `Placed ${arr[idx]} into merged position ${idx}`;
  }
  const [i, j] = step.comparing;
  return `Comparing ${arr[i]} and ${arr[j]} during merge`;
};

const fetchSteps = async (arr) => {
  const res = await fetch("http://localhost:3000/sortingalgo/mergesort", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ arr: JSON.stringify(arr) }),
  });
  return await res.json();
};

const MergeSortPage = () => {
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

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Shuffle}
        title="Merge Sort"
        description="A divide-and-conquer algorithm that splits the array in half, recursively sorts each half, then merges them back into a single sorted sequence."
        complexity={{ time: "O(n log n)", space: "O(n)", stable: "Stable" , timeReason: "Merge sort recursively halves the array, producing log₂ n levels. At every level the merge step touches every element once, doing O(n) work. Multiplying the levels by per-level cost gives n·log n total operations regardless of input order.", spaceReason: "Merging two sorted halves cannot be done in place efficiently — we copy elements into an auxiliary buffer of size n, then write them back. That buffer dominates memory usage, giving O(n) extra space." }}
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
            sorted={step?.mergedIndexes || []}
            swapped={step?.swapped}
          />
          <Legend
            items={[
              { label: "Unsorted",  color: "hsl(210 70% 55%)" },
              { label: "Comparing", color: "hsl(40 90% 55%)" },
              { label: "Merged",    color: "hsl(150 65% 50%)" },
            ]}
          />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={getHighlightedLine(step)} title="merge-sort.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="merge-sort" />
      <LeetCodeSection slug="mergeSort" />
    </AlgoPageShell>
  );
};

export default MergeSortPage;
