/*
Problem statement -
Given the root of a binary tree, return the preorder traversal of its nodes' values.


Example 1:
Input: root = [1,null,2,3]
Output: [1,2,3]


Example 2:
Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]
Output: [1,2,4,5,6,7,3,8,9]


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


## Solve on leetcode -> https://leetcode.com/problems/binary-tree-preorder-traversal/description/

*/

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right
    }
};

const preorderTraversal = function (root) {
    let ans = [];

    function traversal(curr) {
        if (!curr) return;
        ans.push(curr.val);
        traversal(curr.left);
        traversal(curr.right);
    }
    traversal(root);
    return ans;

};

// const tree = new TreeNode(
//     1,
//     null,
//     new TreeNode(2, new TreeNode(3))
// );

const tree = new TreeNode(
    1,
    // Left Subtree rooted at 2
    new TreeNode(
        2,
        new TreeNode(4),
        new TreeNode(5, new TreeNode(6), new TreeNode(7))
    ),
    // Right Subtree rooted at 3 (Note: Left child is null, Right is 8)
    new TreeNode(
        3,
        null,
        new TreeNode(8, new TreeNode(9))
    )
);


// console.log("--- Printing the Bigger Tree Structure ---");
// console.log(JSON.stringify(tree, null, 2));

let result = preorderTraversal(tree);
console.log(result);


// ============================================================================
// 📂 APPROACH 1: COMPACT BOTTOM-UP TREE AGGREGATION (MANUAL PARSING)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Nested Object Instance Allocation / Bottom-Up Subtree Aggregation
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - LeetCode Array to Tree Rules: LeetCode encodes trees using Breadth-First Level Scanning.
 *   When parsing it into code manually, you must find the exact parent of each deep node:
 *     - The node `4` is a direct left leaf of `2`.
 *     - The node `5` has two child leaves: `6` (left) and `7` (right).
 *     - The node `3` has a **null** left child slot, meaning the sub-segment `8` is its strict right child.
 *     - The node `8` has a left child `9` and its right slot defaults to null automatically.
 * - Skip Empty Parameter Placements: For any deep leaf nodes (such as `4`, `6`, `7`, `9`), we completely
 *   drop trailing `null` definitions, allowing the constructor's default settings (`left = null, right = null`)
 *   to safely set up the final object frames.
 * - Enforcing Gated Nulls: Just like our previous Ordering Rule discussions, explicitly specifying `null`
 *   for the left child of `3` is mandatory to safely skip that parameter index position and link `8` to the
 *   right side.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total number of nodes populated into the framework. Initializing each unique node
 *   entity takes flat constant O(1) memory pointer mutations.
 *
 * 📌 SPACE COMPLEXITY: O(N) [Heap Allocation Space]
 * - The runtime framework dynamically registers and hooks up physical memory blocks inside the execution heap
 *   to track all N independent node models.
 */



// Approach 2
const preorderTraversal1 = (root) => {
    if (!root) return [];

    let ans = [];
    let stack = [root];
    while (stack.length) {
        let curr = stack.pop();
        ans.push(curr.val);
        curr.right && stack.push(curr.right);
        curr.left && stack.push(curr.left);
    }
    return ans;
};


// ============================================================================
// 📂 APPROACH 2: ITERATIVE DEPTH-FIRST SEARCH VIA EXPLICIT STACK (LIFO PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Iterative DFS Level Traversal via User-Allocated Memory Stack Container
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Emulating the System Call Stack: When executing recursion, the system engine implicitly spins up
 *   hidden allocation layers on its internal runtime call stack. This iterative method replaces that
 *   implicit management completely by creating a local, explicit array container `stack = [root]`.
 * - The LIFO Order Inversion Mechanic: Preorder requires navigating `Left -> Right`. To mimic this exactly
 *   inside a Last-In, First-Out (LIFO) stack pipeline, the structural extraction sequence must be inverted
 *   during the push phase. Appending `curr.right` onto the stack frame array ahead of `curr.left` locks the
 *   left index securely at the top address for the subsequent iteration step.
 * - Logical Inline Shortcut Evaluators: Utilizing the short-circuit expression `curr.right && stack.push(...)`
 *   serves as an elegant, highly compressed structural alternative to traditional nested `if` statement
 *   blocks, checking for non-null existence before pushing memory allocations.
 * - Early Exit Protection Guard: Running `if (!root) return [];` right at the initialization step completely
 *   shields the primary execution loop from trying to extract elements out of unallocated or blank tree roots.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total count of node entries within the tree structure. The processing loop expands
 *   and contracts exactly once per node, touching every coordinate cell in flat linear cycles.
 *
 * 📌 SPACE COMPLEXITY: O(H) [Auxiliary Runtime Stack Space]
 * - Where H is the maximum height depth boundary of the active tree. The memory footprint tracks the single
 *   longest deep branch configuration present inside the container stack simultaneously. In perfectly
 *   balanced scenarios, this requires a tiny optimized space of $O(\log N)$, scaling up to $O(N)$ if handling
 *   a fully skewed single-line tree profile.
 */
