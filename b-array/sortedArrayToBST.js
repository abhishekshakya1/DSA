/*
Problem statement -
Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.


Example 1:
Input: nums = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: [0,-10,5,null,-3,null,9] is also accepted:


Example 2:
Input: nums = [1,3]
Output: [3,1]
Explanation: [1,null,3] and [3,1] are both height-balanced BSTs.


Constraints:
-> 1 <= nums.length <= 10^4
-> -10^4 <= nums[i] <= 10^4
-> nums is sorted in a strictly increasing order.


## Solve on leetcode -> https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/

*/


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
    const buildTree = (left, right) => {
        if (left > right) {
            return null;
        }

        let middle = Math.floor(left + (right - left) / 2);

        let root = new TreeNode(nums[middle]);

        root.left = buildTree(left, middle - 1);
        root.right = buildTree(middle + 1, right);

        return root;
    };
    return buildTree(0, nums.length - 1);
};


/*
# LeetCode 108 — Convert Sorted Array to Binary Search Tree

## Approach
- Given array sorted order me hota hai.
- Middle element ko root banao.
- Middle ke left wale elements → left subtree.
- Middle ke right wale elements → right subtree.
- Same process recursively repeat karo.
- Isse tree height-balanced BST banta hai.

## Base Case
- Agar `left > right`, range empty hai.
- Isliye `null` return karo.

## Why Middle Element?
- Middle choose karne se elements approximately equal halves me divide hote hain.
- Isliye tree balanced rehta hai.
- First/last element choose karne par tree skewed ho sakta hai.

## Example
[-10, -3, 0, 5, 9]

        0
       / \
     -10  5
       \    \
       -3    9

## Time Complexity: O(n)
- Har element se exactly ek TreeNode create hota hai.
- Isliye n elements ke liye O(n) time.

## Space Complexity: O(log n) Auxiliary
- Tree balanced hai, isliye recursion depth O(log n) hoti hai.
- Agar output tree ki memory bhi count karein → O(n).

## Interview Points
- Sorted array + balanced BST → choose middle element.
- Recursion ko `left` and `right` indexes se control karna.
- Array ko repeatedly `slice()` karne ki zarurat nahi.
- `left > right` → `null`.

## Key Pattern
Sorted Array
→ Middle Element
→ Root
→ Left Half = Left Subtree
→ Right Half = Right Subtree
→ Recursively Repeat

## Related Pattern
Binary Search + Divide & Conquer
*/