/*
Problem statement -
Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).


Implement the MyStack class:
-> void push(int x) Pushes element x to the top of the stack.

-> int pop() Removes the element on the top of the stack and returns it.

-> int top() Returns the element on the top of the stack.

-> boolean empty() Returns true if the stack is empty, false otherwise.


Notes:
-> You must use only standard operations of a queue, which means that only push to back, peek/pop from front, size and is empty operations are valid.

-> Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.


Example 1:
Input
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 2, 2, false]

Explanation
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // return 2
myStack.pop(); // return 2
myStack.empty(); // return False


Constraints:
-> 1 <= x <= 9
-> At most 100 calls will be made to push, pop, top, and empty.
-> All the calls to pop and top are valid.


Follow-up: Can you implement the stack using only one queue?


## Solve on leetcode -> https://leetcode.com/problems/implement-stack-using-queues/description/

*/

// Using Two queues
class MyStack {
    constructor() {
        this.q1 = [];
        this.q2 = [];
    };

    push(x) {
        this.q1.push(x);
    };

    pop() {
        let n = this.q1.length;
        for (let i = 0; i < n - 1; i++) {
            this.q2.push(this.q1.shift());
        }
        let ans = this.q1.shift();
        let temp = this.q1;
        this.q1 = this.q2;
        this.q2 = temp;
        return ans;

    };

    top() {
        let n = this.q1.length;
        for (let i = 0; i < n - 1; i++) {
            this.q2.push(this.q1.shift());
        }
        let front = this.q1[0];
        this.q2.push(this.q1.shift());
        let temp = this.q1;
        this.q1 = this.q2;
        this.q2 = temp;
        return front;
    };

    empty() {
        return this.q1.length === 0;
    };
};

let obj = new MyStack();
obj.push(3);
obj.push(4);
console.log(obj);
console.log(obj.pop());
console.log(obj.top());
console.log(obj.empty());



// ============================================================================
// 📂 APPROACH 1: TWO QUEUES (O(1) PUSH, O(N) POP/TOP)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Dual Queue Buffer Rotation & Reference Swapping
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Mimicking LIFO with FIFO: Queues inherently process items in chronological order. To retrieve
 *   the most recently pushed item (the "Top" of the stack), we must intentionally drain the queue.
 * - Element Isolation Strategy: In `pop()` and `top()`, we cycle through `N-1` elements, shifting
 *   them out of `q1` and pushing them into `q2`. This isolates the last structural element at the front.
 * - Pointer Reference Swapping: Instead of manually moving all elements back from `q2` to `q1`
 *   (which adds extra runtime cost), we execute a clean memory reference swap using a `temp` variable.
 * - Array Shift Warning: While JavaScript's `.push()` is O(1), `.shift()` internally re-indexes the
 *   array, which strictly runs in O(N) time under the hood.
 *
 * 📌 TIME COMPLEXITY:
 * - Push: O(1) -> Elements are appended straight to the back of the active array instance.
 * - Pop / Top: O(N) -> Because we must loop and transfer N-1 elements to expose the last element.
 * - Empty: O(1) -> Direct evaluation of array length.
 *
 * 📌 SPACE COMPLEXITY: O(N) [Auxiliary Space]
 * - Storage scale maps directly to the number of elements active within the custom stack infrastructure.
 *   The memory footprint is split across two distinct buffer arrays (`q1` and `q2`).
 */



// using one queue
class MyStack1 {
    constructor() {
        this.q = [];
    };

    push(x) {
        this.q.push(x);
    };

    pop() {
        let n = this.q.length;
        for (let i = 0; i < n - 1; i++) {
            this.q.push(this.q.shift());
        }
        return this.q.shift();


    };

    top() {
        let n = this.q.length;
        for (let i = 0; i < n - 1; i++) {
            this.q.push(this.q.shift());
        }
        let front = this.q.shift();
        this.q.push(front);
        return front;
    };

    empty() {
        return this.q.length === 0;
    };
};

let obj1 = new MyStack1();
obj1.push(5);
obj1.push(6);
console.log(obj1);
console.log(obj1.pop());
console.log(obj1.top());
console.log(obj1.empty());



// ============================================================================
// 📂 APPROACH 2: SINGLE QUEUE (O(1) PUSH, O(N) POP/TOP STRUCTURAL ROTATION)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Single Array Ring-Buffer Rotation (In-Place Queue Manipulation)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Eliminating Secondary Buffer: This optimized approach eliminates the second array entirely by
 *   re-routing the shifted elements directly back into the rear of the exact same queue container.
 * - The Cycle Routine: Running the rotation loop exactly `N-1` times shifts old elements out of the
 *   way and wraps them around, perfectly aligning the newest target element directly at index `0`.
 * - State Preservation Trick: In the `top()` operation, after shifting the target element out to read
 *   its value, we immediately push it back into the queue. This prevents state corruption.
 * - Memory Efficiency: By maintaining a single array reference, it drastically cuts allocation cycles
 *   and reduces garbage collection overhead in production environments.
 *
 * 📌 TIME COMPLEXITY:
 * - Push: O(1) -> Standard direct insertion at the rear index of the array.
 * - Pop / Top: O(N) -> Requires cycling through the active elements to wrap the array state around.
 * - Empty: O(1) -> Checked instantly via a flat length evaluation.
 *
 * 📌 SPACE COMPLEXITY: O(N) [Auxiliary Space]
 * - Highly optimized allocation footprint. Stores all operational payload nodes linearly within
 *   one single consolidated array, dropping structural metadata overhead completely.
 */