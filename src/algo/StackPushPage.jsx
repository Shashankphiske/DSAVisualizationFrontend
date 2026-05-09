import { useState } from "react";
import { ArrowUpToLine } from "lucide-react";
import CodeViewer from "../CodeViewer";
import { AlgoPageHeader, AlgoPageShell } from "../AlgoPageTemplate";
import ControlBar from "../components/ControlBar";
import ExplanationBox from "../components/ExplanationBox";
import Legend from "../components/Legend";
import StackViz from "../components/StackViz";
import useAlgoPlayer from "../hooks/useAlgoPlayer";
import LeetCodeSection from "../components/LeetCodeSection";
import MeasuredComplexity from "../components/MeasuredComplexity";
import VideoEmbed from "../components/VideoEmbed";

const CODE = [
  "class Stack {",
  "  constructor(capacity = 100) {",
  "    this.items = new Array(capacity);",
  "    this.top = -1;",
  "    this.capacity = capacity;",
  "  }",
  "",
  "  push(value) {",
  "    // 1. Guard against overflow",
  "    if (this.top >= this.capacity - 1) {",
  "      throw new Error('Stack overflow');",
  "    }",
  "",
  "    // 2. Increment top pointer",
  "    this.top = this.top + 1;",
  "",
  "    // 3. Place new value at top index",
  "    this.items[this.top] = value;",
  "",
  "    // 4. Return updated stack",
  "    return this.items.slice(0, this.top + 1);",
  "  }",
  "}",
];

const fetchSteps = async (stack, push) => {
  const res = await fetch("http://localhost:3000/stackalgo/stackpush", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stack, push }),
  });
  return await res.json();
};

const StackPushPage = () => {
  const [initial, setInitial] = useState("10,20,30");
  const [pushVals, setPushVals] = useState("40,50");
  const player = useAlgoPlayer();
  const { step, isPlaying, error, setError } = player;

  const handlePlay = async () => {
    if (player.steps.length === 0) {
      const stack = initial.split(",").map((n) => Number(n.trim())).filter((n) => !isNaN(n));
      const push = pushVals.split(",").map((n) => Number(n.trim())).filter((n) => !isNaN(n));
      if (stack.length === 0 || push.length === 0) { setError("Invalid input"); return; }
      const data = await player.load(() => fetchSteps(stack, push));
      if (!data) return;
    }
    player.play();
  };

  const items = step?.list ?? initial.split(",").map(Number).filter((n) => !isNaN(n));
  const explain = step
    ? (step.action === "push-start" ? `Pushing ${step.pointer?.current}…` : `Pushed ${step.pointer?.next ?? step.pointer?.current}`)
    : "";
  // Map step phases to lines in the expanded class:
  //  - overflow check  -> line 11 ("if (this.top >= ...")
  //  - push-start      -> line 16 ("this.top = this.top + 1;")
  //  - push-complete   -> line 19 ("this.items[this.top] = value;")
  const highlightedLine = step
    ? (step.overflow ? 10
       : step.action === "push-start" ? 15
       : step.action === "push-complete" ? 18
       : 18)
    : null;

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={ArrowUpToLine}
        title="Stack Push"
        description="Add an element onto the top of a stack — the canonical LIFO insertion."
        complexity={{ time: "O(1)", space: "O(1)" , timeReason: "Push performs a fixed sequence of operations: bump the top index by one and write the value into items[top]. None of these depend on how many elements are already in the stack, so the cost stays the same whether the stack holds 10 or 10 million items.", spaceReason: "We don't allocate any helper arrays, queues, or recursion frames. The only new memory is the slot for the value being pushed, which is part of the stack itself — so the *extra* space used by the operation is constant." }}
        badge="Stack"
      />

      <section className="card p-5 space-y-4">
        <div className="card-title">Input</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div><label className="field-label">Initial stack</label><input className="input" value={initial} onChange={(e) => setInitial(e.target.value)} disabled={isPlaying} /></div>
          <div><label className="field-label">Values to push</label><input className="input" value={pushVals} onChange={(e) => setPushVals(e.target.value)} disabled={isPlaying} /></div>
        </div>
        {error && <p className="text-xs text-[hsl(var(--accent-4))] font-mono">{error}</p>}
      </section>

      <section className="card p-5 space-y-4">
        <ControlBar player={player} onPlay={handlePlay} />
        <ExplanationBox text={explain} isPlaying={isPlaying} />
      </section>

      <section className="grid lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <div className="card-title mb-4">Visualization</div>
          <div className="min-h-[260px] flex items-center justify-center">
            <StackViz items={items} highlightTop={step?.action === "push-complete"} />
          </div>
          <Legend items={[
            { label: "Stack",      color: "hsl(220 30% 19%)" },
            { label: "Top (just pushed)", color: "hsl(168 100% 42%)" },
          ]} />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={highlightedLine} title="stack-push.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="stack-push" />
      <LeetCodeSection slug="stackPush" />
    </AlgoPageShell>
  );
};

export default StackPushPage;
