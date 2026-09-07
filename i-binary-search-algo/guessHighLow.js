/*
Problem statement -
We are playing the Guess Game. The game is as follows:

I pick a number from 1 to n. You have to guess which number I picked (the number I picked stays the same throughout the game).

Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

You call a pre-defined API int guess(int num), which returns three possible results:

-> -1: Your guess is higher than the number I picked (i.e. num > pick).

-> 1: Your guess is lower than the number I picked (i.e. num < pick).

-> 0: your guess is equal to the number I picked (i.e. num == pick).

Return the number that I picked.


Example 1:
Input: n = 10, pick = 6
Output: 6


Example 2:
Input: n = 1, pick = 1
Output: 1


Example 3:
Input: n = 2, pick = 1
Output: 1


Constraints:
-> 1 <= n <= 231 - 1
-> 1 <= pick <= n


## Solve on leetcode -> https://leetcode.com/problems/guess-number-higher-or-lower/description/

*/


/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return {number}      -1 if num is higher than the picked number
 *                       1 if num is lower than the picked number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

const guessNumber = (n) => {
    let l = 1;
    let r = n;

    while (l <= r) {

        let m = l + Math.floor((r - l) / 2);
        let res = guess(m);

        if (res === 0) {
            return m;
        } else if (res < 0) {
            r = m - 1;
        } else {
            l = m + 1;
        }
    }
};

// ============================================================================
// 📂 APPROACH 1: CLASSIC BINARY SEARCH CONVERGENCE (API INTERACTION PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Monotonic Integer Interval Halving via Tri-State API Feedback
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Monotonic Search Invariant: The hidden picked number lives inside a strictly sorted, continuous
 *   numerical landscape from `1` to `n`. This linear, ordered sequence makes it an ideal candidate
 *   for Binary Search optimization.
 * - Tri-State API Matching: Instead of comparing structural inputs against a concrete local variable,
 *   the algorithm interfaces dynamically with an external `guess(m)` API framework. The system maps
 *   negative responses to a leftward space contraction and positive values to a rightward update.
 * - Safe Midpoint Calculation: Writing the midpoint equation as `l + Math.floor((r - l) / 2)` instead
 *   of `Math.floor((l + r) / 2)` prevents arithmetic overflow crashes in runtime environments where `n`
 *   reaches extreme numeric capacities.
 * - Confirmed Convergence: Because the problem description guarantees that the target element strictly
 *   exists within the `[1, n]` boundary bounds, the search space will always safely resolve inside the
 *   `res === 0` conditional statement without hitting an unhandled loop break.
 *
 * 📌 TIME COMPLEXITY: O(log N)
 * - Where N is the upper bound value `n`. The algorithm halves the virtual workspace with each API
 *   interaction step, guaranteeing extremely rapid logarithmic execution cycles.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Completely space efficient. Tracks the numerical lookup bounds purely in-place utilizing lightweight,
 *   primitive scalar registers (`l`, `r`, `m`), demanding zero extra heap allocation structures.
 */