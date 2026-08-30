/*
Problem statement -
Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

The first node is considered odd, and the second node is even, and so on.

Note that the relative order inside both the even and odd groups should remain as it was in the input.

You must solve the problem in O(1) extra space complexity and O(n) time complexity.


Example 1:
Input: head = [1,2,3,4,5]
Output: [1,3,5,2,4]


Example 2:
Input: head = [2,1,3,5,6,4,7]
Output: [2,3,6,7,1,5,4]


Constraints:
-> The number of nodes in the linked list is in the range [0, 10^4].
-> -10^6 <= Node.val <= 10^6


## solve on leetcode -> https://leetcode.com/problems/odd-even-linked-list/description/

*/


const oddEvenList = (head) => {

    if (!head || !head.next) return head;

    let odd = head;
    let even = head.next;
    let evenHead = even;

    while (even && even.next) {
        odd.next = odd.next.next;
        odd = odd.next;
        even.next = even.next.next;
        even = even.next;

    }
    odd.next = evenHead;
    return head;
}


// ============================================================================
// 28. LEETCODE 328: ODD EVEN LINKED LIST (POINTER SEPARATION PATTERN)
// ============================================================================

/**
 * 💡 TECHNIQUE NAME: Two-Train Separation (In-Place Rearrangement)
 *
 * 🧠 THE CORE CONCEPT:
 * - Split the original list into two separate tracks: one for ODD nodes, one for EVEN nodes.
 * - `odd` starts at head (index 1), `even` starts at head.next (index 2).
 * - Keep a backup pointer `evenHead` because we will need to attach the even list
 *   to the end of the odd list later.
 * - Loop condition `while (even && even.next)` ensures we stop exactly when the
 *   even train hits the end of the track.
 *
 * 📌 TIME COMPLEXITY: O(N) -> Single pass grouping.
 * 📌 SPACE COMPLEXITY: O(1) -> In-place pointer modifications. No extra nodes created.
 */
