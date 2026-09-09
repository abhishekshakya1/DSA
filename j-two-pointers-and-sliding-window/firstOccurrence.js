/*
Problem statement -
Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.



Example 1:
Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.


Example 2:
Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode", so we return -1.


Constraints:
-> 1 <= haystack.length, needle.length <= 10^4
-> haystack and needle consist of only lowercase English characters.


## Solve on leetcode -> https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/description/

*/

// Approach 1
const firstOccurrence = (heystack, needle) => {
    let n = heystack.length;
    let m = needle.length;

    for (let i = 0; i <= n - m; i++) {
        let j = 0;
        for (j = 0; j < m; j++) {
            if (heystack[i + j] !== needle[j]) {
                break;
            }
        }
        if (j === m) {
            return i;
        }
    }
    return -1;
};

let heystack = "sadbutsad";
let needle = "sad";
let result = firstOccurrence(heystack, needle);
console.log(result);


// ============================================================================
// 📂 APPROACH 1: NAIVE STRING MATCHING (SLIDING WINDOW BRUTE FORCE PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Naive Pattern Searching via Window Sliding and Character Lookahead
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Search Range Pruning Bound: A critical trap is letting the outer loop run up to `n - 1`. If the remaining
 *   characters in `heystack` are fewer than the size of `needle`, a match is structurally impossible. Bounding
 *   the scan window up to `n - m` prunes unnecessary trailing string lookups cleanly.
 * - Inline Sliding Window Mechanics: The character mapping logic evaluates substrings in-place using relative
 *   index calculation (`heystack[i + j]`). This elegant design completely eliminates the requirement of allocating
 *   temporary chunk substrings via `.substring()` or `.slice()`, reducing memory mutations.
 * - Loop Completion Authentication: Since `j` is scoped or preserved across the inner structure iteration, verifying
 *   `j === m` serves as a solid mathematical proof that the window successfully matched every single token boundary
 *   without hitting an early `break` path.
 * - Javascript Edge Cases: If `needle` is larger than `heystack`, the loop boundary `n - m` evaluates to a negative value,
 *   causing the loop to safely skip execution instantly and return `-1` natively.
 *
 * 📌 TIME COMPLEXITY: O((N - M) * M)
 * - Where N is the size of `heystack` and M is the size of `needle`. In the worst-case scenario (e.g., `heystack = "aaaaaa"`
 *   and `needle = "aab"`), the inner checker loops through almost M positions for every outer cycle, producing a quadratic
 *   worst-case runtime bounds.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Fully space-optimized. Processes all character inspections strictly in-place utilizing lightweight, local
 *   scalar counter variables (`i`, `j`, `n`, `m`), demanding zero memory buffer layout allocations on the heap.
 */
