/*
Problem statement -
Given two strings a and b, return the minimum number of times you should repeat string a so that string b is a substring of it. If it is impossible for b​​​​​​ to be a substring of a after repeating it, return -1.

Notice: string "abc" repeated 0 times is "", repeated 1 time is "abc" and repeated 2 times is "abcabc".


Example 1:
Input: a = "abcd", b = "cdabcdab"
Output: 3
Explanation: We return 3 because by repeating a three times "abcdabcdabcd", b is a substring of it.


Example 2:
Input: a = "a", b = "aa"
Output: 2


Constraints:
-> 1 <= a.length, b.length <= 10^4
-> a and b consist of lowercase English letters.


## Solve on leetcode -> https://leetcode.com/problems/repeated-string-match/description/

*/

/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
const repeatedStringMatch = (a, b) => {
    let count = 1;
    let text = a;

    // Keep appending until length >= b
    while (text.length < b.length) {
        text = text + a;
        count++;
    }

    // Check if b is now a substring
    if (text.includes(b)) {
        return count;
    }

     // One extra append (edge case)
    text = text + a;
    count++;

    if (text.includes(b)) {
        return count;
    }

    return -1;
};

let a = "abcd";
let b = "cdabcdab";
let result = repeatedStringMatch(a, b);
console.log(result);


/**
 * Problem: Repeated String Match
 * Description: Find the minimum number of times string 'a' needs to be repeated
 *              such that string 'b' is a substring of it.
 *
 * ==========================================
 * COMPLEXITY ANALYSIS:
 * ==========================================
 * Let N be the length of string 'a' and M be the length of string 'b'.
 *
 * Time Complexity: O(N + M) or O(N * M) depending on the JavaScript engine
 * - String Appending: The while loop appends 'a' until the length is at least M.
 *   The final string length will be at most M + 2N. This takes O(M + N) time.
 * - Substring Search (text.includes): In modern JS engines (V8), `includes()` uses
 *   optimized algorithms like Boyer-Moore or Horspool, which run in O(Length_of_Text)
 *   on average, which translates to O(M + N).
 *   In the absolute worst-case scenario, it can take O(Length_of_Text * M) -> O((M + N) * M).
 * - Total Time: Typically O(M + N) for average cases, bounded by O(M * (M + N)) in worst-case constraints.
 *
 * Space Complexity: O(M + N)
 * - The algorithm creates a new string `text` by repeating `a`.
 *   The maximum length of `text` can grow up to M + 2N before the final check.
 * - Total Space: O(M + N) to store the repeated string in memory.
 * ==========================================
 */