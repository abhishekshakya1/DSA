/* ============================================================================
 * 🎯 PRIORITY QUEUE BLUEPRINT (ARRAY-SORT VS BINARY-HEAP OBJECT MODEL)
 * ============================================================================
 * 📋 CODE SUMMARY:
 * - Double Implementation: Contrasts a naive sorted-array PQ with an optimized Binary Heap PQ.
 * - Max-Priority Structure: Elements with higher priority fields bubble up to index 0.
 * - Memory Invariant: Utilizes pure iterative loops to freeze stack memory footprint to O(1).
 * ============================================================================
 */

/**
 * 📂 APPROACH 1: NAIVE SORTED-ARRAY PRIORITY QUEUE
 * - Great for quick validation scripts or small datasets.
 * - Pitfall: High time complexity on insertions due to continuous array re-sorting.
 */
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  // Time Complexity: O(N log N) due to sorting on every single entry
  enqueue(value, priority) {
    this.queue.push({ value, priority });
    this.queue.sort((a, b) => b.priority - a.priority); // Highest Priority first
  }

  // Time Complexity: O(N) because shift() requires re-indexing remaining elements
  dequeue() {
    return this.queue.shift();
  }

  peek() {
    return this.queue[0];
    }
    
  isEmpty() {
    return this.queue.length === 0;
  }
}

// --- Demo Execution for Sorted Array PQ ---
console.log('--- Testing Sorted-Array Priority Queue ---');
const pq = new PriorityQueue();
pq.enqueue('Fever', 1);
pq.enqueue('Accident', 5);
pq.enqueue('Headache', 3);
console.log('Dequeued (Expected Accident):', pq.dequeue().value);
console.log('Dequeued (Expected Headache):', pq.dequeue().value);

/**
 * 📂 APPROACH 2: HIGH-PERFORMANCE BINARY-HEAP MAX-PRIORITY QUEUE
 * - Standard production blueprint for heavy data processing.
 * - Optimizes structural operations cleanly down to logarithmic limits.
 */
class MaxPriorityQueue {
  constructor() {
    this.heap = [];
  }

  // Time Complexity: O(log N)
  enqueue(value, priority) {
    this.heap.push({ value, priority });
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      // If child's priority is less than or equal to parent, max-heap invariant is met
      if (this.heap[index].priority <= this.heap[parent].priority) break;
      this.swap(index, parent);
      index = parent;
    }
  }

  // Time Complexity: O(log N)
  dequeue() {
    if (this.heap.length === 0) return null;
    const max = this.heap[0];
    const end = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = end; // Move the last leaf to the root position
      this.heapifyDown();
    }
    return max;
  }

  // Pure Constant Auxiliary Space Variant: O(1) loop replaces stack recursion
  heapifyDown() {
    let index = 0;
    let length = this.heap.length;
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let largest = index;

      if (
        left < length &&
        this.heap[left].priority > this.heap[largest].priority
      ) {
        largest = left;
      }

      if (
        right < length &&
        this.heap[right].priority > this.heap[largest].priority
      ) {
        largest = right;
      }

      if (largest === index) break; // Balanced positioning matched, exit processing
      this.swap(index, largest);
      index = largest; // Shift pointer down the branch
    }
  }

  front() {
    return this.heap.length > 0 ? this.heap[0] : null;
    }

  size() {
    return this.heap.length;
    }

  isEmpty() {
    return this.heap.length === 0;
    }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

// --- Testing Binary Heap PQ ---
console.log('\n--- Testing Binary Heap Max-Priority Queue ---');
const maxPq = new MaxPriorityQueue();
maxPq.enqueue('Fever', 1);
maxPq.enqueue('Accident', 5);
maxPq.enqueue('Headache', 3);
console.log('Dequeued from Heap (Expected Accident):', maxPq.dequeue().value);
console.log('Dequeued from Heap (Expected Headache):', maxPq.dequeue().value);

/* ============================================================================
 * 📊 ALGORITHMIC COMPLEXITY COMPARISON MATRIX
 * ============================================================================
 * | Implementation Type   | Enqueue Time | Dequeue Time | Space (Auxiliary)  |
 * |-----------------------|--------------|--------------|--------------------|
 * | 1. Sorted-Array PQ    | O(N log N)   | O(N)         | O(1)               |
 * | 2. Binary-Heap PQ     | O(log N)     | O(log N)     | O(1) [Pure Loop]   |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - Why Array Shift Cost? In the sorted array approach, `shift()` takes linear O(N)
 *   time because the engine has to re-index all remaining items in memory.
 * - Zero Stack Footprint: Because your `heapifyDown` uses a flat loop (`while(true)`)
 *   instead of standard recursion, it completely avoids creating recursive stack frames,
 *   keeping the total auxiliary space complexity down to absolute constant O(1).
 * - Priority Object Invariant: Comparisons are bound specifically to the `.priority`
 *   scalar properties, leaving the internal data payload values completely untouched.
 * ============================================================================
 */
