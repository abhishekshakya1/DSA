/**
 * ============================================================================
 * 📂 MASTER DEEP-DIVE: DFS & BFS IN BINARY TREE
 * ============================================================================
 *
 * This section contains the complete theoretical notes, core mechanics,
 * architectural trade-offs, and clean implementations for both Depth-First Search
 * (DFS) and Breadth-First Search (BFS) in JavaScript.
 */

/* ============================================================================
 * 1. DEPTH-FIRST SEARCH (DFS) - VERTICAL PHILOSOPHY
 * ============================================================================
 * Core Concept:
 * - DFS is a tree traversal philosophy where you explore a branch as deep as
 *   possible downwards along a vertical path before backtracking.
 *
 * The Underlying Engine: Stack Architecture
 * - DFS inherently relies on a Stack structure (Last-In, First-Out).
 * - When implemented recursively, it uses the implicit System Call Stack.
 * - When implemented iteratively, a user-defined memory array stack is allocated.
 *
 * Time Complexities:
 * - Average / Worst Case: O(N) -> Must evaluate all N node elements exactly once.
 *
 * Space Complexities:
 * - Average Balanced Tree: O(log N) -> Call stack depth maps to tree height.
 * - Worst Case Skewed Tree: O(N) -> Linear call stack matching a flattened list.
 */

// --- CODE BLUEPRINT: DFS RAMP LAB (PRE/IN/POST VARIATIONS) ---
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// 📂 VARIATION A: Preorder Traversal (Root -> Left -> Right)
// Processing order: Logs the current node value BEFORE descending into children.
const preorderDFS = (root) => {
    let result = [];
    const traverse = (node) => {
        if (!node) return; // Standard Base Case
        result.push(node.val); // 1. Visit Root
        traverse(node.left);   // 2. Traverse Left
        traverse(node.right);  // 3. Traverse Right
    };
    traverse(root);
    return result;
};

// 📂 VARIATION B: Inorder Traversal (Left -> Root -> Right)
// ⭐ CORE INVARIANT: Executing this on a Binary Search Tree (BST) outputs
// elements in a perfectly sorted ascending order.
const inorderDFS = (root) => {
    let result = [];
    const traverse = (node) => {
        if (!node) return;
        traverse(node.left);   // 1. Traverse Left
        result.push(node.val); // 2. Visit Root
        traverse(node.right);  // 3. Traverse Right
    };
    traverse(root);
    return result;
};

// 📂 VARIATION C: Postorder Traversal (Left -> Right -> Root)
// Processing order: Evaluates children first, processing the root at the end.
// Use Case: Best for bottom-up questions like tree height or node deletion.
const postorderDFS = (root) => {
    let result = [];
    const traverse = (node) => {
        if (!node) return;
        traverse(node.left);   // 1. Traverse Left
        traverse(node.right);  // 2. Traverse Right
        result.push(node.val); // 3. Visit Root
    };
    traverse(root);
    return result;
};


/* ============================================================================
 * 2. BREADTH-FIRST SEARCH (BFS) - HORIZONTAL PHILOSOPHY
 * ============================================================================
 * Core Concept:
 * - BFS (commonly called Level-Order Traversal) explores the tree horizontally
 *   level by level, scanning all nodes across a single depth layer before stepping down.
 *
 * The Underlying Engine: Queue Architecture
 * - BFS inherently relies on a Queue data structure (First-In, First-Out).
 * - Elements are processed in chronological order of discovery. When a node is
 *   shifted from the front, its children are pushed to the rear to schedule them next.
 *
 * The Snapshot Pattern Constraint:
 * - To group nodes into clear distinct sub-arrays per level (e.g., [[3], [9, 20]]),
 *   we must lock down the queue length snapshot `levelSize = q.length` before the loop.
 *   This prevents newly added children from polluting the current layer processing sweep.
 *
 * Time Complexities:
 * - O(N) -> Evaluates all N node elements systematically layer by layer.
 *
 * Space Complexities:
 * - Average Case: O(W) -> Where W represents the peak maximum width of the tree.
 * - Worst Case Perfect Tree: O(N) -> The final bottom layer houses roughly N/2 nodes.
 */

// --- CODE BLUEPRINT: BFS LAYER LAB (LEVEL-ORDER) ---
const levelOrderBFS = (root) => {
    if (!root) return []; // Edge case guard clause

    let q = [root];
    let ans = [];

    while (q.length) {
        let levelArr = [];
        let levelSize = q.length; // Locking the count snapshot for the active horizon layer

        for (let i = 0; i < levelSize; i++) {
            let curr = q.shift(); // Evict front element from FIFO pipeline

            // Collect child elements to build up the upcoming depth level layer
            curr.left && q.push(curr.left);
            curr.right && q.push(curr.right);

            levelArr.push(curr.val);
        }
        ans.push(levelArr); // Log the captured level array layer matrix
    }
    return ans;
};


/* ============================================================================
 * 3. SUMMARY MATRIX (DFS VS. BFS COMPARISON)
 * ============================================================================
 * | Metric                 | Depth-First Search (DFS)        | Breadth-First Search (BFS)      |
 * |------------------------|---------------------------------|---------------------------------|
 * | Traversal Path Direction| Vertical (Downwards first)      | Horizontal (Layer by layer)     |
 * | Core Data Structure    | Stack (LIFO Architecture)       | Queue (FIFO Architecture)       |
 * | Average Space Overhead | O(H) [H = Height of the tree]   | O(W) [W = Peak Width of tree]   |
 * | Worst-Case Topology    | Skewed single-line tree         | Perfect fully packed tree       |
 * | Standard Problem Match | Backtracking, Path Validations  | Shortest Path, Level Tracking   |
 * ============================================================================
 */
