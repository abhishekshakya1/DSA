/*
Problem statement - You are given the head of a singly linked-list. The list can be represented as:
L0 → L1 → … → Ln - 1 → Ln

Reorder the list to be on the following form:
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …

You may not modify the values in the list's nodes. Only nodes themselves may be changed.


Example 1:
Input: head = [1,2,3,4]
Output: [1,4,2,3]


Example 2:
Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]


Constraints:
-> The number of nodes in the list is in the range [1, 5 * 10^4].
-> 1 <= Node.val <= 1000


## Solve on leetcode -> https://leetcode.com/problems/reorder-list/description/

*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
const reorderList = (head) => {
    // step 1: find middle
    let slow = head;
    let fast = head;

    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // split list
    let second = slow.next;
    slow.next = null;

    // step 2: Reverse second half
    let prev = null;
    let curr = second;

    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    // step 3: Merge two halves
    let first = head;
    second = prev;

    while (second) {
        let firstNext = first.next;
        let secondNext = second.next;

        first.next = second;
        second.next = firstNext;

        first = firstNext;
        second = secondNext;
    }
};



/*

==================================================
## Approach — 3 Steps
==================================================

### Step 1 — Find Middle
- Slow and Fast pointers use karo.
- `slow` 1 step move karta hai.
- `fast` 2 steps move karta hai.
- Jab fast end par pahunchta hai, slow middle ke paas hota hai.

### Step 2 — Reverse Second Half
- Middle ke baad wali list ko reverse karo.
- Example:

1 → 2 → 3 | 4 → 5

Reverse:

1 → 2 → 3    5 → 4

### Step 3 — Merge Alternately
First half aur reversed second half ko alternate merge karo.

1 → 2 → 3
5 → 4

↓

1 → 5 → 2 → 4 → 3

==================================================
## Why Reverse the Second Half?
==================================================

Hume last node ko pehle lana hai.

Original second half:
4 → 5

Reverse:
5 → 4

Ab first aur second half ko alternate merge karna easy hai.

==================================================
## Time Complexity: O(n)
==================================================

- Middle find karna → O(n)
- Second half reverse karna → O(n)
- Dono halves merge karna → O(n)

Total:
O(n) + O(n) + O(n)
= O(n)

Har node ko constant number of times process karte hain.

==================================================
## Space Complexity: O(1)
==================================================

- Koi extra array/list nahi banayi.
- Sirf pointers use kiye:
  `slow`, `fast`, `prev`, `curr`, etc.
- Existing linked-list nodes ko hi rearrange kiya.

Therefore:
O(1) extra space.

==================================================
## Interview Points
==================================================

- Linked List + reorder from both ends
  → Think: Middle + Reverse + Merge.
- Slow/Fast pointers se middle find karo.
- Second half ko reverse karo.
- First aur reversed second half ko alternate merge karo.
- Nodes ko copy nahi karna; existing nodes ke links change karne hain.
- Ye problem in-place linked-list manipulation ka important pattern hai.

==================================================
## Key Pattern
==================================================

Linked List
    ↓
Find Middle
    ↓
Split
    ↓
Reverse Second Half
    ↓
Merge Alternately
    ↓
Reordered List

## Important Linked List Patterns

Middle of List
→ Slow + Fast Pointer

Reverse List
→ Prev + Curr + Next

Rearrange/Merge
→ Two Pointers

==================================================
## Core Insight
==================================================

Agar list ko:

L0 → L1 → L2 → ... → Ln

se

L0 → Ln → L1 → Ln-1 → ...

banana hai, to:

1. List ko half me divide karo.
2. Second half reverse karo.
3. Dono halves ko alternate merge karo.

This converts a difficult "reorder" problem
into 3 standard Linked List operations.
*/