/*
Problem statement -
Given the root of a binary tree, determine if it is a valid binary search tree (BST).


A valid BST is defined as follows:

-> The left subtree of a node contains only nodes with keys strictly less than the node's key.

-> The right subtree of a node contains only nodes with keys strictly greater than the node's key.

-> Both the left and right subtrees must also be binary search trees.


Example 1:
Input: root = [2,1,3]
Output: true


Example 2:
Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.


Constraints:
-> The number of nodes in the tree is in the range [1, 10^4].

-> -2^31 <= Node.val <= 2^31 - 1


## Solve on leetcode -> https://leetcode.com/problems/validate-binary-search-tree/description/

*/

/**
 * @param {TreeNode} root
 * @return {boolean}
 */


const isValidBST = (root) => {
    if (!root) return true;

    const isBST = (curr, low, high) => {
        if (!curr) return true;
        if ((low !== null && curr.val <= low) || (high != null && curr.val >= high)) {
            return false;
        }
        let isLeftBST = isBST(curr.left, low, curr.val);
        let isRightBST = isBST(curr.right, curr.val, high);

        return isLeftBST && isRightBST;
    }
    return isBST(root, null, null);

};


// ============================================================================
// 📂 APPROACH 1: TOP-DOWN RANGE CONSTRAINING (DFS BOUNDARY VERIFICATION)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Top-Down Pre-Order DFS with Dynamic Range Clamping (Interval Bound Validation).
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Argument Mutation Trap: Never write assignments (`high = curr.val`) inside execution call slots.
 *   It overrides the current execution thread context, corrupting sibling calls further down the block.
 * - Beyond Child Comparisons: A naive check like `root.left.val < root.val` is incomplete. Nodes deep inside the
 *   left subtree must *also* be smaller than the main structural ancestral roots. Carrying `low` and `high`
 *   boundaries handles this globally.
 * - Strict Invariant Operators: The problem states that a BST cannot have duplicate values. Therefore,
 *   the comparisons use inclusive operators (`<=` and `>=`) to instantly catch matching values as invalid.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N represents the total number of nodes in the binary tree. The engine evaluates
 *   and validates each individual item exactly once.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Dependent on the maximum structural depth H of the runtime call stack. For highly balanced trees,
 *   this operates optimally at O(log N); for skewed inputs, it degrades to linear limits O(N).
 */