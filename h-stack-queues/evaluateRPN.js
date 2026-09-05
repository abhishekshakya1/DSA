/*
Problem statement -
You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.

Evaluate the expression. Return an integer that represents the value of the expression.


Note that:

-> The valid operators are '+', '-', '*', and '/'.

-> Each operand may be an integer or another expression.

-> The division between two integers always truncates toward zero.

-> There will not be any division by zero.

-> The input represents a valid arithmetic expression in a reverse polish notation.

-> The answer and all the intermediate calculations can be represented in a 32-bit integer.



Example 1:
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9


Example 2:
Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6


Example 3:
Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22


Constraints:
-> 1 <= tokens.length <= 104
-> tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].


## Solve on leetcode -> https://leetcode.com/problems/evaluate-reverse-polish-notation/description/

*/

const evalRPN = (tokens) => {
    let stack = [];
    const map = {
        "+": (a, b) => (b + a),
        "*": (a, b) => (b * a),
        "-": (a, b) => (b - a),
        "/": (a, b) => Math.trunc(b / a),
    };

    for (let i = 0; i < tokens.length; i++) {
        if (map[tokens[i]]) {
            let a = stack.pop();
            let b = stack.pop();
            let ans = map[tokens[i]](Number(a), Number(b));
            stack.push(ans);
        } else {
            stack.push(tokens[i]);
        }
    }
    return Number(stack.pop());
};

let tokens = ["2", "1", "+", "3", "*"];
let result = evalRPN(tokens)
console.log(result);


// ============================================================================
// 📂 APPROACH 1: STACK WITH MAP DICTIONARY FUNCTION EVALUATION
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Postfix Mathematical Expression Evaluation via Object Mapping Dictionary
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Order of Operands in Stack: In Reverse Polish Notation (Postfix), operators follow their
 *   operands. When an operator is met, the first element popped from the stack represents the
 *   **Right Operand (a)**, and the second element popped represents the **Left Operand (b)**.
 *   Preserving this structure is critical for non-commutative operations like subtraction and division.
 * - Precision Truncation Rule: Standard Javascript division via `/` results in decimal floats.
 *   LeetCode constraints require rounding toward zero. Using `Math.trunc(b / a)` cleanly drops
 *   the fractional part without causing directional rounding bugs that `Math.floor` produces on negative numbers.
 * - High-Order Mapping Table: Instead of packing the core loop with nested `switch` branches or extended
 *   `if-else` blocks, mapping the mathematical tokens direct to functional expressions `(a, b) => ...`
 *   creates an expandable, declarative design pattern.
 * - Dynamic Type Cast Guard: Elements collected from the token stream are primitive strings. Explicitly
 *   wrapping inputs with `Number(a)` ensures arithmetic operations do not accidentally trigger Javascript's
 *   implicit string concatenation rules.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total count of elements within the `tokens` collection. The process iterates over
 *   the array exactly once, calling highly optimized O(1) dictionary references and array mutations.
 *
 * 📌 SPACE COMPLEXITY: O(N) [Auxiliary Space]
 * - An internal working stack tracks intermediate evaluation integers. In dense number layouts, the
 *   stack scales dynamically up to the worst-case depth threshold of N elements.
 */

