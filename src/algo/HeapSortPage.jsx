import React, { useState } from "react";
import { Mountain, Dices } from "lucide-react";
import CodeViewer from "../CodeViewer";
import { AlgoPageHeader, AlgoPageShell } from "../AlgoPageTemplate";
import ControlBar from "../components/ControlBar";
import ExplanationBox from "../components/ExplanationBox";
import Legend from "../components/Legend";
import useAlgoPlayer from "../hooks/useAlgoPlayer";
import LeetCodeSection from "../components/LeetCodeSection";
import MeasuredComplexity from "../components/MeasuredComplexity";
import VideoEmbed from "../components/VideoEmbed";

// SVG layout constants
const SVG_W = 520;
const SVG_H = 360;
const LEVEL_H = 80;
const NODE_R = 22;

const getSvgPosition = (index) => {
  const level = Math.floor(Math.log2(index + 1));
  const levelStart = Math.pow(2, level) - 1;
  const posInLevel = index - levelStart;
  const nodesInLevel = Math.pow(2, level);
  const gap = SVG_W / nodesInLevel;
  return { x: gap * posInLevel + gap / 2, y: level * LEVEL_H + 50 };
};

const HEAP_SORT_CODE = [
  "function heapSort(arr) {",
  "  const n = arr.length;",
  "  // Build max heap",
  "  for (let i = floor(n/2)-1; i >= 0; i--)",
  "    heapify(arr, n, i);",
  "  // Extract one by one",
  "  for (let i = n-1; i > 0; i--) {",
  "    swap(arr[0], arr[i]);",
  "    heapify(arr, i, 0);",
  "  }",
  "}",
  "",
  "function heapify(arr, n, i) {",
  "  let largest = i;",
  "  let left = 2*i+1, right = 2*i+2;",
  "  if (left < n && arr[left] > arr[largest])",
  "    largest = left;",
  "  if (right < n && arr[right] > arr[largest])",
  "    largest = right;",
  "  if (largest !== i) {",
  "    swap(arr[i], arr[largest]);",
  "    heapify(arr, n, largest);",
  "  }",
  "}",
];

const getHighlightedLine = (step) => {
  if (!step) return null;
  switch (step.phase) {
    case "build_heap": return 3;
    case "heapify_compare_left": return 15;
    case "heapify_compare_right": return 17;
    case "heapify_swap": return 20;
    case "extract_swap": return 7;
    case "done": return 9;
    default: return null;
  }
};

const generateHeapSortSteps = (input) => {
  const steps = [];
  const a = [...input];
  const n = a.length;

  const heapify = (size, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < size) {
      steps.push({ arr: [...a], comparing: [i, left], heapRange: size, swapped: false, phase: "heapify_compare_left" });
      if (a[left] > a[largest]) largest = left;
    }
    if (right < size) {
      steps.push({ arr: [...a], comparing: [largest, right], heapRange: size, swapped: false, phase: "heapify_compare_right" });
      if (a[right] > a[largest]) largest = right;
    }
    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      steps.push({ arr: [...a], comparing: [i, largest], heapRange: size, swapped: true, phase: "heapify_swap" });
      heapify(size, largest);
    }
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    steps.push({ arr: [...a], comparing: [], heapRange: n, swapped: false, phase: "build_heap" });
    heapify(n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    steps.push({ arr: [...a], comparing: [0, i], heapRange: i, swapped: true, phase: "extract_swap" });
    heapify(i, 0);
  }
  steps.push({ arr: [...a], comparing: [], heapRange: 0, swapped: false, phase: "done" });
  return steps;
};

const explain = (step) => {
  if (!step) return "";
  if (step.phase === "done") return "Heap Sort complete.";
  if (step.phase === "build_heap") return "Building max heap — heapifying next subtree.";
  if (step.phase === "extract_swap") return "Moved current maximum into its sorted position.";
  const [i, j] = step.comparing || [];
  if (step.swapped) return `Swapped ${step.arr[j]} ↔ ${step.arr[i]} to restore heap property`;
  return `Comparing parent [${i}]=${step.arr[i]} with child [${j}]=${step.arr[j]}`;
};

const HeapSortPage = () => {
  const [input, setInput] = useState("5,3,8,4,2,7,1,6");
  const player = useAlgoPlayer();
  const { step, isPlaying, error, setError } = player;

  const handlePlay = async () => {
    if (player.steps.length === 0) {
      const parsed = input.split(",").map(Number).filter((n) => !isNaN(n));
      if (parsed.length === 0) { setError("Invalid input."); return; }
      if (parsed.length > 15) { setError("Max 15 elements for a clear view."); return; }
      const data = await player.load(() => generateHeapSortSteps(parsed));
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

  const array = step?.arr ?? input.split(",").map(Number).filter((n) => !isNaN(n));
  const comparing = step?.comparing || [];
  const heapRange = step?.heapRange ?? array.length;
  const swapped = step?.swapped;

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Mountain}
        title="Heap Sort"
        description="Builds a max-heap from the array, then repeatedly swaps the root with the last unsorted element, shrinking the heap until the array is sorted."
        complexity={{ time: "O(n log n)", space: "O(1)", stable: "Unstable" , timeReason: "Heap sort has two phases. Building the max-heap with bottom-up heapify costs O(n) (a tighter bound than the naive n·log n). Then we repeatedly extract the max and re-heapify — n extractions, each taking O(log n) — giving an overall O(n log n).", spaceReason: "The heap is encoded inside the input array using index arithmetic (parent = (i−1)/2, children = 2i+1, 2i+2). No auxiliary tree or queue is needed, so extra space is constant." }}
        badge={<span>Sorting Algorithm</span>}
      />

      <section className="card p-5 space-y-4">
        <div className="card-title">Input</div>
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 w-full">
            <label className="field-label">Array (comma-separated, max 15)</label>
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
          <div className="flex items-center justify-center min-h-[360px]">
            <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full max-w-xl" style={{ overflow: "visible" }}>
              {array.map((_, i) => {
                const left = 2 * i + 1;
                const right = 2 * i + 2;
                const from = getSvgPosition(i);
                return (
                  <React.Fragment key={i}>
                    {left < array.length && (
                      <line x1={from.x} y1={from.y} x2={getSvgPosition(left).x} y2={getSvgPosition(left).y} stroke="hsl(var(--border))" strokeWidth="1.5" />
                    )}
                    {right < array.length && (
                      <line x1={from.x} y1={from.y} x2={getSvgPosition(right).x} y2={getSvgPosition(right).y} stroke="hsl(var(--border))" strokeWidth="1.5" />
                    )}
                  </React.Fragment>
                );
              })}

              {array.map((value, index) => {
                const { x, y } = getSvgPosition(index);
                let fill = "hsl(210 70% 55%)";
                let radius = NODE_R;
                let glow = "none";
                if (index >= heapRange) { fill = "hsl(150 65% 45%)"; radius = NODE_R * 0.9; }
                if (comparing.includes(index)) {
                  fill = swapped ? "hsl(0 72% 55%)" : "hsl(40 90% 55%)";
                  radius = NODE_R * 1.2;
                  glow = swapped
                    ? "drop-shadow(0 0 10px hsl(0 72% 55% / 0.9))"
                    : "drop-shadow(0 0 10px hsl(40 90% 55% / 0.9))";
                }
                return (
                  <g key={value} transform={`translate(${x}, ${y})`} style={{ transition: "transform 550ms cubic-bezier(0.4, 0, 0.2, 1)", filter: glow }}>
                    <circle r={radius} fill={fill} style={{ transition: "r 250ms ease, fill 250ms ease" }} />
                    <text textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight="700" fill="hsl(var(--bg))" style={{ userSelect: "none", pointerEvents: "none" }}>
                      {value}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <Legend
            items={[
              { label: "In heap",   color: "hsl(210 70% 55%)" },
              { label: "Comparing", color: "hsl(40 90% 55%)" },
              { label: "Swapping",  color: "hsl(0 72% 55%)" },
              { label: "Sorted",    color: "hsl(150 65% 45%)" },
            ]}
          />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={HEAP_SORT_CODE} highlightedLine={getHighlightedLine(step)} title="heap-sort.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="heap-sort" />
      <LeetCodeSection slug="heapSort" />
    </AlgoPageShell>
  );
};

export default HeapSortPage;
