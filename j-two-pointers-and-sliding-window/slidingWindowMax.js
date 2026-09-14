/*
Problem statement -
You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.


Example 1:
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation:
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7


Example 2:
Input: nums = [1], k = 1
Output: [1]


Constraints:
-> 1 <= nums.length <= 10^5
-> -10^4 <= nums[i] <= 10^4
-> 1 <= k <= nums.length


## Solve on leetcode -> https://leetcode.com/problems/sliding-window-maximum/description/

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

const maxSlidingWindow = (nums, k) => {
    let res = [];
    let q = [];

    let i = 0;
    let j = 0;
    while (j < nums.length) {
        while (q.length && nums[j] > q[q.length - 1]) {
            q.pop();
        }
        q.push(nums[j]);

        if (j >= k - 1) {
            res.push(q[0]);
            if (nums[i] === q[0]) {
                q.shift();
            }
            i++;
        }
        j++;
    }
    return res;
};

let nums = [1, 3, -1, -3, 5, 3, 6, 7];
let k = 3;
let result = maxSlidingWindow(nums, k);
console.log(result);

// ============================================================================
// 📂 APPROACH 1: MONOTONIC VALUE DEQUE WITH CONDITIONAL EVICTION
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Monotonic Decreasing Deque with Values and Window Size Synchronization
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Monotonic Decreasing Property: By continuously popping smaller elements from the back before
 *   pushing the new element `nums[j]`, the deque `q` maintains a strict decreasing order. This guarantees
 *   that the absolute maximum value of the current window is always at index `0`.
 * - Unconditional Left Pointer Advance: Once the sliding window reaches capacity `k` (`j >= k - 1`),
 *   the left pointer `i` must advance on *every single iteration*. Decoupling `i++` from the inner
 *   `if` statement prevents the window frame from expanding past its strict allocation size of `k`.
 * - Value-Based Safe Eviction: As the window slides away from an index, the element `nums[i]` is dropped.
 *   We run a scalar comparison `if (nums[i] === q[0])` to safely remove it from our queue only if it was the
 *   active maximum. If it was smaller, it would have already been purged by the `while` loop earlier.
 * - Flat Iteration Advance: Placing `j++` unconditionally at the end of the root block avoids infinite
 *   execution deadlocks, ensuring standard linear processing across the array bounds.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total length of the `nums` collection. Each array element undergoes exactly one push
 *   and at most one pop operation throughout the execution cycle, leading to an optimal linear runtime.
 *
 * 📌 SPACE COMPLEXITY: O(K) [Auxiliary Space]
 * - Excluding the output collection array `res`, the tracking queue container `q` scales to store at most
 *   `k` elements concurrently during peak structural iterations.
 */
