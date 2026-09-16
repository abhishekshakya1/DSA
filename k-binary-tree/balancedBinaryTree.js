/*
Problem statement -
Given a binary tree, determine if it is height-balanced.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: true


Example 2:
Input: root = [1,2,2,3,3,null,null,4,4]
Output: false


Example 3:
Input: root = []
Output: true

Constraints:
-> The number of nodes in the tree is in the range [0, 5000].
-> -10^4 <= Node.val <= 10^4


## Solve on leetcode -> https://leetcode.com/problems/balanced-binary-tree/description/

*/

/**
 * @param {TreeNode} root
 * @return {boolean}
 */

const isBalanced = (root) => {
    if (!root) return true;

    const calculateHeight = (curr) => {
        if (!curr) return 0;

        let leftHeight = calculateHeight(curr.left);
        if (leftHeight === -1) return -1;

        let rightHeight = calculateHeight(curr.right);
        if (rightHeight === -1) return -1;

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }

        return 1 + Math.max(leftHeight, rightHeight);
    };

    return calculateHeight(root) !== -1;
};


// ============================================================================
// 📂 APPROACH 1: OPTIMIZED BOTTOM-UP DFS WITH SENTINEL VALUING (-1)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Post-Order Bottom-Up DFS with Sentinel Error Flagging (-1).
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Sentinel Early Pruning: Returning `-1` acts as a structural circuit breaker. If a node deep
 *   within the tree becomes unbalanced, the algorithm instantly aborts processing remaining branches.
 * - Single-Pass Efficiency: By combining height computation and balance verification into a single
 *   traversal pass, we avoid the naive $O(N^2)$ pitfall of calling a separate height function on every node.
 * - Balance Condition definition: A binary tree is height-balanced if the absolute difference in height
 *   between the left and right subtrees of *every* node is at most `1`.
 *
 * 📌 TIME COMPLEXITY: $O(N)$
 * - Where N represents the total count of elements inside the tree structure. The engine visits
 *   each node at most once due to the bottom-up nature of the calculation.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Relies on the recursive runtime call stack frame depth. Ranges dynamically between
 *   O(log N) on tightly balanced systems to O(N) constraints for entirely skewed structures.
 */