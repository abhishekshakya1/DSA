/*
Problem statement -
Design your implementation of the linked list. You can choose to use a singly or doubly linked list.
A node in a singly linked list should have two attributes: val and next. val is the value of the current node, and next is a pointer/reference to the next node.
If you want to use the doubly linked list, you will need one more attribute prev to indicate the previous node in the linked list. Assume all nodes in the linked list are 0-indexed.


Implement the MyLinkedList class:

-> MyLinkedList() Initializes the MyLinkedList object.

-> int get(int index) Get the value of the indexth node in the linked list. If the index is invalid, return -1.

-> void addAtHead(int val) Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.

-> void addAtTail(int val) Append a node of value val as the last element of the linked list.

-> void addAtIndex(int index, int val) Add a node of value val before the indexth node in the linked list. If index equals the length of the linked list, the node will be appended to the end of the linked list. If index is greater than the length, the node will not be inserted.

-> void deleteAtIndex(int index) Delete the indexth node in the linked list, if the index is valid.


Example 1:
Input
["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"]
[[], [1], [3], [1, 2], [1], [1], [1]]
Output
[null, null, null, null, 2, null, 3]

Explanation
MyLinkedList myLinkedList = new MyLinkedList();
myLinkedList.addAtHead(1);
myLinkedList.addAtTail(3);
myLinkedList.addAtIndex(1, 2);    // linked list becomes 1->2->3
myLinkedList.get(1);              // return 2
myLinkedList.deleteAtIndex(1);    // now the linked list is 1->3
myLinkedList.get(1);              // return 3


Constraints:
-> 0 <= index, val <= 1000
-> Please do not use the built-in LinkedList library.
-> At most 2000 calls will be made to get, addAtHead, addAtTail, addAtIndex and deleteAtIndex.


## Solve on leetcode -> https://leetcode.com/problems/design-linked-list/description/

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

MyLinkedList.prototype.get = function (index) {

    if (index < 0 || index >= this.size) {
        return -1;
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
        current = current.next;
    }

    return current.val;
};

MyLinkedList.prototype.addAtHead = function (val) {
    const newNode = new Node(val);

    newNode.next = this.head;
    this.head = newNode;
    this.size++;
};

MyLinkedList.prototype.addAtTail = function (val) {
    const newNode = new Node(val);

    if (this.head === null) {
        this.head = newNode;
    } else {
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }
    this.size++;
};

MyLinkedList.prototype.addAtIndex = function (index, val) {

    if (index < 0 || index > this.size) return;
    if (index === 0) return this.addAtHead(val);
    if (index === this.size) return this.addAtTail(val);

    const newNode = new Node(val);
    let current = this.head;

    for (let i = 0; i < index - 1; i++) {
        current = current.next;
    };
    newNode.next = current.next;
    current.next = newNode;

    this.size++;
};

MyLinkedList.prototype.deleteAtIndex = function (index) {
    if (index < 0 || index >= this.size) return;
    if (index === 0) {
        this.head = this.head.next;
    } else {
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        current.next = current.next.next;
    }
    this.size--;
};

const list = new MyLinkedList();

list.addAtHead(10);
list.addAtHead(5);
list.addAtTail(20);
list.addAtIndex(2, 15);

console.log(list.head);
console.log(list.head.next.next.val);



// ============================================================================
// 6. TIME & SPACE COMPLEXITY CHEAT SHEET (DESIGN LINKED LIST)
// ============================================================================
/*
  +-------------------+-----------------+------------------+----------------------------------+

  | Method            | Time Complexity | Space Complexity | Why?                             |
  +-------------------+-----------------+------------------+----------------------------------+

  | get(index)        | O(N)            | O(1)             | Linear scan up to index.         |
  | addAtHead(val)    | O(1)            | O(1)             | Direct pointer update at head.   |
  | addAtTail(val)    | O(N)            | O(1)             | Traverses entire list to end.    |
  | addAtIndex(index) | O(N)            | O(1)             | Traverses up to (index - 1).     |
  | deleteAtIndex(idx)| O(N)            | O(1)             | Traverses up to (index - 1).     |
  +-------------------+-----------------+------------------+----------------------------------+
  *Note: N is the number of nodes currently in the linked list.
*/

// ============================================================================
// 7. COMPLEXITY DEEP DIVE (INTERVIEW EXPLANATIONS)
// ============================================================================

/**
 * 1. GET(INDEX) -> O(N) Time | O(1) Space
 * - Why O(N) Time? Unlike arrays, Linked Lists do NOT have random access.
 *   To reach the 5th element, you must starting from head and jump 5 times.
 * - Why O(1) Space? We only use one temporary pointer (`current`).
 */

/**
 * 2. ADDATHEAD(VAL) -> O(1) Time | O(1) Space
 * - Why O(1) Time? This is the superpower of Linked Lists!
 *   No shifting of elements is needed (unlike arrays). We just change 2 pointers
 *   instantly, no matter how big the list is.
 */

/**
 * 3. ADDATTAIL(VAL) -> O(N) Time | O(1) Space
 * - Why O(N) Time? Since we only keep track of `this.head`, we don't know where
 *   the tail is. We have to run a while loop to scan all N elements to reach the end.
 *   (TRICK: If we maintained a `this.tail` pointer in constructor, this would become O(1)!)
 */

/**
 * 4. ADDATINDEX / DELETEATINDEX -> O(N) Time | O(1) Space
 * - Why O(N) Time? To insert or delete at a middle position, the pointer manipulation
 *   takes O(1) time, BUT finding that position requires traversing up to (index - 1),
 *   which takes O(N) time in the worst case.
 */



// ============================================================================
// 8. THE GOLDEN POINTER RULES (NO MORE CONFUSION Cheat Sheet)
// ============================================================================

/**
 * 🚨 THE ULTIMATE RULE:
 * "Pehle naye node ka AAGE ka rishta jodo, phir PICHE waale node ka pointer todo."
 * Agar aapne piche waale ka pointer pehle tod diya, toh aage ki poori list hawa me
 * gayab (lost in memory) ho jayegi!
 */


// 🖼️ VISUAL CHECKLIST 1: INSERTION AT HEAD (addAtHead)
// Target: [newNode] ko list ke shuru me lagana hai.
// Correct Order:
//   1. newNode.next = this.head;  -> (Naye node ne purani train ko pakad liya)
//   2. this.head = newNode;       -> (Ab engine/head naye node par shift ho gaya)
//
// ❌ WRONG Order (Why it crashes):
//   1. this.head = newNode;       -> (Purani list ka address hum bhool gaye!)
//   2. newNode.next = this.head;  -> (newNode apne aap ko hi point karne laga -> Infinite Loop!)


// 🖼️ VISUAL CHECKLIST 2: INSERTION IN MIDDLE (addAtIndex)
// Target: [current] aur [current.next] ke beech me [newNode] ko fasaana hai.
// Correct Order:
//   1. newNode.next = current.next; -> (Naye node ne aage waale dabba ka haath pakda)
//   2. current.next = newNode;      -> (Pichle dabbe ne apna haath naye node ko de diya)
//
// ❌ WRONG Order (Why it crashes):
//   1. current.next = newNode;      -> (current aur aage ki list ka rishta toot gaya!)
//   2. newNode.next = current.next; -> (current.next ab khud newNode hai, so Infinite Loop!)


// ============================================================================
// 9. STEP-BY-STEP ALGORITHM TO AVOID POINTER ERRORS
// ============================================================================

/*
  Jab bhi LeetCode par pointer ghumana ho, dimag me ye 4 steps chalao:

  Step 1: Target dhundo (Find the Spot)
          - Insertion/Deletion ke liye hamesha (index - 1) par ruko.
          - Is node ko `current` naam de do.

  Step 2: Backup banao (Secure the Future)
          - Agar aage ki list khone ka darr ho, toh use ek temporary variable
            me store kar lo: `let nextNode = current.next;`

  Step 3: New Connection jodo (Bridge the Gap)
          - Naye node ke `.next` ko aage waali bachi hui list se connect karo.

  Step 4: Old Connection todo (Cut the Old Tie)
          - Ab pichle node ke `.next` ko badal kar naye node par set kar do.
*/
