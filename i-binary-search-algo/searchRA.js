/*
Problem statement -
There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly left rotated at an unknown index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be left rotated by 3 indices and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.


Example 1:
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

Example 2:
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1

Example 3:
Input: nums = [1], target = 0
Output: -1


Constraints:
-> 1 <= nums.length <= 5000
-> -10^4 <= nums[i] <= 10^4
-> All values of nums are unique.
-> nums is an ascending array that is possibly rotated.
-> -10^4 <= target <= 10^4


## Solve on leetcode -> https://leetcode.com/problems/search-in-rotated-sorted-array/description/

*/


const search = (nums, target) => {
    let l = 0;
    let r = nums.length - 1;

    while (l <= r) {
        let m = l + Math.floor((r - l) / 2);

        if (target === nums[m]) {
            return m;
        }

        if (nums[l] <= nums[m]) {
            if (target < nums[m] && target >= nums[l]) {
                r = m - 1;
            }
            else {
                l = m + 1;
            }
        } else {
            if (target > nums[m] && target <= nums[r]) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
    }
    return -1;
};

let nums = [4, 5, 6, 7, 0, 1, 2];
let result = search(nums, 0);
console.log(result);

// ============================================================================
// 📂 APPROACH 1: MODIFIED BINARY SEARCH (PIVOT-INSENSITIVE HALVING PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Rotated Sorted Invariant Division (Segmented Binary Search)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Rotated Splitting Property: Splitting a rotated sorted array at any random midpoint `m`
 *   guarantees that at least one of the resulting sub-arrays (`[l to m]` or `[m to r]`) will remain
 *   perfectly sorted. This structural invariant allows us to adapt standard Binary Search.
 * - Dynamic Sorting Identification: Evaluating `nums[l] <= nums[m]` determines if the left segment
 *   is orderly. The equals sign `<=` is a crucial guard for edge cases where the left and middle
 *   pointers converge on the exact same array element (e.g., size 1 or 2 sub-arrays).
 * - Target Range Bounding: Once a sorted segment is found, we run a strict boundary check
 *   (e.g., `target >= nums[l] && target < nums[m]`). If true, the target is guaranteed to live in that
 *   half, allowing us to drop the other half. If false, we pivot entirely to the unsorted segment.
 * - Single Pass Convergence: This approach finds the element directly in a single pass without needing
 *   to find the minimum element or pivot point index first, which keeps the code clean and fast.
 *
 * 📌 TIME COMPLEXITY: O(log N)
 * - Where N is the total length of the `nums` array. The algorithm continuously cuts the search
 *   interval in half on every single cycle, ensuring optimal logarithmic time complexity.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Completely space-efficient. Resolves the index lookups entirely in-place using lightweight scalar
 *   pointers (`l`, `r`, `m`), demanding no additional heap memory configurations.
 */
