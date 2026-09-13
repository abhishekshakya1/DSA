/*
Problem statement -
Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

In other words, return true if one of s1's permutations is the substring of s2.


Example 1:
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").


Example 2:
Input: s1 = "ab", s2 = "eidboaoo"
Output: false


Constraints:
-> 1 <= s1.length, s2.length <= 10^4
-> s1 and s2 consist of lowercase English letters.


## Solve on leetcode -> https://leetcode.com/problems/permutation-in-string/description/

*/

const checkInclusion = (s1, s2) => {
    if (s1.length > s2.length) return false;

    let hashS = Array(26).fill(0);
    let hashW = Array(26).fill(0);
    let windowLength = s1.length;

    for (let i = 0; i < windowLength; i++) {
        hashS[s1.charCodeAt(i) - 97]++;
        hashW[s2.charCodeAt(i) - 97]++;
    }

    let i = 0;
    let j = windowLength - 1;

    while (j < s2.length) {
        if (isHashSame(hashS, hashW)) {
            return true;
        } else {
            hashW[s2.charCodeAt(i) - 97]--;
            i++;

            j++;

            if (j < s2.length) {
                hashW[s2.charCodeAt(j) - 97]++;
            }
        }
    }
    return false;
};

const isHashSame = (hashS, hashW) => {
    for (let i = 0; i < 26; i++) {
        if (hashS[i] !== hashW[i]) {
            return false;
        }
    }
    return true;
};

let s1 = "ab";
let s2 = "eidbaooo";
let result = checkInclusion(s1, s2);
console.log(result);


// ============================================================================
// 📂 APPROACH 1: FIXED-SIZE SLIDING WINDOW WITH FREQUENCY HASH COMPARISON
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Fixed-Size Sliding Window with Counting Sort Hashing Serialization
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Permutation Invariant: A permutation of a string means a rearrangement of its tokens.
 *   Therefore, any valid permutation of `s1` must have the exact same length and character frequency
 *   footprint as `s1`. This sets up a **Fixed-Size Sliding Window** of size `s1.length`.
 * - Fixed-Space Frequency Array: Using fixed arrays (`Array(26).fill(0)`) to catalog frequencies
 *   completely drops map allocations and pointer structures, optimizing lookups via flat integer offsets (`- 97`).
 * - In-Place Slider Mutation: Rather than rebuilding the window character array on every single shift
 *   (which costs $O(W)$ where W is window size), we slide the frame in constant $O(1)$ time by dropping
 *    the outgoing character `s2.charCodeAt(i)` and absorbing the incoming character `s2.charCodeAt(j)`.
 * - The Out-of-Bounds Memory Lockout: Adding the boundary validation check `if (j < s2.length)` serves
 *   as the final safety wall. It prevents the pointer from accidentally executing a character code extraction
 *   on a trailing index, keeping JavaScript safe from hidden `NaN` property insertion loops.
 * - Flat Evaluation Constant: The helper logic `isHashSame` runs a strict, static ceiling count limit of 26
 *   iterations, making it a pure $O(1)$ constant time step during runtime.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total size length of the target string `s2`. The window frame slides across the layout
 *   linearly from left to right exactly once. Every individual step performs only $O(1)$ index variations
 *   and a static 26-step array check.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Ideal production memory layout footprint. The auxiliary memory structures (`hashS`, `hashW`) are locked
 *   at a static capacity threshold of 26 integer slots, requiring zero dynamic allocation overhead.
 */