/*
Problem statement -
Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.


Example 1:
Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]


Example 2:
Input: root = [1,2,3,4,null,null,null,5]
Output: [1,3,4,5]


Example 3:
Input: root = [1,null,3]
Output: [1,3]


Example 4:
Input: root = []
Output: []

Constraints:
-> The number of nodes in the tree is in the range [0, 100].
-> -100 <= Node.val <= 100


## Solve on leetcode -> https://leetcode.com/problems/binary-tree-right-side-view/description/

*/

/**
 * @param {TreeNode} root
 * @return {number[]}
 */

const rightSideView = (root) => {
    if (!root) return [];
    let ans = [];
    let q = [root];
    while (q.length) {
        let levelSize = q.length;
        for (let i = 0; i < levelSize; i++) {
            let curr = q.shift();
            if (i === 0) {
                ans.push(curr.val);
            }
            if (curr.right) q.push(curr.right);
            if (curr.left) q.push(curr.left);
        }
    }
    return ans;
};


// ============================================================================
// 📂 APPROACH 1: REVERSED LEVEL-ORDER TRAVERSAL (BFS) WITH SIZE SNAPSHOT
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Sized-Snapshot Level-Order BFS with Right-to-Left structural insertion.
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Queue Loading Inversion: Intentionally swapping standard order to load `curr.right` prior to
 *   `curr.left` ensures the rightmost elements bubble to the front of the line automatically.
 * - Initial Frame Target: Using `if (i === 0)` acts as an isolation filter, saving only the first
 *   element viewed on that row while letting the subsequent left-side children process normally.
 * - Sizing Snapshot Guard: Preserving `let levelSize = q.length;` frozen outside the loop frame prevents
 *   newly appended child nodes from corrupting the current iteration cycle boundaries.
 *
 * 📌 TIME COMPLEXITY: $O(N)$
 * - Where N represents the total number of nodes in the binary tree. Every node is inserted into and
 *   extracted from the tracking queue exactly once.
 *
 * 📌 SPACE COMPLEXITY: $O(W) = O(N)$ [Auxiliary Space]
 * - Dependent on the maximum horizontal width W of the tree. In a worst-case scenario (like a fully
 *   balanced tree), the lower levels hold up to $N/2$ nodes concurrently in queue storage.
 */