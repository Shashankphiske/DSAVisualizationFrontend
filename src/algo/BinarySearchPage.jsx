import { useState } from "react";
import { Binary, Dices } from "lucide-react";
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
  "function binarySearch(arr, target) {",
  "  let left = 0, right = arr.length - 1;",
  "  while (left <= right) {",
  "    const mid = Math.floor((left + right) / 2);",
  "    if (arr[mid] === target) return mid;",
  "    if (arr[mid] < target) left = mid + 1;",
  "    else right = mid - 1;",
  "  }",
  "  return -1;",
  "}",
];

const getHighlightedLine = (step) => {
  if (!step) return null;
  if (step.found) return 4;
  if (step.left !== undefined) return 3;
  return 8;
};

const explain = (step, target) => {
  if (!step) return "";
  if (step.found) return `Found ${target} at index ${step.mid}.`;
  return `Checking mid=${step.mid}, value=${step.arr?.[step.mid]} — narrowing search range.`;
};

const fetchSteps = async (arr, num) => {
  const res = await fetch("http://localhost:3000/searchingalgo/binarysearch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ arr: JSON.stringify(arr), num: parseInt(num) }),
  });
  return await res.json();
};

const BinarySearchPage = () => {
  const [input, setInput] = useState("2,5,8,12,16,23,38,45,56,67,78");
  const [target, setTarget] = useState("23");
  const player = useAlgoPlayer();
  const { step, isPlaying, error, setError } = player;

  const handlePlay = async () => {
    if (player.steps.length === 0) {
      const parsed = input.split(",").map((n) => Number(n.trim())).filter((n) => !isNaN(n));
      if (parsed.length === 0) { setError("Invalid array."); return; }
      if (isNaN(Number(target))) { setError("Invalid target."); return; }
      const data = await player.load(() => fetchSteps(parsed, target));
      if (!data) return;
    }
    player.play();
  };

  const randomize = () => {
    const n = 9 + Math.floor(Math.random() * 4);
    const arr = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 99)).sort((a, b) => a - b);
    setInput(arr.join(","));
    setTarget(String(arr[Math.floor(Math.random() * arr.length)]));
    player.reset();
  };

  const viewArr = step?.arr ?? input.split(",").map(Number).filter((n) => !isNaN(n));
  const left = step?.left ?? -1;
  const right = step?.right ?? -1;
  const mid = step?.mid ?? -1;
  const found = step?.found;

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Binary}
        title="Binary Search"
        description="Locate a target in a sorted array by repeatedly halving the search interval. Logarithmic time."
        complexity={{ time: "O(log n)", space: "O(1)" , timeReason: "Each comparison eliminates half of the remaining range. Starting from n candidates, the size sequence is n → n/2 → n/4 → … → 1, which takes log₂ n halvings. So even for a billion items only ~30 steps are needed.", spaceReason: "The iterative implementation keeps just three integer indices (low, high, mid). It does not recurse, allocate sub-arrays, or grow any structure with input size." }}
        badge={<span>Searching Algorithm</span>}
      />

      <section className="card p-5 space-y-4">
        <div className="card-title">Input</div>
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 w-full">
            <label className="field-label">Sorted Array</label>
            <input className="input" value={input} onChange={(e) => setInput(e.target.value)} disabled={isPlaying} />
          </div>
          <div className="w-full sm:w-32">
            <label className="field-label">Target</label>
            <input className="input" value={target} onChange={(e) => setTarget(e.target.value)} disabled={isPlaying} />
          </div>
          <button className="btn" onClick={randomize} disabled={isPlaying}>
            <Dices size={15} /> Random
          </button>
        </div>
        {error && <p className="text-xs text-[hsl(var(--accent-4))] font-mono">{error}</p>}
      </section>

      <section className="card p-5 space-y-4">
        <ControlBar player={player} onPlay={handlePlay} />
        <ExplanationBox text={explain(step, target)} isPlaying={isPlaying} />
      </section>

      <section className="grid lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <div className="card-title mb-4">Visualization</div>
          <div className="flex flex-wrap items-center justify-center gap-3 min-h-[280px]">
            {viewArr.map((value, idx) => {
              let cls = "sbox sbox-default";
              if (step) {
                if (idx < left || idx > right) cls = "sbox sbox-default sbox-eliminated";
                else if (idx === mid && found) cls = "sbox sbox-found";
                else if (idx === mid) cls = "sbox sbox-mid";
                else if (idx >= left && idx <= right) cls = "sbox sbox-range";
              }
              return <div key={idx} className={cls}>{value}</div>;
            })}
          </div>
          <Legend
            items={[
              { label: "Search range", color: "hsl(249 92% 70%)" },
              { label: "Mid",          color: "hsl(38 92% 50%)" },
              { label: "Found",        color: "hsl(168 100% 42%)" },
              { label: "Eliminated",   color: "hsl(220 30% 19%)" },
            ]}
          />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={getHighlightedLine(step)} title="binary-search.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="binary-search" />
      <LeetCodeSection slug="binarySearch" />
    </AlgoPageShell>
  );
};

export default BinarySearchPage;
