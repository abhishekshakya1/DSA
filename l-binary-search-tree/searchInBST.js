/*
Problem statement -
You are given the root of a binary search tree (BST) and an integer val.

Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.


Example 1:
Input: root = [4,2,7,1,3], val = 2
Output: [2,1,3]


Example 2:
Input: root = [4,2,7,1,3], val = 5
Output: []


Constraints:
-> The number of nodes in the tree is in the range [1, 5000].
-> 1 <= Node.val <= 10^7
-> root is a binary search tree.
-> 1 <= val <= 10^7


## Solve on leetcode -> https://leetcode.com/problems/search-in-a-binary-search-tree/description/

*/

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */

// Approach 1 ->  Top - down
const searchBST = function (root, val) {
    if (!root) return null;

    let ans = null;
    let traversal = (curr) => {
        if (curr.val == val) {
            ans = curr;
            return;
        } else {
            if (curr.val < val) {
                curr.right && traversal(curr.right);
            } else {
                curr.left && traversal(curr.left);
            }
        }
    }
    traversal(root);
    return ans;
};


// ============================================================================
// 📂 APPROACH 1: TOP-DOWN DFS WITH STATE CAPTURE & ROOT SAFEGUARD
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Top-Down Pre-Order DFS with External State Mutation and Directional Filtering.
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Root Exception Handling: Initializing `if (!root) return null;` guarantees that empty tree
 *   inputs converge smoothly without throwing execution reference exceptions inside the recursive scope.
 * - Directional Pruning Logic: By nesting the recursive paths inside `if (curr.val < val)`, the algorithm
 *   successfully drops half of the sub-branches at every level, respecting the structural BST property.
 * - External Closure Capture: Modifying the outer variable `ans = curr` directly inside the closure
 *   allows the reference state to persist safely even after individual stack frames pop off.
 *
 * 📌 TIME COMPLEXITY: O(H)
 * - Where H represents the total height of the Binary Search Tree. On average, balanced configurations
 *   scale at logarithmic limits \(O(\log N)\), while entirely skewed patterns degrade to linear O(N) levels.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Relies on the recursive execution depth of the runtime stack frame. Operates efficiently at
 *   \(O(\log N)\) on symmetrical structures and steps up to linear O(N) allocations on skewed paths.
 */




// Approach 2 -> Bottom - Up
const searchBST1 = (root, val) => {
    if (!root || root.val === val) return root;

    if (val < root.val) {
        return searchBST1(root.left, val);
    }

    return searchBST1(root.right, val);
};


// ============================================================================
// 📂 APPROACH 2: PURE RECURSIVE BST DIRECTIONAL PRUNING
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Logarithmic Directional Tree Splitting (Divide and Conquer Framework).
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Null Reference Safeguard: Always ensure `if (!root)` is checked at the entry point of
 *   tree traversals to gracefully handle missing nodes or empty input collections without crashing.
 * - Pure Return Bubbling: Returning the recursive call directly (`return searchBST(...)`) allows the
 *   discovered node reference to bubble straight up the stack frame, eliminating the need for
 *   external helper state allocations.
 * - Logarithmic Execution: Because the BST sorting constraint guarantees that your target can only exist
 *   on one specific side of a node, you completely bypass the need to run sibling searches on the opposite arm.
 *
 * 📌 TIME COMPLEXITY: O(H)
 * - Where H represents the height of the Binary Search Tree. On a well-balanced tree infrastructure, this
 *   resolves at an optimal average-case boundary of \(O(\log N)\). If the tree is highly skewed, it behaves at O(N).
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Dependent on the max tree depth utilized by the recursion call stack frame. Operates optimally at
 *   \(O(\log N)\) for balanced variants and drops to linear O(N) targets on single-line skewed pathways.
 */