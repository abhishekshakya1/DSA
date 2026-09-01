/*
Prroblem statement -
You're given strings jewels representing the types of stones that are jewels, and stones representing the stones you have. Each character in stones is a type of stone you have. You want to know how many of the stones you have are also jewels.

Letters are case sensitive, so "a" is considered a different type of stone from "A".

Example 1:
Input: jewels = "aA", stones = "aAAbbbb"
Output: 3


Example 2:
Input: jewels = "z", stones = "ZZ"
Output: 0


Constraints:
-> 1 <= jewels.length, stones.length <= 50
-> jewels and stones consist of only English letters.
-> All the characters of jewels are unique.


## Solve on leetcode -> https://leetcode.com/problems/jewels-and-stones/description/

*/


// Approach 1
const numJewelsInStones1 = (jewels, stones) => {

    let num = 0;
    for (let i = 0; i < stones.length; i++) {

        for (let j = 0; j < jewels.length; j++) {

            if (jewels[j] === stones[i]) {
                num++;
                break;
            }
        }

    }
    return num;
};

let jewels1 = "aAb";
let stones1 = "aAAbbbb";
let result1 = numJewelsInStones1(jewels1, stones1);
console.log(result1);


// ============================================================================
// 📂 COMPREHENSIVE ARCHITECTURAL NOTES
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Nested Linear Scan (Brute-Force Cross-Reference Lookup)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Case Sensitivity: The problem specifies that characters are case-sensitive ("a" is
 *   different from "A"). Your strict equality operator (`===`) handles this perfectly.
 * - Early Break Value: The `break` keyword ensures that if a stone matches a jewel early
 *   in the `jewels` string, you immediately stop searching and jump to the next stone.
 * - Scaling Bottleneck: As the sizes of both `stones` and `jewels` grow, a nested loop
 *   forces the system to check every single combination, which slows down significantly.
 *
 * 📌 TIME COMPLEXITY: O(N * M)
 * - N is the length of the `stones` string, and M is the length of the `jewels` string.
 * - For every single stone, we potentially scan the entire list of jewels.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Excellent memory management! You are only tracking a single scalar counter variable (`count`),
 *   meaning the memory consumption remains completely constant regardless of input size.

 */




// Approach 2
const numJewelsInStones = (jewels, stones) => {
    let jSet = new Set(jewels);
    let num = 0;

    for (let s of stones) {
        if (jSet.has(s)) {
            num++
        }
    }
    return num;

};

let jewels = "aA";
let stones = "aAAbbbb";
let result = numJewelsInStones(jewels, stones);
console.log(result);


// ============================================================================
// 📂 OPTIMIZED APPROACH ARCHITECTURAL NOTES
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Hash Set Lookup Tracking (Trading Space for Time Optimization)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Power of Set.has(): Checking if a character exists in a string or array takes
 *   O(M) linear time. Checking if it exists in a JavaScript `Set` takes O(1) constant
 *   time because it uses a hash table mechanism under the hood.
 * - Flat Loop Execution: By converting the lookup pool into a Set first, we completely
 *   eliminate the nested inner loop, flattening our execution into two independent loops.
 * - The Memory Trade-Off: This is a classic engineering tradeoff. We are intentionally
 *   using extra auxiliary memory storage to achieve a massive boost in execution speed.
 *
 * 📌 TIME COMPLEXITY: O(N + M)
 * - M is the length of `jewels` (to build the Set) and N is the length of `stones`
 *   (to scan through characters). This runs drastically faster than O(N * M) for large inputs.
 *
 * 📌 SPACE COMPLEXITY: O(M) [Auxiliary Space]
 * - Unlike our brute-force solution, the auxiliary space here is NOT O(1).
 *   We allocated a temporary `jewelSet` collection that scales linearly with the number
 *   of unique characters inside the `jewels` string argument.
 
 */