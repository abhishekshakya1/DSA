/*
Problem statement -
You are given a 0-indexed array of strings words and a character x.

Return an array of indices representing the words that contain the character x.

Note that the returned array may be in any order.


Example 1:
Input: words = ["leet","code"], x = "e"
Output: [0,1]
Explanation: "e" occurs in both words: "leet", and "code". Hence, we return indices 0 and 1.


Example 2:
Input: words = ["abc","bcd","aaaa","cbc"], x = "a"
Output: [0,2]
Explanation: "a" occurs in "abc", and "aaaa". Hence, we return indices 0 and 2.


Example 3:
Input: words = ["abc","bcd","aaaa","cbc"], x = "z"
Output: []
Explanation: "z" does not occur in any of the words. Hence, we return an empty array.


Constraints:
-> 1 <= words.length <= 50
-> 1 <= words[i].length <= 50
-> x is a lowercase English letter.
-> words[i] consists only of lowercase English letters.


## Solve on leetcode -> https://leetcode.com/problems/find-words-containing-character/description/

*/

const findWordsContaining = (words, x) => {

    let res = [];
    for (let i = 0; i < words.length; i++) {

        let word = words[i];
        for (let w of word) {
            if (w === x) {
                res.push(i);
                break;
            }
        }
    }
    return res;
};

let words = ["leet", "code"];
let x = "e";
let result = findWordsContaining(words, x);
console.log(result);


// ============================================================================
// 📂 COMPREHENSIVE ARCHITECTURAL NOTES
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Linear Character Scan with a Nested For-Of Loop iterator.
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Variable Reference Sync: Ensure the tracking container name initialization match
 *   exactly where values are pushed (`res` vs `newArr`).
 * - Block Scoping Loop Counters: Always declare iterators in loop initializers (`let w of word`)
 *   to avoid leaking values directly into the global scope.
 * - Early Exit Control Flow: Using `break` as soon as a matching character is discovered
 *   prevents unnecessary linear checks through the rest of the target word string.
 *
 * 📌 TIME COMPLEXITY: O(N * M)
 * - N is the total number of words in the array.
 * - M is the maximum length of an individual string word.
 * - In the worst-case scenario (character at the end or missing), we evaluate every character.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - The algorithm strictly consumes constant space because our internal tracking variables
 *   (`i`, `word`, `w`) occupy fixed scalar footprints.
 * - The return array (`res`) grows to a size of O(N) in the worst case, but this corresponds to
 *   Output Space requested by the problem statement and is excluded from Auxiliary Space math.
 
 */
