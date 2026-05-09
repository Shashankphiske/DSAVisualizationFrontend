import { BarChart3, Check, X } from "lucide-react";
import { AlgoPageShell, AlgoPageHeader } from "../AlgoPageTemplate";

const Compare = () => {
  return (
    <AlgoPageShell>
      <AlgoPageHeader
        icon={BarChart3}
        title="Platform Comparison"
        description="A direct feature comparison against existing DSA visualization tools, demonstrating the unique contributions of this platform."
      />

      <div className="max-w-5xl mx-auto mt-8">
        <div className="card p-0 overflow-hidden border border-[hsl(var(--border))] rounded-2xl bg-[hsl(var(--card))]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="bg-[hsl(var(--bg-2))] p-4 text-left font-bold text-[hsl(var(--text-2))] text-xs uppercase tracking-wider border-b border-[hsl(var(--border))]">Feature</th>
                  <th className="bg-[hsl(var(--bg-2))] p-4 text-left font-bold text-[hsl(var(--accent))] text-xs uppercase tracking-wider border-b border-[hsl(var(--border))]">This Platform</th>
                  <th className="bg-[hsl(var(--bg-2))] p-4 text-left font-bold text-[hsl(var(--text-2))] text-xs uppercase tracking-wider border-b border-[hsl(var(--border))]">VisuAlgo</th>
                  <th className="bg-[hsl(var(--bg-2))] p-4 text-left font-bold text-[hsl(var(--text-2))] text-xs uppercase tracking-wider border-b border-[hsl(var(--border))]">algorithm-visualizer</th>
                  <th className="bg-[hsl(var(--bg-2))] p-4 text-left font-bold text-[hsl(var(--text-2))] text-xs uppercase tracking-wider border-b border-[hsl(var(--border))]">CS Academy</th>
                  <th className="bg-[hsl(var(--bg-2))] p-4 text-left font-bold text-[hsl(var(--text-2))] text-xs uppercase tracking-wider border-b border-[hsl(var(--border))]">USFCA Tools</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-[hsl(var(--bg-3))] transition-colors">
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--text))]">Custom User Input</td>
                  <td className="p-4 border-b border-[hsl(var(--border))] font-bold text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                </tr>
                <tr className="hover:bg-[hsl(var(--bg-3))] transition-colors">
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--text))]">Step-Backward Navigation</td>
                  <td className="p-4 border-b border-[hsl(var(--border))] font-bold text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                </tr>
                <tr className="hover:bg-[hsl(var(--bg-3))] transition-colors">
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--text))]">Variable Execution Speed</td>
                  <td className="p-4 border-b border-[hsl(var(--border))] font-bold text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                </tr>
                <tr className="hover:bg-[hsl(var(--bg-3))] transition-colors">
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--text))]">Synchronized Code Highlighting</td>
                  <td className="p-4 border-b border-[hsl(var(--border))] font-bold text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                </tr>
                <tr className="hover:bg-[hsl(var(--bg-3))] transition-colors">
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--text))]">Prediction / Quiz Mode</td>
                  <td className="p-4 border-b border-[hsl(var(--border))] font-bold text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                </tr>
                <tr className="hover:bg-[hsl(var(--bg-3))] transition-colors">
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--text))]">Complexity Reference Panel</td>
                  <td className="p-4 border-b border-[hsl(var(--border))] font-bold text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                </tr>
                <tr className="hover:bg-[hsl(var(--bg-3))] transition-colors">
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--text))]">Installation-Free (Browser)</td>
                  <td className="p-4 border-b border-[hsl(var(--border))] font-bold text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                </tr>
                <tr className="hover:bg-[hsl(var(--bg-3))] transition-colors">
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--text))]">Sorting Algorithms</td>
                  <td className="p-4 border-b border-[hsl(var(--border))] font-bold text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                </tr>
                <tr className="hover:bg-[hsl(var(--bg-3))] transition-colors">
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--text))]">Linked List Operations</td>
                  <td className="p-4 border-b border-[hsl(var(--border))] font-bold text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                </tr>
                <tr className="hover:bg-[hsl(var(--bg-3))] transition-colors">
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--text))]">Graph Algorithms</td>
                  <td className="p-4 border-b border-[hsl(var(--border))] font-bold text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-b border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                </tr>
                <tr className="hover:bg-[hsl(var(--bg-3))] transition-colors">
                  <td className="p-4 border-[hsl(var(--border))] text-[hsl(var(--text))]">Open Source</td>
                  <td className="p-4 border-[hsl(var(--border))] font-bold text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-[hsl(var(--border))] text-[hsl(var(--accent))]"><Check size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                  <td className="p-4 border-[hsl(var(--border))] text-[hsl(var(--accent-4))]"><X size={18} className="inline mr-1"/></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-[hsl(var(--bg-2))] p-4 border-t border-[hsl(var(--border))]">
            <p className="text-[hsl(var(--text-3))] text-xs font-mono">
              Data based on feature audit conducted April 2026. ✓ = supported, ✗ = not supported.
            </p>
          </div>
        </div>
      </div>
    </AlgoPageShell>
  );
};

export default Compare;
