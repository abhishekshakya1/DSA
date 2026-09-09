/*
Problem statement - Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. The result should also be sorted in ascending order.


An integer a is closer to x than an integer b if:
-> |a - x| < |b - x|, or
-> |a - x| == |b - x| and a < b


Example 1:
Input: arr = [1,2,3,4,5], k = 4, x = 3
Output: [1,2,3,4]

Example 2:
Input: arr = [1,1,2,3,4,5], k = 4, x = -1
Output: [1,1,2,3]


Constraints:
-> 1 <= k <= arr.length
-> 1 <= arr.length <= 10^4
-> arr is sorted in ascending order.
-> -10^4 <= arr[i], x <= 10^4


## Solve on leetcode -> https://leetcode.com/problems/find-k-closest-elements/description/

*/

const findClosestElements = (arr, k, x) => {
    let l = 0;
    let r = arr.length - k;

    while (l < r) {
        let m = l + Math.floor((r - l) / 2);
        if ((arr[m + k] - x) < (x - arr[m])) {
            l = m + 1;
        } else {
            r = m;
        }
    }
    return arr.slice(l, l+k);
};

let arr = [1, 1, 2, 3, 4, 5];
let result = findClosestElements(arr, 4, -1);
console.log(result);


// ============================================================================
// 📂 APPROACH 1: BINARY SEARCH ON WINDOW START VIA SUBTRACTION DIFFERENTIALS
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Natural Distance Differential Window Optimization (Implicit Tie-Breaking)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Power of Sorted Differentials: Because the input array is strictly sorted, the element
 *   `arr[m]` will always be less than or equal to `x` (or sitting on its left landscape), and
 *   `arr[m + k]` will live on its right landscape when bounding a target. This removes the absolute necessity
 *   of `Math.abs()`.
 * - Implicit Tie-Breaking Rule: The problem states that if distances match, the smaller value
 *   wins. Using `(arr[m + k] - x) < (x - arr[m])` ensures that a strict equality (e.g., `1 < 1`)
 *   evaluates to false, naturally shifting the binary boundary to `r = m`, thereby anchoring the
 *   window to the smaller left element.
 * - Out-of-Bounds Memory Protection: Initializing `r` precisely at `arr.length - k` serves as the
 *   critical boundary wall. It prevents the pointer calculation `m + k` from probing index positions
 *   outside the physical memory footprint of the array.
 *
 * 📌 TIME COMPLEXITY: O(log(N - K) + K)
 * - Where N is the array size and K is the window size. The search tree shrinks logarithmically over
 *   the window offset space, combined with a linear `O(K)` extraction step via native slicing.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Ideal memory footprint. Processes the range evaluations entirely in-place utilizing standard
 *   scalar registers, creating no extra structural layout allocations.
 */