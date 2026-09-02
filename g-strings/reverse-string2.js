/*
Problem statement -
Given a string s and an integer k, reverse the first k characters for every 2k characters counting from the start of the string.

If there are fewer than k characters left, reverse all of them. If there are less than 2k but greater than or equal to k characters, then reverse the first k characters and leave the other as original.


Example 1:
Input: s = "abcdefg", k = 2
Output: "bacdfeg"

Example 2:
Input: s = "abcd", k = 2
Output: "bacd"


Constraints:
-> 1 <= s.length <= 104
-> s consists of only lowercase English letters.
-> 1 <= k <= 104


## Solve on leetcode -> https://leetcode.com/problems/reverse-string-ii/description/

*/

const reverseString2 = (s, k) => {
    s = s.split("");

    for (let i = 0; i < s.length; i = i + (2 * k)) {

        let n = Math.min(k, s.length - i);
        let mid = Math.floor(n / 2);

        for (let j = 0; j < mid; j++) {
            let temp = s[i + j];
            s[i + j] = s[i + n - j - 1];
            s[i + n -j - 1] = temp;
        }
    }
    return s.join("");

};

let string = "abcdefg";
let result = reverseString2(string, 2);
console.log(result);


// ============================================================================
// APPROACH: CHUNK TRAVERSAL WITH DYNAMIC SIZE TRACKING
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Stride-Based Loop Navigation (`i += 2 * k`) with Midpoint Offset Swapping.
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Dynamic Window Sizing: Instead of forcing a static block scale (`let n = k`), utilizing
 *   `Math.min(k, s.length - i)` dynamically shrinks the target segment boundary when running out
 *   of trailing elements at the edge of the collection.
 * - Relative Index Offsets: Using `s[i + j]` and `s[i + n - j - 1]` allows you to reuse standard
 *   single-array reversal mathematical models while perfectly shifting across an array grid.
 * - Protection Against Undefined: Failing to clamp the sub-segment window sizes can cause the index pointer
 *   to step outside valid boundaries, injecting corrupting `undefined` values into data structures.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - The stride pointer advances across blocks while the internal loop handles element swaps. Each discrete
 *   character element is visited and adjusted at most once, maintaining linear execution constraints.
 *
 * 📌 SPACE COMPLEXITY: O(N) [Auxiliary Space]
 * - Because JavaScript string configurations are immutable primitives, allocating a mutable temporary character
 *   token sequence via `.split("")` demands space linear to string length N.
 *
 * Space complexity - O(1) language depends if we not converting string into array
 
 */
