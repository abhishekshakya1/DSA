/*
Problem statement -
Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.


Example 1:
Input: p = [1,2,3], q = [1,2,3]
Output: true


Example 2:
Input: p = [1,2], q = [1,null,2]
Output: false


Example 3:
Input: p = [1,2,1], q = [1,1,2]
Output: false


Constraints:
-> The number of nodes in both trees is in the range [0, 100].
-> -10^4 <= Node.val <= 10^4


## Solve on leetcode -> https://leetcode.com/problems/same-tree/description/

*/

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */

const isSameTree = (p, q) => {
    if (!p && !q) return true;
    if (!p || !q) return false;

    return p.val === q.val &&
        isSameTree(p.left, q.left) &&
        isSameTree(p.right, q.right);
};


class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}


// Tree 1: [1, 2, 3]
const tree1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));

// Tree 2: [1, 2, 3]
const tree2 = new TreeNode(1, new TreeNode(2), new TreeNode(3));

// Tree 3: [1, null, 2]
const tree3 = new TreeNode(1, null, new TreeNode(2));

console.log(isSameTree(tree1, tree2));
console.log(isSameTree(tree1, tree3));


// ============================================================================
// 📂 APPROACH 1: RECURSIVE PRE-ORDER SIMULTANEOUS TRAVERSAL
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Pre-Order Simultaneous Depth-First Search (DFS) Traversal across twin structures.
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Structural Base Cascades: Separating structural matches `(!p && !q)` from asymmetry checks
 *   `(!p || !q)` provides a sound validation shield before evaluating structural scalar value properties.
 * - Same-Side Positional Subtree Tracking: Ensure you match `p.left` with `q.left` and `p.right` with
 *   `q.right`. Accidentally crossing paths will turn this into a structural mirror check (like LeetCode 101).
 * - Engine Evaluation Efficiency: Using logical `&&` links automatically triggers structural execution
 *   short-circuit pruning, saving clock cycles when a structural error surfaces early on.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N represents the total count of elements inside the smaller tree. The engine evaluates
 *   matching paired node blocks sequentially up to structural termination boundaries.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Dependent on the max height H of the execution recursion stack frame. Operates optimally at
 *   O(log N) for completely balanced structures, and trends to linear O(N) targets on skewed lines.
 */