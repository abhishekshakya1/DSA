/*
Problem statement -
Given a string s, find the length of the longest substring without duplicate characters.


Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.


Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.


Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.


Constraints:
-> 0 <= s.length <= 10^5
-> s consists of English letters, digits, symbols and spaces.


## Solve on leetcode -> https://leetcode.com/problems/longest-substring-without-repeating-characters/description/

*/

const lengthOfLongestSubstring = (s) => {
    let i = 0;
    let j = 0;
    let map = {};
    let maxWs = 0;

    for (j = 0; j < s.length; j++) {
        let currentChar = s[j];

        if (map[currentChar] != undefined && map[currentChar] >= i) {
            i = map[currentChar] + 1;
        }

        map[currentChar] = j;

        let currWs = j - i + 1;
        maxWs = Math.max(maxWs, currWs);
    }
    return maxWs;
};

let s = "pwwkew";
let result = lengthOfLongestSubstring(s);
console.log(result);


// ============================================================================
// 📂 APPROACH 1: DYNAMIC SLIDING WINDOW WITH COMPACT SNAPSHOT JUMP MAP
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Dynamic Variable-Size Sliding Window with Non-Linear Left Pointer Jumping
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Direct Left Window Shrink Warp: Traditional sliding windows shrink linearly by running a
 *   nested `while` loop to shift the left edge `i` forward one-by-one. Caching character index tracks
 *   inside a hash map object dictionary enables non-linear warping (`i = map[char] + 1`) to instantly
 *   bypass duplicate anchors in a single step.
 * - Current Frame Invalidation Guard: Evaluating `map[currentChar] >= i` serves as the core algorithm
 *   protection wall. It prevents the left pointer from accidentally jumping backwards when a character
 *   is met that exists in the global map history but rests outside the boundaries of the active window frame.
 * - Javascript Index 0 Shielding: Explicitly verifying `map[currentChar] != undefined` instead of using
 *   implicit truthy statements protects against index `0` bugs where JavaScript flags the number `0` as
 *   a falsy block evaluation.
 * - Window Capacity Math: Calculating the continuous sub-segment frame slice space metrics cleanly uses
 *   `j - i + 1` before taking a global maximum comparison stamp value.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total length of the string `s`. The right pointer `j` scans the layout exactly once
 *   from left to right. Dictionary writes and key address lookups run inside constant O(1) runtime cycles.
 *
 * 📌 SPACE COMPLEXITY: O(Min(M, N)) [Auxiliary Space]
 * - Storage sizes are allocated to hold data mappings within the cache map structure. The lookup table is
 *   bounded by the size of the string length N and the total unique collection count of alphabet character
 *   tokens M inside the character set spectrum landscape.
 */
