/*
Problem statement -
Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).


Implement the MyQueue class:

-> void push(int x) Pushes element x to the back of the queue.

-> int pop() Removes the element from the front of the queue and returns it.

-> int peek() Returns the element at the front of the queue.

-> boolean empty() Returns true if the queue is empty, false otherwise.


Notes:

-> You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.

-> Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.


Example 1:

Input
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 1, 1, false]

Explanation
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false


Constraints:
-> 1 <= x <= 9
-> At most 100 calls will be made to push, pop, peek, and empty.
-> All the calls to pop and peek are valid.


Follow-up: Can you implement the queue such that each operation is amortized O(1) time complexity? In other words, performing n operations will take overall O(n) time even if one of those operations may take longer.


## Solve on leetcode -> https://leetcode.com/problems/implement-queue-using-stacks/description/

*/

class MyQueue {
    constructor() {
        this.s1 = [];
        this.s2 = [];
    }

    push(x) {
        this.s1.push(x);
    }

    pop() {
        if (this.s2.length === 0) {
            while (this.s1.length) {
                this.s2.push(this.s1.pop());
            }
        }
        return this.s2.pop();
    }

    peek() {
        if (this.s2.length === 0) {
            while (this.s1.length) {
                this.s2.push(this.s1.pop());
            }
        }
        return this.s2[this.s2.length - 1];
    }

    empty() {
        return this.s1.length === 0 && this.s2.length === 0;
    }
}

let obj = new MyQueue();
obj.push(1);
obj.push(2);
console.log("Front element (peek):", obj.peek());
console.log("Dequeued (pop):", obj.pop());
console.log("Is Empty?:", obj.empty());



// ============================================================================
// 📂 APPROACH 1: TWO STACKS (O(1) AMORTIZED POP/PEEK - INPUT & OUTPUT BUFFERS)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Lazy Evaluation / Amortized Transfer Pattern (Input & Output Stack Buffers)
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - Dual Stack Role Separation: Instead of moving elements back and forth on every operation,
 *   this approach separates roles cleanly: `s1` acts purely as an **Input Buffer**, and `s2`
 *   acts strictly as an **Output Buffer**.
 * - The Inversion Property: When you pop elements from `s1` and push them into `s2`, the order of
 *   elements gets inverted. A Stack is LIFO, so inverting it transforms the structure into FIFO!
 * - Lazy (On-Demand) Transfer: Elements are ONLY shifted from `s1` to `s2` when `s2` is completely
 *   empty. If `s2` already has elements, `pop()` and `peek()` directly read from `s2` in pure O(1) time.
 * - Amortized Efficiency: Even though a single `pop()` call might trigger a `while` loop costing O(N),
 *   that cost is shared across all elements. Each element is moved into `s2` exactly once and removed
 *   exactly once, making the overall average cost per operation constant.
 *
 * 📌 TIME COMPLEXITY:
 * - Push: O(1) -> Elements are directly pushed into the `s1` array buffer.
 * - Pop / Peek: O(1) Amortized -> The worst-case is O(N) when `s2` is empty, but the average
 *   time across multiple continuous operations is flat constant O(1).
 * - Empty: O(1) -> Instant logical evaluation checking if both internal arrays are exhausted.
 *
 * 📌 SPACE COMPLEXITY: O(N) [Auxiliary Space]
 * - Linear allocation scaling directly with the input element pool size, safely split across
 *   two standard stack instances (`s1` and `s2`).
 */
