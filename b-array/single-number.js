/*
Problem statement -
Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.


Example 1:
Input: nums = [2,2,1]
Output: 1

Example 2:
Input: nums = [4,1,2,1,2]
Output: 4

Example 3:
Input: nums = [1]
Output: 1


Constraints:
-> 1 <= nums.length <= 3 * 104
-> -3 * 104 <= nums[i] <= 3 * 104
-> Each element in the array appears twice except for one element which appears only once.

## Solve on leetcode --> https://leetcode.com/problems/single-number/description/

*/


/*

Approach - 1)
const singleNumber = (nums) => {
    let hash = {};

    for (let i = 0; i < nums.length; i++) {

        if (!hash[nums[i]]) {
            hash[nums[i]] = 1;
        } else {
            hash[nums[i]]++;
        }
    }

    for (let i = 0; i < nums.length; i++) {

        if (hash[nums[i]] === 1) {
            return nums[i]
        }
    }
};


let nums = [3, 1, 5, 4, 1, 5, 3];
let result = singleNumber(nums);
console.log(result);


Notes :-

* Time Complexity = O(n)
We traverse the array twice: once for counting and once for checking.

* Space Complexity = O(n)
The hash map may store counts for up to n elements in the worst case.

*/

// Approach - 2)

const singleNumber = (nums) => {
    let xor = 0;

    for (let i = 0; i < nums.length; i++) {
        xor = xor ^ nums[i];
    }
    return xor;
};

let nums = [3, 1, 5, 4, 1, 5, 3];
let result = singleNumber(nums);
console.log(result);

/*
Notes :-

* Time Complexity = O(n)
where n is the number of elements in the array.

* Space Complexity = O(1)
No extra space used

** Used Bit manipulation (XOR)

*/

