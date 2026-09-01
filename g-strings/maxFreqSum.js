/*
Problem statement -
You are given a string s consisting of lowercase English letters ('a' to 'z').

Your task is to:

-> Find the vowel (one of 'a', 'e', 'i', 'o', or 'u') with the maximum frequency.

-> Find the consonant (all other letters excluding vowels) with the maximum frequency.
Return the sum of the two frequencies.

Note: If multiple vowels or consonants have the same maximum frequency, you may choose any one of them. If there are no vowels or no consonants in the string, consider their frequency as 0.

The frequency of a letter x is the number of times it occurs in the string.


Example 1:
Input: s = "successes"
Output: 6
Explanation:
-> The vowels are: 'u' (frequency 1), 'e' (frequency 2). The maximum frequency is 2.
-> The consonants are: 's' (frequency 4), 'c' (frequency 2). The maximum frequency is 4.
-> The output is 2 + 4 = 6.


Example 2:
Input: s = "aeiaeia"
Output: 3
Explanation:
-> The vowels are: 'a' (frequency 3), 'e' ( frequency 2), 'i' (frequency 2). The maximum frequency is 3.
-> There are no consonants in s. Hence, maximum consonant frequency = 0.
-> The output is 3 + 0 = 3.


Constraints:
-> 1 <= s.length <= 100
-> s consists of lowercase English letters only.


## Solve on leetcode -> https://leetcode.com/problems/find-most-frequent-vowel-and-consonant/description/

*/

const maxFreqSum = (s) => {

    let map = {};
    for (let i = 0; i < s.length; i++) {

        if (!map[s[i]]) {
            map[s[i]] = 1;

        } else {
            map[s[i]]++;
        }

    }

    let vowels = ["a", "e", "i", "o", "u"];
    let maxVowel = 0;
    let maxConsonant = 0;

    // 💡 Optimization: Loop through unique map entries, not the full string!
    for (let char in map) {
        if (vowels.includes(char)) {
            if (map[char] > maxVowel) {
                maxVowel = map[char];
            }
        } else {
            if (map[char] > maxConsonant) {
                maxConsonant = map[char];
            }
        }
    }
    return maxConsonant + maxVowel;
};

let string = "successes";
let result = maxFreqSum(string);
console.log(result);


// ============================================================================
// APPROACH: TWO-PASS HASH MAP TRAVERSAL
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Hash Map Frequency Counting + Categorized State Tracking
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Frequency Mapping Basics: An empty JavaScript object (`{}`) acts as a Hash Map to record
 *   character frequencies in a single pass. `map[char] = (map[char] || 0) + 1` is the
 *   standard mechanism to track occurrences.
 * - Categorized Filtering: Using an external verification array (`vowels`) lets you partition
 *   incoming characters dynamically into two structural branches (vowels vs. consonants).
 * - 💡 REDUNDANT LOOKUP PITFALL: Iterating over the original string `s` in the second loop causes
 *   duplicate evaluations for frequent characters. Swapping to a `for...in` loop over the `map`
 *   ensures you only process unique characters, protecting the execution from redundant comparisons.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Building the map takes O(N) where N is the length of string `s`.
 * - Iterating through the unique characters to find max tracking stats takes O(K) where K is
 *   the number of unique keys (bounded by alphabet size, max 26). Thus, overall time remains linear.
 *
 * 📌 SPACE COMPLEXITY: O(K) -> O(1) [Auxiliary Space]
 * - Your map stores frequency tallies. Because the input consists of standard lowercase letters,
 *   the map container will never hold more than 26 unique properties.
 * - Since the maximum hash table boundary is statically fixed by the alphabet size, the auxiliary
 *   space effectively simplifies to constant O(1) in practical complexity analysis.

 */

