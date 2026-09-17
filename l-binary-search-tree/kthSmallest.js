/*
Problem statement -
Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.


Example 1:
Input: root = [3,1,4,null,2], k = 1
Output: 1


Example 2:
Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3


Constraints:
-> The number of nodes in the tree is n.
-> 1 <= k <= n <= 10^4
-> 0 <= Node.val <= 10^4


Follow up: If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?


## Solve on leetcode -> https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/

*/

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */


const kthSmallest = (root, k) => {
    if (!root) return null;

    let ans = null;
    let count = k;
    const traversal = (curr) => {
        if (!curr || ans !== null) return;

        if (curr.left && ans === null) traversal(curr.left);

        count--;
        if (count === 0) {
            ans = curr.val;
            return;
        }

        if (curr.right && ans === null) traversal(curr.right);
    }
    traversal(root);
    return ans;
};


// ============================================================================
// 📂 APPROACH 1: INORDER TRAVERSAL WITH REDUCING COUNT & EARLY PRUNING
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Sorted Inorder DFS Traversal utilizing global monotonic counting.
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The BST Inorder Invariant: Exploiting the fact that Left -> Root -> Right sweeps across a BST
 *   in strictly sorted order entirely bypasses the need to explicitly dump values into an external array.
 * - Reactive Pruning: Layering `ans === null` gate-checks inside the branching calls kills the active recursive
 *   stack overhead instantly once the \(k\)-th position has been claimed, preventing waste on unvisited branches.
 * - Sizing Boundary: Storing the `count` indicator natively via local variable scopes acts as a dynamic
 *   iteration counter that naturally scales downwards across stack depths.
 *
 * 📌 TIME COMPLEXITY: \(O(H + K)\)
 * - Where H is the tree height and K is the target rank. The traversal walks directly down to the smallest element
 *   \(O(H)\) and processes up to \(K\) steps. In well-balanced structures, this optimizes cleanly to \(O(\log N + K)\).
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Space]
 * - Dependent on the max tree depth utilized by the recursion call stack frame. Operates optimally at
 *   \(O(\log N)\) for balanced variants and drops to linear \(O(N)\) allocations on single-line skewed systems.
 */