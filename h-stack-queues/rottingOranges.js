/*
Problem statement -
You are given an m x n grid where each cell can have one of three values:

-> 0 representing an empty cell,
-> 1 representing a fresh orange, or
-> 2 representing a rotten orange.

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.



Example 1:
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4


Example 2:
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.


Example 3:
Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.


Constraints:
-> m == grid.length
-> n == grid[i].length
-> 1 <= m, n <= 10
-> grid[i][j] is 0, 1, or 2.


## Solve on leetcode -> https://leetcode.com/problems/rotting-oranges/description/

*/

const orangesRotting = (grid) => {
    let m = grid.length;
    let n = grid[0].length;
    let queue = [];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 2) {
                queue.push([i, j, 0]);
            }
        }
    }

    let maxMinutes = 0;
    while (queue.length) {
        let [x, y, level] = queue.shift();
        if ( x > 0 && grid[x - 1][y] === 1) {
            grid[x - 1][y] = 2;
            queue.push([x - 1, y, level + 1]);
        }

        if (x < m - 1 && grid[x + 1][y] === 1) {
            grid[x + 1][y] = 2;
            queue.push([x + 1, y, level + 1]);
        }

        if (y < n - 1 && grid[x][y + 1] === 1) {
            grid[x][y + 1] = 2;
            queue.push([x, y + 1, level + 1]);
        }

        if (y > 0 && grid[x][y - 1] === 1) {
            grid[x][y - 1] = 2;
            queue.push([x, y - 1, level + 1]);
        }

        maxMinutes = Math.max(level, maxMinutes);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                return -1;
            }
        }
    }
    return maxMinutes;
};

let grid = [[2, 1, 1], [1, 1, 0], [0, 1, 1]];
let result = orangesRotting(grid);
console.log(result);

// ============================================================================
// 📂 APPROACH 1: MULTI-SOURCE BREADTH-FIRST SEARCH (GRID INFRASTRUCTURE PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Multi-Source BFS Level-Order Traversal with In-Place State Mutation
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The Simultaneous Spread Mechanic: Rotting spreads in all 4 cardinal directions at the exact same
 *   time. Standard DFS fails here because it finishes one path completely before exploring others.
 *   An initial batch push of all starting rotten nodes into a single Queue simulates synchronized
 *   multi-point expansion perfectly.
 * - Layer State Tracking Tuple: Injecting the chronological time variable `[x, y, level]` directly into
 *   the queue tracking elements decouples global step math from loop variables, dynamically locking the
 *   exact timestamp to the node’s active infection cycle.
 * - In-Place Grid Invalidation: Mutating the cells directly from `1` (fresh) to `2` (rotten) eliminates
 *   the requirement for an extra `visited[][]` boolean tracking matrix. This acts as an internal guard
 *   stopping processed positions from re-entering the queue pipeline.
 * - JavaScript Array Shift Tradeoff: Using `queue.shift()` inside a linear loop triggers re-indexing
 *   overhead costing O(N) per pop operation in standard V8 engines. While completely acceptable to pass
 *   LeetCode's grid size benchmarks, production loops can scale using pointer-based object queues.
 *
 * 📌 TIME COMPLEXITY: O(M * N)
 * - Where M is the number of rows and N is the number of columns. The matrix undergoes a constant set
 *   of linear scans: once during initialization, once during the queue traversal phase where each grid cell
 *   is evaluated at most once, and once for the final validation pass.
 *
 * 📌 SPACE COMPLEXITY: O(M * N) [Auxiliary Space]
 * - In a completely filled matrix containing nothing but rotten oranges, the custom array queue instance
 *   expands dynamically to accommodate and house all M * N nodes within its structural memory footprint.
 */
