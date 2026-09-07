/*
Problem statement -
A peak element is an element that is strictly greater than its neighbors.

Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.

You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

You must write an algorithm that runs in O(log n) time.


Example 1:
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.


Example 2:
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.


Constraints:
-> 1 <= nums.length <= 1000
-> -2^31 <= nums[i] <= 2^31 - 1
-> nums[i] != nums[i + 1] for all valid i.


## Solve on leetcode -> https://leetcode.com/problems/find-peak-element/description/

*/

const findPeakElement = function (nums) {
    let l = 0;
    let r = nums.length - 1;

    while (l < r) {
        let m = l + Math.floor((r - l) / 2);
        if (nums[m] < nums[m + 1]) {
            l = m + 1;
        } else {
            r = m;
        }
    }
    return l;
};

let nums = [1, 2, 1, 3, 5, 6, 4];
let result = findPeakElement(nums);
console.log(result);

// ============================================================================
// 📂 APPROACH 1: BINARY SEARCH ON SLOPE GRADIENT (CONVERGENCE PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Local Slope Gradient Binary Search via Integer Boundary Convergence
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Sorting Is Not Required: A classic misconception is that Binary Search only functions on
 *   fully sorted arrays. In peak finding, we leverage the **local gradient slope** instead. By
 *   comparing adjacent elements (`nums[m]` vs `nums[m+1]`), we can decisively determine which sub-array
 *   is mathematically guaranteed to contain at least one peak.
 * - Upward Slope Mechanics: If `nums[m] < nums[m + 1]`, the numbers are ascending towards the right.
 *   Since the problem constraints state that `nums[-1] = nums[n] = -∞`, going up a slope is guaranteed
 *   to hit a local peak eventually, letting us safely contract the search range to `l = m + 1`.
 * - Downward Non-Destructive Shift: When `nums[m] >= nums[m + 1]`, the gradient drops. The element `m`
 *   could be the actual peak crest. Thus, assigning `r = m` narrows the search window without discarding
 *   the current valid candidate.
 * - Convergence Safety: The strict `l < r` condition prevents out-of-bounds pointer exceptions when evaluating
 *   `nums[m + 1]` because `m` will never equal `nums.length - 1` while the loop is actively running.
 *
 * 📌 TIME COMPLEXITY: O(log N)
 * - Where N is the total number of items within the `nums` collection. The search space is split exactly
 *   in half on each iteration step, ensuring stable logarithmic time execution.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Highly memory efficient. Operates entirely in-place utilizing basic integer pointer primitives
 *   (`l`, `r`, `m`), consuming zero extra runtime dynamic allocation structures.
 */
