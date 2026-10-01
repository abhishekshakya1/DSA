/*
Problem statement -
Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

Do not solve it with built-in functions (i.e., like __builtin_popcount in C++).


Example 1:
Input: n = 2
Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10


Example 2:
Input: n = 5
Output: [0,1,1,2,1,2]
Explanation:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101


Constraints:
-> 0 <= n <= 10^5


Follow up:
-> It is very easy to come up with a solution with a runtime of O(n log n). Can you do it in linear time O(n) and possibly in a single pass?


## Solve on leetcode -> https://leetcode.com/problems/counting-bits/description/

*/

/**
 * @param {number} n
 * @return {number[]}
 */
const countBits = (n) => {
    const ans = new Array(n + 1);

    // Har ek number ke liye alag se bit count function chalaya
    for (let i = 0; i <= n; i++) {
        ans[i] = countOnes(i);
    }
    return ans;
};

// Helper function to count 1-bits for a single number
function countOnes(num) {
    let count = 0;
    while (num > 0) {
        count += (num & 1);  // Agar aakhiri bit 1 hai toh jodo
        num >>= 1;  // Number ko right shift karo
    }
    return count;
};

let n = 2;
let result = countBits(n);
console.log(result);


/*
==================================================
## Approach 1 — Brute Force / Bit Counting
==================================================

### Logic
- Har number `i` ke liye separately bits count karo.
- `n & 1` → last bit check.
- `num >> 1` → next bit par move.

### Why Not Optimal?
- Har number ke bits separately traverse karne pad rahe hain.
- Same type ka work repeatedly ho raha hai.
- Previous answers ka advantage nahi le rahe.

### Time Complexity: O(n log n)
- `n` numbers process hote hain.
- Har number ke liye approximately `log n` bits check hote hain.

### Space Complexity: O(n)
- Answer array ke liye O(n).
- Helper function ka recursion nahi hai, so extra auxiliary space O(1).

*/



const countBits1 = (n) => {
    let ans = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        // i >> 1 matlab number ka aadha, (i & 1) matlab aakhiri bit (0 ya 1)
        ans[i] = ans[i >> 1] + (i & 1);
    }
    return ans;
};

let n1 = 5;
let result1 = countBits1(n1);
console.log(result1);


/*
==================================================
## Approach 2 — DP using `i >> 1`
==================================================

### Core Idea
Number `i` ko right shift karne par:

`i >> 1`

→ last bit remove ho jaati hai.

Therefore:

`bits(i) = bits(i >> 1) + (i & 1)`

### Example

`5 = 101`

`5 >> 1 = 2 = 10`

Bits:
`bits(5) = bits(2) + 1`

`bits(2) = 1`

Therefore:
`bits(5) = 2`

### Why Better?
- Previous calculated result reuse kar rahe hain.
- Har number ke liye poore bits dobara traverse nahi karne padte.
- Har `i` ka answer O(1) me calculate hota hai.

### Time Complexity: O(n)
- `1` se `n` tak ek loop.
- Har iteration me O(1) operations.

### Space Complexity: O(n)
- `ans` array stores answers for all numbers.

*/



const countBits2 = (n) => {
    let ans = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        // i & (i - 1) removes the rightmost '1' bit of i
        // Hum us chote number ka count uthakar usme +1 kar dete hain
        ans[i] = ans[i & (i - 1)] + 1;
    }
    return ans;
};

let n2 = 2;
let result2 = countBits2(n2);
console.log(result2);


/*
==================================================
## Approach 3 — DP + Remove Rightmost 1 Bit ⭐
==================================================

### Core Idea

`i & (i - 1)`

→ number ka **rightmost `1` bit remove** karta hai.

Therefore:

`bits(i) = bits(i & (i - 1)) + 1`

### Example

`i = 12`

Binary:

`1100`

`i - 1 = 1011`

AND:

`1100`
`1011`
`----`
`1000`

Rightmost `1` removed.

So:

`bits(12) = bits(8) + 1`

### Why Preferred?
- Previous answer reuse hota hai.
- Har number ka answer O(1) me calculate hota hai.
- `i & (i - 1)` is an important bit-manipulation pattern.
- Bit manipulation + DP dono concepts practice hote hain.

### Time Complexity: O(n)
- Har number exactly once process hota hai.
- Each operation O(1).

### Space Complexity: O(n)
- `ans` array required hai.

*/