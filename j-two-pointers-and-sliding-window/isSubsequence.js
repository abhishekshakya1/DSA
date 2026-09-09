/*
Problem statement -
Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).



Example 1:
Input: s = "abc", t = "ahbgdc"
Output: true

Example 2:
Input: s = "axc", t = "ahbgdc"
Output: false


Constraints:
-> 0 <= s.length <= 100
-> 0 <= t.length <= 10^4
-> s and t consist only of lowercase English letters.


Follow up: Suppose there are lots of incoming s, say s1, s2, ..., sk where k >= 109, and you want to check one by one to see if t has its subsequence. In this scenario, how would you change your code?


## Solve on leetcode -> https://leetcode.com/problems/is-subsequence/description/

*/

const isSubsequence = (s, t) => {
    let i = 0;
    let j = 0;
    while (j < t.length) {
        if (s[i] === t[j]) {
            i++;
        }
        j++;
    }
    return i === s.length;
};

let s = "abc";
let t = "ahbgdc";
let result = isSubsequence(s, t);
console.log(result);


// ============================================================================
// 📂 APPROACH 1: TWO-POINTER GREEDY SCAN (RELATIVE ORDER MATCHING PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Symmetrical Two-Pointer Linear Scan with Greedy Character Alignment
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Relative Order Preservation: A subsequence requires characters to appear in the exact same
 *   chronological sequence, though not necessarily consecutively. Utilizing two moving pointer anchors
 *   (`i` for source `s`, `j` for target `t`) maps this structural dependency seamlessly.
 * - Greedy Matching Mechanic: The algorithm works greedily. The moment `s[i]` finds a match at `t[j]`,
 *   it cements that alignment and increments `i++` to search for the next required character. It is
 *   always mathematically optimal to pair a character with its earliest possible occurrence in `t`.
 * - Native Base-Case Coverage: If `s` is an empty string `""`, `s.length` is `0`. The loop conditions
 *   will execute normally, and `i` will stay at `0`. The final statement `i === s.length` evaluating
 *   `0 === 0` natively yields `true` without needing explicit standalone `if` branches.
 * - Early Termination Optimization (Optional Consideration): For very large datasets, the loop can
 *   be short-circuited early by adding `if (i === s.length) break;` inside the block to stop scanning
 *   `t` once all elements are matched.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total length of the target string `t`. The single linear `while` loop steps through
 *   the string `t` exactly once from start to finish, executing cheap O(1) constant pointer variations.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Completely space-optimized. Evaluates character alignments purely in-place utilizing lightweight
 *   scalar registers (`i`, `j`), demanding zero temporary memory heap buffers or matrix configurations.
 */