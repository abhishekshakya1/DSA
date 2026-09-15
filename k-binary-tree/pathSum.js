/*
Problem statement -
Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

A leaf is a node with no children.


Example 1:
Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true
Explanation: The root-to-leaf path with the target sum is shown.


Example 2:
Input: root = [1,2,3], targetSum = 5
Output: false
Explanation: There are two root-to-leaf paths in the tree:
(1 --> 2): The sum is 3.
(1 --> 3): The sum is 4.
There is no root-to-leaf path with sum = 5.


Example 3:
Input: root = [], targetSum = 0
Output: false
Explanation: Since the tree is empty, there are no root-to-leaf paths.


Constraints:
-> The number of nodes in the tree is in the range [0, 5000].
-> -1000 <= Node.val <= 1000
-> -1000 <= targetSum <= 1000


## Solve on leetcode -> https://leetcode.com/problems/path-sum/description/

*/

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */


// Approach 1 - Top-down
const hasPathSum = (root, targetSum) => {
    if (!root) return false;

    let ans = false;
    const traverse = (curr, currSum) => {
        if (ans) return;

        let newSum = currSum + curr.val;

        if (!curr.left && !curr.right) {
            if (newSum === targetSum) {
                ans = true;
            }
            return;
        }

        if (curr.left) traverse(curr.left, newSum);
        if (curr.right) traverse(curr.right, newSum);
    };

    traverse(root, 0);
    return ans;
};


class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Tree structure: [5, 4, 8, 11, null, 13, 4, 7, 2]
const testTree = new TreeNode(5,
    new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))),
    new TreeNode(8, new TreeNode(13), new TreeNode(4))
);
console.log(hasPathSum(testTree, 22));


// ============================================================================
// 📂 APPROACH 1: TOP-DOWN DFS WITH ACCUMULATED SUM & EARLY PRUNING
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Top-down Depth-First Search (DFS) with recursive path accumulation.
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Leaf Node Validation: A path must end exactly at a leaf node (`!curr.left && !curr.right`).
 *   Checking the sum at intermediate nodes will fail LeetCode verification parameters.
 * - Early Exit Pruning: Adding an `if (ans) return;` block at the entry point of the recursive
 *   helper avoids redundant processing once a valid path has already been flagged.
 * - Initial Target Boundary: Base validation `if (!root) return false;` keeps empty tree inputs
 *   from initiating traversal workflows, maintaining accurate problem constraints.
 * - Boolean Simplification: Reduced the syntax structure from `ans = ans || true` directly to
 *   `ans = true` to elevate logical clarity and execution cleanlines.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N represents the total count of nodes in the binary tree. In the worst case, every single
 *   node must be visited if no valid path exists or if the valid path is at the very last leaf.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Dependent on the max height H of the tree utilized by the recursion call stack. Ranges from
 *   O(log N) for perfectly balanced trees up to O(N) for highly skewed tree variants.
 */




// Approach 2 - Bottom-Up
const hasPathSum1 = (root, targetSum) => {
    if (!root) return false;

    if (!root.left && !root.right) {
        return root.val === targetSum;
    }

    let leftSubTreeHasPathSum = hasPathSum1(root.left, targetSum - root.val);
    let rightSubTreeHasPathSum = hasPathSum1(root.right, targetSum - root.val);

    return leftSubTreeHasPathSum || rightSubTreeHasPathSum;
};

// ============================================================================
// 📂 APPROACH 2: PURE RECURSION VIA TARGET SUBTRACATION (NO HELPER)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Subtree Target Reduction (Divide & Conquer Framework).
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Recursive Identifier Sync: Make sure inner calls invoke `hasPathSum1` rather than
 *   older function labels to maintain execution scope integrity.
 * - Leaf Evaluation Rule: The absolute validation check `root.val === targetSum` must
 *   only occur explicitly when a node satisfies structural leaf rules (`!root.left && !root.right`).
 * - Short-Circuiting Efficiency: The expression `left || right` inherently provides early exit
 *   properties. If the left branch evaluates to `true`, the engine completely skips scanning the right.
 * - Dynamic Target Reduction: Reducing the scope parameter down to `targetSum - root.val` removes
 *   the operational overhead of mutating or passing external state variables down the call stack.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N represents the total count of elements inside the tree structure. In worst-case
 *   distribution states, every tree element is evaluated before finding a correct solution pathway.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Relies on the recursive runtime call stack frame depth. Ranges dynamically between
 *   O(log N) on tightly balanced systems to O(N) constraints for entirely skewed structures.
 */