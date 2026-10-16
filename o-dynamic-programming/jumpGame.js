/*
Problem statement -
You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.


Example 1:
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.


Example 2:
Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.


Constraints:
-> 1 <= nums.length <= 10^4
-> 0 <= nums[i] <= 10^5


## Solve on leetcode -> https://leetcode.com/problems/jump-game/description/

*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canJump = (nums) => {
    let end = nums.length - 1;
    let dp = new Array(nums.length).fill(-1);

    let dfs = (start) => {
        if (start === end) return true;

        if (dp[start] !== -1) return dp[start];

        let ans = false;

        for (let i = 1; i <= nums[start] && !ans; i++) {
            if (start + i <= end) {
                ans = ans || dfs(start + i);
            }
        }
        dp[start] = ans;
        return ans;
    }
    return dfs(0);
};

let nums = [2, 3, 1, 1, 4];
let result = canJump(nums);
console.log(result);

/*
Notes :-

-> Time Complexity = O(n2)

-> Space Complexity = O(n)
*/




// Greedy approach
const canJump1 = (nums1) => {
    let farthest = 0;
    for (let i = 0; i < nums1.length; i++) {
        if (i > farthest) return false;
        farthest = Math.max(farthest, i + nums1[i]);
    }
    return true;
}

let nums1 = [2, 3, 1, 1, 4];
let result1 = canJump1(nums1);
console.log(result1);


/*
Notes :-

-> Time Complexity = O(n)

-> Space Complexity = O(1)
*/
