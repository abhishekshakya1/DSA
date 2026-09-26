/*
Problem statement -
Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.


Example 1:
Input: nums = [1,2,3,1]
Output: true
Explanation:
The element 1 occurs at the indices 0 and 3.


Example 2:
Input: nums = [1,2,3,4]
Output: false
Explanation:
All elements are distinct.


Example 3:
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true


Constraints:
-> 1 <= nums.length <= 10^5
-> -10^9 <= nums[i] <= 10^9


## Solve on leetcode -> https://leetcode.com/problems/contains-duplicate/description/

*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = (nums) => {
    let set = new Set();

    if (nums.length <= 1) return false;

    for (let num of nums) {
        if (set.has(num)) {
            return true;
        }
        set.add(num);

    }
    return false;
};

let nums = [1, 3, 4, 2];
let result = containsDuplicate(nums);
console.log(result);


/*

## Approach — Hash Set

- Hume sirf check karna hai ki koi element repeat ho raha hai ya nahi.
- Frequency store karne ki zarurat nahi hai.
- `Set` me already visited elements store karo.
- Agar current element `Set` me already present hai:
  → duplicate mil gaya → return `true`.
- Agar present nahi hai:
  → `Set` me add karo.
- Puri array traverse karne ke baad duplicate nahi mila:
  → return `false`.

## Example

nums = [1, 2, 3, 1]

Set:
1 → add
2 → add
3 → add
1 → already exists → true

## Time Complexity: O(n) Average
- Array ko maximum ek baar traverse karte hain.
- `Set.has()` and `Set.add()` average O(1) operations hain.
- Worst case me O(n) elements process honge.

## Space Complexity: O(k)
- `Set` unique elements store karta hai.
- `k` = number of unique elements.
- Worst case me saare elements unique ho sakte hain:
  → O(n).

## Why Set instead of Map?
- Map frequency/count store karta hai.
- Is problem me hume frequency nahi chahiye.
- Sirf existence check karna hai.
- Therefore, `Set` is more appropriate.

## Interview Points
- Duplicate existence problem → think Hash Set.
- Duplicate milte hi immediately return `true`.
- No need for frequency counting.
- If loop completes → no duplicate → `false`.

## Key Pattern

Array + Duplicate Check
→ Hash Set
→ `has()` → check
→ `add()` → store
*/
