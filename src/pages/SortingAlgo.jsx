import { Hash, Target, ArrowDownNarrowWide, Shuffle, Zap, Mountain, Layers } from "lucide-react";
import CategoryPage from "../components/CategoryPage";

const items = [
  { to: "/bubble-sort",    title: "Bubble Sort",    desc: "Simple comparison-based sorting that bubbles the largest element to the end of each pass.", Icon: Layers,             badge: "O(n²)" },
  { to: "/selection-sort", title: "Selection Sort", desc: "Repeatedly selects the minimum element and places it in the next sorted position.",          Icon: Target,             badge: "O(n²)" },
  { to: "/insertion-sort", title: "Insertion Sort", desc: "Builds the sorted array one element at a time by inserting each new element into place.",     Icon: ArrowDownNarrowWide, badge: "O(n²)" },
  { to: "/merge-sort",     title: "Merge Sort",     desc: "Divide-and-conquer algorithm that splits the array, sorts each half, then merges them.",      Icon: Shuffle,            badge: "O(n log n)" },
  { to: "/quick-sort",     title: "Quick Sort",     desc: "Efficient pivot-based partitioning algorithm with strong average-case performance.",          Icon: Zap,                badge: "O(n log n)" },
  { to: "/heap-sort",      title: "Heap Sort",      desc: "Uses a binary max-heap to extract the largest element repeatedly into a sorted suffix.",      Icon: Mountain,           badge: "O(n log n)" },
];

const SortingAlgo = () => (
  <CategoryPage
    icon={Hash}
    eyebrow="Category · Sorting"
    title="Sorting Algorithms"
    subtitle="Master comparison and divide-and-conquer sorting techniques."
    description="Step-by-step playback · custom inputs · time & space complexity"
    items={items}
  />
);

export default SortingAlgo;
