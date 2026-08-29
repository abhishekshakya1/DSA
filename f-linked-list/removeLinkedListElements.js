/*
Problem statement -
Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.



Example 1:
Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]

Example 2:
Input: head = [], val = 1
Output: []

Example 3:
Input: head = [7,7,7,7], val = 7
Output: []


Constraints:
-> The number of nodes in the list is in the range [0, 104].
-> 1 <= Node.val <= 50
-> 0 <= val <= 50


## Solve on leetcode -> https://leetcode.com/problems/remove-linked-list-elements/description/

*/

const removeLinkedListElements = (head, val) => {

    let sentinel = new ListNode(0, head);
    let current = sentinel;

    while (current && current.next) {
        if (current.next.val === val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    return sentinel.next;
}


// ============================================================================
// 24. LEETCODE 203: REMOVE LINKED LIST ELEMENTS (DUMMY/SENTINEL PATTERN)
// ============================================================================

/**
 * 💡 TECHNIQUE NAME: Sentinel Node / Dummy Node Pattern
 *
 * 🧠 THE CORE CONCEPT:
 * - Create a temporary fake node (Sentinel) and point its `.next` to the real head.
 * - This completely removes edge cases where the head node itself needs to be deleted.
 * - Always use an `else` block for shifting the pointer (`curr = curr.next`). If you
 *   delete a node, do NOT move forward immediately, because the NEXT node needs to be checked too!
 *
 * 📌 TIME COMPLEXITY: O(N) -> Single pass verification.
 * 📌 SPACE COMPLEXITY: O(1) -> Only one extra dummy node is created.
 *
 * 🚨 REVISION TRICK:
 * "Whenever you need to modify, delete, or merge nodes where the HEAD might change,
 * put a Dummy Guard at the front. It makes the code clean and bug-free."
 */
