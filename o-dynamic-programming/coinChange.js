/*
Problem statement -
You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.


Example 1:
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1


Example 2:
Input: coins = [2], amount = 3
Output: -1


Example 3:
Input: coins = [1], amount = 0
Output: 0


Constraints:
-> 1 <= coins.length <= 12
-> 1 <= coins[i] <= 2^31 - 1
-> 0 <= amount <= 10^4


## Solve on leetcode -> https://leetcode.com/problems/coin-change/description/

*/

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */

// 📂 APPROACH 1: TOP-DOWN RECURSIVE DFS WITH ENCAPSULATED MEMOIZATION
const coinChange = (coins, amount) => {
    let n = coins.length;
    let dp = {};

    const fn = (remAmount) => {

        if (remAmount === 0) return 0;
        if (remAmount < 0) return -1;

        if (remAmount in dp) {
            return dp[remAmount]
        }

        let minCoins = Infinity;
        for (let i = 0; i < n; i++) {
            let res = fn(remAmount - coins[i]);
            if (res !== -1) {
                minCoins = Math.min(minCoins, 1 + res);
            }
        }
        dp[remAmount] = minCoins === Infinity ? -1 : minCoins;
        return dp[remAmount];
    }
    return fn(amount);
};

let coins = [1, 2, 5];
let amount = 11;
let result = coinChange(coins, amount);
console.log(result);



// 📂 APPROACH 2: BOTTOM-UP TABULATION (LINEAR KNAPSACK MATRIX ARRAY)
const coinChange1 = (coins, amount) => {
    let n = coins.length;
    let dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let rem = 1; rem <= amount; rem++) {
        for (let j = 0; j < n; j++) {
            let remainingAmount = rem - coins[j];
            if (remainingAmount >= 0) {
                dp[rem] = Math.min(dp[rem], 1 + dp[remainingAmount]);
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
};


let coins1 = [1, 2, 5];
let amount1 = 11;
let result1 = coinChange1(coins1, amount1);
console.log(result1);



/* ============================================================================
 * 📊 ALGORITHMIC COMPLEXITY ANALYSIS MATRIX
 * ============================================================================
 * | Implementation Strategy | Time Complexity | Space Complexity (Auxiliary) |
 * |-------------------------|-----------------|------------------------------|
 * | 1. Top-Down (Memoized)  | O(Amount * N)   | O(Amount) [Cache + Stack]    |
 * | 2. Bottom-Up (Tabulated)| O(Amount * N)   | O(Amount) [Flat Array Table] |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - The Space-Optimization Wall: Explicitly inform your interviewer that this specific 1D DP
 *   relation **cannot** be optimized down to O(1) space. Because lookups jump back by unpredictable
 *   coin amounts (`rem - coins[j]`) rather than fixed intervals like `i-1`, the entire history
 *   array must remain actively preserved inside memory.
 * - Tabulation Boundary Protection: The conditional check `if (remainingAmount >= 0)` is mandatory.
 *   It forms a structural defensive wall that prevents the engine from scanning negative array indices,
 *   keeping your loops completely clean of runtime reference failures.
 * - Infinity Array Seeding Logic: Pre-filling the array table with `Infinity` serves a massive dual purpose.
 *   It naturally yields to smaller values during `Math.min()` iterations and acts as a clean flag to identify
 *   unreachable coin combinations at completion bounds.
 * ============================================================================
 */