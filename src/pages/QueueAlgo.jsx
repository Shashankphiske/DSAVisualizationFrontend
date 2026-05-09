import { Ticket, ArrowRightToLine, ArrowLeftFromLine } from "lucide-react";
import CategoryPage from "../components/CategoryPage";

const items = [
  { to: "/queue-enqueue", title: "Queue Enqueue", desc: "Add an element to the rear of the queue (FIFO).",  Icon: ArrowRightToLine,  badge: "O(1)" },
  { to: "/queue-dequeue", title: "Queue Dequeue", desc: "Remove an element from the front of the queue.",   Icon: ArrowLeftFromLine, badge: "O(1)" },
];

const QueueAlgo = () => (
  <CategoryPage
    icon={Ticket}
    eyebrow="Category · Queues"
    title="Queue Operations"
    subtitle="FIFO — First In, First Out — enqueue and dequeue visualized."
    description="Front and rear pointers · pointer movement"
    items={items}
  />
);

export default QueueAlgo;
