/*
Problem statement -
Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.


Example 1:
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]


Example 2:
Input: nums = [1], k = 1
Output: [1]


Example 3:
Input: nums = [1,2,1,2,1,2,3,1,3,2], k = 2
Output: [1,2]


Constraints:
-> 1 <= nums.length <= 10^5
-> -10^4 <= nums[i] <= 10^4
-> k is in the range [1, the number of unique elements in the array].
-> It is guaranteed that the answer is unique.


Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.


## Solve on leetcode -> https://leetcode.com/problems/top-k-frequent-elements/description/

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

const topkFrequent = (nums, k) => {
    let map = {};
    for (let i = 0; i < nums.length; i++) {
        if (!map[nums[i]]) {
            map[nums[i]] = 0;
        }
        map[nums[i]]++;
    }

    let pq = new MinPriorityQueue(x => x.freq);
    for (key in map) {
        pq.enqueue({ val: key, freq: map[key] });
        if (pq.size() > k) {
            pq.dequeue();
        }
    }
    return pq.toArray().map(x => Number(x.val));
};


/* ============================================================================
 * 📂 APPROACH 1: FREQUENCY FREQ-MAP COMBINED WITH DYNAMIC MIN-HEAP
 * ============================================================================
 * | Metrics Matrix        | Complexity Limits  | Rationale                     |
 * |-----------------------|--------------------|-------------------------------|
 * | Time Complexity       | O(N log K)         | N mappings + unique nodes * log K |
 * | Space Complexity      | O(N + K)           | Map stores N items + Heap stores K |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - String Key Conversion Pitfall: In vanilla JS objects, `map[nums[i]]` forces the
 *   numeric key to become a string `"1"`. Always ensure you cast it back using `Number()`
 *   or `parseInt()` on output arrays to satisfy strict type test signatures.
 * - Time Optimization Win: Full bucket sorting or total map entries sorting will
 *   drag performance down to \(O(U \log U)\) where U is unique elements. Restricting the
 *   heap size to `K` keeps operations pinned down tightly to an optimal \(O(N \log K)\).
 * - LeetCode API Reminder: The preloaded platform library maps elements to an internal
 *   `.element` block wrapper, which is why extracting custom keys resolves via `x.element.val`.
 * ============================================================================
 */
