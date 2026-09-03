/*
Problem statement -
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

Example 1:
Input: strs = ["flower","flow","flight"]
Output: "fl"


Example 2:
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.


Constraints:
-> 1 <= strs.length <= 200
-> 0 <= strs[i].length <= 200
-> strs[i] consists of only lowercase English letters if it is non-empty.


## Solve on leetcode -> https://leetcode.com/problems/longest-common-prefix/description/

*/

var longestCommonPrefix = function (strs) {
    if (!strs || strs.length === 0) return "";

    let x = 0;
    let n = strs[0].length;
    while (x < n) {
        let ch = strs[0][x];
        for (let i = 1; i < strs.length; i++) {
            if (x === strs[i].length || ch !== strs[i][x]) {
                return strs[0].substring(0, x);
            }
        }
        x++;
    }
    return strs[0];
};

let string = ["flower", "flow", "flight"];
let result = longestCommonPrefix(string);
console.log(result);


// ============================================================================
// APPROACH: VERTICAL CHARACTER COLUMN SCANNING
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Vertical Matrix Scanning (Column-by-Column Linear Cross-Reference)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Short-Circuit Evaluation Guard: Always check length constraints (`x === strs[i].length`)
 *   BEFORE character match constraints (`ch !== strs[i][x]`). Placing it first prevents
 *   accessing out-of-bound `undefined` indices.
 * - Vertical Alignment: Instead of matching strings sequentially pair-by-pair, this pattern
 *   fixes character index `x` and scans down through every single array element vertically.
 * - Early Exit Window: The algorithm stops matching immediately on the very first character
 *   mismatch, preventing unnecessary iterations through remaining letters.
 *
 * 📌 TIME COMPLEXITY: O(S)
 * - Where S is the total sum of all characters across all strings in the array.
 * - In the worst-case scenario (all strings are completely identical), the algorithm scans
 *   every character token precisely once.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Supreme memory isolation. The logic uses zero additional buffer structures or intermediate
 *   arrays, tracking state exclusively via simple scalars (`x`, `n`, `ch`, `i`).
 */
