import { useState } from "react";
import { Link } from "lucide-react";
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
  "    if (head) head.prev = newNode;",
  "    return newNode;",
  "  }",
  "  let curr = head;",
  "  for (let i = 0; i < pos - 1; i++) curr = curr.next;",
  "  newNode.next = curr.next;",
  "  newNode.prev = curr;",
  "  if (curr.next) curr.next.prev = newNode;",
  "  curr.next = newNode;",
  "  return head;",
  "}",
];

const fetchSteps = async (arr, value, index) => {
  const res = await fetch("http://localhost:3000/linkedlist/doublyinsertion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ arr, value, index }),
  });
  return await res.json();
};

const DoublyInsertionPage = () => {
  const [list, setList] = useState("10,20,30,40");
  const [value, setValue] = useState("25");
  const [index, setIndex] = useState("2");
  const player = useAlgoPlayer();
  const { step, isPlaying, error, setError } = player;

  const handlePlay = async () => {
    if (player.steps.length === 0) {
      const arr = list.split(",").map((n) => Number(n.trim())).filter((n) => !isNaN(n));
      const v = parseInt(value), i = parseInt(index);
      if (arr.length === 0) { setError("Invalid list"); return; }
      if (isNaN(v)) { setError("Invalid value"); return; }
      if (isNaN(i) || i < 0 || i > arr.length) { setError(`Index must be 0-${arr.length}`); return; }
      const data = await player.load(() => fetchSteps(arr, v, i));
      if (!data) return;
    }
    player.play();
  };

  const items = step?.list ?? list.split(",").map(Number).filter((n) => !isNaN(n));
  const explain = step
    ? (step.current != null ? `Inserting ${step.current} at index ${index}` : "Insertion complete")
    : "";
  const highlightedLine = step ? (step.action === "insert-complete" ? 12 : step.current != null ? 9 : null) : null;

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={Link}
        title="Doubly Linked List – Insertion"
        description="Insert a node by rewiring both prev and next pointers."
        complexity={{ time: "O(n)", space: "O(1)" , timeReason: "Insertion needs two phases: locate the neighbor (up to n hops along next pointers in the worst case) and rewire four pointers (prev/next on both sides). The rewire is constant; the traversal is what makes it O(n).", spaceReason: "Memory cost is the new node plus a small constant number of helper pointers. Nothing scales with the list length." }}
        badge="Doubly Linked List"
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
            <ListViz items={items} highlight={step?.current != null ? [step.current] : []} connector="⇄" />
          </div>
          <Legend items={[
            { label: "Idle",    color: "hsl(220 30% 19%)" },
            { label: "Current", color: "hsl(38 92% 50%)" },
          ]} />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={highlightedLine} title="doubly-insertion.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="doubly-insertion" />
      <LeetCodeSection slug="doublyInsertion" />
    </AlgoPageShell>
  );
};

export default DoublyInsertionPage;
