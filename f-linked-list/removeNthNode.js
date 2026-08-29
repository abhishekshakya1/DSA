/*
Problem statement -
Given the head of a linked list, remove the nth node from the end of the list and return its head.


Example 1:
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]

Example 2:
Input: head = [1], n = 1
Output: []

Example 3:
Input: head = [1,2], n = 1
Output: [1]


Constraints:
-> The number of nodes in the list is sz.
-> 1 <= sz <= 30
-> 0 <= Node.val <= 100
-> 1 <= n <= sz

Follow up: Could you do this in one pass?


## Solve on leetcode -> https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/

*/


// two pass method
const removeNthFromEnd = (head, n) => {

    let sentinel = new ListNode(0, head);
    let length = 0;
    let first = head;
    while (first) {
        length++;
        first = first.next;
    }
    let prev = sentinel;
    for (let i = 0; i < length - n; i++) {
        prev = prev.next;
    }
    prev.next = prev.next.next;
    return sentinel.next;
}



// One pass method
const removeNthNodeFromEnd = (head, n) => {
    let sentinel = new ListNode(0, head);
    let first = sentinel;

    for (let i = 0; i < n; i++) {
        first = first.next;
    }

    let second = sentinel;
    while (first.next) {
        first = first.next;
        second = second.next;
    }

    second.next = second.next.next;
    return sentinel.next;
};


// ============================================================================
// 25. LEETCODE 19: REMOVE N-th NODE FROM END (ONE-PASS VS TWO-PASS)
// ============================================================================

/**
 * APPROACH 1: LENGTH COUNTING METHOD (Two-Pass)
 * - Concept: Loop 1 counts the total length. Loop 2 travels up to (length - n)
 *   to find the node just before the target, then bypasses it.
 * - Time Complexity: O(N) -> Travels the list twice.
 * - Space Complexity: O(1)
 *
 *
 *
 * APPROACH 2: THE FIXED GAP TRICK (Optimal One-Pass)
 * - Concept: Move the `first` pointer 'n' steps ahead first. This creates a fixed
 *   gap of 'n' between `first` and `second`. Then move both pointers together
 *   at the same speed. When `first.next` hits null, `second` will automatically
 *   be standing exactly one node BEFORE the target!
 * - Time Complexity: O(N) -> Travels the list exactly once.
 * - Space Complexity: O(1)
 *
 *
 *
 * 🚨 REVISION TRICK:
 * "If two people walk at the same speed, and the first person starts 'n' steps ahead,
 * when the first person reaches the end of the road, the second person will be exactly
 * 'n' steps away from the end."
 */
