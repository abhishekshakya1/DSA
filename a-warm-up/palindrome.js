/*
Problem statement -
Given an integer x, return true if x is a palindrome, and false otherwise.

Example 1:
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.

Example 2:
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

Example 3:
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.


## Solve on leetcode --> https://leetcode.com/problems/palindrome-number/description/


*/


const isPalindrome = (x) => {
    if (x < 0) {
        return false
    }
    let xCopy = x;
    let reverse = 0;

    while (x > 0) {
        let rem = x % 10;
        reverse = (10 * reverse) + rem;
        x = Math.floor(x / 10);
    }
    return xCopy === reverse;



};

let int = -2552;
let result = isPalindrome(int)
console.log(result);


/*

Time Complexity: O(d) Where d is the number of digits.

Space Complexity: O(1) Only a few variables are used.

*/
