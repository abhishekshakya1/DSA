/*
# Recursion -
Recursion is a programming and mathematical technique where a function calls itself to solve a smaller piece of the same problem.

# Key Parts of Recursion -
1) Base case: The stopping condition that prevents the function from running forever.

2) Recursive step: The part where the function calls itself with a simpler or smaller input.

3) Call stack: The memory system that keeps track of each active function call until the base case is reached.

# Common Examples -
-> Computing a number's factorial (n!)
-> Finding values in the Fibonacci sequence
-> Traversing trees, graphs, or nested folders

# When to use Recursion -
-> Problem can be broken down into sub problems
-> Trees and Graphs
-> Backtracking, DP, Divide and Conquer



# Time Complexity :
The time complexity of a recursive function is generally determined by two main factors: the number of recursive calls made and the time complexity of each individual call.


📈 Common Time Complexities with Examples:

1. Linear Time: O(n)
The function makes one recursive call per step, and the input decreases by a constant amount (usually 1).
 Example: Calculating a factorial or traversing a linked list.
 Why: The function executes exactly n times.

2. Logarithmic Time: O(log n)
The function makes one recursive call, but the input size is cut in half each time.
 Example: Binary Search.
 Why: The problem size shrinks exponentially, requiring log_2(n) steps to reach the base case.

3. Linearithmic Time: O(n log n)
The problem is split into halves (taking log n layers), but every layer requires looking at all n elements.
Example: Merge Sort or Quick Sort (average case).Why: It makes 2 recursive calls of size n/2, and takes O(n) time to merge them at each level.

4. Exponential Time: O(2^n)
The function makes multiple recursive calls (usually 2) at each step, and the input decreases by only a constant amount (like 1).
 Example: Naive Fibonacci sequence calculation (fib(n) = fib(n-1) + fib(n-2)).
 Why: The call stack doubles in size with every single increase in n, creating a massive, redundant tree.


 💡 How to Optimize Recursive Time Complexity

 Memoization (Top-down Dynamic Programming): Storing the results of expensive recursive function calls in a cache so you never compute the same input twice. This can drop an O(2^n) Fibonacci calculation down to a swift O(n).

Tail Call Optimization (TCO):
Writing the recursive call as the absolute final statement of the function. In some languages, this allows the compiler to reuse memory frames, though it primarily optimizes space complexity rather than time.



# Space Complexity :

The space complexity of recursion is primarily determined by the maximum depth of the call stack, which represents the largest number of active function frames stored in memory at the same time.

Unlike iterative loops, each recursive call allocates a new frame in memory to track its variables and return address.


🛠️ The Core Formula -
Total Space Complexity=(Maximum Depth of Recursion Tree) * (Space per Stack Frame)

 Max Depth: The longest path from the start of the recursion to the base case.

 Space per Frame: Memory used by local variables and input parameters inside one call.



📉 Common Space Complexities with Examples -
1. Linear Space: O(n)

The function processes elements one by one, creating a straight line of calls before reaching the base case.

 Example: Calculating a basic factorial or traversing a linked list.
 Why: If you call factorial(5), memory must simultaneously hold frames for 5, 4, 3, 2, and 1 before resolving.


2. Logarithmic Space: O(log n)

he input size is halved with each call, meaning the tree deepens very slowly.

  Example: Binary Search (recursive implementation).
  Why: An array of 1,024 elements only requires a maximum stack depth of 10 frames.


3. Tree Depth Space (Balanced vs. Unbalanced)
For algorithms that branch out (like sorting or tree traversals), space depends on the height of the tree, not the total number of calls.

 * Balanced Tree (O(log n)): In Merge Sort, the tree splits evenly. Even though it makes O(n log n) total calls, it executes them one branch at a time. Once a branch resolves, its memory is cleared. The stack never holds more than (log n) frames at once.

* Unbalanced Tree (O(n)): In Quick Sort's worst-case scenario (sorting an already sorted array without random pivots), the tree becomes a straight line, pushing space complexity to O(n).



⚡ The Exception: Tail Call Optimization (TCO)
If a language supports Tail Call Optimization and you write your recursive call as the absolute final operation in the function, the compiler can optimize the space.

 How it works: The compiler reuses the current stack frame instead of creating a new one.

 Result: It reduces the space complexity from O(n) down to O(1) (constant space), making it as memory-efficient as a standard while loop.Limitation: Not all languages support this (e.g., Python and standard JavaScript do not reliably support TCO).

*/


// Recursion example:
function countdown(number) {
    // 1. BASE CASE (Stop when we hit 0)
    if (number === 0) {
        console.log("Blast off! 🚀");
        return;
    }

    // 2. DO ACTION
    console.log(number);

    // 3. RECURSIVE STEP (Call itself with a smaller number)
    countdown(number - 1);
}

// Start the countdown
countdown(3);



// Print numbers from n to 1 using recursion

// const print = (n) => {
//     if (n === 0) return;

//     console.log(n);
//     print(n-1);
// };

// let num = 10;
// print(num);



// print numbers 1 to n using recursion

// const print = (n) => {
//     if (n === 0) return;

//     print(n - 1);
//     console.log(n);
// };

// let num = 10;
// print(num);


const print = (n) => {

    if (n > num) return;

    console.log(n);
    print(n+1)
}
let num = 10;
print(1);

