/*
Problem statement -
You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.

Return the single element that appears only once.

Your solution must run in O(log n) time and O(1) space.



Example 1:
Input: nums = [1,1,2,3,3,4,4,8,8]
Output: 2

Example 2:
Input: nums = [3,3,7,7,10,11,11]
Output: 10


Constraints:
-> 1 <= nums.length <= 10^5
-> 0 <= nums[i] <= 10^5


## Solve on leetcode -> https://leetcode.com/problems/single-element-in-a-sorted-array/description/

*/
const singleNonDuplicate = (nums) => {
    let l = 0;
    let r = nums.length - 1;

    while (l <= r) {
        let m = l + Math.floor((r - l) / 2);

        if (nums[m] === nums[m - 1]) {
            let leftCount = m - 1 - l;
            if (leftCount % 2 === 1) {
                r = m - 2;
            } else {
                l = m + 1;
            }
        }

        else if (nums[m] === nums[m + 1]) {
            let leftCount = m - l;
            if (leftCount % 2 === 1) {
                r = m - 1;
            } else {
                l = m + 2;
            }
        }

        else {
            return nums[m];
        }
    }
};

let nums = [1, 1, 2, 3, 3, 4, 4, 8, 8];
let result = singleNonDuplicate(nums);
console.log(result);


// ============================================================================
// 📂 APPROACH 1: LEFT-SUBARRAY ELEMENT COUNTING (BALANCE DISRUPTION PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Monotonic Subarray Length Validation via Left Element Counting
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Perfect Pairs Invariant: In a sorted array where every element appears exactly twice,
 *   any sub-segment that does not contain the unique "single element" will always have an **even length**
 *   (e.g., pairs of 2 take up 2, 4, 6... slots). The unique element disrupts this balance.
 * - Dynamic Left-Count Evaluation:
 *     - If `nums[m] === nums[m - 1]`, the current duplicate block ends at `m`. The remaining stable elements
 *       to its left span from index `l` to `m - 2`. We calculate this exactly as `leftCount = m - 1 - l`.
 *     - If `nums[m] === nums[m + 1]`, the current duplicate block starts at `m`. The stable elements
 *       to its left span from `l` to `m - 1`, calculated as `leftCount = m - l`.
 * - Directional Pivot Shift: If `leftCount % 2 === 1` (Odd length), it acts as an absolute mathematical
 *   proof that the unique balancing element is trapped inside that left sub-segment. If it is even,
 *   the left side is perfectly uniform, forcing us to shift our search to the right half.
 * - Early Terminating Match: The moment `nums[m]` fails to match both its adjacent neighbors, it instantly
 *   identifies itself as the unique isolated node, returning the target value immediately without completing the loop.
 *
 * 📌 TIME COMPLEXITY: O(log N)
 * - Where N is the total length of the `nums` collection. The standard binary search logic halves the active
 *   structural search space on every loop iteration, providing highly optimized logarithmic time bounds.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Fully space optimized. Executes all positional evaluations completely in-place using lightweight scalar
 *   register pointers (`l`, `r`, `m`, `leftCount`), requiring zero dynamic stack or heap memory buffers.
 */
