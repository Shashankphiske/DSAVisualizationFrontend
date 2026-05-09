import { useState } from "react";
import { ArrowDownFromLine } from "lucide-react";
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
  "  constructor(items = []) {",
  "    this.items = [...items];",
  "    this.top = this.items.length - 1;",
  "  }",
  "",
  "  pop() {",
  "    // 1. Guard against underflow",
  "    if (this.top < 0) {",
  "      throw new Error('Stack underflow');",
  "    }",
  "",
  "    // 2. Read the value at top",
  "    const value = this.items[this.top];",
  "",
  "    // 3. Remove the slot & decrement top",
  "    this.items[this.top] = undefined;",
  "    this.top = this.top - 1;",
  "",
  "    // 4. Return popped value",
  "    return value;",
  "  }",
  "}",
];

const fetchSteps = async (stack, pop) => {
  const res = await fetch("http://localhost:3000/stackalgo/stackpop", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stack, pop }),
  });
  return await res.json();
};

const StackPopPage = () => {
  const [initial, setInitial] = useState("10,20,30,40,50");
  const [count, setCount] = useState("2");
  const player = useAlgoPlayer();
  const { step, isPlaying, error, setError } = player;

  const handlePlay = async () => {
    if (player.steps.length === 0) {
      const stack = initial.split(",").map((n) => Number(n.trim())).filter((n) => !isNaN(n));
      const c = parseInt(count);
      if (stack.length === 0 || isNaN(c) || c <= 0) { setError("Invalid input"); return; }
      const data = await player.load(() => fetchSteps(stack, c));
      if (!data) return;
    }
    player.play();
  };

  const items = step?.list ?? initial.split(",").map(Number).filter((n) => !isNaN(n));
  const explain = step
    ? (step.underflow ? "Stack underflow — nothing to pop"
       : step.action === "pop-start" ? `Popping ${step.pointer?.current}…`
       : `Popped ${step.pointer?.current ?? ""}`)
    : "";
  // Map step phases to lines in the expanded class:
  //  - underflow      -> line 10 ("if (this.top < 0) {")
  //  - pop-start      -> line 14 ("const value = this.items[this.top];")
  //  - pop-complete   -> line 17/18 (clear slot + decrement top)
  const highlightedLine = step
    ? (step.underflow ? 9
       : step.action === "pop-start" ? 13
       : step.action === "pop-complete" ? 17
       : 17)
    : null;

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={ArrowDownFromLine}
        title="Stack Pop"
        description="Remove the top element from a stack — the canonical LIFO removal."
        complexity={{ time: "O(1)", space: "O(1)" , timeReason: "Pop reads items[top], clears that slot, decrements top, and returns the value. That's a fixed handful of instructions independent of the stack's size, so doubling the stack doesn't make pop any slower.", spaceReason: "We reuse the existing array in place and only need a single temporary variable to hold the value being returned. No auxiliary data structure scales with the input." }}
        badge="Stack"
      />

      <section className="card p-5 space-y-4">
        <div className="card-title">Input</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div><label className="field-label">Initial stack</label><input className="input" value={initial} onChange={(e) => setInitial(e.target.value)} disabled={isPlaying} /></div>
          <div><label className="field-label">Pop count</label><input className="input" type="number" min="1" value={count} onChange={(e) => setCount(e.target.value)} disabled={isPlaying} /></div>
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
            <StackViz items={items} highlightTop={step?.action === "pop-start"} danger />
          </div>
          <Legend items={[
            { label: "Stack",          color: "hsl(220 30% 19%)" },
            { label: "Top (popping)",  color: "hsl(0 84% 60%)" },
          ]} />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={highlightedLine} title="stack-pop.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="stack-pop" />
      <LeetCodeSection slug="stackPop" />
    </AlgoPageShell>
  );
};

export default StackPopPage;
