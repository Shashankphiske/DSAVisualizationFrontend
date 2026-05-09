import { useState } from "react";
import { ArrowRightToLine } from "lucide-react";
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
  "function enqueue(queue, value) {",
  "  queue.rear++;",
  "  queue[queue.rear] = value;",
  "  return queue;",
  "}",
];

const fetchSteps = async (queue, enqueue) => {
  const res = await fetch("http://localhost:3000/queuealgo/enqueue", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ queue, enqueue }),
  });
  return await res.json();
};

const QueueEnqueuePage = () => {
  const [initial, setInitial] = useState("10,20,30");
  const [vals, setVals] = useState("40,50");
  const player = useAlgoPlayer();
  const { step, isPlaying, error, setError } = player;

  const handlePlay = async () => {
    if (player.steps.length === 0) {
      const q = initial.split(",").map((n) => Number(n.trim())).filter((n) => !isNaN(n));
      const e = vals.split(",").map((n) => Number(n.trim())).filter((n) => !isNaN(n));
      if (q.length === 0 || e.length === 0) { setError("Invalid input"); return; }
      const data = await player.load(() => fetchSteps(q, e));
      if (!data) return;
    }
    player.play();
  };

  const items = step?.list ?? initial.split(",").map(Number).filter((n) => !isNaN(n));
  const explain = step
    ? (step.action === "enqueue-start" ? `Enqueuing ${step.pointer?.current}…` : `Enqueued ${step.pointer?.next}`)
    : "";
  const highlightedLine = step ? (step.action === "enqueue-start" ? 1 : 2) : null;
  const lastVal = items[items.length - 1];

  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={ArrowRightToLine}
        title="Queue Enqueue"
        description="Add an element to the rear of the queue — FIFO insertion."
        complexity={{ time: "O(1)", space: "O(1)" , timeReason: "Enqueue writes the new value at items[rear] and advances the rear pointer. Both steps are direct index operations, so the time stays constant regardless of how many items are already queued.", spaceReason: "Aside from the new element itself there is nothing extra to keep around — no copies of the queue, no auxiliary buffers — so the additional memory cost is constant." }}
        badge="Queue"
      />

      <section className="card p-5 space-y-4">
        <div className="card-title">Input</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div><label className="field-label">Initial queue</label><input className="input" value={initial} onChange={(e) => setInitial(e.target.value)} disabled={isPlaying} /></div>
          <div><label className="field-label">Values to enqueue</label><input className="input" value={vals} onChange={(e) => setVals(e.target.value)} disabled={isPlaying} /></div>
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
              success={step?.action === "enqueue-complete" ? [lastVal] : []}
              highlight={step?.action === "enqueue-start" ? [lastVal] : []}
            />
          </div>
          <Legend items={[
            { label: "Idle",     color: "hsl(220 30% 19%)" },
            { label: "Enqueuing",color: "hsl(38 92% 50%)" },
            { label: "Just added", color: "hsl(168 100% 42%)" },
          ]} />
        </div>
        <div className="card overflow-hidden">
          <CodeViewer code={CODE} highlightedLine={highlightedLine} title="queue-enqueue.js" />
        </div>
      </section>
      <MeasuredComplexity meta={player.meta} />
      <VideoEmbed slug="queue-enqueue" />
      <LeetCodeSection slug="queueEnqueue" />
    </AlgoPageShell>
  );
};

export default QueueEnqueuePage;
