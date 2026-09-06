/*
Problem statement -
Given a circular integer array nums (i.e., the next element of nums[nums.length - 1] is nums[0]), return the next greater number for every element in nums.

The next greater number of a number x is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, return -1 for this number.



Example 1:
Input: nums = [1,2,1]
Output: [2,-1,2]
Explanation: The first 1's next greater number is 2;
The number 2 can't find next greater number.
The second 1's next greater number needs to search circularly, which is also 2.


Example 2:
Input: nums = [1,2,3,4,3]
Output: [2,3,4,-1,4]


Constraints:
-> 1 <= nums.length <= 10^4
-> -10^9 <= nums[i] <= 10^9


## Solve on leetcode -> https://leetcode.com/problems/next-greater-element-ii/description/

*/

const nextGreaterElements = (arr) => {

    let n = arr.length;
    let stack = [];
    let ans = Array(n).fill(-1);

    for (let i = (2 * n) - 1; i >= 0; i--) {

        while (stack.length && stack[stack.length-1] <= arr[i % n]) {
            stack.pop();
        }

        if (i < n) {
            ans[i] = stack.length ? stack[stack.length-1] : -1;
        }
        stack.push(arr[i % n]);
    }
    return ans;
}
 let nums = [1, 2, 3, 4, 3];
let result = nextGreaterElements(nums);
console.log(result);


// ============================================================================
// 📂 APPROACH 1: MONOTONIC VALUE STACK WITH VIRTUAL TWO-PASS RESOLUTION
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Monotonic Decreasing Stack with Virtual Ring-Buffer Modulo Wrapping (2N Scan)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Circular Wrapping Trick: Elements at the end of the array need to look at elements at the
 *   beginning of the array to find their next greater element. Running a virtual loop from `(2 * n) - 1`
 *   down to `0` simulates a wrapped circular index space seamlessly.
 * - Flat Conditional Elimination: Merging the draining operations into an unconditional `while` loop
 *   cleans up the runtime path. The stack builds up the necessary historical configurations during the
 *   virtual first pass (`i >= n`) without modifying the output placeholder array.
 * - Strict Evaluation Bounds: By wrapping the assignment statement with `if (i < n)`, the algorithm
 *   safely acts as a passive observer during the look-ahead phase and only writes out the correct, final
 *   calculated results during the legitimate physical index iterations.
 * - Modulo Normalization: Using `arr[i % n]` maps large virtual iterations smoothly into bounded, valid
 *   array slots in steady O(1) constant calculation time.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the number of items within the `arr` payload. Even though the iteration span is virtually
 *   doubled to `2N`, every single tracking item undergoes exactly one push and at most one pop operation
 *   across the execution lifecycles, maintaining ideal linear performance bounds.
 *
 * 📌 SPACE COMPLEXITY: O(N) [Auxiliary Space]
 * - Allocates a stable return buffer `ans` of size N. The internal tracking `stack` dynamically grows and
 *   shrinks to maintain the monotonic trend, scaling up to a max worst-case memory footprint bound of O(N).
 */