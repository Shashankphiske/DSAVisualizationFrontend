import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Brain, RefreshCw, ArrowRight, CheckCircle, XCircle, Target, AlertTriangle,
  Hash, Search, Network, TreePine, Layers, Link2, Map, Puzzle, ArrowLeft,
  Flame, Trophy, BookOpen, Sparkles, Shuffle, Award,
} from "lucide-react";
import { AlgoPageShell, AlgoPageHeader } from "../AlgoPageTemplate";
import { ALL_QUESTIONS, QUESTION_COUNTS } from "../data/quizQuestions";

const QUIZ_CATEGORIES = [
  { id: "All",                  title: "All Algorithms",      desc: "Comprehensive mixed test",         Icon: Brain,    featured: true },
  { id: "Sorting",              title: "Sorting",             desc: "Bubble, Quick, Merge, Heap…",       Icon: Hash },
  { id: "Searching",            title: "Searching",           desc: "Binary, Linear, Hashing",           Icon: Search },
  { id: "Graphs",               title: "Graphs",              desc: "BFS, DFS, traversal patterns",      Icon: Network },
  { id: "Trees",                title: "Trees",               desc: "Traversals, BST, AVL, Heap",        Icon: TreePine },
  { id: "Stacks & Queues",      title: "Stacks & Queues",     desc: "LIFO, FIFO, Deque, PQ",             Icon: Layers },
  { id: "Linked Lists",         title: "Linked Lists",        desc: "Singly, Doubly, Cycle detection",   Icon: Link2 },
  { id: "Shortest Path",        title: "Shortest Path",       desc: "Dijkstra, A*, Bellman-Ford",        Icon: Map },
  { id: "Dynamic Programming",  title: "Dynamic Programming", desc: "Fibonacci, Coin Change, Knapsack",  Icon: Puzzle },
];

const DIFFICULTY_STYLES = {
  Easy:   "text-[hsl(var(--accent))] bg-[hsl(var(--accent))/0.1] border-[hsl(var(--accent))/0.3]",
  Medium: "text-[hsl(var(--accent-3))] bg-[hsl(var(--accent-3))/0.1] border-[hsl(var(--accent-3))/0.3]",
  Hard:   "text-[hsl(var(--accent-4))] bg-[hsl(var(--accent-4))/0.1] border-[hsl(var(--accent-4))/0.3]",
};

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const Quiz = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [wrongTopics, setWrongTopics] = useState(new Set());
  const [quizFinished, setQuizFinished] = useState(false);

  const startQuiz = (categoryId) => {
    const filtered = categoryId === "All"
      ? ALL_QUESTIONS
      : ALL_QUESTIONS.filter((q) => q.category === categoryId);
    setQuestions(shuffle(filtered));
    setSelectedCategory(categoryId);
    resetQuizState();
  };

  const resetQuizState = () => {
    setIdx(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setAnswered(false);
    setSelectedChoice(null);
    setQuizFinished(false);
    setWrongTopics(new Set());
  };

  const answerQuiz = useCallback((choice) => {
    if (answered || !questions[idx]) return;
    const q = questions[idx];
    const isCorrect = choice === q.ans;
    setAnswered(true);
    setSelectedChoice(choice);
    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
      setWrongTopics((prev) => new Set(prev).add(q.topic));
    }
  }, [answered, questions, idx]);

  const nextQuestion = useCallback(() => {
    if (!answered) return;
    if (idx + 1 >= questions.length) setQuizFinished(true);
    else {
      setIdx((i) => i + 1);
      setAnswered(false);
      setSelectedChoice(null);
    }
  }, [answered, idx, questions.length]);

  const exitQuiz = () => {
    setSelectedCategory(null);
    setQuestions([]);
  };

  // Keyboard shortcuts: 1-4 to answer, Enter/Space to advance
  useEffect(() => {
    if (!selectedCategory || quizFinished) return;
    const onKey = (e) => {
      if (!answered && /^[1-4]$/.test(e.key)) {
        const n = parseInt(e.key, 10) - 1;
        if (n < (questions[idx]?.opts.length || 0)) answerQuiz(n);
      } else if (answered && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        nextQuestion();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedCategory, quizFinished, answered, idx, questions, answerQuiz, nextQuestion]);

  const progressPct = useMemo(() => {
    if (!questions.length) return 0;
    return ((idx + (answered ? 1 : 0)) / questions.length) * 100;
  }, [idx, answered, questions.length]);

  const accuracy = questions.length ? Math.round((score / questions.length) * 100) : 0;
  const currentQ = questions[idx];

  // ───────────────────────── Category selection ─────────────────────────
  if (!selectedCategory) {
    const totalQuestions = QUESTION_COUNTS.All || 0;
    return (
      <AlgoPageShell>
        <AlgoPageHeader
          icon={Brain}
          title="Algorithm Quiz"
          description="Test your understanding across data structures and algorithms. Pick a focused topic or take the comprehensive mixed quiz."
          badge={
            <span className="inline-flex items-center gap-1.5">
              <Sparkles size={12} /> {totalQuestions} questions across {QUIZ_CATEGORIES.length - 1} topics
            </span>
          }
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {QUIZ_CATEGORIES.map((cat) => {
            const count = QUESTION_COUNTS[cat.id] || 0;
            const featured = cat.featured;
            return (
              <button
                key={cat.id}
                onClick={() => startQuiz(cat.id)}
                className={`card card-hover p-6 text-left flex flex-col justify-between group transition-all duration-300 ${
                  featured ? "border-[hsl(var(--accent))/0.45]" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      background: featured ? "hsl(var(--accent))" : "hsl(var(--accent) / 0.1)",
                      border: "1px solid hsl(var(--accent) / 0.25)",
                    }}
                  >
                    <cat.Icon
                      size={22}
                      className={featured ? "text-[hsl(var(--bg))]" : "text-[hsl(var(--accent))]"}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="display text-lg font-bold text-[hsl(var(--text))]">{cat.title}</h3>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[hsl(var(--bg-3))] text-[hsl(var(--text-2))] border border-[hsl(var(--border))]">
                        {count}Q
                      </span>
                    </div>
                    <p className="text-sm text-[hsl(var(--text-2))] leading-relaxed">{cat.desc}</p>
                  </div>
                </div>
                <div className="mt-6 text-sm font-semibold text-[hsl(var(--text-3))] flex items-center gap-2 group-hover:text-[hsl(var(--accent))] transition-colors">
                  {featured ? <Shuffle size={14} /> : <BookOpen size={14} />}
                  {featured ? "Start mixed quiz" : "Start quiz"}
                  <ArrowRight size={14} className="ml-auto group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </AlgoPageShell>
    );
  }

  // ───────────────────────── Active quiz ─────────────────────────
  const categoryMeta = QUIZ_CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <AlgoPageShell>
      {/* Top bar: back + live stats */}
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <button
          onClick={exitQuiz}
          className="flex items-center gap-2 text-[hsl(var(--text-2))] hover:text-[hsl(var(--accent))] transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to categories
        </button>

        {!quizFinished && (
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-md bg-[hsl(var(--bg-2))] border border-[hsl(var(--border))] text-[hsl(var(--text-2))]">
              <span className="text-[hsl(var(--accent))]">{score}</span>
              <span className="text-[hsl(var(--text-3))]"> / {questions.length}</span>
            </span>
            <span className={`px-2.5 py-1 rounded-md border inline-flex items-center gap-1.5 ${
              streak >= 3
                ? "bg-[hsl(var(--accent-3))/0.1] border-[hsl(var(--accent-3))/0.4] text-[hsl(var(--accent-3))]"
                : "bg-[hsl(var(--bg-2))] border-[hsl(var(--border))] text-[hsl(var(--text-3))]"
            }`}>
              <Flame size={12} /> {streak}
            </span>
          </div>
        )}
      </div>

      <AlgoPageHeader
        icon={categoryMeta?.Icon || Brain}
        title={`${categoryMeta?.title || "Quiz"} Quiz`}
        description="Choose the best answer. Use 1-4 keys to answer and Enter to advance."
      />

      <div className="max-w-3xl mx-auto space-y-6 mt-6">
        {!quizFinished && currentQ ? (
          <>
            {/* Progress bar */}
            <div>
              <div className="flex justify-between items-center mb-2 text-xs font-mono text-[hsl(var(--text-3))]">
                <span>Question {idx + 1} of {questions.length}</span>
                <span>{Math.round(progressPct)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[hsl(var(--bg-3))] overflow-hidden border border-[hsl(var(--border))]">
                <div
                  className="h-full bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--accent-2))] transition-all duration-500 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Question card */}
            <div className="card p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[hsl(var(--bg-3))] text-[hsl(var(--text-2))] border border-[hsl(var(--border))]">
                  {currentQ.topic}
                </span>
                {currentQ.difficulty && (
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${DIFFICULTY_STYLES[currentQ.difficulty] || ""}`}>
                    {currentQ.difficulty}
                  </span>
                )}
              </div>

              <p className="text-lg sm:text-xl font-semibold mb-6 text-[hsl(var(--text))] leading-relaxed display">
                {currentQ.q}
              </p>

              <div className="flex flex-col gap-2.5">
                {currentQ.opts.map((opt, i) => {
                  const isCorrect = i === currentQ.ans;
                  const isPicked = i === selectedChoice;
                  let cls =
                    "group/opt text-left px-4 py-3.5 rounded-xl border font-medium transition-all duration-200 flex items-center gap-3 ";
                  let badgeCls = "w-7 h-7 rounded-md flex items-center justify-center font-mono text-xs font-bold shrink-0 border ";

                  if (answered) {
                    if (isCorrect) {
                      cls += "border-[hsl(var(--accent))] bg-[hsl(var(--accent))/0.08] text-[hsl(var(--accent))]";
                      badgeCls += "border-[hsl(var(--accent))] bg-[hsl(var(--accent))/0.15]";
                    } else if (isPicked) {
                      cls += "border-[hsl(var(--accent-4))] bg-[hsl(var(--accent-4))/0.08] text-[hsl(var(--accent-4))]";
                      badgeCls += "border-[hsl(var(--accent-4))] bg-[hsl(var(--accent-4))/0.15]";
                    } else {
                      cls += "border-[hsl(var(--border))] bg-[hsl(var(--bg-3))] opacity-50";
                      badgeCls += "border-[hsl(var(--border))] bg-[hsl(var(--bg-2))] text-[hsl(var(--text-3))]";
                    }
                  } else {
                    cls += "border-[hsl(var(--border))] bg-[hsl(var(--bg-3))] hover:border-[hsl(var(--accent))/0.5] hover:bg-[hsl(var(--accent))/0.04] hover:translate-x-1 cursor-pointer";
                    badgeCls += "border-[hsl(var(--border))] bg-[hsl(var(--bg-2))] text-[hsl(var(--text-2))] group-hover/opt:border-[hsl(var(--accent))/0.5] group-hover/opt:text-[hsl(var(--accent))]";
                  }

                  return (
                    <button key={i} disabled={answered} onClick={() => answerQuiz(i)} className={cls}>
                      <span className={badgeCls}>{i + 1}</span>
                      <span className="flex-1">{opt}</span>
                      {answered && isCorrect && <CheckCircle size={18} className="shrink-0" />}
                      {answered && isPicked && !isCorrect && <XCircle size={18} className="shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div
                  className={`mt-6 p-4 rounded-xl border flex gap-3 ${
                    selectedChoice === currentQ.ans
                      ? "bg-[hsl(var(--accent))/0.08] border-[hsl(var(--accent))/0.4] text-[hsl(var(--accent))]"
                      : "bg-[hsl(var(--accent-4))/0.08] border-[hsl(var(--accent-4))/0.4] text-[hsl(var(--accent-4))]"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {selectedChoice === currentQ.ans
                      ? <CheckCircle size={20} />
                      : <XCircle size={20} />}
                  </div>
                  <div className="text-sm">
                    <strong className="block mb-1 text-[hsl(var(--text))]">
                      {selectedChoice === currentQ.ans ? "Correct!" : "Not quite."}
                    </strong>
                    <p className="text-[hsl(var(--text-2))]">{currentQ.exp}</p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                <p className="text-xs text-[hsl(var(--text-3))] font-mono">
                  {answered ? "Press Enter to continue" : "Press 1-4 to choose"}
                </p>
                <button
                  disabled={!answered}
                  onClick={nextQuestion}
                  className="btn justify-center bg-[hsl(var(--accent))] text-[hsl(var(--bg))] border-[hsl(var(--accent))] hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed font-bold"
                >
                  {idx + 1 >= questions.length ? "Finish quiz" : "Next question"}
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </>
        ) : (
          // ───────────────────────── Results ─────────────────────────
          <div className="card p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-[hsl(var(--accent))/0.1] rounded-full flex items-center justify-center mb-6 border border-[hsl(var(--accent))/0.3]">
              {accuracy === 100
                ? <Trophy size={40} className="text-[hsl(var(--accent))]" />
                : <Target size={40} className="text-[hsl(var(--accent))]" />}
            </div>

            <h2 className="display text-3xl font-extrabold mb-2 text-[hsl(var(--text))]">Quiz complete</h2>
            <p className="text-sm text-[hsl(var(--text-2))] mb-8">
              {accuracy === 100 ? "Flawless run." : accuracy >= 75 ? "Strong performance." : accuracy >= 50 ? "Solid foundation — keep practicing." : "Time to review the fundamentals."}
            </p>

            {/* Stat grid */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8">
              <div className="rounded-xl p-4 bg-[hsl(var(--bg-2))] border border-[hsl(var(--border))]">
                <div className="text-2xl font-mono font-extrabold text-[hsl(var(--accent))]">{score}<span className="text-sm text-[hsl(var(--text-3))]">/{questions.length}</span></div>
                <div className="text-[10px] uppercase tracking-wider text-[hsl(var(--text-3))] mt-1">Correct</div>
              </div>
              <div className="rounded-xl p-4 bg-[hsl(var(--bg-2))] border border-[hsl(var(--border))]">
                <div className="text-2xl font-mono font-extrabold text-[hsl(var(--accent-2))]">{accuracy}<span className="text-sm text-[hsl(var(--text-3))]">%</span></div>
                <div className="text-[10px] uppercase tracking-wider text-[hsl(var(--text-3))] mt-1">Accuracy</div>
              </div>
              <div className="rounded-xl p-4 bg-[hsl(var(--bg-2))] border border-[hsl(var(--border))]">
                <div className="text-2xl font-mono font-extrabold text-[hsl(var(--accent-3))] inline-flex items-center gap-1">
                  <Flame size={18} /> {bestStreak}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[hsl(var(--text-3))] mt-1">Best streak</div>
              </div>
            </div>

            {wrongTopics.size > 0 ? (
              <div className="bg-[hsl(var(--bg-2))] border border-[hsl(var(--accent-4))/0.3] rounded-xl p-6 text-left mb-8 max-w-lg mx-auto">
                <div className="flex items-center gap-2 mb-3 text-[hsl(var(--accent-4))]">
                  <AlertTriangle size={18} />
                  <h3 className="font-bold">Topics to review</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(wrongTopics).map((topic) => (
                    <span key={topic} className="text-xs font-medium px-2.5 py-1.5 rounded-md bg-[hsl(var(--bg-3))] border border-[hsl(var(--border))] text-[hsl(var(--text))]">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-[hsl(var(--accent))/0.08] border border-[hsl(var(--accent))/0.3] rounded-xl p-6 mb-8 max-w-lg mx-auto inline-flex items-center gap-3">
                <Award size={24} className="text-[hsl(var(--accent))]" />
                <div className="text-left">
                  <h3 className="font-bold text-[hsl(var(--accent))]">Perfect score!</h3>
                  <p className="text-sm text-[hsl(var(--text-2))]">You aced every question. Try a harder category next.</p>
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-center flex-col sm:flex-row">
              <button
                onClick={() => startQuiz(selectedCategory)}
                className="btn justify-center bg-[hsl(var(--accent))] text-[hsl(var(--bg))] border-[hsl(var(--accent))] hover:opacity-90 font-bold px-6"
              >
                <RefreshCw size={16} className="mr-2" /> Retake quiz
              </button>
              <button onClick={exitQuiz} className="btn justify-center px-6">
                <ArrowLeft size={16} className="mr-2" /> Categories
              </button>
            </div>
          </div>
        )}
      </div>
    </AlgoPageShell>
  );
};

export default Quiz;
