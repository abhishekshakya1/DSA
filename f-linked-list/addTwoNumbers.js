/*
Problem statement -
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.



Example 1:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Example 2:
Input: l1 = [0], l2 = [0]
Output: [0]

Example 3:
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]


Constraints:
-> The number of nodes in each linked list is in the range [1, 100].
-> 0 <= Node.val <= 9
-> It is guaranteed that the list represents a number that does not have leading zeros.


## Solve on leetcode -> https://leetcode.com/problems/add-two-numbers/description/

*/

const addTwoNumbers = (l1, l2) => {

    let dummy = new ListNode(0);
    let curr = dummy;
    let carry = 0;

    while (l1 || l2 || carry) {

        let sum = (l1?.val || 0) + (l2?.val || 0) + carry;
        carry = Math.floor(sum / 10);
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        l1 = l1?.next;
        l2 = l2?.next;
    }
    return dummy.next;
}


// ============================================================================
// 29. LEETCODE 2: ADD TWO NUMBERS (DYNAMIC LINKING & OPTIONAL CHAINING)
// ============================================================================

/**
 * 💡 TECHNIQUE NAME: Dummy Head with Optional Chaining Flow
 *
 * 🧠 THE CORE CONCEPT:
 * - Use a Dummy Node to build the new sum list dynamically without worry about the new head.
 * - The `while` loop runs as long as there is ANY digit left in l1, l2, OR a remaining `carry`.
 * - 🌟 JAVASCRIPT TRICK: Use optional chaining (`l1?.val || 0`) to handle unequal list lengths
 *   smoothly. If a list ends early, it defaults to 0 instead of throwing a null pointer crash.
 * - Calculate Math.floor(sum / 10) for carry, and sum % 10 for the current node's value.
 *
 * 📌 TIME COMPLEXITY: O(max(N, M)) -> Where N and M are the lengths of l1 and l2.
 * 📌 SPACE COMPLEXITY: O(max(N, M)) -> Required to store the new resultant linked list.
 */
