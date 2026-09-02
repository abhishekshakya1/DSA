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

        let left = i;
        let right = Math.min(i + k - 1, s.length - 1);

        while (left < right) {
            let temp = s[left];
            s[left] = s[right];
            s[right] = temp;

            left++;
            right--;
        }
    }
    return s.join("");

};

let string = "abcdefg";
let result = reverseString2(string, 2);
console.log(result);


// ============================================================================
// APPROACH: TWO-POINTER SWAP WITH FIXED-STEP JUMPING
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Fixed-Step Loop Execution (`i += 2 * k`) combined with an In-Place Two-Pointer Swap.
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Dynamic Step Interators: Loops do not always have to step by 1. Modifying the loop
 *   stride directly to `2 * k` helps segment the array cleanly without extra nested conditions.
 * - Math.min Out-of-Bounds Guard: To handle trailing edge cases safely where fewer than `k`
 *   elements remain, `Math.min(i + k - 1, arr.length - 1)` dynamically snaps the right pointer
 *   safely to the absolute end of the boundary.
 * - Memory Conversion Cost: Because JavaScript string characters cannot be modified directly
 *   via indexes (`s[i] = x` fails silently), a temporary array layout copy via `.split("")`
 *   is mandatory before executing spatial re-arrangements.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - We iterate across the length of the string once. Even though we perform reversals inside,
 *   each character token is read/swapped at most once across the total timeline.
 *
 * 📌 SPACE COMPLEXITY: O(N) [Auxiliary Space]
 * - Creating the initial mutable character matrix array configuration via `.split("")` consumes
 *   linear memory proportional to the length of string input `s`.

 */

