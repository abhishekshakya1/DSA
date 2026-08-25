/*
Problem statement -
Given an integer n, return true if it is a power of two. Otherwise, return false.

An integer n is a power of two, if there exists an integer x such that n == 2**x.


Example 1:
Input: n = 1
Output: true
Explanation: 20 = 1

Example 2:
Input: n = 16
Output: true
Explanation: 24 = 16

Example 3:
Input: n = 3
Output: false


Constraints:
-> -231 <= n <= 231 - 1

## Solve on leetcode - https://leetcode.com/problems/power-of-two/description/

*/

const powerOfTwo = (n) => {

    if (n === 1) return true;
    if (n % 2 !== 0 || n <= 0) return false;

    return powerOfTwo(n / 2);

}
let result = powerOfTwo(-2);
console.log(result);

/*
Notes :-

Time Complexity: O(log n) because the input size is halved with every function call.

Space Complexity: O(log n) due to the recursive stack depth.

*/
