/*
Problem statement -
Given the head of a singly linked list, return the middle node of the linked list.

If there are two middle nodes, return the second middle node.


Example 1:
   1 -> 2 -> 3 -> 4 -> 5 -> null
Input: head = [1,2,3,4,5]
Output: [3,4,5]
Explanation: The middle node of the list is node 3.


Example 2:
  1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
Input: head = [1,2,3,4,5,6]
Output: [4,5,6]
Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.


Constraints:
-> The number of nodes in the list is in the range [1, 100].
-> 1 <= Node.val <= 100


## Solve on leetcode -> https://leetcode.com/problems/middle-of-the-linked-list/description/

*/

const middleNode = function (head) {

    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}


// ============================================================================
// 10. LEETCODE 876: MIDDLE OF THE LINKED LIST (NOTES & COMPLEXITY)
// ============================================================================

/**
 * 💡 TECHNIQUE NAME:
 * Floyd's Tortoise and Hare Algorithm (Fast & Slow Pointer Pattern)
 *
 * 🧠 THE CORE CONCEPT:
 * - Hum do pointers lete hain: 'slow' (jo ek baar me 1 step chalta hai)
 *   aur 'fast' (jo ek baar me 2 steps chalta hai).
 * - Kyunki 'fast' ki speed 'slow' se dugni (double) hai, toh jab 'fast'
 *   list ke aakhiri (end) par pahunchega, 'slow' bilkul beech (middle) me hoga!
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Why? Hum poori list ko sirf ek hi baar traverse (scan) kar rahe hain.
 *   Fast pointer N/2 jumps leta hai, jo ki mathematically O(N) linear time hi hota hai.
 *
 * 📌 SPACE COMPLEXITY: O(1)
 * - Why? Hum koi bhi extra space ya naye nodes nahi bana rahe hain.
 *   Humne sirf do temporary pointers (`slow` aur `fast`) use kiye hain, jo constant memory lete hain.
 */

// ============================================================================
// 11. EVEN VS ODD LENGTH INTERVIEW TRICK
// ============================================================================
/*
  Aapka code `while (fast && fast.next)` dono cases ko bina kisi extra condition ke
  safely handle karta hai:

  Case 1: Odd Length List (e.g., 1 -> 2 -> 3 -> 4 -> 5 -> null)
          - Fast pointer rukega jab `fast.next === null` hoga (yaani node 5 par).
          - Slow pointer bilkul sahi node 3 par hoga.

  Case 2: Even Length List (e.g., 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null)
          - Fast pointer rukega jab `fast === null` ho jayega (yaani 6 ke bhi aage chala jayega).
          - Slow pointer node 4 par rukega.
          - LeetCode aur interviewers ko even length me hamesha second middle chahiye hota hai,
            jo aapka code automatically de deta hai!
*/

// ============================================================================
// 12. QUICK REVISION CHECKLIST FOR TWO-POINTERS
// ============================================================================
/*
  1. Hamesha loop condition me `while (fast && fast.next)` likhna zaroori hai.
  2. Agar sirf `while (fast.next)` likha toh empty list (null) par code crash ho jayega.
  3. Agar sirf `while (fast)` likha toh `fast.next.next` karne par null.next ka error aayega.
  4. Isliye dono checks (fast aur uska next) ka hona compulsory hai!
*/



