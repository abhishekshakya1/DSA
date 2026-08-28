/*
Problem statement -
Given the head of a singly linked list, reverse the list, and return the reversed list.



Example 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
Input: head = [1,2]
Output: [2,1]

Example 3:
Input: head = []
Output: []


Constraints:
-> The number of nodes in the list is the range [0, 5000].
-> -5000 <= Node.val <= 5000

Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?


## SOlve on leetcode -> https://leetcode.com/problems/reverse-linked-list/description/

*/


class MyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
};

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
};

let list = new MyLinkedList();

let node1 = new Node(1);
let node2 = new Node(2);
let node3 = new Node(3);
let node4 = new Node(4);
let node5 = new Node(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

list.head = node1;
list.size = 5;
// console.log(list);

console.log("--- Reversal se pehle original list ---");

const printHelper = (head) => {
    let curr = head;
    let str = "";
    while (curr) {
        str += curr.val + " -> ";
        curr = curr.next;
    }
    console.log(str + "null");

};
printHelper(list.head);



const reverselinkedList = (head) => {
    let prev = null;
    let curr = head;

    while (curr) {
        let temp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = temp;
    }

    return prev;
};

let result = reverselinkedList(list.head);
list.head = result;
// console.log(result);
// console.log(list);

console.log("\n--- Reversal Ke Baad (list.head updated) ---");
printHelper(list.head); // Output: 5 -> 4 -> 3 -> 2 -> 1 -> null

console.log("\n--- Full List Structure (Verification) ---");
console.log(JSON.stringify(result, null, 2));


// ============================================================================
// 13. LEETCODE 206: REVERSE A LINKED LIST (NOTES & COMPLEXITY)
// ============================================================================

/**
 * 💡 TECHNIQUE NAME:
 * Three-Pointer Iterative Approach (prev, curr, temp)
 *
 * 🧠 THE CORE CONCEPT:
 * - Hum list ke elements ko apni jagah se hilaate nahi hain.
 * - Hum bas har node ke beech ke 'arrows' (pointers) ki direction ko ulta kar dete hain.
 * - `temp` variable yahan ek security guard hai jo aage ki bachi hui list ko gum hone se bachata hai.
 *
 * 📌 TIME COMPLEXITY: O(N)
 * - Why? Hum poori list ke saare N nodes par sirf ek baar jaate hain aur unka pointer badalte hain.
 *
 * 📌 SPACE COMPLEXITY: O(1)
 * - Why? Humne koi nayi list ya naye nodes nahi banaye.
 *   Humne usi list ke andar existing pointers ko modify kiya hai (In-place reversal),
 *   jiski wajah se constant extra space use hoti hai.
 */

// ============================================================================
// 14. INTERVIEW TRICK & POINTER TRACKING (Dry Run Checklist)
// ============================================================================
/*
  Har iteration ke andar ye 4 steps isi sequence me chalne chahiye:

  Step 1: `let temp = curr.next;`  -> Aage ka raasta band hone se pehle backup banao.
  Step 2: `curr.next = prev;`      -> Arrow ko piche ki taraf ghuma do.
  Step 3: `prev = curr;`           -> 'prev' pointer ko ek kadam aage badhao.
  Step 4: `curr = temp;`           -> 'curr' pointer ko backup se uthakar aage badhao.

  🚨 Loop khatam hone par `curr` hamesha null par hoga, aur aapka naya head `prev` par hoga!
*/
