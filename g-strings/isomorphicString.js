/*
Problem statement -
Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.


Example 1:
Input: s = "egg", t = "add"
Output: true
Explanation:
The strings s and t can be made identical by:
-> Mapping 'e' to 'a'.
-> Mapping 'g' to 'd'.


Example 2:
Input: s = "f11", t = "b23"
Output: false
Explanation:
The strings s and t can not be made identical as '1' needs to be mapped to both '2' and '3'.


Example 3:
Input: s = "paper", t = "title"
Output: true


Constraints:
-> 1 <= s.length <= 5 * 104
-> t.length == s.length
-> s and t consist of any valid ascii character.


## SOlve on leetcode -> https://leetcode.com/problems/isomorphic-strings/description/

*/
const isIsomorphic = function(s, t) {
    let mapSToT = {};
    let mapTToS = {};

    for (let i = 0; i < s.length; i++) {
        if (!mapSToT[s[i]] && !mapTToS[t[i]]) {
            mapSToT[s[i]] = t[i];
            mapTToS[t[i]] = s[i];
        } else if (mapTToS[t[i]] !== s[i] || mapSToT[s[i]] !== t[i]) {
            return false;
        }
    }

    return true;
};

let string1 = "egg";
let string2 = "add";
let result = isIsomorphic(string1, string2);
console.log(result);

// ============================================================================
// APPROACH 1: DUAL-DICTIONARY CONDITIONAL LOOKUP WITH IF-ELSE REFACTOR
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Mutual Inclusion Map Verification (Strict Two-Way Relation Safeguard)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - 💡 THE CLEAN STRUCTURAL FLOW: Splitting logic into an `if...else if` chain simplifies state tracking.
 *   The first block establishes a brand-new two-way bond only if both elements are completely unmapped.
 * - Cross-Contamination Guard: The `else if` conditional utilizes a logical OR (`||`). If either string's key
 *   fails to match its locked counterpart, the mapping validation immediately breaks and returns `false`.
 * - Truthy/Falsy Evaluation Efficiency: Relying on JS implicit falsy properties (`!mapSToT[s[i]]`) allows you
 *   to check key existence and token validity concurrently without typing explicit `undefined` qualifiers.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - The pointer advances through string inputs of length N sequentially in a single loop lifecycle.
 * - Every dictionary key assignment and truthy property execution processes in O(1) constant time.
 *
 * 📌 SPACE COMPLEXITY: O(K) -> O(1) [Auxiliary Space]
 * - Memory allocations scale linearly with the unique character pool limits (K).
 *   Since data boundaries map standard ASCII, the size of both tracking tables caps statically at 256 keys,
 *   preserving constant O(1) memory overhead footprints.
 */

