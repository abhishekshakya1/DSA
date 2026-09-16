/*
Problem statement -
Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.


Example 1:
Input: root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true


Example 2:
Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
Output: false


Constraints:
-> The number of nodes in the root tree is in the range [1, 2000].
-> The number of nodes in the subRoot tree is in the range [1, 1000].
-> -10^4 <= root.val <= 10^4
-> -10^4 <= subRoot.val <= 10^4


## Solve on leetcode -> https://leetcode.com/problems/subtree-of-another-tree/description/

*/

/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */


const isSubtree = (root, subRoot) => {
    let hashRoot = serialize(root);
    let hashSubRoot = serialize(subRoot);

    return hashRoot.includes(hashSubRoot);
};

const serialize = (root) => {
    let hash = "";
    const traversal = (curr) => {
        if (!curr) {
            hash = hash + "-#";
            return;
        }
        hash = hash + "-" + curr.val;
        traversal(curr.left);
        traversal(curr.right);
    };
    traversal(root);
    return hash;
};



class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Main Tree: [3, 4, 5, 1, 2]
const mainTree = new TreeNode(3,
    new TreeNode(4, new TreeNode(1), new TreeNode(2)),
    new TreeNode(5)
);

// Sub Tree: [4, 1, 2]
const subTree = new TreeNode(4, new TreeNode(1), new TreeNode(2));

console.log(isSubtree(mainTree, subTree));


// ============================================================================
// 📂 APPROACH 1: PRE-ORDER TRAVERSAL SERIALIZATION (STRING MATCHING)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Tree Serialization to String Mapping via Pre-Order DFS Traversal.
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Structural Null Anchoring: Appending an explicit marker (`-#`) immediately when encountering
 *   a null reference ensures that the physical shape and boundaries of the tree are perfectly
 *   preserved within the text stream.
 * - Leaf Node Self-Limitation: Because leaf nodes immediately append trailing structural markers
 *   (like `-#-#`), the generated sub-string naturally enforces boundary limits that prevent false
 *   positive matches against structurally shorter parent paths.
 * - String Search Reduction: Using `.includes()` transforms a complex, recursive twin-pointer
 *   structural comparison into a highly intuitive linear substring check.
 *
 * 📌 TIME COMPLEXITY: O(N + M)
 * - Traversing and serializing both trees takes linear time proportional to the number of nodes
 *   in the main tree (N) and sub-tree (M). The average-case string matching via JavaScript's
 *   native `.includes()` optimization effectively handles the comparison step in linear boundaries.
 *
 * 📌 SPACE COMPLEXITY: O(N + M) [Auxiliary Space]
 * - Memory scales with the size of the constructed strings (`hashRoot` and `hashSubRoot`) which hold
 *   character allocations for every node and null marker, alongside the implicit recursive call
 *   stack overhead of O(H) during the traversal phase.
 */

