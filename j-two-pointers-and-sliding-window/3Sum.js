/*
Problem statement - Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.



Example 1:
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation:
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.


Example 2:
Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.


Example 3:
Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.


Constraints:
-> 3 <= nums.length <= 3000
-> -10^5 <= nums[i] <= 10^5


## solve on leetcode -> https://leetcode.com/problems/3sum/description/

*/

const threeSum = (nums) => {

    nums.sort((a, b) => a - b);
    let ans = [];

    for (let i = 0; i < nums.length; i++) {
        if (i === 0 || nums[i] !== nums[i - 1]) {
            twoSum(nums, i, ans);
        }
    }
    return ans;
};

const twoSum = (nums, x, ans) => {
    let i = x + 1;
    let j = nums.length - 1;

    while (i < j) {
        let sum = nums[i] + nums[j] + nums[x];
        if (sum > 0) {
            j--;
        } else if (sum < 0) {
            i++;
        } else {
            ans.push([nums[i], nums[j], nums[x]]);
            i++;
            j--;

            while (i < j && nums[i] === nums[i - 1]) {
                i++;
            }
        }
    }
};

let nums = [-1, 0, 1, 2, -1, -4];
let result = threeSum(nums);
console.log(result);


// ============================================================================
// 📂 APPROACH 1: SORTED ANCHOR SELECTION WITH TWO-POINTER PAIRING CONVERGENCE
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Opposing Two-Pointer Inward Squeezing with Layered Duplicate Invalidation
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Array Sorting Constraint: Initializing via `nums.sort((a, b) => a - b)` is mandatory. It normalizes
 *   the values into a monotonic pattern. This unlocks both deterministic two-pointer motion controls
 *   and simple adjacent duplication tracking strategies.
 * - Layered Duplicate Prevention: The biggest pitfall in 3Sum is tracking identical combinations. We lock
 *   this down using a dual-layered boundary guard:
 *     1. The outer line check skips picking identical anchors (`nums[i] === nums[i-1]`).
 *     2. The inner loop checks skip duplicate values for the secondary pointer *after* registering a match.
 * - Pivot Element Decoupling: Treating the problem as fixing one permanent element (`nums[x]`) shifts the remaining
 *   sub-segment execution directly into a classic `Two Sum II` problem landscape, shrinking operational tracking overhead.
 * - Symmetric Boundaries Optimization: Inside the `twoSum` inner loop, when a valid triplet is found, pushing
 *   both `i++` and `j--` simultaneously is mathematically safe because any other change using the current fixed
 *   anchor would require a completely different pair configuration to balance back to zero.
 *
 * 📌 TIME COMPLEXITY: O(N^2)
 * - Where N is the size of the `nums` array. Sorting the array runs in `O(N log N)` time. The outer anchor
 *   loop executes N times, and for each anchor, the internal two-pointer loop scans the remaining space in
 *   linear O(N) cycles, yielding a total quadratic time complexity graph.
 *
 * 📌 SPACE COMPLEXITY: O(1) or O(N) [Depending on Sorting Artifacts]
 * - The logic calculates coordinates in-place utilizing basic integer pointer states (`i`, `j`, `sum`),
 *   demanding zero auxiliary lookup tables. Space notation skips the storage required for the output array `ans`.
 *   Depending on the browser's engine implementation, JS native `.sort()` consumes up to O(N) auxiliary space internally.
 */
