/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */

const strStr = (haystack, needle) => {

    let n = haystack.length;
    let m = needle.length;

    if (m === 0) return 0;

    let lps = [0];
    let i = 0;
    let j = 1;

    while (j < m) {
        if (needle[i] === needle[j]) {
            lps[j] = i + 1;
            i++;
            j++;
        } else {
            if (i === 0) {
                lps[j] = 0;
                j++;
            } else {
                i = lps[i - 1];
            }
        }
    }

    i = j = 0;
    while (i < n) {
        if (haystack[i] === needle[j]) {
            i++;
            j++;
        } else {
            if (j === 0) {
                i++;
            } else {
                j = lps[j - 1];
            }
        }
        if (j === m) {
            return i - m;
        }
    }
    return -1;
};

let haystack = "sadbutsad";
let needle = "sad";
let result = strStr(haystack, needle);
console.log(result);



// ============================================================================
// 📂 APPROACH 2: KNUTH-MORRIS-PRATT (LPS ARTIFACT PRE-COMPUTATION PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Deterministic Finite Automaton String Matching via Longest Prefix Suffix (LPS) Pre-computation
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Bypassing Redundant Comparisons: The Naive approach forces the pointer `i` to backtrack when a
 *   mismatch hits, causing expensive operations. KMP fundamentally guarantees that `i` (the haystack pointer)
 *   **never moves backward**, accelerating execution linearly.
 * - The LPS Array Mechanism: The `lps` table stores the length of the longest proper prefix that is
 *   also a proper suffix for every sub-pattern window inside `needle`. This lookup array acts as a map
 *   telling the system exactly where to reset the search state upon meeting a mismatch.
 * - Smart Multi-Step Fallback: When `needle[i] !== needle[j]` during the compilation phase, instead of
 *   dropping `i` straight down to `0`, writing `i = lps[i - 1]` progressively drops the window down to
 *   the next best overlapping prefix anchor.
 * - Final Index Computation: When `j === m`, the matching loop completes. The current position `i` has
 *   traveled past the match block by exactly `m` items, making `i - m` the precise starting index position.
 *
 * 📌 TIME COMPLEXITY: O(N + M)
 * - Where N is the length of `haystack` and M is the length of `needle`. Building the LPS tracker table
 *   runs in linear O(M) cycles, while the matching pass processes the characters in linear O(N) time,
 *   completely dropping the bad combinatorial log factor.
 *
 * 📌 SPACE COMPLEXITY: O(M) [Auxiliary Space]
 * - Storage spaces are allocated to scale and construct the `lps` integer array cache, which is directly
 *   proportional to the length of the pattern `needle`.
 */