/*
Problem statement -
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

Example 1:
Input: x = 123
Output: 321

Example 2:
Input: x = -123
Output: -321

Example 3:
Input: x = 120
Output: 21

Constraints:
-2^31 <= x <= 2^31 - 1

## Solve on leetcode --> https://leetcode.com/problems/reverse-integer/description/

*/

const reverseInteger = (x) => {
    let reverse = 0;
    let xcopy = x
    x = Math.abs(x)

    while (x > 0) {
        let rem = x % 10;
        reverse = (reverse * 10) + rem;
        x = Math.floor(x / 10);
    }

    if (reverse > 2 ** 31 - 1 || reverse < -(2 ** 31)) return 0;

    return xcopy < 0 ? -reverse : reverse;
};

let int = -1234567891;
let result = reverseInteger(int);
console.log(result);

/*
Notes :-

Time Complexity: O(n) Where n is the number of digits.

Space Complexity: O(1) — Constant space.

*/