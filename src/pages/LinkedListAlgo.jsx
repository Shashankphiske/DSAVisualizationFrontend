import { Link2, Plus, Minus, RotateCcw } from "lucide-react";
import CategoryPage from "../components/CategoryPage";

const items = [
  { to: "/singly-insertion", title: "Singly · Insertion", desc: "Insert a node at any position in a singly linked list.", Icon: Plus,      badge: "Singly" },
  { to: "/singly-deletion",  title: "Singly · Deletion",  desc: "Remove a node by index from a singly linked list.",      Icon: Minus,     badge: "Singly" },
  { to: "/singly-reversal",  title: "Singly · Reversal",  desc: "Reverse all next pointers iteratively in O(1) space.",   Icon: RotateCcw, badge: "Singly" },
  { to: "/doubly-insertion", title: "Doubly · Insertion", desc: "Insert a node and update both prev and next pointers.",   Icon: Plus,      badge: "Doubly", badgeTone: "secondary" },
  { to: "/doubly-deletion",  title: "Doubly · Deletion",  desc: "Delete a node and re-link both prev and next pointers.",  Icon: Minus,     badge: "Doubly", badgeTone: "secondary" },
  { to: "/doubly-reversal",  title: "Doubly · Reversal",  desc: "Swap prev and next pointers across every node.",          Icon: RotateCcw, badge: "Doubly", badgeTone: "secondary" },
];

const LinkedListAlgo = () => (
  <CategoryPage
    icon={Link2}
    eyebrow="Category · Linked Lists"
    title="Linked List Operations"
    subtitle="Singly and doubly linked list manipulations."
    description="Pointer rewiring · sequential traversal · O(1) tail ops"
    items={items}
  />
);

export default LinkedListAlgo;
