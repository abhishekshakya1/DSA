/*
Problem statement -
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”


Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.


Example 2:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.


Example 3:
Input: root = [1,2], p = 1, q = 2
Output: 1


Constraints:
-> The number of nodes in the tree is in the range [2, 10^5].
-> -10^9 <= Node.val <= 10^9
-> All Node.val are unique.
-> p != q
-> p and q will exist in the tree.


## Solve on leetcode -> https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/

*/

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */


const lowestCommonAncestor = (root, p, q) => {
    let lca = null;
    const traversal = (curr) => {
        let count = 0;
        if (!curr) return 0;
        let ansOnLeft = traversal(curr.left);
        let ansOnRight = traversal(curr.right);
        if (curr.val === p.val || curr.val === q.val) {
            count++;
        }
        count = count + ansOnLeft + ansOnRight;
        if (count === 2 && !lca) {
            lca = curr;
        }
        return count;
    }
    traversal(root);
    return lca;
};


// ============================================================================
// 📂 APPROACH 1: POST-ORDER ACCUMULATIVE COUNTING WITH EARLY PRUNING
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Post-Order Depth-First Search (DFS) with multi-state target summation.
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Bottom-Up Guarantee: Because processing happens post-order (after resolving left and right subtrees),
 *   the first node that aggregates a `count === 2` is guaranteed to be the *lowest* common ancestor.
 * - Early Exit Pruning: Checking `if (lca) return 0;` at the beginning of the traversal prevents
 *   redundant recursive lookups on completely unrelated subtrees after the LCA has already been isolated.
 * - Identity vs Value Match: In standard tree references, `curr === p` is safer, but checking `curr.val === p.val`
 *   works flawlessly across standard value-isolated LeetCode node evaluations.
 *
 * 📌 TIME COMPLEXITY: $O(N)$
 * - Where N represents the total count of elements inside the binary tree. In the worst-case scenario
 *   (e.g., when the targets are at opposite ends or deep leaves), the system evaluates every node exactly once.
 *
 * 📌 SPACE COMPLEXITY: $O(H)$ [Auxiliary Space]
 * - Dependent on the max height H of the execution recursion stack frame. Operates optimally at
 *   $O(\log N)$ for completely balanced structures, and trends to linear $O(N)$ targets on skewed paths.
 */