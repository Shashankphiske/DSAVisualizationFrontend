import { Search, Binary, MoveRight } from "lucide-react";
import CategoryPage from "../components/CategoryPage";

const items = [
  { to: "/binary-search", title: "Binary Search", desc: "Logarithmic search on a sorted array using divide-and-conquer halving.", Icon: Binary,    badge: "O(log n)" },
  { to: "/linear-search", title: "Linear Search", desc: "Sequential scan that checks each element until the target is found.",   Icon: MoveRight, badge: "O(n)" },
];

const SearchingAlgo = () => (
  <CategoryPage
    icon={Search}
    eyebrow="Category · Searching"
    title="Searching Algorithms"
    subtitle="Locate elements in sorted and unsorted collections."
    description="Visualize search ranges, mid-points, and termination conditions"
    items={items}
  />
);

export default SearchingAlgo;
