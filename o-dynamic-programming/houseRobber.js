/*
Problem statement -
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.


Example 1:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.


Example 2:
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.


Constraints:
-> 1 <= nums.length <= 100
-> 0 <= nums[i] <= 400


## Solve on leetcode -> https://leetcode.com/problems/house-robber/description/

*/


/**
 * @param {number[]} val
 * @return {number}
 */


// 📂 APPROACH 1: TOP-DOWN RECURSIVE DFS WITH RECURSIVE MEMOIZATION
const rob = (val) => {
    let memo = {};

    const solve = (i) => {
        if (i < 0) return 0;

        if (memo[i] !== undefined) {
            return memo[i];
        }

        let robCurrent = val[i] + solve(i - 2);
        let skipCurrent = solve(i - 1);

        memo[i] = Math.max(robCurrent, skipCurrent);

        return memo[i];
    };
    return solve(val.length - 1);
};

let nums = [2, 7, 9, 3, 1];
let result = rob(nums);
console.log(result);



// 📂 APPROACH 2: BOTTOM-UP TABULATION (LINEAR STATE GRID)
const rob1 = (val) => {
    let n = val.length;
    if (n === 1) return val[0];

    let dp = [val[0], Math.max(val[0], val[1])];
    for (let i = 2; i < n; i++) {
        dp[i] = Math.max(val[i] + dp[i - 2], dp[i - 1]);
    }
    return dp[n-1];
};

let nums1 = [2, 7, 9, 3, 1];
let result1 = rob1(nums1);
console.log(result1);



// 📂 APPROACH 3: BOTTOM-UP SPACE OPTIMIZED (VARIABLE STATE COUPLING)
const rob2 = (val) => {
    let n = val.length;

    if (n === 1) return val[0];

    let prev2 = val[0];
    let prev1 = Math.max(val[0], val[1]);

    for (let i = 2; i < n; i++) {
        let curr = Math.max(val[i] + prev2, prev1);

        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
};

let nums2 = [2, 7, 9, 3, 1];
let result2 = rob2(nums2);
console.log(result2);


/* ============================================================================
 * 📊 ALGORITHMIC COMPLEXITY EVOLUTION MATRIX
 * ============================================================================
 * | Implementation Strategy | Time Complexity | Space Complexity (Auxiliary) |
 * |-------------------------|-----------------|------------------------------|
 * | 1. Top-Down (Memoized)  | O(N)            | O(N) [Cache + Stack Frames]  |
 * | 2. Bottom-Up (Tabulated)| O(N)            | O(N) [Linear Table Space]    |
 * | 3. Space Optimized (V3) | O(N)            | O(1) [Absolute Constant]     |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - The Choice Recurrence Invariant: Explain the core state logic to your interviewer:
 *   At any house `i`, your options are strictly binary. If you choose to rob it, you inherit
 *   its cash and add it to the best accumulated layout from `i-2`. If you choose to skip it,
 *   your total max profit remains whatever the best score was up to house `i-1`.
 * - Single Element Constraint Protection: The check `if (n === 1)` is mandatory in iterative
 *   models. Without this safeguard, initializing `dp[1] = Math.max(val[0], val[1])` on a single-element
 *   array evaluates against `undefined`, producing fatal index errors on platform test benches.
 * - Sliding Window Space Reduction: Since computing the current state strictly requests data
 *   from two immediate steps back (`prev1` and `prev2`), dropping array generation in favor of
 *   scalar variables scales down auxiliary allocations to an optimal constant O(1) limit.
 * ============================================================================
 */