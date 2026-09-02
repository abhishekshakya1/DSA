/*
Problem statement -
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.


Example 1:
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.


Example 2:
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.


Example 3:
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.


Constraints:
-> 1 <= s.length <= 2 * 105
-> s consists only of printable ASCII characters.


## Solve on leetcode -> https://leetcode.com/problems/valid-palindrome/description/

*/

// Approach 1
const validPalindrome1 = (s) => {

    s = s.toLowerCase();

    let filteredS = "";
    let rev = "";
    for (let i = 0; i < s.length; i++) {
        if (s[i].match(/[a-z0-9]/i)) {
            filteredS = filteredS + s[i];
            rev = s[i] + rev;
        }
    }
    return filteredS === rev;

};

let string1 = "A man, a plan, a canal: Panama";
let result1 = validPalindrome1(string1);
console.log(result1);


// ============================================================================
// 📂 APPROACH 1: FILTERED STRING REVERSAL (BRUTE-FORCE PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - String Filtering + Global Inversion Matching (String API & RegExp)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Immutability Overhead: JavaScript strings are immutable primitives. Concatenating
 *   strings sequentially (`filteredS = filteredS + s[i]` and `rev = s[i] + rev`) forces
 *   the V8 engine to allocate entirely new strings in memory on *every single* valid character.
 * - Regex Scanning: Using `s[i].match(/[a-z0-9]/i)` evaluates characters lineally. It helps strip
 *   punctuation and spaces, but executing RegExp compilation repeatedly inside a loop adds computational weight.
 * - Simplicity Trade-Off: This approach is incredibly intuitive and quick to write, but it suffers heavily
 *   from unnecessary memory thrashing due to double string allocations (`filteredS` and `rev`).
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Loops over the entire input string of length N exactly once. Comparing two full-length strings
 *   at the final return statement takes an additional linear step, bounding overall execution time to O(N).
 *
 * 📌 SPACE COMPLEXITY: O(N) [Auxiliary Space]
 * - Allocates extra tracking structures (`filteredS` and `rev`) whose collective memory footprint scales
 *   linearly up to size N depending on how many alphanumeric elements exist in the input data.
 */


// Approach 2
const validPalindrome = (s) => {

    s = s.toLowerCase();

    let left = 0;
    let right = s.length - 1;

    while (left < right) {

        while (left < right && !isAlphaNumeeric(s[left])) {
            left++;
        }

        while (left < right && !isAlphaNumeeric(s[right])) {
            right--;
        }

        if (s[left] !== s[right]) {
            return false;
        }

        left++;
        right--;
    }
    return true;
};

const isAlphaNumeeric = (char) => {
    return (char >= "a" && char <= "z") || (char >= "0" && char <= "9");
};

let string = "A man, a plan, a canal: Panama";
let result = validPalindrome(string);
console.log(result);


// ============================================================================
// 📂 APPROACH 2: OPTIMIZED TWO-POINTER TRAVERSAL (THE INTERVIEW STANDARD)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Bidirectional Converging Two-Pointer (In-Place Evaluation)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Zero Memory Allocation: Unlike Approach 1, this solution skips creating intermediate array or string
 *   structures entirely. It directly inspects characters in-place using two numeric tracker boundaries (`left` and `right`).
 * - Nested Skipper Loops: The inner `while` loops safely slide right past non-alphanumeric noise (spaces, commas, colons).
 *   Adding the `left < right` safety condition inside the nested skippers prevents the pointers from crossing boundaries.
 * - High-Efficiency Character Bounds: Instead of slow Regular Expressions, using raw ASCII/character comparisons
 *   (`char >= "a" && char <= "z"`) computes almost instantly at the CPU register level.
 * - Early Exit Optimization: The algorithm stops executing the moment a mismatch is detected (`s[left] !== s[right]`),
 *   ensuring you never waste cycles scanning a string that has already failed palindrome rules.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Even though there are while loops nested inside an outer while loop, the pointers only move inward
 *   and never backtrack. Each character in the string is visited a maximum of exactly once, maintaining strict O(N).
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Supreme efficiency profile. The execution runs strictly within absolute constant memory boundaries,
 *   allocating only integer scalar configurations (`left`, `right`) irrespective of input text length.
 */


