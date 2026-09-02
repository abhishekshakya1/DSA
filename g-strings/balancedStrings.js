/*
Problem statement -
Balanced strings are those that have an equal quantity of 'L' and 'R' characters.

Given a balanced string s, split it into some number of substrings such that:

-> Each substring is balanced.

Return the maximum number of balanced strings you can obtain.



Example 1:
Input: s = "RLRRLLRLRL"
Output: 4
Explanation: s can be split into "RL", "RRLL", "RL", "RL", each substring contains same number of 'L' and 'R'.


Example 2:
Input: s = "RLRRRLLRLL"
Output: 2
Explanation: s can be split into "RL", "RRRLLRLL", each substring contains same number of 'L' and 'R'.
Note that s cannot be split into "RL", "RR", "RL", "LR", "LL", because the 2nd and 5th substrings are not balanced.


Example 3:
Input: s = "LLLLRRRR"
Output: 1
Explanation: s can be split into "LLLLRRRR".


Constraints:
-> 2 <= s.length <= 1000
-> s[i] is either 'L' or 'R'.
-> s is a balanced string.


## Solve on leetcode -> https://leetcode.com/problems/split-a-string-in-balanced-strings/description/

*/

const balancedStringSplit = function (s) {

    let balanceCount = 0;
    let subStringCount = 0;
    let n = s.length - 1;
    while (n >= 0) {
        if (s[n] === "R") {
            balanceCount++;
        } else {
            balanceCount--;
        }

        if (balanceCount === 0) {
            subStringCount++;
        }
        n--;
    }
    return subStringCount;
};

let string = "RLRRRLLRLL";
let result = balancedStringSplit(string);
console.log(result);


// ============================================================================
// APPROACH: FORWARD LINEAR SCAN WITH AUTOMATIC INDEXING
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Greedy State Tracking (Forward Single-Pass Pointer)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - For-Loop Safety: Utilizing a standard `for (let i = 0; i < n; i++)` syntax safeguards the
 *   code against infinite loop vulnerabilities because the engine manages pointer advancement automatically.
 * - Direction Independence: The net-zero greedy balancing logic works exactly the same whether
 *   you traverse the string forward (left-to-right) or backward (right-to-left).
 * - Immediate Partitioning: The moment `balanceCount === 0`, a valid segment is identified. Counting it
 *   immediately and moving forward guarantees the maximum possible number of splits.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - The code executes a single linear pass over the string of length N.
 * - Every operation inside the loop block (comparisons, increments, decrements) executes in O(1) constant time.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Excellent efficiency profile. Memory usage does not scale with input string sizes, relying entirely
 *   on a few simple primitive numbers (`balanceCount`, `subStringCount`, `n`, `i`).

 // when we have to balance something just use something --> +1, -1

 */








