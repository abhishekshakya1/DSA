/*
Problem statement -
Given an array of strings strs, group the anagrams together. You can return the answer in any order.


Example 1:
Input: strs = ["eat","tea","tan","ate","nat","bat"]

Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Explanation:

There is no string in strs that can be rearranged to form "bat".
The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.



Example 2:
Input: strs = [""]

Output: [[""]]


Example 3:
Input: strs = ["a"]

Output: [["a"]]


Constraints:
-> 1 <= strs.length <= 104
-> 0 <= strs[i].length <= 100
-> strs[i] consists of lowercase English letters.


## Solve on leetcode -> https://leetcode.com/problems/group-anagrams/description/

*/

const groupAnagrams = function (strs) {
    let map = {};
    for (let i = 0; i < strs.length; i++) {
        let sortedStr = strs[i].split("").sort().join("");
        if (!map[sortedStr]) {
            map[sortedStr] = [strs[i]];
        } else {
            map[sortedStr].push(strs[i]);
        }
    }
    return Object.values(map);
};

let string = ["eat", "tea", "tan", "ate", "nat", "bat"];
let result = groupAnagrams(string);
console.log(result);


// ============================================================================
// 📂 APPROACH 1: SORTED STRING AS HASH KEY (CATEGORIZATION PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Hash Map Grouping with Character Sorting Serialization
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Sorting Invariant: Anagrams share identical character counts. Sorting a string
 *   mechanically normalizes it (e.g., "eat", "tea", "ate" all become "aet"). This makes
 *   the sorted signature the ultimate unique identifier key for grouping.
 * - String Splitting Cost: Because JavaScript strings are immutable, `.split("").sort().join("")`
 *   allocates a new array, runs an O(M log M) sorting routine, and wraps it back into a string
 *   on *every single word* in the collection.
 * - Dynamic Value Arrays: `map[sortedStr] = [strs[i]]` handles the base case initialization
 *   by nesting an array instance as the map property value, allowing subsequent iterations
 *   to scale seamlessly via standard array pushes.
 *
 * 📌 TIME COMPLEXITY: O(N * M log M)
 * - Where N is the total number of words in `strs`, and M is the maximum length of a word.
 *   For each of the N words, we invoke an array sorting algorithm which costs O(M log M).
 *
 * 📌 SPACE COMPLEXITY: O(N * M) [Auxiliary Space]
 * - The frequency tracker map object scales to house every unique anagram family cluster.
 *   In the absolute worst case (no anagram pairings exist), the map caches every string
 *   and array footprint linearly relative to the total character footprint input payload volume.
 */




const groupAnagrams1 = function (strs) {
    let map = {};
    for (let i = 0; i < strs.length; i++) {
        let freqArr = Array(26).fill(0);
        let s = strs[i];

        for (let j = 0; j < s.length; j++) {
            let index = s[j].charCodeAt() - "a".charCodeAt();
            freqArr[index]++;
        }

        let key = "";
        for (let k = 0; k < 26; k++) {
            key = key + String.fromCharCode(k + 97) + freqArr[k];
        }

        if (!map[key]) {
            map[key] = [s];
        } else {
            map[key].push(s);
        }
    }
    return Object.values(map);
};

let string1 = ["eat", "tea", "tan", "ate", "nat", "bat"];
let result1 = groupAnagrams1(string1);
console.log(result1);


// ============================================================================
// 📂 APPROACH 2: FREQUENCY ARRAY TO STRING KEY TRANSFORM (OPTIMIZED STANDARD)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Alphabet Frequency Array Key Hashing (Counting Sort Serialization)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Bypassing the Sort Bottleneck: Instead of paying a heavy sorting overhead, this approach
 *   uses an explicit fixed-size array (`Array(26).fill(0)`) to catalog frequencies in strict O(M) time.
 * - Relative Character Index Mapping: Utilizing `s[j].charCodeAt() - "a".charCodeAt()` translates
 *   raw text keys into bounded numeric slot addresses mapping perfectly between `0` and `255`.
 * - 💡 THE SERIALIZATION TRICK: Strings cannot use arrays directly as unique keys. Concatenating
 *   the indices alongside their numeric buckets (e.g., "a1b0c0...e1") serializes the structural
 *   data profile into a unique string key signature.
 * - Flat Evaluation Speedup: Because the key reconstruction loop maps a static limit of 26
 *   positions, it compiles away as an O(1) constant calculation step inside your iteration logic.
 *
 * 📌 TIME COMPLEXITY: O(N * M)
 * - Where N is the number of words and M is the maximum length of a word. Generating the character
 *   frequency array executes flatly in linear O(M) time, eliminating the log factor completely!
 *
 * 📌 SPACE COMPLEXITY: O(N * M) [Auxiliary Space]
 * - Your frequency lookup map stores references to every single source entry. The static
 *   `freqArr` allocation costs O(26) -> O(1) space, which resets and releases cycles continuously.
 */
