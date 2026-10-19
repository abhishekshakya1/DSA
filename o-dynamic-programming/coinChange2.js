/*
Problem statement -
You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.

You may assume that you have an infinite number of each kind of coin.

The final answer is guaranteed to fit into a signed 32-bit integer.


Example 1:
Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1


Example 2:
Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.


Example 3:
Input: amount = 10, coins = [10]
Output: 1


Constraints:
-> 1 <= coins.length <= 300
-> 1 <= coins[i] <= 5000
-> All the values of coins are unique.
-> 0 <= amount <= 5000


## Solve on leetcode -> https://leetcode.com/problems/coin-change-ii/description/

*/

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
const change = (amount, coins) => {
    let n = coins.length;
    let dp = Array.from({ length: amount + 1 }, () => Array(n).fill(-1));

    let fn = (remS, start) => {
        if (remS === 0) return 1;
        if (remS < 0) return 0;

        if (dp[remS][start] !== -1) return dp[remS][start];

        let combinations = 0;
        for (let i = start; i < n; i++) {
            combinations += fn(remS - coins[i], i);
        }
        return dp[remS][start] = combinations;
    }
    return fn(amount, 0);
};

let amount = 5;
let coins = [1, 2, 5];
let result = change(amount, coins);
console.log(result);


/*
Notes :-

Time Complexity: O(amount * n)

Space Complexity: O(amount * n)
*/
