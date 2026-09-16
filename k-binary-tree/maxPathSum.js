/*
Problem statement -
A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.


Example 1:
Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.


Example 2:
Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.


Constraints:
-> The number of nodes in the tree is in the range [1, 3 * 10^4].
-> -1000 <= Node.val <= 1000


## Solve on leetcode -> https://leetcode.com/problems/binary-tree-maximum-path-sum/description/

*/

/**
 * @param {TreeNode} root
 * @return {number}
 */


const maxPathSum = (root) => {
    let maxSum = -Infinity;
    const traversal = (curr) => {
        if (!curr) return 0;

        let maxLeft = Math.max(0, traversal(curr.left));
        let maxright = Math.max(0, traversal(curr.right));

        let currMax = curr.val + maxLeft + maxright;
        maxSum = Math.max(currMax, maxSum);

        return curr.val + Math.max(maxLeft, maxright);
    }
    traversal(root);
    return maxSum;
};


class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Tree structure: [-10, 9, 20, null, null, 15, 7]
//       -10
//       /  \
//      9   20
//         /  \
//        15   7
const testTree = new TreeNode(-10,
    new TreeNode(9),
    new TreeNode(20, new TreeNode(15), new TreeNode(7))
);
console.log(maxPathSum(testTree));



// ============================================================================
// 📂 APPROACH 1: POST-ORDER DFS WITH DUAL-BRANCH PATH CLAMPING
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Post-Order Bottom-Up DFS (Path-Splitting Maxima Invariant).
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Negative Pruning Guard: Wrapping recursive triggers inside `Math.max(0, ...)` acts as a defensive
 *   shield that drops poorly performing sub-branches entirely if their cumulative sum dips below zero.
 * - Structural Dual-Identity: A node can either connect both children to form a closed arch-path
 *   (`curr.val + maxLeft + maxRight`), or it can bubble up a single-line continuation arm to its parent.
 *   Mixing these two up breaks the linear tree-path definition.
 * - Global Min Safeguard: Initializing `maxSum = -Infinity` guarantees correct output updates even if the
 *   tree consists entirely of purely negative node values.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N represents the total count of elements inside the tree structure. The engine visits
 *   and evaluates every individual node exactly once during its bottom-up stack lifecycle.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Relies on the recursive runtime call stack frame depth. Ranges dynamically between
 *   O(log N) on tightly balanced systems up to O(N) constraints for entirely skewed structures.
 */