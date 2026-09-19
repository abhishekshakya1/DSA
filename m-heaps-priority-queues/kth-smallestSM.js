/*
Problem statement -
Given an n x n matrix where each of the rows and columns is sorted in ascending order, return the kth smallest element in the matrix.

Note that it is the kth smallest element in the sorted order, not the kth distinct element.

You must find a solution with a memory complexity better than O(n^2).


Example 1:
Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
Output: 13
Explanation: The elements in the matrix are [1,5,9,10,11,12,13,13,15], and the 8th smallest number is 13


Example 2:
Input: matrix = [[-5]], k = 1
Output: -5


Constraints:
-> n == matrix.length == matrix[i].length
-> 1 <= n <= 300
-> -10^9 <= matrix[i][j] <= 10^9
-> All the rows and columns of matrix are guaranteed to be sorted in non-decreasing order.
-> 1 <= k <= n^2


Follow up:
-> Could you solve the problem with a constant memory (i.e., O(1) memory complexity)?

-> Could you solve the problem in O(n) time complexity? The solution may be too advanced for an interview but you may find reading this paper fun.


## Solve on leetcode -> https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/

*/

/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */

const kthSmallest = (matrix, k) => {
    let n = matrix[0].length;
    let heap = new MinPriorityQueue(x => x.val);
    for (let i = 0; i < n; i++) {
        heap.enqueue({ val: matrix[i][0], row: i, col: 0 });
    }

    for (let count = 0; count < k - 1; count++) {
        let { val, row, col } = heap.dequeue();

        if (col + 1 < n) {
            heap.enqueue({ val: matrix[row][col + 1], row: row, col: col + 1 });
        }
    }
    return heap.dequeue().val;
};


/* ============================================================================
 * 📂 APPROACH 1: K-WAY SORTED ROW MERGING VIA POINTER TRACKING MIN-HEAP
 * ============================================================================
 * | Metrics Matrix        | Complexity Limits  | Rationale                     |
 * |-----------------------|--------------------|-------------------------------|
 * | Time Complexity       | O(X log N)         | Where X = min(N, K). Max K steps * log N |
 * | Space Complexity      | O(N)               | Heap holds at most N rows concurrently |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - K-Way Merge Analogy: Treat this matrix problem exactly like merging \(N\) pre-sorted arrays.
 *   You only need to track the leading vanguard elements across rows rather than loading the full grid.
 * - Flattening Bottleneck: Flattening the full matrix into a 1D array and sorting it takes a slow
 *   \(O(N^2 \log(N^2))\) runtime. Your min-heap setup clips runtime down to a highly optimized \(O(K \log N)\).
 * - Square Matrix Invariant: The boundary condition check `col + 1 < n` safely assumes a balanced square matrix
 *   configuration (\(N \times N\)) as provided in default problem specifications.
 * ============================================================================
 */