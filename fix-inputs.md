# Input Validation Fix Pattern

## Pattern to Apply to All Algorithm Files

### 1. Add error state:
```jsx
const [error, setError] = useState("");
```

### 2. Add validation in handlePlay:
```jsx
if (parsedArray.length === 0 || !inputValid) {
  setError("Invalid input! Check format above.");
  return;
}
setError("");
```

### 3. Add error reset in handleReplay:
```jsx
setError("");
```

### 4. Update controls section:
```jsx
<div className="flex justify-center gap-4 mb-6 flex-wrap items-start">
  <div className="flex flex-col gap-2">
    <label className="text-sm text-gray-400">Demo: [format specific to algorithm]</label>
    <input ... />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
  
  <button disabled={isPlaying} className="... disabled:opacity-50 disabled:cursor-not-allowed mt-6">
    ▶ Play
  </button>
  <button disabled={!isPlaying} className="... disabled:opacity-50 disabled:cursor-not-allowed mt-6">
    ⏸ Pause
  </button>
  <button className="... mt-6">
    🔁 Replay
  </button>
</div>
```

## Files to Update:

### Sorting (6): ✅ BubbleSort, ⏳ Rest
- SelectionSortPage.jsx
- InsertionSortPage.jsx  
- MergeSortPage.jsx
- QuickSortPage.jsx
- HeapSortPage.jsx

### Searching (2):
- BinarySearchPage.jsx - Demo: "1,3,5,7,9,11" target: 7
- LinearSearchPage.jsx - Demo: "10,20,30,40,50" target: 30

### Trees (3):
- InorderPage.jsx - Demo: {"1":["2","3"],"2":["4","5"],"3":[null,null],"4":[null,null],"5":[null,null]}
- PreorderPage.jsx
- PostorderPage.jsx

### Graphs (2):
- BFSPage.jsx - Demo: {"0":["1","2"],"1":["0","3","4"],"2":["0","5"],"3":["1"],"4":["1"],"5":["2"]} root:0 target:5
- DFSPage.jsx

### Stack/Queue (4):
- StackPushPage.jsx - Demo: initial:10,20,30 push:40,50
- StackPopPage.jsx - Demo: 10,20,30,40,50
- QueueEnqueuePage.jsx
- QueueDequeuePage.jsx

### Linked List (6):
- SinglyInsertionPage.jsx - Demo: list:1,2,3,4 value:99 index:2
- SinglyDeletionPage.jsx - Demo: 1,2,3,4,5 index:2
- SinglyReversalPage.jsx - Demo: 1,2,3,4,5
- DoublyInsertionPage.jsx
- DoublyDeletionPage.jsx
- DoublyReversalPage.jsx

### Shortest Path (2):
- DijkstraPage.jsx - Demo: {"A":{"B":1,"C":4},"B":{"A":1,"C":2,"D":5},"C":{"A":4,"B":2,"D":1},"D":{"B":5,"C":1}} start:A end:D
- AStarPage.jsx
