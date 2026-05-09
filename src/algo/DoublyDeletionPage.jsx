import { useState } from "react";
import { Scissors } from "lucide-react";
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
  "function delete(head, index) {",
  "  if (index === 0) {",
  "    head = head.next;",
  "    if (head) head.prev = null;",
  "    return head;",
  "  }",
  "  let curr = head;",
  "  for (let i = 0; i < index; i++) curr = curr.next;",
  "  if (curr.prev) curr.prev.next = curr.next;",
  "  if (curr.next) curr.next.prev = curr.prev;",
  "  return head;",
  "}",
];

const fetchSteps = async (arr, index) => {
  const res = await fetch("http://localhost:3000/linkedlist/doublydeletion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ arr, index }),
  });
  return await res.json();
};

const DoublyDeletionPage = () => {
  const [list, setList] = useState("10,20,30,40,50");
  const [index, setIndex] = useState("2");
  const player = useAlgoPlayer();
  const { step, isPlaying, error, setError } = player;

  const handlePlay = async () => {
    if (player.steps.length === 0) {
      const arr = list.split(",").map((n) => Number(n.trim())).filter((n) => !isNaN(n));
      const i = parseInt(index);
      if (arr.length === 0) { setError("Invalid list"); return; }
      if (isNaN(i) || i < 0 || i >= arr.length) { setError(`Index must be 0-${arr.length - 1}`); return; }
      const data = await player.load(() => fetchSteps(arr, i));
      if (!data) return;
    }
    player.play();
  };

  const items = step?.list ?? list.split(",").map(Number).filter((n) => !isNaN(n));
  const explain = step
    ? (step.current != null ? `Deleting node at index ${index}` : "Deletion complete")
    : "";
  const highlightedLine = step ? (step.action === "delete-complete" ? 9 : step.current != null ? 7 : null) : null;

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Scissors}
        title="Doubly Linked List – Deletion"
        description="Remove a node and rewire both prev and next pointers around it."
        complexity={{ time: "O(n)", space: "O(1)" , timeReason: "Once the target node is in hand, deletion is constant time because doubly linked nodes know both their predecessor and successor. The cost comes from finding the node, which may require scanning all n nodes in the worst case.", spaceReason: "Only a few helper pointers are used while traversing and rewiring. No auxiliary structure grows with the list size." }}
        badge="Doubly Linked List"
      />

      <section className="card p-5 space-y-4">
        <div className="card-title">Input</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div><label className="field-label">List</label><input className="input" value={list} onChange={(e) => setList(e.target.value)} disabled={isPlaying} /></div>
          <div><label className="field-label">Index</label><input className="input" value={index} onChange={(e) => setIndex(e.target.value)} disabled={isPlaying} /></div>
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
          <div className="min-h-[200px] flex items-center justify-center">
            <ListViz items={items} danger={step?.current != null ? [step.current] : []} connector="⇄" />
          </div>
          <Legend items={[
            { label: "Idle",     color: "hsl(220 30% 19%)" },
            { label: "Removing", color: "hsl(0 84% 60%)" },
          ]} />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={highlightedLine} title="doubly-deletion.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="doubly-deletion" />
      <LeetCodeSection slug="doublyDeletion" />
    </AlgoPageShell>
  );
};

export default DoublyDeletionPage;
