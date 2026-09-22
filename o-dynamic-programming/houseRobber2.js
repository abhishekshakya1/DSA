/*
Problem statement -
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.


Example 1:
Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.


Example 2:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.


Example 3:
Input: nums = [1,2,3]
Output: 3


Constraints:
-> 1 <= nums.length <= 100
-> 0 <= nums[i] <= 1000


## Solve on leetcode -> https://leetcode.com/problems/house-robber-ii/description/

*/

/**
 * @param {number[]} val
 * @return {number}
 */


const rob2 = (val) => {
    let n = val.length;

    if (n === 1) return val[0];

    const robHelper = (start, end) => {
        let prev2 = 0;
        let prev1 = 0;

        for (let i = start; i <= end; i++) {
            let curr = Math.max(val[i] + prev2, prev1);

            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    };
    return Math.max(robHelper(0, n - 2), robHelper(1, n - 1));
};

let nums2 = [1, 2, 3, 1];
let result2 = rob2(nums2);
console.log(result2);


/* ============================================================================
 * 📂 APPROACH 1: CIRCULAR SPLITTING VIA SPACE-OPTIMIZED LINEAR HELPERS
 * ============================================================================
 * | Scenario / Metrics    | Time Complexity | Space Complexity (Auxiliary)  |
 * |-----------------------|-----------------|-------------------------------|
 * | Total Execution Bounds | O(N)            | O(1) [Absolute Constant Memory]|
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - Breaking the Circular Constraint: Explain this core insight to your interviewer:
 *   The adjacent link between the first and last element creates a structural loop deadlock.
 *   Since we can never rob both concurrently, we convert this into two isolated linear problems
 *   (one completely hiding the first house, and one completely hiding the last house) to eliminate loops.
 * - Zero Window Slicing Optimization: Notice that your `robHelper` sets `prev2 = 0` and `prev1 = 0`
 *   natively inside its localized inner scope block. This allows the helper to gracefully handle varying slice sizes
 *   without throwing out-of-bounds initialization errors on the original `val` collection.
 * - Dual Pass Flat Efficiency: Running two consecutive passes over the data arrays still tracks at a flat
 *   linear time of \(O(2 \times N) = O(N)\), while updating scalar memory variables ensures your space footprint
 *   remains locked at a perfect constant O(1).
 * ============================================================================
 */
