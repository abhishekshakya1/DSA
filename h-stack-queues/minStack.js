/*
Problem statement -
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.


Implement the MinStack class:

-> MinStack() initializes the stack object.

-> void push(int value) pushes the element value onto the stack.

-> void pop() removes the element on the top of the stack.

-> int top() gets the top element of the stack.

-> int getMin() retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for each function.



Example 1:

Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output
[null,null,null,null,-3,null,0,-2]

Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2


Constraints:
-> -231 <= val <= 231 - 1

-> Methods pop, top and getMin operations will always be called on non-empty stacks.

-> At most 3 * 104 calls will be made to push, pop, top, and getMin.


## Solve on leetcode -> https://leetcode.com/problems/min-stack/description/

*/

class MinStack {
    constructor() {
        this.s = [];
    }

    push(value) {
        if (this.s.length === 0) {
            this.s.push([value, value])
        } else {
            let minValue = Math.min(value, this.s[this.s.length - 1][1]);
            this.s.push([value, minValue]);
        }
    }

    pop() {
        this.s.pop();
    }

    top() {
        return this.s[this.s.length - 1][0];
    }

    getMin() {
        return this.s[this.s.length - 1][1];
    }
}

let obj = new MinStack();
obj.push(10);
obj.push(20);
obj.push(5);
console.log(obj.pop());
console.log(obj.top());
console.log(obj.getMin());


// ============================================================================
// 📂 APPROACH 1: PAIRED STATE TRACKING (O(1) MINIMUM RETRIEVAL PATTERN)
// ============================================================================

/**
 * ⚙️ PATTERN / METHOD USED:
 * - Dynamic State Coupling via 2D Array [Value, CurrentMin] Tuples
 *
 * 🚨 IMPORTANT POINTS TO REMEMBER:
 * - The History Preservation Problem: A simple single variable cannot track the minimum values
 *   because popping the current minimum destroys the historical reference. We need a way to
 *   remember "What was the minimum before this element arrived?".
 * - Localized Minimum Invariant: By storing each element as a pair `[value, minValue]`, the
 *   minimum element *up to that specific point in time* gets permanently locked with that entry.
 * - Independence from Global State: When a `pop()` occurs, the stack pointer moves back by one,
 *   and the previous node naturally exposes the correct historical minimum at index `[1]`. This
 *   eliminates the need for any re-calculation loops or secondary stack syncing logic.
 * - Array-of-Arrays Allocation: Initializing `[value, minValue]` allocates a tiny sub-array reference
 *   on every push. In JavaScript, this is incredibly readable and leverages the engine's built-in
 *   garbage collection seamlessly upon popping.
 *
 * 📌 TIME COMPLEXITY: O(1) for ALL operations
 * - `push`, `pop`, `top`, and `getMin` all run in flat constant time. There are no linear loops
 *   or scans required to find or maintain the smallest element.
 *
 * 📌 SPACE COMPLEXITY: O(N) [Auxiliary Space]
 * - Each stack slot consumes a fixed space of size 2 to track the metadata tuple. The overall
 *   memory scales purely linearly relative to the maximum depth of active items pushed.
 */