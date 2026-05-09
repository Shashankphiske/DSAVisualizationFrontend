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
  "function deleteNode(head, value) {",
  "  if (head.value === value)",
  "    return head.next;",
  "  let curr = head;",
  "  while (curr.next) {",
  "    if (curr.next.value === value) {",
  "      curr.next = curr.next.next;",
  "      return head;",
  "    }",
  "    curr = curr.next;",
  "  }",
  "  return head;",
  "}",
];

const fetchSteps = async (arr, index) => {
  const res = await fetch("http://localhost:3000/linkedlist/singlydeletion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ arr, index: parseInt(index) }),
  });
  return await res.json();
};

const SinglyDeletionPage = () => {
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
    ? (step.current != null ? `Deleting at index ${index}` : "Deletion complete")
    : "";
  const highlightedLine = step ? (step.action === "delete-complete" ? 6 : step.current != null ? 9 : null) : null;

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Scissors}
        title="Singly Linked List – Deletion"
        description="Remove a node by rewiring the previous node's next pointer to skip it."
        complexity={{ time: "O(n)", space: "O(1)" , timeReason: "Deletion itself is a constant-time pointer rewire, but first we have to *find* the node. Without random access we follow next pointers from the head, which in the worst case (target at tail or absent) inspects all n nodes.", spaceReason: "We only keep a couple of traversal pointers around. No queue, stack, or copy of the list is needed, so the extra space stays constant regardless of list length." }}
        badge="Linked List"
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
            <ListViz items={items} danger={step?.current != null ? [step.current] : []} />
          </div>
          <Legend items={[
            { label: "Idle",     color: "hsl(220 30% 19%)" },
            { label: "Removing", color: "hsl(0 84% 60%)" },
          ]} />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={highlightedLine} title="singly-deletion.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="singly-deletion" />
      <LeetCodeSection slug="singlyDeletion" />
    </AlgoPageShell>
  );
};

export default SinglyDeletionPage;
