/*
Problem statement -
Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.

Return any possible rearrangement of s or return "" if not possible.


Example 1:
Input: s = "aab"
Output: "aba"


Example 2:
Input: s = "aaab"
Output: ""


Constraints:
-> 1 <= s.length <= 500
-> s consists of lowercase English letters.


## Solve on leetcode -> https://leetcode.com/problems/reorganize-string/description/

*/

/**
 * @param {string} s
 * @return {string}
 */
const reorganizeString = (s) => {
    let freq = {};
    let maxFreq = 0;

    // Count frequency
    for (let c of s) {
        freq[c] = (freq[c] || 0) + 1;
        maxFreq = Math.max(maxFreq, freq[c]);
    }

    let n = s.length;

    // Impossible case
    if (maxFreq > Math.ceil(n / 2)) {
        return "";
    }

    // Sort characters by frequency (descending)
    let chars = Object.keys(freq).sort((a, b) => freq[b] - freq[a]);

    let result = new Array(n);
    let i = 0;

    for (let ch of chars) {
        let count = freq[ch];

        while (count > 0) {
            if (i >= n) {
                i = 1; // move to odd index
            }

            result[i] = ch;
            i += 2;
            count--;
        }
    }
    return result.join("");
};

let s = "aaab";
let result = reorganizeString(s);
console.log(result);


/**
 * Problem: Reorganize String
 * Description: Rearrange characters of a string so that no two adjacent characters are identical.
 *
 * ==========================================
 * COMPLEXITY ANALYSIS:
 * ==========================================
 * Time Complexity: O(N)
 * - Frequency Counting: O(N) to iterate through the string of length N.
 * - Sorting Keys: O(K log K) where K is the number of unique characters. Since K <= 26 (alphabet size), this is O(1) constant time.
 * - Placing Characters: O(N) because the loop runs exactly once for every character in the original string.
 * - String Join: O(N) to convert the result array back to a string.
 * - Total Time: O(N + K log K) -> O(N)
 *
 * Space Complexity: O(N)
 * - Frequency Map & Chars Array: O(K) space for storing unique characters, which is O(1) since K <= 26.
 * - Result Array: O(N) space to store the rearranged characters.
 * - Total Space: O(N + K) -> O(N)
 * ==========================================
 */
