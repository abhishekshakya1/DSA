/**
 * ============================================================================
 * THEORY NOTES: STACK & QUEUE DATA STRUCTURES (JAVASCRIPT)
 * ============================================================================
 */


/* ============================================================================
 * 1. STACK DATA STRUCTURE
 * ============================================================================
 * - Core Principle: LIFO (Last-In, First-Out).
 * - Meaning: The element added last is the very first one to be removed.
 * - Conceptual Analogy: A stack of dinner plates. You add to the top, and take from the top.
 * - Access Point: Single end called the "Top".
 *
 * Time Complexities:
 * - Push (Insertion) : O(1)
 * - Pop (Deletion)   : O(1)
 * - Peek (View Top)  : O(1)
 * - Search           : O(N)
 *
 * Key Applications:
 * - Managing function calls (Call Stack in JavaScript Engine).
 * - Undo/Redo operations in text editors.
 * - Backtracking algorithms (e.g., Depth-First Search / DFS).
 * - Expression evaluation & syntax parsing (e.g., checking balanced parentheses).
 */

// --- CODE IMPLEMENTATION: STACK (Using Array) ---
class Stack {
    constructor() {
        this.items = [];
    }

    // Push: Adds an element to the top of the stack
    push(element) {
        this.items.push(element);
    }

    // Pop: Removes and returns the top element. Returns Underflow if empty.
    pop() {
        if (this.isEmpty()) {
            return "Underflow: Stack is empty";
        }
        return this.items.pop();
    }

    // Peek/Top: Looks at the top element without removing it
    peek() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.items[this.items.length - 1];
    }

    // isEmpty: Helper to check if the stack has no elements
    isEmpty() {
        return this.items.length === 0;
    }

    // size: Returns total elements in the stack
    size() {
        return this.items.length;
    }

    // print: View the stack elements
    print() {
        console.log(this.items.join(" <- "));
    }
}

// --- STACK USAGE EXAMPLE ---
console.log("--- Stack Execution ---");
const myStack = new Stack();
myStack.push(10);
myStack.push(20);
myStack.push(30);

myStack.print(); // Output: 10 <- 20 <- 30
console.log("Top element:", myStack.peek()); // Output: 30
console.log("Popped element:", myStack.pop()); // Output: 30
myStack.print(); // Output: 10 <- 20


/* ============================================================================
 * 2. QUEUE DATA STRUCTURE
 * ============================================================================
 * - Core Principle: FIFO (First-In, First-Out).
 * - Meaning: The element added first is the very first one to be removed.
 * - Conceptual Analogy: A real-world queue/line of people waiting for a bus ticket.
 * - Access Points: Two distinct ends:
 *     1. Rear (or Tail): Where elements are inserted (Enqueue).
 *     2. Front (or Head): Where elements are removed (Dequeue).
 *
 * Time Complexities:
 * - Enqueue (Insertion) : O(1)
 * - Dequeue (Deletion)   : O(1) [When implemented optimally using pointers/objects]
 * - Peek (View Front)    : O(1)
 * - Search               : O(N)
 *
 * Key Applications:
 * - CPU scheduling & Shared Resource management (e.g., Print Spoolers).
 * - Handling asynchronous data transfers (e.g., IO Buffers, Event Loop Task Queue).
 * - Traffic handling on web servers (Rate limiting/Request handling queues).
 * - Graph traversal algorithms (e.g., Breadth-First Search / BFS).
 */

// --- CODE IMPLEMENTATION: QUEUE (Optimized using Object Pointers) ---
// Note: Using raw array.shift() for dequeue takes O(N) time.
// This pointer-based object approach guarantees true O(1) performance.
class Queue {
    constructor() {
        this.items = {};
        this.front = 0;
        this.rear = 0;
    }

    // Enqueue: Adds an element to the rear of the queue
    enqueue(element) {
        this.items[this.rear] = element;
        this.rear++;
    }

    // Dequeue: Removes and returns the element at the front
    dequeue() {
        if (this.isEmpty()) {
            return "Underflow: Queue is empty";
        }
        const item = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return item;
    }

    // peek: Looks at the front-most element without removing it
    peek() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.items[this.front];
    }

    // isEmpty: Checks if queue has no items
    isEmpty() {
        return this.rear - this.front === 0;
    }

    // size: Returns current size of the queue
    size() {
        return this.rear - this.front;
    }

    // print: View the queue elements
    print() {
        const result = [];
        for (let i = this.front; i < this.rear; i++) {
            result.push(this.items[i]);
        }
        console.log(result.join(" -> "));
    }
}

// --- QUEUE USAGE EXAMPLE ---
console.log("\n--- Queue Execution ---");
const myQueue = new Queue();
myQueue.enqueue("Alice");
myQueue.enqueue("Bob");
myQueue.enqueue("Charlie");

myQueue.print(); // Output: Alice -> Bob -> Charlie
console.log("Front element:", myQueue.peek()); // Output: Alice
console.log("Dequeued element:", myQueue.dequeue()); // Output: Alice
myQueue.print(); // Output: Bob -> Charlie


/* ============================================================================
 * SUMMARY MATRIX (QUICK REFERENCE)
 * ============================================================================
 * | Feature          | Stack                             | Queue                             |
 * |------------------|-----------------------------------|-----------------------------------|
 * | Working Rule     | LIFO (Last In First Out)          | FIFO (First In First Out)         |
 * | Open Ends        | 1 End (Top)                       | 2 Ends (Front & Rear)             |
 * | Insertion Term   | Push                              | Enqueue                           |
 * | Deletion Term    | Pop                               | Dequeue                           |
 * ============================================================================
 */
