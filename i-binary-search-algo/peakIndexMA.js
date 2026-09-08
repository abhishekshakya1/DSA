/*
Problem statement -
You are given an integer mountain array arr of length n where the values increase to a peak element and then decrease.

Return the index of the peak element.

Your task is to solve it in O(log(n)) time complexity.


Example 1:
Input: arr = [0,1,0]
Output: 1

Example 2:
Input: arr = [0,2,1,0]
Output: 1

Example 3:
Input: arr = [0,10,5,2]
Output: 1


Constraints:
-> 3 <= arr.length <= 10^5
-> 0 <= arr[i] <= 10^6
-> arr is guaranteed to be a mountain array.


## Solve on leetcode -> https://leetcode.com/problems/peak-index-in-a-mountain-array/description/

*/

const peakIndexInMountainArray = (arr) => {
    let l = 0;
    let r = arr.length - 1;
    while (l < r) {
        let m = l + Math.floor((r - l) / 2);
        if (arr[m + 1] > arr[m]) {
            l = m + 1;
        } else {
            r = m;
        }
    }
    return r;
};

let arr = [0, 10, 5, 2];
let result = peakIndexInMountainArray(arr);
console.log(result);

// ============================================================================
// 📂 APPROACH: MONOTONIC SLOPE GRADIENT (MOUNTAIN CREST CONVERGENCE PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Integer Boundary Convergence via Monotonic Slope Slope Gradient
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Mountain Array Property: A mountain array is guaranteed to strictly increase to a single
 *   peak crest and then strictly decrease. This dual-phase monotonic structure provides a reliable
 *   directional layout, making it an ideal candidate for Binary Search optimizations.
 * - Slope Ascending Check: Evaluating `arr[m + 1] > arr[m]` determines if we are on the rising phase
 *   of the mountain. If true, the peak cannot be at `m` or anywhere to its left, allowing us to safely
 *   shift our search range forward via `l = m + 1`.
 * - Slope Descending Guard: When the condition fails, we hit the falling phase or the actual crest itself.
 *   Assigning `r = m` sifts the search window smaller without discarding the current element, which
 *   could potentially be the exact answer.
 * - Out-of-Bounds Protection: Utilizing the strict inequality `l < r` prevents pointer execution crashes
 *   when reading `arr[m + 1]`. Because `m` is calculated using integer division (`Math.floor`), `m` will
 *   never equal the last index `arr.length - 1` while the loop is actively running.
 *
 * 📌 TIME COMPLEXITY: O(log N)
 * - Where N is the total length of the `arr` array. The search interval is continually divided by half
 *   on every iteration step, ensuring optimal logarithmic execution cycles.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Highly memory efficient. Computes the target coordinate index entirely in-place utilizing lightweight
 *   integer pointers (`l`, `r`, `m`), consuming zero extra runtime stack or heap dynamic buffers.
 */