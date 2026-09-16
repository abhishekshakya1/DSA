/*
Problem statement -
You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}

Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.


Example 1:
Input: root = [1,2,3,4,5,6,7]
Output: [1,#,2,3,#,4,5,6,7,#]
Explanation: Given the above perfect binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.


Example 2:
Input: root = []
Output: []


Constraints:
-> The number of nodes in the tree is in the range [0, 2^12 - 1].
-> -1000 <= Node.val <= 1000


Follow-up:
-> You may only use constant extra space.
-> The recursive approach is fine. You may assume implicit stack space does not count as extra space for this problem.


## Solve on leetcode -> https://leetcode.com/problems/populating-next-right-pointers-in-each-node/description/

*/

/**
 * @param {_Node} root
 * @return {_Node}
 */


const connect = (root) => {
    if (!root) return root;
    const traversal = (curr) => {
        if (curr.left) {
            curr.left.next = curr.right;
        }

        if (curr.right && curr.next) {
            curr.right.next = curr.next.left;
        }

        curr.left && traversal(curr.left);
        curr.right && traversal(curr.right);
    }
    traversal(root);
    return root;
};


// Helper Node constructor containing the next pointer field
class Node {
    constructor(val, left = null, right = null, next = null) {
        this.val = val;
        this.left = left;
        this.right = right;
        this.next = next;
    }
}

// Perfect Tree Setup: [1, 2, 3, 4, 5, 6, 7]
const testTree = new Node(1,
    new Node(2, new Node(4), new Node(5)),
    new Node(3, new Node(6), new Node(7))
);

connect(testTree);
console.log("Node 4 next pointer points to Node 5 value:", testTree.left.left.next.val); // Output: 5
console.log("Node 5 next pointer points to Node 6 value:", testTree.left.right.next.val); // Output: 6


// ============================================================================
// 📂 APPROACH 1: PRE-ORDER LOOKAHEAD TRAVERSAL USING ESTABLISHED POINTERS
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Pre-Order DFS with parent-driven neighbor lookahead links.
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Cross-Subtree Bridging: The key strategy `curr.right.next = curr.next.left` resolves the cross-parent gap
 *   by relying on the fact that the parent's `next` pointer has already been linked in the level above.
 * - Perfect Tree Guarantee: This algorithm relies entirely on the structural definition of a perfect
 *   binary tree. Attempting this on irregular or skewed trees will result in missing reference errors.
 * - Spatial Invariant: Performing the structural assignment top-down (Pre-Order) ensures that when the stack
 *   descends to lower rows, all required upper links are already solidly linked in place.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N represents the total number of nodes inside the tree structure. The algorithm visits
 *   and processes every single node exactly once to stitch links.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Utilized entirely by the recursive call stack frame depth. For a completely balanced perfect binary
 *   tree structure, this tracks at a highly optimized logarithmic memory cost of O(log N).
 */