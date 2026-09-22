/*
Problem statement -
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?


Example 1:
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps


Example 2:
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step


Constraints:
-> 1 <= n <= 45


## Solve on leetcode -> https://leetcode.com/problems/climbing-stairs/description/

*/

/**
 * @param {number} n
 * @return {number}
*/

// Top-down (Memoization)
const climbStairs1 = (n) => {
    let store = {};

    const memo = (num) => {
        if (num <= 2) return num;

        if (!store[num]) {
            store[num] = memo(num - 1) + memo(num - 2);
        }

        return store[num];
    }
    return memo(n);
};

console.log(climbStairs1(3));



// Bottom-Up (Tabulation)
const climbStairs = (n) => {
    let dp = [0, 1, 2];
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
};

console.log(climbStairs(3));


// Bottom-up (space optimization)
const climbStairs2 = (n) => {
    if (n <= 2) return n;

    let prev2 = 1;
    let prev1 = 2;

    for (let i = 3; i <= n; i++) {
        let curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

console.log(climbStairs2(3));


/* ============================================================================
 * 📊 MATRIX & INTERVIEW INVARIANTS
 * ============================================================================
 * | Implementation Type   | Time Complexity | Space Complexity (Auxiliary)  |
 * |-----------------------|-----------------|-------------------------------|
 * | 1. Top-Down Memoized  | O(N)            | O(N) [Cache + Call Stack]     |
 * | 2. Bottom-Up Tabulated| O(N)            | O(N) [Array Allocation Space] |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - The Hidden Fibonacci Mapping: Highlight this observation to the interviewer:
 *   Reaching step `n` requires transitioning exclusively from step `n-1` (via 1-step leap)
 *   or step `n-2` (via 2-step leap). The optimal substructure formula maps out exactly to the
 *   Fibonacci recurrence definition, varying only on initial base case indices.
 * - Boundary Exception Note: If testing edge settings where `n <= 2`, the tabulation
 *   `for` loop parameter boundaries (`i = 3`) will naturally evaluate as false, smoothly
 *   returning the pre-filled target scalar inside `dp[n]` without running any loops.
 * - The Ultimate Space Optimization Move: Just like Fibonacci, tell the interviewer that since
 *   `dp[i]` only demands `dp[i-1]` and `dp[i-2]`, we can turn this into an O(1) space loop
 *   using just two pointers (`prev1` and `prev2`), completely freeing the array overhead!
 * ============================================================================
 */

