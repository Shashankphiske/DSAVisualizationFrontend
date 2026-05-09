import { Puzzle, Hash, Coins } from "lucide-react";
import CategoryPage from "../components/CategoryPage";

const items = [
  { to: "/dp/fibonacci",  title: "Fibonacci DP",  desc: "Bottom-up Fibonacci computation using memoization to avoid exponential recursion.", Icon: Hash,  badge: "DP" },
  { to: "/dp/coinchange", title: "Coin Change",   desc: "Find the minimum number of coins needed to form a target amount.",                  Icon: Coins, badge: "DP" },
];

const DynamicAlgorithms = () => (
  <CategoryPage
    icon={Puzzle}
    eyebrow="Category · Dynamic Programming"
    title="Dynamic Programming"
    subtitle="Solve complex problems by combining sub-solutions."
    description="DP table evolution · per-cell highlights · final result"
    items={items}
  />
);

export default DynamicAlgorithms;
