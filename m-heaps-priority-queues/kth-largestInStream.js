/*
Problem statement -
You are part of a university admissions office and need to keep track of the kth highest test score from applicants in real-time. This helps to determine cut-off marks for interviews and admissions dynamically as new applicants submit their scores.

You are tasked to implement a class which, for a given integer k, maintains a stream of test scores and continuously returns the kth highest test score after a new score has been submitted. More specifically, we are looking for the kth highest score in the sorted list of all scores.

Implement the KthLargest class:

-> KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of test scores nums.

-> int add(int val) Adds a new test score val to the stream and returns the element representing the kth largest element in the pool of test scores so far.


Example 1:
Input:
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output: [null, 4, 5, 5, 8, 8]
Explanation:
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3); // return 4
kthLargest.add(5); // return 5
kthLargest.add(10); // return 5
kthLargest.add(9); // return 8
kthLargest.add(4); // return 8


Example 2:
Input:
["KthLargest", "add", "add", "add", "add"]
[[4, [7, 7, 7, 7, 8, 3]], [2], [10], [9], [9]]
Output: [null, 7, 7, 7, 8]
Explanation:
KthLargest kthLargest = new KthLargest(4, [7, 7, 7, 7, 8, 3]);
kthLargest.add(2); // return 7
kthLargest.add(10); // return 7
kthLargest.add(9); // return 7
kthLargest.add(9); // return 8


Constraints:
-> 0 <= nums.length <= 10^4
-> 1 <= k <= nums.length + 1
-> -10^4 <= nums[i] <= 10^4
-> -10^4 <= val <= 10^4
-> At most 10^4 calls will be made to add.


## Solve on leetcode -> https://leetcode.com/problems/kth-largest-element-in-a-stream/description/

*/

/**
 * @param {number} k
 * @param {number[]} nums
 */

class KthLargest {
  constructor(k, nums) {
    // Instantiate the priority queue on the object instance scope
    this.heap = new MinPriorityQueue();
    this.k = k;

    // Load initial stream elements into our bounded heap container
    for (let i = 0; i < nums.length; i++) {
      this.add(nums[i]);
    }
  }

  /**
   * @param {number} val
   * @return {number}
   */
  add(val) {
    // Step 1: Inject the new dynamic stream number into the min-heap
    this.heap.enqueue(val);

    // Step 2: Invariant Check. If size exceeds capacity, drop the absolute lowest.
    if (this.heap.size() > this.k) {
      this.heap.dequeue();
    }

    // Step 3: Top of the min-heap safely maps out to the exact Kth largest item
    return this.heap.front();
  }
}


/* ============================================================================
 * 📂 APPROACH 1: INSTANCE-BOUNDED MIN-PRIORITY QUEUE CONTEXT
 * ============================================================================
 * | Method Name           | Time Complexity  | Space Complexity (Auxiliary)  |
 * |-----------------------|------------------|-------------------------------|
 * | constructor(k, nums)  | O(N log K)       | O(K) [Heap bounds limit]      |
 * | add(val)              | O(log K)         | O(1) [Incremental execution]  |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - Arrow Function Prototype Trap: Never bind prototypal extension templates via
 *   fat arrow structures (`=>`). They isolate lexical variables globally, rendering
 *   inner reference states (`this.heap`) completely non-functional.
 * - Why Stream Sorting Fails: Sorting an array on every incoming dynamic stream
 *   number burns an \(O(N \log N)\) cost per add operation. Keeping a bounded heap
 *   reduces each dynamic streaming query down to a highly efficient \(O(\log K)\).
 * - Initial Empty Array Safeguard: If `nums` starts completely empty `[]`, the constructor
 *   loop cleanly processes nothing, and consecutive calls to `.add()` safely build up the
 *   heap sizes until capacity `K` is naturally saturated.
 * ============================================================================
 */
