// ============================================================================
// 📂 FOUNDATION STUDY NOTES: BINARY SEARCH TREES (BST) INVARIANTS & OPERATIONS
// ============================================================================

/**
 * 📘 WHAT IS A BINARY SEARCH TREE (BST)?
 * - A Binary Search Tree is a node-based binary tree data structure which has
 *   a strict sorting invariant enforced at every single structural level.
 * - Its primary design goal is to allow dynamic, fast search, insertion, and
 *   deletion operations—similar to binary search on an array but without continuous array re-indexing.
 *
 * 🚨 THE ABSOLUTE BST PROPERTY (CRITICAL INVARIANT):
 * For every node 'curr' in the tree ecosystem:
 * 1. Left Subtree Rule:  All values in the left branch must be strictly LESS than curr.val (left.val < curr.val).
 * 2. Right Subtree Rule: All values in the right branch must be strictly GREATER than curr.val (right.val > curr.val).
 * 3. Subtree Consistency: Both the left and right children must also independently be valid BSTs.
 *
 *              8 (Root)
 *            /   \
 *  (Less)   4     10  (Greater)
 *          / \      \
 *         2   6      12
 *
 * 🎯 GOLDEN THEOREM TO REMEMBER:
 * - The INORDER TRAVERSAL (Left -> Root -> Right) of any valid Binary Search Tree
 *   will ALWAYS yield a collection of values sorted in strictly ASCENDING order.
 * - If an interview question asks to check if a tree is a valid BST, or to find elements
 *   in a sorted manner, always think of Inorder Traversal first!
 */

// ============================================================================
// 📊 COMPLEXITY MATRIX
// ============================================================================
/**
 * | Operation  | ⚖️ Balanced Tree (Average) | 🚨 Skewed Tree (Worst Case) |
 * | :---       | :---                       | :---                       |
 * | Search     | O(log N)                   | O(N)                       |
 * | Insertion  | O(log N)                   | O(N)                       |
 * | Deletion   | O(log N)                   | O(N)                       |
 * | Space      | O(N)                       | O(N)                       |
 *
 * ⚠️ THE SKEWED TREE PITFALL:
 * - If inputs are inserted in sorted order (e.g., 1, 2, 3, 4, 5), the tree degrades
 *   into a straight linear line (Skewed / Degenerate Tree).
 * - In this state, its height H becomes equal to N, collapsing its efficient O(log N)
 *   performance back to a slow linear O(N) search. Self-balancing variants like AVL Trees
 *   and Red-Black Trees solve this issue.
 */

// ============================================================================
// ⚙️ STANDARD BST STRUCTURAL CODE MODEL
// ============================================================================

class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// ============================================================================
// 🚀 CORE OPERATIONS FRAMEWORK
// ============================================================================

/**
 * 🔎 1. SEARCH OPERATION:
 * - Compares the target value to the current node.
 * - If the target is smaller, go left. If it is larger, go right.
 */
const searchBST = (root, target) => {
    if (!root || root.val === target) return root;

    // Prune paths by choosing only one directional subtree branch
    if (target < root.val) {
        return searchBST(root.left, target);
    }
    return searchBST(root.right, target);
};


/**
 * ➕ 2. INSERTION OPERATION:
 * - Follows the exact same directional logic as searching.
 * - Travels down until a null space is found, then hooks the new node right there.
 */
const insertIntoBST = (root, val) => {
    if (!root) return new TreeNode(val);

    if (val < root.val) {
        root.left = insertIntoBST(root.left, val);
    } else {
        root.right = insertIntoBST(root.right, val);
    }
    return root;
};


/**
 * ❌ 3. DELETION OPERATION (THE THREE CONDITIONS):
 * - Case 1: Node is a Leaf (No Children) -> Safely return null to disconnect it.
 * - Case 2: Node has One Child -> Bypass the node and link its child directly to the parent.
 * - Case 3: Node has Two Children -> Find the Inorder Successor (smallest node in the right subtree),
 *           copy its value over to the current node, then delete that successor node.
 */
const deleteNode = (root, key) => {
    if (!root) return null;

    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        // Node found! Executing deletion logic:

        // Case 1 & 2: Zero or One Child
        if (!root.left) return root.right;
        if (!root.right) return root.left;

        // Case 3: Two Children
        let minNode = findMin(root.right); // Find Inorder Successor
        root.val = minNode.val;            // Replace value
        root.right = deleteNode(root.right, minNode.val); // Delete the redundant successor
    }
    return root;
};

const findMin = (node) => {
    while (node.left) {
        node = node.left; // The leftmost node is always the smallest in a BST branch
    }
    return node;
};
