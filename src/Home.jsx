import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Hash, Search, Network, TreePine, Layers, Ticket, Link2, Map, Puzzle,
  Zap, Gamepad2, BookOpen, Brain, BarChart3, ArrowRight, Sparkles,
  SkipBack, Gauge, History,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const CATEGORIES = [
  { to: "/sortingalgorithms",      Icon: Hash,    title: "Sorting",             desc: "Bubble, Selection, Insertion, Merge, Quick, Heap" },
  { to: "/searchingalgorithms",    Icon: Search,  title: "Searching",           desc: "Binary and Linear search techniques" },
  { to: "/graphalgorithms",        Icon: Network, title: "Graphs",              desc: "BFS and DFS graph traversal" },
  { to: "/treealgorithms",         Icon: TreePine,title: "Trees",               desc: "Inorder, Preorder, and Postorder" },
  { to: "/stackalgorithms",        Icon: Layers,  title: "Stacks",              desc: "Push and Pop on a LIFO structure" },
  { to: "/queuealgorithms",        Icon: Ticket,  title: "Queues",              desc: "Enqueue and Dequeue on FIFO" },
  { to: "/linkedlistalgorithms",   Icon: Link2,   title: "Linked Lists",        desc: "Insertion, Deletion, Reversal" },
  { to: "/shortestpathalgorithms", Icon: Map,     title: "Shortest Path",       desc: "Dijkstra's and A* search" },
  { to: "/dynamicalgorithms",      Icon: Puzzle,  title: "Dynamic Programming", desc: "Fibonacci, Coin Change, and more" },
];

const STATS = [
  { value: "25+", label: "Algorithms" },
  { value: "9",   label: "Categories"  },
  { value: "6",   label: "Pro Features"},
];

const FEATURES = [
  { Icon: SkipBack, title: "Step Backward",   desc: "Rewind through the execution at any moment" },
  { Icon: Gauge,    title: "Speed Control",   desc: "5-stop speed slider for fast or detailed playback" },
  { Icon: Brain,    title: "Quiz Mode",       desc: "Predict the next step and test understanding" },
  { Icon: BarChart3,title: "Complexity Panel",desc: "Time, space and stability metrics on every page" },
  { Icon: History,  title: "History Buffer",  desc: "Every step is stored — scrub freely both ways" },
  { Icon: Zap,      title: "Synced Code",     desc: "Code lines highlight in lockstep with the visual" },
];

const Home = () => (
  <div className="min-h-screen pt-24 pb-20">
    {/* HERO */}
    <section className="relative overflow-hidden">
      <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
           style={{ background: "hsl(var(--accent))" }} />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
           style={{ background: "hsl(var(--accent-2))" }} />

      <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24 text-center">

        <motion.h1
          initial="hidden" animate="visible" variants={fadeUp} custom={1}
          className="display text-5xl md:text-7xl font-extrabold leading-[0.95] mt-5"
        >
          <span className="text-[hsl(var(--text))]">Algorithm</span>
          <br />
          <span className="gradient-text">Visualizer</span>
        </motion.h1>

        <motion.p
          initial="hidden" animate="visible" variants={fadeUp} custom={2}
          className="text-base md:text-lg max-w-2xl mx-auto mt-5 text-[hsl(var(--text-2))]"
        >
          Interactive step-by-step execution with custom inputs, prediction quizzes,
          variable speed and full step-back navigation.
        </motion.p>

        <motion.div
          initial="hidden" animate="visible" variants={fadeUp} custom={3}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          <Link to="/sortingalgorithms" className="btn btn-primary">
            Get Started <ArrowRight size={15} />
          </Link>
          <Link to="/quiz" className="btn">
            <Brain size={15} /> Try Quiz Mode
          </Link>
          <Link to="/compare" className="btn">
            <BarChart3 size={15} /> Compare
          </Link>
        </motion.div>

        <motion.div
          initial="hidden" animate="visible" variants={fadeUp} custom={4}
          className="flex flex-wrap justify-center gap-2 mt-8"
        >
          <span className="ftag"><SkipBack size={11}/> Step Backward</span>
          <span className="ftag"><Gauge size={11}/> Speed Control</span>
          <span className="ftag"><Brain size={11}/> Quiz Mode</span>
          <span className="ftag"><BarChart3 size={11}/> Complexity Panel</span>
          <span className="ftag"><History size={11}/> History Buffer</span>
        </motion.div>
      </div>
    </section>

    {/* STATS */}
    <section className="max-w-4xl mx-auto px-6 -mt-4">
      <div className="card grid grid-cols-3 divide-x divide-[hsl(var(--border))]">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={i}
            className="flex flex-col items-center justify-center py-7"
          >
            <div className="display text-3xl font-extrabold gradient-text">{s.value}</div>
            <div className="text-xs mt-1 font-mono text-[hsl(var(--text-2))] uppercase tracking-wider">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CATEGORIES */}
    <section className="max-w-7xl mx-auto px-6 mt-20">
      <div className="section-label mb-6">Categories</div>
      <h2 className="display text-3xl font-bold mb-8">
        Explore <span className="gradient-text">data structures</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.to}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={i}
          >
            <Link to={cat.to} className="card card-hover p-5 h-full flex flex-col justify-between group">
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: "hsl(var(--accent) / 0.1)",
                    border: "1px solid hsl(var(--accent) / 0.25)",
                  }}
                >
                  <cat.Icon size={18} className="text-[hsl(var(--accent))]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="display text-base font-bold text-[hsl(var(--text))] mb-1">{cat.title}</h3>
                  <p className="text-xs text-[hsl(var(--text-2))] leading-relaxed">{cat.desc}</p>
                </div>
              </div>
              <div className="mt-5 text-xs font-mono text-[hsl(var(--text-3))] flex items-center gap-1.5 group-hover:text-[hsl(var(--accent))] transition-colors">
                Explore <ArrowRight size={12} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>

    {/* FEATURES */}
    <section className="max-w-6xl mx-auto px-6 mt-20">
      <div className="section-label mb-6">What makes this different</div>
      <h2 className="display text-3xl font-bold mb-8">
        Built for <span className="gradient-text">deep understanding</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} custom={i}
            className="card card-hover p-5"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
              style={{
                background: "hsl(var(--accent-2) / 0.12)",
                border: "1px solid hsl(var(--accent-2) / 0.25)",
              }}
            >
              <f.Icon size={18} className="text-[hsl(var(--accent-2))]" />
            </div>
            <h3 className="display text-base font-bold mb-1">{f.title}</h3>
            <p className="text-xs text-[hsl(var(--text-2))] leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

export default Home;
