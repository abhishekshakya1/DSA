/*
Problem statement -
You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.

All of the tickets belong to a man who departs from "JFK", thus, the itinerary must begin with "JFK". If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.

-> example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].

You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.


Example 1:
Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]


Example 2:
Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.


Constraints:
-> 1 <= tickets.length <= 300
-> tickets[i].length == 2
-> fromi.length == 3
-> toi.length == 3
-> fromi and toi consist of uppercase English letters.
-> fromi != toi


## Solve on leetcode -> https://leetcode.com/problems/reconstruct-itinerary/description/

*/

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */

const findItinerary = (tickets) => {
    let graph = {};
    for (let [from, to] of tickets) {
        if (!graph[from]) {
            graph[from] = [];
        }
        graph[from].push(to);
    }

    for (let node in graph) {
        graph[node].sort();
    }

    let path = [];
    const dfs = (curr) => {
        while (graph[curr] && graph[curr].length) {
            let neighbor = graph[curr].shift();
            dfs(neighbor);
        }
        path.push(curr);
    };

    dfs("JFK");
    return path.reverse();
};

let tickets = [["JFK", "SFO"], ["JFK", "ATL"], ["SFO", "ATL"], ["ATL", "JFK"], ["ATL", "SFO"]];

let result = findItinerary(tickets);
console.log(result);


/* ============================================================================
 * 📂 APPROACH 1: POST-ORDER HIERHOLZER DFS (EULERIAN PATH FINDER)
 * ============================================================================
 * | Metrics Matrix        | Complexity Limits  | Rationale                     |
 * |-----------------------|--------------------|-------------------------------|
 * | Time Complexity       | O(E log E)         | Where E is tickets count due to sorting step |
 * | Space Complexity      | O(V + E)           | Adjacency List nodes storage + recursion call stack |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - What is an Eulerian Path? A path in a graph that visits *every single edge* exactly once.
 *   Standard DFS with a visited Set fails here because we are allowed to visit the same node (airport)
 *   multiple times, but we cannot reuse the same edge (ticket).
 * - Why Post-Order Path Stacking? If a path hits a dead-end airport early, Hierholzer's loop
 *   safely completes the other valid detours first. The dead end gets pushed onto the stack last,
 *   meaning it correctly lands at the very back of the line after the final `.reverse()`.
 * - The Destruction Shifting Trap: Using `graph[curr].shift()` runs at O(N) inside JavaScript arrays.
 *   While this passes LeetCode efficiently, optimizing this to track a reading index pointer
 *   or sorting arrays in descending order to use `.pop()` reduces edge removal to an optimal O(1).
 * ============================================================================
 */
