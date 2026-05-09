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
  "  let curr = head, temp = null;",
  "  while (curr !== null) {",
  "    temp = curr.prev;",
  "    curr.prev = curr.next;",
  "    curr.next = temp;",
  "    curr = curr.prev;",
  "  }",
  "  return temp ? temp.prev : head;",
  "}",
];

const fetchSteps = async (arr) => {
  const res = await fetch("http://localhost:3000/linkedlist/doublyreversal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ arr }),
  });
  return await res.json();
};

const DoublyReversalPage = () => {
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
    ? (step.current != null ? `Swapping pointers at node ${step.current}` : "Reversal complete")
    : "";
  const highlightedLine = step ? (step.current != null ? 6 : 8) : null;

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Repeat}
        title="Doubly Linked List – Reversal"
        description="Swap prev and next pointers on every node to reverse direction in place."
        complexity={{ time: "O(n)", space: "O(1)" , timeReason: "We walk through the list once. At every node we swap its prev and next pointers — constant work per node — so the running time grows linearly with the number of nodes.", spaceReason: "Reversal happens in place on the existing nodes; only one temporary pointer is needed for the swap, independent of list length." }}
        badge="Doubly Linked List"
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
              connector="⇄"
            />
          </div>
          <Legend items={[
            { label: "Idle",    color: "hsl(220 30% 19%)" },
            { label: "Current", color: "hsl(38 92% 50%)" },
            { label: "Prev",    color: "hsl(249 92% 70%)" },
          ]} />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={highlightedLine} title="doubly-reversal.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="doubly-reversal" />
      <LeetCodeSection slug="doublyReversal" />
    </AlgoPageShell>
  );
};

export default DoublyReversalPage;
