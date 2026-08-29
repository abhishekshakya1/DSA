/*
Problem statement -
Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.



Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).


Example 2:
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.


Example 3:
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.


Constraints:
-> The number of the nodes in the list is in the range [0, 104].
-> -105 <= Node.val <= 105
-> pos is -1 or a valid index in the linked-list.


Follow up: Can you solve it using O(1) (i.e. constant) memory?


## Solve on leetcode -> https://leetcode.com/problems/linked-list-cycle/description/

*/


// Approach 1 using Hash Set

// const hasCycle = (head) => {
//     let seenNodes = new Set();
//     let curr = head;
//     while (curr !== null) {
//         if (seenNodes.has(curr)) {
//             return true;
//         }
//         seenNodes.add(curr);
//         curr = curr.next;
//     }
//     return false;
// };




// Approach 2 without using Hash ( Floyd's Algorithm ) --> slow and fast pointer approach

const hasCycle = (head) => {

    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            return true;
        }
    }
    return false;
};


// ============================================================================
// 15. LEETCODE 141: LINKED LIST CYCLE DETECTION (NOTES & COMPLEXITY)
// ============================================================================

/**
 * APPROACH 1: HASH SET METHOD (Brute Force)
 * - Concept: Store visited nodes in a Set. If a node repeats, cycle exists.
 * - Time Complexity: O(N)
 * - Space Complexity: O(N) -> Extra memory used by Set.
 *
 * APPROACH 2: FLOYD'S TORTOISE & HARE (Optimal)
 * - Concept: Move 'slow' by 1 step and 'fast' by 2 steps. If there is a loop,
 *   they will eventually meet at the same node.
 * - Time Complexity: O(N)
 * - Space Complexity: O(1) -> No extra space used, only pointers.
 */

// Quick Interview Trick Quote:
// "In a circular track, the faster runner will always lap/meet the slower runner."
