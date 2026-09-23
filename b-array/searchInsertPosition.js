/*
Problem statement - Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.


Example 1:
Input: nums = [1,3,5,6], target = 5
Output: 2


Example 2:
Input: nums = [1,3,5,6], target = 2
Output: 1


Example 3:
Input: nums = [1,3,5,6], target = 7
Output: 4


Constraints:
-> 1 <= nums.length <= 10^4
-> -10^4 <= nums[i] <= 10^4
-> nums contains distinct values sorted in ascending order.
-> -10^4 <= target <= 10^4


## Solve on leetcode -> https://leetcode.com/problems/search-insert-position/description/

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchInsert = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let middle = Math.floor(left + (right - left) / 2);

        if (target === nums[middle]) {
            return middle;
        } else if (target > nums[middle]) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }
    return left;
};

let nums = [1, 3, 5, 6];
let target = 0;
let result = searchInsert(nums, target);
console.log(result);



/*
# Search Insert Position

## Approach
- Use Binary Search because the array is sorted.
- If target === nums[middle] → return middle.
- If target > nums[middle] → search right.
- If target < nums[middle] → search left.
- If target is not found → return `left`.

## Time Complexity: O(log n)
- In every iteration, Binary Search removes roughly half of the search space.
- n → n/2 → n/4 → n/8 → ...
- After about log₂(n) iterations, only one position remains.
- Therefore, Time = O(log n).

## Space Complexity: O(1)
- We only use a few variables:
  `left`, `right`, and `middle`.
- No extra array, object, recursion, or data structure is used.
- Therefore, extra Space = O(1).

## Interview Points
- Sorted array → think Binary Search.
- After the loop, `left` is the insertion position.
- `left` can become `0` if target is smaller than all elements.
- `left` can become `nums.length` if target is greater than all elements.
- No need for `nums.includes(target)` because Binary Search already checks whether target exists.
- Avoid checking `nums[right]` after the loop because `right` can become `-1`.

## Key Pattern
Binary Search → Find exact index OR insertion/boundary index.
*/
