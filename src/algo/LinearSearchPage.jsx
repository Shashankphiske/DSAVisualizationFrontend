import { useState } from "react";
import { MoveRight, Dices } from "lucide-react";
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
  "function linearSearch(arr, target) {",
  "  for (let i = 0; i < arr.length; i++) {",
  "    if (arr[i] === target) {",
  "      return i;",
  "    }",
  "  }",
  "  return -1;",
  "}",
];

const getHighlightedLine = (step) => {
  if (!step) return null;
  if (step.found) return 3;
  if (step.index >= 0) return 2;
  return 6;
};

const explain = (step, target) => {
  if (!step) return "";
  if (step.found) return `Found ${target} at index ${step.index}.`;
  return `Checking index ${step.index}: ${step.arr?.[step.index]} ≠ ${target}`;
};

const fetchSteps = async (arr, num) => {
  const res = await fetch("http://localhost:3000/searchingalgo/linearsearch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ arr: JSON.stringify(arr), num: parseInt(num) }),
  });
  return await res.json();
};

const LinearSearchPage = () => {
  const [input, setInput] = useState("12,45,23,67,89,34,56,78,90,11");
  const [target, setTarget] = useState("56");
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
    const arr = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 99));
    setInput(arr.join(","));
    setTarget(String(arr[Math.floor(Math.random() * arr.length)]));
    player.reset();
  };

  const viewArr = step?.arr ?? input.split(",").map(Number).filter((n) => !isNaN(n));
  const idx = step?.index ?? -1;
  const found = step?.found;

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={MoveRight}
        title="Linear Search"
        description="Sequentially scan each element of an array until the target is found or the end is reached."
        complexity={{ time: "O(n)", space: "O(1)" , timeReason: "Linear search has no shortcut — without ordering or indexing, we must check elements one by one. In the worst case the target is the last element or not present at all, forcing all n comparisons.", spaceReason: "We only need a loop counter to scan the array; no auxiliary lists, sets, or hash maps. Memory usage stays constant regardless of array size." }}
        badge={<span>Searching Algorithm</span>}
      />

      <section className="card p-5 space-y-4">
        <div className="card-title">Input</div>
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 w-full">
            <label className="field-label">Array</label>
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
            {viewArr.map((value, i) => {
              let cls = "sbox sbox-default";
              if (step) {
                if (i === idx && found) cls = "sbox sbox-found";
                else if (i === idx) cls = "sbox sbox-mid";
                else if (i < idx) cls = "sbox sbox-default sbox-eliminated";
              }
              return <div key={i} className={cls}>{value}</div>;
            })}
          </div>
          <Legend
            items={[
              { label: "Unchecked", color: "hsl(220 30% 19%)" },
              { label: "Current",   color: "hsl(38 92% 50%)" },
              { label: "Found",     color: "hsl(168 100% 42%)" },
              { label: "Skipped",   color: "hsl(220 30% 19%)" },
            ]}
          />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={getHighlightedLine(step)} title="linear-search.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="linear-search" />
      <LeetCodeSection slug="linearSearch" />
    </AlgoPageShell>
  );
};

export default LinearSearchPage;
