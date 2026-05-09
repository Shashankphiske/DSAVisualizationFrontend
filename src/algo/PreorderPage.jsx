import { TreePine } from "lucide-react";
import TreeTraversalTemplate from "../TreeTraversalTemplate";

const CODE = [
  "function preorder(root) {",
  "  if (root === null) return;",
  "  visit(root);",
  "  preorder(root.left);",
  "  preorder(root.right);",
  "}",
];

const PreorderPage = () => (
  <TreeTraversalTemplate
    icon={TreePine}
    title="Preorder Traversal"
    description="Recursively walks Root → Left → Right. Used to copy a tree or write prefix expressions."
    order="Root → Left → Right"
    endpoint="preorder"
    code={CODE}
    codeLine={2}
    leetcodeSlug="preorder"
  />
);

export default PreorderPage;
