/*
Problem statement -
A valid parentheses string is either empty "", "(" + A + ")", or A + B, where A and B are valid parentheses strings, and + represents string concatenation.

-> For example, "", "()", "(())()", and "(()(()))" are all valid parentheses strings.


A valid parentheses string s is primitive if it is nonempty, and there does not exist a way to split it into s = A + B, with A and B nonempty valid parentheses strings.

Given a valid parentheses string s, consider its primitive decomposition: s = P1 + P2 + ... + Pk, where Pi are primitive valid parentheses strings.

Return s after removing the outermost parentheses of every primitive string in the primitive decomposition of s.



Example 1:
Input: s = "(()())(())"
Output: "()()()"
Explanation:
The input string is "(()())(())", with primitive decomposition "(()())" + "(())".
After removing outer parentheses of each part, this is "()()" + "()" = "()()()".


Example 2:
Input: s = "(()())(())(()(()))"
Output: "()()()()(())"
Explanation:
The input string is "(()())(())(()(()))", with primitive decomposition "(()())" + "(())" + "(()(()))".
After removing outer parentheses of each part, this is "()()" + "()" + "()(())" = "()()()()(())".


Example 3:
Input: s = "()()"
Output: ""
Explanation:
The input string is "()()", with primitive decomposition "()" + "()".
After removing outer parentheses of each part, this is "" + "" = "".


Constraints:
-> 1 <= s.length <= 105
-> s[i] is either '(' or ')'.
-> s is a valid parentheses string.


## Solve on leetcode -> https://leetcode.com/problems/remove-outermost-parentheses/description/

*/


// Approach 1
const removeOuterParentheses = (s) => {
    let stack = [];
    let ans = "";
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") {
            stack.push(s[i]);
            ans = ans + (stack.length > 1 ? s[i] : "");
        } else {
             ans = ans + (stack.length > 1 ? s[i] : "");
            stack.pop();
        }
    }
    return ans;
};

let string = "(()())(())";
let result = removeOuterParentheses(string);
console.log(result);


// ============================================================================
// 📂 APPROACH 1: STACK-DEPTH TRACKING (DECOMPOSITION PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Primitive Decomposition via Stack Depth / Counter Filtering
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Identifying Outermost Boundaries: A valid parentheses string can be split into primitive
 *   sub-strings (e.g., `(()())` -> primitive, `()` -> primitive). The outermost brackets of any
 *   primitive block always appear when the tracking mechanism transitions away from or back to zero depth.
 * - Layer Filtering Mechanism: By executing `stack.length > 1` *before* handling structural changes
 *   intelligently, you ensure that the first opening bracket (which changes stack length from 0 to 1)
 *   and the final closing bracket (which matches when length is exactly 1) are silently excluded from `ans`.
 * - Inner-Content Preservation: For any character trapped *inside* the outer layer, the stack depth
 *   is strictly greater than 1. This serves as a green signal to safely append those inner primitives
 *   directly to the accumulator string.
 * - String Concatenation Note: JavaScript strings are primitive and immutable, meaning `ans = ans + ...`
 *   allocates a new string fragment on every valid addition. While completely fine for interview setups,
 *   large data bursts can be alternatively tracked via a character array builder.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total length of the string `s`. The algorithm scans across the input payload exactly
 *   once, executing basic O(1) conditional evaluations and stack state alterations per character.
 *
 * 📌 SPACE COMPLEXITY: O(N) [Auxiliary Space]
 * - Memory allocation scales linearly to manage the tracking stack instance. In heavily nested,
 *   unbalanced conditions (e.g., `s = "(((((())))))"`), the stack array will store up to N/2 tracking items.
 */



// Approach 2
const removeOuterParentheses1 = (s) => {
    let level = 0;
    let ans = "";
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") {
            level++
            ans = ans + (level > 1 ? s[i] : "");
        } else {
             ans = ans + (level > 1 ? s[i] : "");
            level--;
        }
    }
    return ans;
};

let string1 = "(()())(())";
let result1 = removeOuterParentheses1(string1);
console.log(result1);

// ============================================================================
// 📂 APPROACH 2: CONSTANT-SPACE LEVEL COUNTER (DEPTH TRACKING PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Integer-Based Depth/Level Counting Optimization (Stack Elimination)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Eliminating Array Allocation Overhead: The core physical mechanic of a stack (pushing and
 *   popping items) can be stripped away entirely because we only need to track the current *depth*
 *   or *nesting layer* of the brackets. Replacing the array with a primitive integer counter (`level`)
 *   optimizes memory down to a strict O(1) auxiliary space footprint.
 * - Dynamic Boundary Filtering:
 *     - For an opening bracket `(`, when `level++` increments to 1, it tells us we are at the outermost
 *       crust, so it is skipped. Any higher depth value means it belongs to the inner content.
 *     - For a closing bracket `)`, we check if `level > 1` *before* decrementing. If it is exactly 1,
 *       it signifies the outer enclosing shell closing down, safely letting us filter it out of `ans`.
 * - Clean Operator Syntax: The expression `(level > 1 ? s[i] : "")` wraps the entire conditional
 *   ternary operator perfectly inside a single bracket cluster, enforcing correct operator precedence
 *   so JavaScript executes the string concatenation correctly without dirty evaluation bugs.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total length of the string `s`. The logic runs a single sequential scan through
 *   the characters. Modifying and inspecting a standard number primitive runs in lightning-fast O(1) cycles.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Unlike Approach 1 which dynamically expands an array based on nesting depths, this method maintains
 *   only primitive variables (`level`, `i`) in memory, achieving optimal space utilization.
 */