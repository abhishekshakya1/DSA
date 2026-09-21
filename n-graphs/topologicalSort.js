/* Topological sort -> It is a linear ordering of nodes of a DAG(Directed Acyclic Graph) such that for every directed edge (u -> v), node u comes before v.

*/

const topologicalSortDFS = (n, graph) => {
    let ans = [];
    let visited = new Set();

    const dfs = (curr) => {
        visited.add(curr);

        for (let neighbor of graph[curr]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
        ans.push(curr);
    }

    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            dfs(i);
        }
    }

    return ans.reverse();
};

let n = 6;
let adj = [
    [],      // 0
    [],      // 1
    [3],     // 2 -> 3
    [1],     // 3 -> 1
    [0, 1],  // 4 -> 0,1
    [0, 2]   // 5 -> 0,2
];

let result = topologicalSortDFS(n, adj);
console.log(result);


/* ============================================================================
 * 📂 APPROACH 1: POST-ORDER RECURSIVE DFS TRAVERSAL WITH ARRAYS REVERSAL
 * ============================================================================
 * | Scenario / Metrics    | Time Complexity | Space Complexity (Auxiliary)  |
 * |------------------------|-----------------|-------------------------------|
 * | Total Execution Bounds | O(V + E)        | O(V)                          |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - The DAG Invariant: Always state clearly that a Topological Sort is strictly
 *   possible *only* for Directed Acyclic Graphs. Since the input is guaranteed to
 *   be a DAG, no tracking sets for cycle loops are necessary, keeping code lightweight.
 * - Post-Order Accumulation Rule: The nodes at the absolute end of the paths (sink nodes
 *   with no outgoing edges) get completed first and settle at the front of our `ans` array.
 *   Running `.reverse()` correctly flips them to the back where they belong.
 * - Component Sweep: Wrapping the invocation inside a `0` to `n-1` loop ensures that even
 *   if the DAG consists of separate disconnected course tracking systems, every vertex is
 *   fully accounted for cleanly.
 * ============================================================================
 */



/*
Kahn’s Algorithm (BFS) (Topological Sort) [DAG]
It is a linear ordering of nodes of a DAG(Directed Acyclic Graph) such that for every directed edge (u -> v), node u comes before v.

*/


const topologicalSortBFS = (n, graph) => {
    let indegree = new Array(n).fill(0);
    // console.log(indegree);

    for (let i = 0; i < n; i++) {
        for (let node of graph[i]) {
            indegree[node]++;
        }
    }
    // console.log("indegree -> ", indegree);

    let q = [];
    let ans = [];
    for (let i = 0; i < n; i++) {
        if (indegree[i] === 0) {
            q.push(i);
        }
    }

    while (q.length) {
        let curr = q.shift();
        ans.push(curr);
        for (let neighbor of graph[curr]) {
            indegree[neighbor]--;
            if (indegree[neighbor] === 0) {
                q.push(neighbor);
            }
        }
    }

    if (ans.length !== n) {
        console.log("Graph has a cycle, and topo sort is not possible");
        return [];

    }
    return ans;

};

let n1 = 6;
let adj1 = [
    [],      // 0
    [],      // 1
    [3],     // 2 -> 3
    [1],     // 3 -> 1
    [0, 1],  // 4 -> 0,1
    [0, 2]   // 5 -> 0,2
];

let result1 = topologicalSortBFS(n1, adj1);
console.log(result1);


/* ============================================================================
 * 📂 APPROACH 2: INDEGREE ARRAY MUTATION WITH ITERATIVE QUEUE WAITING LINE
 * ============================================================================
 * | Scenario / Metrics    | Time Complexity | Space Complexity (Auxiliary)  |
 * |------------------------|-----------------|-------------------------------|
 * | Total Execution Bounds | O(V + E)        | O(V)                          |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - Direct Zero Sifting: Unlike the DFS variant which builds tracking arrays from the
 *   bottom-up (requiring a final reverse action), Kahn's Algorithm operates top-down,
 *   meaning the sequence returned is already perfectly aligned source-to-sink natively.
 * - Dynamic Dependency Decoupling: The step `indegree[neighbor]--` acts as an in-place
 *   simulation of complete edge deletion, cleanly uncovering lower level nodes sequentially.
 * - The Sizing Proof: Always emphasize that if `ans.length !== n`, it is a strict proof
 *   that the graph contains a cyclic lockup, making it impossible to satisfy the sorting theorem.
 * ============================================================================
 */