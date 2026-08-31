/*
Problem statement -
Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)


Example 1:
Input: head = [1,2,3,4]
Output: [2,1,4,3]

Example 2:
Input: head = []
Output: []

Example 3:
Input: head = [1]
Output: [1]

Example 4:
Input: head = [1,2,3]
Output: [2,1,3]



Constraints:
-> The number of nodes in the list is in the range [0, 100].
-> 0 <= Node.val <= 100


## Solve on leetcode -> https://leetcode.com/problems/swap-nodes-in-pairs/description/

*/


// Iterative Approach

const swapPairs = (head) => {

   if (!head || !head.next) return head;

    let dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;

    while (prev.next && prev.next.next) {

        let first = prev.next;
        let second = first.next;

        prev.next = first.next;
        first.next = second.next;

        second.next = first;
        prev = first;
    }
    return dummy.next;

};

// ============================================================================
// 37. LEETCODE 24: SWAP NODES IN PAIRS (3-POINTER LINKING PATTERN)
// ============================================================================

/**
 * 🚨 THE STRICT PAIR-SWAP SEQUENCING:
 * - When swapping [first] and [second], you must change pointers from left to right.
 * - Step 1: Connect the previous sublist to the new local head -> `prev.next = second`
 * - Step 2: Secure the remaining upcoming list boundary -> `first.next = second.next`
 * - Step 3: Complete the reverse swap link -> `second.next = first`
 * - Step 4: Advance the iterator -> `prev = first` (since first is now the tail of swapped pair).
 *
 * 📌 TIME COMPLEXITY: O(N) -> Linear one-pass swap.
 * 📌 SPACE COMPLEXITY: O(1) -> Pure pointer swapping in-place.

 */



// Recursive Approach
const swapPairs1 = (head) => {

    if (!head || !head.next) return head;

    let l = head;
    let r = head.next;

    l.next = swapPairs1(r.next);
    r.next = l;

    return r;
};

// ============================================================================
// 38. LEETCODE 24: SWAP NODES IN PAIRS (ELEGANT RECURSIVE APPROACH)
// ============================================================================

/**
 * 💡 TECHNIQUE NAME: Bottom-Up Pair Recursion
 *
 * 🧠 THE CORE CONCEPT:
 * - Solves the problem from right to left (backwards) using the Call Stack.
 * - Base Case: If the list has 0 or 1 node, it is already swapped -> return head.
 * - `l.next = swapPairs1(r.next)` makes the current left node wait until the
 *   subsequent pairs are fully swapped and returned by recursion.
 * - `r.next = l` reverses the pointer connection locally within the current pair.
 *
 * 📌 TIME COMPLEXITY: O(N) -> Single pass via recursive calls.
 * 📌 SPACE COMPLEXITY: O(N) -> Extra auxiliary space taken by the call stack for N/2 frames.
 *
 * 🚨 INTERVIEW NOTE:
 * While the Recursive way is cleaner and shorter to write, the Iterative way is
 * better for production because it uses O(1) memory instead of filling up the call stack.

 */
