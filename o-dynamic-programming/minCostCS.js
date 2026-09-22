/*
Problem statement -
You are given an integer array cost where cost[i] is the cost of ith step on a staircase.

Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index 0, or the step with index 1.

Return the minimum cost to reach the top of the staircase, which is the position just past the last step (index cost.length).


Example 1:
Input: cost = [10,15,20]
Output: 15
Explanation: You will start at index 1.
- Pay 15 and climb two steps to reach the top.
The total cost is 15.


Example 2:
Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6
Explanation: You will start at index 0.
- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6.


Constraints:
-> 2 <= cost.length <= 1000
-> 0 <= cost[i] <= 999


## Solve on leetcode -> https://leetcode.com/problems/min-cost-climbing-stairs/description/

*/


/**
 * @param {number[]} cost
 * @return {number}
 */


// Top-down
const minCostClimbingStairs = (cost) => {
    let memo = {};

    const solve = (i) => {
        if (i <= 1) return 0;

        if (memo[i] !== undefined) {
            return memo[i];
        }

        memo[i] = Math.min(
            solve(i - 1) + cost[i - 1],
            solve(i - 2) + cost[i - 2]
        );

        return memo[i];
    };

    return solve(cost.length);
};

let cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1];
console.log(minCostClimbingStairs(cost));


// Botttom-Up
const minCostClimbingStairs1 = (cost) => {
    let n = cost.length;
    let dp = [0, 0];
    for (let i = 2; i <= n; i++) {
        dp[i] = Math.min(dp[i - 1] + cost[i - 1],dp[i - 2] + cost[i - 2]);
    }
    return dp[n];
};

let cost1 = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1];
console.log(minCostClimbingStairs1(cost1));


// Bottom-Up (space optimized)
const minCostClimbingStairs2 = (cost) => {
    let prev2 = 0;
    let prev1 = 0;

    for (let i = 2; i <= cost.length; i++) {
        let curr = Math.min(
            prev1 + cost[i - 1],
            prev2 + cost[i - 2]
        );

        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
};

let cost2 = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1];
console.log(minCostClimbingStairs2(cost2));



/* ============================================================================
 * 📊 ALGORITHMIC COMPLEXITY EVOLUTION MATRIX
 * ============================================================================
 * | Implementation Strategy | Time Complexity | Space Complexity (Auxiliary) |
 * |-------------------------|-----------------|------------------------------|
 * | 1. Top-Down (Memoized)  | O(N)            | O(N) [Cache + Stack Frames]  |
 * | 2. Bottom-Up (Tabulated)| O(N)            | O(N) [Linear Array Space]    |
 * | 3. Space Optimized (V3) | O(N)            | O(1) [Pure Constant Memory]  |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - Zero Base Cost Invariant: Clarify to your interviewer that the top floor index is at
 *   `cost.length`. Pushing values `[0, 0]` as initial states is correct because you can transition
 *   to step 0 or step 1 for free; paying only occurs when stepping *off* an index.
 * - Tabulation Bounds: The index range maps through `<= cost.length` because our target landing step
 *   is one layer higher than the final array element index bounds.
 * - Constant Space Conversion Rule: Because calculating `curr` depends strictly on the two immediate
 *   preceding array elements (`i-1` and `i-2`), scaling down structural arrays into scalar variable updates
 *   reclaims an absolute \(O(1)\) memory footprint.
 * ============================================================================
 */