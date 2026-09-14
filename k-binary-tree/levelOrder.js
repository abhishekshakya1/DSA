/*
Problem statement -
Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).


Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]


Example 2:
Input: root = [1]
Output: [[1]]


Example 3:
Input: root = []
Output: []


Constraints:
-> The number of nodes in the tree is in the range [0, 2000].
-> -1000 <= Node.val <= 1000


## Solve on leetcode -> https://leetcode.com/problems/binary-tree-level-order-traversal/description/

*/

const leverOrder = (root) => {
    if (!root) return [];

    let q = [root];
    let ans = [];
    while (q.length) {
        let levelArr = [];
        let levelSize = q.length;

        for (let i = 0; i < levelSize; i++) {
            let curr = q.shift();
            curr.left && q.push(curr.left);
            curr.right && q.push(curr.right);
            levelArr.push(curr.val);
        }
        ans.push(levelArr);
    }
    return ans;
};

// ============================================================================
// 📂 APPROACH 1: BREADTH-FIRST SEARCH VIA SNAPSHOT QUEUE (FIFO LAYER PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Queue-Based Level-Order Horizontal Sweep with Persistent Size Snapshotting
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Persistent Size Snapshot: A standard trap in BFS is querying `q.length` directly inside the
 *   loop terminating block `i < q.length`. Since the code constantly appends incoming child links onto the
 *   rear of the queue, the length fluctuates dynamically. Capturing `levelSize = q.length` beforehand builds
 *   a rigid processing snapshot barrier that isolates levels cleanly.
 * - Symmetrical FIFO Pipeline: Utilizing a queue structure naturally processes nodes in the exact
 *   chronological sequence of their arrival (First-In, First-Out). Pushing left ahead of right ensures
 *   the horizontal sweeps execute uniformly from left to right across the structural vista.
 * - Javascript Array Shift Warning: Invoking `q.shift()` inside a linear loop re-indexes array locations
 *   costing $O(W)$ time per step (where W is current layer width). While completely fine for interview setups,
 *   large data scale workflows can alternatively substitute pointer-indexed object queues.
 * - Native Memory Safety: Enforcing the guard condition `if (!root)` shields the internal queue allocations
 *   from evaluating undefined children if passed empty inputs.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total count of node entries inside the binary tree layout. The BFS traversal loop pushes
 *   and pulls every individual node coordinate frame exactly once from the active workspace array.
 *
 * 📌 SPACE COMPLEXITY: O(W) [Auxiliary Queue Storage Space]
 * - Where W represents the absolute maximum width (number of leaf nodes sitting on the most crowded layer)
 *   of the tree structure. In a perfect binary tree configuration, the final bottom horizon houses roughly
 *   $N/2$ elements, making the peak space memory footprint linear $O(N)$ in the worst-case setup.
 */


// Approach 2 - Recursion method
const leverOrder1 = (root) => {
    if (!root) return [];

    let ans = [];
    const traversal = (curr, level) => {
        if (!ans[level]) {
            ans[level] = [];
        }
        ans[level].push(curr.val);
        curr.left && traversal(curr.left, level + 1);
        curr.right && traversal(curr.right, level + 1);
    }
    traversal(root, 0);
    return ans;
};

// ============================================================================
// 📂 APPROACH 2: DEPTH-FIRST SEARCH WITH INDEPENDENT INDEX LEVEL SNAPSHOTTING
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Recursive DFS Depth Tracking with Dynamic 2D Array Bucket Allocation
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Counter-Intuitive DFS Level Ordering: While Level Order is inherently a Breadth-First concept,
 *   passing an explicit integer track metadata `level` lets a Depth-First Search engine map the layout
 *   perfectly. By maintaining absolute depth markers, the vertical recursion path aligns itself
 *   correctly with the final horizontal 2D matrix indexes.
 * - Dynamic Subarray Bucket Anchoring: The expression `if (!ans[level])` acts as an automated boundary fence.
 *   Because DFS always dives deep down the leftmost side first, it meets new levels sequentially. The first
 *   node to reach a new depth dynamically instances the tracking bucket `[]` for all subsequent sibling nodes.
 * - Symmetrical Left-to-Right Invocation: Because we invoke `traversal(curr.left)` strictly before `curr.right`,
 *   nodes at the exact same depth level are guaranteed to be appended into `ans[level]` in a stable, left-to-right
 *   chronological sequence, fulfilling LeetCode's structural validation constraints perfectly.
 * - Avoiding Shift Re-indexing: Unlike standard Queue-based BFS which pays a heavy $O(W)$ cost for `arr.shift()`,
 *   this approach uses flat array indexing and recursive call stacks, eliminating structural array mutation overhead.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total count of node elements inside the tree framework. The recursive function walks
 *   through every single coordinate position exactly once, executing fast $O(1)$ push and lookup operations.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Recursion Call Stack Space]
 * - Where H is the maximum height depth boundary of the active tree. The environment spins up memory layers
 *   on the runtime execution call stack to manage backtracking. On average balanced setups, this uses $O(\log N)$
 *   space, extending out to a linear space metric of $O(N)$ if processing a heavily skewed one-sided tree profile.
 */