/*
Problem statement -
You have intercepted a secret message encoded as a string of numbers. The message is decoded via the following mapping:

"1" -> 'A'

"2" -> 'B'

...

"25" -> 'Y'

"26" -> 'Z'

However, while decoding the message, you realize that there are many different ways you can decode the message because some codes are contained in other codes ("2" and "5" vs "25").


For example, "11106" can be decoded into:

-> "AAJF" with the grouping (1, 1, 10, 6)

-> "KJF" with the grouping (11, 10, 6)

-> The grouping (1, 11, 06) is invalid because "06" is not a valid code (only "6" is valid).

Note: there may be strings that are impossible to decode.

Given a string s containing only digits, return the number of ways to decode it. If the entire string cannot be decoded in any valid way, return 0.

The test cases are generated so that the answer fits in a 32-bit integer.


Example 1:
Input: s = "12"
Output: 2
Explanation:
"12" could be decoded as "AB" (1 2) or "L" (12).


Example 2:
Input: s = "226"
Output: 3
Explanation:
"226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).


Example 3:
Input: s = "06"
Output: 0
Explanation:
"06" cannot be mapped to "F" because of the leading zero ("6" is different from "06"). In this case, the string is not a valid encoding, so return 0.


Constraints:
-> 1 <= s.length <= 100
-> s contains only digits and may contain leading zero(s).


## Solve on leetcode -> https://leetcode.com/problems/decode-ways/description/

*/

/**
 * @param {string} s
 * @return {number}
 */
const numDecodings = (s) => {
  const dp = {};

  const fn = (remS) => {
    // Base Case: An empty string represents 1 valid decoding path
    if (remS === '') return 1;

    // Return cached result if already calculated
    if (remS in dp) return dp[remS];

    const n = remS.length;
    let ans = 0;

    // Case 1: Decode One digit
    const oneDigit = remS.substring(n - 1);
    if (oneDigit !== '0') {
      ans += fn(remS.substring(0, n - 1));
    }

    // Case 2: Decode Two digits (ONLY if length >= 2)
    if (n >= 2) {
      const twoDigit = remS.substring(n - 2);
      const val = Number(twoDigit);

      if (val >= 10 && val <= 26) {
        ans += fn(remS.substring(0, n - 2));
      }
    }

    // Store in memo map
    dp[remS] = ans;
    return ans;
  };

  return fn(s);
};

let s = '226';
let result = numDecodings(s);
console.log(result);

/**
 * Problem: Decode Ways
 * Description: Find the total number of ways to decode a string of digits into letters.
 *
 * ==========================================
 * COMPLEXITY ANALYSIS:
 * ==========================================
 * Let N be the length of the string 's'.
 *
 * Time Complexity: O(N)
 * - Distinct States: The function `fn(remS)` slices the string from the left end.
 *   The length of `remS` goes from N down to 0 sequentially. Thus, there are at most N distinct states.
 * - Work per State: Inside each state, we perform string slicing (`substring`), which takes O(N) time.
 *   However, because we always chop 1 or 2 characters from the fixed end, the unique state evaluations
 *   effectively visit each index once.
 * - Total Time: O(N) with memoization.
 *
 * Space Complexity: O(N)
 * - Recursion Stack: The recursion tree goes up to a depth of N in the worst case, taking O(N) stack space.
 * - Memoization Map (dp): The `dp` object stores at most N unique substring keys, taking O(N) memory.
 * - Total Space: O(N)
 * ==========================================
 */
