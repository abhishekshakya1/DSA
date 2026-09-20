/*
Problem statement -
Given a reference of a node in a connected undirected graph.

Return a deep copy (clone) of the graph.


Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

class Node {
    public int val;
    public List<Node> neighbors;
}


Test case format:

For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.

An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.


Example 1:
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: There are 4 nodes in the graph.
1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).


Example 2:
Input: adjList = [[]]
Output: [[]]
Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.


Example 3:
Input: adjList = []
Output: []
Explanation: This an empty graph, it does not have any nodes.


Constraints:
-> The number of nodes in the graph is in the range [0, 100].
-> 1 <= Node.val <= 100
-> Node.val is unique for each node.
-> There are no repeated edges and no self-loops in the graph.
-> The Graph is connected and all nodes can be visited starting from the given node.


## Solve on leetcode -> https://leetcode.com/problems/clone-graph/description/

*/

/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */


/**
 * @param {_Node} node
 * @return {_Node}
 */

const cloneGraph = (node) => {
    if (!node) return null;

    const q = [node];
    const visited = new Map();
    const cloneNode = new Node(node.val);
    visited.set(node, cloneNode);

    while (q.length) {
        const curr = q.shift();
        const cloneCurr = visited.get(curr);

        for (let n of curr.neighbors) {
            if (!visited.has(n)) {
                visited.set(n, new Node(n.val));
                q.push(n);
            }
            cloneCurr.neighbors.push(visited.get(n));
        }
    }
    return cloneNode;
};


/* ============================================================================
 * 📂 APPROACH 1: ITERATIVE BFS TRAVERSAL WITH REFERENCE TWIN MAPPING
 * ============================================================================
 * | Metrics Matrix        | Complexity Limits  | Rationale                     |
 * |-----------------------|--------------------|-------------------------------|
 * | Time Complexity       | O(V + E)           | V nodes queued * E edge allocations |
 * | Space Complexity      | O(V)               | Map tracks exact V node configurations |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - Deep Copy vs Shallow Copy: Merely duplicating arrays copying values creates a shallow leak.
 *   Instantiating distinct `new Node(n.val)` items inside a Map wrapper isolates memory spaces.
 * - Circular Graph Self-Reference: Graphs can loop indefinitely if left unshielded. Checking
 *   `if (!visited.has(n))` blocks the engine from repeating initialization steps on already copied nodes.
 * - Graph Synchronization Timing: Always create the replica mapping inside the loop immediately
 *   before adding to the queue. This prevents duplicate structural node footprints from leaking into active stacks.
 * ============================================================================
 */




const cloneGraph1 = (node) => {
    if (!node) return null;

    const stack = [node];
    const visited = new Map();
    const cloneNode = new Node(node.val);
    visited.set(node, cloneNode);

    while (stack.length) {
        const curr = stack.pop();
        const cloneCurr = visited.get(curr);

        for (let n of curr.neighbors) {
            if (!visited.has(n)) {
                visited.set(n, new Node(n.val));
                stack.push(n);
            }
            cloneCurr.neighbors.push(visited.get(n));
        }
    }
    return cloneNode;
};