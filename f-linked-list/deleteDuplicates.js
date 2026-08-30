/*
Problem statement -
Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.


Example 1:
Input: head = [1,1,2]
Output: [1,2]

Example 2:
Input: head = [1,1,2,3,3]
Output: [1,2,3]


Constraints:
-> The number of nodes in the list is in the range [0, 300].
-> -100 <= Node.val <= 100
-> The list is guaranteed to be sorted in ascending order.


## Solve on leetcode -> https://leetcode.com/problems/remove-duplicates-from-sorted-list/description/

*/

const deleteDuplicates = (head) => {

    let curr = head;

    while (curr && curr.next) {

        if (curr.val === curr.next.val) {
            curr.next = curr.next.next;
        } else {
            curr = curr.next;
        }
    }
    return head;
}



// ============================================================================
// 26. LEETCODE 83: REMOVE DUPLICATES FROM SORTED LIST (OPTIMAL IN-PLACE)
// ============================================================================

/**
 * 💡 TECHNIQUE NAME: Consecutive Duplicate Bypass Pattern
 *
 * 🧠 THE CORE CONCEPT:
 * - Since the input linked list is already SORTED, all duplicate elements are
 *   guaranteed to be next to each other.
 * - We compare `curr.val` with `curr.next.val`. If they match, we skip the next node.
 * - 🚨 CRITICAL RULE: Only move the pointer forward (`curr = curr.next`) in the `else` block.
 *   If a duplicate is deleted, stay on the same node to verify the next incoming node
 *   (handles triplicates or longer duplicate chains like 1 -> 1 -> 1).
 *
 * 📌 TIME COMPLEXITY: O(N) -> Single pass traversal.
 * 📌 SPACE COMPLEXITY: O(1) -> In-place pointer updates, no extra memory.
 
 */
