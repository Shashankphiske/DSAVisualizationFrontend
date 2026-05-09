import { useState } from "react";
import { Repeat } from "lucide-react";
import CodeViewer from "../CodeViewer";
import { AlgoPageHeader, AlgoPageShell } from "../AlgoPageTemplate";
import ControlBar from "../components/ControlBar";
import ExplanationBox from "../components/ExplanationBox";
import Legend from "../components/Legend";
import ListViz from "../components/ListViz";
import useAlgoPlayer from "../hooks/useAlgoPlayer";
import LeetCodeSection from "../components/LeetCodeSection";
import MeasuredComplexity from "../components/MeasuredComplexity";
import VideoEmbed from "../components/VideoEmbed";

const CODE = [
  "function reverse(head) {",
  "  let prev = null, curr = head;",
  "  while (curr !== null) {",
  "    let next = curr.next;",
  "    curr.next = prev;",
  "    prev = curr;",
  "    curr = next;",
  "  }",
  "  return prev;",
  "}",
];

const fetchSteps = async (arr) => {
  const res = await fetch("http://localhost:3000/linkedlist/singlyreversal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ arr }),
  });
  return await res.json();
};

const SinglyReversalPage = () => {
  const [list, setList] = useState("10,20,30,40,50");
  const player = useAlgoPlayer();
  const { step, isPlaying, error, setError } = player;

  const handlePlay = async () => {
    if (player.steps.length === 0) {
      const arr = list.split(",").map((n) => Number(n.trim())).filter((n) => !isNaN(n));
      if (arr.length === 0) { setError("Invalid list"); return; }
      const data = await player.load(() => fetchSteps(arr));
      if (!data) return;
    }
    player.play();
  };

  const items = step?.list ?? list.split(",").map(Number).filter((n) => !isNaN(n));
  const explain = step
    ? (step.current != null ? `curr=${step.current}, prev=${step.prev ?? "null"}` : "Reversal complete")
    : "";
  const highlightedLine = step ? (step.current != null ? 4 : 8) : null;

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Repeat}
        title="Singly Linked List – Reversal"
        description="Iteratively reverse all next pointers using prev / curr / next."
        complexity={{ time: "O(n)", space: "O(1)" , timeReason: "We walk the list from head to tail exactly once. At each node we flip its next pointer to point backward — a constant amount of work per node — so total time scales linearly with the number of nodes.", spaceReason: "The reversal is performed in place on the existing nodes. We only need three helper pointers (prev, curr, next) which do not grow with the input." }}
        badge="Linked List"
      />

      <section className="card p-5 space-y-4">
        <div className="card-title">Input</div>
        <label className="field-label">List</label>
        <input className="input" value={list} onChange={(e) => setList(e.target.value)} disabled={isPlaying} />
        {error && <p className="text-xs text-[hsl(var(--accent-4))] font-mono">{error}</p>}
      </section>

      <section className="card p-5 space-y-4">
        <ControlBar player={player} onPlay={handlePlay} />
        <ExplanationBox text={explain} isPlaying={isPlaying} />
      </section>

      <section className="grid lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <div className="card-title mb-4">Visualization</div>
          <div className="min-h-[200px] flex items-center justify-center">
            <ListViz
              items={items}
              highlight={step?.current != null ? [step.current] : []}
              secondary={step?.prev != null ? [step.prev] : []}
            />
          </div>
          <Legend items={[
            { label: "Idle",    color: "hsl(220 30% 19%)" },
            { label: "Current", color: "hsl(38 92% 50%)" },
            { label: "Prev",    color: "hsl(249 92% 70%)" },
          ]} />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={highlightedLine} title="singly-reversal.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="singly-reversal" />
      <LeetCodeSection slug="singlyReversal" />
    </AlgoPageShell>
  );
};

export default SinglyReversalPage;
