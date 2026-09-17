/*
Problem statement -
Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”


Example 1:
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.


Example 2:
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.


Example 3:
Input: root = [2,1], p = 2, q = 1
Output: 2


Constraints:
-> The number of nodes in the tree is in the range [2, 10^5].
-> -10^9 <= Node.val <= 10^9
-> All Node.val are unique.
-> p != q
-> p and q will exist in the BST.


## Solve on leetcode -> https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/

*/

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */


const lowestCommonAncestor = (root, p, q) => {
    if (!root) return null;

    if (p.val < root.val && q.val < root.val) {
        return lowestCommonAncestor(root.left, p, q);
    } else if (p.val > root.val && q.val > root.val) {
        return lowestCommonAncestor(root.right, p, q)
    } else {
        return root;
    }
};


// ============================================================================
// 📂 APPROACH 1: RECURSIVE DIRECTIONAL PATH SPLITTING
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - BST Directional Split / Range-Based Pruning (Divide & Conquer Variant).
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Binary Tree vs BST Rule: In a regular binary tree (LeetCode 236), finding the LCA requires a full
 *   post-order scan of subtrees. In a BST, checking node value inequalities lets you bypass checking
 *   unrelated branches entirely.
 * - Split Invariant Rule: The LCA is uniquely anchored at the exact point where the path divergence occurs.
 *   If the values fall on opposite sides of `root.val`, moving down either path will permanently lose
 *   contact with one of the target nodes.
 * - Simple Pointer Returns: Directly appending `return lowestCommonAncestor(...)` bubbles the target node
 *   reference cleanly back up the call stack without needing to manage temporary container states.
 *
 * 📌 TIME COMPLEXITY: O(H)
 * - Where H represents the total height of the Binary Search Tree. On average, balanced tree layouts
 *   scale at logarithmic limits \(O(\log N)\), while entirely skewed patterns degrade to linear O(N) paths.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Relies on the recursive runtime call stack frame depth. Ranges dynamically between
 *   O(log N) on tightly balanced systems to O(N) constraints for entirely skewed structures.
 */