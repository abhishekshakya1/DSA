/*
Problem statement -
Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.


Example 1:
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4

Example 2:
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1


Constraints:
-> 1 <= nums.length <= 104
-> -104 < nums[i], target < 104
-> All the integers in nums are unique.
-> nums is sorted in ascending order.

## Solve on leetcode --> https://leetcode.com/problems/binary-search/description/

*/

const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let middle = Math.floor(left + (right - left) / 2);

        if (arr[middle] === target) {
            return middle;

        } else if (arr[middle] < target) {
            left = middle + 1;

        } else {
            right = middle - 1;
        }
    }

    return - 1;
};

let arr = [-1, 0, 3, 5, 9, 12];
let result = binarySearch(arr, 9);
console.log(result);

/*
Notes :-

* Time Complexity:
Best Case: O(1)
 when the target is found at the middle initially.

Worst Case: O(log n)
 the array is halved every iteration.

* Space Complexity: O(1)
 Constant SpaceNo additional data structures.



** The middle Formula Concept (Must Know for Interviews) :-

 -> Normal Formula: (left + right) / 2
 -> Optimized Formula: left + (right - left) / 2

 Why use it? (Integer Overflow): Agar array ka size bohot bada ho (close to max integer limit), toh left + right karne par sum memory limit se baahar chala jata hai (Overflow), jisse code crash ho jata hai.

 The Logic: Naya formula pehle bache hue raste ka distance nikalta hai (right - left), use aadha karta hai, aur left mein jod deta hai. Isme koi bhi number kabhi bhi memory limit ko cross nahi karta.

*/
