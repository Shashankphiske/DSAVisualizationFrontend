import { useEffect, useRef } from "react";

/**
 * Code viewer panel with synchronized line highlighting.
 * Props:
 *   code            – string[]
 *   highlightedLine – 0-based index (or null)
 *   title           – filename in header
 */
const CodeViewer = ({ code, highlightedLine, title = "algorithm.js" }) => {
  const lineRefs = useRef([]);

  useEffect(() => {
    if (highlightedLine != null && lineRefs.current[highlightedLine]) {
      lineRefs.current[highlightedLine].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedLine]);

  return (
    <div className="code-viewer">
      <div className="code-viewer-header">
        <div className="code-viewer-dots">
          <span className="dot-red" />
          <span className="dot-yellow" />
          <span className="dot-green" />
        </div>
        <span className="code-viewer-title">{title}</span>
      </div>

      <div className="code-viewer-body">
        {code.map((line, i) => (
          <div
            key={i}
            ref={(el) => (lineRefs.current[i] = el)}
            className={`code-line${highlightedLine === i ? " code-line-active" : ""}`}
          >
            <span className="code-line-number">{i + 1}</span>
            <span className="code-line-content">{line || " "}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeViewer;
