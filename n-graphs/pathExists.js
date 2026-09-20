/*
problem statement -
There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive). The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.

You want to determine if there is a valid path that exists from vertex source to vertex destination.

Given edges and the integers n, source, and destination, return true if there is a valid path from source to destination, or false otherwise.



Example 1:
Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
Output: true
Explanation: There are two paths from vertex 0 to vertex 2:
- 0 → 1 → 2
- 0 → 2


Example 2:
Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
Output: false
Explanation: There is no path from vertex 0 to vertex 5.


Constraints:
-> 1 <= n <= 2 * 10^5
-> 0 <= edges.length <= 2 * 10^5
-> edges[i].length == 2
-> 0 <= ui, vi <= n - 1
-> ui != vi
-> 0 <= source, destination <= n - 1
-> There are no duplicate edges.
-> There are no self edges.


## Solve on leetcode -> https://leetcode.com/problems/find-if-path-exists-in-graph/description/

*/

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */

const validPath = (n, edges, source, destination) => {
    if (source === destination) return true;

    let map = {};
    for (let [x, y] of edges) {
        if (!map[x]) {
            map[x] = [];
        }

        if (!map[y]) {
            map[y] = [];
        }

        map[x].push(y);
        map[y].push(x);
    }

    let q = [source];
    let visited = new Set();
    visited.add(source);

    while (q.length) {
        let curr = q.shift();
        if (curr === destination) {
            return true;
        }
        for (let neighbor of map[curr]) {
            if (!visited.has(neighbor)) {
                q.push(neighbor);
                visited.add(neighbor);
            }
        }
    }
    return false;
};



/* ============================================================================
 * 📂 APPROACH 1: ADJACENCY MAP CONSTRUCTION PAIRED W/ BFS SCANNING
 * ============================================================================
 * | Metrics Matrix        | Complexity Limits  | Rationale                     |
 * |-----------------------|--------------------|-------------------------------|
 * | Time Complexity       | O(V + E)           | Building graph O(E) + BFS scan O(V+E) |
 * | Space Complexity      | O(V + E)           | Storing entries in map + visited Set   |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - The Single Node Trap: Always address the `source === destination` edge case up front.
 *   Without this shortcut guard, graphs containing detached single elements with empty edge pools
 *   will reference `undefined` pointers inside iterator scopes, triggering execution faults.
 * - Bidirectional Link Wrapping: Because the problem states that the graph is undirected,
 *   every connection pair `[x, y]` requires pushing pointers symmetrically (`map[x].push(y)` AND `map[y].push(x)`).
 * - Target Pruning Optimization: Placing the destination validation evaluation immediately upon
 *   dequeue halts execution frames the very millisecond a valid connectivity path is found.
 * ============================================================================
 */



const validPath1 = (n, edges, source, destination) => {
    if (source === destination) return true;

    let map = {};
    for (let [x, y] of edges) {
        if (!map[x]) {
            map[x] = [];
        }

        if (!map[y]) {
            map[y] = [];
        }

        map[x].push(y);
        map[y].push(x);
    }

    let visited = new Set();
    const dfs = (curr) => {
        if (curr === destination) {
            return true;
        }
        visited.add(curr);
        for (let neighbor of map[curr]) {
            if (!visited.has(neighbor)) {
                if (dfs(neighbor)) {
                    return true;
                }
            }
        }
        return false;
    }
    return dfs(source);
};


/* ============================================================================
 * 📂 APPROACH 2: RECURSIVE DFS WITH RECURSIVE EARLY PRUNING
 * ============================================================================
 * | Metrics Matrix        | Complexity Limits  | Rationale                     |
 * |-----------------------|--------------------|-------------------------------|
 * | Time Complexity       | O(V + E)           | Building graph O(E) + DFS scan O(V+E) |
 * | Space Complexity      | O(V + E)           | Map space + O(V) recursion stack depth|
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - Sibling Sync Name Constraint: Inside your custom file index, make sure this
 *   method uses a distinct identifier like `validPath1` to safely distinguish it
 *   from your previous BFS version, satisfying strict repository clean-coding rules.
 * - Call Stack Depth Overhead: Unlike BFS which uses an explicit heap-allocated queue,
 *   DFS relies on the implicit system call stack. In the absolute worst case (a long single-line
 *   skewed graph path), the call stack depth scales directly to O(V).
 * - Early Return Cascading: Writing `if (dfs(neighbor)) return true;` ensures that the moment
 *   the deep leaf node hits the destination, it doesn't just stop locally—it instantly causes
 *   every parent function frame on the stack to collapse and return `true` immediately.
 * ============================================================================
 */