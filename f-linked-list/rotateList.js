/*
Problem statement -
Given the head of a linked list, rotate the list to the right by k places.


Example 1:
Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]


Example 2:
Input: head = [0,1,2], k = 4
Output: [2,0,1]


Constraints:
-> The number of nodes in the list is in the range [0, 500].
-> -100 <= Node.val <= 100
-> 0 <= k <= 2 * 109


## Solve on leetcode -> https://leetcode.com/problems/rotate-list/description/

*/

const rotateRight = (head, k) => {
    if (!head || !head.next || k === 0) return head;

    let length = 0;
    let curr = head;
    while (curr) {
        curr = curr.next;
        length++;
    }

    k = k % length;
    if (k === 0) return head;

    let slow = head;
    let fast = head;
    for (let i = 0; i < k; i++) {
        fast = fast.next;
    }

    while (fast.next) {
        slow = slow.next;
        fast = fast.next;
    }

    let newHead = slow.next;
    slow.next = null;
    fast.next = head;

    return newHead;
}


// ============================================================================
// 36. LEETCODE 61: ROTATE LIST (TWO-POINTER GAP & HEAD BACKUP PATTERN)
// ============================================================================

/**
 * 🚨 CRITICAL ORDER BUG CAPTURED:
 * - Always store the backup of the new head `let newHead = slow.next` BEFORE
 *   breaking the connection with `slow.next = null`.
 * - If you break the connection first, `slow.next` becomes null, and you lose
 *   the reference to the rest of the list forever.
 *
 * 🧠 THE LOGIC:
 * 1. Find length and optimize k using `k = k % length`.
 * 2. Maintain a fixed gap of 'k' between fast and slow pointers.
 * 3. When fast reaches the last node, slow will be just before the rotation break-point.
 *
 * 📌 TIME COMPLEXITY: O(N) -> Two passes over the list.
 * 📌 SPACE COMPLEXITY: O(1) -> In-place pointer swapping.
 
 */
