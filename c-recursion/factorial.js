// find the  factorial of n

const findFactorial = (n) => {
    // Real-world handling: reject invalid math inputs immediately
    if (n < 0) {
        console.log("Factorial is not defined for negative numbers.");
        return;
    }
    if (n === 0 || n === 1) return 1;

    return n * findFactorial(n - 1);
};

let result = findFactorial(6);
console.log(result);

/*
Notes :-

Time Complexity: O(n) because the function calls itself exactly n times.

Space Complexity: O(n) due to n frames stacked in the call memory.

*/