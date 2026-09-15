/*
Problem statement -
Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).


Example 1:
Input: root = [1,2,2,3,4,4,3]
Output: true


Example 2:
Input: root = [1,2,2,null,3,null,3]
Output: false


Constraints:
-> The number of nodes in the tree is in the range [1, 1000].
-> -100 <= Node.val <= 100


Follow up: Could you solve it both recursively and iteratively?


## Solve on leetcode -> https://leetcode.com/problems/symmetric-tree/description/

*/

/**
 * @param {TreeNode} root
 * @return {boolean}
 */


// Approach 1 - Recursion
const isSymmetric = (root) => {
    if (!root) return true;

    const isMirror = (left, right) => {

        if (!left && !right) return true;
        if (!left || !right) return false;

        return left.val === right.val &&
            isMirror(left.left, right.right) &&
            isMirror(left.right, right.left);
    }

    return isMirror(root.left, root.right);
};


class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Symmetric Tree: [1, 2, 2, 3, 4, 4, 3]
const symmetricTree = new TreeNode(1,
    new TreeNode(2, new TreeNode(3), new TreeNode(4)),
    new TreeNode(2, new TreeNode(4), new TreeNode(3))
);
console.log(isSymmetric(symmetricTree));

// Asymmetric Tree: [1, 2, 2, null, 3, null, 3]
const asymmetricTree = new TreeNode(1,
    new TreeNode(2, null, new TreeNode(3)),
    new TreeNode(2, null, new TreeNode(3))
);
console.log(isSymmetric(asymmetricTree));


// ============================================================================
// 📂 APPROACH 1: DUAL-POINTER RECURSIVE MIRROR MATCHING
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Simultaneous Twin-Pointer Tree Traversal (Divide & Conquer variant).
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Root Null Guard: Adding `if (!root) return true;` prevents the system from blowing
 *   up with an execution crash when given a null tree reference mapping.
 * - Logical Short-Circuiting: The validation `if (!left || !right)` executes cleanly only
 *   because the strict `!left && !right` check occurs right before it, separating matching
 *   null spaces from structurally lopsided ones.
 * - Mirror Structural Mapping: The critical pattern to remember is that the left node's outer
 *   child matches the right node's outer child (`left.left` vs `right.right`), and vice-versa.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N represents the total number of nodes inside the tree ecosystem. In worst-case
 *   scenarios, every node is matched step-by-step to confirm structural symmetry.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Dependent on the max height H of the call stack. For perfectly balanced symmetric structures,
 *   this utilizes a memory boundary configuration of O(log N).
 */



// Approach 2 - Iterative
const isSymmetric1 = (root) => {
    if (!root) return true;

    let q = [root.left, root.right];
    while (q.length) {
        let p1 = q.shift();
        let p2 = q.shift();

        if (!p1 && !p2) continue;

        if (!p1 || !p2) return false;
        if (p1.val !== p2.val) return false;

        q.push(p1.left, p2.right);
        q.push(p1.right, p2.left);
    }
    return true;
};

// ============================================================================
// 📂 APPROACH 2: ITERATIVE BFS USING A PAIRWISE QUEUE
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Iterative Level-Order Breadth-First Search (BFS) using a pairwise queue strategy.
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Empty Tree Condition: Initial `if (!root) return true;` prevents runtime reference faults.
 * - Pairwise Enqueue Order: Order matters! Always push elements into the queue in matching mirror
 *   pairs (`(p1.left, p2.right)` then `(p1.right, p2.left)`) so they are dequeued together.
 * - Queue Shifting Cost: In JavaScript, `Array.prototype.shift()` has a linear time complexity $O(N)$
 *   due to element re-indexing. In a real-world high-performance setting or rigorous interview,
 *   substituting this with a custom Linked List-based Queue optimizes dequeues to $O(1)$.
 *
 * 📌 TIME COMPLEXITY: $O(N)$
 * - We visit and process every single node exactly once. Even with the array shift overhead,
 *   total operations scale linearly relative to the size of the tree.
 *
 * 📌 SPACE COMPLEXITY: $O(N)$ [Auxiliary Space]
 * - In the worst-case scenario (a perfectly balanced tree), the queue will hold up to the maximum
 *   width of the tree's lowest levels concurrently, which scales proportional to the total nodes $N$.
 */