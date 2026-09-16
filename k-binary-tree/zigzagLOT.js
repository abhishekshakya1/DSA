/*
Problem statement -
Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).


Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[20,9],[15,7]]


Example 2:
Input: root = [1]
Output: [[1]]


Example 3:
Input: root = []
Output: []


Constraints:
-> The number of nodes in the tree is in the range [0, 2000].
-> -100 <= Node.val <= 100


## Solve on leetcode -> https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/

*/

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

const zigzagLevelOrder = (root) => {
    if (!root) return [];

    let ans = [];
    let q = [root];
    let isLeftToRight = true;

    while (q.length) {

        let levelSize = q.length;
        let levelArr = new Array(levelSize);

        for (let i = 0; i < levelSize; i++) {
            let curr = q.shift();

            let targetIndex = isLeftToRight ? i : (levelSize - 1 - i);
            levelArr[targetIndex] = curr.val;

            if (curr.left) q.push(curr.left);
            if (curr.right) q.push(curr.right);
        }
        ans.push(levelArr);
        isLeftToRight = !isLeftToRight;
    }
    return ans;
};

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Tree structure: [3, 9, 20, null, null, 15, 7]
const testTree = new TreeNode(3,
    new TreeNode(9),
    new TreeNode(20, new TreeNode(15), new TreeNode(7))
);
console.log(zigzagLevelOrder(testTree));


// ============================================================================
// 📂 APPROACH 1: ITERATIVE LEVEL-ORDER (BFS) WITH INDEX-BASED INVERSION
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Level-Order Breadth-First Search (BFS) using a sizing snapshot pattern.
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Avoiding Array Unshift Overhead: Using `.unshift()` inside loops slows down processing to $O(N)$
 *   per element due to memory shifting. Pre-allocating `new Array(levelSize)` and assigning values directly
 *   via targeted indices updates array nodes at a strict, optimal $O(1)$ performance cost.
 * - Sizing Snapshot Safeguard: Storing `let levelSize = q.length;` prior to the internal loop bounds preserves
 *   a strict separation boundary between the current row's children and newly discovered downstream nodes.
 * - Boolean Toggle Flags: Replacing an integer-based scale (`level++`) with a basic boolean flag (`!isLeftToRight`)
 *   simplifies evaluation code cleanly.
 *
 * 📌 TIME COMPLEXITY: $O(N)$
 * - Where N represents the total count of elements inside the tree structure. Every node is safely extracted
 *   from the queue frame exactly once, with value indexing working at absolute constant time boundaries.
 *
 * 📌 SPACE COMPLEXITY: $O(N)$ [Auxiliary Space]
 * - Dependent on the maximum horizontal width of the tree structure. The sliding queue container holds
 *   up to the full capacity of the deepest row levels concurrently, scaling proportional to $N$.
 */
