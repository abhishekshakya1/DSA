/*
Problem statement -
Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.


Example 1:
Input: nums = [3,0,1]
Output: 2
Explanation:
n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.

Example 2:
Input: nums = [0,1]
Output: 2
Explanation:
n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.

Example 3:
Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation:
n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.


Constraints:
-> n == nums.length
-> 1 <= n <= 104
-> 0 <= nums[i] <= n
-> All the numbers of nums are unique.

## Solve on leetcode --> https://leetcode.com/problems/missing-number/description/

*/

// Solution - 1

// const missingNumber = (nums) => {
//     let n = nums.length;
//     let sum = (n * (n + 1)) / 2;
//     let sumOfNums = 0;

//     for (let i = 0; i < n; i++) {
//         sumOfNums += nums[i];
//     }

//     return sum - sumOfNums;
// };

// let nums = [4, 0, 2, 1, 5];
// let result = missingNumber(nums);
// console.log(result);


// Solution - 2

const missingNumber = (nums) => {
    let n = nums.length;
    let xorSum = 0;

    for (let i = 0; i <= n; i++) {
        xorSum ^= i;
    }

    for (let i = 0; i < n; i++) {
        xorSum ^= nums[i];
    }

    return xorSum;
};

let nums = [4, 0, 2, 1, 5];
let result = missingNumber(nums);
console.log(result);

/*
Notes :-

Time Complexity - O(n)
Space Complexity - O(1)

** Trick - 1)
Use Math/Gauss Formula (n * (n + 1)) / 2

** Trick - 2)
Use Bit Manipulation (XOR)

We use this second way beacuse it is more optimal it solves the problem of Overflow risk - when the size of array is too large and it hits Number.MAX_SAFE_INTEGER limits in javascript

And it is extremely fast as well (Hardware level)

*/


