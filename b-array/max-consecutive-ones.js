/*
Problem statement -
Given a binary array nums, return the maximum number of consecutive 1's in the array.


Example 1:
Input: nums = [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.

Example 2:
Input: nums = [1,0,1,1,0,1]
Output: 2


Constraints:
-> 1 <= nums.length <= 105
-> nums[i] is either 0 or 1.

## Solve on leetcode --> https://leetcode.com/problems/max-consecutive-ones/description/

*/

const maxConsecutiveOnes = (nums) => {
    let count = 0;
    let maxCount = 0;

    for (let i = 0; i < nums.length; i++) {

        if (nums[i] === 1) {
            count++;

        } else {
            maxCount = Math.max(count, maxCount);
            count = 0;
        }
    }

    return Math.max(count, maxCount);
};

let nums = [1, 0, 1, 1, 0, 1, 1, 1];
// let nums = [1, 1, 0, 1, 1, 1, 1];
// let nums = [1, 0, 1, 1];
let result = maxConsecutiveOnes(nums);
console.log(result);

/*
Notes :-

* Time Complexity: O(n)
  We loop through the array exactly once.

* Space Complexity: O(1)
   We only use two variables (count and maxCount), which uses constant extra space.


** Approach used Single-Pass Iteration (Reset on Zero)

*/






