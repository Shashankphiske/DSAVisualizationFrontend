import { useState } from "react";
import { ArrowLeftFromLine } from "lucide-react";
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
  "function dequeue(queue) {",
  "  if (queue.front > queue.rear) return 'underflow';",
  "  return queue[queue.front++];",
  "}",
];

const fetchSteps = async (queue, count) => {
  const res = await fetch("http://localhost:3000/queuealgo/dequeue", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ queue, dequeue: Array(count).fill(0) }),
  });
  return await res.json();
};

const QueueDequeuePage = () => {
  const [initial, setInitial] = useState("10,20,30,40,50");
  const [count, setCount] = useState("2");
  const player = useAlgoPlayer();
  const { step, isPlaying, error, setError } = player;

  const handlePlay = async () => {
    if (player.steps.length === 0) {
      const q = initial.split(",").map((n) => Number(n.trim())).filter((n) => !isNaN(n));
      const c = parseInt(count);
      if (q.length === 0 || isNaN(c) || c <= 0) { setError("Invalid input"); return; }
      const data = await player.load(() => fetchSteps(q, c));
      if (!data) return;
    }
    player.play();
  };

  const items = step?.list ?? initial.split(",").map(Number).filter((n) => !isNaN(n));
  const explain = step
    ? (step.action === "dequeue-start" ? `Dequeuing ${step.pointer?.current}…` : "Dequeued")
    : "";
  const highlightedLine = step ? 2 : null;
  const front = items[0];

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={ArrowLeftFromLine}
        title="Queue Dequeue"
        description="Remove the element at the front of the queue — FIFO removal."
        complexity={{ time: "O(1)", space: "O(1)" , timeReason: "Dequeue reads items[front], advances the front pointer, and returns the value. None of these depend on the size of the queue, so each dequeue costs the same amount of time.", spaceReason: "The operation works in place inside the existing storage and only needs a single temporary to return the value. No structure is allocated that grows with input." }}
        badge="Queue"
      />

      <section className="card p-5 space-y-4">
        <div className="card-title">Input</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div><label className="field-label">Initial queue</label><input className="input" value={initial} onChange={(e) => setInitial(e.target.value)} disabled={isPlaying} /></div>
          <div><label className="field-label">Dequeue count</label><input className="input" type="number" min="1" value={count} onChange={(e) => setCount(e.target.value)} disabled={isPlaying} /></div>
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
          <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-[hsl(var(--text-2))] mb-2">
            <span>← Front</span><span>Rear →</span>
          </div>
          <div className="min-h-[160px] flex items-center justify-center">
            <ListViz
              items={items}
              connector={null}
              danger={step?.action === "dequeue-start" ? [front] : []}
            />
          </div>
          <Legend items={[
            { label: "Idle",         color: "hsl(220 30% 19%)" },
            { label: "Dequeuing",    color: "hsl(0 84% 60%)" },
          ]} />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={highlightedLine} title="queue-dequeue.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="queue-dequeue" />
      <LeetCodeSection slug="queueDequeue" />
    </AlgoPageShell>
  );
};

export default QueueDequeuePage;
