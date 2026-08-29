/*
Problem statement -
Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.

For example, the following two linked lists begin to intersect at node c1:


The test cases are generated such that there are no cycles anywhere in the entire linked structure.

Note that the linked lists must retain their original structure after the function returns.

Custom Judge:
The inputs to the judge are given as follows (your program is not given these inputs):

-> intersectVal - The value of the node where the intersection occurs. This is 0 if there is no intersected node.
-> listA - The first linked list.
-> listB - The second linked list.
-> skipA - The number of nodes to skip ahead in listA (starting from the head) to get to the intersected node.
-> skipB - The number of nodes to skip ahead in listB (starting from the head) to get to the intersected node.

The judge will then create the linked structure based on these inputs and pass the two heads, headA and headB to your program. If you correctly return the intersected node, then your solution will be accepted.



Example 1:
Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
Output: Intersected at '8'
Explanation: The intersected node's value is 8 (note that this must not be 0 if the two lists intersect).
From the head of A, it reads as [4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5]. There are 2 nodes before the intersected node in A; There are 3 nodes before the intersected node in B.
- Note that the intersected node's value is not 1 because the nodes with value 1 in A and B (2nd node in A and 3rd node in B) are different node references. In other words, they point to two different locations in memory, while the nodes with value 8 in A and B (3rd node in A and 4th node in B) point to the same location in memory.


Example 2:
Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
Output: Intersected at '2'
Explanation: The intersected node's value is 2 (note that this must not be 0 if the two lists intersect).
From the head of A, it reads as [1,9,1,2,4]. From the head of B, it reads as [3,2,4]. There are 3 nodes before the intersected node in A; There are 1 node before the intersected node in B.


Example 3:
Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
Output: No intersection
Explanation: From the head of A, it reads as [2,6,4]. From the head of B, it reads as [1,5]. Since the two lists do not intersect, intersectVal must be 0, while skipA and skipB can be arbitrary values.
Explanation: The two lists do not intersect, so return null.


Constraints:
-> The number of nodes of listA is in the m.
-> The number of nodes of listB is in the n.
-> 1 <= m, n <= 3 * 104
-> 1 <= Node.val <= 105
-> 0 <= skipA <= m
-> 0 <= skipB <= n
-> intersectVal is 0 if listA and listB do not intersect.
-> intersectVal == listA[skipA] == listB[skipB] if listA and listB intersect.


Follow up: Could you write a solution that runs in O(m + n) time and use only O(1) memory?


## Solve on leetcode -> https://leetcode.com/problems/intersection-of-two-linked-lists/description/

*/


// Approach 1 (Brute force method)
const getIntersectionNodeBruteForce = (headA, headB) => {
    // Agar koi bhi ek list khali (null) hai, toh intersection ho hi nahi sakta
    if (!headA || !headB) return null;

    let currA = headA;

    // Outer Loop: List A ke ek-ek node par ek-ek karke chalenge
    while (currA !== null) {

        let currB = headB; // Har baar List B ko shuruat se scan karenge

        // Inner Loop: List B ke saare nodes ko check karenge
        while (currB !== null) {

            // 🌟 IMPORTANT: Values compare nahi kar rahe, exact reference/object compare kar rahe hain
            if (currA === currB) {
                return currA; // Dono ka memory address same milte hi return kar do
            }

            currB = currB.next; // List B mein aage badho
        }

        currA = currA.next; // List A mein aage badho
    }

    return null; // Agar poore nested loops chalne par bhi kuch nahi mila, toh no intersection
};


// ============================================================================
// 19. LEETCODE 160: INTERSECTION OF TWO LINKED LISTS (BRUTE FORCE METHOD)
// ============================================================================

/**
 * 💡 APPROACH: NESTED LOOPS (Brute Force)
 * - Concept: For every single node in List A, run a inner loop to scan all
 *   nodes in List B. Compare their memory references (`currA === currB`).
 *
 * 📌 TIME COMPLEXITY: O(N * M) -> Extremely slow for large inputs. Can cause TLE.
 * 📌 SPACE COMPLEXITY: O(1) -> Optimal space because no auxiliary data structure is used.
 *
 * 📝 REVISION TRICK:
 * This method is like checking every student of Class A with every student of Class B
 * one-by-one until you find the exact same person sitting in both classrooms.
 */




// Approach 2 (Hash Set Method)
const getIntersectionNode = (headA, headB) => {

    let set = new Set();
    while (headB) {
        set.add(headB);
        headB = headB.next;
    }

    while (headA) {
        if (set.has(headA)) return headA;
        headA = headA.next;
    }
    return null;

}


// ============================================================================
// 18. LEETCODE 160: INTERSECTION OF TWO LINKED LISTS (HASH SET METHOD)
// ============================================================================

/**
 * 🚨 THE GOLDEN INTERVIEW CONCEPT (Value vs Reference):
 * Linked List intersection means nodes share the EXACT SAME MEMORY ADDRESS,
 * not just the same value.
 * Even if List A and List B both contain a node with value '1', `set.has()`
 * returns false because they are two distinct objects located at different memory addresses.
 * Intersection happens at value '8' because that exact same node object is shared by both lists.
 *
 * 📌 TIME COMPLEXITY: O(N + M) -> Where N and M are lengths of both lists.
 * 📌 SPACE COMPLEXITY: O(M) -> Extra space used by the Hash Set to store nodes of List B.
 */




// Approach 3 (Optimal Two Pointer)
const getIntersectionNodeOptimal = (headA, headB) => {
    if (!headA || !headB) return null;

    let pA = headA;
    let pB = headB;

    // Loop continues until both pointers point to the exact same node reference
    while (pA !== pB) {

        // Move pA to next node. If it hits the end, switch to headB
        pA = (pA === null) ? headB : pA.next;

        // Move pB to next node. If it hits the end, switch to headA
        pB = (pB === null) ? headA : pB.next;
    }

    // When the loop breaks, either pA === pB (Intersection Node)
    // or both became null at the same time (No Intersection)
    return pA;
};

// ============================================================================
// 20. LEETCODE 160: INTERSECTION OF TWO LINKED LISTS (OPTIMAL TWO-POINTER)
// ============================================================================

/**
 * 💡 APPROACH: THE LENGTH-SYNC TRICK (Optimal)
 * - Concept: Create two pointers (pA, pB). Traverse both lists simultaneously.
 *   When pA reaches null, redirect it to headB. When pB reaches null, redirect it to headA.
 * - Why? This forces both pointers to travel the exact same total distance: (Length of A + Length of B).
 *   On their second lap, they align perfectly and collide at the intersection node!
 *
 * 📌 TIME COMPLEXITY: O(N + M) -> Linear time scan.
 * 📌 SPACE COMPLEXITY: O(1) -> Pure pointer manipulation. No extra space.
 *
 * 🚨 REVISION TRICK:
 * "If two people are walking on different paths at the same speed, making them swap
 * starting points when they finish ensures they will meet each other at the intersection point."
 */
