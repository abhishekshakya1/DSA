/*
Problem statement -
Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.


Example 1:
Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].


Example 2:
Input: root = [1,2]
Output: 1

Constraints:
-> The number of nodes in the tree is in the range [1, 10^4].
-> -100 <= Node.val <= 100


## Solve on leetcode -> https://leetcode.com/problems/diameter-of-binary-tree/description/

*/

/**
 * @param {TreeNode} root
 * @return {number}
 */

const diameterOfBinaryTree = (root) => {
    let maxDiameter = 0;
    const findDepth = (curr) => {
        if (!curr) return 0;
        let leftDepth = findDepth(curr.left);
        let rightDepth = findDepth(curr.right);
        let currDiameter = leftDepth + rightDepth;
        maxDiameter = Math.max(currDiameter, maxDiameter);
        return 1 + Math.max(leftDepth, rightDepth);
    }
    findDepth(root);
    return maxDiameter;
};


class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}


// Tree structure: [1, 2, 3, 4, 5]
//      1
//     / \
//    2   3
//   / \
//  4   5
const testTree = new TreeNode(1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3)
);
console.log(diameterOfBinaryTree(testTree));



// ============================================================================
// 📂 APPROACH 1: SINGLE-PASS POST-ORDER HEIGHT & PATH EVALUATION
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Post-Order Bottom-Up DFS (Height-Tracking Path Maxima Pattern).
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Edge vs Node Counting: The diameter represents the length of the path in terms of *edges*.
 *   Therefore, the current local path calculation is strictly `leftDepth + rightDepth` without
 *   adding any offset multipliers.
 * - Global State Tracking: The max diameter path does not necessarily have to pass through the absolute
 *   root of the entire tree. Caching the local maximum iteratively via `maxDiameter = Math.max(...)`
 *   ensures deep localized loops are accurately captured.
 * - Single-Pass Efficiency: Returning subtree height up to the parent node while updating a global
 *   variable tracks both required metrics simultaneously, preserving a highly performant single-pass system.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N represents the total count of elements inside the tree structure. The engine visits
 *   and processes every single node exactly once during stack resolution.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Relies on the recursive runtime call stack frame depth. Ranges dynamically between
 *   O(log N) on tightly balanced systems to O(N) constraints for entirely skewed structures.
 */