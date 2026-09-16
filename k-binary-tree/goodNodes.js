/*
Problem statement -
Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.

Return the number of good nodes in the binary tree.


Example 1:
Input: root = [3,1,4,3,null,1,5]
Output: 4
Explanation: Nodes in blue are good.
Root Node (3) is always a good node.
Node 4 -> (3,4) is the maximum value in the path starting from the root.
Node 5 -> (3,4,5) is the maximum value in the path
Node 3 -> (3,1,3) is the maximum value in the path.


Example 2:
Input: root = [3,3,null,4,2]
Output: 3
Explanation: Node 2 -> (3, 3, 2) is not good, because "3" is higher than it.


Example 3:
Input: root = [1]
Output: 1
Explanation: Root is considered as good.


Constraints:
-> The number of nodes in the binary tree is in the range [1, 10^5].
-> Each node's value is between [-10^4, 10^4].


## Solve on leetcode -> https://leetcode.com/problems/count-good-nodes-in-binary-tree/description/

*/

/**
 * @param {TreeNode} root
 * @return {number}
 */


const goodNodes = (root) => {
    let ans = 0;
    const traversal = (curr, maxSeenSoFar) => {
        if (curr.val >= maxSeenSoFar) {
            ans++
        }
        let currMax = Math.max(maxSeenSoFar, curr.val);
        curr.left && traversal(curr.left, currMax);
        curr.right && traversal(curr.right, currMax);
    }
    traversal(root, -Infinity);
    return ans;
};


// ============================================================================
// 📂 APPROACH 1: TOP-DOWN DFS WITH PATH-ISOLATED PATH MAXIMA
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Top-Down Pre-Order DFS Traversal with invariant state tracking.
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - -Infinity Initialization: Setting the initial tracker boundary to `-Infinity` ensures
 *   that the absolute root element is universally captured as a "good node" regardless of negative tree values.
 * - Local State Isolation: Defining `currMax` within the individual stack scope context automatically protects
 *   data values from crossing over or corrupting unrelated subtree paths during backtrack operations.
 * - Evaluation Invariant: The check `curr.val >= maxSeenSoFar` uses inclusive evaluation, meaning
 *   nodes with duplicate maximum values along the exact same path are correctly counted as valid.
 *
 * 📌 TIME COMPLEXITY: $O(N)$
 * - Where N represents the total number of nodes inside the tree structure. The engine visits
 *   and processes every single node exactly once during its full traversal cycle.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Relies on the recursive runtime call stack frame depth. Ranges dynamically between
 *   O(log N) on tightly balanced systems up to O(N) constraints for entirely skewed structures.
 */