/*
Problem statement -
Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.



Example 1:
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]

Example 2:
Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]

Example 3:
Input: temperatures = [30,60,90]
Output: [1,1,0]

Constraints:
-> 1 <= temperatures.length <= 105
-> 30 <= temperatures[i] <= 100


## Solve on leetcode -> https://leetcode.com/problems/daily-temperatures/description/

*/

const dailyTemperatures = (temperatures) => {
    let stack = [];
    let n = temperatures.length;
    let answer = Array(n).fill(0);

    for (let i = n - 1; i >= 0; i--) {

        while (stack.length && temperatures[stack[stack.length - 1]] <= temperatures[i]) {
            stack.pop();
        }

        answer[i] = stack.length ? stack[stack.length - 1] - i : 0;

        stack.push(i);
    }
    return answer;
};

let temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
let result = dailyTemperatures(temperatures);
console.log(result);


// ============================================================================
// 📂 APPROACH 1: MONOTONIC INDEX STACK (RIGHT-TO-LEFT DISTANCE PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Monotonic Decreasing Index Stack (Right-to-Left Element Resolution)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Index As A Reference Pointer: Storing raw temperature data inside the stack is a trap. We must
 *   cache the **array index** instead. Indices contain dual information: they let us look up the temperature
 *   value (`temperatures[top]`) and simultaneously compute chronological distances (`top - i`).
 * - Eliminating Branching Overhead: The base-case initialization for index `n-1` is merged cleanly
 *   inside the main iteration flow. Starting directly from `n-1` on an empty stack seamlessly defaults
 *   the final element's day gap counter to `0`.
 * - Aggressive Draining Invariant: A temperature on the right that is lower than or equal to the
 *   incoming day (`temperatures[top] <= temperatures[i]`) becomes obsolete. It cannot serve as a warmer
 *   future checkpoint for any day to the left, so it is permanently popped out.
 * - Flat Gap Math: Utilizing the expression `stack[stack.length - 1] - i` calculates the precise number
 *   of days to wait before hitting a warmer temperature in direct O(1) mathematical calculation.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total number of days in the `temperatures` array. Each index is pushed onto the stack
 *   exactly once and popped at most once over the execution lifespan, providing flat linear time.
 *
 * 📌 SPACE COMPLEXITY: O(N) [Auxiliary Space]
 * - An index array `answer` of size N is populated. Additionally, the tracking `stack` instance scales
 *   linearly to process monotonic data configurations.
 */