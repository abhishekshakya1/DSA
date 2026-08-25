// sum of first n numbers

const sumOfN = (n) => {
    if (n === 0) return 0;

    let sum = n + sumOfN(n-1)
    return sum;

};

let num = 5;
let result = sumOfN(num);
console.log(result);


/*
Notes :-

Time Complexity: O(n) because it makes exactly n recursive calls.

Space Complexity: O(n) due to the n frames stored on the call stack.
*/