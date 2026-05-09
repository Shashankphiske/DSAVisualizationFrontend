import { Sprout } from "lucide-react";
import TreeTraversalTemplate from "../TreeTraversalTemplate";

const CODE = [
  "function inorder(root) {",
  "  if (root === null) return;",
  "  inorder(root.left);",
  "  visit(root);",
  "  inorder(root.right);",
  "}",
];

const InorderPage = () => (
  <TreeTraversalTemplate
    icon={Sprout}
    title="Inorder Traversal"
    description="Recursively walks Left → Root → Right. In a BST this yields nodes in sorted order."
    order="Left → Root → Right"
    endpoint="inorder"
    code={CODE}
    codeLine={3}
    leetcodeSlug="inorder"
  />
);

export default InorderPage;
