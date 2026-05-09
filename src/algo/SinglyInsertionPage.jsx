import { useState } from "react";
import { Link2 } from "lucide-react";
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
  "function insert(head, value, pos) {",
  "  const newNode = new Node(value);",
  "  if (pos === 0) {",
  "    newNode.next = head;",
  "    return newNode;",
  "  }",
  "  let curr = head;",
  "  for (let i = 0; i < pos - 1; i++)",
  "    curr = curr.next;",
  "  newNode.next = curr.next;",
  "  curr.next = newNode;",
  "  return head;",
  "}",
];

const fetchSteps = async (arr, value, index) => {
  const res = await fetch("http://localhost:3000/linkedlist/singlyinsertion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ arr, value: parseInt(value), index: parseInt(index) }),
  });
  return await res.json();
};

const SinglyInsertionPage = () => {
  const [list, setList] = useState("10,20,30,40");
  const [value, setValue] = useState("25");
  const [index, setIndex] = useState("2");
  const player = useAlgoPlayer();
  const { step, isPlaying, setError, error } = player;

  const handlePlay = async () => {
    if (player.steps.length === 0) {
      const arr = list.split(",").map((n) => Number(n.trim())).filter((n) => !isNaN(n));
      if (arr.length === 0) { setError("Invalid list"); return; }
      if (isNaN(Number(value))) { setError("Invalid value"); return; }
      const data = await player.load(() => fetchSteps(arr, value, index));
      if (!data) return;
    }
    player.play();
  };

  const items = step?.list ?? list.split(",").map(Number).filter((n) => !isNaN(n));
  const explain = step
    ? (step.current != null ? `Inserting ${step.current} at index ${index}` : "Insertion complete")
    : "";
  const highlightedLine = step ? (step.action === "insert-complete" ? 10 : step.current != null ? 8 : null) : null;

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Link2}
        title="Singly Linked List – Insertion"
        description="Insert a new node at the specified index by rewiring the next pointer."
        complexity={{ time: "O(n)", space: "O(1)" , timeReason: "Unlike arrays, linked lists have no random access — to insert at position k we must walk from the head following next pointers k times. In the worst case (insert at tail) k = n, so the traversal dominates and total cost grows linearly with the list length.", spaceReason: "We allocate one new node and use a constant number of helper pointers (current, previous). The amount of extra memory does not depend on how long the list is." }}
        badge="Linked List"
      />

      <section className="card p-5 space-y-4">
        <div className="card-title">Input</div>
        <div className="grid sm:grid-cols-3 gap-3">
          <div><label className="field-label">List</label><input className="input" value={list} onChange={(e) => setList(e.target.value)} disabled={isPlaying} /></div>
          <div><label className="field-label">Value</label><input className="input" value={value} onChange={(e) => setValue(e.target.value)} disabled={isPlaying} /></div>
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
            <ListViz items={items} highlight={step?.current != null ? [step.current] : []} />
          </div>
          <Legend items={[
            { label: "Idle",    color: "hsl(220 30% 19%)" },
            { label: "Current", color: "hsl(38 92% 50%)" },
          ]} />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={highlightedLine} title="singly-insertion.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="singly-insertion" />
      <LeetCodeSection slug="singlyInsertion" />
    </AlgoPageShell>
  );
};

export default SinglyInsertionPage;
