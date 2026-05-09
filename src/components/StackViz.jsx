/**
 * Themed vertical stack visualization (top → bottom).
 * Top of stack rendered visually at the top.
 */
const StackViz = ({ items = [], highlightTop = false, danger = false }) => {
  if (!items.length) {
    return <div className="text-xs font-mono text-[hsl(var(--text-2))] py-8">Stack is empty.</div>;
  }
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-[10px] font-mono uppercase tracking-widest text-[hsl(var(--accent))]">
        ↑ Top
      </div>
      {[...items].reverse().map((value, idx) => {
        const isTop = idx === 0;
        let cls = "stack-item";
        if (isTop && highlightTop) cls += danger ? " top" : " top";
        return (
          <div key={idx} className={cls} style={!highlightTop && isTop ? { borderColor: "hsl(var(--accent))", color: "hsl(var(--accent))" } : undefined}>
            {value}
          </div>
        );
      })}
      <div className="text-[10px] font-mono text-[hsl(var(--text-3))]">▔▔▔ Bottom ▔▔▔</div>
    </div>
  );
};

export default StackViz;
