/*
Problem statement -
You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.


Example 1:
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.


Example 2:
Input: height = [1,1]
Output: 1


Constraints:
-> n == height.length
-> 2 <= n <= 10^5
-> 0 <= height[i] <= 10^4


## Solve on leetcode -> https://leetcode.com/problems/container-with-most-water/description/

*/

const maxArea = (height) => {
    let i = 0;
    let j = height.length - 1;
    let maxWater = 0;

    while (i < j) {
        let area = Math.min(height[i], height[j]) * (j - i);
        maxWater = Math.max(maxWater, area);
        if (height[i] > height[j]) {
            j--;
        } else {
            i++;
        }
    }
    return maxWater;
};

let height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
let result = maxArea(height);
console.log(result);


// ============================================================================
// 📂 APPROACH 1: OPPOSING TWO-POINTERS WITH GREEDY WIDTH-HEIGHT BALANCING
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Inward Converging Two-Pointer Optimization (Greedy Boundary Shifting)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Maximizing the Area Function: The area trapped between two structural vertical pillars depends
 *   on two independent variables: **Width (`j - i`)** and **Height (`Math.min(height[i], height[j])`)**.
 *   Starting the pointers at the extreme ends (`0` and `length - 1`) initializes the search window
 *   at the absolute maximum possible width.
 * - The Shorter Line Bottleneck Invariant: The fluid holding capacity is strictly restricted by the
 *   shorter boundary line. If we shift the taller line pointer inward, the width decreases by 1, and
 *   the height either decreases or stays the same—meaning the total area can never improve. Thus, we
 *   must always greedily move the pointer pointing to the **shorter line** inward to find a taller match.
 * - Symmetrical Mismatch Tie-Break: If `height[i] === height[j]`, moving either the left or the right
 *   pointer yields equivalent mathematical trade-offs. The `else` block safely defaults this case to
 *   `i++`, gracefully compressing the interval space down without missing intermediate crest peaks.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Where N is the total number of entries in the `height` collection. The opposing boundaries march inward
 *   sequentially, ensuring that every position index is inspected exactly once in a single flat pass.
 *
 * 📌 SPACE COMPLEXITY: O(1) [Auxiliary Space]
 * - Fully space optimized. Computes the maximum volume parameters completely in-place using local primitive
 *   scalar variables (`i`, `j`, `area`, `maxWater`), demanding zero dynamic heap runtime buffer structures.
 */