/*
Problem statement - Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.


Example 1:
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.


Example 2:
Input: height = [4,2,0,3,2,5]
Output: 9


Constraints:
-> n == height.length
-> 1 <= n <= 2 * 10^4
-> 0 <= height[i] <= 10^5


## Solve on leetcode -> https://leetcode.com/problems/trapping-rain-water/description/

*/

const trap = (height) => {
    let n = height.length;

    let maxL = [];
    maxL[0] = height[0];
    for (let i = 1; i < n; i++) {
        maxL[i] = Math.max(maxL[i - 1], height[i]);
    }

    let maxR = [];
    maxR[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        maxR[i] = Math.max(height[i], maxR[i + 1]);
    }

    let ans = 0;
    for (let i = 0; i < n; i++) {
        let waterTrapped = Math.min(maxL[i], maxR[i]) - height[i];
        ans = ans + waterTrapped;
    }
    return ans;
};

let height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
let result = trap(height);
console.log(result);

// ============================================================================
// 📂 APPROACH 1: PRE-COMPUTED PREFIX & SUFFIX MAXIMUM ARRAYS (BOUNDING WATER)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Dynamic Prefix/Suffix Height Bounding Pre-computation (Water Pillar Equation)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Bounded Containment Rule: Water cannot stay trapped on a pillar unless it is securely hemmed
 *   in by strictly taller structural walls on both its left and right sides. The absolute limit of
 *   water depth at any random index `i` is locked down by `Math.min(highest_left, highest_right)`.
 * - The Pre-computation Trade-off: Instead of scanning the whole array to find the left and right peaks
 *   for *every* element (which costs a slow $O(N^2)$), allocating two dedicated tracking arrays (`maxL` and `maxR`)
 *   pre-calculates and caches this structural metadata in two quick linear sweeps.
 * - Single-Pillar Math: Subtracting the pillar's own physical scale `height[i]` isolates the true trapped liquid
 *   capacity. Since the walls themselves are included in the peak calculation arrays, the calculation `waterTrapped`
 *   natively handles index locations sitting direct on top of crest peaks by resolving down to zero.
 * - Redundant Parameter Fix: The expression `Math.max(waterTrapped)` acts as an empty method pass in JavaScript
 *   because `Math.max` requires multiple comparative parameters. Replacing it with flat string/number addition
 *   restores standard scalar update speed.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total size of the `height` payload collection. The algorithm executes three independent
 *   linear loop passes in isolated series ($O(N) + O(N) + O(N)$), which simplifies flatly into linear execution time.
 *
 * 📌 SPACE COMPLEXITY: O(N) [Auxiliary Space]
 * - Allocates two dynamic auxiliary cache arrays (`maxL` and `maxR`) of size N to house the prefix and suffix
 *   height statistics during runtime, creating a linear space overhead profile.
 */
