/* ============================================================================
 * 🎯 GRAPH BFS TRAVERSAL (ADJACENCY LIST LEVEL-ORDER EXPLORATION)
 * ============================================================================
 * 📋 CODE SUMMARY:
 * - Implements a Breadth-First Search (BFS) algorithm over an Adjacency List graph.
 * - Explores vertices row-by-row or level-by-level using an explicit FIFO Queue.
 * - Safely protects against cyclical infinite loops using a continuous lookup Set.
 * ============================================================================
 */

/**
 * @param {Object} graph - Adjacency List representation of the graph
 * @param {string|number} start - The starting source vertex
 * @return {Array} - Sequential path list of visited nodes
 */
const bfs = (graph, start) => {
    let queue = [start];
    let visited = new Set();
    let result = [];

    // Invariant Rule: Mark the source node visited instantly upon container entry
    visited.add(start);

    while (queue.length > 0) {
        // Extract the front node of the current layer partition
        let node = queue.shift();
        result.push(node);

        // Scan all adjacent direct outgoing neighbors of the extracted node
        for (let neighbor of graph[node]) {
            // Visited Shield Check: Only register non-visited unique branches
            if (!visited.has(neighbor)) {
                visited.add(neighbor); // Mark visited IMMEDIATELY before pushing
                queue.push(neighbor);
            }
        }
    }

    return result;
};

// --- Execution & Testing ---
console.log("--- Testing Graph BFS Traversal ---");
const graph = {
    A: ["B", "C"],
    B: ["D", "E"],
    C: ["F"],
    D: [],
    E: [],
    F: []
};

const result = bfs(graph, "A");
console.log("BFS Order Path (Expected [A, B, C, D, E, F]):", result);


/* ============================================================================
 * 📂 ALGORITHMIC COMPLEXITY MATRIX (THE BFS LIMITS)
 * ============================================================================
 * | Scenario / Metrics    | Time Complexity | Space Complexity (Auxiliary)  |
 * |------------------------|-----------------|-------------------------------|
 * | Total Execution Bounds | O(V + E)        | O(V)                          |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - Time Complexity Breakdown O(V + E): Where `V` is the count of Vertices and `E`
 *   is the count of Edges. The code processes every individual vertex exactly once via
 *   queue extraction, and loops across the adjacency arrays of all nodes, exploring
 *   every connected edge link exactly once.
 * - Immediate Visited Marking: Always mark a node as visited *when pushing* into the queue,
 *   not when popping. If you wait until popping, a node linked to multiple current neighbors
 *   will be pushed into the queue multiple times, breaking the optimal O(V) space bond.
 * - Array Shift Overhead Reminder: In JavaScript, `queue.shift()` operates at O(V) time cost.
 *   For hardcore large graph scalability, a standard Doubly Linked List Queue reduces
 *   the dequeue step to a pure constant O(1) metric.
 * ============================================================================
 */
