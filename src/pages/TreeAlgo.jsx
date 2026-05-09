import { TreePine, ArrowLeftRight, ChevronUp, ChevronDown } from "lucide-react";
import CategoryPage from "../components/CategoryPage";

const items = [
  { to: "/inorder",   title: "Inorder Traversal",   desc: "Left → Root → Right. Produces sorted output for BSTs.", Icon: ArrowLeftRight, badge: "L · Root · R" },
  { to: "/preorder",  title: "Preorder Traversal",  desc: "Root → Left → Right. Useful for tree copying and prefix expressions.", Icon: ChevronUp,   badge: "Root · L · R" },
  { to: "/postorder", title: "Postorder Traversal", desc: "Left → Right → Root. Used for tree deletion and postfix evaluation.",  Icon: ChevronDown, badge: "L · R · Root" },
];

const TreeAlgo = () => (
  <CategoryPage
    icon={TreePine}
    eyebrow="Category · Trees"
    title="Tree Traversals"
    subtitle="Visit every node of a binary tree in three classic orders."
    description="Recursive walk · ordered visit lists"
    items={items}
  />
);

export default TreeAlgo;
