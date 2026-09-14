/*
Problem statement -
Given the root of a binary tree, return the postorder traversal of its nodes' values.


Example 1:
Input: root = [1,null,2,3]
Output: [3,2,1]


Example 2:
Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
Output: [4,6,7,5,2,9,8,3,1]


Example 3:
Input: root = []
Output: []


Example 4:
Input: root = [1]
Output: [1]



Constraints:
-> The number of the nodes in the tree is in the range [0, 100].
-> -100 <= Node.val <= 100

Follow up: Recursive solution is trivial, could you do it iteratively?


## Solve on leetcode -> https://leetcode.com/problems/binary-tree-postorder-traversal/description/

*/

const postorderTraversal = (root) => {
    let ans = [];

    function traversal(curr) {
        if (!curr) return;
        traversal(curr.left);
        traversal(curr.right);
        ans.push(curr.val);
    }
    traversal(root);
    return ans;
};

// ============================================================================
// 📂 APPROACH 1: RECURSIVE DEPTH-FIRST SEARCH (LEFT-RIGHT-ROOT PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Recursive DFS Postorder Traversal (Left -> Right -> Root Sequential Processing)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Bottom-Up Processing Invariant: The absolute processing execution sequence strictly honors
 *   the **Left subtree dive first, followed by the Right subtree dive, and finally the Root node evaluation**.
 *   This ensures that no parent node is processed until all of its sub-tree descendants have been fully evaluated.
 * - Key Algorithmic Utility: Because of its bottom-up nature, Postorder is the gold standard for tree
 *   destruction/deletion operations (safely deleting children before losing the parent pointer), as well
 *   as problem variants that pass sub-tree calculations upward (e.g., Tree Height, Diameter, and Balanced Tree checks).
 * - Elegant Scope Closure Strategy: Declaring the helper function `traversal()` nested directly inside the main
 *   block creates a clean scope closure wrapper. This lets the recursive routines directly push mutations
 *   into the `ans` array without passing extra storage reference variables or managing messy function returns.
 * - Non-Destructive Base-Case Checking: Utilizing `if (!curr) return;` safely terminates traversal branches
 *   as soon as a leaf node's child pointer hits a terminal null threshold, popping the immediate frame off the
 *   javascript call stack cleanly.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total number of node entities inside the binary tree layout. The recursive DFS runner
 *   steps through and evaluates every individual node coordinate exactly once.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Call Stack Space]
 * - Where H is the max height depth of the active tree structure. The environment spins up frame stacks
 *   dynamically to manage backtracking. On average balanced trees, memory costs settle at O(log N),
 *   expanding out to a worst-case linear space requirement of O(N) if processing a completely skewed tree.
 */




// Approach 2 - Using two stack
const postorderTraversal1 = (root) => {
    if (!root) return [];
    let s1 = [root];
    let s2 = [];

    while (s1.length) {
        let curr = s1.pop();
        s2.push(curr);
        curr.left && s1.push(curr.left);
        curr.right && s1.push(curr.right);
    }

    let ans = [];
    while (s2.length) {
        ans.push(s2.pop().val);
    }
    return ans;
};


// ============================================================================
// 📂 APPROACH 2: ITERATIVE DFS VIA DUAL STACKS (REVERSE EXPANSION PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Iterative DFS Postorder Traversal via Two-Stack Sequence Inversion
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Reverse Geometry Rule: Postorder traversal maps to `Left -> Right -> Root`. If we invert this sequence
 *   completely, it transforms into `Root -> Right -> Left`. Exploiting this layout property allows us to run a
 *   modified iterative Preorder traversal to safely pre-stage the tree layout.
 * - S2 As An Inversion Chamber: The working container stack `s1` handles active branch exploration. Instead of
 *   writing values directly to the result array, pushing the raw node objects into the second stack `s2` acts
 *   as a chronological memory buffer that effectively reverses the entire sequence upon final eviction.
 * - Symmetric Child Placement Inversion: Because `s1` operates under strict LIFO dynamics, pushing `curr.left`
 *   prior to `curr.right` ensures the right branch anchors itself directly at the top address, processing the
 *   right lineage ahead of the left side.
 * - Flat Array Eviction Phase: The final `while (s2.length)` operation drains the inversion container. Popping
 *   from `s2` organically delivers the nodes in flawless, clean bottom-up Postorder fashion without expensive
 *   array unshift mutations ($O(N^2)$).
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total count of node elements mapped within the binary tree. The traversal processes the nodes
 *   sequentially across two separate linear phases ($O(N) + O(N)$), which simplifies directly into flat linear execution time.
 *
 * 📌 SPACE COMPLEXITY: O(N) [Auxiliary Runtime Heap Space]
 * - Unlike Preorder/Inorder which require space bounded strictly by tree height $O(H)$, this Two-Stack implementation
 *   allocates memory inside `s2` to house references for all N node elements concurrently during runtime.
 */




// Approach 3 - Using single stack
const postorderTraversal2 = (root) => {
    let stack = [];
    let curr = root;
    let ans = [];
    let lastVisited = null;
    while (curr || stack.length) {
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }
        let peek = stack[stack.length - 1];
        if (peek.right && peek.right !== lastVisited) {
            curr = peek.right;
        } else {
            ans.push(peek.val);
            lastVisited = stack.pop();
        }
    }
    return ans;
};
