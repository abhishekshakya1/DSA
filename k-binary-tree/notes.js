/**
 * ============================================================================
 * 📂 FILE: notes.js
 * 📂 MASTER THEORY NOTES: BINARY TREE DATA STRUCTURE
 * ============================================================================
 *
 * This file contains the complete, absolute comprehensive blueprint for the
 * Binary Tree Data Structure, scaling from absolute fundamental concepts to
 * advanced properties, variations, representations, and traversal behaviors.
 */

/* ============================================================================
 * 1. INTRODUCTION & CORE TREE CONCEPTS
 * ============================================================================
 * What is a Tree?
 * - A Tree is a non-linear, hierarchical data structure used to represent
 *   relationships between data points (nodes) in a parent-child topology.
 * - Unlike linear structures (Arrays, Linked Lists, Stacks, Queues) where elements
 *   form a sequential sequence, trees branch out in multiple directions.
 *
 * What is a Binary Tree?
 * - A Binary Tree is a specific type of tree structure where every individual
 *   node is strictly restricted to having AT MOST two children.
 * - These children are explicitly named the "Left Child" and the "Right Child".
 *
 * Conceptual Anatomy Diagram:
 *          [ Root ]          <-- Level 0 (Topmost node, no parent)
 *          /      \
 *      [Parent]  [Right]     <-- Level 1 (Incoming link makes them children)
 *      /      \
 *   [Leaf]   [Leaf]          <-- Level 2 (External nodes, zero children)
 *
 * Structural Terminology Blueprint:
 * 1. Root Node: The absolute origin point of the entire tree. It is the only
 *    node in the structure that has no incoming edge (no parent).
 * 2. Node: The basic structural unit. It contains an active data payload
 *    and physical pointer addresses linking to its sub-components.
 * 3. Edge: The physical or logical link connecting a parent node to a child node.
 * 4. Leaf Node (External Node): Any node that has zero children. Its left and
 *    right child pointers resolve strictly to null.
 * 5. Internal Node: Any node that has at least one active child node attached.
 * 6. Sibling: Nodes that reside on the exact same depth level and share the
 *    same immediate parent node reference.
 * 7. Ancestor: All nodes that lie along the direct path from the root down to
 *    that specific node (Parents, Grandparents, etc.).
 * 8. Descendant: All nodes reachable down the branching path originating from
 *    a specific node (Children, Grandchildren, etc.).
 * 9. Subtree: A smaller independent tree structure embedded inside the parent
 *    tree, rooted at a child node.
 */

/* ============================================================================
 * 2. STRUCTURAL DIMENSIONS: HEIGHT VS. DEPTH
 * ============================================================================
 * Developers often confuse Height and Depth. Here is the definitive distinction:
 *
 * Depth of a Node:
 * - The length of the path from the absolute Root node down to that specific node.
 * - Metric: Count the number of edges between the root and the node.
 * - The Root node itself always has a Depth of 0.
 *
 * Height of a Node:
 * - The length of the path from that specific node down to the deepest possible
 *   leaf node in its subtree.
 * - A Leaf node always has a Height of 0.
 *
 * Height of a Tree:
 * - The height of the absolute Root node (i.e., the total number of edges on
 *   the longest downward path from root to a leaf).
 */

/* ============================================================================
 * 3. MATHEMATICAL & STRUCTURAL PROPERTIES
 * ============================================================================
 * These core properties act as constraints during algorithm optimization:
 *
 * 📌 Maximum Nodes at Level 'L':
 *    -> Formula: 2^L  (Assuming the absolute root node rests at Level 0).
 *    - Example: Level 0 has 2^0 = 1 node. Level 2 can house up to 2^2 = 4 nodes.
 *
 * 📌 Maximum Total Nodes in a Tree of Height 'H':
 *    -> Formula: 2^(H + 1) - 1  (Assuming a leaf node has a height of 0).
 *    - Example: A perfect tree of height 2 can contain at most 2^3 - 1 = 7 nodes.
 *
 * 📌 Minimum Height of a Tree with 'N' Nodes:
 *    -> Formula: Math.floor(Math.log2(N))
 *    - This optimal compression is achieved when the tree is perfectly balanced.
 *
 * 📌 Maximum Height of a Tree with 'N' Nodes:
 *    -> Formula: N - 1
 *    - This worst-case elongation occurs when the tree is completely skewed.
 *
 * 📌 The Leaf vs. Two-Child Node Invariant:
 *    -> Theorem: In any binary tree, if 'L' represents the count of leaf nodes,
 *       and 'I2' represents the count of internal nodes with exactly 2 children:
 *       Formula: L = I2 + 1
 */

/* ============================================================================
 * 4. STRUCTURAL VARIATIONS & CLASSIFICATIONS
 * ============================================================================
 * Binary trees adapt distinct geometric constraints in production setups:
 *
 * 1. Full Binary Tree (Strict / Proper Binary Tree):
 *    - Every single node must have either exactly 0 children or exactly 2 children.
 *    - No node in the entire layout is allowed to contain a single child.
 *
 * 2. Complete Binary Tree:
 *    - All depth levels are completely packed with nodes except possibly the
 *      absolute bottommost level.
 *    - On the final level, the nodes must be aggressively filled from left to
 *      right without leaving any structural gaps. (Used to implement *Heaps*).
 *
 * 3. Perfect Binary Tree:
 *    - A flawless geometric layout where all internal nodes have exactly
 *      two children, and all leaf nodes rest on the exact same depth horizon.
 *
 * 4. Balanced Binary Tree:
 *    - A tree layout where the absolute height difference between the left subtree
 *      and right subtree of *every single node* is at most 1.
 *    - Enforcing this constraint guarantees optimal O(log N) search operations
 *      (e.g., AVL Trees, Red-Black Trees).
 *
 * 5. Degenerate (Skewed) Binary Tree:
 *    - A worst-case layout where every internal node has exactly one child.
 *    - It effectively flattens out into a linear Linked List, dropping search
 *      performance benchmarks down to slow linear O(N) paths.
 */

/* ============================================================================
 * 5. PHYSICAL REPRESENTATION (JAVASCRIPT BLUEPRINT)
 * ============================================================================
 * In memory, nodes are created via a constructor structure caching the node
 * payload alongside two discrete address pointer maps tracking children nodes.
 */

class TreeNode {
    constructor(val) {
        this.val = val;     // The core data payload (Integer, String, etc.)
        this.left = null;   // Reference pointer link to the Left Child Node
        this.right = null;  // Reference pointer link to the Right Child Node
    }
}

// Manual verification of structural binding:
// Generates the target configuration:
//         10
//        /  \
//       5    15
const sampleRoot = new TreeNode(10);
sampleRoot.left = new TreeNode(5);
sampleRoot.right = new TreeNode(15);

/* ============================================================================
 * 6. TREE TRAVERSAL ALGORITHMS (DFS VS. BFS)
 * ============================================================================
 * Navigating through non-linear layouts requires specialized traversal walks:
 *
 * 📂 CATEGORY A: DEPTH-FIRST SEARCH (DFS) TRAVERSALS
 * - DFS dives deep down a single structural path toward a leaf before backtracking.
 * - Operates internally via a **Stack** architecture (Recursion / Call Stack).
 *
 * 1. Inorder Traversal (Left -> Root -> Right)
 *    - Path: Recursively explore Left Subtree, visit Root node, recursively explore Right Subtree.
 *    - ⭐ CRITICAL INTERVIEW FACT: Executing an Inorder Traversal on a *Binary Search Tree (BST)*
 *      is guaranteed to output the numbers in a **perfectly sorted ascending order**.
 *
 * 2. Preorder Traversal (Root -> Left -> Right)
 *    - Path: Visit Root node immediately, recursively explore Left Subtree, recursively explore Right Subtree.
 *    - Use Case: Ideal for generating a duplicated tree clone or serializing the structure for caching.
 *
 * 3. Postorder Traversal (Left -> Right -> Root)
 *    - Path: Recursively explore Left Subtree, recursively explore Right Subtree, visit Root node at the end.
 *    - Use Case: Used in bottom-up calculations (e.g., node deletion safety loops, calculating tree height/diameter).
 *
 * ----------------------------------------------------------------------------
 * 📂 CATEGORY B: BREADTH-FIRST SEARCH (BFS) TRAVERSAL
 * - BFS explores the tree horizontally, visiting all elements on the current
 *   level before stepping down.
 *
 * 1. Level-Order Traversal
 *    - Path: Scan nodes level by level, moving uniformly from left to right across the horizon.
 *    - Implementation Mechanic: Uses a **Queue** data structure to schedule child nodes for execution.
 */

/* ============================================================================
 * 7. ALGORITHMIC COMPLEXITY MATRIX
 * ============================================================================
 * | Operation / Traversal | Average Case | Worst Case (Skewed Layout)       |
 * |-----------------------|--------------|----------------------------------|
 * | Time (DFS / BFS)      | O(N)         | O(N) [Must visit all N nodes]    |
 * | Space (DFS Call Stack)| O(log N)     | O(N) [Stack depth scales to N]   |
 * | Space (BFS Queue)     | O(W)         | O(N) [W = Max Width of Tree]     |
 * ============================================================================
 */
