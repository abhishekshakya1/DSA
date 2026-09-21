/*
🎯 SHORTEST PATH IN AN UNWEIGHTED GRAPH (SINGLE SOURCE BFS DISTANCE TRACKING)
*/

const shortestDistance = (graph, src) => {
    let n = graph.length;
    let dist = new Array(n).fill(Infinity);
    dist[src] = 0;

    let q = [src];
    while (q.length) {
        let curr = q.shift();
        for (let neighbor of graph[curr]) {
            if (dist[neighbor] === Infinity) {
                dist[neighbor] = dist[curr] + 1;
                q.push(neighbor);
            }
        }
    }
    return dist;
};


const graph = [
    [1, 2],   // 0
    [3],      // 1
    [4],      // 2
    [5],      // 3
    [3],      // 4
    []        // 5
];

let result = shortestDistance(graph, 0);
console.log(result);


/* ============================================================================
 * 📂 APPROACH 1: ITERATIVE LEVEL-ORDER BFS WITH INFINITY ARRAY SHIELDING
 * ============================================================================
 * | Scenario / Metrics    | Time Complexity | Space Complexity (Auxiliary)  |
 * |------------------------|-----------------|-------------------------------|
 * | Total Execution Bounds | O(V + E)        | O(V)                          |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - Why BFS over DFS for Shortest Path? DFS dives deep blindly down a single path, meaning
 *   it can discover a destination via a highly convoluted long route first, forcing recalculations.
 *   BFS sweeps outward spherically, ensuring the path length discovered first is the absolute minimum.
 * - The Dual-Value Trick: Using `dist[neighbor] === Infinity` completely removes the need to create
 *   an explicit `visited = new Set()` block, saving extra hashing operations.
 * - Unweighted Limitation Reminder: Always clearly specify to your interviewer that this strict
 *   level-counting rule breaks down if the graph has varied weights. For weighted configurations,
 *   you must migrate to algorithms like Dijkstra's or Bellman-Ford.
 * ============================================================================
 */
