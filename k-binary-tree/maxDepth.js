/*
Problem statement -
Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.


Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: 3

Example 2:
Input: root = [1,null,2]
Output: 2

Constraints:
-> The number of nodes in the tree is in the range [0, 10^4].
-> -100 <= Node.val <= 100


## Solve on leetcode -> https://leetcode.com/problems/maximum-depth-of-binary-tree/description/

*/

/**
 * @param {TreeNode} root
 * @return {number}
 */

// Approach 1 - Top-Down
const maxDepth = (root) => {
    if (!root) return 0;

    let highestDepth = 0;
    const traversal = (curr, depth) => {
        highestDepth = Math.max(highestDepth, depth);
        curr.left && traversal(curr.left, depth + 1);
        curr.right && traversal(curr.right, depth + 1);
    }
    traversal(root, 1);
    return highestDepth;
};


class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

const testTree = new TreeNode(3,
    new TreeNode(9),
    new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

console.log(maxDepth(testTree));

// ============================================================================
// 📂 APPROACH 1: TOP-DOWN DEPTH-FIRST SEARCH (DFS) WITH HELPER
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Top-Down Pre-order DFS Traversal using a recursive tracking framework.
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Base Case Safeguard: Instantly checking for `!root` ensures empty trees cleanly return
 *   a depth of `0` without running into execution reference errors on null child references.
 * - State Tracking via Arguments: Passing down `depth + 1` dynamically scales the current depth levels
 *   on the call stack, preserving specific path tracking automatically for each subtree branch.
 * - Global Evaluation: Using `Math.max(highestDepth, depth)` at the entry point of each node ensures
 *   that the absolute deepest leaf path discovered across all traversals is correctly preserved.
 * - Shadowing Safety: Changed inner tracking name from `maxDepth` to `highestDepth` to prevent variable
 *   shadowing against the root function identifier, satisfying strict clean-coding paradigms.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N represents the total number of nodes in the binary tree structure. The algorithm visits
 *   every node exactly once during its comprehensive traversal stack.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Where H is the absolute height of the binary tree. This space is dynamically allocated to the
 *   recursion call stack. In the worst-case scenario (a skewed tree), it matches linear limits O(N);
 *   in a completely balanced tree, it operates optimally at O(log N).
 */



// Approach 2 - Bottom-Up
const maxDepth1 = (root) => {
    if (!root) return 0;

    let leftMax = maxDepth1(root.left);
    let rightMax = maxDepth1(root.right);

    return 1 + Math.max(leftMax, rightMax);
}

// ============================================================================
// 📂 APPROACH 2: BOTTOM-UP RECURSIVE DEPTH-FIRST SEARCH (DFS)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Post-Order Bottom-Up DFS (Divide and Conquer Framework).
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Recursive Consistency: Ensure the inner recursive execution tracks the exact function
 *   identifier (`maxDepth1`) to avoid breaking the execution scope chain.
 * - Post-Order Structure: Subtree depths are computed completely before the root node processes
 *   its operations, making it a natural post-order tree pattern.
 * - Base Case Convergence: Reaching a `null` leaf safely returns `0`, which provides the correct
 *   starting foundation for adding subsequent levels on the upward return path.
 * - Height Calculation Rule: The standard computation rule for calculating the depth of a tree node
 *   is taking the maximum depth value between its subtrees and incrementing by `1`.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N represents the total number of nodes inside the target binary tree. The engine must
 *   traverse and evaluate every single node structure to determine the final maximum value.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Dependent on the tree height H due to memory allocations on the recursive call stack frame.
 *   Degrades to O(N) in worst-case skewed trees and operates at O(log N) in perfectly balanced states.
 */
