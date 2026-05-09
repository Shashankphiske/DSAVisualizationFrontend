/**
 * Themed horizontal list / linked-list visualization.
 *
 * Props:
 *   items       – array of values
 *   highlight   – array of values currently active (highlighted as "compare")
 *   secondary   – array of values to highlight as "secondary" (e.g. prev pointer)
 *   success     – array of values to highlight as "sorted/done"
 *   danger      – array of values to highlight as "swap/delete"
 *   connector   – string between cells: "→" (default), "⇄", or null (none)
 */
const ListViz = ({
  items = [],
  highlight = [],
  secondary = [],
  success = [],
  danger = [],
  connector = "→",
}) => {
  if (!items?.length) {
    return (
      <div className="text-xs font-mono text-[hsl(var(--text-2))] py-8">
        No data — press Play to start.
      </div>
    );
  }

  const isIn = (arr, v) => arr.includes(v);

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {items.map((value, idx) => {
        let cls = "node-cell";
        if (isIn(danger, value)) cls += " node-danger";
        else if (isIn(success, value)) cls += " node-success";
        else if (isIn(highlight, value)) cls += " node-active";
        else if (isIn(secondary, value)) cls += " node-secondary";

        return (
          <div key={idx} className="flex items-center gap-2">
            <div className={cls}>{value}</div>
            {connector && idx < items.length - 1 && (
              <span className="node-connector">{connector}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ListViz;
