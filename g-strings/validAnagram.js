/*
Problem statement -
Given two strings s and t, return true if t is an anagram of s, and false otherwise.


Example 1:
Input: s = "anagram", t = "nagaram"
Output: true

Example 2:
Input: s = "rat", t = "car"
Output: false


Constraints:
-> 1 <= s.length, t.length <= 5 * 104
-> s and t consist of lowercase English letters.


Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?


## Solve on leetcode -> https://leetcode.com/problems/valid-anagram/description/

*/
const isAnagram = (s, t) => {

    if (s.length !== t.length) return false;

    let map = {};
    for (let i = 0; i < s.length; i++) {

        if (!map[s[i]]) {
            map[s[i]] = 1;
        } else {
            map[s[i]]++;
        }
    }

    for (let i = 0; i < t.length; i++) {

        if (!map[t[i]]) {
            return false;
        } else {
            map[t[i]]--;
        }
    }
    return true;
};

let s = "anagram";
let t = "nagaram";
let result = isAnagram(t, s);
console.log(result);

// ============================================================================
// APPROACH: UP-DOWN FREQUENCY BALANCING (THE INTERVIEW STANDARD)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Hash Map Frequency Tallies (Single Tally-Counter Inversion Tracking)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Length Invariance Guard: Checking `s.length !== t.length` upfront provides a cheap
 *   O(1) exit constraint that guarantees both input allocations share identical sizing boundaries.
 * - Up-Down Balance Tactic: Instead of maintaining two completely separate maps, building up
 *   counts via string `s` and draining them via string `t` reduces your memory management overhead.
 * - 💡 SHORT-CIRCUIT ZERO CHECK: If `!map[t[i]]` evaluates to true during the subtraction phase,
 *   it means the character either never existed in `s` (evaluates to undefined) or has already
 *   exhausted its allocated budget quota (evaluates to 0). Either condition invalidates the anagram immediately.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the length of string `s` (or `t`). We perform two independent, flat linear passes
 *   across the string data lengths. All hash map reads and writes process in O(1) constant time.
 *
 * 📌 SPACE COMPLEXITY: O(K) -> O(1) [Auxiliary Space]
 * - Your auxiliary storage map dynamically expands to hold unique character mappings.
 *   Because the problem space is constrained to lowercase English alphabet letters, the map
 *   collection will never grow larger than 26 unique properties.
 * - Since the maximum hash table boundary is statically capped, it simplifies down to O(1) constant space.
 */
