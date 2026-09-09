/*
Problem statement -
You are given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.


Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].


Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]


Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]


Constraints:
-> 2 <= nums.length <= 10^4
-> -10^9 <= nums[i] <= 10^9
-> -10^9 <= target <= 10^9
-> Only one valid answer exists.


Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?


## Solve on leetcode -> https://leetcode.com/problems/two-sum/description/

*/

// Approach 1
var twoSum = function(nums, target) {
    let n = nums.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            let sum = nums[i] + nums[j];
            if (sum === target) {
                return [i, j];
            }
        }
    }
}

let nums = [2, 7, 11, 15];
let target = 9;
let result = twoSum(nums, target);
console.log(result);


// ============================================================================
// 📂 APPROACH 1: BRUTE FORCE SEARCH (COMBINATORIAL PAIRING PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Exhaustive Combinatorial Iteration via Nested Linear Scans
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Quadratic State Checking: The outer loop anchors a structural target index `i`, while the
 *   inner loop scans all subsequent indices `j = i + 1` to manually compute combinations. This
 *   guarantees finding a solution if it exists but scales heavily with data spikes.
 * - Zero Memory Allocation: The approach requires absolutely no extra physical data structures or
 *   runtime lookup tables, operating entirely with constant space overhead metrics.
 *
 * 📌 TIME COMPLEXITY: O(N^2)
 * - Where N is the total number of items within the `nums` collection. The inner execution path runs
 *   triangular iteration blocks translating directly to a slow quadratic time execution graph.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Ideal spatial performance footprint. Resolves index processing inside basic, lightweight scalar
 *   iteration registers (`i`, `j`, `sum`), demanding no auxiliary allocations.
 */





// Approach 2
const twoSum1 = (nums, target) => {
    let n = nums.length;
    let map = {};

    for (let i = 0; i < n; i++) {
        map[nums[i]] = i;
    }

    for (let i = 0; i < n; i++) {
        let pairToFind = target - nums[i];
        if (pairToFind in map && map[pairToFind] != i) {
            return [i, map[pairToFind]]
        }
    }
};

let nums1 = [3, 2, 4];
let result1 = twoSum1(nums1, 6);
console.log(result1);



// ============================================================================
// 📂 APPROACH 2: TWO-PASS HASH MAP WITH 'IN' OPERATOR INTEGRITY
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Symmetrical Hash Map Dictionary Lookups via Structural Key Invalidation
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Bypassing Falsy Index Bounds: A common pitfall in Javascript is writing lookup checks as
 *   `if (map[key])`. This collapses if the index value stored is `0`, as `0` evaluates to false.
 *   Leveraging the **`in` operator** (`pairToFind in map`) probes the structural key schema instead of
 *   the value, protecting against boundary failures natively.
 * - Self-Matching Protection Guard: The explicit addition of `map[pairToFind] != i` is a critical business
 *   rule constraint. It prevents an element from picking itself as its own complement pairing (e.g., stopping
 *   a lone `3` from matching with itself to incorrectly solve a target of `6`).
 * - Deterministic Overwrite Invariant: If duplicate values exist in the array, the first pass loop naturally
 *   overwrites the older dictionary entries with the latest index positions. The code still runs flawlessly
 *   because the second pass scans from left-to-right, ensuring the forward-facing pairing remains intact.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total count of elements within the `nums` collection. The process features two distinct
 *   linear loops running in sequence (`O(N) + O(N)`), which simplifies flatly into linear execution speed.
 *
 * 📌 SPACE COMPLEXITY: O(N) [Auxiliary Space]
 * - Allocates an internal lookup hash map cache container that scales linearly in memory to maintain key-value
 *   pairs for up to N discrete data elements.
 */
