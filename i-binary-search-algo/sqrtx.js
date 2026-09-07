/*
Problem statement -
Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.

You must not use any built-in exponent function or operator.

-> For example, do not use pow(x, 0.5) in c++ or x ** 0.5 in python.


Example 1:
Input: x = 4
Output: 2
Explanation: The square root of 4 is 2, so we return 2.


Example 2:
Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.


Constraints:
-> 0 <= x <= 231 - 1


## Solve on leetcode -> https://leetcode.com/problems/sqrtx/description/

*/

const mySqrt = (x) => {
    if (x < 2) return x;

    let l = 2;
    let r = Math.floor(x / 2);

    while (l <= r) {
        let m = l + Math.floor((r - l) / 2);

        if (x === m * m) {
            return m;
        }
        else if (x < m * m) {
            r = m - 1
        }
        else {
            l = m + 1
        };
    }
    return r;
};

let x = 20;
let result = mySqrt(x);
console.log(result);


// ============================================================================
// 📂 APPROACH 1: OPTIMIZED BINARY SEARCH SPACE (FLOOR INTERPOLATION PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Monotonic Search Space Reduction with Integer Midpoint Convergence
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Mathematically Bounded Range: For any integer `x >= 4`, its square root is strictly bounded
 *   between `2` and `x / 2`. Initializing the right pointer `r` to `Math.floor(x / 2)` instantly
 *   slashes the standard binary search space in half.
 * - Arithmetic Exponentiation Pitfall: Using the exponentiation operator `m ** m` evaluates to
 *   the exponential power of the value rather than its square profile. Substituting flat scalar
 *   multiplication `m * m` restores the quadratic structural matching constraints.
 * - Prevent Integer Overflow: Calculating midpoints via `l + Math.floor((r - l) / 2)` prevents
 *   runtime boundary overflows, keeping numeric operations safe.
 * - The Floor Trapping Mechanics: If `x` is not a perfect square, the search loop terminates with
 *   the left pointer crossing the right pointer (`l > r`). At this convergence point, the right pointer
 *   `r` organically settles on the largest integer whose square is less than `x`.
 *
 * 📌 TIME COMPLEXITY: O(log X)
 * - Where X is the input value. The binary search mechanism continually divides the virtual search
 *   interval in half on every step, guaranteeing rapid logarithmic convergence.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Completely memory efficient. Evaluates logic in-place utilizing basic scalar numeric primitives
 *   (`l`, `r`, `m`), demanding zero dynamic structural space configurations.
 */