/*
Problem statement -
You are given a string num, representing a large integer. Return the largest-valued odd integer (as a string) that is a non-empty substring of num, or an empty string "" if no odd integer exists.

A substring is a contiguous sequence of characters within a string.



Example 1:
Input: num = "52"
Output: "5"
Explanation: The only non-empty substrings are "5", "2", and "52". "5" is the only odd number.


Example 2:
Input: num = "4206"
Output: ""
Explanation: There are no odd numbers in "4206".


Example 3:
Input: num = "35427"
Output: "35427"
Explanation: "35427" is already an odd number.


Constraints:
-> 1 <= num.length <= 105
-> num only consists of digits and does not contain any leading zeros.


## Solve on leetcode -> https://leetcode.com/problems/largest-odd-number-in-string/description/

*/

const lrgestOddNumber = (num) => {

    let n = num.length - 1;
    for (let i = n; i >= 0; i--) {

        if (Number(num[i]) % 2 === 1) {
            return num.substring(0, i + 1);

        }
    }
      return "";
};

let num = "521";
let result = lrgestOddNumber(num);
console.log(result);


// ============================================================================
// APPROACH: BACKWARD SUBSTRING SCANNING (SAFE TYPE CONVERSION)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Reverse Linear Scan (Greedy Right-to-Left Boundary Detection)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Mathematical Math Property: Any large number is odd if and only if its absolute final
 *   digit is odd. Therefore, scanning from the back instantly gives us the largest slice boundary.
 * - Large Number Precision Trap: Avoid using heavy casting like `Number(num[i])` for large scale data.
 *   When numbers grow beyond `Number.MAX_SAFE_INTEGER`, JavaScript loses arithmetic tracking precision.
 * - 💡 HIGH-SPEED CHARACTER LOOKUP: Utilizing `"13579".includes(num[i])` checks for odd properties
 *   strictly at the character token level, bypassing arithmetic engine calculations entirely.
 * - Substring Slicing bounds: `num.substring(0, i + 1)` behaves adaptively. The ending parameter is
 *   exclusive, so adding `+1` ensures the odd character digit itself is safely contained inside the cut.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - In the worst-case scenario (all even digits or zero), the pointer scans across the entire string length N once.
 * - The `num.substring` operation takes O(N) time to slice the data and create the return payload.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - The operational tracking consumes strictly constant overhead, using only primitive counter pointers (`i`, `n`).
 * - The returned string slice takes up memory, but as Output Space, it is excluded from auxiliary tracking.
 */


