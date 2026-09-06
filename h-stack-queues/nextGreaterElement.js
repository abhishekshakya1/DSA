/*
Problem statement -
The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.

You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2.

For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1.

Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.



Example 1:

Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
- 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
- 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.


Example 2:

Input: nums1 = [2,4], nums2 = [1,2,3,4]
Output: [3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 2 is underlined in nums2 = [1,2,3,4]. The next greater element is 3.
- 4 is underlined in nums2 = [1,2,3,4]. There is no next greater element, so the answer is -1.


Constraints:
-> 1 <= nums1.length <= nums2.length <= 1000
-> 0 <= nums1[i], nums2[i] <= 104
-> All integers in nums1 and nums2 are unique.
-> All the integers of nums1 also appear in nums2.


Follow up: Could you find an O(nums1.length + nums2.length) solution?


## Solve on leetcode -> https://leetcode.com/problems/next-greater-element-i/description/

*/

const nextGreaterElement = (nums1, nums2) => {
    let ngeMap = {};
    let stack = [];
    let n = nums2.length;

    for (let i = n - 1; i >= 0; i--) {
        let current = nums2[i];

        while (stack.length && stack[stack.length - 1] <= current) {
            stack.pop();
        }

        ngeMap[current] = stack.length ? stack[stack.length - 1] : -1;

        stack.push(current);
    }

    let ans = [];
    for (let i = 0; i < nums1.length; i++) {
        ans.push(ngeMap[nums1[i]])
    }

    return ans;
};

let nums1 = [2, 4];
let nums2 = [1, 2, 3, 4];
let result = nextGreaterElement(nums1, nums2);
console.log(result);


// ============================================================================
// 📂 APPROACH 1: CLEAN MONOTONIC STACK (ELEGANT RIGHT-TO-LEFT SCAN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Micro-Optimized Monotonic Decreasing Stack with Single-Condition Draining
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Branching Elimination: The previous approach separated smaller elements into an `if-else` split.
 *   This micro-optimization unifies the state logic. By running the `while` loop unconditionally,
 *   the stack safely structures itself automatically on *every* single iteration.
 * - Single Code Path Execution: Merging the logic means we do not write manual base-case array inserts
 *   (like index `n-1` processing) outside the loop. The `for` loop now starts directly from `n - 1`,
 *   letting the empty stack condition organically assign `-1` to the last item.
 * - Flat Ternary Assignment: Using `stack.length ? stack[stack.length - 1] : -1` completely bypasses
 *   nested `if` branches, reducing block nesting depth and allowing JS engines to optimize branch prediction.
 * - Preserving Direct Lookup Speed: The `ngeMap` collection continues to map values instantly, decoupling
 *   the final subset lookup completely from the linear monotonic layout workflow.
 *
 * 📌 TIME COMPLEXITY: O(N + M)
 * - Where N is the size of `nums2` and M is the size of `nums1`. Each element within `nums2` undergoes
 *   exactly one push and at most one pop across the life cycle, keeping the execution flatly linear.
 *
 * 📌 SPACE COMPLEXITY: O(N) [Auxiliary Space]
 * - Storage allocations track linearly to manage the internal tracking map dictionary and the working stack
 *   array instance for the structural data footprint.
 */