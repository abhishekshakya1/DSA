/*
Problem statement -
Reverse bits of a given 32 bits signed integer.


Example 1:
Input: n = 43261596
Output: 964176192
Explanation:
Integer	Binary
43261596	00000010100101000001111010011100
964176192	00111001011110000010100101000000


Example 2:
Input: n = 2147483644
Output: 1073741822
Explanation:
Integer	Binary
2147483644	01111111111111111111111111111100
1073741822	00111111111111111111111111111110


Constraints:
-> 0 <= n <= 2^31 - 2
-> n is even.


Follow up: If this function is called many times, how would you optimize it?


## Solve on leetcode -> https://leetcode.com/problems/reverse-bits/description/

*/

/**
 * @param {number} n
 * @return {number}
 */

const reverseBits = (n) => {

    let binaryStr = n.toString(2);
    let paddedStr = binaryStr.padStart(32, "0");
    let reversedStr = paddedStr.split("").reverse().join("");

    return parseInt(reversedStr, 2);
};

let n = 43261596;
let result = reverseBits(n);
console.log(result);

/*
==================================================
## Approach 1 — Binary String
==================================================

### Logic
- Number → Binary String
- 32 bits complete karo using `padStart()`
- String reverse karo
- Binary → Number

### Why Not Optimal?
- Multiple string operations required.
- Bit-level problem ko strings ke through solve kar rahe hain.
- Extra conversion overhead hai.
- Conceptually bit manipulation se less direct.

### Time Complexity: O(1)
- Exactly 32 bits process hote hain.
- O(32) = O(1)

### Space Complexity: O(1)
- Maximum fixed 32-bit strings create hoti hain.
- Input size fixed hai.

*/


const reverseBits1 = (n) => {
    let result = 0;

    for (let i = 0; i < 32; i++) {
        let bit = n % 2;
        result = (result * 2) + bit;
        n = Math.floor(n / 2);
    }

    return result;
};

let n1 = 13;
let result1 = reverseBits1(n1);
console.log(result1);


/*
==================================================
## Approach 2 — Arithmetic
==================================================

### Logic
- `n % 2` → last bit extract
- `result * 2` → left shift jaisa effect
- `Math.floor(n / 2)` → next bit par move

### Why Better?
- String conversion remove ho gayi.
- Directly bits ko arithmetic se process kar rahe hain.

### Why Still Not Optimal?
- Actual bit operations ke liye `%`, `/` and `Math.floor()`
  use karna less direct hai.
- JavaScript ke bitwise operators directly bits manipulate kar sakte hain.

### Time Complexity: O(1)
- Fixed 32 iterations.
- O(32) = O(1)

### Space Complexity: O(1)
- Only constant variables.

*/


const reverseBits2 = (n) => {
    let result = 0;

    for (let i = 0; i < 32; i++) {
        result = result << 1;
        result = result | (n & 1);
        n = n >> 1;
    }

    return result >>> 0;
};

let n2 = 2147483644;
let result2 = reverseBits2(n2);
console.log(result2);

/*
==================================================
## Approach 3 — Bitwise Manipulation ⭐
==================================================

### Logic
Har iteration:

1. `n & 1`
   → Last bit extract

2. `result << 1`
   → Result ko left shift

3. `result | bit`
   → Extracted bit add

4. `n >>> 1`
   → Next bit par move

### Why Preferred?
- Directly binary bits par operate karta hai.
- No string conversion.
- No arithmetic division/modulo required.
- Problem ke actual concept ko use karta hai.
- Clean and interview-friendly.

### Time Complexity: O(1)
- Exactly 32 bits process karne hain.
- O(32) = O(1)

### Space Complexity: O(1)
- Only a few variables.
- No extra data structure.

*/

