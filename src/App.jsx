import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import BubbleSortPage from "./algo/BubbleSortPage";
import Navbar from "./Navbar";
import SelectionSortPage from "./algo/SelectionSortPage";
import InsertionSortPage from "./algo/InsertionSortPage";
import MergeSortPage from "./algo/MergeSortPage";
import QuickSortPage from "./algo/QuickSortPage";
import HeapSortPage from "./algo/HeapSortPage";
import SortingAlgo from "./pages/SortingAlgo";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sortingalgorithms" element={<SortingAlgo />} />
        <Route path="/bubble-sort" element={<BubbleSortPage />} />
        <Route path="/selection-sort" element={<SelectionSortPage />} />
        <Route path="/insertion-sort" element={<InsertionSortPage />} />
        <Route path="/merge-sort" element={<MergeSortPage />} />
        <Route path="/quick-sort" element={<QuickSortPage />} />
        <Route path="/heap-sort" element={<HeapSortPage />} />
      </Routes>
    </Router>
  );
};

export default App;
