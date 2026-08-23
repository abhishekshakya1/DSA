/*
Problem statement -
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.



Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

Example 2:
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.


Constraints:

1 <= prices.length <= 105
0 <= prices[i] <= 104

## Solve on leetcode --> https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/

*/

const maxProfit = (prices) => {

    if (prices.length < 2) return 0;
    let minPrice = prices[0];
    let maxProfit = 0;

     for (let i = 1; i < prices.length; i++) {

        if (prices[i] < minPrice) {
            minPrice = prices[i]
        }

        else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }

    return maxProfit;
};

let prices = [7, 1, 9];
let result = maxProfit(prices);
console.log(result);


/*

* Time complexity - O(n)
* Space complexity - O(1)


This problem can be classified under two major algorithmic design patterns:-

1) Dynamic Programming (State Tracking / Kadane's Variant):
Instead of re-computing historical prices, you maintain a running "state" of the past.

You store the global minimum price (minPrice) seen so far and use it to find the local profit on any given day.

2) Sliding Window / Two-Pointer Technique:
You maintain a dynamic window where the Left Pointer (L) is the Buy Day and the Right Pointer (R) is the Sell Day.

If a cheaper price is found at R, the window shifts completely (L = R) because any future profit will be maximized by buying at this newer, lower price.

*/