import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Menu, X, Hash, Search, Network, TreePine,
  Layers, Ticket, Link2, Map, Puzzle, Brain, BarChart3, Sparkles,
} from "lucide-react";

const NAV_LINKS = [
  { to: "/sortingalgorithms",     label: "Sorting",             Icon: Hash },
  { to: "/searchingalgorithms",   label: "Searching",           Icon: Search },
  { to: "/graphalgorithms",       label: "Graphs",              Icon: Network },
  { to: "/treealgorithms",        label: "Trees",               Icon: TreePine },
  { to: "/stackalgorithms",       label: "Stacks",              Icon: Layers },
  { to: "/queuealgorithms",       label: "Queues",              Icon: Ticket },
  { to: "/linkedlistalgorithms",  label: "Linked Lists",        Icon: Link2 },
  { to: "/shortestpathalgorithms",label: "Shortest Path",       Icon: Map },
  { to: "/dynamicalgorithms",     label: "Dynamic Programming", Icon: Puzzle },
];

const TOP_LINKS = [
  { to: "/quiz",    label: "Quiz",    Icon: Brain },
  { to: "/compare", label: "Compare", Icon: BarChart3 },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const location = useLocation();

  const isActive = (to) => location.pathname === to;

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50"
      style={{
        background: "hsl(var(--bg) / 0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid hsl(var(--border) / 0.7)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center glow"
            style={{ background: "hsl(var(--accent))" }}
          >
            <Sparkles size={18} strokeWidth={2.5} className="text-[hsl(var(--bg))]" />
          </div>
          <span className="display text-lg font-bold tracking-tight">
            Algo<span className="gradient-text">Visualizer</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              color: isActive("/") ? "hsl(var(--accent))" : "hsl(var(--text-2))",
              background: isActive("/") ? "hsl(var(--accent) / 0.10)" : "transparent",
            }}
          >
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setDropOpen(true)}
            onMouseLeave={() => setDropOpen(false)}
          >
            <button className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 text-[hsl(var(--text-2))] hover:text-[hsl(var(--text))]">
              Algorithms
              <ChevronDown
                size={14}
                className="transition-transform"
                style={{ transform: dropOpen ? "rotate(180deg)" : "rotate(0)" }}
              />
            </button>

            <AnimatePresence>
              {dropOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.14 }}
                  className="absolute top-full left-0 mt-1 w-60 rounded-xl p-2"
                  style={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
                  }}
                >
                  {NAV_LINKS.map(({ to, label, Icon }) => (
                    <Link key={to} to={to} className="dropdown-item" onClick={() => setDropOpen(false)}>
                      <Icon size={14} /> {label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {TOP_LINKS.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors"
              style={{
                color: isActive(to) ? "hsl(var(--accent))" : "hsl(var(--text-2))",
                background: isActive(to) ? "hsl(var(--accent) / 0.10)" : "transparent",
              }}
            >
              <Icon size={14} /> {label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-[hsl(var(--text))]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: "1px solid hsl(var(--border))" }}
          >
            <div className="p-3 flex flex-col gap-1">
              <Link to="/" onClick={() => setMenuOpen(false)} className="dropdown-item">Home</Link>
              {NAV_LINKS.map(({ to, label, Icon }) => (
                <Link key={to} to={to} onClick={() => setMenuOpen(false)} className="dropdown-item">
                  <Icon size={14} /> {label}
                </Link>
              ))}
              <div className="h-px bg-[hsl(var(--border))] my-1" />
              {TOP_LINKS.map(({ to, label, Icon }) => (
                <Link key={to} to={to} onClick={() => setMenuOpen(false)} className="dropdown-item">
                  <Icon size={14} /> {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
