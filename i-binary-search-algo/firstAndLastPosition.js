/*
Problem statement -
Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.


Example 1:
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]


Example 2:
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]


Example 3:
Input: nums = [], target = 0
Output: [-1,-1]


Constraints:
-> 0 <= nums.length <= 10^5
-> -10^9 <= nums[i] <= 10^9
-> nums is a non-decreasing array.
-> -10^9 <= target <= 10^9


## Solve on leetcode -> https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/

*/

// Approach 1
const searchRange = (arr, target) => {

    if (arr.length === 0) return [-1, -1];

    let l = 0;
    let r = arr.length - 1;
    let ans = [-1, -1];

    while (l < r) {
        let m = l + Math.floor((r - l) / 2);
        if (arr[m] < target) {
            l = m + 1;
        }
        else {
            r = m;
        }
    }
    if (arr[l] === target) {
        ans[0] = l;
    }

    l = 0;
    r = arr.length - 1;

    while (l < r) {
        let m = l + Math.ceil((r - l) / 2);
        if (arr[m] > target) {
            r = m - 1;
        }
        else {
            l = m;
        }
    }
    if (arr[l] === target) {
        ans[1] = l;
    }

    return ans;
};

let arr = [5, 7, 7, 8, 8, 10];
let target = 8;
let result = searchRange(arr, target);
console.log(result);

// ============================================================================
// 📂 APPROACH 1: ASYMMETRIC TWO-PASS BINARY SEARCH (BOUNDARY BIASED CONVERGENCE)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Asymmetric Midpoint Biasing via Floor/Ceil Interlocking (Dual-Pass Convergence)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Convergence Invariant: Using `while (l < r)` ensures the search intervals gracefully
 *   shrink down until the pointers collide exactly at the target index. It removes the necessity of
 *   managing independent snapshot variables during structural matches.
 * - Leftmost Midpoint Biasing: In the first pass, pairing `Math.floor` rounding with the non-destructive
 *   boundary contraction `r = m` forces the system to look leftward whenever a duplicate target value is
 *   encountered, identifying the absolute starting edge index.
 * - Rightmost Midpoint Biasing: In the second pass, a classic trap emerges: if `l` and `r` differ by
 *   exactly 1, a standard floor calculation creates an infinite loop if `l = m` runs. Incorporating
 *   `Math.ceil` shifts the rounding bias towards the right pointer, safely breaking the dead-lock.
 * - Post-Convergence Validation: Because the binary loop stops as soon as `l === r`, the final scalar position
 *   could land on an index where the target does not exist (e.g., target missing entirely). Running
 *   `if (arr[l] === target)` serves as the final authentication step before recording the results.
 *
 * 📌 TIME COMPLEXITY: O(log N)
 * - Where N is the total length of the `arr` payload. Running two separate, continuous binary search
 *   passes costs `O(log N) + O(log N)`, which gracefully simplifies down to a flat logarithmic bound.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Fully space optimized. Resolves the target cluster indices completely in-place using simple scalar array
 *   pointers (`l`, `r`, `m`), demanding zero dynamic heap runtime buffer allocations.
 */



// Approach 2
const searchRange1 = (arr, target) => {
    let l = 0;
    let r = arr.length - 1;
    let ans = [-1, -1];

    while (l <= r) {
        let m = l + Math.floor((r - l) / 2);
        if (arr[m] === target) {
            ans[0] = m;
            r = m - 1;
        } else if (arr[m] < target) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }

    l = 0;
    r = arr.length - 1;
    while (l <= r) {
        let m = l + Math.floor((r - l) / 2);
        if (arr[m] === target) {
            ans[1] = m;
            l = m + 1;
        } else if (arr[m] < target) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return ans;
};

let arr1 = [5, 7, 7, 8, 8, 10];
let target1 = 8;
let result1 = searchRange1(arr1, target1);
console.log(result1);

// ============================================================================
// 📂 APPROACH 2: STANDARD DUAL-PASS BINARY SEARCH WITH SNAPSHOT RECORDING
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Symmetric Binary Search (`l <= r`) with Active Target Range Compression
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Snapshot Recording Mechanic: Instead of waiting for pointer convergence to determine the final
 *   index state, this method utilizes an active capture approach. The moment a target element match
 *   is verified (`arr[m] === target`), the index is instantly stored inside the `ans` placeholder array.
 * - Symmetrical Rounding Invariant: Unlike the asymmetric floor/ceil balancing trick, this approach uses
 *   `Math.floor` globally in both passes. This works beautifully because we explicitly break the traditional
 *   lookup loop closure by actively forcing `r = m - 1` or `l = m + 1` right after logging the matching node.
 * - Native Edge-Case Safety: If a completely empty array payload is provided, the condition `l <= r`
 *   evaluates to `0 <= -1` and instantly skips loop execution blocks entirely, bypassing potential
 *   out-of-bounds pointer crashes without requiring standalone structural guard blocks.
 * - Independent Tracking Isolation: Because the operations are split completely across separate sequential
 *   lookup flows, finding the leftmost boundary has zero dependency on the state or execution parameters
 *   of the rightmost bound identification phase.
 *
 * 📌 TIME COMPLEXITY: O(log N)
 * - Where N is the total length of the `arr` payload. The logic initiates two distinct, isolated standard
 *   binary loops where the virtual workspace domain is aggressively cut down by half on each iteration step,
 *   maintaining a highly efficient logarithmic execution profile.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Completely space-optimized. Computes the target coordinate boundaries entirely in-place utilizing basic
 *   scalar runtime variables (`l`, `r`, `m`), demanding zero extra heap buffer memory allocation overhead.
 */