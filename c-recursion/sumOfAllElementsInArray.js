// Sum of all numbers in an array using recursion
const sumOfNumbers = (arr, n) => {

    if (n < 0) return 0;

    let sum = arr[n] + sumOfNumbers(arr, n - 1);
    return sum;
};

let arr = [5, 3, 2, 0, 1, 6, 7];
let result = sumOfNumbers(arr, arr.length - 1);
console.log(result);

/*
Notes :-

Time Complexity: O(n) — Kyunki yeh array ke har element ko exactly ek baar visit karta hai.

Space Complexity: O(n) — Kyunki call stack mein ek saath n frames store hote hain.

*/



// Sum of all odd numbers in an array using recursion
const sumOfOdd = (arr1, n) => {

    if (n < 0) return 0;

    if (arr1[n] % 2 !== 0) {

        return arr1[n] + sumOfOdd(arr1, n - 1);
    }

    return sumOfOdd(arr1, n - 1);
};

let arr1 = [1, 3, 4, 6, 7, 8];
let result1 = sumOfOdd(arr1, arr1.length - 1);
console.log(result1);

/*
Notes :-

Time Complexity: O(n) — Array ke har element ko single time check kiya ja raha hai.

Space Complexity: O(n) — Call stack depth array ki length ke barabar grow karegi.

*/