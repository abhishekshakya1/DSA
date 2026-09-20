/*
Problem statement -
Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, find all possible paths from node 0 to node n - 1 and return them in any order.

The graph is given as follows: graph[i] is a list of all nodes you can visit from node i (i.e., there is a directed edge from node i to node graph[i][j]).



Example 1:
Input: graph = [[1,2],[3],[3],[]]
Output: [[0,1,3],[0,2,3]]
Explanation: There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.


Example 2:
Input: graph = [[4,3,1],[3,2,4],[3],[4],[]]
Output: [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]


Constraints:
-> n == graph.length
-> 2 <= n <= 15
-> 0 <= graph[i][j] < n
-> graph[i][j] != i (i.e., there will be no self-loops).
-> All the elements of graph[i] are unique.
-> The input graph is guaranteed to be a DAG.


## Solve on leetcode -> https://leetcode.com/problems/all-paths-from-source-to-target/description/

*/

/**
 * @param {number[][]} graph
 * @return {number[][]}
 */


const allPathsSourceTarget = (graph) => {

    let end = graph.length - 1;
    let allPaths = [];

    const dfs = (curr, path) => {
        if (curr === end) {
            allPaths.push([...path]);
            return
        }

        for (let neighbor of graph[curr]) {
            path.push(neighbor);
            dfs(neighbor, path);
            path.pop();
        }
    }
    dfs(0, [0]);
    return allPaths;
};


/* ============================================================================
 * 📂 APPROACH 1: RECURSIVE DFS WITH STATE-MUTATING ARRAY BACKTRACKING
 * ============================================================================
 * | Metrics Matrix        | Complexity Limits  | Rationale                     |
 * |-----------------------|--------------------|-------------------------------|
 * | Time Complexity       | O(2^V * V)         | Max possible exponential paths * deep copy copy cost |
 * | Space Complexity      | O(V)               | System recursion call stack + path tracking depth |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - Why No Visited Set? The absolute defining rule of a *Directed Acyclic Graph* (DAG)
 *   guarantees that you cannot loop backward to hit an active ancestor node. Skipping the
 *   visited Set check cuts unnecessary array search cycles out of the system entirely.
 * - The In-Place Array Mutation Win: Avoid rewriting arguments like `dfs(neighbor, [...path, neighbor])`.
 *   That instantiates a fresh array on *every single recursive branch*, crashing your memory efficiency.
 *   The combination of `.push() -> dfs() -> .pop()` mutates a single shared array space in optimal constant O(1) time.
 * - Snapshot Isolation Rule: Array variables inside JavaScript are evaluated purely by memory references.
 *   Failing to run an explicit deep snapshot copy `[...path]` means your final array elements would
 *   dynamically update to empty frames as your backtracking steps unravel back to index 0.
 * ============================================================================
 */