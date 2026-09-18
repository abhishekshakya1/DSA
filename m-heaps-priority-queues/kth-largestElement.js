/*
Problem statement -
Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?


Example 1:
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5


Example 2:
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4


Constraints:
-> 1 <= k <= nums.length <= 10^5
-> -10^4 <= nums[i] <= 10^4


## Solve on leetcode -> https://leetcode.com/problems/kth-largest-element-in-an-array/description/

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */


const findKthLargest = (nums, k) => {
    let pq = new MinPriorityQueue();
    for (let i = 0; i < nums.length; i++) {
        pq.enqueue(nums[i]);
        if (pq.size() > k) {
            pq.dequeue();
        }
    }
    return pq.front();
};

let nums = [3, 2, 1, 5, 6, 4];
let result = findKthLargest(nums, 2);
console.log(result);


/* ============================================================================
 * 📂 APPROACH 1: BOUNDED MIN-PRIORITY QUEUE (SIZE RESTRICITON PASS)
 * ============================================================================
 * | Metrics Matrix        | Complexity Limits  | Rationale                     |
 * |-----------------------|--------------------|-------------------------------|
 * | Time Complexity       | O(N log K)         | N elements * log K heap sifts |
 * | Space Complexity      | O(K)               | Heap holds at most K items    |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - The Min-Heap Paradox: Always remember this rule of thumb for interviews:
 *   1. To find the K-th LARGEST element -> Use a MIN-HEAP of size K.
 *   2. To find the K-th SMALLEST element -> Use a MAX-HEAP of size K.
 * - Why not full sorting? Standard sorting (`Array.prototype.sort()`) forces an
 *   \(O(N \log N)\) time penalty. By restricting the heap scale tightly to `K`,
 *   we clip the execution curves down to an optimal \(O(N \log K)\) window.
 * - LeetCode Engine Caveat: On the official LeetCode platform, the library
 *   `@datastructures-js/priority-queue` is globally pre-loaded. In your native environment,
 *   make sure to pair this method with your custom MinHeap/PQ object classes.
 * ============================================================================
 */
