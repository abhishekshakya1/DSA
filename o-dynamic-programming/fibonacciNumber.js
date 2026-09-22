/* ============================================================================
 * 🎯 1D DP MASTERCLASS: FIBONACCI NUMBER COMPLETE EVOLUTION (APPROACH 1 TO 3)
 * ============================================================================
 * 📋 CODE SUMMARY:
 * - Comprehensively traces the evolutionary path of solving Fibonacci sequences.
 * - Spans from exponential Naive Recursion up to optimal constant Space Optimization.
 * - Fixed: Encapsulated Top-Down storage variables internally to prevent test leakages.
 * ============================================================================
 */



// 📂 APPROACH 1: NAIVE RECURSION (THE BRUTE FORCE FRAMEWORK)
// Time Complexity: O(2^N) | Space Complexity: O(N) [System Call Stack Memory]
const fib = (n) => {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
};

let result = fib(6);
console.log(result);




// 📂 APPROACH 2: DYNAMIC PROGRAMMING - TOP-DOWN (MEMOIZATION)
// Time Complexity: O(N) | Space Complexity: O(N) [DP Storage Map + Call Stack]
const fib1 = (n) => {
    // Encapsulate the storage object block to prevent global tracking pollution across test cases
    let store = {};

    const memo = (num) => {
        if (num <= 1) return num;

        // If state value is not already computed, process and cache it natively
        if (store[num] === undefined) {
            store[num] = memo(num - 1) + memo(num - 2);
        }
        return store[num];
    };

    return memo(n);
};

let result1 = fib1(6);
console.log(result1);


// 📂 APPROACH 2: DYNAMIC PROGRAMMING - BOTTOM-UP (TABULATION)
// Time Complexity: O(N) | Space Complexity: O(N) [Flat DP Array Allocation]
const fib2 = (n) => {
    if (n <= 1) return n;

    let dp = [0, 1]; // Pre-fill core structural base cases
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
};

let result2 = fib2(6);
console.log(result2);




// 📂 APPROACH 3: TWO-POINTERS / VARIABLE STATE DRIVEN (SPACE OPTIMIZED)
// Time Complexity: O(N) | Space Complexity: O(1) [Pure Constant Memory Invariant]
const fib3 = (n) => {
    if (n <= 1) return n;

    let prev2 = 0; // Maps directly to index i-2 state
    let prev1 = 1; // Maps directly to index i-1 state

    for (let i = 2; i <= n; i++) {
        let curr = prev1 + prev2;
        prev2 = prev1; // Shift state trackers forward for next round iterations
        prev1 = curr;
    }
    return prev1;
};

let result3 = fib3(6);
console.log(result3);


/* ============================================================================
 * 📊 ALGORITHMIC COMPLEXITY EVOLUTION MATRIX
 * ============================================================================
 * | Implementation Strategy | Time Complexity | Space Complexity (Auxiliary) |
 * |-------------------------|-----------------|------------------------------|
 * | 1. Naive Recursion      | O(2^N)          | O(N) [Call Stack Frames]     |
 * | 2. Top-Down (Memoized)  | O(N)            | O(N) [Map + Stack Frames]    |
 * | 3. Bottom-Up (Tabulated)| O(N)            | O(N) [Linear DP Array Alloc] |
 * | 4. Space Optimized (V3) | O(N)            | O(1) [Absolute Constant]     |
 * ============================================================================
 * 🚨 CRUCIAL INTERVIEW POINTS TO REMEMBER:
 * - The Global Scope Pollution Trap: Writing `let store = {};` outside function scopes
 *   causes memory leak retention across consecutive system evaluations. Always encapsulate
 *   DP state contexts locally inside inner functions.
 * - Exponential Overlapping Subproblems: Standard recursion forces recalculation of identical paths
 *   (e.g., `f(4)` recreates `f(3)+f(2)` blindly). DP clamps overlapping duplicate workflows,
 *   compressing time metrics from an exponential curve straight down to standard linear boundaries.
 * - The Tabulation Memory Rule: Whenever a dynamic programming relation table only references
 *   fixed historic intervals (like strictly using `i-1` and `i-2`), you can completely drop
 *   array allocation structures and use local scalar variables to claim an ultimate O(1) space footprint.
 * ============================================================================
 */


