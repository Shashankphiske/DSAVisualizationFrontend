import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";

// Sorting
import BubbleSortPage from "./algo/BubbleSortPage";
import SelectionSortPage from "./algo/SelectionSortPage";
import InsertionSortPage from "./algo/InsertionSortPage";
import MergeSortPage from "./algo/MergeSortPage";
import QuickSortPage from "./algo/QuickSortPage";
import HeapSortPage from "./algo/HeapSortPage";

// Searching
import BinarySearchPage from "./algo/BinarySearchPage";
import LinearSearchPage from "./algo/LinearSearchPage";

// Graph
import BFSPage from "./algo/BFSPage";
import DFSPage from "./algo/DFSPage";

// Tree
import InorderPage from "./algo/InorderPage";
import PreorderPage from "./algo/PreorderPage";
import PostorderPage from "./algo/PostorderPage";

// Stack
import StackPushPage from "./algo/StackPushPage";
import StackPopPage from "./algo/StackPopPage";

// Queue
import QueueEnqueuePage from "./algo/QueueEnqueuePage";
import QueueDequeuePage from "./algo/QueueDequeuePage";

// Linked List
import SinglyInsertionPage from "./algo/SinglyInsertionPage";
import SinglyDeletionPage from "./algo/SinglyDeletionPage";
import SinglyReversalPage from "./algo/SinglyReversalPage";
import DoublyInsertionPage from "./algo/DoublyInsertionPage";
import DoublyDeletionPage from "./algo/DoublyDeletionPage";
import DoublyReversalPage from "./algo/DoublyReversalPage";

// Shortest Path
import DijkstraPage from "./algo/DijkstraPage";
import AStarPage from "./algo/AStarPage";

// Category Pages
import SortingAlgo from "./pages/SortingAlgo";
import SearchingAlgo from "./pages/SearchingAlgo";
import GraphAlgo from "./pages/GraphAlgo";
import TreeAlgo from "./pages/TreeAlgo";
import StackAlgo from "./pages/StackAlgo";
import QueueAlgo from "./pages/QueueAlgo";
import LinkedListAlgo from "./pages/LinkedListAlgo";
import ShortestPathAlgo from "./pages/ShortestPathAlgo";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Category Pages */}
        <Route path="/sortingalgorithms" element={<SortingAlgo />} />
        <Route path="/searchingalgorithms" element={<SearchingAlgo />} />
        <Route path="/graphalgorithms" element={<GraphAlgo />} />
        <Route path="/treealgorithms" element={<TreeAlgo />} />
        <Route path="/stackalgorithms" element={<StackAlgo />} />
        <Route path="/queuealgorithms" element={<QueueAlgo />} />
        <Route path="/linkedlistalgorithms" element={<LinkedListAlgo />} />
        <Route path="/shortestpathalgorithms" element={<ShortestPathAlgo />} />
        
        {/* Sorting Algorithms */}
        <Route path="/bubble-sort" element={<BubbleSortPage />} />
        <Route path="/selection-sort" element={<SelectionSortPage />} />
        <Route path="/insertion-sort" element={<InsertionSortPage />} />
        <Route path="/merge-sort" element={<MergeSortPage />} />
        <Route path="/quick-sort" element={<QuickSortPage />} />
        <Route path="/heap-sort" element={<HeapSortPage />} />
        
        {/* Searching Algorithms */}
        <Route path="/binary-search" element={<BinarySearchPage />} />
        <Route path="/linear-search" element={<LinearSearchPage />} />
        
        {/* Graph Algorithms */}
        <Route path="/bfs" element={<BFSPage />} />
        <Route path="/dfs" element={<DFSPage />} />
        
        {/* Tree Algorithms */}
        <Route path="/inorder" element={<InorderPage />} />
        <Route path="/preorder" element={<PreorderPage />} />
        <Route path="/postorder" element={<PostorderPage />} />
        
        {/* Stack Algorithms */}
        <Route path="/stack-push" element={<StackPushPage />} />
        <Route path="/stack-pop" element={<StackPopPage />} />
        
        {/* Queue Algorithms */}
        <Route path="/queue-enqueue" element={<QueueEnqueuePage />} />
        <Route path="/queue-dequeue" element={<QueueDequeuePage />} />
        
        {/* Linked List Algorithms */}
        <Route path="/singly-insertion" element={<SinglyInsertionPage />} />
        <Route path="/singly-deletion" element={<SinglyDeletionPage />} />
        <Route path="/singly-reversal" element={<SinglyReversalPage />} />
        <Route path="/doubly-insertion" element={<DoublyInsertionPage />} />
        <Route path="/doubly-deletion" element={<DoublyDeletionPage />} />
        <Route path="/doubly-reversal" element={<DoublyReversalPage />} />
        
        {/* Shortest Path Algorithms */}
        <Route path="/dijkstra" element={<DijkstraPage />} />
        <Route path="/astar" element={<AStarPage />} />
      </Routes>
    </Router>
  );
};

export default App;
