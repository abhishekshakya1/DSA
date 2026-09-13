/*
Problem statement -
You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.


Example 1:
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.


Example 2:
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.


Constraints:
-> 1 <= s.length <= 10^5
-> s consists of only uppercase English letters.
-> 0 <= k <= s.length


## Solve on leetcode -> https://leetcode.com/problems/longest-repeating-character-replacement/description/

*/

const characterReplacement = (s, k) => {
    let i = 0;
    let j = 0;
    let map = Array(26).fill(0);
    map[s.charCodeAt(0) - 65] = 1;
    let maxWindow = 0;
    while (j < s.length) {
        if (isWindowValid(map, k)) {
            maxWindow = Math.max(maxWindow, j - i + 1);
            j++;
            map[s.charCodeAt(j) - 65]++;
        } else {
            map[s.charCodeAt(i) - 65]--;
            i++;
        }
    }
    return maxWindow;
};

const isWindowValid = (map, k) => {
    let totalCount = 0;
    let maxCount = 0;
    for (let i = 0; i < 26; i++) {
        totalCount += map[i];
        maxCount = Math.max(maxCount, map[i]);
    }
    return (totalCount - maxCount <= k);
};

let s = "AABABBA";
let k = 1;
let result = characterReplacement(s, k);
console.log(result);

// ============================================================================
// 📂 APPROACH 1: DYNAMIC SLIDING WINDOW WITH FREQUENCY INVARIANT TRACKING
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Sliding Window Expansion with Optimized Global Maximum Frequency Tracking
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Window Validity Invariant: A string sub-segment can be fully transformed into a uniform repeating
 *   string using at most `k` swaps if and only if: `(Total Elements in Window) - (Highest Frequency Element) <= k`.
 * - Eliminating the O(26) Helper Loop: Instead of running a heavy validation loop on every iteration to find
 *   the max frequency, tracking `maxCount = Math.max(maxCount, map[newChar])` inline keeps lookup speed at true O(1).
 * - Non-Shrinking Window Optimization Property: When the window becomes invalid, we trigger an `if` branch
 *   instead of a `while` loop to shift `i++` exactly once. This shifts the window context forward without
 *   reducing its maximum recorded size, effectively maintaining our peak benchmark size naturally.
 * - Out-of-Bounds Memory Shielding: Standardizing the right edge pointer traversal within a structured
 *   `for` loop boundary protects against post-increment lookups that accidentally extract `NaN` references
 *   from character code conversions.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total length of the string `s`. The right pointer `j` steps through the collection exactly
 *   once. All internal frequency map indexing and arithmetic operations evaluate within constant O(1) cycles.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Memory allocations remain strictly constant. The tracking `map` array is permanently fixed at a size of
 *   26 elements to map the English alphabet spectrum, requiring no dynamic growth configurations.
 */
