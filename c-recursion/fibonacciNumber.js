/*
Problem statement -
The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.
Given n, calculate F(n).


Example 1:
Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.

Example 2:
Input: n = 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.

Example 3:
Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.


Constraints:
-> 0 <= n <= 30

## Solve on leetcode --> https://leetcode.com/problems/fibonacci-number/description/

*/


const fib = (n) => {

    if (n === 0) return 0;
    if (n === 1) return 1;

    let fibNumber = fib(n - 1) + fib(n - 2);
    return fibNumber;
};

let result = fib(3);
console.log(result);

/*
Notes :-

Time Complexity: O(2^n)
  This is because each function call makes 2 recursive calls, leading to a binary tree of calls. For large n, this becomes very inefficient, as many subproblems are solved repeatedly.


Space Complexity: O(n)
 Although the number of calls is exponential, the maximum call depth is n.

 So, the space used on the call stack is linear in the worst case.

*/

