import { useState } from "react";
import { Hash, Dices } from "lucide-react";
import CodeViewer from "../CodeViewer";
import {
  AlgoPageHeader,
  AlgoPageShell,
} from "../AlgoPageTemplate";
import ControlBar from "../components/ControlBar";
import ExplanationBox from "../components/ExplanationBox";
import Legend from "../components/Legend";
import useAlgoPlayer from "../hooks/useAlgoPlayer";
import LeetCodeSection from "../components/LeetCodeSection";
import MeasuredComplexity from "../components/MeasuredComplexity";
import VideoEmbed from "../components/VideoEmbed";

const CODE = [
  "function bubbleSort(arr) {",
  "  for (let i = 0; i < arr.length - 1; i++) {",
  "    for (let j = 0; j < arr.length - i - 1; j++) {",
  "      if (arr[j] > arr[j + 1]) {",
  "        let temp = arr[j];",
  "        arr[j] = arr[j + 1];",
  "        arr[j + 1] = temp;",
  "      }",
  "    }",
  "  }",
  "  return arr;",
  "}",
];

const getHighlightedLine = (step) => {
  if (!step) return null;
  if (!step.comparing || step.comparing.length === 0) return 10;
  return step.swapped ? 4 : 3;
};

const explain = (step, baseArr) => {
  if (!step) return "";
  const arr = step.arr || baseArr;
  if (!step.comparing || step.comparing.length === 0) return "Bubble Sort completed.";
  const [i, j] = step.comparing;
  return step.swapped
    ? `Swapped ${arr[j]} and ${arr[i]}`
    : `Comparing ${arr[i]} and ${arr[j]} — no swap`;
};

const fetchSteps = async (arr) => {
  const res = await fetch("http://localhost:3000/sortingalgo/bubblesort", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ arr: JSON.stringify(arr) }),
  });
  return await res.json();
};

const BubbleSortPage = () => {
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

  // derive view
  const viewArr = step?.arr ?? input.split(",").map(Number).filter((n) => !isNaN(n));
  const comparing = step?.comparing || [];
  const sorted = step?.sorted || [];
  const swapped = step?.swapped;
  const max = Math.max(1, ...viewArr);

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Hash}
        title="Bubble Sort"
        description="Repeatedly compares adjacent elements and swaps them if they're in the wrong order, bubbling the largest unsorted value to the end on each pass."
        complexity={{ time: "O(n²)", space: "O(1)", stable: "Stable" , timeReason: "The outer loop runs n−1 times. On pass i the inner loop performs n−1−i comparisons. Summing 1+2+…+(n−1) gives n(n−1)/2, which simplifies to O(n²). So doubling the input quadruples the work.", spaceReason: "All swaps happen inside the input array and use one temporary variable. No auxiliary array, recursion, or queue is involved, so extra memory is constant." }}
        badge={<><span>Sorting Algorithm</span></>}
      />

      {/* INPUT */}
      <section className="card p-5 space-y-4">
        <div className="card-title">Input</div>
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 w-full">
            <label className="field-label">Array (comma-separated)</label>
            <input
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isPlaying}
              placeholder="e.g. 5,3,8,4,2"
            />
          </div>
          <button className="btn" onClick={randomize} disabled={isPlaying}>
            <Dices size={15} /> Random
          </button>
        </div>
        {error && <p className="text-xs text-[hsl(var(--accent-4))] font-mono">{error}</p>}
      </section>

      {/* CONTROLS */}
      <section className="card p-5 space-y-4">
        <ControlBar player={player} onPlay={handlePlay} />
        <ExplanationBox text={explain(step, viewArr)} isPlaying={isPlaying} />
      </section>

      {/* SPLIT: VIZ + CODE */}
      <section className="grid lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <div className="card-title mb-4">Visualization</div>
          <div className="flex items-end justify-center gap-2 h-[280px]">
            {viewArr.map((value, i) => {
              let cls = "bar bar-default";
              if (sorted.includes(i)) cls = "bar bar-sorted";
              else if (comparing.includes(i)) cls = swapped ? "bar bar-swap" : "bar bar-compare";
              const h = (value / max) * 100;
              return (
                <div key={i} className="bar-wrap" style={{ height: "260px" }}>
                  <span className="bar-label">{value}</span>
                  <div className={cls} style={{ height: `${h}%`, width: 40 }} />
                </div>
              );
            })}
          </div>
          <Legend
            items={[
              { label: "Unsorted",  color: "hsl(210 70% 55%)" },
              { label: "Comparing", color: "hsl(40 90% 55%)" },
              { label: "Swapping",  color: "hsl(0 72% 55%)" },
              { label: "Sorted",    color: "hsl(150 65% 50%)" },
            ]}
          />
        </div>

        <div className="card overflow-hidden">
          <CodeViewer
            code={CODE}
            highlightedLine={getHighlightedLine(step)}
            title="bubble-sort.js"
          />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="bubble-sort" />
      <LeetCodeSection slug="bubbleSort" />
    </AlgoPageShell>
  );
};

export default BubbleSortPage;
