import { Trees } from "lucide-react";
import TreeTraversalTemplate from "../TreeTraversalTemplate";

const CODE = [
  "function postorder(root) {",
  "  if (root === null) return;",
  "  postorder(root.left);",
  "  postorder(root.right);",
  "  visit(root);",
  "}",
];

const PostorderPage = () => (
  <TreeTraversalTemplate
    icon={Trees}
    title="Postorder Traversal"
    description="Recursively walks Left → Right → Root. Useful for tree deletion and postfix expressions."
    order="Left → Right → Root"
    endpoint="postorder"
    code={CODE}
    codeLine={4}
    leetcodeSlug="postorder"
  />
);

export default PostorderPage;
