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




// Rabin Karp algorithm
const repeatedStringMatch1 = (a, b) => {
    let count = 1;
    let text = a;

    // Keep appending until length >= b
    while (text.length < b.length) {
        text = text + a;
        count++;
    }

    // Check if b is now a substring
    if (rabinKarp(text, b)) {
        return count;
    }

     // One extra append (edge case)
    text = text + a;
    count++;

    if (rabinKarp(text, b)) {
        return count;
    }

    return -1;
};


function rabinKarp(text, pattern) {
    let base = 256;
    let mod = 1e9 + 7;

    let n = text.length;
    let m = pattern.length;

    if (n < m) return false;

    let patternHash = 0;
    let windowHash = 0;

    // Initial hash
    for (let i = 0; i < m; i++) {
        patternHash = (patternHash * base + pattern.charCodeAt(i)) % mod;
        windowHash = (windowHash * base + text.charCodeAt(i)) % mod;
    }

    let power = 1;
    for (let i = 0; i < m - 1; i++) {
        power = (power * base) % mod;
    }

    for (let i = 0; i <= n - m; i++) {

        // check hash match
        if (patternHash === windowHash) {
            if (text.substring(i, i + m) === pattern) {
                return true;
            }
        }

        // Rollimg hash update
        if (i < n - m) {
            windowHash = (windowHash - (power * text.charCodeAt(i)) % mod + mod) % mod;
            windowHash = (windowHash * base + text.charCodeAt(i + m)) % mod;
        }

    }
    return false;
}

let a1 = "abcd";
let b1 = "cdabcdab";
let result1 = repeatedStringMatch1(a1, b1);
console.log(result1);



/**
 * ==========================================
 * COMPLEXITY ANALYSIS:
 * ==========================================
 * Let N be the length of string 'a' and M be the length of string 'b'.
 * The maximum length of the constructed `text` is bounded by (M + 2N).
 *
 * Time Complexity:
 * - Average Case: O(N + M)
 *   Constructing the repeated string takes O(M + N). Rabin-Karp computes the
 *   initial hash in O(M) and rolls through the text in O(Text Length) which is O(M + N).
 * - Worst Case: O((M + N) * M)
 *   In case of extremely high hash collisions (spurious hits), `text.substring()`
 *   runs frequently, degrading the performance to quadratic time.
 * - Total Time: O(N + M) average case.
 *
 * Space Complexity: O(M + N)
 * - The algorithm creates a new string `text` by repeating `a`, which grows up to M + 2N.
 * - Rabin-Karp utilizes O(1) auxiliary variables for hashing calculations.
 * - Total Space: O(M + N) to store the generated text string in memory.
 * ==========================================
 */