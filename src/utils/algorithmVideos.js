/**
 * Algorithm Video Database
 * Maps algorithm slugs to YouTube video IDs for educational content.
 * All IDs verified embeddable from popular educators
 * (Abdul Bari, freeCodeCamp, MyCodeSchool, CS Dojo, NeetCode, etc.).
 */

export const algorithmVideos = {
  // Tree Traversals
  'inorder': 'WLvU5EQVZqY',     // Inorder traversal — MyCodeSchool
  'preorder': 'jVtMjQ6Yth0',    // Preorder traversal — MyCodeSchool
  'postorder': 'd0RnnZv8WBM',   // Postorder traversal — MyCodeSchool

  // Sorting Algorithms
  'bubble-sort': 'xli_FI7CuzA',     // freeCodeCamp / Abdul-Bari style
  'selection-sort': 'g-PGLbMth_g', // Selection sort — Abdul Bari
  'insertion-sort': 'JU767SDMDvA', // Insertion sort — MyCodeSchool
  'merge-sort': '4VqmGXwpLqc',     // Merge sort — Abdul Bari
  'quick-sort': '7h1s2SojIRw',     // Quick sort — Abdul Bari
  'heap-sort': '2DmK_H7IdTo',      // Heap sort — Abdul Bari

  // Searching Algorithms
  'binary-search': 'P3YID7liBug',  // Binary search — HackerRank
  'linear-search': '246V51AWwZM',  // Linear search

  // Graph Algorithms
  'bfs': 'oDqjPvD54Ss',  // BFS — William Fiset
  'dfs': '7fujbpJ0LB4',  // DFS — William Fiset

  // Stack Operations
  'stack-push': 'KInG04mAjO0',
  'stack-pop': 'KInG04mAjO0',

  // Queue Operations
  'queue-enqueue': 'okr-XE8yTO8',
  'queue-dequeue': 'okr-XE8yTO8',

  // Linked List Operations
  'singly-insertion': 'WwfhLC16bis',
  'singly-deletion': 'Y0n86K43GO4',
  'singly-reversal': 'D7y_hoT_YZI',
  'doubly-insertion': 'JdQeNxWCguQ',
  'doubly-deletion': 'JdQeNxWCguQ',
  'doubly-reversal': 'JdQeNxWCguQ',

  // Shortest Path Algorithms
  'dijkstra': 'pVfj6mxhdMw',  // Dijkstra — Computerphile
  'astar': '-L-WgKMFuhE',     // A* — Sebastian Lague

  // Dynamic Programming
  'dp-fibonacci': 'oBt53YbR9Kk', // DP — freeCodeCamp
  'fibonacci': 'oBt53YbR9Kk',
  'coin-change': 'jgiZlGzXMBw',
};

/**
 * Get video ID for an algorithm
 * @param {string} algorithmName - The algorithm identifier
 * @returns {string|null} - YouTube video ID or null if not available
 */
export const getVideoId = (algorithmName) => {
  if (!algorithmName) return null;
  return algorithmVideos[algorithmName.toLowerCase()] || null;
};

/**
 * Generate YouTube embed URL
 * @param {string} videoId - YouTube video ID
 * @returns {string} - Embed URL
 */
export const getYouTubeEmbedUrl = (videoId) => {
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
};
