/*
Problem statement -
Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.



Example 1:
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]

Example 2:
Input: nums = [0]
Output: [0]


Constraints:
-> 1 <= nums.length <= 104
-> -231 <= nums[i] <= 231 - 1

## Solve on leetcode --> https://leetcode.com/problems/move-zeroes/description/

*/

const moveZeroes = (nums) => {

    let x = 0;
    for (let i = 0; i < nums.length; i++) {

        if (nums[i] !== 0) {
            let temp = nums[i];
            nums[i] = nums[x];
            nums[x] = temp;
            x++;
        }
    }
    console.log(nums);
};

let nums = [0, 1, 0, 3, 12];
moveZeroes(nums);

/*
Notes :-

* Time Complexity - O(n)
* Space Complexity - O(1)

** Pattern used to solve the problem in a efficicient way is Two-Pointer / Read-Write Pointer patttern:

One pointer tracks where the next non-zero element should go, while the other scans the array.

*/