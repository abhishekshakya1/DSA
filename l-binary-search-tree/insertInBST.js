/*
Problem statement -
You are given the root node of a binary search tree (BST) and a value to insert into the tree. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.

Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.


Example 1:
Input: root = [4,2,7,1,3], val = 5
Output: [4,2,7,1,3,5]


Example 2:
Input: root = [40,20,60,10,30,50,70], val = 25
Output: [40,20,60,10,30,50,70,null,null,25]


Example 3:
Input: root = [4,2,7,1,3,null,null,null,null,null,null], val = 5
Output: [4,2,7,1,3,5]


Constraints:
-> The number of nodes in the tree will be in the range [0, 10^4].
-> -10^8 <= Node.val <= 10^8
-> All the values Node.val are unique.
-> -10^8 <= val <= 10^8
-> It's guaranteed that val does not exist in the original BST.


## Solve on leetcode -> https://leetcode.com/problems/insert-into-a-binary-search-tree/description/

*/

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */


const insertIntoBST = (root, val) => {
    if (!root) return new TreeNode(val);
    if (root.val < val) {
        root.right = insertIntoBST(root.right, val);
    } else {
        root.left = insertIntoBST(root.left, val);
    }
    return root;
};


// ============================================================================
// 📂 APPROACH 1: RECURSIVE POINTER RE-STITCHING W/ DIRECTIONAL PRUNING
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Directional Target Routing with Recursive Pointer Assignment.
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Self-Healing Structure: Assigning the return value of the recursive calls directly back to
 *   the child fields (`root.left = ...`) naturally wires up the new node without needing to manually
 *   track parent pointers.
 * - Empty Tree Handling: The base case handles empty tree inputs (`root === null`) perfectly, returning
 *   the freshly created node as the absolute root of the new structure.
 * - Logarithmic Efficiency: Because we completely skip traversing opposite branches, execution scales
 *   directly with the vertical levels rather than the absolute node count.
 *
 * 📌 TIME COMPLEXITY: O(H)
 * - Where H represents the height of the Binary Search Tree. On average, this resolves at an optimal
 *   logarithmic scale of \(O(\log N)\) on well-balanced structures. If the tree is completely skewed,
 *   it scales linearly up to O(N) operations.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Allocation tracks the recursive call stack depth. Resolves optimally at \(O(\log N)\) for balanced trees
 *   and extends out to O(N) memory frames under purely skewed single-line distributions.
 */