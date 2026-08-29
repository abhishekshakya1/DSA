/*
Problem statement -
Given the head of a singly linked list, return true if it is a palindrome or false otherwise.


Example 1:
Input: head = [1,2,2,1]
Output: true

Example 2:
Input: head = [1,2]
Output: false


Constraints:
-> The number of nodes in the list is in the range [1, 10^5].
-> 0 <= Node.val <= 9


Follow up: Could you do it in O(n) time and O(1) space?


## Solve on leetcode -> https://leetcode.com/problems/palindrome-linked-list/description/

*/


// Approach 1 (Array conversion method)
// const isPalindrome = (head) => {

//     let arr = [];
//     let curr = head;
//     while (curr) {
//         arr.push(curr.val);
//         curr = curr.next;
//     }
//     let left = 0;
//     let right = arr.length - 1;
//     while (left < right) {
//         if (arr[left] !== arr[right]) {
//             return false
//         }
//         left++;
//         right--;
//     }
//     return true;
// }


// ============================================================================
// 17. LEETCODE 234: PALINDROME LINKED LIST (ARRAY CONVERSION METHOD)
// ============================================================================

/**
 * 💡 APPROACH: ARRAY CONVERSION (Brute Force / Easy Approach)
 * - Concept: Copy all node values into a standard JavaScript array.
 *   Then use the standard Two-Pointer technique (left++ and right--) to check for palindrome.
 *
 * 📌 TIME COMPLEXITY: O(N) -> Single pass to build array, and half pass to check palindrome.
 * 📌 SPACE COMPLEXITY: O(N) -> Extra memory required to store 'N' elements in the array.
 *
 * 🚨 WARNING / TRICKY PART:
 * Never forget to increment `left++` and decrement `right--` inside the loop,
 * otherwise it will cause an infinite loop and freeze the program.
 */


// Approach 2 (Floyd's Tortoise and Hare with Reversal)
const isPalindrome = (head) => {
    // finding the middle element
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // reverse the second half
    let prev = null;
    let curr = slow;
    while (curr) {
        let temp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = temp;
    }

    // compare two halves
    let first = head;
    let second = prev;
    while (second) {
        if (first.val !== second.val) return false;
        first = first.next;
        second = second.next;
    }
    return true;
}


// ============================================================================
// 16. LEETCODE 234: PALINDROME LINKED LIST (NOTES & COMPLEXITY)
// ============================================================================

/**
 * 🚨 COMMON MISTAKE:
 * Reversing the list directly modifies the original pointers in-place.
 * We cannot directly compare `prev === head` because they point to different
 * node references in memory, and the original structure is lost.
 *
 * 💡 OPTIMAL APPROACH: (Split -> Reverse Second Half -> Compare)
 * 1. Use Fast & Slow pointer to find the midpoint.
 * 2. Reverse only the second half of the Linked List.
 * 3. Compare values of the first half and reversed second half one by one.
 *
 * 📌 TIME COMPLEXITY: O(N) -> Finding middle takes N/2, Reversing takes N/2, Comparing takes N/2. Total = O(N).
 * 📌 SPACE COMPLEXITY: O(1) -> Done in-place without creating any clone or extra array.
 */
