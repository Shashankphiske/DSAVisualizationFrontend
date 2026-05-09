import { Layers, ArrowUp, ArrowDown } from "lucide-react";
import CategoryPage from "../components/CategoryPage";

const items = [
  { to: "/stack-push", title: "Stack Push", desc: "Add an element to the top of the stack (LIFO).",       Icon: ArrowUp,   badge: "O(1)" },
  { to: "/stack-pop",  title: "Stack Pop",  desc: "Remove the top element from the stack (LIFO).",        Icon: ArrowDown, badge: "O(1)" },
];

const StackAlgo = () => (
  <CategoryPage
    icon={Layers}
    eyebrow="Category · Stacks"
    title="Stack Operations"
    subtitle="LIFO — Last In, First Out — push and pop visualized."
    description="Highlighted top of stack · pointer animation"
    items={items}
  />
);

export default StackAlgo;
