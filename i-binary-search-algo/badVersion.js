/*
Problem statement -
You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.



Example 1:
Input: n = 5, bad = 4
Output: 4
Explanation:
call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true
Then 4 is the first bad version.


Example 2:
Input: n = 1, bad = 1
Output: 1


Constraints:
-> 1 <= bad <= n <= 2^31 - 1


## Solve on leetcode -> https://leetcode.com/problems/first-bad-version/description/

*/


/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function (n) {
        let l = 1;
        let r = n;
        while (l < r) {
            let m = l + Math.floor((r - l) / 2);
            if (!isBadVersion(m)) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return r;
    };
};

// ============================================================================
// 📂 APPROACH 1: MONOTONIC LOWER-BOUND CONVERGENCE (FIRST OCCURRENCE PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Binary Search for First Occurrence / Lower Bound Convergence via API
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Monotonic Boolean Trend: The version timeline forms a perfectly sorted, monotonic sequence
 *   of states: `[Good, Good, Good, Bad, Bad, Bad]`. Because all versions after the first bad one
 *   are guaranteed to be bad, this structural consistency lets us safely execute Binary Search.
 * - The `l < r` Boundary Termination: Unlike standard element tracking lookup loops (`l <= r`), we
 *   utilize a strict less-than inequality. This ensures that when the pointers converge, the loop
 *   terminates instantly instead of spawning an accidental infinite cycle.
 * - Non-Destructive Right Shift: Assigning `r = m` instead of `r = m - 1` is critical. If `m` is a
 *   bad version, it might be the very first anchor element we are hunting for. Truncating past it
 *   via `-1` could drop the correct solution out of active bounds.
 * - Converged Result Return: At the moment the condition breaks, `l` is exactly equal to `r`. This
 *   shared address represents the absolute first version that failed the black-box verification API.
 *
 * 📌 TIME COMPLEXITY: O(log N)
 * - Where N is the maximum range version count `n`. The binary space reduction halves the active structural
 *   workspace size with each API lookup execution step, delivering rapid logarithmic runtime speeds.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Fully space optimized. Tracks and updates the interval bounds entirely in-place utilizing basic
 *   scalar variable indicators (`l`, `r`, `m`), consuming no extra memory storage overhead.
 */