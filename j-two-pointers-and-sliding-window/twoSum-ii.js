/*
Problem statement -
Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.

Return the indices of the two numbers index1 and index2, each incremented by one, as an integer array [index1, index2] of length 2.

The tests are generated such that there is exactly one solution. You may not use the same element twice.

Your solution must use only constant extra space.


Example 1:
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].


Example 2:
Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].


Example 3:
Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].


Constraints:
-> 2 <= numbers.length <= 3 * 10^4
-> -1000 <= numbers[i] <= 1000
-> numbers is sorted in non-decreasing order.
-> -1000 <= target <= 1000
-> The tests are generated such that there is exactly one solution.


## Solve on leetcode -> https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/

*/

const twoSum = (nums, target) => {
    let i = 0;
    let j = nums.length - 1;

    while (i < j) {
        let sum = nums[i] + nums[j];
        if (sum > target) {
            j--;
        } else if (sum < target) {
            i++;
        } else {
            return [i + 1, j + 1];
        }
    }
};

let nums = [2, 7, 11, 15];
let result = twoSum(nums, 9);
console.log(result);


// ============================================================================
// 📂 APPROACH 1: TWO-POINTER COLLISION (SORTED ARRAY INVARIANT PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Opposing Two-Pointer Inward Convergence via Sorted Monotonicity
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Exploiting Sorted Monotonicity: When an array is already sorted, the values increase strictly
 *   from left to right. This structural rule eliminates the need for nested comparisons or hash maps,
 *   allowing us to modify the directional movement of our pointer boundaries deterministically.
 * - Dynamic Target Squeezing:
 *     - If `sum > target`, the current pairing is too heavy. To decrease the value, our only choice is
 *       to pull the right boundary inward via `j--` (moving to a smaller value).
 *     - If `sum < target`, the pairing is too light. To increase the value, we push the left boundary
 *       forward via `i++` (moving to a larger value).
 * - 1-Based Offset Alignment: The question constraints strictly mandate returning 1-based index tracks
 *   instead of standard 0-indexed positions. Returning `[i + 1, j + 1]` safely intercepts the indices
 *   at the final structural resolution step without polluting the main loop pointers.
 * - Confirmed Uniqueness Guard: The problem explicitly states that there is exactly one unique solution,
 *   guaranteeing that the pointers will always collide on the target pair without hitting an infinite loop.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total length of the `nums` array. The two opposing pointers close inward toward each other.
 *   In the absolute worst-case scenario, they traverse the entire collection exactly once, delivering
 *   highly optimal linear time execution.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Completely space-efficient. Handles the lookup operations entirely in-place utilizing basic,
 *   lightweight scalar reference registers (`i`, `j`, `sum`), requiring zero dynamic stack or heap memory buffers.
 */