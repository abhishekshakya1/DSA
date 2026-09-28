/*
Problem statement -
Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.


Example 1:
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.


Example 2:
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9


Example 3:
Input: nums = [1,0,1,2]
Output: 3


Constraints:
-> 0 <= nums.length <= 10^5
-> -10^9 <= nums[i] <= 10^9


## Solve on leetcode -> https://leetcode.com/problems/longest-consecutive-sequence/description/

*/


/**
 * @param {number[]} nums
 * @return {number}
 */
const longestConsecutive = (nums) => {
    let set = new Set(nums);
    let longestSequence = 0;

    for (let num of set) {
        // num is the starting point only if num - 1 doesn't exist

        if (!set.has(num - 1)) {
            let currentNum = num;
            let currentSequence = 1;

            // keep checking next consecutive numbers
            while (set.has(currentNum + 1)) {
                currentNum++;
                currentSequence++;
            }
            longestSequence = Math.max(longestSequence, currentSequence);
        }
    }
    return longestSequence;
};

let nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1];
let result = longestConsecutive(nums);
console.log(result);


/*

## Approach — Hash Set + Sequence Start Detection

- Array ke elements ko `Set` me store karo.
- `Set` ka use O(1) average lookup ke liye hota hai.
- Har number ke liye check karo:
    `num - 1` Set me exist karta hai ya nahi.

- Agar `num - 1` exist karta hai:
    → `num` sequence ka starting point nahi hai.
    → Skip karo.

- Agar `num - 1` exist nahi karta:
    → `num` sequence ka starting point hai.
    → `num + 1`, `num + 2`, `num + 3`...
      check karke current sequence ki length find karo.

- Finally, maximum sequence length return karo.

## Example

nums = [100, 4, 200, 1, 3, 2]

Set = {100, 4, 200, 1, 3, 2}

Starting point:
1 → because 0 doesn't exist.

Sequence:
1 → 2 → 3 → 4

Length = 4

Answer = 4

## Why `num - 1` check?

Without this check:

1 → 2 → 3 → 4
2 → 3 → 4
3 → 4
4

Same sequence repeatedly traverse hogi.

With:

`num - 1` exists → SKIP
`num - 1` doesn't exist → START sequence

So each consecutive sequence is traversed only from its starting point.

## Time Complexity: O(n) Average
- Set creation → O(n) average.
- `Set.has()` → O(1) average.
- Sequence traversal is performed only from sequence starting points.
- Therefore overall average time complexity = O(n).

## Space Complexity: O(n)
- Set stores the elements.
- In the worst case, all elements can be unique.
- Therefore extra space = O(n).

## Interview Points
- Unsorted array + longest consecutive sequence
  → Think Hash Set.
- Array order does not matter.
- Duplicates don't affect the sequence because Set removes duplicates.
- `num - 1` check prevents repeated traversal.
- Do NOT sort if O(n) time is required because sorting takes O(n log n).

## Key Pattern

Hash Set
    ↓
Find Sequence Start
    ↓
`num - 1` does NOT exist
    ↓
Check `num + 1`, `num + 2`, ...
    ↓
Count Current Sequence
    ↓
Track Maximum

## Key Insight

Only start counting when `num` is the beginning
of a consecutive sequence.

`num - 1` exists → Skip
`num - 1` doesn't exist → Start

## Pattern Recognition

Unsorted Array
+ Consecutive Numbers
+ O(n) requirement
→ Hash Set + Sequence Start Detection
*/
