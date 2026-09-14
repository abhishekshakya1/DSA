/*
Problem statement -
Given the root of a binary tree, return the inorder traversal of its nodes' values.


Example 1:
Input: root = [1,null,2,3]
Output: [1,3,2]


Example 2:
Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
Output: [4,2,6,5,7,1,3,9,8]


Example 3:
Input: root = []
Output: []


Example 4:
Input: root = [1]
Output: [1]


Constraints:
-> The number of nodes in the tree is in the range [0, 100].
-> -100 <= Node.val <= 100

Follow up: Recursive solution is trivial, could you do it iteratively?


## Solve on leetcode -> https://leetcode.com/problems/binary-tree-inorder-traversal/description/

*/

/**
 * @param {TreeNode} root
 * @return {number[]}
 */

const inorderTraversal = (root) => {
    let ans = [];

    function traversal(curr) {
        if (!curr) return;
        traversal(curr.left);
        ans.push(curr.val);
        traversal(curr.right);
    }
    traversal(root);
    return ans;
};


// ============================================================================
// 📂 APPROACH 1: RECURSIVE DEPTH-FIRST SEARCH (LEFT-ROOT-RIGHT PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Recursive DFS Inorder Traversal (Left -> Root -> Right Sequential Processing)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Inorder Sorting Invariant: The absolute processing execution sequence strictly honors the
 *   **Left subtree dive first, then Root node evaluation, followed by the Right subtree dive**.
 *   If this exact pattern is executed over a Binary Search Tree (BST), the resulting output array
 *   is mathematically guaranteed to emerge in a **strictly sorted ascending order**.
 * - Functional Scope Closure Strategy: Declaring the helper function `traversal()` nested directly
 *   inside the main block creates an elegant scope closure wrapper. This lets the recursive routines
 *   directly push mutations into the `ans` array without passing extra storage reference variables.
 * - Non-Destructive Base-Case Checking: Utilizing `if (!curr) return;` safely stops execution
 *   traversal branches as soon as a leaf node's child pointer hits a terminal null threshold, popping
 *   the immediate layout frame off the javascript call stack seamlessly.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total number of node entities inside the binary tree layout. The recursive DFS
 *   runner steps through and evaluates every individual node coordinate exactly once.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Call Stack Space]
 * - Where H is the max height depth of the active tree structure. The environment spins up frame stacks
 *   dynamically to manage backtracking. On average balanced trees, memory costs settle at $O(\log N)$,
 *   expanding out to a worst-case linear space requirement of $O(N)$ if processing a completely skewed tree.
 */



// Approach 2
const inorderTraversal1 = (root) => {
    let ans = [];
    let stack = [];
    let curr = root;
    while (curr || stack.length) {
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        ans.push(curr.val);
        curr = curr.right;
    }
    return ans;
};


// ============================================================================
// 📂 APPROACH 2: ITERATIVE DFS VIA EXPLICIT STACK (NESTED LEFT-DIVE PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Iterative DFS Inorder Traversal via Explicit Stack Pointer Simulation
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Emulating Subtree Postponement: Inorder requires visiting the left branch fully before reading the parent.
 *   To achieve this iteratively without the help of a hidden recursive engine call stack, we use an explicit
 *   array stack buffer to cache nodes, effectively delaying their processing while we hunt down the left lineage.
 * - The Monotonic Left-Dive Rule: The internal `while (curr)` loop acts as a structural anchor. It continuously
 *   shunts nodes onto the stack and moves the cursor leftward. This loop breaks only when the cursor drops off a
 *   leaf boundary into null space.
 * - Symmetrical Backtracking & Pivoting: The step `curr = stack.pop()` retrieves the absolute deepest left node
 *   available at that moment. After registering its value payload, assigning `curr = curr.right` resets the cursor
 *   to start the exact same nested left-dive process over the adjacent right subtree ecosystem.
 * - Native Empty-Tree Protection: If a completely blank tree (`root = null`) is evaluated, the master `while`
 *   condition `while (null || 0)` immediately fails on the very first cycle, returning an empty array cleanly
 *   without executing any faulty internal child lookups.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total number of node entities inside the binary tree layout. Even though nested loops exist,
 *   every individual node is pushed onto the stack exactly once and popped exactly once, ensuring true amortized linear performance.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Runtime Stack Space]
 * - Where H is the maximum height depth boundary of the active tree structure. The local memory tracking stack
 *   scales to store the deep structural layers of the longest path segment. In perfectly balanced scenarios,
 *   this requires an optimized space of O(log N), widening up to O(N) if handling a completely skewed single-line tree profile.
 */