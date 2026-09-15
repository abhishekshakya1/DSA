/*
Problem statement -
Given the root of a binary tree, invert the tree, and return its root.


Example 1:
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]


Example 2:
Input: root = [2,1,3]
Output: [2,3,1]


Example 3:
Input: root = []
Output: []


Constraints:
-> The number of nodes in the tree is in the range [0, 100].
-> -100 <= Node.val <= 100


## Solve on leetcode -> https://leetcode.com/problems/invert-binary-tree/description/

*/

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

const invertTree = (root) => {
    if (!root) return root;

    let temp = root.left;
    root.left = root.right;
    root.right = temp;

    invertTree(root.left);
    invertTree(root.right);

    return root;
};

// ============================================================================
// 📂 APPROACH 1: PRE-ORDER RECURSIVE SUBTREE SWAPPING
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Pre-Order Tree Traversal (Root-Left-Right structural mutation).
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Pointer Swap Isolation: The swap requires a temporary variable `temp` to securely
 *   cache the reference of one child branch before overwriting it with the opposite pointer.
 * - Base Case Consistency: Returning `root` directly when `!root` is triggered satisfies both
 *   empty input boundaries and structural edge leaf node termination paths.
 * - Order Flexibility: Performing the pointer swap *before* traversing down vs *after* returning
 *   up (Post-Order) both yield the exact same inverted tree results safely.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N represents the total count of elements inside the tree structure. The engine must
 *   touch and mutate the pointers of every individual node exactly once.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Relies on the recursive runtime call stack frame depth. Ranges dynamically between
 *   O(log N) on tightly balanced systems up to O(N) constraints for entirely skewed structures.
 */