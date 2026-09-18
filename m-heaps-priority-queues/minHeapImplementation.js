/* ============================================================================
 * 🎯 MINHEAP SCRATCH IMPLEMENTATION (CUSTOM JAVASCRIPT OBJECT MODEL)
 * ============================================================================
 * 📋 CODE SUMMARY:
 * - A custom, high-performance MinHeap utility designed explicitly for JavaScript.
 * - Simulates a complete binary tree inside a flat sequential array wrapper.
 * - Maintains structural sorted invariant properties dynamically across all boundaries.
 * ============================================================================
 */

class MinHeap {
    constructor() {
        this.heap = [];
    }

    // Mathematical indexing formulas to locate binary components in an array
    getLeftChildIndex(i)  { return (2 * i) + 1; }
    getRightChildIndex(i) { return (2 * i) + 2; }
    getParentIndex(i)     { return Math.floor((i - 1) / 2); }

    /**
     * ➕ INSERTION OPERATION
     * - Time Complexity: O(log N)
     * - Strategy: Append the value to the end of the array, then bubble it up
     *             until the Min-Heap property is restored.
     */
    insert(val) {
        this.heap.push(val);
        let lastIndex = this.heap.length - 1;
        this.heapifyUp(lastIndex);
    }

    heapifyUp(i) {
        while (i > 0) {
            let parentIndex = this.getParentIndex(i);
            // If child value is smaller than parent, swap them (bubble up)
            if (this.heap[i] < this.heap[parentIndex]) {
                [this.heap[i], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[i]];
                i = parentIndex; // Move tracking pointer to parent position
            } else break;
        }
    }

    /**
     * ❌ EXTRACTION OPERATION (POP ROOT)
     * - Time Complexity: O(log N)
     * - Strategy: Swap the root element with the last item, pop the old root from the end,
     *             and trickle the new root down to its correct position.
     */
    extract() {
        if (this.heap.length < 1) return null;
        let min = this.heap[0];
        let lastIndex = this.heap.length - 1;

        // Step 1: Swap root with last leaf element
        [this.heap[0], this.heap[lastIndex]] = [this.heap[lastIndex], this.heap[0]];

        // Step 2: Remove the minimum value from the end of the array
        this.heap.pop();

        // Step 3: Sift the displaced top node down to heal the heap property
        this.heapifyDown(0);
        return min;
    }

    heapifyDown(i) {
        let left = this.getLeftChildIndex(i);
        let right = this.getRightChildIndex(i);
        let n = this.heap.length;

        let smallest = i;

        // Compare with left child
        if (left < n && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }
        // Compare with right child
        if (right < n && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }

        // If one of the children is smaller, swap and recurse downward
        if (smallest !== i) {
            [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
            this.heapifyDown(smallest);
        }
    }

    /**
     * 👀 PEEK OPERATION
     * - Time Complexity: O(1)
     * - Strategy: Instantly access index 0 where the minimum element resides.
     */
    peek() {
        if (!this.heap.length) return null;
        return this.heap[0];
    }
}

// --- Execution & Testing ---
console.log("--- Testing Custom MinHeap Object Model ---");
let heap = new MinHeap();

heap.insert(5);
heap.insert(20);
heap.insert(4);
heap.insert(10);
heap.insert(1);
heap.insert(0);
console.log("Heap state after insertions:   ", [...heap.heap]); // Visual Validation

console.log("Extracted Min Element (Expected 0):", heap.extract());
console.log("Extracted Min Element (Expected 1):", heap.extract());
console.log("Heap state after extractions:  ", [...heap.heap]);

console.log("Current Min Peek (Expected 4):   ", heap.peek());
heap.insert(7);
console.log("Heap state after inserting 7:  ", [...heap.heap]);


/* ============================================================================
 * 📂 APPROACH 1: CUSTOM SEQUENTIAL ARRAY MINHEAP IMPLEMENTATION
 * ============================================================================
 * | Heap Operation         | Time Complexity | Space Complexity (Auxiliary)  |
 * |------------------------|-----------------|-------------------------------|
 * | insert(val)            | O(log N)        | O(1) [Iterative HeapifyUp]    |
 * | extract()              | O(log N)        | O(log N) [Recursive HeapifyDn]|
 * | peek()                 | O(1)            | O(1)                          |
 * ============================================================================
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Structural CBT Rule: Using standard formulas `(2*i)+1` and `(2*i)+2` entirely
 *   removes the memory footprint of physical pointers, keeping allocations tightly linear.
 * - Array Destructuring Swap: Utilizing `[a, b] = [b, a]` provides a clean, syntax-safe alternative
 *   to manual temporary variable swaps inside JavaScript runtimes.
 * - Extraction Boundary Shielding: The checks `left < n` and `right < n` inside the `heapifyDown`
 *   method prevent the comparison loop from accessing out-of-bound or undefined memory slots.
 * ============================================================================
 */
