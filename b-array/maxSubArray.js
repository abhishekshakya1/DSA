/*
Problem statement -
Given an integer array nums, find the subarray with the largest sum, and return its sum.


Example 1:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.


Example 2:
Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.


Example 3:
Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.


Constraints:
-> 1 <= nums.length <= 10^5
-> -10^4 <= nums[i] <= 10^4


Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.


## Solve on leetcode -> https://leetcode.com/problems/maximum-subarray/description/

*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    let currentSum = nums[0];
    let maxSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);

        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
};

let nums = [5, 4, -1, 7, 8];
let result = maxSubArray(nums);
console.log(result);


/*

## Approach — Kadane's Algorithm

- `currentSum` = maximum subarray sum ending at the current index.
- `maxSum` = maximum subarray sum found so far.
- Har element par 2 choices hoti hain:
    1. Current element se new subarray start karo.
    2. Previous subarray ko continue karo.

- Isliye:
    currentSum = Math.max(nums[i], currentSum + nums[i])

- Then:
    maxSum = Math.max(maxSum, currentSum)

## Example

nums = [-2,1,-3,4,-1,2,1,-5,4]

Best subarray:
[4,-1,2,1]

Maximum sum = 6

## Why `nums[0]` se initialize?
- `currentSum = 0` se initialize karne par all-negative
  arrays ka answer galat ho sakta hai.
- Example: [-5,-2,-8]
  Correct answer = -2
- Therefore:
    currentSum = nums[0]
    maxSum = nums[0]

## Time Complexity: O(n)
- Array ko only once traverse karte hain.
- Har element par constant-time operations hote hain.

## Space Complexity: O(1)
- Sirf `currentSum` and `maxSum` variables use hote hain.
- Koi extra array, object, ya recursion nahi.

## Interview Points
- Maximum contiguous subarray sum → Kadane's Algorithm.
- `currentSum` = best sum ending at current index.
- Negative running sum useful nahi hota, so current element se
  fresh start karna better ho sakta hai.
- All-negative array ko handle karna important hai.

## Key Pattern

Previous Sum + Current Element
        ↓
Continue OR Restart
        ↓
Keep the Maximum

## Pattern Recognition
Maximum sum + contiguous subarray
→ Kadane's Algorithm

*/
