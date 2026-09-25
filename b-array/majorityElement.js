/*
Problem statement -
Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.


Example 1:
Input: nums = [3,2,3]
Output: 3


Example 2:
Input: nums = [2,2,1,1,1,2,2]
Output: 2


Constraints:
-> n == nums.length
-> 1 <= n <= 5 * 10^4
-> -10^9 <= nums[i] <= 10^9
-> The input is generated such that a majority element will exist in the array.


Follow-up: Could you solve the problem in linear time and in O(1) space?


## Solve on leetcode -> https://leetcode.com/problems/majority-element/description/

*/

/**
 * @param {number[]} nums
 * @return {number}
 */
const majorityElement = (nums) => {
    let n = nums.length;
    let map = {};
    let target = Math.floor(n / 2);

    for (let i = 0; i < n; i++) {
        if (!map[nums[i]]) {
            map[nums[i]] = 0;
        }
        map[nums[i]]++;
    }

    for (let key in map) {
        if (map[key] > target) {
            return Number(key);
        }
    }

};

let nums = [2, 2, 1, 1, 1, 2, 2];
let result = majorityElement(nums);
console.log(result);


/*
==================================================
## Approach 1 — Hash Map / Frequency Counting
==================================================

### Logic
- Object me har number ki frequency store karo.
- `target = floor(n / 2)` calculate karo.
- Map traverse karke jis element ki frequency `target` se greater ho,
  usse return karo.

### Example
nums = [2,2,1,1,1,2,2]

Frequency:
2 → 4
1 → 3

n = 7
target = floor(7 / 2) = 3

4 > 3 → majority element = 2

### Time Complexity: O(n)
- First loop → O(n)
- Map traversal → O(k)
- `k` = number of unique elements
- Since `k <= n`, total = O(n + k) = O(n)

### Space Complexity: O(k)
- Map stores each unique element and its frequency.
- `k` = number of unique elements.
- Worst case → O(n).

*/



// Approach - 2
const majorityElement1 = (nums) => {
    let candidate = null;
    let count = 0;

    for (let num of nums) {
        if (count === 0) {
            candidate = num;
        }

        if (num === candidate) {
            count++;
        } else {
            count--;
        }
    }

    return candidate;
};

let nums1 = [3, 2, 3];
let result1 = majorityElement1(nums1);
console.log(result1);

/*
==================================================
## Approach 2 — Boyer-Moore Voting Algorithm
==================================================

### Logic
- `candidate` stores the current possible majority element.
- `count` stores its current vote/advantage.
- If `count === 0`, current element becomes the new candidate.
- Same element → `count++`
- Different element → `count--`

### Core Idea
- One majority element appears more than `n / 2` times.
- Majority element + different element can be treated as a pair
  and cancelled.
- Since majority has more occurrences, cancellation ke baad
  majority element ka candidate survive karta hai.

### Example
[2,2,1,1,1,2,2]

Pairs can be cancelled:
2 + 1 → cancel
2 + 1 → cancel
2 + 1 → cancel

One `2` remains as the majority candidate.

### Time Complexity: O(n)
- Array ko only once traverse karte hain.
- Each element is processed once.

### Space Complexity: O(1)
- Sirf `candidate` and `count` variables use hote hain.
- No Map, Object, Array, or recursion.

==================================================
## Important Interview Point
==================================================

Hash Map:
- Easy to understand.
- O(n) time.
- O(k) extra space.

Boyer-Moore:
- O(n) time.
- O(1) extra space.
- Follow-up requirement ke liye preferred.

## Key Pattern

Frequency Problem
→ Hash Map

Majority > n/2 + O(1) Space
→ Boyer-Moore Voting Algorithm

### Remember
`same → count++`
`different → count--`
`count === 0 → new candidate`
*/