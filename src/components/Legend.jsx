const Legend = ({ items }) => (
  <div className="legend mt-3 justify-center">
    {items.map((it) => (
      <div key={it.label} className="legend-item">
        <span className="legend-dot" style={{ background: it.color }} />
        {it.label}
      </div>
    ))}
  </div>
);

export default Legend;
