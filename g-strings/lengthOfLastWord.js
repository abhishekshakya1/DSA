/*
Problem statement -
Given a string s consisting of words and spaces, return the length of the last word in the string.

A word is a maximal substring consisting of non-space characters only.


Example 1:
Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5.

Example 2:
Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.

Example 3:
Input: s = "luffy is still joyboy"
Output: 6
Explanation: The last word is "joyboy" with length 6.


Constraints:
-> 1 <= s.length <= 10^4
-> s consists of only English letters and spaces ' '.
-> There will be at least one word in s.


## Solve on leetcode -> https://leetcode.com/problems/length-of-last-word/description/

*/


// Approach 1
const lengthOfLastWord1 = (s) => {

    const words = s.trim().split(" ");
    return words[words.length - 1].length;

};

let string1 = "  fly me   to the   moon  ";
let result1 = lengthOfLastWord1(string1);
console.log(result1);


// ============================================================================
// 📂 APPROACH 1: THE BUILT-IN STRING METHODS PATTERN
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - String Manipulation API (`trim` + `split`)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Immutability Overhead: JavaScript strings are immutable. `.trim()` and `.split()`
 *   do NOT modify the original string; they allocate brand new data structures in memory.
 * - Chaining Requirement: You must chain these methods or store their returned values.
 *   If you do not assign them, the operations are lost.
 * - Consecutive Space Pitfall: If the input has multiple spaces between words (e.g., `"fly   me"`),
 *   `.split(" ")` will insert empty strings `""` into your array. This only works because
 *   `.trim()` removes trailing gaps first.
 *
 * 📌 TIME COMPLEXITY: O(N) -> Scans the entire string to strip padding and split it.
 * 📌 SPACE COMPLEXITY: O(N) -> Allocates memory for the modified intermediate string and array chunks.

 */




// Approach 2 --> Two loops
const lengthOfLastWord2 = (s) => {
    let n = s.length - 1;

    while (n >= 0) {
        if (s[n] === " ") {
            n--;
        } else {
            break;
        }
    }

    let count = 0;
    while (n >= 0) {
        if (s[n] !== " ") {
            count++;
            n--;
        } else {
            break;
        }
    }

    return count;
};

let string2 = "one ";
let result2 = lengthOfLastWord2(string2);
console.log(result2);


// ============================================================================
// 📂 APPROACH 2: SEQUENTIAL POINTER PATTERN (TWO SEPARATE LOOPS)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Backward Linear Traversal (Isolated Phase Scanning)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Separation of Concerns: Avoids processing multiple conditions at once by breaking
 *   the backward traversal into two clean, independent stages.
 * - Loop 1 (The Skipper): Starts at `s.length - 1` and decrements the index pointer (`n--`)
 *   as long as it hits empty spaces `" "`. It halts dead on the first actual letter.
 * - Loop 2 (The Counter): Starts exactly where the skipper loop ended. It increments the
 *   counter for every valid letter and breaks instantly when it hits the next internal space.
 *
 * 📌 TIME COMPLEXITY: O(N) -> Traverses characters linearly from back to front, reading each element at most once.
 * 📌 SPACE COMPLEXITY: O(1) -> Performs all pointer adjustments in place with zero array allocation overhead.

 */



// Approach 3 --> One loop
const lengthOfLastWord3 = (s) => {

    let n = s.length - 1;
    let count = 0;

    while (n >= 0) {
        if (s[n] !== " ") {
            count++;

        } else if (count > 0) {
            break;
        }
        n--;
    }

    return count

};

let string3 = "Hello World          ";
let result3 = lengthOfLastWord3(string3);
console.log(result3);




// ============================================================================
// 📂 APPROACH 3: OPTIMIZED SINGLE-LOOP PATTERN (THE INTERVIEW STANDARD)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Single-Pass Backward Pointer (Early-Exit State Tracking)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Unified Condition Pass: Condenses trailing space skipping and character counting
 *   into a single backward traversal loop to optimize cycle count.
 * - State Tracking Logic: As the pointer moves backward, if it hits a letter, it increments `count`.
 *   If it encounters a space character, it evaluates the tracking state:
 *   - If `count === 0`, it means you are still traversing trailing space padding. Keep moving backward.
 *   - If `count > 0`, it means you have completely mapped the last word and hit its boundary. Trigger an early exit break.
 *
 * 📌 TIME COMPLEXITY: O(N) -> In best/average cases, it only scans the length of trailing spaces plus the last word.
 * 📌 SPACE COMPLEXITY: O(1) -> High-efficiency implementation using simple scalar variables.

 */
