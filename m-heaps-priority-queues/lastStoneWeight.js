/*
Problem statement -
You are given an array of integers stones where stones[i] is the weight of the ith stone.

We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:

-> If x == y, both stones are destroyed, and

-> If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.

At the end of the game, there is at most one stone left.

Return the weight of the last remaining stone. If there are no stones left, return 0.


Example 1:
Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation:
We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of the last stone.


Example 2:
Input: stones = [1]
Output: 1


Constraints:
-> 1 <= stones.length <= 30
-> 1 <= stones[i] <= 1000


## Solve on leetcode -> https://leetcode.com/problems/last-stone-weight/description/

*/

/**
 * @param {number[]} stones
 * @return {number}
 */

const lastStoneWeight = (stones) => {
    let pq = new MaxPriorityQueue();
    for (let i = 0; i < stones.length; i++) {
        pq.enqueue(stones[i]);
    }

    while (pq.size() > 1) {
        let y = pq.dequeue();
        let x = pq.dequeue();

        if ((y - x) > 0) {
            pq.enqueue(y - x);
        }
    }
    return pq.dequeue() || 0;
};


/* ============================================================================
 * 📂 APPROACH 1: GREEDY HEAP SIMULATION WITH ABSOLUTE EXTRACTIONS
 * ============================================================================
 * | Metrics Matrix        | Complexity Limits  | Rationale                     |
 * |-----------------------|--------------------|-------------------------------|
 * | Time Complexity       | O(N log N)         | Initial build + N heap operations |
 * | Space Complexity      | O(N)               | Storing input elements in heap |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - Dynamic Extremum Search: Naively sorting the collection after every smash
 *   cycles down to a slow \(O(N^2 \log N)\) process. A Max-Heap dynamically provides
 *   the top two maximum elements in optimal \(O(\log N)\) extraction blocks.
 * - The `|| 0` Edge Case Safeguard: When given inputs like `[2, 2]`, the loop
 *   empties out the queue completely. Checking `pq.dequeue() || 0` guarantees a
 *   clean scalar `0` returns safely instead of throwing reference failures.
 * - LeetCode Platform Syntax Tip: If running directly inside official LeetCode
 *   sandboxes, remember that their native preloaded queue wrappers might require
 *   reading values via `pq.dequeue().element` based on library updates.
 * ============================================================================
 */