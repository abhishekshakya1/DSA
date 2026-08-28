/**
 * ============================================================================
 *                    LINKED LIST DATA STRUCTURE NOTES
 * ============================================================================
 *
 * 1. WHAT IS A LINKED LIST?
 *    - A linear data structure where elements are not stored in contiguous
 *      memory locations.
 *    - Elements are linked using pointers/references.
 *    - It consists of nodes, where each node contains:
 *      a) Data (the value).
 *      b) Next pointer (address to the next node).
 *
 * 2. LINKED LIST VS ARRAY
 *    +-------------------------+--------------------+-----------------------+
 *    | Feature                 | Array              | Linked List           |
 *    +-------------------------+--------------------+-----------------------+
 *    | Memory Allocation       | Contiguous         | Non-contiguous        |
 *    | Size                    | Fixed              | Dynamic               |
 *    | Insertion/Deletion      | Costly (Shifting)  | Fast (O(1) pointers)  |
 *    | Random Access           | Allowed (O(1))     | Not Allowed (O(N))    |
 *    +-------------------------+--------------------+-----------------------+
 *
 * 3. TYPES OF LINKED LISTS
 *    - Singly Linked List: Each node points to the next node only.
 *    - Doubly Linked List: Each node points to both next and previous nodes.
 *    - Circular Linked List: The last node points back to the first node.
 */

// ============================================================================
// 1. NODE CLASS DEFINITION
// ============================================================================
class Node {
    constructor(data) {
        this.data = data; // Stores the actual data
        this.next = null; // Stores reference to the next node
    }
}

// ============================================================================
// 2. LINKED LIST IMPLEMENTATION
// ============================================================================
class LinkedList {
    constructor() {
        this.head = null; // First node of the list
    }

    // ========================================================================
    // OPERATIONS
    // ========================================================================

    // 1. INSERT AT THE BEGINNING (Prepend)
    // Time Complexity: O(1)
    insertAtHead(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
    }

    // 2. INSERT AT THE END (Append)
    // Time Complexity: O(N)
    insertAtTail(data) {
        const newNode = new Node(data);

        // If list is empty
        if (!this.head) {
            this.head = newNode;
            return;
        }

        // Traverse to the last node
        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = newNode;
    }

    // 3. DELETE A NODE BY VALUE
    // Time Complexity: O(N)
    deleteValue(value) {
        if (!this.head) return;

        // If head node itself holds the value to be deleted
        if (this.head.data === value) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next !== null && current.next.data !== value) {
            current = current.next;
        }

        // If value was found, bypass the node
        if (current.next !== null) {
            current.next = current.next.next;
        }
    }

    // 4. SEARCH FOR A VALUE
    // Time Complexity: O(N)
    search(value) {
        let current = this.head;
        while (current !== null) {
            if (current.data === value) return true;
            current = current.next;
        }
        return false;
    }

    // 5. REVERSE THE LINKED LIST (Iterative)
    // Time Complexity: O(N), Space Complexity: O(1)
    reverse() {
        let prev = null;
        let current = this.head;
        let next = null;

        while (current !== null) {
            next = current.next; // Store next node
            current.next = prev; // Reverse current node's pointer
            prev = current;      // Move pointers one position ahead
            current = next;
        }
        this.head = prev; // Update head to final node
    }

    // 6. TRAVERSE AND PRINT LIST
    // Time Complexity: O(N)
    printList() {
        let current = this.head;
        let listValues = [];
        while (current !== null) {
            listValues.push(current.data);
            current = current.next;
        }
        console.log(listValues.join(" -> ") + " -> null");
    }
}

// ============================================================================
// 3. TESTING THE IMPLEMENTATION
// ============================================================================
const myLL = new LinkedList();

console.log("--- Inserting Elements ---");
myLL.insertAtTail(10);
myLL.insertAtTail(20);
myLL.insertAtTail(30);
myLL.insertAtHead(5);
myLL.printList(); // Output: 5 -> 10 -> 20 -> 30 -> null

console.log("\n--- Searching Element ---");
console.log("Is 20 in list?", myLL.search(20)); // Output: true
console.log("Is 50 in list?", myLL.search(50)); // Output: false

console.log("\n--- Deleting Element (20) ---");
myLL.deleteValue(20);
myLL.printList(); // Output: 5 -> 10 -> 30 -> null

console.log("\n--- Reversing List ---");
myLL.reverse();
myLL.printList(); // Output: 30 -> 10 -> 5 -> null
