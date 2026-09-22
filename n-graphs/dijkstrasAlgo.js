/* ============================================================================
 * 🎯 DIJKSTRA'S ALGORITHM (SINGLE SOURCE SHORTEST PATH FOR WEIGHTED GRAPHS)
 * ============================================================================
 * 📋 CODE SUMMARY:
 * - Computes the absolute shortest path from a source node to all other vertices.
 * - Engineered specifically to handle Weighted Graphs containing non-negative weights.
 * - Leverages a Min-Heap/Priority Queue coupled with dynamic lazy pruning guards.
 * ============================================================================
 */


class MinHeap {
  constructor() {
    this.heap = [];
  }

  parent(i) {
    return Math.floor((i - 1) / 2);
  }
  left(i) {
    return 2 * i + 1;
  }
  right(i) {
    return 2 * i + 2;
  }

  size() {
    return this.heap.length;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  push(pair) {
    this.heap.push(pair);
    this.heapifyUp();
  }

  heapifyUp() {
    let i = this.heap.length - 1;
    while (i > 0 && this.heap[i][0] < this.heap[this.parent(i)][0]) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return root;
  }

  heapifyDown() {
    let i = 0;
    while (true) {
      let smallest = i;
      let left = this.left(i);
      let right = this.right(i);

      if (
        left < this.heap.length &&
        this.heap[left][0] < this.heap[smallest][0]
      ) {
        smallest = left;
      }
      if (
        right < this.heap.length &&
        this.heap[right][0] < this.heap[smallest][0]
      ) {
        smallest = right;
      }

      if (smallest !== i) {
        this.swap(i, smallest);
        i = smallest;
      } else {
        break;
      }
    }
  }
};


const dijkstras = (graph, src) => {
    let n = graph.length;
    let dist = new Array(n).fill(Infinity);
    dist[src] = 0;

    let pq = new MinHeap();
    pq.push([0, src]);  // [distance, node]

    while (pq.size()) {
        let [nodeDist, node] = pq.pop();

        if (nodeDist > dist[node]) continue;

        for (let [neighbor, weight] of graph[node]) {
            let newDist = dist[node] + weight;
            if (newDist < dist[neighbor]) {
                dist[neighbor] = newDist;
                pq.push([newDist, neighbor]);
            }
        }
    }
    return dist;
};


const graph = [
    [[1, 2], [2, 4]],
    [[3, 7], [2, 1]],
    [[4, 3], [5, 1]],
    [[6, 1]],
    [[3, 2], [6, 5]],
    [[3, 3], [6, 8]],
    []
];

let result = dijkstras(graph, 0);
console.log(result);


/* ============================================================================
 * 📂 APPROACH 1: GREEDY EDGE RELAXATION VIA PRIORITY QUEUE MIN-HEAP
 * ============================================================================
 * | Scenario / Metrics    | Time Complexity       | Space Complexity (Auxiliary) |
 * |-----------------------|-----------------------|------------------------------|
 * | Total Execution Bounds| O((V + E) * log V)    | O(V + E)                     |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - Why not standard BFS? Standard BFS assumes all edge costs are uniform (equal to 1).
 *   If graphs contain varying weights, a longer structural path (more hops) might mathematically
 *   cost less than a direct short hop. Dijkstra uses a Greedy strategy to handle this.
 * - The Negative Weight Fatal Invariant: Dijkstra's algorithm **fails completely** if the graph
 *   contains even a single negative weight edge. It falls into an infinite greedy cycle loop.
 *   For negative weighted configurations, you must use the **Bellman-Ford Algorithm**.
 * - Stale State Pruning Win: Highlight the `nodeDist > dist[node]` block to your interviewer.
 *   Because JavaScript arrays don't support an in-place `decreaseKey()` operation natively inside heaps,
 *   we lazily push new pairs. This conditional check prunes old duplicates in optimal O(1) time.
 * ============================================================================
 */
