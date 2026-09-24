/*
Problem statement -
You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

Increment the large integer by one and return the resulting array of digits.


Example 1:
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].


Example 2:
Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
Incrementing by one gives 4321 + 1 = 4322.
Thus, the result should be [4,3,2,2].


Example 3:
Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9.
Incrementing by one gives 9 + 1 = 10.
Thus, the result should be [1,0].


Constraints:
-> 1 <= digits.length <= 100
-> 0 <= digits[i] <= 9
-> digits does not contain any leading 0's.


## Solve on leetcode -> https://leetcode.com/problems/plus-one/description/

*/

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    let n = digits.length - 1;
    for (let i = n; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    digits.unshift(1);
    return digits;
};


/*
# Plus One — Carry Propagation

## Approach
- Addition hamesha last digit se start hoti hai.
- Array ko right → left traverse karo.
- Agar digit < 9:
  → digit ko +1 karo
  → carry finish, immediately return.
- Agar digit === 9:
  → digit ko 0 karo
  → carry ko next left digit par pass karo.
- Agar saare digits 9 the:
  → loop ke baad carry = 1 hoga
  → beginning me 1 add karo.

## Example
[1, 2, 9]
→ 9 + 1 = 10
→ 9 becomes 0, carry = 1
→ 2 + 1 = 3
→ [1, 3, 0]

## Time Complexity: O(n)
- Worst case me saare digits 9 ho sakte hain.
- Is case me har digit ko ek baar process karna padega.

## Space Complexity: O(1) Extra
- Input array ko in-place modify karte hain.
- Sirf constant variables use hote hain.
- Note: all 9s case me unshift(1) elements ko shift karta hai,
  but overall complexity O(n) hi rehti hai.

## Key Pattern
Array of digits + addition
→ Right to Left traversal + Carry Propagation
*/




var plusOne1 = function (digits) {
    let n = digits.length - 1;
    let carry = 1;

    for (let i = n; i >= 0; i--) {
        let sum = digits[i] + carry;

        digits[i] = sum % 10;
        carry = Math.floor(sum / 10);
    }

    if (carry === 1) {
        digits.unshift(1);
    }

    return digits;
};


/*
# Plus One — Explicit Carry

## Approach
- `carry = 1` se start karte hain because hume number me +1 karna hai.
- Right → left traverse karte hain.
- Har position par:
    sum = current digit + carry

- Current digit:
    sum % 10

- Next position ka carry:
    Math.floor(sum / 10)

## Example
[1, 2, 9]

9 + 1 = 10
→ digit = 10 % 10 = 0
→ carry = floor(10 / 10) = 1

2 + 1 = 3
→ digit = 3
→ carry = 0

Result:
[1, 3, 0]

## Why `% 10`?
- Sum ka last digit current position par rakhne ke liye.
- Example: 17 % 10 = 7

## Why `Math.floor(sum / 10)`?
- Sum se carry nikalne ke liye.
- Example: floor(17 / 10) = 1

## Time Complexity: O(n)
- Worst case me har digit process ho sakta hai.

## Space Complexity: O(1) Extra
- Sirf `carry` aur `sum` jaise constant variables use hote hain.
- Input array ko modify karte hain.

## Interview Points
- Carry ko explicitly maintain karna is approach ka main idea hai.
- Right → left traversal important hai because carry rightmost digit se start hota hai.
- Agar final carry = 1 ho, beginning me `1` add karna padta hai.

## Key Pattern
Current Digit + Carry
→ New Digit + Next Carry
*/