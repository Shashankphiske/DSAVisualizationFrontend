/**
 * Shared bar-chart visualization for sorting algorithms.
 * Pass the current viewArr + sets of indexes and it renders themed bars
 * using the .bar / .bar-* tokens in index.css.
 */
const BarsViz = ({
  values = [],
  comparing = [],
  sorted = [],
  pivotIndexes = [],
  swapped = false,
  width = 40,
  height = 280,
  gap = 8,
}) => {
  const max = Math.max(1, ...values);
  return (
    <div
      className="flex items-end justify-center w-full"
      style={{ height: `${height}px`, gap: `${gap}px` }}
    >
      {values.map((value, i) => {
        let cls = "bar bar-default";
        if (sorted.includes(i)) cls = "bar bar-sorted";
        else if (pivotIndexes.includes(i)) cls = "bar bar-pivot";
        else if (comparing.includes(i)) cls = swapped ? "bar bar-swap" : "bar bar-compare";
        const h = (value / max) * 100;
        return (
          <div key={i} className="bar-wrap" style={{ height: `${height - 30}px` }}>
            <span className="bar-label">{value}</span>
            <div className={cls} style={{ height: `${h}%`, width: `${width}px` }} />
          </div>
        );
      })}
    </div>
  );
};

export default BarsViz;
