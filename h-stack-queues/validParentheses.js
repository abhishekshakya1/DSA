/*
Problem statement -
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.


An input string is valid if:

1) Open brackets must be closed by the same type of brackets.

2) Open brackets must be closed in the correct order.

3) Every close bracket has a corresponding open bracket of the same type.


Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

Example 4:
Input: s = "([])"
Output: true

Example 5:
Input: s = "([)]"
Output: false


Constraints:
-> 1 <= s.length <= 104
-> s consists of parentheses only '()[]{}'.


## Solve on leetcode -> https://leetcode.com/problems/valid-parentheses/description/

*/
const isValid = function (s) {

    let stack = [];

    let map = {
        "[": "]",
        "(": ")",
        "{": "}"
    }

    for (let i = 0; i < s.length; i++) {
        if (map[s[i]]) {
            stack.push(s[i])
        } else {
            let top = stack.pop();
            if (!top || s[i] != map[top]) {
                return false;
            }
        }
    }
    return stack.length === 0;
};

let string = "()[]{}";
let result = isValid(string);
console.log(result);

// ============================================================================
// 📂 APPROACH 1: STACK WITH LOOKUP HASH MAP (LIFO PAIRING PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Linear Stack-Based Character Matching with Hash Map Configuration
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - LIFO Property for Nested Structures: Parentheses validation inherently requires nested tracking.
 *   The last opened bracket MUST be the first one to be closed. A Stack data structure naturally
 *   enforces this LIFO order.
 * - Hash Map as Mapping Configuration: Using a configuration object `map` eliminates repetitive
 *   and messy `if-else` or `switch` chains. It provides an elegant O(1) dictionary lookup to verify
 *   if the incoming character is an opening or a matching closing token.
 * - Guard Against Underflow: The check `if (!top)` elegantly captures edge cases where a closing
 *   bracket arrives first (e.g., `s = "]"`) or there are more closing brackets than opening ones,
 *   safely catching a structural failure early.
 * - Final State Empty Check: A structural breakdown can still hide if opening brackets remain unmatched
 *   at the end (e.g., `s = "(("`). Returning `stack.length === 0` at the very end ensures the total
 *   collection is perfectly balanced.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total length of the string `s`. We iterate through the input string exactly once,
 *   performing only O(1) stack operations (`push`, `pop`) and O(1) map dictionary lookups on each cycle.
 *
 * 📌 SPACE COMPLEXITY: O(N) [Auxiliary Space]
 * - In the absolute worst-case scenario (e.g., `s = "(((((("`), no closing elements are matched,
 *   forcing the stack to cache and store up to N characters linearly in runtime memory.
 */
