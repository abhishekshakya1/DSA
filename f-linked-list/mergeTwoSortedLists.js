/*
Problem statement -
You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

Example 1:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]


Example 2:
Input: list1 = [], list2 = []
Output: []


Example 3:
Input: list1 = [], list2 = [0]
Output: [0]


Constraints:
-> The number of nodes in both lists is in the range [0, 50].
-> -100 <= Node.val <= 100
-> Both list1 and list2 are sorted in non-decreasing order.


## Solve on leetcode -> https://leetcode.com/problems/merge-two-sorted-lists/description/

*/

const mergeTwoLists = (list1, list2) => {

    if (!list1) return list2;
    if (!list2) return list1;

    let dummy = new ListNode(0);
    let curr = dummy;
    while (list1 && list2) {

        if (list1.val < list2.val) {
            curr.next = list1;
            list1 = list1.next;
        } else {
            curr.next = list2;
            list2 = list2.next;
        }
        curr = curr.next
    }
    curr.next = list1 !== null ? list1 : list2;
    return dummy.next;
}


// ============================================================================
// 32. LEETCODE 21: MERGE TWO SORTED LISTS (POINTER LINKING PATTERN)
// ============================================================================

/**
 * 🚨 THE POINTER LINKING TRICK:
 * - Unlike "Add Two Numbers", we do NOT create new nodes here. We just splice
 *   and rearrange the existing nodes of list1 and list2.
 * - Always run the loop with `while (list1 && list2)`. The moment ONE list ends,
 *   stop the loop immediately.
 * - 💡 O(1) OPTIMIZATION: Instead of traversing the remaining nodes of the longer list,
 *   directly attach the surviving list using `curr.next = list1 ? list1 : list2;`
 *
 * 📌 TIME COMPLEXITY: O(N + M) -> Standard linear time comparison.
 * 📌 SPACE COMPLEXITY: O(1) -> In-place splicing, no extra nodes created.
 */
